import { NextRequest, NextResponse } from 'next/server'
import { createInitialAdmin } from '@/lib/auth/admin-auth'

// Esta API solo debe ser accesible en desarrollo
// En producción, el admin inicial debe crearse manualmente en la BD

export async function POST(request: NextRequest) {
  try {
    // ENDPOINT COMPLETAMENTE DESHABILITADO POR SEGURIDAD
    return NextResponse.json(
      { success: false, error: 'Endpoint deshabilitado por seguridad' },
      { status: 403 }
    )

    const { email, password, nombre, apellido } = await request.json()

    // Validaciones
    if (!email || !password || !nombre) {
      return NextResponse.json(
        { success: false, error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    // Crear admin inicial
    const result = await createInitialAdmin(
      email.toLowerCase().trim(),
      password,
      nombre.trim(),
      apellido?.trim()
    )

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Administrador inicial creado exitosamente',
      admin: {
        email: email.toLowerCase().trim(),
        nombre: nombre.trim()
      }
    })

  } catch (error) {
    console.error('Setup API error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}