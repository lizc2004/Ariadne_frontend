import { BASE_URL } from './config'

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const errore = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
    throw new Error(errore.message)
  }
  return res.json() // { accessToken, refreshToken }
}

export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const errore = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
    throw new Error(errore.message)
  }
 
}

export async function logout(refreshToken) {
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
}