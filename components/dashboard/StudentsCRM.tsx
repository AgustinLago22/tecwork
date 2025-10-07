"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  FileText,
  Github,
  Linkedin,
  Globe,
  Download,
  ExternalLink,
  Star,
  Code,
} from 'lucide-react'
import { VistaAplicante } from '@/lib/types/database'

interface StudentsCRMProps {
  initialStudents: VistaAplicante[]
}

export default function StudentsCRM({ initialStudents }: StudentsCRMProps) {
  const [students, setStudents] = useState<VistaAplicante[]>(initialStudents)
  const [filteredStudents, setFilteredStudents] = useState<VistaAplicante[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [universityFilter, setUniversityFilter] = useState('all')
  const [experienceFilter, setExperienceFilter] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState<VistaAplicante | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(initialStudents.length === 0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const studentsPerPage = 10
  const { toast } = useToast()

  // Estados posibles para estudiantes
  const studentStates = [
    { id: 1, name: 'Aplicacion Recibida', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'En Revision', color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Entrevista Pendiente', color: 'bg-purple-100 text-purple-800' },
    { id: 4, name: 'Aprobado - Disponible', color: 'bg-green-100 text-green-800' },
    { id: 5, name: 'En Proyecto Activo', color: 'bg-indigo-100 text-indigo-800' },
    { id: 6, name: 'No Califica', color: 'bg-red-100 text-red-800' },
    { id: 7, name: 'Inactivo Temporal', color: 'bg-gray-100 text-gray-800' },
  ]

  // Cargar datos si no vienen del servidor (lazy loading)
  useEffect(() => {
    if (initialStudents.length === 0) {
      const fetchStudents = async () => {
        try {
          const response = await fetch('/api/applicants')
          if (response.ok) {
            const data = await response.json()
            setStudents(data.applicants || [])
            setFilteredStudents(data.applicants || [])
          }
        } catch (error) {
          console.error('Error fetching students:', error)
          toast({
            title: 'Error',
            description: 'No se pudieron cargar los estudiantes',
            variant: 'destructive'
          })
        } finally {
          setIsLoading(false)
        }
      }
      fetchStudents()
    }
  }, [initialStudents, toast])

  // Obtener universidades únicas
  const universities = [...new Set(students.map(s => s.universidad).filter(Boolean))]

  // Obtener niveles de experiencia únicos
  const experienceLevels = [...new Set(students.map(s => s.nivel_experiencia).filter(Boolean))]

  // Filtros en tiempo real
  useEffect(() => {
    let filtered = students

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.carrera?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.habilidades?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(student => student.estado === statusFilter)
    }

    // Filtro por universidad
    if (universityFilter !== 'all') {
      filtered = filtered.filter(student => student.universidad === universityFilter)
    }

    // Filtro por experiencia
    if (experienceFilter !== 'all') {
      filtered = filtered.filter(student => student.nivel_experiencia === experienceFilter)
    }

    setFilteredStudents(filtered)
    setCurrentPage(1)
  }, [students, searchTerm, statusFilter, universityFilter, experienceFilter])

  // Paginación
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage)

  // Actualizar estado del estudiante
  const updateStudentStatus = async (studentId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/applicants/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: studentId, status: newStatus })
      })

      if (response.ok) {
        // Actualizar estado local
        setStudents(prev => prev.map(student =>
          student.id === studentId ? { ...student, estado: newStatus } : student
        ))

        toast({
          title: "Estado actualizado",
          description: `Estudiante marcado como ${newStatus}`
        })
      } else {
        throw new Error('Error al actualizar')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado del estudiante"
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    const state = studentStates.find(s => s.name === status)
    return state?.color || 'bg-gray-100 text-gray-800'
  }

  // Función para visualizar CV
  const viewCV = async (cvUrl: string, studentName: string) => {
    if (!cvUrl) {
      toast({
        variant: "destructive",
        title: "CV no disponible",
        description: "Este estudiante no ha subido su CV"
      })
      return
    }

    try {
      // Abrir CV en nueva pestaña
      window.open(cvUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo abrir el CV"
      })
    }
  }

  // Función para parsear habilidades
  const parseSkills = (skills: string | undefined) => {
    if (!skills) return []
    return skills.split(',').map(skill => skill.trim()).filter(Boolean)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando estudiantes...</p>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              CRM de Estudiantes
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gestiona aplicaciones y perfiles de estudiantes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {filteredStudents.length} estudiantes
            </Badge>
            <Button asChild size="sm">
              <a href="/sumate" target="_blank" rel="noopener noreferrer">
                <GraduationCap className="h-3 w-3 mr-1" />
                Ver Formulario
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filtros */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email, carrera o habilidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-52">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {studentStates.map(state => (
                <SelectItem key={state.id} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Universidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las universidades</SelectItem>
              {universities.map(uni => (
                <SelectItem key={uni} value={uni!}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={experienceFilter} onValueChange={setExperienceFilter}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Experiencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              {experienceLevels.map(level => (
                <SelectItem key={level} value={level!}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabla de estudiantes */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Universidad</TableHead>
                <TableHead>Año/Experiencia</TableHead>
                <TableHead>Habilidades</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>CV</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {student.nombre} {student.apellido}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </p>
                      {student.telefono && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.telefono}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{student.universidad || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{student.carrera || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.año_cursado && (
                        <Badge variant="outline">
                          {student.año_cursado}º año
                        </Badge>
                      )}
                      {student.nivel_experiencia && (
                        <Badge variant="secondary" className="block w-fit">
                          {student.nivel_experiencia}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {parseSkills(student.habilidades).slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {parseSkills(student.habilidades).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{parseSkills(student.habilidades).length - 3} más
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={student.estado || 'Aplicacion Recibida'}
                      onValueChange={(value) => updateStudentStatus(student.id, value)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue>
                          <Badge className={getStatusBadgeClass(student.estado || 'Aplicacion Recibida')}>
                            {student.estado || 'Aplicacion Recibida'}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {studentStates.map(state => (
                          <SelectItem key={state.id} value={state.name}>
                            <span className={`px-2 py-1 rounded text-xs ${state.color}`}>
                              {state.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {student.cv_url ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewCV(student.cv_url!, `${student.nombre} ${student.apellido}`)}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        Ver CV
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">No subido</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {student.github_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(student.github_url, '_blank')}
                        >
                          <Github className="h-3 w-3" />
                        </Button>
                      )}
                      {student.linkedin_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(student.linkedin_url, '_blank')}
                        >
                          <Linkedin className="h-3 w-3" />
                        </Button>
                      )}
                      {student.portfolio_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(student.portfolio_url, '_blank')}
                        >
                          <Globe className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isDialogOpen && selectedStudent?.id === student.id}
                            onOpenChange={(open) => {
                              setIsDialogOpen(open)
                              if (!open) setSelectedStudent(null)
                            }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Perfil Completo del Estudiante</DialogTitle>
                          <DialogDescription>
                            Información detallada de {student.nombre} {student.apellido}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-6">
                            {/* Información personal */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Información Personal</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p><strong>Nombre:</strong> {selectedStudent.nombre} {selectedStudent.apellido}</p>
                                  <p><strong>Email:</strong> {selectedStudent.email}</p>
                                  {selectedStudent.telefono && (
                                    <p><strong>Teléfono:</strong> {selectedStudent.telefono}</p>
                                  )}
                                  <p><strong>Estado:</strong>
                                    <Badge className={`ml-2 ${getStatusBadgeClass(selectedStudent.estado || 'Aplicacion Recibida')}`}>
                                      {selectedStudent.estado || 'Aplicacion Recibida'}
                                    </Badge>
                                  </p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Información Académica</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p><strong>Universidad:</strong> {selectedStudent.universidad || 'N/A'}</p>
                                  <p><strong>Carrera:</strong> {selectedStudent.carrera || 'N/A'}</p>
                                  {selectedStudent.año_cursado && (
                                    <p><strong>Año cursado:</strong> {selectedStudent.año_cursado}º año</p>
                                  )}
                                  <p><strong>Nivel de experiencia:</strong> {selectedStudent.nivel_experiencia || 'N/A'}</p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Habilidades técnicas */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <Code className="h-5 w-5" />
                                  Habilidades Técnicas
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {parseSkills(selectedStudent.habilidades).map((skill, idx) => (
                                    <Badge key={idx} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {parseSkills(selectedStudent.habilidades).length === 0 && (
                                    <p className="text-muted-foreground">No especificadas</p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Enlaces y CV */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Enlaces y Documentos</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                  {selectedStudent.cv_url && (
                                    <Button
                                      variant="outline"
                                      onClick={() => viewCV(selectedStudent.cv_url!, `${selectedStudent.nombre} ${selectedStudent.apellido}`)}
                                      className="flex items-center gap-2"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Ver CV
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {selectedStudent.github_url && (
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(selectedStudent.github_url, '_blank')}
                                      className="flex items-center gap-2"
                                    >
                                      <Github className="h-4 w-4" />
                                      GitHub
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {selectedStudent.linkedin_url && (
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(selectedStudent.linkedin_url, '_blank')}
                                      className="flex items-center gap-2"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                      LinkedIn
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {selectedStudent.portfolio_url && (
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(selectedStudent.portfolio_url, '_blank')}
                                      className="flex items-center gap-2"
                                    >
                                      <Globe className="h-4 w-4" />
                                      Portfolio
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Motivación */}
                            {selectedStudent.motivacion && (
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Motivación</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="bg-muted p-3 rounded">{selectedStudent.motivacion}</p>
                                </CardContent>
                              </Card>
                            )}

                            {/* Información adicional */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Información Adicional</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p><strong>Fecha de aplicación:</strong> {new Date(selectedStudent.created_at).toLocaleString('es-ES')}</p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1}-{Math.min(startIndex + studentsPerPage, filteredStudents.length)} de {filteredStudents.length} estudiantes
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No se encontraron estudiantes</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || universityFilter !== 'all' || experienceFilter !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Los nuevos estudiantes aparecerán aquí cuando llenen el formulario de aplicación'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}