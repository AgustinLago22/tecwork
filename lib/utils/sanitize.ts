/**
 * Utilidades para sanitizar y validar inputs del usuario
 * Protección contra SQL injection, XSS y otros ataques
 */

/**
 * Sanitiza un string removiendo caracteres peligrosos
 */
export function sanitizeString(input: string | null | undefined, maxLength: number = 500): string {
  if (!input) return ''

  return input
    .trim()
    .slice(0, maxLength) // Limitar longitud
    .replace(/[<>]/g, '') // Remover < y > para prevenir XSS básico
}

/**
 * Valida y sanitiza un email
 */
export function sanitizeEmail(email: string | null | undefined): string | null {
  if (!email) return null

  const sanitized = email.trim().toLowerCase().slice(0, 255)

  // Validación de formato email básico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(sanitized)) {
    throw new Error('Formato de email inválido')
  }

  return sanitized
}

/**
 * Valida y sanitiza un teléfono
 */
export function sanitizePhone(phone: string | null | undefined): string | null {
  if (!phone) return null

  // Solo permitir números, espacios, guiones, paréntesis y +
  const sanitized = phone.trim().replace(/[^0-9\s\-\(\)\+]/g, '').slice(0, 30)

  if (sanitized.length < 6) {
    throw new Error('Teléfono inválido')
  }

  return sanitized
}

/**
 * Valida y sanitiza una URL
 */
export function sanitizeUrl(url: string | null | undefined): string | null {
  if (!url) return null

  let sanitized = url.trim().slice(0, 500)

  // Si no tiene protocolo, agregar https://
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    sanitized = 'https://' + sanitized
  }

  // Validación básica de URL
  try {
    new URL(sanitized)
    return sanitized
  } catch {
    throw new Error('URL inválida')
  }
}

/**
 * Valida que el input no contenga patrones de SQL injection
 */
export function validateNoSqlInjection(input: string | null | undefined): boolean {
  if (!input) return true

  // Patrones comunes de SQL injection
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|SCRIPT|JAVASCRIPT)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /('|(\\')|(;)|(--)|(\/\*))/gi,
    /(UNION\s+SELECT|OR\s+1\s*=\s*1|AND\s+1\s*=\s*1)/gi
  ]

  return !sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Sanitiza un input de texto largo (textarea)
 */
export function sanitizeTextArea(input: string | null | undefined, maxLength: number = 2000): string {
  if (!input) return ''

  const sanitized = input
    .trim()
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts

  if (!validateNoSqlInjection(sanitized)) {
    throw new Error('Contenido no permitido detectado')
  }

  return sanitized
}

/**
 * Valida que un número esté en un rango
 */
export function validateNumberInRange(value: string | number, min: number, max: number): number {
  const num = typeof value === 'string' ? parseInt(value) : value

  if (isNaN(num) || num < min || num > max) {
    throw new Error(`El valor debe estar entre ${min} y ${max}`)
  }

  return num
}
