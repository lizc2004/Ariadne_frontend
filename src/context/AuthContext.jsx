import { createContext, useContext, useState } from 'react'
import { getAccessToken, setTokens, clearTokens } from '../api/tokens'

function getEmailFromToken(token) {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded.sub
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken())
  const [email, setEmail] = useState(() => getEmailFromToken(getAccessToken()))

  function login(accessToken, refreshToken) {
    setTokens(accessToken, refreshToken)
    setIsAuthenticated(true)
    setEmail(getEmailFromToken(accessToken))
  }

  function logout() {
    clearTokens()
    setIsAuthenticated(false)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}