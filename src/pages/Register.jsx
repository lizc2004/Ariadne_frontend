
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register, login } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const [bounce, setBounce] = useState(false)
  const navigate = useNavigate()
  const { login: loginContext } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    setBounce(true)
    try {
      await register(email, password)
      const data = await login(email, password)
      loginContext(data.accessToken, data.refreshToken)
      navigate('/')
    } catch (err) {
      setErrore(err.message)
    }
  } 

  return (
    <div className="login-screen">
      <div className="login-card">
        <Logo bounce={bounce} onAnimationEnd={() => setBounce(false)} />
        <h2 className="app-name">Ariadne</h2>
        <h1>Registrati</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Registrati</button>
        </form>
        {errore && <div className="login-message error">{errore}</div>}
        <p> Hai un account? <Link to="/login">Accedi</Link></p>
      </div>
    </div>
  )
}

export default Register