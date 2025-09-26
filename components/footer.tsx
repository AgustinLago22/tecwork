import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-mono font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">Tecwork</span>
            </div>
            <p className="text-sm text-muted-foreground">Experiencia real para estudiantes de tecnología</p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navegación</h3>
            <div className="space-y-2">
              <Link href="/servicios" className="block text-sm text-muted-foreground hover:text-foreground">
                Servicios
              </Link>
              <Link href="/casos" className="block text-sm text-muted-foreground hover:text-foreground">
                Casos
              </Link>
              <Link href="/nosotros" className="block text-sm text-muted-foreground hover:text-foreground">
                Nosotros
              </Link>
            </div>
          </div>

          {/* Participa */}
          <div className="space-y-4">
            <h3 className="font-semibold">Participa</h3>
            <div className="space-y-2">
              <Link href="/sumate" className="block text-sm text-muted-foreground hover:text-foreground">
                Súmate como estudiante
              </Link>
              <Link href="/contacto" className="block text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacidad" className="block text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </Link>
              <Link href="/terminos" className="block text-sm text-muted-foreground hover:text-foreground">
                Términos
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Tecwork. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
