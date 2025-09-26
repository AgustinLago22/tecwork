import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('admin-session')?.value === 'true'

  if (!isLoggedIn) {
    redirect('/login')
  }

  return true
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-session')?.value === 'true'
}

export async function setAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set('admin-session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}
