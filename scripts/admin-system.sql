-- =============================================================================
-- SISTEMA DE ADMIN MINIMALISTA PERO INTELIGENTE
-- Solo logea lo importante, evita explosión de datos
-- =============================================================================

-- Tabla principal de admins (simple)
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT,
    rol TEXT DEFAULT 'admin' CHECK (rol IN ('admin', 'super_admin')),
    activo BOOLEAN DEFAULT true,
    ultimo_login TIMESTAMPTZ,
    intentos_fallidos INTEGER DEFAULT 0,
    bloqueado_hasta TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT admins_email_valido CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Tabla de sesiones (múltiples dispositivos)
CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    device_info TEXT, -- Solo info básica: "Chrome/Windows", "Safari/iPhone"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_activity TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de logs SOLO para eventos importantes
CREATE TABLE IF NOT EXISTS admin_security_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL, -- Email que intentó acceso
    evento TEXT NOT NULL, -- Solo: 'login_failed', 'account_blocked', 'suspicious_activity'
    detalle TEXT, -- Descripción breve
    ip_aproximada TEXT, -- Solo primeros 3 octetos: "192.168.1.x"
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ÍNDICES MÍNIMOS
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_security_logs_email ON admin_security_logs(email);
CREATE INDEX IF NOT EXISTS idx_security_logs_created ON admin_security_logs(created_at);

-- =============================================================================
-- TRIGGERS AUTOMÁTICOS
-- =============================================================================
CREATE OR REPLACE FUNCTION update_admin_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_timestamp();

-- =============================================================================
-- RLS SECURITY
-- =============================================================================
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access admins" ON admins
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access admin_sessions" ON admin_sessions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access admin_security_logs" ON admin_security_logs
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================================================
-- FUNCIONES UTILITARIAS INTELIGENTES
-- =============================================================================

-- Limpiar sesiones expiradas (automático)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM admin_sessions WHERE expires_at < NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Anonymizar IP (solo primeros 3 octetos)
CREATE OR REPLACE FUNCTION anonymize_ip(ip_address TEXT)
RETURNS TEXT AS $$
BEGIN
    IF ip_address IS NULL THEN
        RETURN 'unknown';
    END IF;

    -- Para IPv4: "192.168.1.100" -> "192.168.1.x"
    RETURN REGEXP_REPLACE(ip_address, '\.\d+$', '.x');
END;
$$ LANGUAGE plpgsql;

-- Obtener info básica del dispositivo
CREATE OR REPLACE FUNCTION parse_device_info(user_agent TEXT)
RETURNS TEXT AS $$
BEGIN
    IF user_agent IS NULL THEN
        RETURN 'Unknown Device';
    END IF;

    -- Extraer solo lo básico: Browser/OS
    RETURN CASE
        WHEN user_agent LIKE '%Chrome%' AND user_agent LIKE '%Windows%' THEN
            'Chrome/Windows'
        WHEN user_agent LIKE '%Chrome%' AND user_agent LIKE '%Mac%' THEN
            'Chrome/Mac'
        WHEN user_agent LIKE '%Safari%' AND user_agent LIKE '%iPhone%' THEN
            'Safari/iPhone'
        WHEN user_agent LIKE '%Firefox%' THEN
            'Firefox'
        WHEN user_agent LIKE '%Edge%' THEN
            'Edge'
        ELSE
            'Other Browser'
    END;
END;
$$ LANGUAGE plpgsql;

-- Log SOLO eventos importantes
CREATE OR REPLACE FUNCTION log_security_event(
    p_email TEXT,
    p_evento TEXT,
    p_detalle TEXT DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
    ip_anonymized TEXT;
BEGIN
    -- Solo logear estos eventos críticos
    IF p_evento NOT IN ('login_failed', 'account_blocked', 'suspicious_activity', 'password_changed') THEN
        RETURN NULL; -- No logear eventos normales
    END IF;

    ip_anonymized := anonymize_ip(p_ip_address);

    INSERT INTO admin_security_logs (email, evento, detalle, ip_aproximada)
    VALUES (p_email, p_evento, p_detalle, ip_anonymized)
    RETURNING id INTO log_id;

    RETURN log_id;
END;
$$ LANGUAGE plpgsql;

-- Verificar si admin está bloqueado
CREATE OR REPLACE FUNCTION is_admin_blocked(p_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    admin_record RECORD;
BEGIN
    SELECT intentos_fallidos, bloqueado_hasta, activo
    INTO admin_record
    FROM admins
    WHERE email = p_email;

    IF NOT FOUND THEN
        RETURN true;
    END IF;

    IF NOT admin_record.activo THEN
        RETURN true;
    END IF;

    IF admin_record.bloqueado_hasta IS NOT NULL AND admin_record.bloqueado_hasta > NOW() THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- AUTO-LIMPIEZA DE LOGS (Evitar explosión de datos)
-- =============================================================================

-- Función para limpiar logs antiguos (mantener solo últimos 3 meses)
CREATE OR REPLACE FUNCTION cleanup_old_security_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM admin_security_logs
    WHERE created_at < NOW() - INTERVAL '3 months';

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- VISTA PARA ADMIN (sin passwords)
-- =============================================================================
CREATE VIEW vista_admins AS
SELECT
    id,
    email,
    nombre,
    apellido,
    rol,
    activo,
    ultimo_login,
    intentos_fallidos,
    CASE
        WHEN bloqueado_hasta IS NOT NULL AND bloqueado_hasta > NOW()
        THEN true
        ELSE false
    END as esta_bloqueado,
    created_at
FROM admins
ORDER BY created_at DESC;

-- Vista de eventos de seguridad recientes
CREATE VIEW vista_eventos_seguridad AS
SELECT
    email,
    evento,
    detalle,
    ip_aproximada,
    created_at,
    CASE evento
        WHEN 'login_failed' THEN '🔴 Login fallido'
        WHEN 'account_blocked' THEN '🚫 Cuenta bloqueada'
        WHEN 'suspicious_activity' THEN '⚠️ Actividad sospechosa'
        WHEN 'password_changed' THEN '🔑 Password cambiado'
        ELSE evento
    END as evento_legible
FROM admin_security_logs
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 50;

-- =============================================================================
-- COMENTARIOS SOBRE EL SISTEMA INTELIGENTE
-- =============================================================================

/*
CARACTERÍSTICAS DEL SISTEMA INTELIGENTE:

✅ MINIMALISTA:
- Solo 3 tablas principales
- Logs solo para eventos críticos
- IPs anonimizadas automáticamente
- Device info simplificado

✅ ANTI-EXPLOSIÓN:
- Auto-limpieza de logs antiguos (3 meses)
- Solo eventos importantes se logean
- IP tracking inteligente (primeros 3 octetos)
- Límite de 50 eventos recientes en vista

✅ INFORMACIÓN ÚTIL:
- Detecta intentos de login fallidos
- Alerta cuando cuentas se bloquean
- Tracking básico de dispositivos
- Historial de cambios críticos

✅ PRIVACY-CONSCIOUS:
- IPs anonimizadas: "192.168.1.x"
- User agents simplificados: "Chrome/Windows"
- Auto-borrado de logs antiguos
- Sin tracking innecesario

EVENTOS QUE SE LOGEAN:
1. login_failed - Solo cuando falla el login
2. account_blocked - Cuando se bloquea una cuenta
3. suspicious_activity - Patrones raros (opcional)
4. password_changed - Cambios de contraseña

EVENTOS QUE NO SE LOGEAN:
- Logins exitosos normales
- Navegación normal por dashboard
- Operaciones CRUD rutinarias
- Pageviews o clicks

RESULTADO:
- Base de datos limpia
- Solo información relevante
- Privacidad respetada
- Detección de problemas reales
*/