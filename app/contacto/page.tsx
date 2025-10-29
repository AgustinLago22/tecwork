"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
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

// Estilos premium modernos al estilo de las otras páginas
const premiumContactStyles = `
  /* Escala 90% solo en desktop */
  @media (min-width: 768px) {
    .main-wrapper {
      zoom: 0.9;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
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

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .scale-in {
    animation: scaleIn 0.5s ease-out forwards;
  }

  /* Gradient text */
  .gradient-text {
    background: linear-gradient(135deg, #732F17 0%, #D99962 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Premium shadow */
  .premium-shadow {
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(115, 47, 23, 0.08),
      0 16px 32px rgba(115, 47, 23, 0.06);
  }

  /* Cards premium con efectos */
  .premium-card {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
    border: 1px solid rgba(115, 47, 23, 0.1);
  }

  .premium-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(115, 47, 23, 0.03),
      transparent
    );
    transition: left 0.5s ease;
  }

  .premium-card:hover::before {
    left: 100%;
  }

  .premium-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(115, 47, 23, 0.12);
    border-color: rgba(115, 47, 23, 0.2);
  }

  /* Inputs premium optimizados para touch */
  .form-input-enhanced {
    background: hsl(0 0% 100%);
    border: 1px solid hsl(214 18% 85%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    min-height: 2.75rem;
    font-size: 16px;
  }

  @media (min-width: 768px) {
    .form-input-enhanced {
      min-height: 2.5rem;
      font-size: 0.875rem;
    }
  }

  .form-input-enhanced:hover {
    border-color: rgba(115, 47, 23, 0.3);
    box-shadow: 0 2px 8px rgba(115, 47, 23, 0.08);
  }

  .form-input-enhanced:focus {
    background: hsl(0 0% 100%);
    border-color: #732F17;
    box-shadow: 0 0 0 3px rgba(115, 47, 23, 0.1), 0 4px 12px rgba(115, 47, 23, 0.15);
    transform: translateY(-1px);
  }

  /* Botón premium con gradiente */
  .form-button-enhanced {
    background: linear-gradient(135deg, #D99962 0%, #E5A977 100%);
    box-shadow: 0 4px 12px rgba(217, 153, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 0;
    min-height: 3rem;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  @media (min-width: 768px) {
    .form-button-enhanced {
      min-height: 2.75rem;
      font-size: 0.875rem;
      padding: 0.625rem 1.25rem;
    }
  }

  .form-button-enhanced:hover,
  .form-button-enhanced:active {
    background: linear-gradient(135deg, #E5A977 0%, #D99962 100%);
    box-shadow: 0 8px 20px rgba(217, 153, 98, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-2px) scale(1.02);
  }

  /* Títulos del formulario premium */
  .form-section-title {
    color: #732F17 !important;
    font-weight: 700;
    border-bottom: 2px solid rgba(115, 47, 23, 0.15);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    position: relative;
    letter-spacing: -0.025em;
    font-size: 1rem;
  }

  @media (min-width: 640px) {
    .form-section-title {
      font-size: 1.125rem;
      padding-bottom: 0.625rem;
      margin-bottom: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    .form-section-title {
      padding-bottom: 0.75rem;
      margin-bottom: 1.5rem;
    }
  }

  .form-section-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, #732F17 0%, #D99962 100%);
    border-radius: 2px;
  }

  .form-main-title {
    background: linear-gradient(135deg, #732F17 0%, #D99962 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Radio cards premium */
  .enhanced-radio-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
    border: 1px solid rgba(115, 47, 23, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 3rem;
  }

  .enhanced-radio-card:hover {
    border-color: rgba(115, 47, 23, 0.3);
    box-shadow: 0 2px 8px rgba(115, 47, 23, 0.08);
    transform: translateY(-1px);
  }

  .enhanced-radio-card.selected {
    background: linear-gradient(135deg, rgba(115, 47, 23, 0.05) 0%, rgba(217, 153, 98, 0.05) 100%);
    border-color: #732F17;
    box-shadow: 0 4px 12px rgba(115, 47, 23, 0.15);
    transform: rotate(1deg);
  }

  /* Info card items hover */
  .info-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.75rem;
  }

  .info-item:hover {
    background: linear-gradient(135deg, rgba(115, 47, 23, 0.03) 0%, rgba(217, 153, 98, 0.03) 100%);
    transform: translateX(4px);
  }

  /* Burbujas de error mejoradas */
  .error-bubble {
    position: relative;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 10px 14px;
    margin-top: 8px;
    font-size: 0.875rem;
    color: #dc2626;
    animation: bubbleIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
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

  .input-error {
    border-color: #fca5a5 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
  }

  /* Labels y select optimizados para móvil */
  label {
    font-size: 0.9375rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    label {
      font-size: 0.875rem;
    }
  }

  select, textarea {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    select, textarea {
      font-size: 0.875rem;
    }
  }

  textarea {
    min-height: 6rem;
  }

  @media (min-width: 768px) {
    textarea {
      min-height: 5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in-up,
    .scale-in,
    .premium-card {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export default function ContactoPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
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

  // Pre-seleccionar el servicio si viene desde la página de servicios
  useEffect(() => {
    const servicioParam = searchParams.get('servicio')
    if (servicioParam) {
      setFormData(prev => ({ ...prev, tipoNecesidad: servicioParam }))
    }
  }, [searchParams])

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
      <div className="bg-background main-wrapper min-h-screen flex items-center justify-center">
        <style jsx>{premiumContactStyles}</style>
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="premium-card premium-shadow bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 max-w-2xl mx-auto scale-in">
            <CardContent className="p-6 sm:p-8 md:p-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 gradient-text">¡Mensaje enviado!</h2>
              <p className="text-green-700 mb-6 text-base sm:text-lg leading-relaxed">
                Gracias por contactarnos. Hemos recibido tu consulta y nuestro equipo la revisará para ofrecerte la
                mejor solución.
              </p>
              <p className="text-green-600 text-sm sm:text-base mb-6">Te responderemos en un plazo máximo de 24 horas.</p>
              <Button asChild className="form-button-enhanced text-primary-foreground w-full sm:w-auto">
                <Link href="/">
                  Volver al inicio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background main-wrapper">
      {/* Inyectamos los estilos CSS */}
      <style jsx>{premiumContactStyles}</style>

      {/* Hero Section Premium */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-primary/[0.03] to-background">
        {/* Gradient sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]"></div>

        {/* Líneas decorativas minimalistas */}
        <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent ml-[10%] hidden md:block"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-accent/20 to-transparent mr-[10%] hidden md:block"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-4 md:mb-8 border-primary/20 text-primary bg-primary/5 backdrop-blur text-xs sm:text-sm px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></div>
                Hablemos de tu proyecto
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
              Contacta con{" "}
              <span className="gradient-text relative inline-block">
                nosotros
                {/* Subrayado sketch */}
                <svg className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-2 left-0 w-full h-1.5 sm:h-2 md:h-3" viewBox="0 0 200 12" fill="none">
                  <path
                    d="M5 8c30-3 60-3 90 0s60 3 85-2"
                    stroke="#D99962"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
              Contanos tu idea y trabajemos juntos para hacerla realidad con el talento de nuestra comunidad.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Información de Contacto */}
          <div className="lg:col-span-1 scale-in" style={{ animationDelay: '0.4s' }}>
            <Card className="premium-card premium-shadow border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold gradient-text">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg info-item">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Email</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">contacto@tecwork.ar</p>
                  </div>
                </div>

               {/* <div className="flex items-start space-x-3 p-3 rounded-lg info-item">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Teléfono</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">+34 600 123 456</p>
                  </div>
                </div>

                */}

                <div className="flex items-start space-x-3 p-3 rounded-lg info-item">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Horario</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg info-item">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Ubicación</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">Corrientes, Argentina</p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Proceso */}
            <Card className="premium-card premium-shadow border-accent/10 mt-6 md:mt-8 scale-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold gradient-text">¿Cómo funciona?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-primary-foreground text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Envías tu consulta</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Nos cuentas tu proyecto</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Análisis inicial</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Evaluamos tu necesidad</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-primary-foreground text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Propuesta personalizada</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Te enviamos una solución</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-accent-foreground text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">¡Empezamos!</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Asignamos el equipo ideal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2 scale-in" style={{ animationDelay: '0.6s' }}>
            <Card className="premium-card premium-shadow border-primary/10">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold form-main-title">Cuéntanos tu proyecto</CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">Completa el formulario y te contactaremos en menos de 24 horas</p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
                  {/* Información de Contacto */}
                  <div className="space-y-4">
                    <h3 className="text-lg form-section-title">
                      Información de Contacto
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="font-medium">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          className={`form-input-enhanced ${errors.nombre ? 'input-error' : ''}`}
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
                        <Label htmlFor="email" className="font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="text"
                          inputMode="email"
                          autoComplete="email"
                          className={`form-input-enhanced ${errors.email ? 'input-error' : ''}`}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="telefono" className="font-medium">Teléfono</Label>
                        <Input
                          id="telefono"
                          className={`form-input-enhanced ${errors.telefono ? 'input-error' : ''}`}
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
                        <Label htmlFor="empresa" className="font-medium">Empresa</Label>
                        <Input
                          id="empresa"
                          className="form-input-enhanced"
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
                      <Label className="font-medium">¿Qué tipo de solución necesitas? *</Label>
                      <RadioGroup
                        value={formData.tipoNecesidad}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, tipoNecesidad: value }))
                          if (errors.tipoNecesidad) {
                            setErrors((prev) => ({ ...prev, tipoNecesidad: '' }))
                          }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                      >
                        {tiposNecesidad.map((tipo) => {
                          const IconComponent = tipo.icon
                          return (
                            <Label
                              key={tipo.id}
                              htmlFor={tipo.id}
                              className={`enhanced-radio-card flex items-center space-x-3 p-3 sm:p-4 rounded-lg cursor-pointer group ${
                                formData.tipoNecesidad === tipo.id
                                  ? 'selected'
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
                      <Label htmlFor="timeline" className="font-medium">¿Cuándo lo necesitas?</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger className="form-input-enhanced">
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
                      <Label htmlFor="mensaje" className="font-medium">Describe tu proyecto *</Label>
                      <Textarea
                        id="mensaje"
                        className={`form-input-enhanced ${errors.mensaje ? 'input-error' : ''}`}
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
                      <Label htmlFor="comoConociste" className="font-medium">¿Cómo nos conociste?</Label>
                      <Select
                        value={formData.comoConociste}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, comoConociste: value }))}
                      >
                        <SelectTrigger className="form-input-enhanced">
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

                  <div className="flex justify-center pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="form-button-enhanced text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed font-medium group w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Enviando mensaje...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">Enviar consulta</span>
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
