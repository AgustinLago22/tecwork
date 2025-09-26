import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { logout } from '@/lib/auth/admin-auth'

export async function POST() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('admin_session')

    // Cerrar sesión en la base de datos
    if (sessionCookie) {
      await logout(sessionCookie.value)
    }

    // Eliminar cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    })

    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expira inmediatamente
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}