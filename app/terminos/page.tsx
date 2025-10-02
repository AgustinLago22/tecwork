import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, AlertTriangle, Scale, Mail, Phone } from "lucide-react"

export default function TerminosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Términos y Condiciones</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Términos de <span className="text-primary">Servicio</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Estos términos establecen las reglas y condiciones para el uso de los servicios de Tecwork. Al usar nuestros
            servicios, aceptas estos términos.
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
                <FileText className="h-5 w-5 text-primary" />
                Definiciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tecwork</h3>
                <p className="text-muted-foreground">
                  Se refiere a nuestra consultora universitaria de tecnología, incluyendo nuestro sitio web, servicios y
                  plataforma.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Estudiantes</h3>
                <p className="text-muted-foreground">
                  Estudiantes universitarios de carreras relacionadas con tecnología que participan en nuestros
                  programas.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Clientes</h3>
                <p className="text-muted-foreground">
                  Empresas, organizaciones o individuos que solicitan servicios de desarrollo tecnológico a través de
                  Tecwork.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Servicios</h3>
                <p className="text-muted-foreground">
                  Todos los servicios ofrecidos por Tecwork, incluyendo desarrollo web, aplicaciones móviles, software a
                  medida, y programas de formación.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Para Estudiantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Elegibilidad</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Ser estudiante activo de una carrera relacionada con tecnología</li>
                  <li>Tener conocimientos básicos en al menos una tecnología de desarrollo</li>
                  <li>Comprometerse con la disponibilidad horaria declarada</li>
                  <li>Mantener un comportamiento profesional y ético</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Responsabilidades</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Cumplir con los plazos y entregables acordados</li>
                  <li>Participar activamente en reuniones y comunicaciones del proyecto</li>
                  <li>Seguir las mejores prácticas de desarrollo y metodologías establecidas</li>
                  <li>Mantener la confidencialidad de la información del cliente</li>
                  <li>Reportar problemas o impedimentos de manera oportuna</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Beneficios</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Experiencia práctica en proyectos reales</li>
                  <li>Mentoría de profesionales experimentados</li>
                  <li>Certificados de participación y recomendaciones</li>
                  <li>Networking con la industria tecnológica</li>
                  <li>Posibles oportunidades laborales futuras</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Para Clientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Servicios Incluidos</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Análisis de requisitos y planificación del proyecto</li>
                  <li>Desarrollo supervisado por mentores experimentados</li>
                  <li>Pruebas y control de calidad</li>
                  <li>Documentación técnica y de usuario</li>
                  <li>Soporte post-entrega por tiempo limitado</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Responsabilidades del Cliente</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Proporcionar requisitos claros y completos</li>
                  <li>Estar disponible para reuniones y feedback</li>
                  <li>Proporcionar acceso a sistemas y recursos necesarios</li>
                  <li>Realizar pagos según los términos acordados</li>
                  <li>Respetar el proceso de aprendizaje de los estudiantes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Garantías y Limitaciones</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Los proyectos son desarrollados con fines educativos</li>
                  <li>Garantizamos supervisión profesional y control de calidad</li>
                  <li>No garantizamos tiempos de desarrollo específicos</li>
                  <li>Las modificaciones mayores pueden requerir costos adicionales</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Propiedad Intelectual y Confidencialidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Derechos de Autor</h3>
                <p className="text-muted-foreground">
                  El código y los entregables desarrollados pertenecen al cliente una vez completado el pago. Tecwork
                  retiene el derecho de usar el proyecto como caso de estudio (con datos anonimizados).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Confidencialidad</h3>
                <p className="text-muted-foreground">
                  Todos los participantes (estudiantes, mentores, staff) están obligados a mantener la confidencialidad
                  de la información del cliente. Se firman acuerdos de confidencialidad cuando es necesario.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Uso de Marca</h3>
                <p className="text-muted-foreground">
                  Tecwork puede usar el nombre y logo del cliente en materiales de marketing, a menos que se acuerde lo
                  contrario por escrito.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tecwork actúa como facilitador educativo. Nuestra responsabilidad se limita al valor del proyecto
                contratado. No somos responsables por:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Pérdidas de datos o interrupciones del negocio</li>
                <li>Daños indirectos o consecuenciales</li>
                <li>Problemas derivados del uso inadecuado del software entregado</li>
                <li>Incompatibilidades con sistemas no especificados inicialmente</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modificaciones y Terminación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Modificaciones de Términos</h3>
                <p className="text-muted-foreground">
                  Nos reservamos el derecho de modificar estos términos. Los cambios se notificarán con 30 días de
                  anticipación y entrarán en vigor para nuevos proyectos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Terminación</h3>
                <p className="text-muted-foreground">
                  Cualquier parte puede terminar la relación con 15 días de aviso. Los trabajos en progreso se
                  completarán o se facturarán proporcionalmente.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto Legal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Para consultas legales o sobre estos términos, contáctanos:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">legal@tecwork.dev</span>
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
