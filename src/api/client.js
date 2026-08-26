import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokens'

import { BASE_URL } from './config'

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
  if (!res.ok) {
    clearTokens()
    throw new Error('Sessione scaduta')
  }
  const data = await res.json()
  setTokens(data.accessToken, refreshToken)
  return data.accessToken
}

export async function apiFetch(endpoint, options = {}) {
  let accessToken = getAccessToken()

  const doFetch = (token) =>
    fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    })

  let res = await doFetch(accessToken)

  if (res.status === 401) {
    accessToken = await refreshAccessToken()
    res = await doFetch(accessToken)
  }

  if (!res.ok) {
    const errore = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
    throw new Error(errore.message)
  }

  if (res.status === 204) return null
  return res.json()
}