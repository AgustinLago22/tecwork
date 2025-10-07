import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'
import { Lead } from '@/lib/types/database'
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeTextArea } from '@/lib/utils/sanitize'

export async function GET() {
  try {
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Usar tabla principal de leads
    const { data: leads, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json(
        { error: 'Error al obtener leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validaciones y sanitización
    let sanitizedEmail: string | null
    let sanitizedPhone: string | null

    try {
      sanitizedEmail = sanitizeEmail(body.email)
      sanitizedPhone = body.telefono ? sanitizePhone(body.telefono) : null
    } catch (error: unknown) {
      return NextResponse.json(
        { success: false, error: error instanceof Error ? error.message : 'Datos inválidos' },
        { status: 400 }
      )
    }

    if (!body.nombre || !sanitizedEmail) {
      return NextResponse.json(
        { success: false, error: 'Nombre y email son obligatorios' },
        { status: 400 }
      )
    }

    // Mapear urgencia string a ID usando tu tabla
    let urgencia_id = 1 // Default: Baja
    if (body.urgencia) {
      const urgenciaMap: { [key: string]: number } = {
        'urgente': 4,
        'alta': 3,
        'media': 2,
        'baja': 1,
        'flexible': 1
      }
      urgencia_id = urgenciaMap[body.urgencia] || 1
    }

    // Mapear tipo de proyecto
    let tipo_proyecto_id = 4 // Default: Desarrollo Web
    if (body.tipoNecesidad) {
      const tipoMap: { [key: string]: number } = {
        'web-basica': 4, // Desarrollo Web
        'dashboard': 6, // Data Analysis
        'automatizacion': 2, // Backend
        'base-datos': 2, // Backend
        'app-movil': 5, // App Mobile
        'consultoria': 3 // FullStack
      }
      tipo_proyecto_id = tipoMap[body.tipoNecesidad] || 4
    }

    const leadData = {
      nombre: sanitizeString(body.nombre, 100),
      email: sanitizedEmail,
      telefono: sanitizedPhone,
      empresa: sanitizeString(body.empresa, 200),
      necesidad: sanitizeTextArea(body.necesidad, 1000) || 'Consulta general',
      mensaje: sanitizeTextArea(body.mensaje, 2000),
      fuente: sanitizeString(body.comoConociste, 100),
      urgencia_id: urgencia_id,
      estado_id: 1, // Pendiente
      tipo_proyecto_id: tipo_proyecto_id,
      consentimiento: true
    }

    // Usar supabase con validaciones de seguridad en el código
    const { data: lead, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { success: false, error: 'Error al procesar la consulta' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead creado exitosamente',
      data: lead
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}