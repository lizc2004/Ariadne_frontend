import { apiFetch } from './client'

export function getDecks() {
  return apiFetch('/api/decks')
}

export function createDeck(nome) {
  return apiFetch('/api/decks', {
    method: 'POST',
    body: JSON.stringify({ nome }),
  })
}

export function updateDeck(id, nome) {
  return apiFetch(`/api/decks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ nome }),
  })
}

export function deleteDeck(id) {
  return apiFetch(`/api/decks/${id}`, {
    method: 'DELETE',
  })
}

export function getCardsByDeck(deckId) {
  return apiFetch(`/api/decks/${deckId}/cards`)
}

export function createCard(deckId, fronte, retro) {
  return apiFetch(`/api/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({ fronte, retro }),
  })
}

export function bulkImportCards(deckId, testo) {
  return apiFetch(`/api/decks/${deckId}/cards/bulk`, {
    method: 'POST',
    body: JSON.stringify({ testo }),
  })
}