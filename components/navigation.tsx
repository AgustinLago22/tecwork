"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/about", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-primary/10'
          : 'bg-background/80 backdrop-blur-md border-b-2 border-dashed border-border'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
          >
            <div className={`hidden md:flex bg-gradient-to-br from-primary to-primary/80 rounded-full items-center justify-center shadow-md transition-all duration-300 ${
              isScrolled ? 'w-9 h-9' : 'w-10 h-10'
            }`}>
              <span className={`text-primary-foreground font-bold transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>T</span>
            </div>
            <span className={`font-bold text-primary transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-3xl'
            }`}>Tecwork</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            <div className="flex items-center">
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
              >
                <Link href="/sumate">Súmate</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-all duration-300 group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <Menu className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              </span>
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
              }`}>
                <X className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              </span>
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-primary/10">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                    pathname === item.href
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 px-4">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md"
                >
                  <Link href="/sumate" onClick={() => setIsOpen(false)}>
                    Súmate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </header>
  )
}
