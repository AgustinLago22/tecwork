# 🔌 APIs REST y Endpoints - Arquitectura Normalizada

## 📚 Teoría: ¿Cómo Funcionan las APIs en Next.js?

### File-based API Routes
En Next.js App Router, las APIs se definen con archivos `route.ts` en la carpeta `app/api/`:

```
app/api/
├── auth/
│   ├── login/
│   │   └── route.ts    # POST /api/auth/login
│   └── logout/
│       └── route.ts    # POST /api/auth/logout
├── leads/
│   └── route.ts        # GET /api/leads, POST /api/leads
└── applicants/
    └── route.ts        # GET /api/applicants, POST /api/applicants
```

### Métodos HTTP Soportados
Cada `route.ts` puede exportar funciones para diferentes métodos:

```typescript
// GET /api/leads
export async function GET() { /* ... */ }

// POST /api/leads
export async function POST(request: NextRequest) { /* ... */ }

// PUT /api/leads
export async function PUT(request: NextRequest) { /* ... */ }

// DELETE /api/leads
export async function DELETE(request: NextRequest) { /* ... */ }
```

## 🔐 APIs de Autenticación

### 1. **POST /api/auth/login**

**Archivo**: `app/api/auth/login/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // 1. Extraer datos del request
    const { password } = await request.json()

    // 2. Validar password contra variable de entorno
    if (password === process.env.ADMIN_PASSWORD) {

      // 3. Obtener cookie store (Next.js 15 compatible)
      const cookieStore = await cookies()

      // 4. Crear cookie HTTP-only segura
      cookieStore.set('admin-session', 'true', {
        httpOnly: true,                           // No accesible desde JavaScript
        secure: process.env.NODE_ENV === 'production', // HTTPS en producción
        sameSite: 'strict',                      // Protección CSRF
        maxAge: 60 * 60 * 24 * 7                // 7 días de expiración
      })

      // 5. Responder con éxito
      return NextResponse.json({
        success: true,
        message: 'Login exitoso'
      })
    } else {
      // 6. Responder con error de autenticación
      return NextResponse.json(
        { success: false, message: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }
  } catch (error) {
    // 7. Manejo de errores del servidor
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    )
  }
}
```

**¿Cómo se usa desde el frontend?**

```typescript
// En login/page.tsx
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: formData.password })
})

const data = await response.json()

if (data.success) {
  router.push('/dashboard')
} else {
  setError('Contraseña incorrecta')
}
```

### 2. **POST /api/auth/logout**

**Archivo**: `app/api/auth/logout/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // 1. Obtener cookie store
    const cookieStore = await cookies()

    // 2. Eliminar cookie de sesión
    cookieStore.delete('admin-session')

    // 3. Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error en logout' },
      { status: 500 }
    )
  }
}
```

## 🏢 API de Leads (Normalizada)

### **GET /api/leads** - Obtener Todos los Leads

**Archivo**: `app/api/leads/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'

export async function GET() {
  try {
    // 1. Verificar autenticación
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // 2. Consultar vista normalizada con JOINs automáticos
    const { data: leads, error } = await supabaseAdmin
      .from('leads_complete')  // ✅ Vista normalizada
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json(
        { error: 'Error al obtener leads' },
        { status: 500 }
      )
    }

    // 3. Retornar datos con lookup values incluidos
    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

**Datos que retorna** (desde `leads_complete` view):
```json
{
  "leads": [
    {
      "id": "uuid",
      "nombre": "Juan Pérez",
      "email": "juan@empresa.com",
      "telefono": "+54911234567",
      "empresa": "Tech Solutions SA",
      "necesidad": "Desarrollo de app móvil",
      "mensaje": "Necesitamos una app para delivery",
      "presupuesto_estimado": 50000,
      "urgency_name": "alta",
      "urgency_color": "#F97316",
      "status_name": "nuevo",
      "status_color": "#3B82F6",
      "source_name": "web",
      "consent": true,
      "created_at": "2024-03-15T10:30:00Z",
      "updated_at": "2024-03-15T10:30:00Z"
    }
  ]
}
```

### **POST /api/leads** - Crear Nuevo Lead

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Extraer datos del formulario
    const body = await request.json()

    // 2. Resolver Foreign Keys desde lookup tables
    const { data: urgencyLevel } = await supabaseAdmin
      .from('urgency_levels')
      .select('id')
      .eq('name', body.urgencia || 'media')
      .single()

    const { data: source } = await supabaseAdmin
      .from('lead_sources')
      .select('id')
      .eq('name', body.source || 'web')
      .single()

    const { data: status } = await supabaseAdmin
      .from('lead_statuses')
      .select('id')
      .eq('name', 'nuevo')
      .single()

    // 3. Preparar datos con FKs resueltos
    const leadData = {
      nombre: body.nombre,
      email: body.email,
      necesidad: body.necesidad,
      mensaje: body.mensaje || null,
      consent: body.consent || false,

      // Campos opcionales
      ...(body.telefono && { telefono: body.telefono }),
      ...(body.empresa && { empresa: body.empresa }),
      ...(body.presupuesto_estimado && {
        presupuesto_estimado: body.presupuesto_estimado
      }),

      // Foreign Keys resueltos
      urgency_id: urgencyLevel?.id || null,
      source_id: source?.id || null,
      status_id: status?.id || null,
    }

    // 4. Insertar en tabla normalizada
    const { data: lead, error } = await supabaseAdmin
      .from('leads_normalized')  // ✅ Tabla normalizada
      .insert([leadData])
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Error al crear lead' },
        { status: 500 }
      )
    }

    // 5. Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Lead creado exitosamente',
      lead
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

## 👨‍🎓 API de Applicants (Normalizada)

### **GET /api/applicants** - Obtener Todos los Applicants

```typescript
export async function GET() {
  try {
    // 1. Verificar autenticación
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // 2. Consultar vista normalizada con JOINs y skills agregados
    const { data: applicants, error } = await supabaseAdmin
      .from('applicants_complete')  // ✅ Vista normalizada con skills
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching applicants:', error)
      return NextResponse.json(
        { error: 'Error al obtener applicants' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applicants })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

**Datos que retorna** (desde `applicants_complete` view):
```json
{
  "applicants": [
    {
      "id": "uuid",
      "nombre": "María García",
      "email": "maria@gmail.com",
      "telefono": "+54911234567",
      "carrera": "Ingeniería en Sistemas",
      "año_cursado": 3,
      "rol": "frontend",
      "availability": "inmediato - 20 hrs/semana",
      "github_url": "https://github.com/mariagarcia",
      "linkedin_url": "https://linkedin.com/in/mariagarcia",
      "portfolio_url": "https://mariagarcia.dev",
      "notes": "Experiencia con React y TypeScript",
      "university_name": "Universidad Nacional del Nordeste (UNNE)",
      "university_city": "Corrientes",
      "experience_level_name": "junior",
      "experience_description": "Recién graduado o con poca experiencia",
      "status_name": "pendiente",
      "status_color": "#6B7280",
      "skills_array": ["React", "TypeScript", "JavaScript", "HTML/CSS"],
      "consent": true,
      "created_at": "2024-03-15T10:30:00Z"
    }
  ]
}
```

### **POST /api/applicants** - Crear Nuevo Applicant

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Extraer datos del formulario
    const body = await request.json()

    // 2. Resolver Foreign Keys desde lookup tables
    const { data: university } = await supabaseAdmin
      .from('universities')
      .select('id')
      .ilike('name', `%${body.universidad || 'UNNE'}%`)
      .limit(1)
      .single()

    const { data: experienceLevel } = await supabaseAdmin
      .from('experience_levels')
      .select('id')
      .eq('name', body.nivel || 'junior')
      .single()

    const { data: status } = await supabaseAdmin
      .from('applicant_statuses')
      .select('id')
      .eq('name', 'pendiente')
      .single()

    // 3. Preparar datos con FKs resueltos
    const applicantData = {
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono || null,
      carrera: body.carrera,
      año_cursado: body.año_cursado || null,
      rol: body.rol,
      availability: body.availability,
      hourly_rate_usd: body.hourly_rate_usd || null,
      github_url: body.github_url || null,
      linkedin_url: body.linkedin_url || null,
      portfolio_url: body.portfolio_url || null,
      cv_url: body.cv_url || null,
      notes: body.notes || null,
      consent: body.consent || false,

      // Foreign Keys resueltos
      university_id: university?.id || null,
      experience_level_id: experienceLevel?.id || null,
      status_id: status?.id || null,
    }

    // 4. Insertar en tabla normalizada
    const { data: applicant, error } = await supabaseAdmin
      .from('applicants_normalized')  // ✅ Tabla normalizada
      .insert([applicantData])
      .select()
      .single()

    if (error) {
      console.error('Error creating applicant:', error)
      return NextResponse.json(
        { error: 'Error al crear applicant' },
        { status: 500 }
      )
    }

    // 5. Procesar skills como relación many-to-many
    if (body.skills && applicant) {
      const skillsArray = Array.isArray(body.skills)
        ? body.skills
        : body.skills.split(',').map((s: string) => s.trim())

      for (const skillName of skillsArray) {
        if (skillName) {
          // Buscar skill en tabla normalizada
          const { data: skill } = await supabaseAdmin
            .from('skills')
            .select('id')
            .ilike('name', `%${skillName}%`)
            .limit(1)
            .single()

          // Crear relación many-to-many
          if (skill) {
            await supabaseAdmin
              .from('applicant_skills')
              .insert({
                applicant_id: applicant.id,
                skill_id: skill.id,
                proficiency_level: 3 // Default intermediate level
              })
          }
        }
      }
    }

    // 6. Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Aplicación enviada exitosamente',
      applicant
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

## 🛡️ Middleware de Protección

**Archivo**: `middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Definir rutas que necesitan autenticación
  const protectedPaths = ['/dashboard', '/admin']

  // 2. Verificar si la ruta actual está protegida
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    // 3. Verificar cookie de sesión
    const adminSession = request.cookies.get('admin-session')?.value

    // 4. Redirigir a login si no está autenticado
    if (adminSession !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 5. Permitir continuar si está autenticado o la ruta es pública
  return NextResponse.next()
}

// 6. Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 📊 Dashboard Data API

**Archivo**: `app/dashboard/page.tsx` (Server Component)

```typescript
async function getDashboardData() {
  try {
    // 1. Consultas paralelas a vistas normalizadas
    const [leadsResponse, applicantsResponse] = await Promise.all([
      supabaseAdmin
        .from('leads_complete')
        .select('*')
        .order('created_at', { ascending: false }),

      supabaseAdmin
        .from('applicants_complete')
        .select('*')
        .order('created_at', { ascending: false })
    ])

    if (leadsResponse.error || applicantsResponse.error) {
      console.error('Error fetching data:',
        leadsResponse.error || applicantsResponse.error)
      return { leads: [], applicants: [] }
    }

    return {
      leads: leadsResponse.data || [],
      applicants: applicantsResponse.data || []
    }
  } catch (error) {
    console.error('Dashboard data error:', error)
    return { leads: [], applicants: [] }
  }
}

export default async function DashboardPage() {
  // 2. Verificar autenticación
  await checkAuth()

  // 3. Obtener datos normalizados
  const { leads, applicants } = await getDashboardData()

  // 4. Calcular métricas con campos normalizados
  const newLeads = leads.filter(lead => lead.status_name === 'nuevo').length
  const pendingApplicants = applicants.filter(app =>
    app.status_name === 'pendiente').length

  // 5. Renderizar dashboard con datos normalizados
  return (
    <div>
      {/* Métricas y visualizaciones */}
      {leads.map((lead) => (
        <div key={lead.id}>
          <Badge variant={lead.urgency_name === 'urgente' ? 'destructive' : 'secondary'}>
            {lead.urgency_name}
          </Badge>
        </div>
      ))}
    </div>
  )
}
```

## 🔄 Patrones de Integración

### 1. **Foreign Key Resolution Pattern**

```typescript
// Patrón para resolver FKs automáticamente
async function resolveUniversityFK(universityName: string) {
  const { data: university } = await supabaseAdmin
    .from('universities')
    .select('id')
    .ilike('name', `%${universityName || 'UNNE'}%`)
    .limit(1)
    .single()

  return university?.id || null
}

async function resolveExperienceLevelFK(levelName: string) {
  const { data: level } = await supabaseAdmin
    .from('experience_levels')
    .select('id')
    .eq('name', levelName || 'junior')
    .single()

  return level?.id || null
}
```

### 2. **Many-to-Many Skills Pattern**

```typescript
async function handleSkillsRelation(applicantId: string, skills: string[]) {
  for (const skillName of skills) {
    if (skillName.trim()) {
      // Buscar skill existente
      const { data: skill } = await supabaseAdmin
        .from('skills')
        .select('id')
        .ilike('name', `%${skillName.trim()}%`)
        .limit(1)
        .single()

      // Crear relación si existe el skill
      if (skill) {
        await supabaseAdmin
          .from('applicant_skills')
          .insert({
            applicant_id: applicantId,
            skill_id: skill.id,
            proficiency_level: 3
          })
      }
    }
  }
}
```

### 3. **Error Handling Pattern**

```typescript
async function safeAPICall<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<NextResponse> {
  try {
    const result = await operation()
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
```

## 🧪 Testing de APIs Normalizadas

### 1. **Testing Manual con Curl**

```bash
# Test Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"tecwork_admin_2024"}'

# Test Crear Lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Lead",
    "email": "test@test.com",
    "necesidad": "Testing normalizado",
    "urgencia": "alta",
    "consent": true
  }'

# Test Crear Applicant con nivel
curl -X POST http://localhost:3000/api/applicants \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Student",
    "email": "student@test.com",
    "carrera": "Ingeniería",
    "rol": "frontend",
    "nivel": "semi-senior",
    "universidad": "UNNE",
    "skills": ["React", "TypeScript"],
    "availability": "inmediato - 20 hrs/semana",
    "consent": true
  }'
```

### 2. **Verificar Datos Normalizados**

```sql
-- Verificar lead con FKs resueltos
SELECT
  l.nombre,
  ul.name as urgencia,
  ls.name as estado,
  lsr.name as fuente
FROM leads_normalized l
LEFT JOIN urgency_levels ul ON l.urgency_id = ul.id
LEFT JOIN lead_statuses ls ON l.status_id = ls.id
LEFT JOIN lead_sources lsr ON l.source_id = lsr.id
ORDER BY l.created_at DESC
LIMIT 5;

-- Verificar applicant con relaciones
SELECT
  a.nombre,
  u.name as universidad,
  el.name as nivel,
  ast.name as estado,
  array_agg(s.name) as habilidades
FROM applicants_normalized a
LEFT JOIN universities u ON a.university_id = u.id
LEFT JOIN experience_levels el ON a.experience_level_id = el.id
LEFT JOIN applicant_statuses ast ON a.status_id = ast.id
LEFT JOIN applicant_skills aps ON a.id = aps.applicant_id
LEFT JOIN skills s ON aps.skill_id = s.id
GROUP BY a.id, u.name, el.name, ast.name
ORDER BY a.created_at DESC
LIMIT 5;
```

## 📈 Performance y Optimización

### 1. **Consultas Optimizadas**

```typescript
// ✅ Usar vistas para evitar JOINs manuales
const { data } = await supabaseAdmin
  .from('leads_complete')  // Vista pre-optimizada
  .select('*')

// ❌ Evitar múltiples queries separadas
// const leads = await supabase.from('leads_normalized').select('*')
// const urgencies = await supabase.from('urgency_levels').select('*')
// // ... manual joining
```

### 2. **Caché de Lookup Tables**

```typescript
// Cache simple en memoria para lookup tables que no cambian frecuentemente
const lookupCache = new Map()

async function getCachedUniversities() {
  if (!lookupCache.has('universities')) {
    const { data } = await supabaseAdmin
      .from('universities')
      .select('*')
      .eq('active', true)

    lookupCache.set('universities', data)
  }

  return lookupCache.get('universities')
}
```

### 3. **Índices de Performance**

```sql
-- Índices para consultas frecuentes
CREATE INDEX idx_leads_status_created ON leads_normalized(status_id, created_at DESC);
CREATE INDEX idx_applicants_university_status ON applicants_normalized(university_id, status_id);
CREATE INDEX idx_skills_category_active ON skills(category, active) WHERE active = true;
```

---

## 🎯 Resumen APIs Normalizadas

### ✅ Implementado
1. **6 APIs REST completamente normalizadas**
2. **Resolución automática de Foreign Keys**
3. **Relaciones many-to-many para skills**
4. **Vistas optimizadas para consultas frontend**
5. **Manejo robusto de errores con FKs**
6. **Middleware de autenticación actualizado**
7. **Dashboard con datos normalizados**
8. **Compatibilidad Next.js 15**

### 📊 Endpoints Actualizados
- `POST /api/auth/login` - Autenticación con cookies async
- `POST /api/auth/logout` - Logout con cookies async
- `GET /api/leads` - Obtener leads desde `leads_complete`
- `POST /api/leads` - Crear leads con FKs resueltos
- `GET /api/applicants` - Obtener applicants desde `applicants_complete`
- `POST /api/applicants` - Crear applicants con nivel + skills many-to-many

**Próximo archivo**: `03-Dashboard-y-Frontend-Integration.md`