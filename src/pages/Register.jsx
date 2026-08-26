import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { login } from '../api/auth'


function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const navigate = useNavigate()
  const { login: loginContext } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
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
    <form onSubmit={handleSubmit}>
      <h1>Registrazione</h1>
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
      <button type="submit">Registrati</button>
      <p>Hai già un account? <Link to="/login">Accedi</Link></p>
    </form>
  )
}

export default Register