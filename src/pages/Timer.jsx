import { useState, useEffect, useRef } from 'react'
import { iniziaSessione, completaSessione } from '../api/sessioni'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function Timer() {
  const [materia, setMateria] = useState('')
  const [minuti, setMinuti] = useState(25)
  const [secondiRimanenti, setSecondiRimanenti] = useState(25 * 60)
  const [inCorso, setInCorso] = useState(false)
  const [sessioneId, setSessioneId] = useState(null)
  const [errore, setErrore] = useState('')
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!inCorso) return
    intervalRef.current = setInterval(() => {
      setSecondiRimanenti((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          completaSessioneCorrente()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [inCorso])

  async function avvia() {
    setErrore('')
    try {
      const sessione = await iniziaSessione(materia)
      setSessioneId(sessione.id)
      setSecondiRimanenti(minuti * 60)
      setInCorso(true)
    } catch (err) {
      setErrore(err.message)
    }
  }

  function pausa() {
    setInCorso(false)
  }

  async function ferma() {
    setInCorso(false)
    await completaSessioneCorrente()
    setSecondiRimanenti(minuti * 60)
  }

  async function completaSessioneCorrente() {
    if (!sessioneId) return
    try {
      await completaSessione(sessioneId)
      setSessioneId(null)
      setInCorso(false)
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <h1>Timer Pomodoro</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <div className="timer-display">{formatTime(secondiRimanenti)}</div>

      {!inCorso && !sessioneId && (
        <div className="row">
          <input
            type="text"
            placeholder="Materia"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          />
          <input
            type="number"
            min="1"
            value={minuti}
            onChange={(e) => setMinuti(Number(e.target.value))}
          />
          <button className="btn" onClick={avvia} disabled={!materia}>Avvia</button>
        </div>
      )}

      {sessioneId && (
        <div className="timer-controls">
          {inCorso ? (
            <button className="btn secondary" onClick={pausa}>Pausa</button>
          ) : (
            <button className="btn" onClick={() => setInCorso(true)}>Riprendi</button>
          )}
          <button className="btn danger" onClick={ferma}>Termina</button>
        </div>
      )}
    </div>
  )
}

export default Timer