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
    portfolio: "",
    github: "",
    linkedin: "",
    motivacion: "",
    proyectoInteres: "",
  })

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

    if (!formData.apellido.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "El apellido es obligatorio"
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

    if (!formData.universidad) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona tu universidad"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.carrera) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona tu carrera"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.año) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona tu año de carrera"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.rol) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona el rol en el que te gustaría participar"
      })
      setIsSubmitting(false)
      return
    }

    if (formData.skills.length === 0) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Selecciona al menos 1 habilidad técnica"
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.motivacion.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obligatorio",
        description: "Explica por qué quieres unirte a Tecwork"
      })
      setIsSubmitting(false)
      return
    }

    try {
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
          portfolio: formData.portfolio?.trim() || null,
          experiencia: formData.experiencia?.trim() || null,
          motivacion: formData.motivacion.trim(),
          proyectoInteres: formData.proyectoInteres?.trim() || null,
          consent: true
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        toast({
          title: "¡Postulación enviada!",
          description: "Hemos recibido tu postulación. Te contactaremos pronto para coordinar una entrevista."
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar",
          description: data.error || 'Hubo un error al enviar tu postulación. Por favor, intenta nuevamente.'
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
              <h2 className="text-2xl font-bold text-green-800 mb-4 handwritten">¡Postulación enviada!</h2>
              <p className="text-green-700 mb-6">
                Gracias por tu interés en formar parte de Tecwork. Hemos recibido tu postulación y nuestro equipo la
                revisará en los próximos días.
              </p>
              <p className="text-green-600 text-sm mb-6">
                Te contactaremos por email para coordinar una entrevista inicial.
              </p>
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="sketch-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center handwritten">Formulario de Postulación</CardTitle>
                <p className="text-muted-foreground text-center">
                  Cuéntanos sobre ti y tus intereses para encontrar el proyecto perfecto
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Información Personal */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Información Personal
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido *</Label>
                        <Input
                          id="apellido"
                          value={formData.apellido}
                          onChange={(e) => setFormData((prev) => ({ ...prev, apellido: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
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
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="universidad">Universidad *</Label>
                      <Select
                        value={formData.universidad}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, universidad: value }))}
                      >
                        <SelectTrigger>
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
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="carrera">Carrera *</Label>
                        <Select
                          value={formData.carrera}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, carrera: value }))}
                        >
                          <SelectTrigger>
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
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="año">Año de carrera *</Label>
                        <Select
                          value={formData.año}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, año: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu año" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1º año</SelectItem>
                            <SelectItem value="2">2º año</SelectItem>
                            <SelectItem value="3">3º año</SelectItem>
                            <SelectItem value="4">4º año</SelectItem>
                            <SelectItem value="5">5º año</SelectItem>
                            <SelectItem value="master">Máster</SelectItem>
                            <SelectItem value="doctorado">Doctorado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Rol y Especialización */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Rol y Especialización
                    </h3>

                    <div className="space-y-4">
                      <Label>¿En qué rol te gustaría participar? *</Label>
                      <RadioGroup
                        value={formData.rol}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, rol: value }))}
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
                                  ? 'border-primary bg-primary/5 shadow-md transform rotate-1'
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
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="nivel">Nivel de experiencia *</Label>
                      <Select
                        value={formData.nivel}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, nivel: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu nivel de experiencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Entre 1 a 2 Proyectos</SelectItem>
                          <SelectItem value="2">+3 Proyectos</SelectItem>
                          <SelectItem value="3">+5 Proyectos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Habilidades Técnicas
                    </h3>

                    <div className="space-y-4">
                      <Label>Selecciona tus 4 habilidades técnicas principales *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skillsOptions.map((skill) => {
                          const isSelected = formData.skills.includes(skill)
                          const isDisabled = formData.skills.length >= 4 && !isSelected
                          return (
                            <div
                              key={skill}
                              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
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
                              />
                              <Label
                                htmlFor={skill}
                                className={`text-sm font-medium flex-1 ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
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
                    </div>
                  </div>


                  {/* Links y Portfolio */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Portfolio y Enlaces
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio/Website</Label>
                        <Input
                          id="portfolio"
                          type="text"
                          placeholder="tu-portfolio.com o https://tu-portfolio.com"
                          value={formData.portfolio}
                          onChange={(e) => setFormData((prev) => ({ ...prev, portfolio: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          type="text"
                          placeholder="github.com/tu-usuario o tu-usuario"
                          value={formData.github}
                          onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        type="text"
                        placeholder="linkedin.com/in/tu-perfil o tu-perfil"
                        value={formData.linkedin}
                        onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Experiencia y Motivación */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-dashed border-border pb-2">
                      Experiencia y Motivación
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="experiencia">Experiencia previa (proyectos, prácticas, trabajos)</Label>
                      <Textarea
                        id="experiencia"
                        placeholder="Cuéntanos sobre tu experiencia previa en tecnología..."
                        value={formData.experiencia}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experiencia: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivacion">¿Por qué quieres unirte a Tecwork? *</Label>
                      <Textarea
                        id="motivacion"
                        placeholder="Explícanos tu motivación para formar parte de nuestra comunidad..."
                        value={formData.motivacion}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motivacion: e.target.value }))}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proyectoInteres">¿Qué tipo de proyectos te interesan más?</Label>
                      <Textarea
                        id="proyectoInteres"
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
                      className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg transition-all duration-200 group"
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
