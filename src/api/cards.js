import { apiFetch } from './client'

export function updateCard(id, fronte, retro) {
  return apiFetch(`/api/cards/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ fronte, retro }),
  })
}

export function valutaCard(id, valutazione) {
  return apiFetch(`/api/cards/${id}/valuta`, {
    method: 'PATCH',
    body: JSON.stringify({ valutazione }),
  })
}

export function deleteCard(id) {
  return apiFetch(`/api/cards/${id}`, {
    method: 'DELETE',
  })
}