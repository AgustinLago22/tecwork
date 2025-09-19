import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tecwork - Experiencia real para estudiantes de tecnología",
  description:
    "Conectamos estudiantes con proyectos reales. Desarrolla habilidades, construye tu portafolio y prepárate para el mundo laboral con nuestra consultora universitaria.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Navigation />
        <main className="min-h-screen">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
