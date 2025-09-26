-- =============================================================================
-- CONFIGURACIÓN DE SUPABASE STORAGE PARA CVS
-- =============================================================================

-- Crear bucket para CVs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cvs',
  'cvs',
  false, -- Privado por seguridad
  5242880, -- 5MB limite
  ARRAY['application/pdf'] -- Solo PDFs
) ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- POLÍTICAS DE STORAGE
-- =============================================================================

-- Política para que usuarios anónimos puedan subir CVs
CREATE POLICY "Users can upload their CVs" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'cvs');

-- Política para que admins puedan ver todos los CVs
CREATE POLICY "Admins can access all CVs" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'cvs');

-- Política para que admins puedan descargar CVs
CREATE POLICY "Admins can download CVs" ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'cvs');

-- =============================================================================
-- FUNCIÓN HELPER PARA GENERAR NOMBRES DE ARCHIVO ÚNICOS
-- =============================================================================

CREATE OR REPLACE FUNCTION generate_cv_filename(applicant_email TEXT, original_filename TEXT)
RETURNS TEXT AS $$
DECLARE
  file_extension TEXT;
  clean_email TEXT;
  timestamp_str TEXT;
BEGIN
  -- Extraer extensión del archivo
  file_extension := LOWER(SUBSTRING(original_filename FROM '\.([^.]*)$'));

  -- Limpiar email para usar como nombre
  clean_email := REGEXP_REPLACE(LOWER(applicant_email), '[^a-z0-9]', '_', 'g');

  -- Generar timestamp
  timestamp_str := TO_CHAR(NOW(), 'YYYYMMDD_HH24MISS');

  -- Retornar nombre único
  RETURN clean_email || '_' || timestamp_str || '.' || file_extension;
END;
$$ LANGUAGE plpgsql;