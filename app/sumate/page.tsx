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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Users,
  Code,
  Palette,
  Database,
  Smartphone,
  BarChart3,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Clock,
  Globe,
} from "lucide-react"

// Estilos sutiles para mejorar el formulario sin romper el minimalismo
const formEnhancementStyles = `
  :root {
    /* Variables minimalistas para el formulario */
    --neutral-50: 0 0% 98%;
    --neutral-100: 210 40% 96%;
    --neutral-200: 214 32% 91%;
    --neutral-300: 213 27% 84%;
    --shadow-xs: 0 1px 2px 0 rgba(0,0,0,0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Mejoras sutiles para el fondo del formulario */
  .form-background {
    background:
      radial-gradient(600px circle at 50% 200px, hsl(var(--neutral-50)), transparent),
      linear-gradient(to bottom, hsl(0 0% 100%), hsl(var(--neutral-50)));
  }

  /* Card principal del formulario con más presencia */
  .form-card-enhanced {
    background: hsl(210 40% 99%); /* Off-white sutil */
    border: 1px solid hsl(214 20% 80%); /* Borde más definido */
    box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1); /* Sombra más fuerte */
    transition: all 0.3s var(--ease);
  }

  .form-card-enhanced:hover {
    box-shadow: 0 12px 35px rgba(0,0,0,0.18), 0 6px 15px rgba(0,0,0,0.12);
    transform: translateY(-2px);
    border-color: rgba(115, 47, 23, 0.4);
  }

  /* Inputs con mejor contraste */
  .form-input-enhanced {
    background: hsl(0 0% 100%); /* Blanco puro para inputs */
    border: 1px solid hsl(214 18% 82%); /* Borde más definido */
    transition: all 0.3s var(--ease);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Sombra sutil base */
  }

  .form-input-enhanced:hover {
    border-color: rgba(115, 47, 23, 0.5);
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    background: hsl(210 40% 99%); /* Ligeramente off-white en hover */
  }

  .form-input-enhanced:focus {
    background: hsl(0 0% 100%); /* Vuelve a blanco en focus */
    border-color: #732F17;
    box-shadow: 0 0 0 3px rgba(115, 47, 23, 0.1), 0 2px 8px rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }

  /* Botón del formulario mejorado */
  .form-button-enhanced {
    background: #D99962;
    box-shadow: var(--shadow-sm), inset 0 1px 0 hsl(0 0% 100% / 0.2);
    transition: all 0.3s var(--ease);
    border: 0;
  }

  .form-button-enhanced:hover {
    background: rgba(217, 153, 98, 0.9);
    box-shadow: var(--shadow-md), inset 0 1px 0 hsl(0 0% 100% / 0.3);
    transform: translateY(-2px);
  }

  /* Hover sutil para elementos interactivos del formulario */
  .form-hover-subtle:hover {
    background: hsl(var(--neutral-50)) !important;
    transition: all 0.3s var(--ease);
  }

  /* Secciones del formulario con mejor separación visual */
  .form-section-enhanced {
    background: hsl(210 33% 97%); /* Ligeramente gris para contraste */
    border: 1px solid hsl(214 18% 82%); /* Borde más marcado */
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06); /* Sombra más visible */
    transition: all 0.3s var(--ease);
    position: relative;
  }

  .form-section-enhanced:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08);
    border-color: rgba(115, 47, 23, 0.3);
    background: hsl(210 35% 96%); /* Ligeramente más oscuro en hover */
  }

  /* Efecto papel sutil para simular textura */
  .form-section-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.015) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 199, 119, 0.015) 0%, transparent 50%);
    border-radius: inherit;
    pointer-events: none;
  }

  /* Títulos del formulario con color accent correcto */
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

  /* Título principal del formulario también con accent */
  .form-main-title {
    color: #732F17 !important;
  }

  /* Labels también con un toque de color */
  .form-label-enhanced {
    color: hsl(25 20% 25%) !important;
    font-weight: 500;
  }

  /* Iconos en los roles con el color accent cuando seleccionado */
  .role-selected .lucide {
    color: #732F17 !important;
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

export default function SumatePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    universidad: "",
    carrera: "",
    año: "",
    rol: "",
    nivel: "",
    skills: [] as string[],
    experiencia: "",
    cv: null as File | null,
    portfolioWeb: "",
    github: "",
    linkedin: "",
    motivacion: "",
    proyectoInteres: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const universidades = [
    { id: 'unne', name: 'Universidad Nacional del Nordeste (UNNE)' },
    { id: 'uba', name: 'Universidad de Buenos Aires (UBA)' },
    { id: 'utn', name: 'Universidad Tecnológica Nacional (UTN)' },
    { id: 'unc', name: 'Universidad Nacional de Córdoba (UNC)' },
    { id: 'unlp', name: 'Universidad Nacional de La Plata (UNLP)' },
    { id: 'uca', name: 'Universidad Católica Argentina (UCA)' },
    { id: 'udesa', name: 'Universidad de San Andrés' },
    { id: 'itba', name: 'Instituto Tecnológico de Buenos Aires (ITBA)' },
  ]

  const carreras = [
    { id: 'sistemas', name: 'Ingeniería en Sistemas de Información' },
    { id: 'informatica', name: 'Ingeniería Informática' },
    { id: 'licenciatura-sistemas', name: 'Licenciatura en Sistemas' },
    { id: 'ingenieria-software', name: 'Ingeniería de Software' },
    { id: 'tecnicatura-programacion', name: 'Tecnicatura en Programación' },
    { id: 'analista-sistemas', name: 'Analista de Sistemas' },
    { id: 'ingenieria-computacion', name: 'Ingeniería en Computación' },
    { id: 'licenciatura-informatica', name: 'Licenciatura en Informática' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'ciberseguridad', name: 'Ciberseguridad' },
    { id: 'ux-ui', name: 'Diseño UX/UI' },
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const roles = [
    { id: "frontend", label: "Frontend Developer", icon: Code, description: "React, Vue, Angular, HTML/CSS" },
    { id: "backend", label: "Backend Developer", icon: Database, description: "Node.js, Python, Java, APIs" },
    { id: "fullstack", label: "Full Stack Developer", icon: Globe, description: "Frontend + Backend" },
    { id: "mobile", label: "Mobile Developer", icon: Smartphone, description: "React Native, Flutter, iOS/Android" },
    { id: "uiux", label: "UI/UX Designer", icon: Palette, description: "Figma, Adobe XD, Diseño de interfaces" },
    { id: "data", label: "Data Analyst", icon: BarChart3, description: "Python, SQL, Visualización de datos" },
  ]

  const skillsOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "C#",
    "HTML/CSS",
    "Tailwind CSS",
    "Bootstrap",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS",
    "Firebase",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
  ]

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => {
      const currentSkills = prev.skills

      if (checked) {
        // Solo agregar si no está ya en la lista y no excede el límite de 4
        if (!currentSkills.includes(skill) && currentSkills.length < 4) {
          return { ...prev, skills: [...currentSkills, skill] }
        }
      } else {
        // Solo remover si está en la lista
        if (currentSkills.includes(skill)) {
          return { ...prev, skills: currentSkills.filter((s) => s !== skill) }
        }
      }

      // No hay cambios, devolver el estado anterior
      return prev
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Limpiar errores previos
    setErrors({})

    // Validaciones del lado cliente con mensajes inline
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "¿Cómo te llamas? ¡Nos encanta conocer gente nueva!"
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "También necesitamos tu apellido para conocerte mejor"
    }

    if (!formData.email.trim()) {
      newErrors.email = "¿Cómo te contactamos para la entrevista?"
    } else {
      // Validación de formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Pon un email válido"
      }
    }

    if (!formData.universidad) {
      newErrors.universidad = "¿De qué universidad eres? ¡Queremos conocerte!"
    }

    if (!formData.carrera) {
      newErrors.carrera = "Cuéntanos qué estudias. ¡Nos interesa!"
    }

    if (!formData.año) {
      newErrors.año = "¿En qué año estás? Nos ayuda a encontrar el proyecto perfecto"
    }

    if (!formData.rol) {
      newErrors.rol = "¿En qué te gustaría trabajar? ¡Todos los roles son geniales!"
    }

    if (!formData.nivel) {
      newErrors.nivel = "¿Cuántos proyectos has hecho? ¡Ayúdanos a conocer tu experiencia!"
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Selecciona tus superpoderes técnicos. ¡Al menos uno!"
    }

    if (!formData.motivacion.trim()) {
      newErrors.motivacion = "Cuéntanos tu historia. ¿Por qué quieres unirte a nosotros?"
    }

    // Validaciones opcionales con formato
    if (formData.telefono.trim() && !/^[\d\s\+\-\(\)]+$/.test(formData.telefono.trim())) {
      newErrors.telefono = "Revisa el formato del teléfono"
    }

    if (!formData.cv) {
      newErrors.cv = "Sube tu CV para que te conozcamos mejor"
    } else if (formData.cv.type !== 'application/pdf') {
      newErrors.cv = "El CV debe ser un archivo PDF"
    } else if (formData.cv.size > 5 * 1024 * 1024) {
      newErrors.cv = "El archivo es muy grande (máximo 5MB)"
    }

    if (formData.portfolioWeb.trim() && !formData.portfolioWeb.includes('.')) {
      newErrors.portfolioWeb = "¿Está completa la URL de tu portfolio?"
    }

    if (formData.github.trim() && !formData.github.toLowerCase().includes('github')) {
      newErrors.github = "¿Es una URL de GitHub válida?"
    }

    if (formData.linkedin.trim() && !formData.linkedin.toLowerCase().includes('linkedin')) {
      newErrors.linkedin = "¿Es una URL de LinkedIn válida?"
    }

    if (formData.experiencia.trim() && formData.experiencia.trim().length < 10) {
      newErrors.experiencia = "Cuéntanos un poco más sobre tu experiencia"
    }

    // Si hay errores, mostrarlos y detener el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      let cvUrl = null

      // 1. Primero subir el CV si existe
      if (formData.cv) {
        const cvFormData = new FormData()
        cvFormData.append('cv', formData.cv)
        cvFormData.append('email', formData.email.trim())

        const cvResponse = await fetch('/api/upload-cv', {
          method: 'POST',
          body: cvFormData,
        })

        const cvData = await cvResponse.json()

        if (!cvResponse.ok || !cvData.success) {
          toast({
            variant: "destructive",
            title: "Error al subir CV",
            description: cvData.error || 'No se pudo subir el CV. Por favor, intenta nuevamente'
          })
          setIsSubmitting(false)
          return
        }

        cvUrl = cvData.data.fileUrl
      }

      // 2. Luego crear el aplicante con la URL del CV
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          email: formData.email.trim(),
          telefono: formData.telefono?.trim() || null,
          universidad: formData.universidad,
          carrera: formData.carrera,
          año: formData.año,
          rol: formData.rol,
          skills: formData.skills,
          nivel: formData.nivel || 'junior',
          github: formData.github?.trim() || null,
          linkedin: formData.linkedin?.trim() || null,
          portfolioWeb: formData.portfolioWeb?.trim() || null,
          cvUrl: cvUrl,
          experiencia: formData.experiencia?.trim() || null,
          motivacion: formData.motivacion.trim(),
          proyectoInteres: formData.proyectoInteres?.trim() || null,
          consent: true
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar la postulación",
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
              <h2 className="text-2xl font-bold text-green-800 mb-4 handwritten">¡Postulación enviada!</h2>
              <p className="text-green-700 mb-6">
                Gracias por tu interés en formar parte de Tecwork. Hemos recibido tu postulación y nuestro equipo la
                revisará en los próximos días.
              </p>
              <p className="text-green-600 text-sm mb-6">
                Te contactaremos por email para coordinar una entrevista inicial.
              </p>
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
    <div className="bg-background paper-texture">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Spiral holes decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-12 spiral-holes opacity-30"></div>

            <div className="relative z-10">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 handwritten text-sm">
                ✨ Únete a nuestra comunidad
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Súmate a{" "}
                <span className="text-primary handwritten relative">
                  Tecwork
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M5 8c30-3 60-3 90 0s60 3 85-2" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Forma parte de una comunidad de estudiantes que trabajan en proyectos reales mientras construyen su
                futuro profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">¿Por qué unirte?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Experiencia real</h3>
                <p className="text-muted-foreground">Trabaja en proyectos de empresas reales con impacto medible</p>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mentoría experta</h3>
                <p className="text-muted-foreground">Aprende de profesionales senior en cada proyecto</p>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Construye tu CV</h3>
                <p className="text-muted-foreground">Desarrolla un portafolio sólido con proyectos documentados</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-20 notepad-lines">
        {/* Inyectar estilos CSS */}
        <style jsx>{formEnhancementStyles}</style>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="form-card-enhanced sketch-border">
              <CardHeader>
                <CardTitle className="text-2xl text-center handwritten form-main-title">Formulario de Postulación</CardTitle>
                <p className="text-muted-foreground text-center">
                  Cuéntanos sobre ti y tus intereses para encontrar el proyecto perfecto
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Información Personal */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Información Personal
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre *</Label>
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
                        <Label htmlFor="apellido">Apellido *</Label>
                        <Input
                          id="apellido"
                          className={`form-input-enhanced ${errors.apellido ? 'input-error' : ''}`}
                          value={formData.apellido}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, apellido: e.target.value }))
                            if (errors.apellido) {
                              setErrors((prev) => ({ ...prev, apellido: '' }))
                            }
                          }}
                          />
                        {errors.apellido && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.apellido}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="universidad">Universidad *</Label>
                      <Select
                        value={formData.universidad}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, universidad: value }))
                          if (errors.universidad) {
                            setErrors((prev) => ({ ...prev, universidad: '' }))
                          }
                        }}
                      >
                        <SelectTrigger className={`form-input-enhanced ${errors.universidad ? 'input-error' : ''}`}>
                          <SelectValue placeholder="Selecciona tu universidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {universidades.map((uni) => (
                            <SelectItem key={uni.id} value={uni.id}>
                              {uni.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.universidad && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.universidad}
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="carrera">Carrera *</Label>
                        <Select
                          value={formData.carrera}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, carrera: value }))
                            if (errors.carrera) {
                              setErrors((prev) => ({ ...prev, carrera: '' }))
                            }
                          }}
                        >
                          <SelectTrigger className={`form-input-enhanced ${errors.carrera ? 'input-error' : ''}`}>
                            <SelectValue placeholder="Selecciona tu carrera" />
                          </SelectTrigger>
                          <SelectContent>
                            {carreras.map((carrera) => (
                              <SelectItem key={carrera.id} value={carrera.id}>
                                {carrera.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.carrera && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.carrera}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="año">Año de carrera *</Label>
                        <Select
                          value={formData.año}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, año: value }))
                            if (errors.año) {
                              setErrors((prev) => ({ ...prev, año: '' }))
                            }
                          }}
                        >
                          <SelectTrigger className={`form-input-enhanced ${errors.año ? 'input-error' : ''}`}>
                            <SelectValue placeholder="Selecciona tu año" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1º año</SelectItem>
                            <SelectItem value="2">2º año</SelectItem>
                            <SelectItem value="3">3º año</SelectItem>
                            <SelectItem value="4">4º año</SelectItem>
                            <SelectItem value="5">5º año</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.año && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.año}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rol y Especialización */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Rol y Especialización
                    </h3>

                    <div className="space-y-4">
                      <Label className="form-label-enhanced">¿En qué rol te gustaría participar? *</Label>
                      <RadioGroup
                        value={formData.rol}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, rol: value }))
                          if (errors.rol) {
                            setErrors((prev) => ({ ...prev, rol: '' }))
                          }
                        }}
                        className="grid md:grid-cols-2 gap-4"
                      >
                        {roles.map((rol) => {
                          const IconComponent = rol.icon
                          return (
                            <Label
                              key={rol.id}
                              htmlFor={rol.id}
                              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 group ${
                                formData.rol === rol.id
                                  ? 'border-primary bg-primary/5 shadow-md transform rotate-1 role-selected'
                                  : 'border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm hover:scale-[1.02]'
                              }`}
                            >
                              <RadioGroupItem value={rol.id} id={rol.id} />
                              <div className="flex items-center space-x-3 flex-1">
                                <div className={`p-2 rounded-full transition-colors ${
                                  formData.rol === rol.id
                                    ? 'bg-primary/10'
                                    : 'bg-muted group-hover:bg-primary/5'
                                }`}>
                                  <IconComponent className={`h-5 w-5 transition-colors ${
                                    formData.rol === rol.id
                                      ? 'text-primary'
                                      : 'text-muted-foreground group-hover:text-primary'
                                  }`} />
                                </div>
                                <div>
                                  <span className="font-medium cursor-pointer group-hover:text-foreground">
                                    {rol.label}
                                  </span>
                                  <p className="text-xs text-muted-foreground group-hover:text-muted-foreground">{rol.description}</p>
                                </div>
                              </div>
                            </Label>
                          )
                        })}
                      </RadioGroup>
                      {errors.rol && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.rol}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="nivel">Nivel de experiencia *</Label>
                      <Select
                        value={formData.nivel}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, nivel: value }))
                          if (errors.nivel) {
                            setErrors((prev) => ({ ...prev, nivel: '' }))
                          }
                        }}
                      >
                        <SelectTrigger className={`form-input-enhanced ${errors.nivel ? 'input-error' : ''}`}>
                          <SelectValue placeholder="Selecciona tu nivel de experiencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Entre 1 a 2 Proyectos</SelectItem>
                          <SelectItem value="2">+3 Proyectos</SelectItem>
                          <SelectItem value="3">+5 Proyectos</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.nivel && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.nivel}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Habilidades Técnicas
                    </h3>

                    <div className="space-y-4">
                      <Label className="form-label-enhanced">Selecciona tus 4 habilidades técnicas principales *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                        {skillsOptions.map((skill) => {
                          const isSelected = formData.skills.includes(skill)
                          const isDisabled = formData.skills.length >= 4 && !isSelected
                          return (
                            <div
                              key={skill}
                              className={`flex items-center gap-2 p-2 md:p-3 rounded-lg border transition-all duration-200 min-w-0 ${
                                isSelected
                                  ? 'border-primary bg-primary/5 shadow-sm transform rotate-1'
                                  : isDisabled
                                  ? 'border-border bg-muted/30 opacity-50'
                                  : 'border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm cursor-pointer'
                              }`}
                            >
                              <Checkbox
                                id={skill}
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  if (!isDisabled) {
                                    handleSkillChange(skill, checked as boolean)
                                  }
                                }}
                                disabled={isDisabled}
                                className="shrink-0"
                              />
                              <Label
                                htmlFor={skill}
                                className={`text-xs md:text-sm font-medium flex-1 leading-tight break-words min-w-0 ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                              >
                                {skill}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                      <p className={`text-xs ${formData.skills.length === 4 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Seleccionadas: {formData.skills.length}/4
                        {formData.skills.length === 4 && ' ✓ Completado'}
                      </p>
                      {errors.skills && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.skills}
                        </div>
                      )}
                    </div>
                  </div>


                  {/* CV y Portfolio */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      CV y Portfolio
                    </h3>

                    {/* CV Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="cv" className="form-label-enhanced">CV/Resume (PDF) *</Label>
                      <div className="relative">
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf"
                          className={`form-input-enhanced ${errors.cv ? 'input-error' : ''} w-full max-w-full text-sm file:mr-2 file:py-2 file:px-3 md:file:mr-4 md:file:px-4 file:rounded-lg file:border-0 file:text-xs md:file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer cursor-pointer`}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            setFormData((prev) => ({ ...prev, cv: file }))
                            if (errors.cv) {
                              setErrors((prev) => ({ ...prev, cv: '' }))
                            }
                          }}
                        />
                        {formData.cv && (
                          <div className="mt-2 text-xs md:text-sm text-green-600 flex items-center gap-2 flex-wrap break-all">
                            <span>📄</span>
                            <span className="break-all">{formData.cv.name} ({(formData.cv.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </div>
                        )}
                      </div>
                      {errors.cv && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.cv}
                        </div>
                      )}
                    </div>

                    {/* Portfolio Web y Enlaces */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="portfolioWeb">Portfolio Web (opcional)</Label>
                        <Input
                          id="portfolioWeb"
                          type="text"
                          className={`form-input-enhanced ${errors.portfolioWeb ? 'input-error' : ''}`}
                          placeholder="miportfolio.com"
                          value={formData.portfolioWeb}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, portfolioWeb: e.target.value }))
                            if (errors.portfolioWeb) {
                              setErrors((prev) => ({ ...prev, portfolioWeb: '' }))
                            }
                          }}
                        />
                        {errors.portfolioWeb && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.portfolioWeb}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub (opcional)</Label>
                        <Input
                          id="github"
                          type="text"
                          className={`form-input-enhanced ${errors.github ? 'input-error' : ''}`}
                          placeholder="github.com/usuario"
                          value={formData.github}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, github: e.target.value }))
                            if (errors.github) {
                              setErrors((prev) => ({ ...prev, github: '' }))
                            }
                          }}
                        />
                        {errors.github && (
                          <div className="error-bubble">
                            <span className="text-base">💭</span>
                            {errors.github}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
                      <Input
                        id="linkedin"
                        type="text"
                        className={`form-input-enhanced ${errors.linkedin ? 'input-error' : ''}`}
                        placeholder="linkedin.com/in/usuario"
                        value={formData.linkedin}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
                          if (errors.linkedin) {
                            setErrors((prev) => ({ ...prev, linkedin: '' }))
                          }
                        }}
                      />
                      {errors.linkedin && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.linkedin}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experiencia y Motivación */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Experiencia y Motivación
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="experiencia">Experiencia previa (proyectos, prácticas, trabajos)</Label>
                      <Textarea
                        id="experiencia"
                        className={`form-input-enhanced ${errors.experiencia ? 'input-error' : ''}`}
                        placeholder="Cuéntanos sobre tu experiencia previa en tecnología..."
                        value={formData.experiencia}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, experiencia: e.target.value }))
                          if (errors.experiencia) {
                            setErrors((prev) => ({ ...prev, experiencia: '' }))
                          }
                        }}
                        rows={4}
                      />
                      {errors.experiencia && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.experiencia}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivacion">¿Por qué quieres unirte a Tecwork? *</Label>
                      <Textarea
                        id="motivacion"
                        className={`form-input-enhanced ${errors.motivacion ? 'input-error' : ''}`}
                        placeholder="Explícanos tu motivación para formar parte de nuestra comunidad..."
                        value={formData.motivacion}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, motivacion: e.target.value }))
                          if (errors.motivacion) {
                            setErrors((prev) => ({ ...prev, motivacion: '' }))
                          }
                        }}
                        rows={4}
                      />
                      {errors.motivacion && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.motivacion}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proyectoInteres">¿Qué tipo de proyectos te interesan más?</Label>
                      <Textarea
                        id="proyectoInteres"
                        className="form-input-enhanced"
                        placeholder="Describe qué tipo de proyectos te gustaría desarrollar..."
                        value={formData.proyectoInteres}
                        onChange={(e) => setFormData((prev) => ({ ...prev, proyectoInteres: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="form-button-enhanced text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Enviando postulación...
                        </>
                      ) : (
                        <>
                          Enviar postulación
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
      </section>
    </div>
  )
}
