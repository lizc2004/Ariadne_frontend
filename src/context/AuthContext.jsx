import { createContext, useContext, useState } from 'react'
import { getAccessToken, setTokens, clearTokens } from '../api/tokens'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken())

  function login(accessToken, refreshToken) {
    setTokens(accessToken, refreshToken)
    setIsAuthenticated(true)
  }

  function logout() {
    clearTokens()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}