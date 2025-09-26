import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Rutas que necesitan autenticación
  const protectedPaths = ['/dashboard', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const adminSession = request.cookies.get('admin-session')?.value
    
    if (adminSession !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
