import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Cliente Supabase con service role para operaciones admin
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('cv') as File
    const applicantEmail = formData.get('email') as string

    // Validaciones
    if (!file || !applicantEmail) {
      return NextResponse.json(
        { error: 'CV y email son requeridos' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Solo se permiten archivos PDF' },
        { status: 400 }
      )
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El archivo es muy grande (máximo 5MB)' },
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const cleanEmail = applicantEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const fileName = `${cleanEmail}_${timestamp}.pdf`

    // Convertir File a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    // Subir archivo a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(fileName, fileBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading to Supabase Storage:', uploadError)
      return NextResponse.json(
        { error: 'Error al subir el archivo' },
        { status: 500 }
      )
    }

    // Generar URL firmada para acceso
    const { data: urlData, error: urlError } = await supabase.storage
      .from('cvs')
      .createSignedUrl(uploadData.path, 60 * 60 * 24 * 365) // 1 año de validez

    if (urlError) {
      console.error('Error creating signed URL:', urlError)
      return NextResponse.json(
        { error: 'Error al generar URL de acceso' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        fileName: uploadData.path,
        fileUrl: urlData.signedUrl,
        originalName: file.name,
        size: file.size
      }
    })

  } catch (error) {
    console.error('Error in upload-cv API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}