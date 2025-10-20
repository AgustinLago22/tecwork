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
            stroke-dashoffset: 1400;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .road-path-animated {
          stroke-dashoffset: 1400;
          animation: drawRoad 2.5s ease-in-out forwards;
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

        /* Card hover premium - También funciona en tap móvil */
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

        .journey-card:hover::before,
        .journey-card:active::before {
          left: 100%;
        }

        .journey-card:hover,
        .journey-card:active {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(115, 47, 23, 0.12);
        }

        /* Timeline professional - Efectos táctiles mejorados */
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

        .timeline-dot:hover::after,
        .timeline-dot:active::after {
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

        /* Stats hover - También se activa en tap en móviles */
        .stat-item {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stat-item:hover,
        .stat-item:active {
          transform: translateY(-4px);
        }

        .stat-item:hover .stat-value,
        .stat-item:active .stat-value {
          background: linear-gradient(135deg, #732F17 0%, #D99962 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Reducir animaciones en dispositivos que prefieren movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .fade-in-up,
          .road-path-animated,
          .journey-node,
          .stat-item {
            animation: none !important;
            transition: none !important;
          }
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
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden z-10 bg-gradient-to-b from-background via-primary/[0.03] to-background">
        {/* Gradient sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]"></div>

        {/* Líneas decorativas minimalistas - solo en desktop */}
        <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent ml-[10%] hidden md:block"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-accent/20 to-transparent mr-[10%] hidden md:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-6 md:mb-8 border-primary/20 text-primary bg-primary/5 backdrop-blur text-xs sm:text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></div>
                <span className="hidden sm:inline">Plataforma de desarrollo profesional</span>
                <span className="sm:hidden">Desarrollo profesional</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 fade-in-up text-balance leading-tight" style={{ animationDelay: '0.2s' }}>
              Experiencia real para{" "}
              <span className="text-primary handwritten relative inline-block">
                estudiantes de Sistemas
                {/* Subrayado sketch */}
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M5 8c50-3 100-3 150 0s100 3 140-2"
                    stroke="#D99962"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
              Un camino estructurado desde la universidad hasta el éxito profesional.
              Experiencia real, mentoría experta, crecimiento continuo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center fade-in-up px-4 sm:px-0" style={{ animationDelay: '0.4s' }}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              >
                <Link href="/sumate">
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Súmate como estudiante</span>
                  <span className="sm:hidden">Súmate</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              >
                <Link href="/contacto">
                  <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Solicita un proyecto
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator minimalista - solo en desktop */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - El Camino Profesional */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10 bg-primary/[0.03]">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header mejorado */}
            <div className="text-center mb-16 md:mb-20 lg:mb-28">
              <Badge variant="outline" className="mb-6 md:mb-8 border-primary/30 text-primary bg-primary/[0.08] backdrop-blur-sm text-xs sm:text-sm px-4 py-2 shadow-lg">
                <span className="font-medium">El proceso</span>
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight px-4 leading-tight">
                Tres etapas hacia el <span className="gradient-text">éxito</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl mx-auto px-4 leading-relaxed font-light">
                Un proceso probado que transforma estudiantes en profesionales destacados
              </p>
            </div>

            {/* Timeline vertical con conexión */}
            <div className="relative">

              {/* Etapas */}
              <div className="space-y-16 sm:space-y-20 md:space-y-28 lg:space-y-36 relative">
                {/* Línea vertical única con trazos */}
                <svg className="hidden md:block absolute left-1/2 pointer-events-none" width="4" height="1600" style={{ top: 0, transform: 'translateX(-2px)', zIndex: 0 }}>
                  <line
                    x1="2"
                    y1="20"
                    x2="2"
                    y2="1370"
                    stroke="#D99962"
                    strokeWidth="4"
                    strokeDasharray="16 24"
                    className="road-path-animated"
                    style={{ strokeDashoffset: 1400 }}
                  />
                </svg>
                {/* Etapa 1 - Integración */}
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">
                  {/* Dot central mejorado */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20" style={{ animationDelay: '0.5s' }}>
                    {/* Fondo blanco para cortar la línea */}
                    <div className="absolute inset-0 bg-background rounded-full scale-130 -z-10"></div>
                    <div className="timeline-dot w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-background border-3 sm:border-4 md:border-[5px] border-primary shadow-2xl flex items-center justify-center ring-4 ring-primary/10">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo mejorado */}
                  <div className="flex items-center justify-end text-right pr-8 sm:pr-10 md:pr-16 lg:pr-24 relative z-10">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                      <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-primary tracking-wider uppercase">Etapa 01</span>
                        <div className="h-0.5 w-6 sm:w-8 md:w-12 lg:w-16 bg-gradient-to-l from-primary/50 to-primary"></div>
                      </div>
                      <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">Súmate al ecosistema</h3>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/90 leading-relaxed hidden sm:block max-w-md ml-auto">
                        ¿Eres estudiante? Inscríbete y muestra tu talento. ¿Tienes un proyecto?
                        Solicita una solución. Aquí comienza la conexión entre talento y oportunidad.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Inscríbete y muestra tu talento o solicita una solución.
                      </p>
                    </div>
                  </div>

                  {/* Imagen mejorada */}
                  <div className="flex items-center pl-8 sm:pl-10 md:pl-16 lg:pl-24 relative z-10">
                    <div className="relative w-full h-36 sm:h-52 md:h-72 lg:h-80 xl:h-96">
                      <Image
                        src="/etapa1-removebg.png"
                        alt="Integración a la comunidad - Estudiantes colaborando"
                        fill
                        className="object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Etapa 2 - Desarrollo */}
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">
                  {/* Dot central mejorado */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20 -mt-4" style={{ animationDelay: '0.7s' }}>
                    {/* Fondo blanco para cortar la línea */}
                    <div className="absolute inset-0 bg-background rounded-full scale-130 -z-10"></div>
                    <div className="timeline-dot w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-background border-3 sm:border-4 md:border-[5px] border-accent shadow-2xl flex items-center justify-center ring-4 ring-accent/10">
                      <Code className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-accent" />
                    </div>
                  </div>

                  {/* Imagen mejorada - orden 1 (izquierda) */}
                  <div className="flex items-center pr-8 sm:pr-10 md:pr-16 lg:pr-24 order-1 relative z-10">
                    <div className="relative w-full h-36 sm:h-52 md:h-72 lg:h-80 xl:h-96">
                      <Image
                        src="/etapa2-removebg.png"
                        alt="Desarrollo de experiencia - Trabajo en proyectos reales"
                        fill
                        className="object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>

                  {/* Contenido derecho mejorado - orden 2 (derecha) */}
                  <div className="flex items-center pl-8 sm:pl-10 md:pl-16 lg:pl-24 order-2 relative z-10">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                      <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                        <div className="h-0.5 w-6 sm:w-8 md:w-12 lg:w-16 bg-gradient-to-r from-accent to-accent/50"></div>
                        <span className="text-xs sm:text-sm md:text-base font-bold text-accent tracking-wider uppercase">Etapa 02</span>
                      </div>
                      <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">Matching perfecto</h3>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/90 leading-relaxed hidden sm:block max-w-md">
                        Conectamos proyectos reales de empresas con estudiantes que tienen las skills exactas.
                        Un match donde ambos ganan: experiencia práctica y soluciones de calidad.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Conectamos proyectos con estudiantes ideales.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Etapa 3 - Consolidación */}
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">
                  {/* Dot central mejorado */}
                  <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20 -mt-8" style={{ animationDelay: '0.9s' }}>
                    {/* Fondo blanco para cortar la línea */}
                    <div className="absolute inset-0 bg-background rounded-full scale-130 -z-10"></div>
                    <div className="timeline-dot w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-background border-3 sm:border-4 md:border-[5px] border-primary shadow-2xl flex items-center justify-center ring-4 ring-primary/10">
                      <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo mejorado */}
                  <div className="flex items-center justify-end text-right pr-8 sm:pr-10 md:pr-16 lg:pr-24 relative z-10">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                      <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-primary tracking-wider uppercase">Etapa 03</span>
                        <div className="h-0.5 w-6 sm:w-8 md:w-12 lg:w-16 bg-gradient-to-l from-primary/50 to-primary"></div>
                      </div>
                      <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">Resultados que importan</h3>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/90 leading-relaxed hidden sm:block max-w-md ml-auto">
                        Los estudiantes construyen portafolio real. Las empresas obtienen
                        soluciones funcionales. Todos crecen en el proceso.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Portafolio real y soluciones funcionales.
                      </p>
                    </div>
                  </div>

                  {/* Imagen mejorada */}
                  <div className="flex items-center pl-8 sm:pl-10 md:pl-16 lg:pl-24 relative z-10">
                    <div className="relative w-full h-36 sm:h-52 md:h-72 lg:h-80 xl:h-96">
                      <Image
                        src="/etapa3-removebg.png"
                        alt="Lanzamiento profesional - Éxito en tu carrera"
                        fill
                        className="object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué TecWork - Problema/Solución */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden z-10 bg-gradient-to-b from-background via-accent/[0.02] to-primary/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(115,47,23,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,153,98,0.05),transparent_50%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <Badge variant="outline" className="mb-4 md:mb-6 border-primary/20 text-primary bg-primary/5 text-xs sm:text-sm">
                Por qué TecWork
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4">
                El puente que <span className="gradient-text">faltaba</span>
              </h2>
            </div>

            {/* Diseño con Cuadros Separados con Bordes */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {/* Cuadro Izquierdo - El Desafío */}
              <div className="border-2 border-muted/30 rounded-2xl p-6 md:p-10 lg:p-12 bg-background hover:shadow-xl hover:shadow-muted/20 transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted/10 flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">El desafío</h3>
                  </div>
                  <div className="h-1 w-20 bg-gradient-to-r from-muted-foreground/40 to-muted-foreground/20 rounded-full mb-6"></div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-foreground font-medium mb-1">Estudiantes sin experiencia laboral</p>
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                        Conocimiento teórico practico pero sin la experiencia que buscan los empleadores
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-foreground font-medium mb-1">Empresas con recursos limitados</p>
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                        Necesitan soluciones digitales pero no pueden costear equipos de desarrollo completos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuadro Derecho - La Solución */}
              <div className="border-2 border-primary/30 rounded-2xl p-6 md:p-10 lg:p-12 bg-background hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">La solución</h3>
                  </div>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6"></div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-foreground font-semibold mb-1">Conexión directa</p>
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                        Conectar talento universitario con pequeñas y medianas empresas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-foreground font-semibold mb-1">Aprendizaje aplicado</p>
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                        Los estudiantes participan en proyectos reales, adquiriendo experiencia practica.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm md:text-base lg:text-lg text-foreground font-semibold mb-1">Desarrollo accesible</p>
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                        Las empresas obtienen soluciones tecnológicas de calidad a costos razonables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Separador con estadísticas con efectos */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-12 py-6">
              <div className="stat-item text-center p-2 sm:p-3 md:p-4 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="mb-2 sm:mb-3 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary/10">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="stat-value text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-primary">50+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-tight">Proyectos entregados</div>
              </div>
              <div className="stat-item text-center p-2 sm:p-3 md:p-4 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="mb-2 sm:mb-3 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary/10">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="stat-value text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-accent">150+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-tight">Estudiantes activos</div>
              </div>
              <div className="stat-item text-center p-2 sm:p-3 md:p-4 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="mb-2 sm:mb-3 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary/10">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="stat-value text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-foreground">95%</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-tight">Satisfacción</div>
              </div>
            </div>

            {/* Cards finales con datos concretos */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Card Estudiantes */}
              <div className="border border-primary/10 rounded-2xl p-6 md:p-8 bg-card hover:border-primary/30 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-base md:text-lg">Para estudiantes</h4>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                  Proyectos reales que impulsan el aprendizaje con practica real, construyendo un portafolio profesional desde la universidad.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Experiencia verificable en tu CV</span>
                </div>
              </div>

              {/* Card Empresas */}
              <div className="border border-accent/10 rounded-2xl p-6 md:p-8 bg-card hover:border-accent/30 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-bold text-base md:text-lg">Para empresas</h4>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                  Soluciones tecnológicas con supervisión profesional que impulsan el crecimiento de tu negocio.
                </p>
                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                  <Award className="w-4 h-4" />
                  <span>Calidad asegurada, costos accesibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Llamado a la acción */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10 bg-gradient-to-b from-muted/20 via-primary/[0.03] to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 mb-6 md:mb-8">
                <Rocket className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight px-4">
                Comienza tu recorrido <br className="hidden sm:block" />
                <span className="gradient-text">hoy mismo</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4">
                Únete a cientos de estudiantes que están transformando su futuro profesional
                con experiencia real y mentoría experta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base"
              >
                <Link href="/sumate">
                  Iniciar mi recorrido
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base"
              >
                <Link href="/contacto">
                  Solicitar proyecto
                </Link>
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mt-6 md:mt-8 px-4">
              Sin compromisos. Proceso transparente. Resultados medibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
