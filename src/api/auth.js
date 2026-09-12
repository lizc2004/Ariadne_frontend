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

export async function richiediReset(email) {
  const res = await fetch(`${BASE_URL}/api/auth/richiedi-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) {
    const errore = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
    throw new Error(errore.message)
  }
}

export async function resetPassword(token, nuovaPassword) {
  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, nuovaPassword }),
  })
  if (!res.ok) {
    const errore = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
    throw new Error(errore.message)
  }
}