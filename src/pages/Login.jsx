import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

function Login() {
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
        <h1>Login</h1>
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
          <button type="submit" className="btn">Accedi</button>
        </form>
        {errore && <div className="login-message error">{errore}</div>}
        <p>Non hai un account? <Link to="/register">Registrati</Link></p>
      </div>
    </div>
  )
}

export default Login