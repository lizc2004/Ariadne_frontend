import { useState, useEffect, useRef } from 'react'
import { iniziaSessione, completaSessione } from '../api/sessioni'
import Slancio from '../components/Slancio'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function Timer() {
  const [materia, setMateria] = useState('')
  const [minuti, setMinuti] = useState(25)
  const [minutiPausa, setMinutiPausa] = useState(5)
  const [secondiRimanenti, setSecondiRimanenti] = useState(25 * 60)
  const [modalita, setModalita] = useState('inattivo') // 'inattivo' | 'studio' | 'pausa'
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
          gestisciFineCountdown()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [inCorso, modalita])

  async function gestisciFineCountdown() {
    if (modalita === 'studio') {
      await completaSessioneCorrente()
      setModalita('pausa')
      setSecondiRimanenti(minutiPausa * 60)
      setInCorso(true)
    } else if (modalita === 'pausa') {
      setModalita('inattivo')
      setInCorso(false)
      setSecondiRimanenti(minuti * 60)
    }
  }

  async function avvia() {
    setErrore('')
    try {
      const sessione = await iniziaSessione(materia)
      setSessioneId(sessione.id)
      setModalita('studio')
      setSecondiRimanenti(minuti * 60)
      setInCorso(true)
    } catch (err) {
      setErrore(err.message)
    }
  }

  function pausaTimer() {
    setInCorso(false)
  }

  async function ferma() {
    setInCorso(false)
    if (modalita === 'studio') {
      await completaSessioneCorrente()
    }
    setModalita('inattivo')
    setSecondiRimanenti(minuti * 60)
  }

  async function completaSessioneCorrente() {
    if (!sessioneId) return
    try {
      await completaSessione(sessioneId)
      setSessioneId(null)
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <>
    <div className="card" style={{ margin: '20px' }}>
      <h1>Timer Pomodoro</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <div className="timer-state">
        {modalita === 'studio' && 'Studio'}
        {modalita === 'pausa' && 'Pausa'}
        {modalita === 'inattivo' && 'Pronta a iniziare'}
      </div>
      <div className="timer-display">{formatTime(secondiRimanenti)}</div>

      {modalita === 'inattivo' && (
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
          <input
            type="number"
            min="5"
            max="15"
            value={minutiPausa}
            onChange={(e) => setMinutiPausa(Number(e.target.value))}
          />
          <button className="btn" onClick={avvia} disabled={!materia}>Avvia</button>
        </div>
      )}

      {modalita !== 'inattivo' && (
        <div className="timer-controls">
          {inCorso ? (
            <button className="btn secondary" onClick={pausaTimer}>Pausa</button>
          ) : (
            <button className="btn" onClick={() => setInCorso(true)}>Riprendi</button>
          )}
          <button className="btn danger" onClick={ferma}>Termina</button>
          </div>
        )}
      </div>
      <Slancio />
    </>
  )
}

export default Timer