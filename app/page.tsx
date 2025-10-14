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
            stroke-dashoffset: 1100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .road-path-animated {
          stroke-dashoffset: 1100;
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
                estudiantes de tecnología
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
      <section className="py-16 md:py-24 lg:py-32 relative z-10 bg-muted/20">
        {/* SVG Path dibujado a mano - Camino zigzag smooth */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 800 1800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Camino sutil que guía a través de las etapas */}
            <path
              d="M 400 280
                 C 350 380, 320 480, 360 580
                 C 400 680, 460 720, 480 800
                 C 500 880, 480 960, 440 1040
                 C 400 1120, 340 1200, 320 1300
                 C 300 1400, 330 1500, 380 1600
                 C 420 1680, 440 1760, 420 1840"
              stroke="#8B5A3C"
              strokeWidth="3"
              strokeDasharray="18 22"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="road-path-animated"
              opacity="0.30"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(115, 47, 23, 0.1))'
              }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-24">
              <Badge variant="outline" className="mb-4 md:mb-6 border-primary/20 text-primary bg-primary/5 text-xs sm:text-sm">
                El proceso
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight px-4">
                Tres etapas hacia el <span className="gradient-text">éxito</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Un proceso probado que transforma estudiantes en profesionales destacados
              </p>
            </div>

            {/* Timeline vertical con conexión */}
            <div className="relative">

              {/* Etapas */}
              <div className="space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32">
                {/* Etapa 1 - Integración */}
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20" style={{ animationDelay: '0.5s' }}>
                    <div className="timeline-dot w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-background border-2 sm:border-3 md:border-4 border-primary shadow-xl flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo */}
                  <div className="flex items-center justify-end text-right pr-6 sm:pr-8 md:pr-12 lg:pr-20 relative z-10">
                    <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                      <div className="inline-flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3">
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">Etapa 01</span>
                        <div className="h-px w-4 sm:w-6 md:w-8 lg:w-12 bg-primary/30"></div>
                      </div>
                      <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">Súmate al ecosistema</h3>
                      <p className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground leading-relaxed hidden sm:block">
                        ¿Eres estudiante? Inscríbete y muestra tu talento. ¿Tienes un proyecto?
                        Solicita una solución. Aquí comienza la conexión entre talento y oportunidad.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Estudiantes muestran talento, empresas solicitan proyectos. Conectamos ambos mundos.
                      </p>
                    </div>
                  </div>

                  {/* Imagen integrada al fondo */}
                  <div className="flex items-center pl-6 sm:pl-8 md:pl-12 lg:pl-20 relative z-10">
                    <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-72 xl:h-80">
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
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20" style={{ animationDelay: '0.7s' }}>
                    <div className="timeline-dot w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-background border-2 sm:border-3 md:border-4 border-accent shadow-xl flex items-center justify-center">
                      <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent" />
                    </div>
                  </div>

                  {/* Imagen integrada al fondo - orden 1 (izquierda) */}
                  <div className="flex items-center pr-6 sm:pr-8 md:pr-12 lg:pr-20 order-1 relative z-10">
                    <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-72 xl:h-80">
                      <Image
                        src="/etapa2-removebg.png"
                        alt="Desarrollo de experiencia - Trabajo en proyectos reales"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Contenido derecho - orden 2 (derecha) */}
                  <div className="flex items-center pl-6 sm:pl-8 md:pl-12 lg:pl-20 order-2 relative z-10">
                    <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                      <div className="inline-flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3">
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-accent tracking-wider uppercase">Etapa 02</span>
                        <div className="h-px w-4 sm:w-6 md:w-8 lg:w-12 bg-accent/30"></div>
                      </div>
                      <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">Matching perfecto</h3>
                      <p className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground leading-relaxed hidden sm:block">
                        Conectamos proyectos reales de empresas con estudiantes que tienen las skills exactas.
                        Un match donde ambos ganan: experiencia práctica y soluciones de calidad.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Proyectos reales con estudiantes ideales. Experiencia práctica + soluciones de calidad.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Etapa 3 - Consolidación */}
                <div className="relative grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                  {/* Dot central */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 journey-node z-20" style={{ animationDelay: '0.9s' }}>
                    <div className="timeline-dot w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-background border-2 sm:border-3 md:border-4 border-primary shadow-xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                  </div>

                  {/* Contenido izquierdo */}
                  <div className="flex items-center justify-end text-right pr-6 sm:pr-8 md:pr-12 lg:pr-20 relative z-10">
                    <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                      <div className="inline-flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3">
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">Etapa 03</span>
                        <div className="h-px w-4 sm:w-6 md:w-8 lg:w-12 bg-primary/30"></div>
                      </div>
                      <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">Resultados que importan</h3>
                      <p className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground leading-relaxed hidden sm:block">
                        Los estudiantes construyen portafolio real. Las empresas obtienen
                        soluciones funcionales. Todos crecen en el proceso.
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight sm:hidden">
                        Estudiantes con portafolio real, empresas con soluciones. Todos crecen juntos.
                      </p>
                    </div>
                  </div>

                  {/* Imagen integrada al fondo */}
                  <div className="flex items-center pl-6 sm:pl-8 md:pl-12 lg:pl-20 relative z-10">
                    <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-72 xl:h-80">
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

            {/* Split 50/50 - Desafío vs Solución */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {/* Lado izquierdo - El Desafío */}
              <div className="border-2 border-muted/50 rounded-2xl p-6 md:p-10 bg-muted/10 hover:border-muted/70 hover:bg-muted/15 transition-all shadow-md">
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-muted/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">El desafío</h3>
                    <div className="h-1 w-12 bg-muted/40 rounded"></div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                  Estudiantes con conocimiento teórico pero sin experiencia necesaria que los empleadores buscan.
                  Empresas que necesitan soluciones tecnológicas pero no pueden costear equipos completos.
                </p>

                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4" />
                  <span>Brecha entre academia y mercado</span>
                </div>
              </div>

              {/* Lado derecho - La Solución */}
              <div className="border-2 border-primary/20 rounded-2xl p-6 md:p-10 bg-primary/[0.02] hover:border-primary/30 transition-all shadow-lg">
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">La solución</h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded"></div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 md:mb-6 font-medium">
                  Una plataforma que conecta talento universitario con proyectos reales.
                  Estudiantes ganan experiencia práctica mientras empresas obtienen soluciones de calidad a costos accesibles.
                </p>

                <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Apoyo mutuo comprobado</span>
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
