"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
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

// Estilos minimalistas con sutiles mejoras de contraste
const enhancedStyles = `
  :root {
    /* Solo variables esenciales */
    --color-primary: 24 95% 53%;
    --neutral-50: 0 0% 98%;
    --neutral-100: 210 40% 96%;
    --neutral-200: 214 32% 91%;
    --neutral-300: 213 27% 84%;

    /* Sombras sutiles */
    --shadow-xs: 0 1px 2px 0 rgba(0,0,0,0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

    /* Transición suave */
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Fondo minimalista con muy sutil textura */
  .enhanced-background {
    background:
      radial-gradient(600px circle at 50% 200px, hsl(var(--neutral-50)), transparent),
      linear-gradient(to bottom, hsl(0 0% 100%), hsl(var(--neutral-50)));
  }

  /* Cards con sombras más definidas y hover con color accent */
  .enhanced-card {
    background: hsl(0 0% 100%);
    border: 1px solid hsl(var(--neutral-200));
    box-shadow: var(--shadow-sm);
    transition: all 0.3s var(--ease);
  }

  .enhanced-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: rgba(115, 47, 23, 0.3);
  }

  /* Inputs con hover y focus usando color accent */
  .enhanced-input {
    background: hsl(0 0% 100%);
    border: 1px solid hsl(var(--neutral-200));
    transition: all 0.3s var(--ease);
  }

  .enhanced-input:hover {
    border-color: rgba(115, 47, 23, 0.4);
    box-shadow: var(--shadow-xs);
  }

  .enhanced-input:focus {
    border-color: #732F17;
    box-shadow: 0 0 0 3px rgba(115, 47, 23, 0.1);
    transform: translateY(-1px);
  }

  /* Botón con mejor presencia */
  .enhanced-button {
    background: #D99962;
    box-shadow: var(--shadow-sm), inset 0 1px 0 hsl(0 0% 100% / 0.2);
    transition: all 0.3s var(--ease);
    border: 0;
  }

  .enhanced-button:hover {
    background: rgba(217, 153, 98, 0.9);
    box-shadow: var(--shadow-md), inset 0 1px 0 hsl(0 0% 100% / 0.3);
    transform: translateY(-2px);
  }

  /* Animaciones suaves */
  .stagger-animation {
    animation: slideInUp 0.6s var(--ease) forwards;
    animation-delay: calc(var(--index) * 0.15s);
    opacity: 0;
  }

  /* Tipografía */
  .refined-typography-heading {
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .refined-typography-body {
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  /* Hover muy sutil */
  .hover-subtle:hover {
    background: hsl(var(--neutral-50)) !important;
    transition: all 0.3s var(--ease);
  }

  /* Radio cards con color accent */
  .enhanced-radio-card {
    background: hsl(0 0% 100%);
    border: 1px solid hsl(var(--neutral-200));
    transition: all 0.3s var(--ease);
  }

  .enhanced-radio-card:hover {
    border-color: rgba(115, 47, 23, 0.4);
    box-shadow: var(--shadow-xs);
  }

  .enhanced-radio-card.selected {
    background: rgba(115, 47, 23, 0.03);
    border-color: #732F17;
    box-shadow: var(--shadow-sm);
  }

  /* Títulos del formulario con color accent */
  .form-section-title {
    color: #732F17 !important;
    font-weight: 600;
    border-bottom: 2px solid rgba(115, 47, 23, 0.2) !important;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    position: relative;
  }

  /* Efecto decorativo sutil en títulos */
  .form-section-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: #732F17;
    border-radius: 1px;
  }

  /* Título principal del formulario */
  .form-main-title {
    color: #732F17 !important;
  }

  /* Labels importantes */
  .form-label-enhanced {
    color: hsl(25 20% 25%) !important;
    font-weight: 500;
  }

  /* Burbujas de conversación para errores */
  .error-bubble {
    position: relative;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border: 1px solid #fecaca;
    border-radius: 16px;
    padding: 10px 14px;
    margin-top: 8px;
    font-size: 0.875rem;
    color: #dc2626;
    animation: bubbleIn 0.3s ease-out;
    box-shadow: 0 3px 12px rgba(220, 38, 38, 0.15);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .error-bubble::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fecaca;
  }

  .error-bubble::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 21px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fef2f2;
  }

  @keyframes bubbleIn {
    0% {
      opacity: 0;
      transform: translateY(-10px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Input con error - borde más sutil para las burbujas */
  .input-error {
    border-color: #fca5a5 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
  }
`;

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
  const [errors, setErrors] = useState<Record<string, string>>({})

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

    // Limpiar errores previos
    setErrors({})

    // Validaciones del lado cliente con mensajes inline
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "¿Cómo te llamas? Nos gustaría conocerte"
    }

    if (!formData.email.trim()) {
      newErrors.email = "¿Cómo te contactamos sin tu email?"
    } else {
      // Validación de formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Pon un email válido"
      }
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Cuéntanos sobre tu proyecto. ¡Nos emociona conocer tu idea!"
    }

    if (!formData.tipoNecesidad) {
      newErrors.tipoNecesidad = "¿Qué tipo de solución necesitas? Ayúdanos a entenderte"
    }

    // Validaciones opcionales con formato
    if (formData.telefono.trim() && !/^[\d\s\+\-\(\)]+$/.test(formData.telefono.trim())) {
      newErrors.telefono = "Revisa el formato del teléfono"
    }

    // Si hay errores, mostrarlos y detener el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
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
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar la consulta",
          description: data.error || 'Ocurrió un error temporal. Por favor, intenta nuevamente'
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: 'Verifica tu conexión a internet e intenta nuevamente'
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
                <Link href="/">Volver al inicio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="enhanced-background paper-texture">
      {/* Inyectamos los estilos CSS */}
      <style jsx>{enhancedStyles}</style>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Spiral holes decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-12 spiral-holes opacity-30"></div>

            <div className="relative z-10 stagger-animation" style={{"--index": 0} as React.CSSProperties}>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 handwritten text-sm enhanced-card">
                 Hablemos de tu proyecto
              </Badge>

              <h1 className="text-4xl md:text-6xl refined-typography-heading text-foreground mb-6 text-balance">
                Contacta con{" "}
                <span className="text-primary handwritten relative">
                  nosotros
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 220 12" fill="none">
                    <path d="M5 8c35-3 70-3 105 0s70 3 95-2" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl refined-typography-body text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Cuéntanos tu idea y te ayudaremos a hacerla realidad con nuestro equipo de estudiantes y mentores
                expertos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Información de Contacto */}
          <div className="lg:col-span-1 stagger-animation" style={{"--index": 1} as React.CSSProperties}>
            <Card className="enhanced-card sketch-border">
              <CardHeader>
                <CardTitle className="handwritten text-xl refined-typography-heading">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3 p-3 rounded-lg hover-subtle transition-all duration-300">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium refined-typography-body">Email</p>
                    <p className="text-muted-foreground text-sm">hola@tecwork.es</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg hover-subtle transition-all duration-300">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium refined-typography-body">Teléfono</p>
                    <p className="text-muted-foreground text-sm">+34 600 123 456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg hover-subtle transition-all duration-300">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium refined-typography-body">Ubicación</p>
                    <p className="text-muted-foreground text-sm">Corrientes, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg hover-subtle transition-all duration-300">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium refined-typography-body">Horario</p>
                    <p className="text-muted-foreground text-sm">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proceso */}
            <Card className="enhanced-card sketch-border mt-8 stagger-animation" style={{"--index": 2} as React.CSSProperties}>
              <CardHeader>
                <CardTitle className="handwritten text-xl refined-typography-heading">¿Cómo funciona?</CardTitle>
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
          <div className="lg:col-span-2 stagger-animation" style={{"--index": 3} as React.CSSProperties}>
            <Card className="enhanced-card sketch-border">
              <CardHeader>
                <CardTitle className="text-2xl handwritten form-main-title">Cuéntanos tu proyecto</CardTitle>
                <p className="refined-typography-body text-muted-foreground">Completa el formulario y te contactaremos en menos de 24 horas</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Información de Contacto */}
                  <div className="space-y-4">
                    <h3 className="text-lg form-section-title">
                      Información de Contacto
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="refined-typography-body font-medium">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          className={`enhanced-input ${errors.nombre ? 'input-error' : ''}`}
                          value={formData.nombre}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                            if (errors.nombre) {
                              setErrors((prev) => ({ ...prev, nombre: '' }))
                            }
                          }}
                        />
                        {errors.nombre && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.nombre}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="refined-typography-body font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="text"
                          inputMode="email"
                          autoComplete="email"
                          className={`enhanced-input ${errors.email ? 'input-error' : ''}`}
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                            if (errors.email) {
                              setErrors((prev) => ({ ...prev, email: '' }))
                            }
                          }}
                        />
                        {errors.email && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefono" className="refined-typography-body font-medium">Teléfono</Label>
                        <Input
                          id="telefono"
                          className={`enhanced-input ${errors.telefono ? 'input-error' : ''}`}
                          value={formData.telefono}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, telefono: e.target.value }))
                            if (errors.telefono) {
                              setErrors((prev) => ({ ...prev, telefono: '' }))
                            }
                          }}
                        />
                        {errors.telefono && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.telefono}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="empresa" className="refined-typography-body font-medium">Empresa</Label>
                        <Input
                          id="empresa"
                          className="enhanced-input"
                          value={formData.empresa}
                          onChange={(e) => setFormData((prev) => ({ ...prev, empresa: e.target.value }))}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Tipo de Necesidad */}
                  <div className="space-y-4">
                    <h3 className="text-lg form-section-title">
                      Tipo de Proyecto
                    </h3>

                    <div className="space-y-3">
                      <Label className="refined-typography-body font-medium">¿Qué tipo de solución necesitas? *</Label>
                      <RadioGroup
                        value={formData.tipoNecesidad}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, tipoNecesidad: value }))
                          if (errors.tipoNecesidad) {
                            setErrors((prev) => ({ ...prev, tipoNecesidad: '' }))
                          }
                        }}
                        className="grid md:grid-cols-2 gap-3"
                      >
                        {tiposNecesidad.map((tipo) => {
                          const IconComponent = tipo.icon
                          return (
                            <Label
                              key={tipo.id}
                              htmlFor={tipo.id}
                              className={`enhanced-radio-card flex items-center space-x-3 p-4 rounded-lg cursor-pointer group ${
                                formData.tipoNecesidad === tipo.id
                                  ? 'selected transform -rotate-1'
                                  : ''
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
                      {errors.tipoNecesidad && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.tipoNecesidad}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detalles del Proyecto */}
                  <div className="space-y-4">
                    <h3 className="text-lg form-section-title">
                      Detalles del Proyecto
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="refined-typography-body font-medium">¿Cuándo lo necesitas?</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger className="enhanced-input">
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
                      <Label htmlFor="mensaje" className="refined-typography-body font-medium">Describe tu proyecto *</Label>
                      <Textarea
                        id="mensaje"
                        className={`enhanced-input ${errors.mensaje ? 'input-error' : ''}`}
                        placeholder="Cuéntanos más detalles sobre tu proyecto, objetivos, funcionalidades específicas, etc."
                        value={formData.mensaje}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, mensaje: e.target.value }))
                          if (errors.mensaje) {
                            setErrors((prev) => ({ ...prev, mensaje: '' }))
                          }
                        }}
                        rows={5}
                      />
                      {errors.mensaje && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.mensaje}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comoConociste" className="refined-typography-body font-medium">¿Cómo nos conociste?</Label>
                      <Select
                        value={formData.comoConociste}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, comoConociste: value }))}
                      >
                        <SelectTrigger className="enhanced-input">
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
                      className="enhanced-button text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed refined-typography-body font-medium group border-0"
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
