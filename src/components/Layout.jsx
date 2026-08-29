import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { logout as logoutApi } from '../api/auth'
import { getRefreshToken } from '../api/tokens'
import Logo from './Logo'


function iniziali(email) {
  if (!email) return '?'
  return email.slice(0, 2).toUpperCase()
}

function Layout() {
  const { logout, email } = useAuth()
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
          <Logo size={32} />
          <h1>Ariadne</h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Bentornat*</span>
            <span className="avatar">{iniziali(email)}</span>
            <button className="btn ghost" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="btn ghost" onClick={handleLogout}>Esci</button>
          </div>
        </div>
        <nav className="row">
          <Link to="/">Oggi</Link>
          <Link to="/task">Task</Link>
          <Link to="/flashcard">Flashcard</Link>
          <Link to="/timer">Timer</Link>
          <Link to="/condivisione">Condivisione</Link>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Layout