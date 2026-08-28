import { apiFetch } from './client'

export function iniziaSessione(materia) {
  return apiFetch('/api/sessioni', {
    method: 'POST',
    body: JSON.stringify({ materia }),
  })
}

export function completaSessione(id) {
  return apiFetch(`/api/sessioni/${id}/completa`, {
    method: 'PATCH',
  })
}