import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Rutas que necesitan autenticación
  const protectedPaths = ['/dashboard', '/admin']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const sessionToken = request.cookies.get('admin_session')?.value

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verificar sesión llamando a la API interna
    try {
      const verifyUrl = new URL('/api/auth/verify', request.url)
      const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `admin_session=${sessionToken}`
        }
      })

      if (!verifyResponse.ok) {
        // Sesión inválida, redirigir a login
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.set('admin_session', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 0,
          path: '/'
        })
        return response
      }

    } catch (error) {
      console.error('Error verifying session in middleware:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
