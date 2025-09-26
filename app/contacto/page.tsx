"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  BarChart3,
  Zap,
  Database,
  Smartphone,
  Building,
} from "lucide-react"

export default function ContactoPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipoNecesidad: "",
    timeline: "",
    mensaje: "",
    comoConociste: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const tiposNecesidad = [
    {
      id: "web-basica",
      label: "Desarrollo Web",
      icon: Globe,
      description: "Landing pages, sitios corporativos, e-commerce",
    },
    {
      id: "dashboard",
      label: "Dashboard/Analytics",
      icon: BarChart3,
      description: "Paneles de control, visualización de datos",
    },
    {
      id: "automatizacion",
      label: "Automatización",
      icon: Zap,
      description: "Workflows, integraciones, bots",
    },
    {
      id: "base-datos",
      label: "Base de Datos",
      icon: Database,
      description: "Diseño, migración, APIs",
    },
    {
      id: "app-movil",
      label: "App Móvil",
      icon: Smartphone,
      description: "iOS, Android, multiplataforma",
    },
    {
      id: "consultoria",
      label: "Consultoría IT",
      icon: Building,
      description: "Asesoramiento técnico, arquitectura",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validaciones del lado cliente
    if (!formData.nombre.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "El nombre es obligatorio"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "El email es obligatorio"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.mensaje.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Debes describir tu proyecto"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.tipoNecesidad) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona el tipo de solución que necesitas"
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          telefono: formData.telefono?.trim() || null,
          empresa: formData.empresa?.trim() || null,
          necesidad: formData.mensaje.trim(),
          mensaje: formData.mensaje.trim(),
          comoConociste: formData.comoConociste || null,
          tipoNecesidad: formData.tipoNecesidad,
          urgencia: formData.timeline || 'baja',
          consent: true
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        toast({
          title: "¡Consulta enviada!",
          description: "Hemos recibido tu mensaje. Te responderemos en menos de 24 horas."
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar",
          description: data.error || 'Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.'
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: 'Por favor, verifica tu conexión e intenta nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-background paper-texture min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="sketch-border bg-green-50 border-green-200 max-w-2xl mx-auto transform rotate-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 handwritten">¡Mensaje enviado!</h2>
              <p className="text-green-700 mb-6">
                Gracias por contactarnos. Hemos recibido tu consulta y nuestro equipo la revisará para ofrecerte la
                mejor solución.
              </p>
              <p className="text-green-600 text-sm mb-6">Te responderemos en un plazo máximo de 24 horas.</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="/">Volver al inicio</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background paper-texture">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Spiral holes decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-12 spiral-holes opacity-30"></div>

            <div className="relative z-10">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 handwritten text-sm">
                 Hablemos de tu proyecto
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Contacta con{" "}
                <span className="text-primary handwritten relative">
                  nosotros
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 220 12" fill="none">
                    <path d="M5 8c35-3 70-3 105 0s70 3 95-2" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Cuéntanos tu idea y te ayudaremos a hacerla realidad con nuestro equipo de estudiantes y mentores
                expertos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Información de Contacto */}
          <div className="lg:col-span-1">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardHeader>
                <CardTitle className="handwritten text-xl">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">hola@tecwork.es</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-muted-foreground text-sm">+34 600 123 456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-muted-foreground text-sm">Corrientes, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-muted-foreground text-sm">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proceso */}
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:rotate-1 mt-8">
              <CardHeader>
                <CardTitle className="handwritten text-xl">¿Cómo funciona?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Envías tu consulta</p>
                      <p className="text-muted-foreground text-xs">Nos cuentas tu proyecto</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Análisis inicial</p>
                      <p className="text-muted-foreground text-xs">Evaluamos tu necesidad</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Propuesta personalizada</p>
                      <p className="text-muted-foreground text-xs">Te enviamos una solución</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">¡Empezamos!</p>
                      <p className="text-muted-foreground text-xs">Asignamos el equipo ideal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <Card className="sketch-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl handwritten">Cuéntanos tu proyecto</CardTitle>
                <p className="text-muted-foreground">Completa el formulario y te contactaremos en menos de 24 horas</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información de Contacto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Información de Contacto
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          value={formData.empresa}
                          onChange={(e) => setFormData((prev) => ({ ...prev, empresa: e.target.value }))}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Tipo de Necesidad */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Tipo de Proyecto
                    </h3>

                    <div className="space-y-3">
                      <Label>¿Qué tipo de solución necesitas? *</Label>
                      <RadioGroup
                        value={formData.tipoNecesidad}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoNecesidad: value }))}
                        className="grid md:grid-cols-2 gap-3"
                      >
                        {tiposNecesidad.map((tipo) => {
                          const IconComponent = tipo.icon
                          return (
                            <Label
                              key={tipo.id}
                              htmlFor={tipo.id}
                              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 group ${
                                formData.tipoNecesidad === tipo.id
                                  ? 'border-primary bg-primary/5 shadow-md transform -rotate-1'
                                  : 'border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm hover:scale-[1.02]'
                              }`}
                            >
                              <RadioGroupItem value={tipo.id} id={tipo.id} />
                              <div className="flex items-center space-x-3 flex-1">
                                <div className={`p-2 rounded-full transition-colors ${
                                  formData.tipoNecesidad === tipo.id
                                    ? 'bg-primary/10'
                                    : 'bg-muted group-hover:bg-primary/5'
                                }`}>
                                  <IconComponent className={`h-5 w-5 transition-colors ${
                                    formData.tipoNecesidad === tipo.id
                                      ? 'text-primary'
                                      : 'text-muted-foreground group-hover:text-primary'
                                  }`} />
                                </div>
                                <div>
                                  <span className="font-medium text-sm group-hover:text-foreground">
                                    {tipo.label}
                                  </span>
                                  <p className="text-xs text-muted-foreground group-hover:text-muted-foreground">{tipo.description}</p>
                                </div>
                              </div>
                            </Label>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Detalles del Proyecto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Detalles del Proyecto
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">¿Cuándo lo necesitas?</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un plazo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">Lo antes posible</SelectItem>
                          <SelectItem value="3">En 1 mes</SelectItem>
                          <SelectItem value="2s">En 2-3 meses</SelectItem>
                          <SelectItem value="1">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Describe tu proyecto *</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Cuéntanos más detalles sobre tu proyecto, objetivos, funcionalidades específicas, etc."
                        value={formData.mensaje}
                        onChange={(e) => setFormData((prev) => ({ ...prev, mensaje: e.target.value }))}
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comoConociste">¿Cómo nos conociste?</Label>
                      <Select
                        value={formData.comoConociste}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, comoConociste: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la fuente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Google">Búsqueda en Google</SelectItem>
                          <SelectItem value="Redes Sociales">Redes sociales</SelectItem>
                          <SelectItem value="Recomendación">Recomendación de conocido</SelectItem>
                          <SelectItem value="Universidad">A través de la universidad</SelectItem>
                          <SelectItem value="Evento">Evento/Conferencia</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg transition-all duration-200 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          Enviar consulta
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
