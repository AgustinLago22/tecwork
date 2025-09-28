import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'
import { Aplicante } from '@/lib/types/database'

export async function GET() {
  try {
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Usar tabla principal de aplicantes
    const { data: applicants, error } = await supabaseAdmin
      .from('aplicantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching applicants:', error)
      return NextResponse.json(
        { error: 'Error al obtener aplicantes' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applicants })
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

    // Validaciones básicas
    if (!body.nombre || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Nombre y email son obligatorios' },
        { status: 400 }
      )
    }

    // Mapear universidad usando IDs directos
    const universityMap: { [key: string]: number } = {
      'unne': 1,
      'uba': 2,
      'utn': 3,
      'unc': 4,
      'unlp': 4,
      'uca': 5,
      'udesa': 5,
      'itba': 5
    }

    // Mapear carrera usando IDs directos
    const carreraMap: { [key: string]: number } = {
      'sistemas': 1,
      'informatica': 4,
      'licenciatura-sistemas': 1,
      'ingenieria-software': 7,
      'tecnicatura-programacion': 5,
      'analista-sistemas': 6,
      'ingenieria-computacion': 2,
      'licenciatura-informatica': 3,
      'data-science': 1,
      'ciberseguridad': 2,
      'ux-ui': 1
    }

    // Mapear nivel de experiencia
    const nivelMap: { [key: string]: number } = {
      'junior': 1,
      'semi-senior': 2,
      'senior': 3,
      'lead': 3
    }

    // Procesar año cursado
    let añoCursado = null
    if (body.año && body.año !== 'master' && body.año !== 'doctorado') {
      añoCursado = parseInt(body.año)
      if (añoCursado < 1 || añoCursado > 7) {
        añoCursado = 1
      }
    }

    const aplicanteData = {
      nombre: body.nombre.trim(),
      apellido: body.apellido?.trim() || '',
      email: body.email.trim(),
      telefono: body.telefono?.trim() || null,
      año_cursado: añoCursado || 1,
      github_url: body.github?.trim() || null,
      linkedin_url: body.linkedin?.trim() || null,
      portfolio_url: body.portfolioWeb?.trim() || null,
      cv_url: body.cvUrl?.trim() || null,
      habilidades: Array.isArray(body.skills) ? body.skills.join(', ') : (body.skills || null),
      motivacion: body.motivacion?.trim() || null,
      universidad_id: universityMap[body.universidad] || 1,
      carrera_id: carreraMap[body.carrera] || 1,
      nivel_experiencia_id: nivelMap[body.nivel] || 1,
      estado_id: 1, // Aplicacion Recibida
      consentimiento: true
    }

    const { data: aplicante, error } = await supabase
      .from('aplicantes')
      .insert([aplicanteData])
      .select()
      .single()

    if (error) {
      console.error('Error creating aplicante:', error)
      return NextResponse.json(
        { success: false, error: 'Error al procesar la postulación' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Aplicación enviada exitosamente',
      data: aplicante
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}