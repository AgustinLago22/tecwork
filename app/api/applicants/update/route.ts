import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'

export async function PATCH(request: NextRequest) {
  try {
    // Verificar autenticación de admin
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id, status } = await request.json()

    // Validaciones
    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID y estado son requeridos' },
        { status: 400 }
      )
    }

    // Estados válidos para aplicantes
    const validStates = [
      'Aplicacion Recibida',
      'En Revision',
      'Entrevista Pendiente',
      'Aprobado - Disponible',
      'En Proyecto Activo',
      'No Califica',
      'Inactivo Temporal'
    ]

    if (!validStates.includes(status)) {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      )
    }

    // Mapear estado a ID
    const stateMap: { [key: string]: number } = {
      'Aplicacion Recibida': 1,
      'En Revision': 2,
      'Entrevista Pendiente': 3,
      'Aprobado - Disponible': 4,
      'En Proyecto Activo': 5,
      'No Califica': 6,
      'Inactivo Temporal': 7
    }

    // Actualizar aplicante en la base de datos
    const { data, error } = await supabaseAdmin
      .from('aplicantes')
      .update({
        estado_id: stateMap[status],
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating applicant:', error)
      return NextResponse.json(
        { error: 'Error al actualizar el aplicante' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Aplicante actualizado correctamente',
      data: data
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}