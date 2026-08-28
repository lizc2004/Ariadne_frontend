import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDecks, createDeck, deleteDeck } from '../api/decks'

function Flashcard() {
  const [decks, setDecks] = useState([])
  const [nome, setNome] = useState('')
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaDecks()
  }, [])

  async function caricaDecks() {
    try {
      const data = await getDecks()
      setDecks(data)
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await createDeck(nome)
      setNome('')
      caricaDecks()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDeck(id)
      caricaDecks()
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <h1>Flashcard</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <form onSubmit={handleSubmit} className="row">
        <input
          type="text"
          placeholder="Nome mazzo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit" className="btn">Crea mazzo</button>
      </form>

      <div className="stack">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-item">
            <div className="deck-info">
              <Link to={`/flashcard/${deck.id}`} className="deck-name">{deck.nome}</Link>
            </div>
            <div className="deck-actions">
              <button className="btn small danger" onClick={() => handleDelete(deck.id)}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Flashcard