-- =============================================================================
-- TECWORK DATABASE SCHEMA - FINAL VERSION
-- Plataforma que conecta estudiantes universitarios con proyectos reales
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLAS DE CATÁLOGO (SERIAL para eficiencia)
-- =============================================================================

CREATE TABLE universidades (
    id SERIAL PRIMARY KEY,
    codigo TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE carreras (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE niveles_experiencia (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT NOT NULL
);

CREATE TABLE estados_leads (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL UNIQUE
);

CREATE TABLE estados_aplicantes (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL UNIQUE
);

CREATE TABLE niveles_urgencia (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE tipos_proyecto (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL UNIQUE
);

-- =============================================================================
-- TABLAS PRINCIPALES (UUID para registros únicos)
-- =============================================================================

CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    empresa TEXT,
    necesidad TEXT NOT NULL,
    mensaje TEXT,
    urgencia_id INTEGER REFERENCES niveles_urgencia(id),
    estado_id INTEGER REFERENCES estados_leads(id),
    tipo_proyecto_id INTEGER REFERENCES tipos_proyecto(id),
    consentimiento BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT leads_email_valido CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TABLE aplicantes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT,
    email TEXT NOT NULL UNIQUE,
    telefono TEXT,
    año_cursado INTEGER CHECK (año_cursado >= 1 AND año_cursado <= 7),
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    habilidades TEXT,
    motivacion TEXT,
    universidad_id INTEGER REFERENCES universidades(id),
    carrera_id INTEGER REFERENCES carreras(id),
    nivel_experiencia_id INTEGER REFERENCES niveles_experiencia(id),
    estado_id INTEGER REFERENCES estados_aplicantes(id),
    consentimiento BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT aplicantes_email_valido CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- =============================================================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================================================

CREATE INDEX idx_leads_estado ON leads(estado_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_aplicantes_estado ON aplicantes(estado_id);
CREATE INDEX idx_aplicantes_email ON aplicantes(email);
CREATE INDEX idx_aplicantes_created_at ON aplicantes(created_at DESC);

-- =============================================================================
-- AUTO-UPDATE TIMESTAMP
-- =============================================================================

CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_leads_actualizacion
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_aplicantes_actualizacion
    BEFORE UPDATE ON aplicantes
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- =============================================================================
-- SECURITY POLICIES
-- =============================================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE aplicantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_leads" ON leads
    FOR INSERT TO anon
    WITH CHECK (consentimiento = true);

CREATE POLICY "public_insert_aplicantes" ON aplicantes
    FOR INSERT TO anon
    WITH CHECK (consentimiento = true);

CREATE POLICY "admin_all_leads" ON leads
    FOR ALL TO authenticated
    USING (true);

CREATE POLICY "admin_all_aplicantes" ON aplicantes
    FOR ALL TO authenticated
    USING (true);

-- =============================================================================
-- DATOS INICIALES
-- =============================================================================

INSERT INTO universidades (codigo, nombre) VALUES 
    ('UNNE', 'Universidad Nacional del Nordeste'),
    ('UBA', 'Universidad de Buenos Aires'),
    ('UTN', 'Universidad Tecnologica Nacional'),
    ('UNC', 'Universidad Nacional de Cordoba'),
    ('UADE', 'Universidad Argentina de la Empresa');

INSERT INTO carreras (nombre) VALUES 
    ('Licenciatura en Sistemas'),
    ('Ingenieria en Sistemas'),
    ('Licenciatura en Ciencias de la Computacion'),
    ('Ingenieria Informatica'),
    ('Tecnicatura en Programacion'),
    ('Analisis de Sistemas'),
    ('Ingenieria de Software');

INSERT INTO niveles_experiencia (nombre, descripcion) VALUES 
    ('Principiante', 'Sin proyectos previos o recien empezando'),
    ('Intermedio', '1-3 proyectos completados'),
    ('Avanzado', '4+ proyectos o experiencia laboral');

INSERT INTO estados_leads (descripcion) VALUES 
    ('Pendiente'),
    ('En Espera'),
    ('Terminado'),
    ('Cancelado');

INSERT INTO estados_aplicantes (descripcion) VALUES 
    ('Aplicacion Recibida'),
    ('En Revision'),
    ('Entrevista Pendiente'),
    ('Aprobado - Disponible'),
    ('En Proyecto Activo'),
    ('No Califica'),
    ('Inactivo Temporal');

INSERT INTO niveles_urgencia (nombre) VALUES 
    ('Baja'),
    ('Media'),
    ('Alta'),
    ('Urgente');

INSERT INTO tipos_proyecto (descripcion) VALUES 
    ('Frontend'),
    ('Backend'),
    ('FullStack'),
    ('Desarrollo Web'),
    ('App Mobile'),
    ('Data Analysis'),
    ('UI/UX Design'),
    ('DevOps/Infraestructura');

-- =============================================================================
-- VISTAS PARA DASHBOARD
-- =============================================================================

CREATE VIEW vista_leads AS
SELECT 
    l.id,
    l.nombre,
    l.email,
    l.empresa,
    l.necesidad,
    u.nombre as urgencia,
    e.descripcion as estado,
    tp.descripcion as tipo_proyecto,
    l.created_at
FROM leads l
LEFT JOIN niveles_urgencia u ON l.urgencia_id = u.id
LEFT JOIN estados_leads e ON l.estado_id = e.id
LEFT JOIN tipos_proyecto tp ON l.tipo_proyecto_id = tp.id;

CREATE VIEW vista_aplicantes AS
SELECT 
    a.id,
    a.nombre,
    a.apellido,
    a.email,
    a.año_cursado,
    u.codigo as codigo_universidad,
    u.nombre as universidad,
    c.nombre as carrera,
    ne.nombre as nivel_experiencia,
    ne.descripcion as descripcion_nivel,
    ea.descripcion as estado,
    a.created_at
FROM aplicantes a
LEFT JOIN universidades u ON a.universidad_id = u.id
LEFT JOIN carreras c ON a.carrera_id = c.id
LEFT JOIN niveles_experiencia ne ON a.nivel_experiencia_id = ne.id
LEFT JOIN estados_aplicantes ea ON a.estado_id = ea.id;

-- =============================================================================
-- RESUMEN DE LA ESTRUCTURA
-- =============================================================================

/*
ARQUITECTURA:
- Tablas catálogo: SERIAL (INTEGER) para eficiencia
- Tablas principales: UUID para unicidad
- Foreign keys: INTEGER (referencing SERIAL)

TABLAS CATÁLOGO (7):
- universidades: id, codigo, nombre
- carreras: id, nombre  
- niveles_experiencia: id, nombre, descripcion
- estados_leads: id, descripcion
- estados_aplicantes: id, descripcion
- niveles_urgencia: id, nombre
- tipos_proyecto: id, descripcion

TABLAS PRINCIPALES (2):
- leads: cliente potencial con necesidad
- aplicantes: estudiante que aplica

CARACTERÍSTICAS:
- Consentimiento DEFAULT true
- Email validation
- Auto timestamps con triggers
- Row Level Security para formularios públicos
- Vistas optimizadas para dashboard
*/