# 🧪 Testing y Deployment - Guía Completa

## 📚 Teoría: Tipos de Testing en Aplicaciones Web

### Pirámide de Testing

```
                    /\
                   /  \
                  / E2E \     ← Pocos, costosos, alta confianza
                 /______\
                /        \
               / INTEGR.  \   ← Algunos, moderados, buena cobertura
              /___________\
             /             \
            /    UNITARIOS  \  ← Muchos, rápidos, feedback inmediato
           /_________________\
```

### 1. **Unit Tests** - Funciones individuales
```typescript
// Ejemplo: Testar función de validación
describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })
})
```

### 2. **Integration Tests** - APIs y components
```typescript
// Ejemplo: Testar API endpoint
describe('/api/leads', () => {
  it('should create lead with valid data', async () => {
    const response = await request(app)
      .post('/api/leads')
      .send({
        nombre: 'Test User',
        email: 'test@example.com',
        necesidad: 'Web development'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })
})
```

### 3. **End-to-End Tests** - Flujo completo de usuario
```typescript
// Ejemplo: Testar login flow
describe('Login flow', () => {
  it('should login and redirect to dashboard', async () => {
    await page.goto('/login')
    await page.fill('[name="password"]', 'tecwork_admin_2024')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })
})
```

## 🧪 Manual Testing Strategy (Nuestra Implementación)

Como estamos en fase MVP, usamos **Manual Testing** sistemático:

### Checklist de Testing Completo

#### ✅ **1. Authentication Flow**

**Test Case 1.1: Login Exitoso**
```
1. Ir a http://localhost:3000/login
2. Ingresar email: admin@tecwork.com
3. Ingresar password: tecwork_admin_2024
4. Click "Iniciar Sesión"

Resultado Esperado:
- Redirección automática a /dashboard
- Cookie 'admin-session' creada
- No errores en console
```

**Test Case 1.2: Login Fallido**
```
1. Ir a http://localhost:3000/login
2. Ingresar password: wrong_password
3. Click "Iniciar Sesión"

Resultado Esperado:
- Mensaje de error "Contraseña incorrecta"
- Permanecer en /login
- No redirección
```

**Test Case 1.3: Protección de Rutas**
```
1. Abrir incognito/private window
2. Ir directamente a http://localhost:3000/dashboard

Resultado Esperado:
- Redirección automática a /login
- Middleware bloqueando acceso
```

**Test Case 1.4: Logout**
```
1. Estar logueado en /dashboard
2. Click "Cerrar Sesión"

Resultado Esperado:
- Redirección a /login
- Cookie 'admin-session' eliminada
```

#### ✅ **2. Form Submissions**

**Test Case 2.1: Formulario de Contacto**
```
1. Ir a http://localhost:3000/contacto
2. Llenar formulario completo:
   - Nombre: "Juan Pérez"
   - Email: "juan@empresa.com"
   - Teléfono: "+549123456789"
   - Empresa: "TechCorp"
   - Tipo de proyecto: "Desarrollo web"
   - Presupuesto: "$5,000 - $10,000"
   - Timeline: "1-3 meses"
   - Mensaje: "Necesitamos una web moderna"
3. Click "Enviar Mensaje"

Resultado Esperado:
- Loading state durante envío
- Página de éxito después del envío
- Datos guardados en Supabase
```

**Test Case 2.2: Formulario de Estudiantes**
```
1. Ir a http://localhost:3000/sumate
2. Llenar formulario completo:
   - Nombre: "Ana García"
   - Email: "ana@estudiante.com"
   - Universidad: "UNNE"
   - Carrera: "Ingeniería en Sistemas"
   - Año: "3"
   - Rol: "Frontend"
   - Skills: Seleccionar React, JavaScript, CSS
   - Nivel: "Junior"
   - Fecha inicio: "Marzo 2024"
   - Horas/semana: "20"
   - Portfolio: "https://ana-portfolio.com"
   - GitHub: "https://github.com/ana"
   - LinkedIn: "https://linkedin.com/in/ana"
3. Marcar consent checkbox
4. Click "Enviar Aplicación"

Resultado Esperado:
- Loading state durante envío
- Página de éxito después del envío
- Datos guardados en Supabase
```

#### ✅ **3. Dashboard Functionality**

**Test Case 3.1: Dashboard Data Display**
```
1. Login como admin
2. Verificar dashboard muestra:
   - Total de leads
   - Leads nuevos
   - Total de estudiantes
   - Estudiantes pendientes
   - Lista de leads recientes
   - Lista de estudiantes recientes

Resultado Esperado:
- Métricas calculadas correctamente
- Datos mostrados sin errores
- Cards responsivas
```

**Test Case 3.2: Dashboard con Base Vacía**
```
1. Con base de datos vacía
2. Ir a /dashboard

Resultado Esperado:
- Métricas en 0
- Mensaje "No hay datos disponibles"
- No errores de JavaScript
```

#### ✅ **4. Error Handling**

**Test Case 4.1: Network Errors**
```
1. Desconectar internet
2. Enviar formulario de contacto

Resultado Esperado:
- Mensaje de error "Error de conexión"
- Loading state se detiene
- Formulario mantiene datos
```

**Test Case 4.2: Server Errors**
```
1. Simular error de Supabase (credenciales incorrectas)
2. Enviar formulario

Resultado Esperado:
- Mensaje de error apropiado
- No crash de la aplicación
- Error logged en console
```

#### ✅ **5. Responsive Design**

**Test Case 5.1: Mobile (375px)**
```
1. Abrir DevTools → Responsive mode
2. Seleccionar iPhone SE (375px)
3. Navegar por todas las páginas

Resultado Esperado:
- Layout adaptado a mobile
- Navegación funcional
- Forms usables
- Dashboard legible
```

**Test Case 5.2: Tablet (768px)**
```
1. DevTools → iPad (768px)
2. Verificar todas las páginas

Resultado Esperado:
- Grid systems adaptados
- Cards en 2 columnas
- Forms cómodos de usar
```

**Test Case 5.3: Desktop (1200px+)**
```
1. DevTools → Desktop (1200px)
2. Verificar layout completo

Resultado Esperado:
- Dashboard en 4 columnas
- Máximo aprovechamiento de espacio
- Todo perfectamente alineado
```

### 🔧 **Browser Testing**

#### Cross-browser Compatibility
```
Browsers a probar:
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (si tienes Mac)
✅ Edge (Windows)

Para cada browser:
- Login flow
- Form submissions
- Dashboard display
- Responsive behavior
```

#### Browser DevTools Testing

**Console Errors:**
```
1. Abrir DevTools (F12)
2. Ir a Console tab
3. Navegar por toda la app
4. Verificar: No errors en rojo
```

**Network Tab:**
```
1. DevTools → Network tab
2. Enviar formulario
3. Verificar:
   - POST request a /api/leads exitoso (200)
   - Response JSON correcto
   - No failed requests
```

**Application Tab:**
```
1. DevTools → Application tab
2. Login como admin
3. Ir a Cookies → localhost:3000
4. Verificar: Cookie 'admin-session=true' existe
```

## 🗄️ Database Testing

### Verificar Datos en Supabase

**1. Acceder a Supabase Dashboard:**
```
1. Ir a https://supabase.com/dashboard
2. Seleccionar tu proyecto
3. Ir a Table Editor
```

**2. Verificar Tabla `leads`:**
```sql
-- Query para verificar leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- Verificar estructura
\d leads;
```

**3. Verificar Tabla `applicants`:**
```sql
-- Query para verificar applicants
SELECT * FROM applicants ORDER BY created_at DESC LIMIT 10;

-- Verificar estructura
\d applicants;
```

**4. Test Data Integrity:**
```sql
-- Verificar que no hay datos nulos donde no deberían
SELECT * FROM leads WHERE nombre IS NULL OR email IS NULL;
SELECT * FROM applicants WHERE nombre IS NULL OR email IS NULL;

-- Verificar formatos de email
SELECT * FROM leads WHERE email NOT LIKE '%@%';
SELECT * FROM applicants WHERE email NOT LIKE '%@%';
```

### Performance Testing

**Query Performance:**
```sql
-- Explain query plans
EXPLAIN ANALYZE SELECT * FROM leads WHERE status = 'nuevo';
EXPLAIN ANALYZE SELECT * FROM applicants WHERE rol = 'frontend';
```

**Index Verification:**
```sql
-- Verificar que índices existen
SELECT indexname, tablename FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('leads', 'applicants');
```

## 🚀 Deployment Strategy

### 1. **Preparación para Producción**

#### Environment Variables para Producción
```bash
# .env.production (NO commitear)
ADMIN_PASSWORD=super_secure_password_2024_prod
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
NEXT_PUBLIC_APP_URL=https://tecwork.vercel.app
NODE_ENV=production
```

#### Build Testing Local
```bash
# Test production build locally
npm run build
npm start

# Verificar:
- Build exitoso sin errores
- Aplicación funciona en modo producción
- Performance optimizada
```

### 2. **Deployment en Vercel**

#### Setup Inicial
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde directorio del proyecto
cd C:\Users\LENOVO\tecwork
vercel

# Seguir prompts:
? Set up and deploy "C:\Users\LENOVO\tecwork"? [Y/n] y
? Which scope? → tu-username
? Link to existing project? [y/N] n
? What's your project's name? → tecwork
? In which directory is your code located? → ./
```

#### Configurar Variables de Entorno en Vercel
```bash
# Via Vercel CLI
vercel env add ADMIN_PASSWORD
# Enter value: super_secure_password_2024_prod

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter value: https://your-project.supabase.co

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Enter value: eyJhbGciOi...

# O via Vercel Dashboard:
# 1. Ir a vercel.com/dashboard
# 2. Seleccionar proyecto
# 3. Settings → Environment Variables
# 4. Agregar todas las variables
```

#### Deploy Commands
```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver domains
vercel domains
```

### 3. **Post-Deployment Testing**

#### Production Health Check
```
1. Verificar URL de producción carga
2. Test login flow en producción
3. Test form submissions en producción
4. Verificar datos se guardan en Supabase
5. Test responsive en dispositivos reales
```

#### Performance Verification
```
1. Google PageSpeed Insights
   - Ir a https://pagespeed.web.dev/
   - Ingresar URL de producción
   - Verificar scores > 90

2. Lighthouse Audit (Chrome DevTools)
   - F12 → Lighthouse tab
   - Run audit en producción
   - Verificar métricas
```

#### SEO Basic Check
```
1. Verificar meta tags en <head>
2. Verificar URLs amigables
3. Verificar que páginas son indexables
4. Verificar sitemap (si aplicable)
```

### 4. **Monitoring y Maintenance**

#### Error Tracking
```typescript
// Opcional: Integrar Sentry para error tracking
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

#### Analytics
```typescript
// Google Analytics 4 (opcional)
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

#### Uptime Monitoring
```
Herramientas recomendadas:
- UptimeRobot (gratis)
- Pingdom
- StatusCake

Configurar alerts para:
- Downtime
- Response time > 5s
- Error rates > 5%
```

## 🔒 Security Testing

### 1. **Authentication Security**

```
Test Cases:
✅ Cookie HttpOnly (no accesible desde JS)
✅ Cookie Secure en HTTPS
✅ Cookie SameSite protection
✅ Password no enviado en logs
✅ Variables de entorno no expuestas
```

### 2. **API Security**

```bash
# Test injection attacks (manual)
curl -X POST https://tu-app.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{"nombre": "<script>alert(\"xss\")</script>", "email": "test@test.com"}'

# Verificar que data se escapa correctamente
```

### 3. **HTTPS Verification**

```
1. Verificar certificado SSL válido
2. Verificar redirección HTTP → HTTPS
3. Verificar headers de seguridad:
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security
```

## 📊 Performance Testing

### Core Web Vitals
```
Métricas importantes:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
```

### Load Testing (Opcional)
```bash
# Usar artillery.js para load testing
npm install -g artillery

# Crear artillery-test.yml
artillery run artillery-test.yml

# Verificar que app maneja 100+ requests concurrentes
```

## 🎯 Testing Checklist Final

### Pre-Deployment
- [ ] Todos los manual tests pasan
- [ ] Build de producción exitoso
- [ ] Variables de entorno configuradas
- [ ] Base de datos de producción lista
- [ ] No secrets en código
- [ ] Error handling probado

### Post-Deployment
- [ ] URL de producción funciona
- [ ] Auth flow en producción
- [ ] Forms funcionan en producción
- [ ] Dashboard muestra datos reales
- [ ] Performance acceptable (PageSpeed > 90)
- [ ] Responsive en dispositivos reales
- [ ] Cross-browser compatibility

### Ongoing Monitoring
- [ ] Error tracking configurado
- [ ] Uptime monitoring activo
- [ ] Performance monitoring
- [ ] Regular backup de base de datos
- [ ] Security headers verificados

---

## 🎯 Resumen de Testing Strategy

1. ✅ **Manual Testing sistemático** - Cobertura completa de funcionalidad
2. ✅ **Database verification** - Integridad de datos
3. ✅ **Cross-browser testing** - Compatibilidad amplia
4. ✅ **Responsive testing** - Mobile-first validated
5. ✅ **Security testing** - Auth y data protection
6. ✅ **Performance testing** - Core Web Vitals optimized
7. ✅ **Production deployment** - Vercel + Supabase ready

**Tu MVP está listo para producción con testing completo!** 🚀

**Próximo archivo**: `05-Resumen-y-Arquitectura-Final.md`