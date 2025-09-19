"use client"

import type React from "react"

import { useState } from "react"
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
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    cargo: "",
    tipoNecesidad: "",
    presupuesto: "",
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

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
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
                ✨ Hablemos de tu proyecto
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
                    <p className="text-muted-foreground text-sm">Madrid, España</p>
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

                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo/Posición</Label>
                      <Input
                        id="cargo"
                        value={formData.cargo}
                        onChange={(e) => setFormData((prev) => ({ ...prev, cargo: e.target.value }))}
                      />
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
                            <div
                              key={tipo.id}
                              className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                            >
                              <RadioGroupItem value={tipo.id} id={tipo.id} />
                              <div className="flex items-center space-x-3 flex-1">
                                <IconComponent className="h-4 w-4 text-primary" />
                                <div>
                                  <Label htmlFor={tipo.id} className="font-medium cursor-pointer text-sm">
                                    {tipo.label}
                                  </Label>
                                  <p className="text-xs text-muted-foreground">{tipo.description}</p>
                                </div>
                              </div>
                            </div>
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="presupuesto">Presupuesto estimado</Label>
                        <Select
                          value={formData.presupuesto}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, presupuesto: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un rango" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">500€ - 1.000€</SelectItem>
                            <SelectItem value="1000-2500">1.000€ - 2.500€</SelectItem>
                            <SelectItem value="2500-5000">2.500€ - 5.000€</SelectItem>
                            <SelectItem value="5000+">Más de 5.000€</SelectItem>
                            <SelectItem value="no-definido">No definido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

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
                            <SelectItem value="urgente">Lo antes posible</SelectItem>
                            <SelectItem value="1-mes">En 1 mes</SelectItem>
                            <SelectItem value="2-3-meses">En 2-3 meses</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                      <Label htmlFor="comoConociste">¿Cómo conociste Tecwork?</Label>
                      <Select
                        value={formData.comoConociste}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, comoConociste: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Búsqueda en Google</SelectItem>
                          <SelectItem value="redes-sociales">Redes sociales</SelectItem>
                          <SelectItem value="recomendacion">Recomendación</SelectItem>
                          <SelectItem value="universidad">Universidad</SelectItem>
                          <SelectItem value="evento">Evento/Conferencia</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          Enviar consulta
                          <ArrowRight className="ml-2 h-4 w-4" />
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
