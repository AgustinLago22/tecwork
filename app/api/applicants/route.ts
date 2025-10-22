import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase/client'
import { isAuthenticated } from '@/lib/auth/simple'
import { Aplicante } from '@/lib/types/database'
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeUrl, sanitizeTextArea, validateNumberInRange } from '@/lib/utils/sanitize'

// Configuración de ruta dinámica para Next.js 15
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

    // Validaciones y sanitización
    let sanitizedEmail: string | null
    let sanitizedPhone: string | null
    let sanitizedGithub: string | null = null
    let sanitizedLinkedin: string | null = null
    let sanitizedPortfolio: string | null = null

    try {
      sanitizedEmail = sanitizeEmail(body.email)
      sanitizedPhone = body.telefono ? sanitizePhone(body.telefono) : null
      if (body.github) sanitizedGithub = sanitizeUrl(body.github)
      if (body.linkedin) sanitizedLinkedin = sanitizeUrl(body.linkedin)
      if (body.portfolioWeb) sanitizedPortfolio = sanitizeUrl(body.portfolioWeb)
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

    // Procesar año cursado con validación
    let añoCursado = 1
    if (body.año && body.año !== 'master' && body.año !== 'doctorado') {
      try {
        añoCursado = validateNumberInRange(body.año, 1, 7)
      } catch {
        añoCursado = 1
      }
    }

    // Sanitizar skills
    let skillsText = null
    if (Array.isArray(body.skills)) {
      skillsText = body.skills
        .map((skill: string) => sanitizeString(skill, 50))
        .filter(Boolean)
        .join(', ')
    } else if (body.skills) {
      skillsText = sanitizeString(body.skills, 500)
    }

    const aplicanteData = {
      nombre: sanitizeString(body.nombre, 100),
      apellido: sanitizeString(body.apellido, 100),
      email: sanitizedEmail,
      telefono: sanitizedPhone,
      año_cursado: añoCursado,
      github_url: sanitizedGithub,
      linkedin_url: sanitizedLinkedin,
      portfolio_url: sanitizedPortfolio,
      cv_url: sanitizeString(body.cvUrl, 500),
      habilidades: skillsText,
      motivacion: sanitizeTextArea(body.motivacion, 2000),
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