import { useState, useEffect } from 'react'
import {
  richiediCondivisione,
  accettaCondivisione,
  rifiutaCondivisione,
  revocaCondivisione,
  getRicevute,
  getConcesse,
} from '../api/condivisioni'

function Condivisione() {
  const [email, setEmail] = useState('')
  const [ricevute, setRicevute] = useState([])
  const [concesse, setConcesse] = useState([])
  const [errore, setErrore] = useState('')

  useEffect(() => {
    carica()
  }, [])

  async function carica() {
    try {
      setRicevute(await getRicevute())
      setConcesse(await getConcesse())
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await richiediCondivisione(email)
      setEmail('')
      carica()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleAccetta(id) {
    try {
      await accettaCondivisione(id)
      carica()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleRifiuta(id) {
    try {
      await rifiutaCondivisione(id)
      carica()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleRevoca(id) {
    try {
      await revocaCondivisione(id)
      carica()
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <h1>Condivisione</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <h3>Richiedi accesso ai progressi di qualcuno</h3>
      <form onSubmit={handleSubmit} className="row">
        <input
          type="email"
          placeholder="Email della persona"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn">Richiedi</button>
      </form>

      <h3 className="mt-m">Richieste ricevute</h3>
      {ricevute.length === 0 ? (
        <p className="muted">Nessuna richiesta ricevuta.</p>
      ) : (
        <div className="stack">
          {ricevute.map((c) => (
            <div key={c.id} className="deck-item">
              <div className="deck-info">
                <div className="deck-name">{c.emailViewer}</div>
                <div className="deck-stats">{c.stato}</div>
              </div>
              {c.stato === 'RICHIESTO' && (
                <div className="deck-actions">
                  <button className="btn small" onClick={() => handleAccetta(c.id)}>Accetta</button>
                  <button className="btn small danger" onClick={() => handleRifiuta(c.id)}>Rifiuta</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <h3 className="mt-m">Richieste inviate</h3>
      {concesse.length === 0 ? (
        <p className="muted">Non hai richiesto accesso a nessuno.</p>
      ) : (
        <div className="stack">
          {concesse.map((c) => (
            <div key={c.id} className="deck-item">
              <div className="deck-info">
                <div className="deck-name">{c.emailOwner}</div>
                <div className="deck-stats">{c.stato}</div>
              </div>
              {c.stato !== 'REVOCATO' && (
                <div className="deck-actions">
                  <button className="btn small danger" onClick={() => handleRevoca(c.id)}>Revoca</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Condivisione