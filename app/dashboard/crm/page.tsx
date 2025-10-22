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
import { Suspense } from 'react'
import LeadsCRM from '@/components/dashboard/LeadsCRM'
import StudentsCRM from '@/components/dashboard/StudentsCRM'

// Configuración de ruta dinámica para Next.js 15
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Solo cargar estadísticas básicas - los datos completos se cargan bajo demanda
async function getCRMStats() {
  try {
    // Queries optimizadas solo para contar - mucho más rápido que SELECT *
    const [
      { count: leadsCount },
      { count: leadsNewCount },
      { count: studentsCount },
      { count: studentsNewCount }
    ] = await Promise.all([
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).eq('estado', 'Pendiente'),
      supabaseAdmin.from('aplicantes').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('aplicantes').select('*', { count: 'exact', head: true }).eq('estado', 'Aplicacion Recibida')
    ])

    return {
      leadsTotal: leadsCount || 0,
      leadsNew: leadsNewCount || 0,
      studentsTotal: studentsCount || 0,
      studentsNew: studentsNewCount || 0
    }
  } catch (error) {
    console.error('CRM stats error:', error)
    return {
      leadsTotal: 0,
      leadsNew: 0,
      studentsTotal: 0,
      studentsNew: 0
    }
  }
}

export default async function CRMPage() {
  await checkAuth()
  const stats = await getCRMStats()

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

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leadsTotal}</div>
              <p className="text-xs text-muted-foreground">
                {stats.leadsNew} pendientes de contactar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.studentsTotal}</div>
              <p className="text-xs text-muted-foreground">
                {stats.studentsNew} aplicaciones nuevas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Nuevos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leadsNew}</div>
              <p className="text-xs text-muted-foreground">
                Requieren atención inmediata
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes Nuevos</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.studentsNew}</div>
              <p className="text-xs text-muted-foreground">
                Pendientes de revisión
              </p>
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
                  Leads ({stats.leadsTotal})
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Estudiantes ({stats.studentsTotal})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="leads" className="mt-6">
                <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                  <LeadsCRM initialLeads={[]} />
                </Suspense>
              </TabsContent>

              <TabsContent value="students" className="mt-6">
                <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                  <StudentsCRM initialStudents={[]} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}