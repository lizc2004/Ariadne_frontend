import { apiFetch } from './client'

export function richiediCondivisione(emailOwner) {
  return apiFetch('/api/condivisioni', {
    method: 'POST',
    body: JSON.stringify({ emailOwner }),
  })
}

export function accettaCondivisione(id) {
  return apiFetch(`/api/condivisioni/${id}/accetta`, { method: 'PATCH' })
}

export function rifiutaCondivisione(id) {
  return apiFetch(`/api/condivisioni/${id}/rifiuta`, { method: 'PATCH' })
}

export function revocaCondivisione(id) {
  return apiFetch(`/api/condivisioni/${id}/revoca`, { method: 'PATCH' })
}

export function getRicevute() {
  return apiFetch('/api/condivisioni/ricevute')
}

export function getConcesse() {
  return apiFetch('/api/condivisioni/concesse')
}