import { resend, emailConfig } from './client'

// Tipos para los datos de los emails
export interface DatosEmailLead {
  nombre: string
  email: string
  telefono?: string | null
  empresa?: string | null
  tipoNecesidad: string
  mensaje: string
  timeline?: string
}

export interface DatosEmailAplicante {
  nombre: string
  apellido: string
  email: string
  telefono?: string | null
  universidad: string
  carrera: string
  nivel: string
}

export interface DatosCambioEstado {
  nombre: string
  email: string
  estadoAnterior: string
  estadoNuevo: string
  tipo: 'lead' | 'applicant'
}

/**
 * Enviar notificación al equipo cuando llega un nuevo lead
 */
export async function enviarNotificacionLeadAlEquipo(data: DatosEmailLead) {
  try {
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.teamEmail,
      subject: `🎯 Nuevo Lead: ${data.nombre} - ${data.tipoNecesidad}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #732F17;">🎯 Nuevo Lead Recibido</h2>
          <p>Se ha recibido una nueva consulta a través del formulario de contacto.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #732F17; margin-top: 0;">Información del Lead</h3>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
            ${data.empresa ? `<p><strong>Empresa:</strong> ${data.empresa}</p>` : ''}
            <p><strong>Tipo de Necesidad:</strong> ${data.tipoNecesidad}</p>
            ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #D99962; margin: 20px 0;">
            <h3 style="color: #732F17; margin-top: 0;">Mensaje</h3>
            <p style="white-space: pre-wrap;">${data.mensaje}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Accede al dashboard para gestionar este lead:
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads" style="color: #732F17;">Ver Dashboard</a>
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error enviando email al equipo:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en sendLeadNotificationToTeam:', error)
    return { success: false, error }
  }
}

/**
 * Enviar confirmación al cliente cuando envía el formulario
 */
export async function enviarConfirmacionAlCliente(data: DatosEmailLead) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tecwork.ar'

  try {
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: data.email,
      subject: '✅ Hemos recibido tu consulta - Tecwork',
      html: `
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
      `,
    })

    if (error) {
      console.error('Error enviando confirmación al cliente:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en sendLeadConfirmationToClient:', error)
    return { success: false, error }
  }
}

/**
 * Enviar confirmación al alumno cuando envía su aplicación
 */
export async function enviarConfirmacionAlAplicante(data: DatosEmailAplicante) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tecwork.ar'

  console.log('Intentando enviar confirmación al aplicante:', {
    to: data.email,
    from: emailConfig.from,
    nombre: data.nombre
  })

  try {
    const { error, data: responseData } = await resend.emails.send({
      from: emailConfig.from,
      to: data.email,
      subject: '🎓 Bienvenido a Tecwork - Tu aplicación ha sido recibida',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Tecwork</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fef8f3;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef8f3;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header con gradiente y logo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #732F17 0%, #D99962 100%); padding: 48px 32px; text-align: center;">
                      <img src="${baseUrl}/emails/logo-completo.png" alt="Tecwork" style="max-width: 180px; height: auto; margin-bottom: 24px;" />
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.3;">¡Bienvenido a Tecwork!</h1>
                      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 12px 0 0 0;">Tu aplicación ha sido recibida exitosamente 🎉</p>
                    </td>
                  </tr>

                  <!-- Contenido principal -->
                  <tr>
                    <td style="padding: 40px 32px;">

                      <!-- Saludo personalizado -->
                      <p style="font-size: 18px; color: #2c3e50; margin: 0 0 24px 0; line-height: 1.6;">
                        Hola <strong style="color: #732F17;">${data.nombre} ${data.apellido}</strong> 👋
                      </p>

                      <p style="font-size: 16px; color: #555; margin: 0 0 32px 0; line-height: 1.6;">
                        ¡Gracias por postularte para ser parte de nuestra comunidad de talento tech! Estamos emocionados de conocer tu perfil.
                      </p>

                      <!-- Card de perfil -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef8f3 0%, #fef3e8 100%); border-radius: 12px; margin: 0 0 32px 0; border-left: 4px solid #D99962;">
                        <tr>
                          <td style="padding: 24px;">
                            <h3 style="color: #732F17; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">🎓 Tu perfil</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 8px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td style="width: 40%; color: #666; font-size: 14px; font-weight: 600;">Universidad:</td>
                                      <td style="color: #732F17; font-size: 14px; font-weight: 500;">${data.universidad}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td style="width: 40%; color: #666; font-size: 14px; font-weight: 600;">Carrera:</td>
                                      <td style="color: #732F17; font-size: 14px; font-weight: 500;">${data.carrera}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td style="width: 40%; color: #666; font-size: 14px; font-weight: 600;">Nivel:</td>
                                      <td style="color: #732F17; font-size: 14px; font-weight: 500;">${data.nivel}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Proceso de selección -->
                      <h3 style="color: #732F17; font-size: 20px; margin: 0 0 24px 0; font-weight: 600;">📍 Proceso de selección</h3>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                        <tr>
                          <td style="padding: 16px 0; border-left: 2px solid #D99962; padding-left: 20px; position: relative;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #E8A95B 0%, #D99962 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; left: -17px; box-shadow: 0 2px 8px rgba(232,169,91,0.3);">
                              <span style="color: white; font-weight: bold; font-size: 14px;">1</span>
                            </div>
                            <p style="margin: 0; color: #2c3e50; font-weight: 600; font-size: 15px;">Revisión de perfil</p>
                            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Analizaremos tu experiencia y habilidades técnicas</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0; border-left: 2px solid #D99962; padding-left: 20px; position: relative;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #E8A95B 0%, #D99962 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; left: -17px; box-shadow: 0 2px 8px rgba(232,169,91,0.3);">
                              <span style="color: white; font-weight: bold; font-size: 14px;">2</span>
                            </div>
                            <p style="margin: 0; color: #2c3e50; font-weight: 600; font-size: 15px;">Evaluación técnica</p>
                            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Revisaremos tus proyectos y repositorios</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0; border-left: 2px solid #D99962; padding-left: 20px; position: relative;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #E8A95B 0%, #D99962 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; left: -17px; box-shadow: 0 2px 8px rgba(232,169,91,0.3);">
                              <span style="color: white; font-weight: bold; font-size: 14px;">3</span>
                            </div>
                            <p style="margin: 0; color: #2c3e50; font-weight: 600; font-size: 15px;">Matching con proyectos</p>
                            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Buscaremos oportunidades que se ajusten a tu perfil</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0 0 0; padding-left: 20px; position: relative;">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #E8A95B 0%, #D99962 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; left: -17px; box-shadow: 0 2px 8px rgba(232,169,91,0.3);">
                              <span style="color: white; font-weight: bold; font-size: 14px;">4</span>
                            </div>
                            <p style="margin: 0; color: #2c3e50; font-weight: 600; font-size: 15px;">Te mantendremos informado</p>
                            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Recibirás emails cuando cambie el estado de tu aplicación</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Nota destacada -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%); border-radius: 12px; border-left: 4px solid #D99962; margin: 32px 0 0 0;">
                        <tr>
                          <td style="padding: 24px;">
                            <p style="margin: 0; color: #732F17; font-size: 15px; line-height: 1.7; font-weight: 500;">
                              💡 <strong>Próximos pasos:</strong> Revisaremos tu aplicación en las próximas 48 horas. Te notificaremos por email sobre cualquier actualización en tu proceso de selección.
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
                        Este email fue enviado porque completaste el formulario de postulación en
                        <a href="https://tecwork.ar/sumate" style="color: #D99962; text-decoration: none;">tecwork.ar/sumate</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando confirmación al aplicante:', error)
      console.error('Detalles del error:', JSON.stringify(error, null, 2))
      return { success: false, error }
    }

    console.log('Email enviado exitosamente al aplicante:', responseData)
    return { success: true }
  } catch (error) {
    console.error('Error en sendApplicantConfirmation:', error)
    console.error('Error completo:', JSON.stringify(error, null, 2))
    return { success: false, error }
  }
}

/**
 * Notificar al equipo sobre nuevo aplicante
 */
export async function enviarNotificacionAplicanteAlEquipo(data: DatosEmailAplicante) {
  try {
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.teamEmail,
      subject: `🎓 Nueva Aplicación: ${data.nombre} ${data.apellido} - ${data.universidad}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #732F17;">🎓 Nueva Aplicación Recibida</h2>
          <p>Se ha recibido una nueva postulación a través del formulario "Súmate".</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #732F17; margin-top: 0;">Información del Aplicante</h3>
            <p><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
            <p><strong>Universidad:</strong> ${data.universidad}</p>
            <p><strong>Carrera:</strong> ${data.carrera}</p>
            <p><strong>Nivel de Experiencia:</strong> ${data.nivel}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Accede al dashboard para gestionar esta aplicación:
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/aplicantes" style="color: #732F17;">Ver Dashboard</a>
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error enviando notificación de aplicante al equipo:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en sendApplicantNotificationToTeam:', error)
    return { success: false, error }
  }
}

/**
 * Notificar cambio de estado (tanto para leads como aplicantes)
 */
export async function enviarNotificacionCambioEstado(data: DatosCambioEstado) {
  const esLead = data.tipo === 'lead'
  const tipoTexto = esLead ? 'consulta' : 'aplicación'
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tecwork.ar'

  try {
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: data.email,
      subject: `📢 Actualización sobre tu ${tipoTexto} - Tecwork`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Actualización de Estado - Tecwork</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fef8f3;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef8f3;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header con gradiente y logo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #732F17 0%, #D99962 100%); padding: 48px 32px; text-align: center;">
                      <img src="${baseUrl}/emails/logo-completo.png" alt="Tecwork" style="max-width: 180px; height: auto; margin-bottom: 24px;" />
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.3;">📢 Actualización de Estado</h1>
                      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 12px 0 0 0;">Tenemos novedades sobre tu ${tipoTexto}</p>
                    </td>
                  </tr>

                  <!-- Contenido principal -->
                  <tr>
                    <td style="padding: 40px 32px;">

                      <!-- Saludo personalizado -->
                      <p style="font-size: 18px; color: #2c3e50; margin: 0 0 32px 0; line-height: 1.6;">
                        Hola <strong style="color: #732F17;">${data.nombre}</strong> 👋
                      </p>

                      <!-- Card de cambio de estado -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; margin: 0 0 32px 0; padding: 32px; border: 2px solid #e2e8f0;">
                        <tr>
                          <td style="text-align: center;">

                            <!-- Estado anterior -->
                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Estado Anterior</p>
                            <div style="display: inline-block; background-color: #ffffff; padding: 12px 24px; border-radius: 24px; margin: 0 0 24px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                              <p style="margin: 0; color: #94a3b8; font-size: 16px; font-weight: 600;">${data.estadoAnterior}</p>
                            </div>

                            <!-- Flecha de transición -->
                            <div style="margin: 0 0 24px 0;">
                              <svg width="40" height="40" viewBox="0 0 40 40" style="display: inline-block;">
                                <circle cx="20" cy="20" r="18" fill="#D99962" opacity="0.2"/>
                                <path d="M20 12 L20 28 M14 22 L20 28 L26 22" stroke="#D99962" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>

                            <!-- Nuevo estado -->
                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Nuevo Estado</p>
                            <div style="display: inline-block; background: linear-gradient(135deg, #732F17 0%, #D99962 100%); padding: 16px 32px; border-radius: 24px; box-shadow: 0 4px 16px rgba(115,47,23,0.3);">
                              <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">${data.estadoNuevo}</p>
                            </div>

                          </td>
                        </tr>
                      </table>

                      <!-- Mensaje contextual -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, ${esLead ? '#fff9f0' : '#f0f9ff'} 0%, ${esLead ? '#fff5e6' : '#e0f2fe'} 100%); border-radius: 12px; margin: 0 0 32px 0; border-left: 4px solid ${esLead ? '#D99962' : '#0ea5e9'};">
                        <tr>
                          <td style="padding: 24px;">
                            <p style="margin: 0; color: ${esLead ? '#732F17' : '#0369a1'}; font-size: 15px; line-height: 1.7;">
                              ${esLead
                                ? '💼 <strong>Nuestro equipo está trabajando en tu proyecto.</strong><br/><br/>Estamos analizando los detalles de tu consulta para ofrecerte la mejor solución. Si tienes alguna pregunta o necesitas agregar información adicional, puedes responder directamente a este email.'
                                : '🎓 <strong>Seguiremos en contacto contigo.</strong><br/><br/>Te notificaremos sobre los próximos pasos en el proceso de selección. Mantente atento a tu email para futuras actualizaciones.'}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Info footer -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px;">
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.6;">
                              📬 Recibirás notificaciones automáticas cuando haya nuevas actualizaciones en tu ${tipoTexto}.
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
                        © ${new Date().getFullYear()} Tecwork. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando notificación de cambio de estado:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en sendStatusChangeNotification:', error)
    return { success: false, error }
  }
}
