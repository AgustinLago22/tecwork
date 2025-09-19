import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Lightbulb, Shield, Rocket, ArrowRight, GraduationCap, Building, Handshake } from "lucide-react"
import Link from "next/link"

export default function NosotrosPage() {
  const valores = [
    {
      icon: GraduationCap,
      title: "Aprendizaje continuo",
      description:
        "Creemos que cada proyecto es una oportunidad de crecimiento tanto para estudiantes como para empresas.",
      color: "bg-blue-100 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Calidad garantizada",
      description: "Supervisamos nuestros productos con rigurosas pruebas de testing para comprobar la funcionalidad total.",
      color: "bg-green-100 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Handshake,
      title: "Colaboración genuina",
      description: "Fomentamos relaciones duraderas entre estudiantes, mentores y empresas basadas en confianza mutua.",
      color: "bg-purple-100 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: Lightbulb,
      title: "Innovación práctica",
      description:
        "Aplicamos las últimas tecnologías y metodologías para resolver problemas reales del mundo empresarial.",
      color: "bg-orange-100 border-orange-200",
      iconColor: "text-orange-600",
    },
  ]

  const proceso = [
    {
      step: "1",
      title: "Selección rigurosa",
      description:
        "Evaluamos cuidadosamente las habilidades técnicas y actitud de cada estudiante antes de incorporarlo a nuestro equipo.",
    },
    {
      step: "2",
      title: "Formación especializada",
      description:
        "Proporcionamos capacitación adicional en metodologías ágiles, comunicación con clientes y mejores prácticas.",
    },
    {
      step: "3",
      title: "Control de calidad",
      description:
        "Cada proyecto cuenta con la supervisión de desarrolladores que guían y revisan todo el trabajo.",
    },
    {
      step: "4",
      title: "Entrega profesional",
      description:
        "Garantizamos estándares profesionales en cada entrega, con documentación completa y soporte post-lanzamiento.",
    },
  ]

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
                ✨ Conoce nuestro propósito
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Somos{" "}
                <span className="text-primary handwritten relative">
                  Tecwork
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M5 8c30-3 60-3 90 0s60 3 85-2" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Una consultora tecnológica que conecta el talento universitario con oportunidades reales, creando valor
                para estudiantes y empresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground handwritten">Nuestra Misión</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Democratizar el acceso a experiencia profesional real para estudiantes de tecnología, mientras
                  proporcionamos a las empresas soluciones innovadoras y de calidad a través de un modelo colaborativo
                  único que beneficia a todos los involucrados.
                </p>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:rotate-1">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Rocket className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground handwritten">Nuestra Visión</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ser la plataforma líder en España que transforma la educación tecnológica universitaria, creando un
                  ecosistema donde estudiantes, universidades y empresas colaboran para impulsar la innovación y el
                  crecimiento profesional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 notepad-lines">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Nuestros Valores</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Los principios que guían cada decisión y proyecto en Tecwork
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon
              return (
                <Card
                  key={valor.title}
                  className={`sketch-border ${valor.color} hover:shadow-lg transition-all duration-300 transform ${
                    index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className={`h-6 w-6 ${valor.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{valor.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{valor.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">¿Cómo trabajamos?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestro proceso garantiza calidad profesional y aprendizaje significativo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {proceso.map((item, index) => (
                <div key={item.step} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold handwritten text-lg">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Nuestro Impacto</h2>
            <p className="text-muted-foreground text-lg">Números que reflejan nuestro compromiso con la excelencia</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary handwritten">150+</div>
              <p className="text-muted-foreground">Estudiantes formados</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-accent handwritten">50+</div>
              <p className="text-muted-foreground">Proyectos entregados</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary handwritten">25+</div>
              <p className="text-muted-foreground">Empresas satisfechas</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-accent handwritten">95%</div>
              <p className="text-muted-foreground">Tasa de empleabilidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Fundador */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Nuestro Equipo</h2>
            <p className="text-muted-foreground text-lg">Las personas detrás de Tecwork</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary-foreground font-bold text-2xl">TW</span>
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">Equipo Fundador</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Tecwork fue fundada por un equipo de profesionales apasionados por la educación y la tecnología, con
                  más de 10 años de experiencia combinada en desarrollo de software, gestión de proyectos y formación
                  universitaria.
                </p>
                <p className="text-muted-foreground">
                  Nuestro objetivo es crear un puente real entre la academia y la industria, proporcionando
                  oportunidades significativas para el crecimiento profesional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-t-2 border-dashed border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 handwritten">
              ¿Quieres formar parte de Tecwork?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ya seas estudiante buscando experiencia real o empresa necesitando soluciones innovadoras
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/sumate">
                  <Users className="mr-2 h-5 w-5" />
                  Únete como estudiante
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">
                  <Building className="mr-2 h-5 w-5" />
                  Solicita un proyecto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
