import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

/**
 * Sube un archivo CV a Supabase Storage
 * @param file - Archivo PDF del CV
 * @param applicantEmail - Email del aplicante para generar nombre único
 * @returns URL del archivo subido o null si falla
 */
export async function uploadCV(file: File, applicantEmail: string): Promise<string | null> {
  try {
    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const cleanEmail = applicantEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const fileExtension = file.name.split('.').pop()
    const fileName = `${cleanEmail}_${timestamp}.${fileExtension}`

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from('cvs')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false // No sobrescribir archivos existentes
      })

    if (error) {
      console.error('Error uploading CV:', error)
      return null
    }

    // Generar URL pública (firmada para acceso temporal)
    const { data: urlData } = await supabase.storage
      .from('cvs')
      .createSignedUrl(data.path, 60 * 60 * 24 * 365) // 1 año de validez

    return urlData?.signedUrl || null
  } catch (error) {
    console.error('Error in uploadCV:', error)
    return null
  }
}

/**
 * Obtiene URL firmada para acceder a un CV
 * @param cvPath - Path del archivo en storage
 * @returns URL firmada para acceso temporal
 */
export async function getCVUrl(cvPath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from('cvs')
      .createSignedUrl(cvPath, 60 * 60) // 1 hora de validez

    if (error) {
      console.error('Error getting CV URL:', error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error('Error in getCVUrl:', error)
    return null
  }
}

/**
 * Elimina un CV del storage
 * @param cvPath - Path del archivo a eliminar
 * @returns true si se eliminó correctamente
 */
export async function deleteCV(cvPath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('cvs')
      .remove([cvPath])

    if (error) {
      console.error('Error deleting CV:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteCV:', error)
    return false
  }
}