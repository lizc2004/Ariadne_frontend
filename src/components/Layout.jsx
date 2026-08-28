import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { logout as logoutApi } from '../api/auth'
import { getRefreshToken } from '../api/tokens'

function Layout() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  async function handleLogout() {
    const refreshToken = getRefreshToken()
    try {
      await logoutApi(refreshToken)
    } catch {
      // ignoriamo l'errore, facciamo comunque logout lato client
    }
    logout()
    navigate('/login')
  }

  return (
    <>
      <header>
        <div className="brand">
          <h1>Ariadne</h1>
        </div>
        <nav className="row">
          <Link to="/">Oggi</Link>
          <Link to="/task">Task</Link>
          <Link to="/flashcard">Flashcard</Link>
          <Link to="/timer">Timer</Link>
        </nav>
        <button className="btn ghost" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="btn ghost" onClick={handleLogout}>Esci</button>
      </header>
      <Outlet />
    </>
  )
}

export default Layout