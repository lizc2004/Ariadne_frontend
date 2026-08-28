import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTasks } from '../api/tasks'
import { getDecks, getCardsByDeck } from '../api/decks'
import Slancio from '../components/Slancio'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function Dashboard() {
  const [taskInScadenza, setTaskInScadenza] = useState([])
  const [carteDaRipassare, setCarteDaRipassare] = useState(0)
  const [errore, setErrore] = useState('')

  useEffect(() => {
    carica()
  }, [])

  async function carica() {
    try {
      const oggi = todayISO()

      const tasks = await getTasks()
      const inScadenza = tasks
        .filter((t) => !t.completato && t.scadenza <= oggi)
        .sort((a, b) => a.scadenza.localeCompare(b.scadenza))
      setTaskInScadenza(inScadenza)

      const decks = await getDecks()
      let totaleCarte = 0
      for (const deck of decks) {
        const carte = await getCardsByDeck(deck.id)
        totaleCarte += carte.filter((c) => c.prossimaRevisione <= oggi).length
      }
      setCarteDaRipassare(totaleCarte)
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Oggi</h1>
      <Slancio />

      <div className="card" style={{ margin: '20px' }}>
        <h3>Task in scadenza</h3>
        {taskInScadenza.length === 0 ? (
          <p className="muted">Nessuna task in scadenza. 🎉</p>
        ) : (
          <div className="stack">
            {taskInScadenza.map((t) => (
              <div key={t.id} className="task">
                <div className="task-body">
                  <div className="task-title">{t.titolo}</div>
                  <div className="task-meta">{t.materia} · {t.scadenza}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link to="/task" className="btn small mt-m">Vai alle task</Link>
      </div>

      <div className="card" style={{ margin: '20px' }}>
        <h3>Carte da ripassare</h3>
        {carteDaRipassare === 0 ? (
          <p className="muted">Nessuna carta da ripassare oggi. 🎉</p>
        ) : (
          <p>{carteDaRipassare} {carteDaRipassare === 1 ? 'carta' : 'carte'} pronte per il ripasso.</p>
        )}
        <Link to="/flashcard" className="btn small mt-m">Vai ai mazzi</Link>
      </div>
    </div>
  )
}

export default Dashboard