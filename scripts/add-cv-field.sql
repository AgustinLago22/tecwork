-- Agregar campo cv_url a la tabla aplicantes
ALTER TABLE aplicantes ADD COLUMN IF NOT EXISTS cv_url TEXT;

-- Crear índice para búsquedas por cv_url
CREATE INDEX IF NOT EXISTS idx_aplicantes_cv_url ON aplicantes(cv_url);

-- Actualizar la vista para incluir el nuevo campo
DROP VIEW IF EXISTS vista_aplicantes;

CREATE VIEW vista_aplicantes AS
SELECT
    a.id,
    a.nombre,
    a.apellido,
    a.email,
    a.telefono,
    a.año_cursado,
    a.habilidades,
    a.github_url,
    a.linkedin_url,
    a.portfolio_url,
    a.cv_url,
    a.motivacion,
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