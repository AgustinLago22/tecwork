import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/auth/admin-auth'
import { cookies } from 'next/headers'

// Helper para obtener IP real del cliente
function getClientIP(request: NextRequest): string {
  // Verificar headers de proxy (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfIP = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP.trim()
  }

  if (cfIP) {
    return cfIP.trim()
  }

  // Fallback a IP del socket (desarrollo local)
  return request.ip || '127.0.0.1'
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Obtener información del request
    const ipAddress = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    // Autenticar admin
    const authResult = await authenticateAdmin(
      email.toLowerCase().trim(),
      password,
      ipAddress,
      userAgent
    )

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      )
    }

    // Crear cookie de sesión
    const cookieStore = cookies()

    const response = NextResponse.json({
      success: true,
      message: 'Login exitoso',
      admin: {
        id: authResult.admin!.id,
        email: authResult.admin!.email,
        nombre: authResult.admin!.nombre,
        apellido: authResult.admin!.apellido,
        rol: authResult.admin!.rol
      }
    })

    // Configurar cookie segura
    response.cookies.set('admin_session', authResult.session!.session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 horas en segundos
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}