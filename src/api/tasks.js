import { apiFetch } from './client'

export function getTasks() {
  return apiFetch('/api/tasks')
}

export function createTask(task) {
  return apiFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateTask(id, task) {
  return apiFetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  })
}

export function toggleTask(id) {
  return apiFetch(`/api/tasks/${id}/completa`, {
    method: 'PATCH',
  })
}

export function deleteTask(id) {
  return apiFetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  })
}