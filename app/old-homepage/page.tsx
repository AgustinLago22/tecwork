import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Code, BookOpen, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function TecworkLanding() {
  return (
    <div className="bg-background paper-texture">
      {/* Hero Section con estilo notepad */}
      <section id="inicio" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Spiral holes decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-12 spiral-holes opacity-30"></div>

            <div className="relative z-10">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 handwritten text-sm">
                 Potenciando la comunidad IT universitaria
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Experiencia real para{" "}
                <span className="text-primary handwritten relative">
                  estudiantes de tecnología
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                    <path
                      d="M5 8c50-3 100-3 150 0s100 3 140-2"
                      stroke="#f97316"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Conectamos estudiantes con proyectos reales. Desarrolla habilidades, construye tu portafolio y prepárate
                para el mundo laboral con nuestra consultora universitaria.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  <Link href="/sumate">
                    <Rocket className="mr-2 h-5 w-5" />
                    Súmate como estudiante
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <Link href="/contacto">
                    <Code className="mr-2 h-5 w-5" />
                    Solicita un proyecto
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section con cards estilo sticky notes */}
      <section id="servicios" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">¿Cómo funciona Tecwork?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un proceso simple que conecta talento universitario con oportunidades reales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="sketch-border bg-card transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Únete a la comunidad</h3>
                <p className="text-muted-foreground">
                  Regístrate como estudiante y forma parte de nuestra red de futuros profesionales IT
                </p>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Proyectos reales</h3>
                <p className="text-muted-foreground">
                  Trabaja en proyectos de empresas reales con mentores experimentados
                </p>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Construye tu futuro</h3>
                <p className="text-muted-foreground">
                  Desarrolla tu portafolio y habilidades mientras ganas experiencia práctica
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section con estilo cuaderno rayado */}
      <section className="py-16 notepad-lines">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary handwritten">150+</div>
              <p className="text-muted-foreground">Estudiantes activos</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent handwritten">50+</div>
              <p className="text-muted-foreground">Proyectos completados</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary handwritten">25+</div>
              <p className="text-muted-foreground">Empresas colaboradoras</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent handwritten">95%</div>
              <p className="text-muted-foreground">Tasa de satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/*
      TESTIMONIALS - Comentado temporalmente para uso futuro
      Descomentar cuando tengamos testimonios reales de estudiantes

      {/* Testimonials con estilo post-it *}
      <section id="casos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">
              Lo que dicen nuestros estudiantes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-yellow-100 border-yellow-200 transform rotate-1 hover:rotate-0 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 handwritten">
                  &quot;Gracias a Tecwork conseguí mi primer trabajo como desarrollador. La experiencia fue increíble.&quot;
                </p>
                <p className="font-semibold text-gray-800">- María González</p>
                <p className="text-xs text-gray-600">Ing. Informática, UPM</p>
              </CardContent>
            </Card>

            <Card className="bg-green-100 border-green-200 transform -rotate-1 hover:rotate-0 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-green-400 text-green-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 handwritten">
                  &quot;Los proyectos reales me dieron la confianza que necesitaba para enfrentar entrevistas técnicas.&quot;
                </p>
                <p className="font-semibold text-gray-800">- Carlos Ruiz</p>
                <p className="text-xs text-gray-600">Ing. Software, UCM</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-100 border-blue-200 transform rotate-2 hover:rotate-0 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-blue-400 text-blue-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 handwritten">
                  &quot;La comunidad es increíble. Aprendí tanto de mis compañeros como de los mentores.&quot;
                </p>
                <p className="font-semibold text-gray-800">- Ana López</p>
                <p className="text-xs text-gray-600">Ing. Telecomunicaciones, UPC</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      */}

      {/* Nuestra Historia */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="sketch-border bg-card/80 backdrop-blur transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 handwritten flex items-center justify-center gap-2">
                  <span className="text-2xl">📚</span>
                  Nuestra Historia
                </h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    <span className="font-semibold text-foreground">TecWork</span> fue fundada por un grupo de estudiantes universitarios
                    apasionados por la educación y la tecnología, que vieron una oportunidad única: crear un puente real
                    entre el aprendizaje académico y la práctica profesional.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Nuestro incentivo es <span className="font-semibold text-foreground">aportar valor a los estudiantes</span> que
                    se van capacitando, mientras fomentamos la <span className="font-semibold text-foreground">digitalización de
                    negocios pequeños y medianos</span> que necesitan soluciones tecnológicas pero no pueden acceder a consultoras
                    tradicionales.
                  </p>
                </div>
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
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a cientos de estudiantes que ya están construyendo su futuro profesional
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/sumate">
                  <Users className="mr-2 h-5 w-5" />
                  Súmate como estudiante
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <Link href="/contacto">
                  <Code className="mr-2 h-5 w-5" />
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
