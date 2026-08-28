import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCardsByDeck } from '../api/decks'
import { valutaCard } from '../api/cards'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function Studia() {
  const { deckId } = useParams()
  const [cards, setCards] = useState([])
  const [girata, setGirata] = useState(false)
  const [errore, setErrore] = useState('')
  const [caricamento, setCaricamento] = useState(true)

  useEffect(() => {
    caricaCards()
  }, [deckId])

  async function caricaCards() {
    try {
      const data = await getCardsByDeck(deckId)
      const oggi = todayISO()
      const daStudiare = data.filter((c) => c.prossimaRevisione <= oggi)
      setCards(daStudiare)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricamento(false)
    }
  }

  async function handleValuta(valutazione) {
    const carta = cards[0]
    try {
      await valutaCard(carta.id, valutazione)
      setCards(cards.slice(1))
      setGirata(false)
    } catch (err) {
      setErrore(err.message)
    }
  }

  if (caricamento) return <div className="card" style={{ margin: '20px' }}>Caricamento...</div>

  return (
    <div className="card" style={{ margin: '20px' }}>
      <Link to={`/flashcard/${deckId}`}>← Torna al mazzo</Link>
      <h1>Studia</h1>
      {errore && <div className="login-message error">{errore}</div>}

      {cards.length === 0 ? (
        <p>Nessuna carta da ripassare oggi.</p>
      ) : (
        <div className="flashcard-study">
          <div className={`flashcard ${girata ? 'flipped' : ''}`} onClick={() => setGirata(!girata)}>
            <div className="flashcard-face">
              <div className="flashcard-label">Fronte</div>
              {cards[0].fronte}
            </div>
            <div className="flashcard-face back">
              <div className="flashcard-label">Retro</div>
              {cards[0].retro}
            </div>
          </div>

          {girata && (
            <div className="rating">
              <button className="r-again" onClick={() => handleValuta('NON_RICORDO')}>Non ricordo</button>
              <button className="r-hard" onClick={() => handleValuta('DIFFICILE')}>Difficile</button>
              <button className="r-good" onClick={() => handleValuta('GIUSTO')}>Giusto</button>
              <button className="r-easy" onClick={() => handleValuta('FACILE')}>Facile</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Studia