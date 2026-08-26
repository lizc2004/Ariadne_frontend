import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const navigate = useNavigate()
  const { login: loginContext } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      const data = await login(email, password)
      loginContext(data.accessToken, data.refreshToken)
      navigate('/')
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {errore && <p>{errore}</p>}
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
      <button type="submit">Accedi</button>
      <p>Non hai un account? <Link to="/register">Registrati</Link></p>
    </form>
  )
}

export default Login