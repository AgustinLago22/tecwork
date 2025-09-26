import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth/admin-auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, error: 'No session token' },
        { status: 401 }
      )
    }

    const sessionResult = await verifySession(sessionToken)

    if (!sessionResult.valid) {
      return NextResponse.json(
        { valid: false, error: 'Invalid session' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      valid: true,
      admin: {
        id: sessionResult.admin!.id,
        email: sessionResult.admin!.email,
        nombre: sessionResult.admin!.nombre,
        apellido: sessionResult.admin!.apellido,
        rol: sessionResult.admin!.rol
      }
    })

  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}