import { checkAuth } from '@/lib/auth/simple'
import { supabaseAdmin } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Building,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  BarChart3,
  FileText,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import LeadsCRM from '@/components/dashboard/LeadsCRM'
import StudentsCRM from '@/components/dashboard/StudentsCRM'

async function getCRMData() {
  try {
    // Obtener leads desde la tabla principal
    const { data: leads, error: leadsError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    // Obtener aplicantes desde la tabla principal
    const { data: applicants, error: applicantsError } = await supabaseAdmin
      .from('aplicantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (leadsError || applicantsError) {
      console.error('Error fetching CRM data:', leadsError || applicantsError)
      return { leads: [], applicants: [] }
    }

    return { leads: leads || [], applicants: applicants || [] }
  } catch (error) {
    console.error('CRM data error:', error)
    return { leads: [], applicants: [] }
  }
}

export default async function CRMPage() {
  await checkAuth()
  const { leads, applicants } = await getCRMData()

  // Estadísticas avanzadas
  const leadsStats = {
    total: leads.length,
    pendientes: leads.filter(l => l.estado === 'Pendiente').length,
    enEspera: leads.filter(l => l.estado === 'En Espera').length,
    terminados: leads.filter(l => l.estado === 'Terminado').length,
    cancelados: leads.filter(l => l.estado === 'Cancelado').length,
    urgentes: leads.filter(l => l.urgencia === 'Urgente').length,
  }

  const studentsStats = {
    total: applicants.length,
    nuevos: applicants.filter(a => a.estado === 'Aplicacion Recibida').length,
    enRevision: applicants.filter(a => a.estado === 'En Revision').length,
    entrevistas: applicants.filter(a => a.estado === 'Entrevista Pendiente').length,
    aprobados: applicants.filter(a => a.estado === 'Aprobado - Disponible').length,
    activos: applicants.filter(a => a.estado === 'En Proyecto Activo').length,
    conCV: applicants.filter(a => a.cv_url).length,
  }

  const conversionRate = leadsStats.total > 0 ? ((leadsStats.terminados / leadsStats.total) * 100).toFixed(1) : '0'
  const approvalRate = studentsStats.total > 0 ? (((studentsStats.aprobados + studentsStats.activos) / studentsStats.total) * 100).toFixed(1) : '0'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Dashboard
              </Link>
              <span className="text-muted-foreground">•</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium flex items-center gap-1">
                <Users className="h-3 w-3" />
                CRM
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">CRM TecWork</h1>
            <p className="text-slate-600">Sistema de gestión de leads y estudiantes</p>
          </div>
          <div className="flex items-center gap-4">
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadsStats.total}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {leadsStats.pendientes} pendientes
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {leadsStats.urgentes} urgentes
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentsStats.total}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {studentsStats.nuevos} nuevos
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {studentsStats.conCV} con CV
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {leadsStats.terminados} de {leadsStats.total} leads cerrados exitosamente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa Aprobación</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalRate}%</div>
              <p className="text-xs text-muted-foreground">
                {studentsStats.aprobados + studentsStats.activos} estudiantes aprobados/activos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas Detalladas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Estado de Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    Pendientes
                  </span>
                  <Badge variant="outline">{leadsStats.pendientes}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    En Espera
                  </span>
                  <Badge variant="outline">{leadsStats.enEspera}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    Terminados
                  </span>
                  <Badge variant="outline">{leadsStats.terminados}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    Cancelados
                  </span>
                  <Badge variant="outline">{leadsStats.cancelados}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Estado de Estudiantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    Aplicaciones Nuevas
                  </span>
                  <Badge variant="outline">{studentsStats.nuevos}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    En Revisión
                  </span>
                  <Badge variant="outline">{studentsStats.enRevision}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    Entrevistas Pendientes
                  </span>
                  <Badge variant="outline">{studentsStats.entrevistas}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    Aprobados/Activos
                  </span>
                  <Badge variant="outline">{studentsStats.aprobados + studentsStats.activos}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CRM Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Gestión CRM</CardTitle>
            <CardDescription>
              Administra leads de empresas y aplicaciones de estudiantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="leads" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Leads ({leadsStats.total})
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Estudiantes ({studentsStats.total})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="leads" className="mt-6">
                <LeadsCRM initialLeads={leads} />
              </TabsContent>

              <TabsContent value="students" className="mt-6">
                <StudentsCRM initialStudents={applicants} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}