import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Política de Privacidad</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Tu privacidad es <span className="text-primary">nuestra prioridad</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            En Tecwork nos comprometemos a proteger y respetar tu privacidad. Esta política explica cómo recopilamos,
            usamos y protegemos tu información.
          </p>
          <p className="text-sm text-muted-foreground">Última actualización: Diciembre 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Información que Recopilamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Información Personal</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nombre completo y información de contacto</li>
                  <li>Email universitario y teléfono</li>
                  <li>Información académica (universidad, carrera, semestre)</li>
                  <li>Habilidades técnicas y experiencia profesional</li>
                  <li>CV y documentos de portafolio (cuando los proporciones)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Información de Proyectos</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Detalles de solicitudes de proyectos</li>
                  <li>Comunicaciones relacionadas con proyectos</li>
                  <li>Feedback y evaluaciones de desempeño</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Información Técnica</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Dirección IP y datos de navegación</li>
                  <li>Cookies y tecnologías similares</li>
                  <li>Información del dispositivo y navegador</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Cómo Usamos tu Información
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Servicios Principales</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Evaluar y procesar aplicaciones de estudiantes</li>
                  <li>Asignar estudiantes a proyectos apropiados</li>
                  <li>Facilitar comunicación entre estudiantes, mentores y clientes</li>
                  <li>Proporcionar mentoría y seguimiento de progreso</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Mejora de Servicios</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Analizar el rendimiento de nuestros programas</li>
                  <li>Desarrollar nuevos servicios y características</li>
                  <li>Personalizar la experiencia del usuario</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Comunicación</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Enviar actualizaciones sobre proyectos</li>
                  <li>Notificar sobre nuevas oportunidades</li>
                  <li>Proporcionar soporte técnico y administrativo</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Protección de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Medidas de Seguridad</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Acceso restringido basado en roles</li>
                  <li>Monitoreo continuo de seguridad</li>
                  <li>Copias de seguridad regulares y seguras</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Retención de Datos</h3>
                <p className="text-muted-foreground">
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos
                  descritos en esta política, generalmente:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                  <li>Datos de aplicación: 2 años después de la última actividad</li>
                  <li>Datos de proyectos: Durante la duración del proyecto + 1 año</li>
                  <li>Comunicaciones: 1 año después del último contacto</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Limitar el procesamiento de tu información</li>
                <li>Portabilidad de datos</li>
                <li>Oponerte al procesamiento en ciertas circunstancias</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para ejercer estos derechos, contáctanos en{" "}
                <a href="mailto:privacidad@tecwork.dev" className="text-primary hover:underline">
                  privacidad@tecwork.dev
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Si tienes preguntas sobre esta política de privacidad o nuestras prácticas de datos, puedes
                contactarnos:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">privacidad@tecwork.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
