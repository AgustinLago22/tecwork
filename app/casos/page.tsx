import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Users, TrendingUp, CheckCircle, Globe, BarChart3, Clock } from "lucide-react"
import Link from "next/link"

export default function CasosPage() {
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
                Casos de éxito
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Proyectos que{" "}
                <span className="text-primary handwritten relative">
                  transforman
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 250 12" fill="none">
                    <path d="M5 8c40-3 80-3 120 0s80 3 110-2" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Descubre cómo nuestros estudiantes han ayudado a empresas reales a resolver sus desafíos tecnológicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caso Piloto Principal */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Caso Piloto</h2>
              <p className="text-muted-foreground text-lg">
                Nuestro primer proyecto que demostró el potencial de Tecwork
              </p>
            </div>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-card-foreground mb-2">
                      Dashboard Analytics para StartupTech
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Dashboard
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Web App
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Analytics
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-muted-foreground text-sm mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Marzo 2024</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>4 semanas</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Problema */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 El Problema</h3>
                  <p className="text-red-700 mb-4">
                    StartupTech, una empresa de 15 empleados, tenía sus datos dispersos en múltiples herramientas
                    (Google Analytics, CRM, redes sociales) sin una visión unificada. El CEO perdía horas cada semana
                    recopilando información manualmente para tomar decisiones estratégicas.
                  </p>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Datos en 5 plataformas diferentes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>8 horas semanales perdidas en reportes manuales</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Decisiones basadas en datos desactualizados</span>
                    </li>
                  </ul>
                </div>

                {/* Solución */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Nuestra Solución</h3>
                  <p className="text-blue-700 mb-4">
                    Desarrollamos un dashboard personalizado que integra todas sus fuentes de datos en tiempo real, con
                    visualizaciones interactivas y alertas automáticas para métricas clave.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Tecnologías utilizadas:</h4>
                      <ul className="space-y-1 text-blue-700 text-sm">
                        <li>• Next.js + TypeScript</li>
                        <li>• Supabase (Base de datos)</li>
                        <li>• Chart.js para visualizaciones</li>
                        <li>• APIs de Google Analytics, HubSpot</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Equipo del proyecto:</h4>
                      <div className="flex items-center space-x-2 text-blue-700 text-sm mb-2">
                        <Users className="w-4 h-4" />
                        <span>3 estudiantes + 1 mentor</span>
                      </div>
                      <ul className="space-y-1 text-blue-700 text-sm">
                        <li>• Ana (Frontend - React)</li>
                        <li>• Carlos (Backend - APIs)</li>
                        <li>• María (UI/UX Design)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resultados */}
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">🎯 Resultados Obtenidos</h3>
                  <p className="text-green-700 mb-4">
                    El dashboard transformó completamente la forma en que StartupTech toma decisiones, ahorrando tiempo
                    y mejorando la precisión de sus análisis.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 handwritten mb-1">90%</div>
                      <p className="text-green-700 text-sm">Reducción en tiempo de reportes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 handwritten mb-1">100%</div>
                      <p className="text-green-700 text-sm">Datos en tiempo real</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 handwritten mb-1">5x</div>
                      <p className="text-green-700 text-sm">Más rápido en decisiones</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold text-green-800">Impacto específico:</h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Identificación automática de tendencias de ventas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Alertas proactivas sobre métricas críticas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Reportes ejecutivos automáticos semanales</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>ROI del proyecto recuperado en 2 meses</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-yellow-100 border-yellow-200 p-6 rounded-lg transform rotate-1">
                  <blockquote className="text-gray-700 handwritten text-lg mb-4">
                    "El equipo de Tecwork superó nuestras expectativas. No solo entregaron una solución técnica
                    excelente, sino que también aportaron ideas innovadoras que no habíamos considerado. Ahora tenemos
                    visibilidad completa de nuestro negocio en tiempo real."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">JM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Jorge Martínez</p>
                      <p className="text-gray-600 text-sm">CEO, StartupTech</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Otros Casos (Preview) */}
      <section className="py-20 notepad-lines">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 handwritten">Más casos de éxito</h2>
            <p className="text-muted-foreground text-lg">Próximamente documentaremos más proyectos exitosos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1 opacity-75">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">E-commerce Local</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Tienda online para artesanos locales con sistema de inventario
                </p>
                <Badge variant="secondary" className="text-xs">
                  Próximamente
                </Badge>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:rotate-1 opacity-75">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">App Móvil Fitness</h3>
                <p className="text-muted-foreground text-sm mb-4">Aplicación para seguimiento de rutinas y progreso</p>
                <Badge variant="secondary" className="text-xs">
                  En desarrollo
                </Badge>
              </CardContent>
            </Card>

            <Card className="sketch-border bg-card hover:shadow-lg transition-all duration-300 transform hover:-rotate-1 opacity-75">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">Sistema CRM</h3>
                <p className="text-muted-foreground text-sm mb-4">Gestión de clientes para empresa de servicios</p>
                <Badge variant="secondary" className="text-xs">
                  Planificado
                </Badge>
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
              ¿Quieres ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cuéntanos tu desafío y trabajemos juntos para crear una solución innovadora
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contacto">
                  Solicitar proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Ver nuestros servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
