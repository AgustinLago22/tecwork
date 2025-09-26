# 🏗️ Arquitectura y Fundamentos del Backend TecWork

## 📚 Conceptos Teóricos Clave

### ¿Qué es una API REST?
Una **API REST** (Representational State Transfer) es un estilo arquitectónico para diseñar servicios web que permite la comunicación entre el frontend y backend usando protocolo HTTP.

**Principios REST:**
- **Stateless**: Cada petición es independiente
- **Client-Server**: Separación clara entre cliente y servidor
- **Cacheable**: Las respuestas pueden ser cacheadas
- **Uniform Interface**: Interfaz consistente usando métodos HTTP

**Métodos HTTP que usamos:**
- `GET`: Obtener datos (leer)
- `POST`: Crear nuevos datos
- `PUT/PATCH`: Actualizar datos existentes
- `DELETE`: Eliminar datos

### ¿Qué es Next.js App Router?
Next.js 13+ introdujo el **App Router**, una nueva forma de estructurar aplicaciones:

```
app/
├── page.tsx          # Página principal (/)
├── login/
│   └── page.tsx      # Página /login
├── api/              # Rutas de API
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts  # POST /api/auth/login
│   │   └── logout/
│   │       └── route.ts  # POST /api/auth/logout
│   ├── leads/
│   │   └── route.ts      # GET/POST /api/leads
│   └── applicants/
│       └── route.ts      # GET/POST /api/applicants
└── dashboard/
    └── page.tsx      # Página /dashboard
```

**Ventajas del App Router:**
- **File-based routing**: Las rutas se definen por la estructura de carpetas
- **Server Components**: Componentes que se ejecutan en el servidor
- **API Routes**: APIs integradas en la misma aplicación

## 🔐 Sistema de Autenticación Simple

### ¿Por qué Autenticación Simple?
Para el MVP de TecWork, implementamos autenticación **cookie-based** porque:

1. **Simplicidad**: Solo necesitamos admin access, no usuarios múltiples
2. **Seguridad**: Cookies HTTP-only no son accesibles desde JavaScript
3. **Performance**: No requiere base de datos de sesiones
4. **Escalabilidad**: Fácil migrar a auth complejo después

### Cómo Funciona Nuestro Auth

#### 1. **Middleware de Protección** (`middleware.ts`):
```typescript
export function middleware(request: NextRequest) {
  const protectedPaths = ['/dashboard', '/admin']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const adminSession = request.cookies.get('admin-session')?.value

    if (adminSession !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
```

**¿Qué hace?**
- Se ejecuta **antes** de cada petición
- Verifica si la ruta necesita autenticación
- Chequea si existe la cookie `admin-session`
- Redirige a `/login` si no está autenticado

#### 2. **API de Login** (`/api/auth/login/route.ts`):
```typescript
export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies() // ✅ Next.js 15 compatible

    cookieStore.set('admin-session', 'true', {
      httpOnly: true,        // No accesible desde JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',    // Protección CSRF
      maxAge: 60 * 60 * 24 * 7 // 7 días
    })

    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
```

**¿Qué hace?**
- Compara password con variable de entorno
- Si es correcto, crea cookie HTTP-only
- Cookie expira en 7 días automáticamente

#### 3. **Flujo Completo de Autenticación:**

```
1. Usuario va a /dashboard
   ↓
2. Middleware verifica cookie
   ↓
3. Si no hay cookie → redirect a /login
   ↓
4. Usuario ingresa password
   ↓
5. Frontend envía POST a /api/auth/login
   ↓
6. API verifica password y crea cookie
   ↓
7. Frontend redirige a /dashboard
   ↓
8. Middleware verifica cookie → ✅ Acceso permitido
```

## 🗄️ Integración con Supabase

### ¿Qué es Supabase?
Supabase es una **alternativa open-source a Firebase** que proporciona:
- **PostgreSQL database**: Base de datos relacional
- **Realtime subscriptions**: Actualizaciones en tiempo real
- **Auth**: Sistema de autenticación (no lo usamos en MVP)
- **Storage**: Almacenamiento de archivos
- **Edge Functions**: Funciones serverless

### Configuración de Cliente Supabase

#### 1. **Cliente Normal** (frontend):
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
```

#### 2. **Cliente Admin** (backend):
```typescript
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey, // Key con permisos totales
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

**Diferencias:**
- **Anon Key**: Solo puede hacer operaciones permitidas por RLS
- **Service Key**: Bypasa Row Level Security, acceso total

### Row Level Security (RLS)
RLS permite definir políticas de acceso a nivel de fila:

```sql
-- Solo inserción pública
CREATE POLICY "Anyone can insert leads" ON leads_normalized
    FOR INSERT WITH CHECK (true);

-- Acceso total para service role
CREATE POLICY "Service role can do everything" ON leads_normalized
    FOR ALL USING (auth.role() = 'service_role');
```

## 🗃️ Diseño de Base de Datos Normalizada

### 🎯 ¿Por Qué Normalización?
La normalización siguiendo la **teoría de bases de datos** nos proporciona:

1. **Eliminación de Redundancia**: No duplicamos datos
2. **Integridad Referencial**: Relaciones consistentes via foreign keys
3. **Escalabilidad**: Fácil agregar nuevos campos sin afectar datos existentes
4. **Mantenimiento**: Cambios centralizados en tablas lookup
5. **Performance**: Queries más eficientes con JOINs optimizados

### 📊 Esquema Normalizado Completo

#### **Tablas Lookup (Catálogos)**
```sql
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

-- Niveles de Experiencia
CREATE TABLE experience_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'junior', 'semi-senior', 'senior', 'lead'
    min_years INTEGER,
    max_years INTEGER,
    description TEXT,
    sort_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilidades/Tecnologías
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'frontend', 'backend', 'mobile', 'devops'
    description TEXT,
    popularity_score INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Estados de Leads
CREATE TABLE lead_statuses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'nuevo', 'contactado', 'calificado', etc.
    description TEXT,
    color TEXT, -- Para UI: '#3B82F6'
    sort_order INTEGER,
    is_final BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Estados de Applicants
CREATE TABLE applicant_statuses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'pendiente', 'evaluando', 'aprobado', etc.
    description TEXT,
    color TEXT, -- Para UI
    sort_order INTEGER,
    is_final BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Niveles de Urgencia
CREATE TABLE urgency_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'baja', 'media', 'alta', 'urgente'
    description TEXT,
    color TEXT,
    sort_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fuentes de Leads
CREATE TABLE lead_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'web', 'referral', 'social', etc.
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **Tablas Principales (Normalizadas)**
```sql
-- Leads (Empresas/Proyectos) - NORMALIZADA
CREATE TABLE leads_normalized (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    empresa TEXT,
    sitio_web TEXT,
    necesidad TEXT NOT NULL,
    mensaje TEXT,
    presupuesto_estimado DECIMAL,

    -- Foreign Keys (Relaciones)
    urgency_id UUID REFERENCES urgency_levels(id),
    source_id UUID REFERENCES lead_sources(id),
    status_id UUID REFERENCES lead_statuses(id),
    assigned_to UUID, -- Future: REFERENCES users(id)

    -- Metadata
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applicants (Estudiantes) - NORMALIZADA
CREATE TABLE applicants_normalized (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    carrera TEXT NOT NULL,
    año_cursado INTEGER,
    rol TEXT NOT NULL, -- 'frontend', 'backend', 'fullstack'
    availability TEXT NOT NULL,
    hourly_rate_usd DECIMAL,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    cv_url TEXT,
    notes TEXT,
    rating DECIMAL CHECK (rating >= 1 AND rating <= 5),
    total_projects INTEGER DEFAULT 0,

    -- Foreign Keys (Relaciones)
    university_id UUID REFERENCES universities(id),
    experience_level_id UUID REFERENCES experience_levels(id),
    status_id UUID REFERENCES applicant_statuses(id),

    -- Metadata
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills de Applicants (Many-to-Many)
CREATE TABLE applicant_skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    applicant_id UUID REFERENCES applicants_normalized(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    years_experience DECIMAL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(applicant_id, skill_id)
);
```

### 🔍 Vistas para Consultas Fáciles

Para simplificar las consultas del frontend, creamos vistas que hacen JOINs automáticamente:

```sql
-- Vista completa de Leads con lookup tables
CREATE VIEW leads_complete AS
SELECT
    l.*,
    ul.name as urgency_name,
    ul.color as urgency_color,
    ls.name as status_name,
    ls.color as status_color,
    lsr.name as source_name
FROM leads_normalized l
LEFT JOIN urgency_levels ul ON l.urgency_id = ul.id
LEFT JOIN lead_statuses ls ON l.status_id = ls.id
LEFT JOIN lead_sources lsr ON l.source_id = lsr.id;

-- Vista completa de Applicants con lookup tables
CREATE VIEW applicants_complete AS
SELECT
    a.*,
    u.name as university_name,
    u.city as university_city,
    el.name as experience_level_name,
    el.description as experience_description,
    ast.name as status_name,
    ast.color as status_color,
    -- Array agregado de skills
    COALESCE(
        (SELECT array_agg(s.name ORDER BY s.name)
         FROM applicant_skills aps
         JOIN skills s ON aps.skill_id = s.id
         WHERE aps.applicant_id = a.id),
        ARRAY[]::text[]
    ) as skills_array
FROM applicants_normalized a
LEFT JOIN universities u ON a.university_id = u.id
LEFT JOIN experience_levels el ON a.experience_level_id = el.id
LEFT JOIN applicant_statuses ast ON a.status_id = ast.id;
```

### 📈 Índices para Performance
```sql
-- Leads indexes
CREATE INDEX idx_leads_normalized_status ON leads_normalized(status_id);
CREATE INDEX idx_leads_normalized_urgency ON leads_normalized(urgency_id);
CREATE INDEX idx_leads_normalized_created_at ON leads_normalized(created_at DESC);
CREATE INDEX idx_leads_normalized_email ON leads_normalized(email);

-- Applicants indexes
CREATE INDEX idx_applicants_normalized_status ON applicants_normalized(status_id);
CREATE INDEX idx_applicants_normalized_university ON applicants_normalized(university_id);
CREATE INDEX idx_applicants_normalized_experience ON applicants_normalized(experience_level_id);
CREATE INDEX idx_applicants_normalized_rol ON applicants_normalized(rol);
CREATE INDEX idx_applicants_normalized_created_at ON applicants_normalized(created_at DESC);

-- Skills indexes
CREATE INDEX idx_applicant_skills_applicant ON applicant_skills(applicant_id);
CREATE INDEX idx_applicant_skills_skill ON applicant_skills(skill_id);
```

## 🛠️ Patrones de Desarrollo Utilizados

### 1. **Separation of Concerns**
- **Frontend**: UI y experiencia de usuario
- **API Layer**: Lógica de negocio y resolución de FKs
- **Database**: Persistencia e integridad referencial
- **Views**: Abstracción de consultas complejas

### 2. **Environment Variables**
```typescript
// Configuración sensible en .env.local
ADMIN_PASSWORD=tecwork_admin_2024
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=secret_key
```

### 3. **Error Handling con Foreign Keys**
```typescript
try {
  // Resolver universidad por nombre
  const { data: university } = await supabaseAdmin
    .from('universities')
    .select('id')
    .ilike('name', `%${body.universidad || 'UNNE'}%`)
    .limit(1)
    .single()

  // Insertar con FK resuelto
  const { data, error } = await supabaseAdmin
    .from('applicants_normalized')
    .insert({
      ...applicantData,
      university_id: university?.id || null
    })

  if (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Error al crear applicant' }, { status: 500 })
  }

  return NextResponse.json({ success: true, applicant: data })
} catch (error) {
  console.error('Server error:', error)
  return NextResponse.json({ error: 'Error interno' }, { status: 500 })
}
```

### 4. **TypeScript Interfaces Actualizadas**
```typescript
// Tipos para las vistas normalizadas
interface LeadComplete {
  id: string
  nombre: string
  email: string
  necesidad: string
  urgency_name: string
  urgency_color: string
  status_name: string
  status_color: string
  source_name: string
  // ... otros campos
}

interface ApplicantComplete {
  id: string
  nombre: string
  email: string
  university_name: string
  experience_level_name: string
  status_name: string
  skills_array: string[]
  // ... otros campos
}
```

## 🔄 Flujo de Datos Normalizado

### Ejemplo: Envío de Formulario de Applicants

```
1. Usuario completa formulario en /sumate
   ↓
2. Frontend incluye nivel de experiencia seleccionado
   ↓
3. fetch() envía POST a /api/applicants con nivel
   ↓
4. API resuelve Foreign Keys:
   - universidad → universities.id
   - nivel → experience_levels.id
   - status → applicant_statuses.id (default: 'pendiente')
   ↓
5. API inserta en applicants_normalized con FKs
   ↓
6. API procesa skills como many-to-many:
   - Busca cada skill en skills table
   - Inserta relaciones en applicant_skills
   ↓
7. API responde success: true
   ↓
8. Frontend muestra mensaje de éxito
```

## 🧪 Testing Strategy Actualizada

### 1. **Manual Testing de Normalización**
- Probar creación con diferentes universidades
- Verificar resolución correcta de FKs
- Comprobar skills many-to-many
- Validar vistas con JOINs

### 2. **Database Testing**
- Verificar integridad referencial
- Probar constraints de FK
- Validar políticas RLS en tablas normalizadas
- Comprobar performance de vistas

### 3. **Migration Testing**
- Verificar migración de datos existentes
- Comprobar mapping de strings a FKs
- Validar parsing de skills texto → many-to-many

## 📈 Escalabilidad Futura

### Beneficios de la Normalización
1. **Nuevas Universidades**: Agregar sin tocar código
2. **Nuevos Skills**: Centralizado en una tabla
3. **Nuevos Estados**: Cambios sin migración de datos
4. **Reportes Avanzados**: JOINs optimizados
5. **APIs Dinámicas**: Endpoints que consumen lookup tables

### Próximas Optimizaciones
1. **Caché de Lookup Tables**: Redis para FKs frecuentes
2. **Materialized Views**: Para reportes pesados
3. **Partitioning**: Por fecha para tablas grandes
4. **Full-text Search**: Para búsquedas de texto

---

## 🎯 Resumen de Lo Que Implementamos

1. ✅ **Sistema de autenticación cookie-based con Next.js 15**
2. ✅ **6 APIs REST actualizadas para esquema normalizado**
3. ✅ **Base de datos completamente normalizada (1NF, 2NF, 3NF)**
4. ✅ **8 tablas lookup para escalabilidad**
5. ✅ **Vistas optimizadas para consultas frontend**
6. ✅ **Relaciones many-to-many para skills**
7. ✅ **Migración automática de datos existentes**
8. ✅ **Campo nivel en formulario de aplicants**
9. ✅ **Integración completa con Supabase normalizado**
10. ✅ **Middleware de protección actualizado**

**Próximo archivo**: `02-APIs-REST-y-Endpoints.md`