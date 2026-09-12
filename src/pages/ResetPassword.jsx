import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../api/auth'
import Logo from '../components/Logo'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [nuovaPassword, setNuovaPassword] = useState('')
  const [fatto, setFatto] = useState(false)
  const [errore, setErrore] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await resetPassword(token, nuovaPassword)
      setFatto(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setErrore(err.message)
    }
  }

  if (!token) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <Logo size={64} />
          <h2 className="app-name">Ariadne</h2>
          <div className="login-message error">Link di reset mancante o non valido.</div>
          <p><Link to="/richiedi-reset">Richiedi un nuovo link</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <Logo size={64} />
        <h2 className="app-name">Ariadne</h2>
        <h1>Nuova password</h1>
        {fatto ? (
          <p>Password aggiornata. Ti sto portando al login...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Nuova password"
              value={nuovaPassword}
              onChange={(e) => setNuovaPassword(e.target.value)}
              minLength={8}
              required
            />
            <button type="submit" className="btn">Reimposta password</button>
          </form>
        )}
        {errore && <div className="login-message error">{errore}</div>}
        <p><Link to="/login">Torna al login</Link></p>
      </div>
    </div>
  )
}

export default ResetPassword
