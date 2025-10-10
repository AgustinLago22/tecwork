"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Code, Briefcase, ArrowRight, CheckCircle, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RoadmapLanding() {
  return (
    <div className="bg-background relative">
      {/* Estilos minimalistas profesionales */}
      <style jsx>{`
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

        @keyframes drawLine {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
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

        @keyframes drawRoad {
          from {
            stroke-dashoffset: 2000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .road-path-animated {
          stroke-dashoffset: 2000;
          animation: drawRoad 3s ease-out forwards;
        }

        .journey-line {
          animation: drawLine 1.5s ease-out forwards;
        }

        .journey-node {
          animation: scaleIn 0.5s ease-out forwards;
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #732F17 0%, #D99962 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card hover premium */
        .journey-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .journey-card::before {
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

        .journey-card:hover::before {
          left: 100%;
        }

        .journey-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(115, 47, 23, 0.12);
        }

        /* Timeline professional */
        .timeline-dot {
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-dot::after {
          content: '';
          position: absolute;
          inset: -8px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .timeline-dot:hover::after {
          border-color: rgba(115, 47, 23, 0.3);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        /* Stats hover */
        .stat-item {
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-8px);
        }

        .stat-item:hover .stat-value {
          background: linear-gradient(135deg, #732F17 0%, #D99962 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtle grid background */
        .grid-bg {
          background-image:
            linear-gradient(rgba(115, 47, 23, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(115, 47, 23, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Premium shadow */
        .premium-shadow {
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(115, 47, 23, 0.08),
            0 16px 32px rgba(115, 47, 23, 0.06);
        }
      `}</style>


      {/* Hero Section - Minimalista y Profesional */}
      <section className="relative py-32 overflow-hidden z-10">
        {/* Gradient sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent"></div>

        {/* Líneas decorativas minimalistas */}
        <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent ml-[10%]"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-accent/20 to-transparent mr-[10%]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-8 border-primary/20 text-primary bg-primary/5 backdrop-blur">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></div>
                Plataforma de desarrollo profesional
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 fade-in-up text-balance" style={{ animationDelay: '0.2s' }}>
              Experiencia real para{" "}
              <span className="text-primary handwritten relative inline-block">
                estudiantes de tecnología
                {/* Subrayado sketch */}
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M5 8c50-3 100-3 150 0s100 3 140-2"
                    stroke="#D99962"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
              Un camino estructurado desde la universidad hasta el éxito profesional.
              Experiencia real, mentoría experta, crecimiento continuo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-12 px-8"
              >
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
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground h-12 px-8"
              >
                <Link href="/contacto">
                  <Code className="mr-2 h-5 w-5" />
                  Solicita un proyecto
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator minimalista */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - El Camino Profesional */}
      <section className="py-32 relative z-10">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-24">
              <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5">
                El proceso
              </Badge>
              <h2 className="text-5xl font-bold mb-6 tracking-tight">
                Tres etapas hacia el <span className="gradient-text">éxito</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Un proceso probado que transforma estudiantes en profesionales destacados
              </p>
            </div>

            {/* Timeline vertical con conexión */}
            <div className="relative">

              {/* Etapas */}
              <div className="space-y-32">
                {/* Etapa 1 - Integración */}
                <div className="relative grid md:grid-cols-2 gap-12 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block journey-node z-10" style={{ animationDelay: '0.5s' }}>
                    <div className="timeline-dot w-16 h-16 rounded-full bg-background border-4 border-primary shadow-xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo */}
                  <div className="md:text-right md:pr-16 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-primary tracking-wider uppercase">Etapa 01</span>
                        <div className="h-px w-12 bg-primary/30"></div>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight">Integración a la comunidad</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Conecta con una red de profesionales y estudiantes ambiciosos.
                        Tu punto de partida hacia el crecimiento.
                      </p>
                    </div>
                  </div>

                  {/* Imagen integrada al fondo */}
                  <div className="md:ml-16">
                    <div className="relative w-full h-80">
                      <Image
                        src="/etapa1-removebg.png"
                        alt="Integración a la comunidad - Estudiantes colaborando"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Etapa 2 - Desarrollo */}
                <div className="relative grid md:grid-cols-2 gap-12 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block journey-node z-10" style={{ animationDelay: '0.7s' }}>
                    <div className="timeline-dot w-16 h-16 rounded-full bg-background border-4 border-accent shadow-xl flex items-center justify-center">
                      <Code className="w-7 h-7 text-accent" />
                    </div>
                  </div>

                  {/* Imagen integrada al fondo */}
                  <div className="md:mr-16 md:order-1">
                    <div className="relative w-full h-80">
                      <Image
                        src="/etapa2-removebg.png"
                        alt="Desarrollo de experiencia - Trabajo en proyectos reales"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Contenido derecho */}
                  <div className="md:pl-16 md:order-2">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="text-sm font-semibold text-accent tracking-wider uppercase">Etapa 02</span>
                      <div className="h-px w-12 bg-accent/30"></div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">Desarrollo de experiencia</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Trabaja en proyectos de impacto real. Aprende, desarrolla y
                      construye un portafolio que hable por sí solo.
                    </p>
                  </div>
                </div>

                {/* Etapa 3 - Consolidación */}
                <div className="relative grid md:grid-cols-2 gap-12 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block journey-node z-10" style={{ animationDelay: '0.9s' }}>
                    <div className="timeline-dot w-16 h-16 rounded-full bg-background border-4 border-primary shadow-xl flex items-center justify-center">
                      <Briefcase className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo */}
                  <div className="md:text-right md:pr-16 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-primary tracking-wider uppercase">Etapa 03</span>
                        <div className="h-px w-12 bg-primary/30"></div>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight">Lanzamiento profesional</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Portafolio consolidado, habilidades validadas y red profesional
                        establecida. Listo para destacar en el mercado.
                      </p>
                    </div>
                  </div>

                  {/* Imagen integrada al fondo */}
                  <div className="md:ml-16">
                    <div className="relative w-full h-80">
                      <Image
                        src="/etapa3-removebg.png"
                        alt="Lanzamiento profesional - Éxito en tu carrera"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Resultados que importan */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5">
                Impacto medible
              </Badge>
              <h2 className="text-5xl font-bold tracking-tight">
                Resultados que <span className="gradient-text">hablan</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "150+", label: "Estudiantes activos", icon: Users },
                { value: "50+", label: "Proyectos completados", icon: TrendingUp },
                { value: "25+", label: "Empresas colaboradoras", icon: Briefcase },
                { value: "95%", label: "Tasa de satisfacción", icon: Award },
              ].map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/5 border border-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="stat-value text-5xl font-bold mb-2 text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historia - El Origen */}
      <section className="py-32 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/[0.02]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5">
                Nuestra historia
              </Badge>
              <h2 className="text-5xl font-bold mb-8 tracking-tight">
                Construido por estudiantes, <br />
                <span className="gradient-text">para estudiantes</span>
              </h2>
            </div>

            <Card className="border-2 bg-card/50 backdrop-blur premium-shadow">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">TecWork</span> nació de la frustración compartida
                    de estudiantes que terminaban su carrera con conocimiento teórico pero sin experiencia práctica
                    que los empleadores buscaban.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Decidimos crear el puente que faltaba: una plataforma donde{" "}
                    <span className="font-semibold text-primary">estudiantes desarrollan experiencia real</span>{" "}
                    mientras{" "}
                    <span className="font-semibold text-accent">negocios obtienen soluciones de calidad</span>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Para estudiantes</h4>
                      <p className="text-muted-foreground">
                        Experiencia práctica, mentoría profesional y portafolio real desde la universidad.
                      </p>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Briefcase className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Para empresas</h4>
                      <p className="text-muted-foreground">
                        Soluciones tecnológicas accesibles con supervisión profesional y resultados garantizados.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final - Llamado a la acción */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-background"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 mb-8">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Comienza tu recorrido <br />
                <span className="gradient-text">hoy mismo</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Únete a cientos de estudiantes que están transformando su futuro profesional
                con experiencia real y mentoría experta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-14 px-10 text-base"
              >
                <Link href="/sumate">
                  Iniciar mi recorrido
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 h-14 px-10 text-base"
              >
                <Link href="/contacto">
                  Solicitar proyecto
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Sin compromisos. Proceso transparente. Resultados medibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
