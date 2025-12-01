"use client"

import type React from "react"

import { useState, useMemo } from "react"
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
  Search,
  X,
} from "lucide-react"

// Estilos premium modernos al estilo de las otras páginas
const premiumFormStyles = `
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

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
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

  /* Card principal del formulario con efectos premium */
  .form-card-enhanced {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
    border: 1px solid rgba(115, 47, 23, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .form-card-enhanced::before {
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

  .form-card-enhanced:hover::before {
    left: 100%;
  }

  .form-card-enhanced:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(115, 47, 23, 0.12);
    border-color: rgba(115, 47, 23, 0.2);
  }

  /* Inputs con estilo premium y optimizados para touch */
  .form-input-enhanced {
    background: hsl(0 0% 100%);
    border: 1px solid hsl(214 18% 85%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    min-height: 2.75rem; /* ~44px - tamaño mínimo para touch en móvil */
    font-size: 16px; /* Previene zoom en iOS */
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

  /* Botón del formulario premium y optimizado para touch */
  .form-button-enhanced {
    background: linear-gradient(135deg, #D99962 0%, #E5A977 100%);
    box-shadow: 0 4px 12px rgba(217, 153, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 0;
    min-height: 3rem; /* ~48px - tamaño óptimo para touch */
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

  /* Secciones del formulario con diseño premium y responsive */
  .form-section-enhanced {
    background: linear-gradient(135deg, rgba(250, 250, 250, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);
    border: 1px solid rgba(115, 47, 23, 0.1);
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 2px 8px rgba(115, 47, 23, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    .form-section-enhanced {
      padding: 1.5rem;
      border-radius: 1rem;
    }
  }

  @media (min-width: 768px) {
    .form-section-enhanced {
      padding: 2rem;
    }
  }

  .form-section-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(115, 47, 23, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .form-section-enhanced:hover::before {
    opacity: 1;
  }

  .form-section-enhanced:hover {
    box-shadow: 0 8px 24px rgba(115, 47, 23, 0.12);
    border-color: rgba(115, 47, 23, 0.2);
    transform: translateY(-2px);
  }

  /* Títulos del formulario premium y responsive */
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

  /* Card de beneficios premium */
  .benefit-card {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .benefit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(115, 47, 23, 0.05),
      transparent
    );
    transition: left 0.5s ease;
  }

  .benefit-card:hover::before,
  .benefit-card:active::before {
    left: 100%;
  }

  .benefit-card:hover,
  .benefit-card:active {
    transform: translateY(-8px) rotate(1deg);
    box-shadow: 0 20px 40px rgba(115, 47, 23, 0.15);
  }

  /* Labels optimizados para móvil */
  label {
    font-size: 0.9375rem; /* 15px */
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    label {
      font-size: 0.875rem; /* 14px */
    }
  }

  /* Mejora de áreas de tap en radio buttons y checkboxes */
  [type="radio"],
  [type="checkbox"] {
    min-width: 1.25rem;
    min-height: 1.25rem;
  }

  /* Espaciado optimizado para campos en móvil */
  .space-y-6 > * + * {
    margin-top: 1.25rem;
  }

  @media (min-width: 640px) {
    .space-y-6 > * + * {
      margin-top: 1.5rem;
    }
  }

  /* Tamaño de fuente para select en móvil (previene zoom en iOS) */
  select {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    select {
      font-size: 0.875rem;
    }
  }

  /* Textarea optimizado para móvil */
  textarea {
    min-height: 6rem;
    font-size: 16px;
  }

  @media (min-width: 768px) {
    textarea {
      min-height: 5rem;
      font-size: 0.875rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in-up,
    .scale-in,
    .form-card-enhanced,
    .benefit-card {
      animation: none !important;
      transition: none !important;
    }
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
  const [searchTerm, setSearchTerm] = useState("")

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

  // Filtrado de tecnologías basado en búsqueda
  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return skillsOptions
    return skillsOptions.filter((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

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
          <Card className="sketch-border bg-green-50 border-green-200 max-w-2xl mx-auto">
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
    <div className="bg-background main-wrapper">
      {/* Inyectar estilos CSS */}
      <style jsx>{premiumFormStyles}</style>

      {/* Hero Section Premium - Optimizado para móvil */}
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
                Únete a nuestra comunidad
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
              Súmate a{" "}
              <span className="gradient-text relative inline-block">
                Tecwork
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
              Formá parte de una comunidad que aprende haciendo, colabora en proyectos reales y crece profesionalmente.
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

      {/* Beneficios Premium - Optimizado para móvil */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-background via-primary/[0.02] to-accent/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(115,47,23,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,153,98,0.05),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <Badge variant="outline" className="mb-3 md:mb-6 border-primary/20 text-primary bg-primary/5 text-xs sm:text-sm px-3 py-1">
              Los beneficios
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 tracking-tight px-2">
              ¿Por qué <span className="gradient-text">unirte?</span>
            </h2>
            {/* <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Desarrollá tu carrera junto a una comunidad que aprende haciendo.
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="scale-in" style={{ animationDelay: '0.1s' }}>
              <Card className="benefit-card border-primary/10 hover:border-primary/30 bg-card premium-shadow h-full">
                <CardContent className="p-5 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-2 border-primary/20">
                    <Code className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Generá valor real</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Contribuí con soluciones que mejoran procesos y generan valor en empresas reales.</p>
                </CardContent>
              </Card>
            </div>

            <div className="scale-in" style={{ animationDelay: '0.2s' }}>
              <Card className="benefit-card border-accent/10 hover:border-accent/30 bg-card premium-shadow h-full">
                <CardContent className="p-5 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent to-accent/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-2 border-accent/20">
                    <Users className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Crecé en comunidad</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Formá parte de una red que aprende, colabora y se potencia.</p>
                </CardContent>
              </Card>
            </div>

            <div className="scale-in" style={{ animationDelay: '0.3s' }}>
              <Card className="benefit-card border-primary/10 hover:border-primary/30 bg-card premium-shadow h-full">
                <CardContent className="p-5 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-2 border-primary/20">
                    <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Proyectá tu futuro</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Cada proyecto fortalece tu perfil y te acerca a tus objetivos laborales.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario - Optimizado para móvil */}
      <section className="py-12 md:py-24 lg:py-32 relative bg-gradient-to-b from-muted/20 via-primary/[0.03] to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-12 scale-in">
              <Badge variant="outline" className="mb-3 md:mb-6 border-primary/20 text-primary bg-primary/5 text-xs sm:text-sm px-3 py-1">
                Formulario de inscripción
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 tracking-tight px-2">
                Comienza tu <span className="gradient-text">recorrido</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
                Cuéntanos sobre ti y tus intereses para encontrar el proyecto perfecto
              </p>
            </div>

            <Card className="form-card-enhanced border-primary/10 premium-shadow scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold form-main-title">Formulario de Postulación</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* Información Personal y Portfolio */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Información Personal y Portfolio
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

                    {/* CV Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="cv" className="form-label-enhanced">CV/Resume (PDF) *</Label>
                      <div className="relative w-full overflow-hidden">
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf"
                          className={`form-input-enhanced w-full ${errors.cv ? 'input-error' : ''} file:mr-2 sm:file:mr-4 file:py-1.5 file:px-2 sm:file:py-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer cursor-pointer overflow-hidden text-ellipsis`}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            setFormData((prev) => ({ ...prev, cv: file }))
                            if (errors.cv) {
                              setErrors((prev) => ({ ...prev, cv: '' }))
                            }
                          }}
                        />
                        {formData.cv && (
                          <div className="mt-2 text-xs sm:text-sm text-green-600 flex items-center gap-2 break-all">
                            <span className="shrink-0">📄</span>
                            <span className="break-words">{formData.cv.name} ({(formData.cv.size / 1024 / 1024).toFixed(1)} MB)</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                        <Label htmlFor="github">GitHub</Label>
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

                  {/* Rol y Especialización - Sección Unificada */}
                  <div className="form-section-enhanced space-y-6">
                    <h3 className="text-lg form-section-title">
                      Rol y Especialización
                    </h3>

                    {/* Selección de Rol con iconos */}
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                      >
                        {roles.map((rol) => {
                          const IconComponent = rol.icon
                          return (
                            <Label
                              key={rol.id}
                              htmlFor={rol.id}
                              className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 group min-h-[3rem] ${
                                formData.rol === rol.id
                                  ? 'border-primary bg-primary/5 shadow-md'
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

                    {/* Tecnologías estudiadas con buscador */}
                    <div className="space-y-4">
                      <Label className="form-label-enhanced">Tecnologías aprendidas *</Label>
                      <p className="text-sm text-muted-foreground">Selecciona hasta 4 tecnologías que conoces</p>

                      {/* Buscador */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Buscar tecnología..."
                          className="form-input-enhanced pl-10 pr-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                          <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Lista de tecnologías - Solo se muestra cuando hay búsqueda */}
                      {searchTerm && (
                        <div className="border rounded-lg p-3 bg-card max-h-64 overflow-y-auto">
                          <div className="space-y-2">
                            {filteredSkills.length > 0 ? (
                              filteredSkills.map((skill) => {
                                const isSelected = formData.skills.includes(skill)
                                const isDisabled = formData.skills.length >= 4 && !isSelected
                                return (
                                  <button
                                    key={skill}
                                    type="button"
                                    onClick={() => {
                                      if (!isDisabled && !isSelected) {
                                        handleSkillChange(skill, true)
                                        setSearchTerm("") // Limpiar búsqueda al seleccionar
                                      }
                                    }}
                                    disabled={isDisabled || isSelected}
                                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                      isSelected
                                        ? 'border-[#D4A574] bg-[#D4A574]/10 text-muted-foreground cursor-not-allowed'
                                        : isDisabled
                                        ? 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                                        : 'border-border hover:border-[#732F17] hover:bg-[#D4A574]/5 cursor-pointer'
                                    }`}
                                  >
                                    <span className="text-sm font-medium">
                                      {skill} {isSelected && '✓'}
                                    </span>
                                  </button>
                                )
                              })
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No se encontraron tecnologías
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tecnologías seleccionadas - Área marrón claro */}
                      {formData.skills.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">Seleccionadas ({formData.skills.length}/4):</p>
                          <div className="flex flex-wrap gap-2 p-4 bg-[#D4A574]/20 rounded-lg border border-[#D4A574]/30">
                            {formData.skills.map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => handleSkillChange(skill, false)}
                                className="group flex items-center gap-2 px-3 py-1.5 bg-[#D4A574]/30 text-[#732F17] rounded-md hover:bg-[#D4A574]/40 transition-all duration-200 border border-[#D4A574]/40"
                              >
                                <span className="text-sm font-medium">{skill}</span>
                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Nivel de experiencia */}
                      <div className="space-y-2">
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

                      {errors.skills && (
                        <div className="error-bubble">
                          <span className="text-base">💭</span>
                          {errors.skills}
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

                  <div className="flex justify-center pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="form-button-enhanced text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 group w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Enviando postulación...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">Enviar postulación</span>
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
