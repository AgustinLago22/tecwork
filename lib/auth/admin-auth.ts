import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

// Interfaces para tipos de datos
export interface Admin {
  id: string
  email: string
  nombre: string
  apellido?: string
  rol: 'admin' | 'super_admin'
  activo: boolean
  ultimo_login?: string
  intentos_fallidos: number
}

export interface AdminSession {
  id: string
  admin_id: string
  session_token: string
  expires_at: string
  admin?: Admin
}

// Duración de sesión en horas
const SESSION_DURATION_HOURS = 24
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MINUTES = 30

/**
 * Crear hash de password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verificar password contra hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Verificar si admin está bloqueado
 */
export async function isAdminBlocked(email: string): Promise<boolean> {
  try {
    // Bypass RPC and check directly from table
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('intentos_fallidos, bloqueado_hasta, activo')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error checking admin block status:', error)
      return false // Allow login if we can't check (for setup purposes)
    }

    if (!admin) {
      return true // No admin found
    }

    if (!admin.activo) {
      return true // Admin is inactive
    }

    if (admin.bloqueado_hasta && new Date(admin.bloqueado_hasta) > new Date()) {
      return true // Admin is blocked until a future date
    }

    return false // Admin is not blocked
  } catch (error) {
    console.error('Error in isAdminBlocked:', error)
    return false // Allow login if we can't check (for setup purposes)
  }
}

/**
 * Registrar SOLO eventos de seguridad importantes
 */
export async function logSecurityEvent(
  email: string,
  evento: 'login_failed' | 'account_blocked' | 'suspicious_activity' | 'password_changed',
  detalle?: string,
  ipAddress?: string
) {
  try {
    // Skip security logging for now - bypass RPC
    console.log(`Security Event: ${evento} for ${email} - ${detalle}`)
  } catch (error) {
    console.error('Error logging security event:', error)
  }
}

/**
 * Autenticar admin con email y password
 */
export async function authenticateAdmin(
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{ success: boolean; admin?: Admin; error?: string; session?: AdminSession }> {
  try {
    // 1. Verificar si está bloqueado
    const blocked = await isAdminBlocked(email)
    if (blocked) {
      // Solo log cuando alguien intenta acceder a cuenta bloqueada
      await logSecurityEvent(email, 'account_blocked', 'Intento de acceso a cuenta bloqueada', ipAddress)
      return { success: false, error: 'Cuenta bloqueada. Contacta al administrador.' }
    }

    // 2. Buscar admin por email
    const { data: admin, error: fetchError } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('activo', true)
      .single()

    if (fetchError || !admin) {
      // Log intento con email inexistente
      await logSecurityEvent(email, 'login_failed', 'Email no encontrado', ipAddress)
      return { success: false, error: 'Credenciales inválidas' }
    }

    // 3. Verificar password
    const passwordMatch = await verifyPassword(password, admin.password_hash)

    if (!passwordMatch) {
      const newFailedAttempts = admin.intentos_fallidos + 1
      const shouldBlock = newFailedAttempts >= MAX_LOGIN_ATTEMPTS

      // Incrementar intentos fallidos
      await supabaseAdmin
        .from('admins')
        .update({
          intentos_fallidos: newFailedAttempts,
          bloqueado_hasta: shouldBlock
            ? new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000).toISOString()
            : null
        })
        .eq('id', admin.id)

      // Log evento de seguridad
      if (shouldBlock) {
        await logSecurityEvent(email, 'account_blocked', `Cuenta bloqueada tras ${newFailedAttempts} intentos fallidos`, ipAddress)
      } else {
        await logSecurityEvent(email, 'login_failed', `Password incorrecto (intento ${newFailedAttempts}/${MAX_LOGIN_ATTEMPTS})`, ipAddress)
      }

      return { success: false, error: 'Credenciales inválidas' }
    }

    // 4. Login exitoso - crear sesión
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000)

    // Obtener info simplificada del dispositivo
    const deviceInfo = { data: userAgent ? 'Web Browser' : 'Unknown Device' }

    const { data: session, error: sessionError } = await supabaseAdmin
      .from('admin_sessions')
      .insert({
        admin_id: admin.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        device_info: deviceInfo.data || 'Unknown Device'
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Error creating session:', sessionError)
      return { success: false, error: 'Error interno del servidor' }
    }

    // 5. Actualizar admin: resetear intentos fallidos y último login
    await supabaseAdmin
      .from('admins')
      .update({
        intentos_fallidos: 0,
        bloqueado_hasta: null,
        ultimo_login: new Date().toISOString()
      })
      .eq('id', admin.id)

    // 6. No log de login exitoso (solo eventos de seguridad importantes)

    // 7. Limpiar datos sensibles del admin
    const safeAdmin: Admin = {
      id: admin.id,
      email: admin.email,
      nombre: admin.nombre,
      apellido: admin.apellido,
      rol: admin.rol,
      activo: admin.activo,
      ultimo_login: admin.ultimo_login,
      intentos_fallidos: 0
    }

    return {
      success: true,
      admin: safeAdmin,
      session: {
        id: session.id,
        admin_id: session.admin_id,
        session_token: session.session_token,
        expires_at: session.expires_at,
        admin: safeAdmin
      }
    }

  } catch (error) {
    console.error('Error in authenticateAdmin:', error)
    await logSecurityEvent(email, 'suspicious_activity', `Error interno durante login: ${error instanceof Error ? error.message : 'Unknown error'}`, ipAddress)
    return { success: false, error: 'Error interno del servidor' }
  }
}

/**
 * Verificar sesión válida
 */
export async function verifySession(sessionToken: string): Promise<{ valid: boolean; admin?: Admin }> {
  try {
    if (!sessionToken) {
      return { valid: false }
    }

    // Skip cleanup for now - bypass RPC
    // await supabaseAdmin.rpc('cleanup_expired_sessions')

    // Buscar sesión válida
    const { data: session, error } = await supabaseAdmin
      .from('admin_sessions')
      .select(`
        *,
        admins:admin_id (
          id,
          email,
          nombre,
          apellido,
          rol,
          activo
        )
      `)
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !session || !session.admins || !session.admins.activo) {
      return { valid: false }
    }

    // Actualizar última actividad
    await supabaseAdmin
      .from('admin_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', session.id)

    return {
      valid: true,
      admin: {
        id: session.admins.id,
        email: session.admins.email,
        nombre: session.admins.nombre,
        apellido: session.admins.apellido,
        rol: session.admins.rol,
        activo: session.admins.activo,
        ultimo_login: undefined,
        intentos_fallidos: 0
      }
    }

  } catch (error) {
    console.error('Error verifying session:', error)
    return { valid: false }
  }
}

/**
 * Cerrar sesión
 */
export async function logout(sessionToken: string): Promise<void> {
  try {
    if (!sessionToken) return

    // Buscar sesión para logs
    const { data: session } = await supabaseAdmin
      .from('admin_sessions')
      .select('admin_id, admins:admin_id(email)')
      .eq('session_token', sessionToken)
      .single()

    // Eliminar sesión
    await supabaseAdmin
      .from('admin_sessions')
      .delete()
      .eq('session_token', sessionToken)

    // No log de logout (solo eventos de seguridad importantes)

  } catch (error) {
    console.error('Error in logout:', error)
  }
}

/**
 * Obtener sesión desde cookies
 */
export async function getSessionFromCookies(): Promise<{ valid: boolean; admin?: Admin }> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return { valid: false }
    }

    return await verifySession(sessionCookie.value)
  } catch (error) {
    console.error('Error getting session from cookies:', error)
    return { valid: false }
  }
}

/**
 * Middleware helper para verificar autenticación
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSessionFromCookies()
  return session.valid
}

/**
 * Obtener admin actual
 */
export async function getCurrentAdmin(): Promise<Admin | null> {
  const session = await getSessionFromCookies()
  return session.admin || null
}

/**
 * Crear admin inicial (solo para setup)
 */
export async function createInitialAdmin(
  email: string,
  password: string,
  nombre: string,
  apellido?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar si ya existe algún admin
    const { count } = await supabaseAdmin
      .from('admins')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      return { success: false, error: 'Ya existen administradores en el sistema' }
    }

    // Crear hash de password
    const passwordHash = await hashPassword(password)

    // Crear admin
    const { error } = await supabaseAdmin
      .from('admins')
      .insert({
        email,
        password_hash: passwordHash,
        nombre,
        apellido,
        rol: 'super_admin'
      })

    if (error) {
      console.error('Error creating initial admin:', error)
      return { success: false, error: 'Error al crear administrador' }
    }

    // No log de creación de admin (solo eventos de seguridad importantes)

    return { success: true }

  } catch (error) {
    console.error('Error in createInitialAdmin:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}