import { Resend } from 'resend'

// Validar que la API key existe
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY no está configurada en las variables de entorno')
}

// Crear instancia del cliente de Resend
export const resend = new Resend(process.env.RESEND_API_KEY)

// Configuración de emails
export const emailConfig = {
  from: process.env.FROM_EMAIL || 'contacto@tecwork.ar',
  teamEmail: process.env.TEAM_EMAIL || 'contacto@tecwork.ar',
}
