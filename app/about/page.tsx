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
      description: "Fomentamos relaciones duraderas entre estudiantes y empresas basadas en confianza mutua.",
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
                Conoce nuestro propósito
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
                Una plataforma que fomenta el desarrollo en los negocios locales y la educación práctica de estudiantes de tecnología, creando oportunidades de crecimiento para ambos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground handwritten">Nuestra Misión</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Aportar valor a estudiantes de tecnología en su proceso de capacitación, mientras fomentamos la
                  digitalización de pequeñas y medianas empresas, creando un ecosistema donde ambos crecen juntos.
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
                  Ser la plataforma líder en Argentina que transforma la educación tecnológica, impulsando la
                  digitalización de negocios locales y desarrollando el profesionalismo de estudiantes a través de
                  proyectos reales.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Empezando a crecer</h2>
            <p className="text-muted-foreground text-lg">Una startup con grandes ambiciones</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary handwritten">15+</div>
              <p className="text-muted-foreground">Estudiantes en la red</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-accent handwritten">5+</div>
              <p className="text-muted-foreground">Proyectos en desarrollo</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary handwritten">UNNE</div>
              <p className="text-muted-foreground">Universidad aliada</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-accent handwritten">2025</div>
              <p className="text-muted-foreground">Año de fundación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Nuestra Historia</h2>
            <p className="text-muted-foreground text-lg">De estudiantes, para estudiantes y negocios</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="space-y-6 text-center">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    <span className="font-semibold text-foreground">TecWork</span> fue fundada por un grupo de estudiantes universitarios
                    apasionados por la educación y la tecnología, que vieron una oportunidad única: crear un puente real
                    entre el aprendizaje académico y la práctica profesional.
                  </p>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Nuestro incentivo es <span className="font-semibold text-foreground">aportar valor a los estudiantes</span> que
                    se van capacitando, mientras fomentamos la <span className="font-semibold text-foreground">digitalización de
                    pequeñas y medianas empresas</span> que necesitan soluciones tecnológicas pero no pueden acceder a consultoras
                    tradicionales.
                  </p>

                 
                </div>
              </CardContent>
            </Card>

            {/* Doble propuesta de valor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
              <Card className="sketch-border bg-blue-50/50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Para Estudiantes</h4>
                  <p className="text-sm text-muted-foreground">
                    Experiencia real, mentoría profesional y construcción de portafolio desde la universidad
                  </p>
                </CardContent>
              </Card>

              <Card className="sketch-border bg-orange-50/50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Building className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Para Negocios</h4>
                  <p className="text-sm text-muted-foreground">
                    Digitalización accesible, soluciones personalizadas y apoyo en la transformación tecnológica
                  </p>
                </CardContent>
              </Card>
            </div>
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
