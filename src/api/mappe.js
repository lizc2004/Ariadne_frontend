import { apiFetch } from './client'

export function generaMappa(testo) {
  return apiFetch('/api/mappe/genera', {
    method: 'POST',
    body: JSON.stringify({ testo }),
  })
}
