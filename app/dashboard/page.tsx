import { checkAuth } from '@/lib/auth/simple'
import { supabaseAdmin } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  Mail,
  TrendingUp,
  Clock,
  LogOut,
  User,
  Building,
  GraduationCap,
  Star,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

async function getDashboardData() {
  try {
    // Obtener leads desde tu vista optimizada
    const { data: leads, error: leadsError } = await supabaseAdmin
      .from('vista_leads')
      .select('*')
      .order('created_at', { ascending: false })

    // Obtener aplicantes desde tu vista optimizada
    const { data: applicants, error: applicantsError } = await supabaseAdmin
      .from('vista_aplicantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (leadsError || applicantsError) {
      console.error('Error fetching data:', leadsError || applicantsError)
      return { leads: [], applicants: [] }
    }

    return { leads: leads || [], applicants: applicants || [] }
  } catch (error) {
    console.error('Dashboard data error:', error)
    return { leads: [], applicants: [] }
  }
}

async function LogoutButton() {
  const handleLogout = async () => {
    'use client'
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="ml-auto"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Cerrar Sesión
    </Button>
  )
}

export default async function DashboardPage() {
  await checkAuth()
  const { leads, applicants } = await getDashboardData()

  // Estadísticas usando los campos de tu BD
  const newLeads = leads.filter(lead => lead.estado === 'Pendiente').length
  const totalLeads = leads.length
  const pendingApplicants = applicants.filter(app => app.estado === 'Aplicacion Recibida').length
  const totalApplicants = applicants.length
  const recentLeads = leads.slice(0, 5)
  const recentApplicants = applicants.slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Dashboard
              </span>
              <span className="text-muted-foreground">•</span>
              <Link href="/dashboard/crm" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Users className="h-3 w-3" />
                CRM
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard TecWork</h1>
            <p className="text-slate-600">Panel de administración y métricas</p>
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

        {/* Estadísticas principales */}
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Nuevos</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newLeads}</div>
              <p className="text-xs text-muted-foreground">
                Pendientes de contactar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplicants}</div>
              <p className="text-xs text-muted-foreground">
                {pendingApplicants} pendientes de revisión
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplicants}</div>
              <p className="text-xs text-muted-foreground">
                Requieren evaluación
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leads recientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <Badge variant={lead.urgencia === 'Urgente' ? 'destructive' : 'secondary'}>
                        {lead.urgencia || 'Baja'}
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

          {/* Applicants recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes Recientes</CardTitle>
              <CardDescription>Últimas aplicaciones de estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplicants.map((applicant) => (
                  <div key={applicant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{applicant.nombre}</p>
                      <p className="text-sm text-muted-foreground">{applicant.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{applicant.año_cursado ? `${applicant.año_cursado}º año` : 'N/A'}</Badge>
                        <Badge variant="secondary">{applicant.nivel_experiencia || 'Principiante'}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={applicant.estado === 'Aplicacion Recibida' ? 'default' : 'secondary'}>
                        {applicant.estado}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(applicant.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentApplicants.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No hay aplicaciones disponibles
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}