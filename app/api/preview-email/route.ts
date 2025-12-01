// TEMPORAL - Solo para preview del template
// Eliminar después de usar

import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'http://localhost:3000' // Forzar localhost para preview

  // Datos de ejemplo
  const data = {
    nombre: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    tipoNecesidad: 'Desarrollo Web',
    timeline: '1-2 meses',
    empresa: 'Mi Empresa SA',
    mensaje: 'Necesito una página web para mi negocio'
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Consulta - Tecwork</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fef8f3;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef8f3;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

              <!-- Header con gradiente y logo -->
              <tr>
                <td style="background: linear-gradient(135deg, #732F17 0%, #D99962 100%); padding: 48px 32px; text-align: center;">
                  <img src="${baseUrl}/logo_tecwork.png" alt="Tecwork" style="max-width: 180px; height: auto;" />
                </td>
              </tr>

              <!-- Contenido principal -->
              <tr>
                <td style="padding: 40px 32px;">

                  <!-- Saludo personalizado -->
                  <p style="font-size: 18px; color: #2c3e50; margin: 0 0 24px 0; line-height: 1.6;">
                    Hola <strong style="color: #732F17;">${data.nombre}</strong>
                  </p>

                  <p style="font-size: 16px; color: #555; margin: 0 0 32px 0; line-height: 1.6;">
                    Hemos recibido tu consulta y estamos emocionados de poder ayudarte a hacer realidad tu proyecto.
                  </p>

                  <!-- Timeline de proceso -->
                  <h3 style="color: #732F17; font-size: 20px; margin: 0 0 24px 0; font-weight: 600;">¿Qué sigue ahora?</h3>

                  <!-- Paso 1 -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 16px 0; background: linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%); border-radius: 8px; border: 2px solid #D99962;">
                    <tr>
                      <td style="width: 60px; padding: 16px 0 16px 16px; vertical-align: top;">
                        <table cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #732F17 0%, #D99962 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                              <span style="color: white; font-weight: bold; font-size: 16px; line-height: 40px;">1</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="padding: 16px 16px 16px 8px; vertical-align: top;">
                        <p style="margin: 0 0 4px 0; color: #732F17; font-weight: 700; font-size: 16px;">Revisión de tu consulta</p>
                        <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">Nuestro equipo analizará tu solicitud en las próximas horas</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Paso 2 -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 16px 0; background: linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%); border-radius: 8px; border: 2px solid #E5A977;">
                    <tr>
                      <td style="width: 60px; padding: 16px 0 16px 16px; vertical-align: top;">
                        <table cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #732F17 0%, #D99962 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                              <span style="color: white; font-weight: bold; font-size: 16px; line-height: 40px;">2</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="padding: 16px 16px 16px 8px; vertical-align: top;">
                        <p style="margin: 0 0 4px 0; color: #732F17; font-weight: 700; font-size: 16px;">Análisis y planificación</p>
                        <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">Evaluaremos tu proyecto y necesidades específicas</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Paso 3 -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 16px 0; background: linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%); border-radius: 8px; border: 2px solid #D99962;">
                    <tr>
                      <td style="width: 60px; padding: 16px 0 16px 16px; vertical-align: top;">
                        <table cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #732F17 0%, #D99962 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                              <span style="color: white; font-weight: bold; font-size: 16px; line-height: 40px;">3</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="padding: 16px 16px 16px 8px; vertical-align: top;">
                        <p style="margin: 0 0 4px 0; color: #732F17; font-weight: 700; font-size: 16px;">Te contactaremos pronto</p>
                        <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">En un plazo máximo de 24 horas recibirás noticias nuestras</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Paso 4 -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0; background: linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%); border-radius: 8px; border: 2px solid #E5A977;">
                    <tr>
                      <td style="width: 60px; padding: 16px 0 16px 16px; vertical-align: top;">
                        <table cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #732F17 0%, #D99962 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                              <span style="color: white; font-weight: bold; font-size: 16px; line-height: 40px;">4</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="padding: 16px 16px 16px 8px; vertical-align: top;">
                        <p style="margin: 0 0 4px 0; color: #732F17; font-weight: 700; font-size: 16px;">Propuesta personalizada</p>
                        <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">Te enviaremos una solución adaptada a tu proyecto</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Nota final -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; margin: 32px 0 0 0;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                          Si tienes alguna pregunta, puedes responder directamente a este email.
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #2c3e50; padding: 32px; text-align: center;">
                  <p style="margin: 0 0 8px 0; color: #D99962; font-size: 16px; font-weight: 600;">Tecwork</p>
                  <p style="margin: 0 0 16px 0; color: #95a5a6; font-size: 13px;">Conectando talento con oportunidades</p>
                  <p style="margin: 0; color: #7f8c8d; font-size: 12px;">
                    Este email fue enviado porque completaste el formulario de contacto en
                    <a href="https://tecwork.ar" style="color: #D99962; text-decoration: none;">tecwork.ar</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' }
  })
}
