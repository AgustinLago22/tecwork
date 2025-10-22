import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'

// Configuración de ruta dinámica para Next.js 15
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

    // Estados válidos para leads
    const validStates = ['Pendiente', 'En Espera', 'Terminado', 'Cancelado']
    if (!validStates.includes(status)) {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      )
    }

    // Mapear estado a ID
    const stateMap: { [key: string]: number } = {
      'Pendiente': 1,
      'En Espera': 2,
      'Terminado': 3,
      'Cancelado': 4
    }

    // Actualizar lead en la base de datos
    const { data, error } = await supabaseAdmin
      .from('leads')
      .update({
        estado_id: stateMap[status],
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating lead:', error)
      return NextResponse.json(
        { error: 'Error al actualizar el lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead actualizado correctamente',
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