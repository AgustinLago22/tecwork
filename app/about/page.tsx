"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Lightbulb, Shield, Rocket, ArrowRight, GraduationCap, Building, Handshake, Sparkles, TrendingUp, Award, UserCheck, BookOpen, CheckCircle, Package } from "lucide-react"
import Link from "next/link"

export default function NosotrosPage() {
  const valores = [
    {
      icon: GraduationCap,
      title: "Aprendizaje continuo",
      description:
        "Creemos que cada proyecto es una oportunidad de crecimiento tanto para estudiantes como para empresas.",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Calidad garantizada",
      description: "Supervisamos nuestros productos con rigurosas pruebas de testing para comprobar la funcionalidad total.",
      color: "accent",
    },
    {
      icon: Handshake,
      title: "Colaboración genuina",
      description: "Fomentamos relaciones duraderas entre estudiantes y empresas basadas en confianza mutua.",
      color: "primary",
    },
    {
      icon: Lightbulb,
      title: "Innovación práctica",
      description:
        "Aplicamos las últimas tecnologías y metodologías para resolver problemas reales del mundo empresarial.",
      color: "accent",
    },
  ]

  const proceso = [
    {
      step: "1",
      icon: UserCheck,
      title: "Selección rigurosa",
      description:
        "Evaluamos cuidadosamente las habilidades técnicas y actitud de cada estudiante antes de incorporarlo a nuestro equipo.",
      color: "primary",
    },
    {
      step: "2",
      icon: BookOpen,
      title: "Formación especializada",
      description:
        "Proporcionamos capacitación adicional en metodologías ágiles, comunicación con clientes y mejores prácticas.",
      color: "accent",
    },
    {
      step: "3",
      icon: CheckCircle,
      title: "Control de calidad",
      description:
        "Cada proyecto cuenta con la supervisión de desarrolladores que guían y revisan todo el trabajo.",
      color: "primary",
    },
    {
      step: "4",
      icon: Package,
      title: "Entrega profesional",
      description:
        "Garantizamos estándares profesionales en cada entrega, con documentación completa y soporte post-lanzamiento.",
      color: "accent",
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

        /* Card hover premium */
        .premium-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card::before {
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

        .premium-card:hover::before,
        .premium-card:active::before {
          left: 100%;
        }

        .premium-card:hover,
        .premium-card:active {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(115, 47, 23, 0.15);
        }

        /* Premium shadow */
        .premium-shadow {
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(115, 47, 23, 0.08),
            0 16px 32px rgba(115, 47, 23, 0.06);
        }

        /* Stat item hover */
        .stat-item {
          transition: all 0.3s ease;
        }

        .stat-item:hover,
        .stat-item:active {
          transform: translateY(-4px) scale(1.05);
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-up,
          .scale-in,
          .premium-card,
          .stat-item {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-primary/[0.03] to-background">
        {/* Gradient sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]"></div>

        {/* Elementos decorativos creativos */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

        {/* Formas geométricas decorativas */}
        <div className="absolute top-1/4 left-0 w-2 h-20 bg-gradient-to-b from-primary/30 to-transparent transform -rotate-12 hidden md:block"></div>
        <div className="absolute top-1/3 right-0 w-2 h-24 bg-gradient-to-b from-accent/30 to-transparent transform rotate-12 hidden md:block"></div>

        {/* Círculos decorativos */}
        <div className="absolute top-10 right-1/4 w-3 h-3 rounded-full bg-primary/20 hidden lg:block"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-accent/20 hidden lg:block"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 rounded-full border-2 border-primary/20 hidden lg:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-6 md:mb-8 border-primary/20 text-primary bg-primary/5 backdrop-blur text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></div>
                Conoce nuestro propósito
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>
              Somos{" "}
              <span className="gradient-text relative inline-block">
                Tecwork
                {/* Subrayado sketch */}  
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none">
                  <path
                    d="M5 8c30-3 60-3 90 0s60 3 85-2"
                    stroke="#D99962"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
              Una plataforma que fomenta el desarrollo en los negocios locales y la educación práctica de estudiantes de tecnología, creando oportunidades de crecimiento para ambos.
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

      {/* Nuestra Historia - Movida arriba para más protagonismo */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary/[0.08] via-background to-accent/[0.05]">
        {/* Fondo decorativo con patrón */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(115, 47, 23, 0.1) 2%, transparent 0%),
                             radial-gradient(circle at 75px 75px, rgba(217, 153, 98, 0.1) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Elementos decorativos grandes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="fade-in-up">
              <Badge variant="outline" className="mb-4 md:mb-6 border-primary/30 text-primary bg-primary/10 text-sm backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-2" />
                Nuestra historia
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight fade-in-up" style={{ animationDelay: '0.1s' }}>
              De estudiantes, para <br className="hidden sm:block" />
              <span className="gradient-text">estudiantes y negocios</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Card principal con diseño más creativo */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12">
              {/* Lado izquierdo - Icono grande decorativo */}
              <div className="flex items-center justify-center scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  {/* Círculos decorativos de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-110"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full"></div>

                  {/* Icono principal */}
                  <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl flex items-center justify-center shadow-2xl border-4 border-background transition-transform duration-500">
                    <GraduationCap className="h-24 w-24 md:h-32 md:w-32 text-white" />
                  </div>
                </div>
              </div>

              {/* Lado derecho - Contenido */}
              <div className="flex flex-col justify-center scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-4 border-primary/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      <span className="font-bold text-foreground text-xl">Tecwork</span> fue fundada por un grupo de estudiantes universitarios
                      apasionados por la educación y la tecnología, que vieron una oportunidad única: crear un puente real
                      entre el aprendizaje académico y la práctica profesional.
                    </p>
                  </div>

                  <div className="relative pl-6 border-l-4 border-accent/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent"></div>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      Nuestro incentivo es <span className="font-bold text-primary">aportar valor a los estudiantes</span> que
                      se van capacitando, mientras fomentamos la <span className="font-bold text-accent">digitalización de
                      pequeñas y medianas empresas</span> que necesitan soluciones tecnológicas pero no pueden acceder a consultoras
                      tradicionales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Misión y Visión en la historia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="scale-in" style={{ animationDelay: '0.4s' }}>
                <Card className="premium-card border-primary/20 hover:border-primary/40 bg-gradient-to-br from-card to-primary/5 premium-shadow h-full relative overflow-hidden group">
                  {/* Elemento decorativo de fondo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                  <CardContent className="p-6 md:p-8 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                        <Target className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl md:text-2xl text-foreground mb-2">Nuestra Misión</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Aportar valor a estudiantes de tecnología en su proceso de capacitación, mientras fomentamos la
                      digitalización de pequeñas y medianas empresas, creando un ecosistema donde ambos crecen juntos.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="scale-in" style={{ animationDelay: '0.5s' }}>
                <Card className="premium-card border-accent/20 hover:border-accent/40 bg-gradient-to-br from-card to-accent/5 premium-shadow h-full relative overflow-hidden group">
                  {/* Elemento decorativo de fondo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                  <CardContent className="p-6 md:p-8 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                        <Rocket className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl md:text-2xl text-foreground mb-2">Nuestra Visión</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Ser la plataforma líder en Argentina que transforma la educación tecnológica, impulsando la
                      digitalización de negocios locales y desarrollando el profesionalismo de estudiantes a través de
                      proyectos reales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-accent/[0.02] to-primary/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(115,47,23,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,153,98,0.05),transparent_50%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 md:mb-6 border-primary/20 text-primary bg-primary/5 text-sm">
              Nuestros valores
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Los principios que nos <span className="gradient-text">guían</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada decisión y proyecto en Tecwork está fundamentado en estos valores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon
              return (
                <div
                  key={valor.title}
                  className="scale-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <Card className={`premium-card border-${valor.color}/10 hover:border-${valor.color}/30 bg-card premium-shadow h-full`}>
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start space-x-4">
                        <div className={`w-14 h-14 md:w-16 md:h-16 bg-${valor.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-${valor.color}/20 shadow-lg`}>
                          <IconComponent className={`h-7 w-7 md:h-8 md:w-8 text-${valor.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{valor.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{valor.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-primary/[0.02] to-accent/[0.03] relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        {/* Patrón decorativo sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(115, 47, 23, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="fade-in-up">
              <Badge variant="outline" className="mb-4 md:mb-6 border-primary/30 text-primary bg-primary/10 text-sm backdrop-blur-sm">
                <Rocket className="w-3 h-3 mr-2" />
                Nuestro proceso
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight fade-in-up" style={{ animationDelay: '0.1s' }}>
              ¿Cómo <span className="gradient-text">trabajamos?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
              Nuestro proceso garantiza calidad profesional y aprendizaje significativo
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            {/* Línea de conexión vertical en móvil, horizontal en desktop */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary md:hidden"></div>

            {/* Grid de proceso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 relative">
              {proceso.map((item, index) => {
                const IconComponent = item.icon
                const isPrimary = item.color === 'primary'

                return (
                  <div
                    key={item.step}
                    className="scale-in relative"
                    style={{ animationDelay: `${0.15 * index}s` }}
                  >
                    <Card className={`premium-card border-${item.color}/20 hover:border-${item.color}/50 bg-gradient-to-br from-card to-${item.color}/[0.03] premium-shadow h-full relative overflow-hidden group`}>
                      {/* Elemento decorativo de fondo que se expande en hover */}
                      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${item.color}/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

                      <CardContent className="p-6 md:p-10 relative z-10">
                        {/* Badge con número del paso */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${item.color}/10 border border-${item.color}/20 rounded-full mb-6`}>
                          <span className={`w-6 h-6 bg-${item.color} rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                            {item.step}
                          </span>
                          <span className={`text-xs font-semibold text-${item.color}`}>PASO {item.step}</span>
                        </div>

                        {/* Icono y título */}
                        <div className="flex items-start gap-5 mb-5">
                          <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-${item.color} to-${item.color}/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2 border-${item.color}/30`}>
                            <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-${item.color} transition-colors">
                              {item.title}
                            </h3>
                            <div className={`h-1 w-16 bg-gradient-to-r from-${item.color} to-transparent rounded-full`}></div>
                          </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>

                        {/* Indicador visual decorativo */}
                        <div className="mt-6 flex gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${item.color}`}></div>
                          <div className={`w-2 h-2 rounded-full bg-${item.color}/60`}></div>
                          <div className={`w-2 h-2 rounded-full bg-${item.color}/30`}></div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Conector con flecha entre pasos (solo en desktop) */}
                    {index < proceso.length - 1 && index % 2 === 1 && (
                      <div className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <ArrowRight className="w-6 h-6 text-primary/30 rotate-90" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 via-primary/[0.03] to-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 md:mb-6 border-primary/20 text-primary bg-primary/5 text-sm">
              Nuestro crecimiento
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Empezando a <span className="gradient-text">crecer</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">Una startup con grandes ambiciones</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 premium-shadow">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Estudiantes en la red</p>
            </div>
            <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 premium-shadow">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 border border-accent/20">
                <Rocket className="w-6 h-6 md:w-7 md:h-7 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5+</div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Proyectos en desarrollo</p>
            </div>
            <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 premium-shadow">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20">
                <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">UNNE</div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Universidad aliada</p>
            </div>
            <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 premium-shadow">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 border border-accent/20">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2025</div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Año de fundación</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-muted/20 via-primary/[0.03] to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 mb-6 md:mb-8">
                <Rocket className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                ¿Quieres formar parte de <br className="hidden sm:block" />
                <span className="gradient-text">Tecwork?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Ya seas estudiante buscando experiencia real o empresa necesitando soluciones innovadoras
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group premium-shadow h-12 md:h-14 px-8 md:px-10"
              >
                <Link href="/sumate">
                  <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Únete como estudiante
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 h-12 md:h-14 px-8 md:px-10"
              >
                <Link href="/contacto">
                  <Building className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Solicita un proyecto
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6 md:mt-8">
              Sin compromisos. Proceso transparente. Resultados medibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
