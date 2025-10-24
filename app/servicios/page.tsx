"use client"

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
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  const services = [
    {
      icon: Globe,
      title: "Desarrollo Web",
      description: "Sitios web modernos y aplicaciones web completas",
      features: ["React/Next.js", "Responsive Design", "SEO Optimizado", "Performance"],
      color: "primary",
      badge: "Más solicitado",
      contactId: "web-basica",
    },
    {
      icon: Smartphone,
      title: "Aplicaciones Móviles",
      description: "Apps nativas y multiplataforma para iOS y Android",
      features: ["React Native", "Flutter", "UI/UX Design", "App Store Deploy"],
      color: "accent",
      badge: "Popular",
      contactId: "app-movil",
    },
    {
      icon: Code2,
      title: "Software a Medida",
      description: "Soluciones personalizadas para necesidades específicas",
      features: ["Análisis de requisitos", "Arquitectura escalable", "Testing", "Documentación"],
      color: "primary",
      badge: "Personalizado",
      contactId: "web-basica",
    },
    {
      icon: Database,
      title: "Sistemas de Gestión",
      description: "CRM, ERP y sistemas administrativos",
      features: ["Base de datos", "Panel de administración", "Reportes", "Integraciones"],
      color: "accent",
      badge: "Empresarial",
      contactId: "base-datos",
    },
    {
      icon: Palette,
      title: "Diseño UI/UX",
      description: "Interfaces intuitivas y experiencias de usuario excepcionales",
      features: ["Research", "Wireframes", "Prototipos", "Design System"],
      color: "primary",
      badge: "Creativo",
      contactId: "consultoria",
    },
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description: "Dashboards y análisis para toma de decisiones",
      features: ["Data Visualization", "Business Intelligence", "Automatización", "Insights"],
      color: "accent",
      badge: "Estratégico",
      contactId: "dashboard",
    },
  ]

  return (
    <div className="min-h-screen bg-background main-wrapper">
      {/* Estilos premium similares a la homepage */}
      <style jsx>{`
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

        /* Service card hover premium */
        .service-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        }

        .service-card::before {
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

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(115, 47, 23, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(50%, -50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover::before,
        .service-card:active::before {
          left: 100%;
        }

        .service-card:hover::after,
        .service-card:active::after {
          opacity: 1;
        }

        .service-card:hover,
        .service-card:active {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(115, 47, 23, 0.15);
        }

        .service-icon-wrapper {
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon-wrapper,
        .service-card:active .service-icon-wrapper {
          transform: rotate(-5deg) scale(1.1);
          box-shadow: 0 8px 24px rgba(115, 47, 23, 0.25);
        }

        .feature-item {
          transition: all 0.2s ease;
        }

        .service-card:hover .feature-item,
        .service-card:active .feature-item {
          transform: translateX(4px);
        }

        /* Process step hover */
        .process-step {
          transition: all 0.3s ease;
        }

        .process-step:hover,
        .process-step:active {
          transform: translateY(-4px);
        }

        .process-step:hover .step-number,
        .process-step:active .step-number {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(115, 47, 23, 0.3);
        }

        .step-number {
          transition: all 0.3s ease;
        }

        /* Premium shadow */
        .premium-shadow {
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(115, 47, 23, 0.08),
            0 16px 32px rgba(115, 47, 23, 0.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-up,
          .scale-in,
          .service-card,
          .process-step {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-primary/[0.03] to-background">
        {/* Gradient sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]"></div>

        {/* Líneas decorativas minimalistas */}
        <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent ml-[10%] hidden md:block"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-accent/20 to-transparent mr-[10%] hidden md:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-6 md:mb-8 border-primary/20 text-primary bg-primary/5 backdrop-blur text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></div>
                Nuestros servicios
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>
              Soluciones tecnológicas con <span className="gradient-text">talento universitario</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
              Ofrecemos servicios de desarrollo de alta calidad mientras brindamos experiencia práctica a estudiantes de
              tecnología bajo supervisión experta.
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

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-primary/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="scale-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <Card className={`h-full service-card border-${service.color}/10 hover:border-${service.color}/30 bg-card premium-shadow relative group`}>
                  {/* Badge en la esquina superior */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium border-${service.color}/30 bg-${service.color}/5 text-${service.color} backdrop-blur-sm`}
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className={`service-icon-wrapper inline-flex w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-${service.color}/10 border-2 border-${service.color}/20 items-center justify-center mb-6 shadow-lg`}>
                      <service.icon className={`h-8 w-8 md:h-10 md:w-10 text-${service.color}`} />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold mb-3 leading-tight">{service.title}</CardTitle>
                    <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground/90">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-3 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`h-1 w-8 rounded-full bg-gradient-to-r from-${service.color} to-${service.color}/50`}></div>
                        <h4 className="font-semibold text-sm text-foreground">Incluye</h4>
                      </div>
                      <ul className="space-y-2.5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="feature-item flex items-start gap-3 text-sm text-foreground/90">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${service.color}/10 flex items-center justify-center mt-0.5`}>
                              <CheckCircle className={`h-3 w-3 text-${service.color}`} />
                            </div>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botón "Ver más" al hacer hover */}
                    <div className="mt-6 pt-6 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href={`/contacto?servicio=${service.contactId}`}
                        className={`inline-flex items-center gap-2 text-sm font-medium text-${service.color} hover:gap-3 transition-all`}
                      >
                        Solicitar este servicio
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-accent/[0.02] to-primary/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(115,47,23,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,153,98,0.05),transparent_50%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 text-sm">
                Nuestro proceso
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Metodología <span className="gradient-text">probada</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Garantizamos resultados de calidad en cada etapa del proyecto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="process-step text-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <div className="step-number w-14 h-14 md:w-16 md:h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl mx-auto shadow-lg">
                  1
                </div>
                <h3 className="font-bold text-lg md:text-xl">Análisis</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Entendemos tus necesidades y definimos objetivos claros
                </p>
              </div>

              <div className="process-step text-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <div className="step-number w-14 h-14 md:w-16 md:h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl mx-auto shadow-lg">
                  2
                </div>
                <h3 className="font-bold text-lg md:text-xl">Planificación</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Diseñamos la solución y formamos el equipo ideal
                </p>
              </div>

              <div className="process-step text-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <div className="step-number w-14 h-14 md:w-16 md:h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl mx-auto shadow-lg">
                  3
                </div>
                <h3 className="font-bold text-lg md:text-xl">Desarrollo</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Ejecutamos con metodologías ágiles y supervisión constante
                </p>
              </div>

              <div className="process-step text-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <div className="step-number w-14 h-14 md:w-16 md:h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl mx-auto shadow-lg">
                  4
                </div>
                <h3 className="font-bold text-lg md:text-xl">Entrega</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Implementamos, capacitamos y brindamos soporte continuo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-muted/20 via-primary/[0.03] to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 mb-6">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                ¿Tienes un proyecto <br className="hidden sm:block" />
                <span className="gradient-text">en mente?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad con nuestro equipo de talento universitario
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-12 md:h-14 px-8 md:px-10"
              >
                <Link href="/contacto">
                  Planifica tu proyecto
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 h-12 md:h-14 px-8 md:px-10"
              >
                <Link href="/about">
                  Conoce más sobre nosotros
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Sin compromisos. Proceso transparente. Resultados medibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
