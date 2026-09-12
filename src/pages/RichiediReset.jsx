import { useState } from 'react'
import { Link } from 'react-router-dom'
import { richiediReset } from '../api/auth'
import Logo from '../components/Logo'

function RichiediReset() {
  const [email, setEmail] = useState('')
  const [inviato, setInviato] = useState(false)
  const [errore, setErrore] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await richiediReset(email)
      setInviato(true)
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <Logo size={64} />
        <h2 className="app-name">Ariadne</h2>
        <h1>Password dimenticata</h1>
        {inviato ? (
          <p>Se l'indirizzo inserito corrisponde a un account, riceverai a breve un'email con le istruzioni per reimpostare la password.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn">Invia link di reset</button>
          </form>
        )}
        {errore && <div className="login-message error">{errore}</div>}
        <p><Link to="/login">Torna al login</Link></p>
      </div>
    </div>
  )
}

export default RichiediReset
