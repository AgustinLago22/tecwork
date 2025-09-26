-- Agregar campo fuente a la tabla leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS fuente TEXT;

-- Crear índice para búsquedas rápidas por fuente
CREATE INDEX IF NOT EXISTS idx_leads_fuente ON leads(fuente);

-- Actualizar la vista para incluir el nuevo campo
DROP VIEW IF EXISTS vista_leads;

CREATE VIEW vista_leads AS
SELECT
    l.id,
    l.nombre,
    l.email,
    l.telefono,
    l.empresa,
    l.necesidad,
    l.mensaje,
    l.fuente,
    u.nombre as urgencia,
    e.descripcion as estado,
    tp.descripcion as tipo_proyecto,
    l.created_at
FROM leads l
LEFT JOIN niveles_urgencia u ON l.urgencia_id = u.id
LEFT JOIN estados_leads e ON l.estado_id = e.id
LEFT JOIN tipos_proyecto tp ON l.tipo_proyecto_id = tp.id;