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
  Building,
  Mail,
  Phone,
  Calendar,
  Edit,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
} from 'lucide-react'
import { VistaLead } from '@/lib/types/database'

interface LeadsCRMProps {
  initialLeads: VistaLead[]
}

export default function LeadsCRM({ initialLeads }: LeadsCRMProps) {
  const [leads, setLeads] = useState<VistaLead[]>(initialLeads)
  const [filteredLeads, setFilteredLeads] = useState<VistaLead[]>(initialLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(initialLeads.length === 0)
  const [urgencyFilter, setUrgencyFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<VistaLead | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const leadsPerPage = 10
  const { toast } = useToast()

  // Estados posibles para leads
  const leadStates = [
    { id: 1, name: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
    { id: 2, name: 'En Espera', color: 'bg-blue-100 text-blue-800' },
    { id: 3, name: 'Terminado', color: 'bg-green-100 text-green-800' },
    { id: 4, name: 'Cancelado', color: 'bg-red-100 text-red-800' },
  ]

  const urgencyLevels = [
    { id: 1, name: 'Baja', color: 'bg-gray-100 text-gray-800' },
    { id: 2, name: 'Media', color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { id: 4, name: 'Urgente', color: 'bg-red-100 text-red-800' },
  ]

  // Cargar datos si no vienen del servidor (lazy loading)
  useEffect(() => {
    if (initialLeads.length === 0) {
      const fetchLeads = async () => {
        try {
          const response = await fetch('/api/leads')
          if (response.ok) {
            const data = await response.json()
            setLeads(data.leads || [])
            setFilteredLeads(data.leads || [])
          }
        } catch (error) {
          console.error('Error fetching leads:', error)
          toast({
            title: 'Error',
            description: 'No se pudieron cargar los leads',
            variant: 'destructive'
          })
        } finally {
          setIsLoading(false)
        }
      }
      fetchLeads()
    }
  }, [initialLeads, toast])

  // Filtros en tiempo real
  useEffect(() => {
    let filtered = leads

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.necesidad.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.estado === statusFilter)
    }

    // Filtro por urgencia
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(lead => lead.urgencia === urgencyFilter)
    }

    setFilteredLeads(filtered)
    setCurrentPage(1)
  }, [leads, searchTerm, statusFilter, urgencyFilter])

  // Paginación
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)
  const startIndex = (currentPage - 1) * leadsPerPage
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + leadsPerPage)

  // Actualizar estado del lead
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/leads/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      })

      if (response.ok) {
        // Actualizar estado local
        setLeads(prev => prev.map(lead =>
          lead.id === leadId ? { ...lead, estado: newStatus } : lead
        ))

        toast({
          title: "Estado actualizado",
          description: `Lead marcado como ${newStatus}`
        })
      } else {
        throw new Error('Error al actualizar')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado del lead"
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    const state = leadStates.find(s => s.name === status)
    return state?.color || 'bg-gray-100 text-gray-800'
  }

  const getUrgencyBadgeClass = (urgency: string) => {
    const level = urgencyLevels.find(u => u.name === urgency)
    return level?.color || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando leads...</p>
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
              <Building className="h-5 w-5" />
              CRM de Leads
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gestiona y da seguimiento a empresas interesadas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {filteredLeads.length} leads
            </Badge>
            <Button asChild size="sm">
              <a href="/contacto" target="_blank" rel="noopener noreferrer">
                <Building className="h-3 w-3 mr-1" />
                Ver Formulario
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email, empresa o necesidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {leadStates.map(state => (
                <SelectItem key={state.id} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por urgencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las urgencias</SelectItem>
              {urgencyLevels.map(level => (
                <SelectItem key={level.id} value={level.name}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabla de leads */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contacto</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Necesidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Urgencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.nombre}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </p>
                      {lead.telefono && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.telefono}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.empresa ? (
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {lead.empresa}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate" title={lead.necesidad}>
                      {lead.necesidad}
                    </p>
                    {lead.tipo_proyecto && (
                      <Badge variant="outline" className="mt-1">
                        {lead.tipo_proyecto}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.estado || 'Pendiente'}
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          <Badge className={getStatusBadgeClass(lead.estado || 'Pendiente')}>
                            {lead.estado || 'Pendiente'}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {leadStates.map(state => (
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
                    <Badge className={getUrgencyBadgeClass(lead.urgencia || 'Baja')}>
                      {lead.urgencia || 'Baja'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.created_at).toLocaleDateString('es-ES')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isDialogOpen && selectedLead?.id === lead.id}
                            onOpenChange={(open) => {
                              setIsDialogOpen(open)
                              if (!open) setSelectedLead(null)
                            }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalles del Lead</DialogTitle>
                          <DialogDescription>
                            Información completa de {lead.nombre}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedLead && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Información de Contacto</h4>
                                <p><strong>Nombre:</strong> {selectedLead.nombre}</p>
                                <p><strong>Email:</strong> {selectedLead.email}</p>
                                {selectedLead.telefono && (
                                  <p><strong>Teléfono:</strong> {selectedLead.telefono}</p>
                                )}
                                {selectedLead.empresa && (
                                  <p><strong>Empresa:</strong> {selectedLead.empresa}</p>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">Estado del Proyecto</h4>
                                <p><strong>Estado:</strong>
                                  <Badge className={`ml-2 ${getStatusBadgeClass(selectedLead.estado || 'Pendiente')}`}>
                                    {selectedLead.estado || 'Pendiente'}
                                  </Badge>
                                </p>
                                <p><strong>Urgencia:</strong>
                                  <Badge className={`ml-2 ${getUrgencyBadgeClass(selectedLead.urgencia || 'Baja')}`}>
                                    {selectedLead.urgencia || 'Baja'}
                                  </Badge>
                                </p>
                                {selectedLead.tipo_proyecto && (
                                  <p><strong>Tipo:</strong> {selectedLead.tipo_proyecto}</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Necesidad del Proyecto</h4>
                              <p className="bg-muted p-3 rounded">{selectedLead.necesidad}</p>
                            </div>
                            {selectedLead.mensaje && (
                              <div>
                                <h4 className="font-medium">Mensaje Adicional</h4>
                                <p className="bg-muted p-3 rounded">{selectedLead.mensaje}</p>
                              </div>
                            )}
                            {selectedLead.fuente && (
                              <div>
                                <h4 className="font-medium">Fuente</h4>
                                <p><strong>Cómo nos conoció:</strong> {selectedLead.fuente}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">Información Adicional</h4>
                              <p><strong>Fecha de creación:</strong> {new Date(selectedLead.created_at).toLocaleString('es-ES')}</p>
                            </div>
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
              Mostrando {startIndex + 1}-{Math.min(startIndex + leadsPerPage, filteredLeads.length)} de {filteredLeads.length} leads
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

        {filteredLeads.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No se encontraron leads</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || urgencyFilter !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Los nuevos leads aparecerán aquí cuando las empresas llenen el formulario'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}