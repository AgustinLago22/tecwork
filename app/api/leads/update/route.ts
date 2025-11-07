import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'
import { enviarNotificacionCambioEstado } from '@/lib/email/sender'

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

     // Obtener el estado anterior del lead para el email
      const { data: leadAnterior, error: errorObtener } = await supabaseAdmin
        .from('leads')
        .select('nombre, email, estado_id')
        .eq('id', id)
        .single()

      if (errorObtener || !leadAnterior) {
        return NextResponse.json(
          { error: 'Lead no encontrado' },
          { status: 404 }
        )
      }

      // Mapear ID a nombre de estado
      const stateIdMap: { [key: number]: string } = {
        1: 'Pendiente',
        2: 'En Espera',
        3: 'Terminado',
        4: 'Cancelado'
      }

      const estadoAnterior = stateIdMap[leadAnterior.estado_id] || 'Desconocido'

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
    
     enviarNotificacionCambioEstado({
        nombre: leadAnterior.nombre,
        email: leadAnterior.email,
        estadoAnterior: estadoAnterior,
        estadoNuevo: status,
        tipo: 'lead'
      }).catch(error => {
        console.error('Error enviando email de notificación:', error)
      })

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