-- TecWork - Normalized Database Schema
-- Diseño escalable y mantenible

-- =============================================================================
-- TABLAS LOOKUP (Catálogos)
-- =============================================================================

-- Universidades
CREATE TABLE universities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    country TEXT DEFAULT 'Argentina',
    city TEXT,
    website TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills/Tecnologías
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'frontend', 'backend', 'mobile', 'devops', etc.
    description TEXT,
    popularity_score INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Niveles de experiencia
CREATE TABLE experience_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'junior', 'semi-senior', 'senior', 'lead'
    min_years INTEGER,
    max_years INTEGER,
    description TEXT,
    sort_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Status para leads
CREATE TABLE lead_statuses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'nuevo', 'contactado', 'calificado', etc.
    description TEXT,
    color TEXT, -- Para UI
    sort_order INTEGER,
    is_final BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Status para applicants
CREATE TABLE applicant_statuses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'pendiente', 'evaluando', 'aprobado', etc.
    description TEXT,
    color TEXT, -- Para UI
    sort_order INTEGER,
    is_final BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Urgencia levels
CREATE TABLE urgency_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'baja', 'media', 'alta', 'urgente'
    description TEXT,
    color TEXT, -- Para UI
    sort_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sources de leads
CREATE TABLE lead_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'web', 'referral', 'social', etc.
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLAS PRINCIPALES (Normalizadas)
-- =============================================================================

-- Leads (Empresas/Proyectos)
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    empresa TEXT,
    sitio_web TEXT,
    necesidad TEXT NOT NULL,
    mensaje TEXT,
    presupuesto_estimado DECIMAL,

    -- Foreign Keys
    urgency_id UUID REFERENCES urgency_levels(id),
    source_id UUID REFERENCES lead_sources(id),
    status_id UUID REFERENCES lead_statuses(id),
    assigned_to UUID, -- Future: REFERENCES users(id)

    -- Metadata
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applicants (Estudiantes)
CREATE TABLE applicants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    carrera TEXT NOT NULL,
    año_cursado INTEGER,
    rol TEXT NOT NULL, -- 'frontend', 'backend', 'fullstack', etc.
    availability TEXT NOT NULL,
    hourly_rate_usd DECIMAL,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    cv_url TEXT,
    notes TEXT,
    rating DECIMAL CHECK (rating >= 1 AND rating <= 5),
    total_projects INTEGER DEFAULT 0,

    -- Foreign Keys
    university_id UUID REFERENCES universities(id),
    experience_level_id UUID REFERENCES experience_levels(id),
    status_id UUID REFERENCES applicant_statuses(id),

    -- Metadata
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLAS MANY-TO-MANY
-- =============================================================================

-- Skills de Applicants (many-to-many)
CREATE TABLE applicant_skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    years_experience DECIMAL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(applicant_id, skill_id)
);

-- =============================================================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================================================

-- Leads indexes
CREATE INDEX idx_leads_status ON leads(status_id);
CREATE INDEX idx_leads_urgency ON leads(urgency_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);

-- Applicants indexes
CREATE INDEX idx_applicants_status ON applicants(status_id);
CREATE INDEX idx_applicants_university ON applicants(university_id);
CREATE INDEX idx_applicants_experience ON applicants(experience_level_id);
CREATE INDEX idx_applicants_rol ON applicants(rol);
CREATE INDEX idx_applicants_created_at ON applicants(created_at DESC);

-- Skills indexes
CREATE INDEX idx_applicant_skills_applicant ON applicant_skills(applicant_id);
CREATE INDEX idx_applicant_skills_skill ON applicant_skills(skill_id);

-- =============================================================================
-- DATOS INICIALES (SEED DATA)
-- =============================================================================

-- Universidades
INSERT INTO universities (name, city) VALUES
('Universidad Nacional del Nordeste (UNNE)', 'Corrientes'),
('Universidad de Buenos Aires (UBA)', 'Buenos Aires'),
('Universidad Tecnológica Nacional (UTN)', 'Buenos Aires'),
('Universidad Nacional de Córdoba (UNC)', 'Córdoba'),
('Universidad Nacional de La Plata (UNLP)', 'La Plata');

-- Experience Levels
INSERT INTO experience_levels (name, min_years, max_years, description, sort_order) VALUES
('junior', 0, 2, 'Recién graduado o con poca experiencia', 1),
('semi-senior', 2, 4, 'Experiencia intermedia, puede trabajar independiente', 2),
('senior', 4, 8, 'Experiencia avanzada, puede liderar proyectos', 3),
('lead', 8, NULL, 'Experiencia de liderazgo y arquitectura', 4);

-- Skills
INSERT INTO skills (name, category) VALUES
-- Frontend
('React', 'frontend'),
('Vue.js', 'frontend'),
('Angular', 'frontend'),
('JavaScript', 'frontend'),
('TypeScript', 'frontend'),
('HTML/CSS', 'frontend'),
('Tailwind CSS', 'frontend'),
-- Backend
('Node.js', 'backend'),
('Python', 'backend'),
('Java', 'backend'),
('C#', 'backend'),
('PHP', 'backend'),
('Express.js', 'backend'),
-- Database
('PostgreSQL', 'database'),
('MySQL', 'database'),
('MongoDB', 'database'),
('Redis', 'database'),
-- Mobile
('React Native', 'mobile'),
('Flutter', 'mobile'),
('Swift', 'mobile'),
('Kotlin', 'mobile'),
-- DevOps
('Docker', 'devops'),
('AWS', 'devops'),
('Git', 'devops');

-- Lead Statuses
INSERT INTO lead_statuses (name, description, color, sort_order) VALUES
('nuevo', 'Lead recién recibido', '#3B82F6', 1),
('contactado', 'Ya se contactó al lead', '#F59E0B', 2),
('calificado', 'Lead calificado como válido', '#10B981', 3),
('propuesta', 'Propuesta enviada', '#8B5CF6', 4),
('ganado', 'Proyecto cerrado exitosamente', '#059669', 5),
('perdido', 'Proyecto no se concretó', '#EF4444', 6);

-- Applicant Statuses
INSERT INTO applicant_statuses (name, description, color, sort_order) VALUES
('pendiente', 'Aplicación recibida, pendiente de revisión', '#6B7280', 1),
('evaluando', 'En proceso de evaluación', '#F59E0B', 2),
('aprobado', 'Aprobado para trabajar en proyectos', '#10B981', 3),
('rechazado', 'No cumple con los requisitos', '#EF4444', 4),
('inactivo', 'Estudiante inactivo', '#9CA3AF', 5);

-- Urgency Levels
INSERT INTO urgency_levels (name, description, color, sort_order) VALUES
('baja', 'Sin urgencia particular', '#6B7280', 1),
('media', 'Urgencia normal', '#F59E0B', 2),
('alta', 'Necesita atención pronto', '#F97316', 3),
('urgente', 'Requiere atención inmediata', '#EF4444', 4);

-- Lead Sources
INSERT INTO lead_sources (name, description) VALUES
('web', 'Formulario del sitio web'),
('referral', 'Referido por cliente existente'),
('social', 'Redes sociales'),
('university', 'Contacto directo con universidad'),
('event', 'Evento o conferencia'),
('cold_outreach', 'Contacto en frío');

-- =============================================================================
-- VIEWS PARA FACILITAR CONSULTAS
-- =============================================================================

-- Vista completa de leads con lookup tables
CREATE VIEW leads_view AS
SELECT
    l.*,
    ul.name as urgency_name,
    ul.color as urgency_color,
    ls.name as status_name,
    ls.color as status_color,
    lsr.name as source_name
FROM leads l
LEFT JOIN urgency_levels ul ON l.urgency_id = ul.id
LEFT JOIN lead_statuses ls ON l.status_id = ls.id
LEFT JOIN lead_sources lsr ON l.source_id = lsr.id;

-- Vista completa de applicants con lookup tables
CREATE VIEW applicants_view AS
SELECT
    a.*,
    u.name as university_name,
    u.city as university_city,
    el.name as experience_level_name,
    el.description as experience_description,
    ast.name as status_name,
    ast.color as status_color,
    COALESCE(
        (SELECT array_agg(s.name ORDER BY s.name)
         FROM applicant_skills aps
         JOIN skills s ON aps.skill_id = s.id
         WHERE aps.applicant_id = a.id),
        ARRAY[]::text[]
    ) as skills_array
FROM applicants a
LEFT JOIN universities u ON a.university_id = u.id
LEFT JOIN experience_levels el ON a.experience_level_id = el.id
LEFT JOIN applicant_statuses ast ON a.status_id = ast.id;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

-- Enable RLS on main tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Policies for public insert
CREATE POLICY "Public can insert leads" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert applicants" ON applicants
    FOR INSERT WITH CHECK (true);

-- Policies for admin access (service role)
CREATE POLICY "Service role full access leads" ON leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access applicants" ON applicants
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Policies for anon role
CREATE POLICY "Anon can insert leads" ON leads
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can insert applicants" ON applicants
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read leads" ON leads
    FOR SELECT TO anon USING (true);

CREATE POLICY "Anon can read applicants" ON applicants
    FOR SELECT TO anon USING (true);