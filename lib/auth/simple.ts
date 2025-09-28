import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySession } from './admin-auth'

export async function checkAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/login')
  }
  return true
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return false
    }

    const sessionResult = await verifySession(sessionToken)
    return sessionResult.valid
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return null
    }

    const sessionResult = await verifySession(sessionToken)
    return sessionResult.valid ? sessionResult.admin : null
  } catch (error) {
    console.error('Error getting current admin:', error)
    return null
  }
}
