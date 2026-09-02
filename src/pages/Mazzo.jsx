import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCardsByDeck, createCard, bulkImportCards } from '../api/decks'
import { deleteCard } from '../api/cards'

function Mazzo() {
  const { deckId } = useParams()
  const [cards, setCards] = useState([])
  const [fronte, setFronte] = useState('')
  const [retro, setRetro] = useState('')
  const [testoBulk, setTestoBulk] = useState('')
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaCards()
  }, [deckId])

  async function caricaCards() {
    try {
      const data = await getCardsByDeck(deckId)
      setCards(data)
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await createCard(deckId, fronte, retro)
      setFronte('')
      setRetro('')
      caricaCards()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleBulkImport(e) {
    e.preventDefault()
    setErrore('')
    try {
      await bulkImportCards(deckId, testoBulk)
      setTestoBulk('')
      caricaCards()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCard(id)
      caricaCards()
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <Link to="/flashcard">← Torna ai mazzi</Link>
      <h1>Carte</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <Link to={`/flashcard/${deckId}/studia`} className="btn">Studia</Link>

      <form onSubmit={handleSubmit} className="row mt-m">
        <input
          type="text"
          placeholder="Fronte"
          value={fronte}
          onChange={(e) => setFronte(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Retro"
          value={retro}
          onChange={(e) => setRetro(e.target.value)}
          required
        />
        <button type="submit" className="btn">Aggiungi carta</button>
      </form>

      <form onSubmit={handleBulkImport} className="stack mt-m">
        <textarea
          placeholder="Fronte|Retro, una riga per carta"
          value={testoBulk}
          onChange={(e) => setTestoBulk(e.target.value)}
          rows={4}
        />
        <button type="submit" className="btn secondary">Importa in blocco</button>
      </form>

      <div className="stack mt-m">
        {cards.map((card) => (
          <div key={card.id} className="deck-item">
            <div className="deck-info">
              <div className="deck-name">{card.fronte}</div>
              <div className="deck-stats">{card.retro}</div>
            </div>
            <button className="btn small danger" onClick={() => handleDelete(card.id)}>Elimina</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mazzo