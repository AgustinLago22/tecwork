import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Smartphone,
  Globe,
  Database,
  Palette,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  const services = [
    {
      icon: Globe,
      title: "Desarrollo Web",
      description: "Sitios web modernos y aplicaciones web completas",
      features: ["React/Next.js", "Responsive Design", "SEO Optimizado", "Performance"],
      duration: "4-8 semanas",
      team: "2-4 estudiantes",
    },
    {
      icon: Smartphone,
      title: "Aplicaciones Móviles",
      description: "Apps nativas y multiplataforma para iOS y Android",
      features: ["React Native", "Flutter", "UI/UX Design", "App Store Deploy"],
      duration: "6-12 semanas",
      team: "3-5 estudiantes",
    },
    {
      icon: Code2,
      title: "Software a Medida",
      description: "Soluciones personalizadas para necesidades específicas",
      features: ["Análisis de requisitos", "Arquitectura escalable", "Testing", "Documentación"],
      duration: "8-16 semanas",
      team: "4-6 estudiantes",
    },
    {
      icon: Database,
      title: "Sistemas de Gestión",
      description: "CRM, ERP y sistemas administrativos",
      features: ["Base de datos", "Panel de administración", "Reportes", "Integraciones"],
      duration: "6-10 semanas",
      team: "3-5 estudiantes",
    },
    {
      icon: Palette,
      title: "Diseño UI/UX",
      description: "Interfaces intuitivas y experiencias de usuario excepcionales",
      features: ["Research", "Wireframes", "Prototipos", "Design System"],
      duration: "3-6 semanas",
      team: "2-3 estudiantes",
    },
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description: "Dashboards y análisis para toma de decisiones",
      features: ["Data Visualization", "Business Intelligence", "Automatización", "Insights"],
      duration: "4-8 semanas",
      team: "2-4 estudiantes",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Nuestros Servicios</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Soluciones tecnológicas con <span className="text-primary">talento universitario</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Ofrecemos servicios de desarrollo de alta calidad mientras brindamos experiencia práctica a estudiantes de
            tecnología bajo supervisión experta.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <service.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Incluye:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {service.team}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Nuestro Proceso</h2>
              <p className="text-xl text-muted-foreground">Metodología probada que garantiza resultados de calidad</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                  1
                </div>
                <h3 className="font-semibold">Análisis</h3>
                <p className="text-sm text-muted-foreground">Entendemos tus necesidades y definimos objetivos claros</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                  2
                </div>
                <h3 className="font-semibold">Planificación</h3>
                <p className="text-sm text-muted-foreground">Diseñamos la solución y formamos el equipo ideal</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                  3
                </div>
                <h3 className="font-semibold">Desarrollo</h3>
                <p className="text-sm text-muted-foreground">
                  Ejecutamos con metodologías ágiles y supervisión constante
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                  4
                </div>
                <h3 className="font-semibold">Entrega</h3>
                <p className="text-sm text-muted-foreground">Implementamos, capacitamos y brindamos soporte continuo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl text-muted-foreground">Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad</p>
          <Button size="lg" asChild>
            <Link href="/contacto">
              Solicitar cotización
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
