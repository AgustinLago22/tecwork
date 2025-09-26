# 🎛️ Dashboard y Integración Frontend - Implementación Completa

## 📚 Teoría: Server Components vs Client Components

### ¿Qué son los Server Components?
Los **Server Components** son una nueva característica de React 18 + Next.js 13+ que se ejecutan en el **servidor** durante el build o request:

```typescript
// Server Component (por defecto en app/)
export default async function DashboardPage() {
  // Esto se ejecuta en el servidor
  const data = await getDashboardData()

  return <div>{data.leads.length} leads</div>
}
```

**Ventajas:**
- ✅ **Performance**: No se envía JavaScript al cliente
- ✅ **SEO**: HTML pre-renderizado
- ✅ **Seguridad**: Acceso directo a BD/APIs sin exponer datos
- ✅ **Bundle Size**: Componentes no aumentan el bundle del cliente

### ¿Cuándo usar Client Components?
Los **Client Components** se ejecutan en el navegador y permiten interactividad:

```typescript
"use client" // Directiva obligatoria

export default function InteractiveForm() {
  const [data, setData] = useState('')

  return (
    <input
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  )
}
```

**Usar cuando necesitas:**
- Estado (`useState`, `useReducer`)
- Efectos (`useEffect`)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`)

## 🎛️ Implementación del Dashboard

### Estructura del Dashboard

**Archivo**: `app/dashboard/page.tsx`

```typescript
import { checkAuth } from '@/lib/auth/simple'
import { supabaseAdmin } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// ... otros imports

// Server Component - se ejecuta en el servidor
export default async function DashboardPage() {
  // 1. Verificar autenticación antes de renderizar
  await checkAuth()

  // 2. Obtener datos directamente de la base de datos
  const { leads, applicants } = await getDashboardData()

  // 3. Calcular métricas
  const newLeads = leads.filter(lead => lead.status === 'nuevo').length
  const totalLeads = leads.length
  const pendingApplicants = applicants.filter(app => app.status === 'pendiente').length
  const totalApplicants = applicants.length

  // 4. Renderizar UI con datos
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Dashboard content */}
    </div>
  )
}
```

### ¿Por qué Server Component para Dashboard?

1. **Seguridad**: Acceso directo a Supabase con service key
2. **Performance**: No necesita JavaScript en cliente para mostrar datos
3. **SEO**: Datos pre-renderizados en HTML
4. **Simplicidad**: No necesita useEffect + loading states

### Función de Autenticación del Servidor

```typescript
// lib/auth/simple.ts
export async function checkAuth() {
  const cookieStore = cookies()
  const isLoggedIn = cookieStore.get('admin-session')?.value === 'true'

  if (!isLoggedIn) {
    redirect('/login') // Redirige automáticamente
  }

  return true
}
```

**¿Cómo funciona?**
- `cookies()` accede a cookies del request actual
- `redirect()` causa una redirección HTTP 302
- Si no está autenticado, nunca llega a renderizar el dashboard

### Función de Datos del Dashboard

```typescript
async function getDashboardData() {
  try {
    // Consultas paralelas para mejor performance
    const [leadsResult, applicantsResult] = await Promise.all([
      supabaseAdmin.from('leads').select('*'),
      supabaseAdmin.from('applicants').select('*')
    ])

    return {
      leads: leadsResult.data || [],
      applicants: applicantsResult.data || []
    }
  } catch (error) {
    console.error('Dashboard data error:', error)
    return { leads: [], applicants: [] }
  }
}
```

**¿Por qué Promise.all()?**
- Ejecuta consultas en **paralelo** en lugar de secuencial
- Reduce tiempo total de carga
- Si una falla, la otra continúa

## 📊 Componentes de Métricas

### Cards de Estadísticas

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
      <Building className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{totalLeads}</div>
      <p className="text-xs text-muted-foreground">
        {newLeads} nuevos este período
      </p>
    </CardContent>
  </Card>
  {/* ...más cards */}
</div>
```

**Patrones utilizados:**
- **Grid responsive**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Iconos descriptivos**: Lucide React icons
- **Información contextual**: Métricas principales + submétrica
- **Design system**: shadcn/ui components

### Lista de Elementos Recientes

```typescript
<Card>
  <CardHeader>
    <CardTitle>Leads Recientes</CardTitle>
    <CardDescription>Últimas empresas interesadas</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {recentLeads.map((lead) => (
        <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1">
            <p className="font-medium">{lead.nombre}</p>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
            {lead.empresa && (
              <p className="text-xs text-muted-foreground">{lead.empresa}</p>
            )}
          </div>
          <div className="text-right">
            <Badge variant={lead.urgencia === 'urgente' ? 'destructive' : 'secondary'}>
              {lead.urgencia}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(lead.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      {recentLeads.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No hay leads disponibles
        </p>
      )}
    </div>
  </CardContent>
</Card>
```

**Características:**
- **Conditional rendering**: Muestra empresa solo si existe
- **Badges dinámicos**: Color basado en urgencia
- **Estado vacío**: Mensaje cuando no hay datos
- **Formato de fechas**: Conversión automática a formato local

## 🔄 Integración Frontend-Backend

### Formulario de Contacto (`/contacto`)

#### Client Component para Interactividad

```typescript
"use client"

export default function ContactoPage() {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipoProyecto: "",
    presupuesto: "",
    timeline: "",
    mensaje: "",
    comoConociste: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Llamada a nuestra API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          sitio_web: null,
          necesidad: formData.tipoProyecto,
          mensaje: `${formData.mensaje}${formData.comoConociste ? ` | Cómo nos conoció: ${formData.comoConociste}` : ''}`,
          presupuesto_estimado: formData.presupuesto ? parseInt(formData.presupuesto.replace(/[^\d]/g, '')) : null,
          urgencia: formData.timeline === 'inmediato' ? 'urgente' :
                   formData.timeline === '1-3-meses' ? 'alta' :
                   formData.timeline === '3-6-meses' ? 'media' : 'baja',
          source: 'web',
          consent: true
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true) // Cambiar a página de éxito
      } else {
        console.error('Error:', data.error)
        alert('Hubo un error al enviar tu mensaje.')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Error de conexión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderizado condicional
  if (isSubmitted) {
    return <SuccessPage />
  }

  return <FormPage />
}
```

#### Transformación de Datos

**¿Por qué transformamos los datos?**

```typescript
// Frontend: Datos de UI
formData = {
  timeline: "inmediato",
  presupuesto: "$5,000 - $10,000",
  comoConociste: "Google"
}

// Backend: Datos de BD
leadData = {
  urgencia: "urgente",                    // timeline → urgencia
  presupuesto_estimado: 7500,             // string → number
  mensaje: "Necesito ayuda | Cómo nos conoció: Google"  // concatenación
}
```

**Beneficios:**
- Frontend mantiene UX amigable
- Backend recibe datos normalizados
- Base de datos tiene formato consistente

### Formulario de Estudiantes (`/sumate`)

#### Manejo de Arrays (Skills)

```typescript
// Estado para skills múltiples
const [formData, setFormData] = useState({
  skills: [] as string[],
  // ... otros campos
})

// Función para toggle skills
const toggleSkill = (skill: string) => {
  if (formData.skills.includes(skill)) {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  } else {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }))
  }
}

// En el submit, convertir array a string
body: JSON.stringify({
  // ...otros campos
  skills: formData.skills, // Array enviado como JSON
})
```

#### En el Backend (API)

```typescript
// Convertir array a string para BD
const applicantData = {
  // ...otros campos
  skills: Array.isArray(body.skills) ? body.skills.join(', ') : (body.skills || ''),
}
```

**¿Por qué esta conversión?**
- Frontend: Array es más fácil de manejar
- Backend: String es compatible con más tipos de BD
- Futuro: Podemos cambiar a JSON column si necesitamos búsquedas complejas

## 🎨 Integración con Sistema de Diseño

### shadcn/ui Components

Tu proyecto ya usa shadcn/ui, que proporciona:

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
```

**Ventajas:**
- **Consistency**: Design system unificado
- **Accessibility**: Componentes accesibles por defecto
- **Customizable**: Basado en Tailwind, fácil personalización
- **Type-safe**: TypeScript integrado

### Tema Personalizado "Notepad"

Tu proyecto tiene un tema único:

```css
/* Clases personalizadas en globals.css */
.paper-texture { /* Textura de papel */ }
.sketch-border { /* Bordes tipo sketch */ }
.handwritten { /* Font handwritten */ }
```

## 🔐 Logout Functionality

### Botón de Logout en Dashboard

```typescript
// Usando Server Action (más moderno)
<form action="/api/auth/logout" method="POST">
  <Button variant="outline" size="sm" type="submit">
    <LogOut className="h-4 w-4 mr-2" />
    Cerrar Sesión
  </Button>
</form>
```

**¿Por qué form con action?**
- **Progressive Enhancement**: Funciona sin JavaScript
- **Simplicidad**: No necesita estado ni handlers
- **Confiabilidad**: Siempre funciona

### Alternative: Client-side Logout

```typescript
"use client"

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  )
}
```

## 📱 Responsive Design

### Grid System

```typescript
// Cards responsivas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Contenido principal
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

**Breakpoints:**
- `grid-cols-1`: Mobile (< 768px)
- `md:grid-cols-2`: Tablet (768px+)
- `lg:grid-cols-4`: Desktop (1024px+)

### Mobile-first Approach

```typescript
// Siempre empezar con mobile
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
className="space-y-4 md:space-y-6"
```

## 🔄 Data Flow Patterns

### Server Component Data Flow

```
1. Usuario navega a /dashboard
   ↓
2. Next.js ejecuta DashboardPage() en servidor
   ↓
3. checkAuth() verifica cookie
   ↓ (si auth OK)
4. getDashboardData() consulta Supabase
   ↓
5. Server renderiza HTML con datos
   ↓
6. Cliente recibe HTML completo
   ↓
7. Hidratación mínima (solo componentes interactivos)
```

### Client Component Data Flow

```
1. Usuario ve formulario
   ↓
2. Componente se hidrata en cliente
   ↓
3. useState maneja estado del form
   ↓
4. onSubmit → fetch() → API
   ↓
5. API procesa y responde
   ↓
6. setState actualiza UI
   ↓
7. Renderizado condicional (success page)
```

## 🛠️ Error Handling Frontend

### Loading States

```typescript
const [isSubmitting, setIsSubmitting] = useState(false)

return (
  <Button disabled={isSubmitting}>
    {isSubmitting ? "Enviando..." : "Enviar"}
  </Button>
)
```

### Error Messages

```typescript
const [error, setError] = useState("")

// En el handleSubmit
if (!data.success) {
  setError(data.message || 'Error desconocido')
  return
}

// En el render
{error && (
  <Alert className="border-red-200 bg-red-50">
    <AlertDescription className="text-red-700">
      {error}
    </AlertDescription>
  </Alert>
)}
```

### Success States

```typescript
// Renderizado condicional completo
if (isSubmitted) {
  return (
    <div className="success-page">
      <CheckCircle className="text-green-600" />
      <h2>¡Mensaje enviado exitosamente!</h2>
    </div>
  )
}

return <FormComponent />
```

## 🎯 Optimizaciones de Performance

### 1. **Server Components por Defecto**
- Dashboard usa Server Component → HTML pre-renderizado
- Solo formularios usan Client Components

### 2. **Consultas Paralelas**
```typescript
// ❌ Secuencial (lento)
const leads = await supabase.from('leads').select('*')
const applicants = await supabase.from('applicants').select('*')

// ✅ Paralelo (rápido)
const [leads, applicants] = await Promise.all([
  supabase.from('leads').select('*'),
  supabase.from('applicants').select('*')
])
```

### 3. **Memoización con React**
```typescript
// Para cálculos costosos en Client Components
const expensiveCalculation = useMemo(() => {
  return leads.reduce((acc, lead) => {
    // cálculo complejo
  }, {})
}, [leads])
```

### 4. **Lazy Loading**
```typescript
// Para componentes pesados
const HeavyChart = lazy(() => import('./HeavyChart'))

return (
  <Suspense fallback={<div>Cargando gráfico...</div>}>
    <HeavyChart data={data} />
  </Suspense>
)
```

## 📈 Futuras Mejoras

### 1. **Real-time Updates**
```typescript
// Usando Supabase Realtime
useEffect(() => {
  const subscription = supabase
    .channel('dashboard')
    .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          setLeads(prev => [payload.new, ...prev])
        })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

### 2. **Infinite Scroll**
```typescript
const [page, setPage] = useState(1)
const [hasMore, setHasMore] = useState(true)

const loadMore = async () => {
  const response = await fetch(`/api/leads?page=${page + 1}`)
  const { leads: newLeads, hasMore: more } = await response.json()

  setLeads(prev => [...prev, ...newLeads])
  setHasMore(more)
  setPage(prev => prev + 1)
}
```

### 3. **Optimistic Updates**
```typescript
const createLead = async (leadData) => {
  // Actualizar UI inmediatamente
  setLeads(prev => [{ ...leadData, id: 'temp' }, ...prev])

  try {
    const response = await fetch('/api/leads', { ... })
    const { lead } = await response.json()

    // Reemplazar temporal con real
    setLeads(prev => prev.map(l =>
      l.id === 'temp' ? lead : l
    ))
  } catch (error) {
    // Revertir en caso de error
    setLeads(prev => prev.filter(l => l.id !== 'temp'))
  }
}
```

---

## 🎯 Resumen de Integración Frontend

1. ✅ **Dashboard Server Component** - Performance óptima
2. ✅ **Formularios Client Components** - Interactividad completa
3. ✅ **Error handling robusto** - UX profesional
4. ✅ **Responsive design** - Mobile-first
5. ✅ **Design system consistente** - shadcn/ui + tema custom
6. ✅ **Data flow optimizado** - Server + Client patterns
7. ✅ **Auth integration** - Protección transparente

**Próximo archivo**: `04-Testing-y-Deployment.md`