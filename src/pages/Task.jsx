import { useState, useEffect } from 'react'
import { getTasks, createTask, toggleTask, deleteTask } from '../api/tasks'

function Task() {
  const [tasks, setTasks] = useState([])
  const [titolo, setTitolo] = useState('')
  const [materia, setMateria] = useState('')
  const [scadenza, setScadenza] = useState('')
  const [priorita, setPriorita] = useState('MEDIA')
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaTasks()
  }, [])

  async function caricaTasks() {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    try {
      await createTask({ titolo, materia, scadenza, priorita })
      setTitolo('')
      setMateria('')
      setScadenza('')
      setPriorita('MEDIA')
      caricaTasks()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleToggle(id) {
    try {
      await toggleTask(id)
      caricaTasks()
    } catch (err) {
      setErrore(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id)
      caricaTasks()
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <h1>Task</h1>
      {errore && <div className="login-message error">{errore}</div>}

      <form onSubmit={handleSubmit} className="row">
        <input
          type="text"
          placeholder="Titolo"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        />
        <input
          type="date"
          value={scadenza}
          onChange={(e) => setScadenza(e.target.value)}
          required
        />
        <select value={priorita} onChange={(e) => setPriorita(e.target.value)}>
          <option value="BASSA">Bassa</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
        </select>
        <button type="submit" className="btn">Aggiungi task</button>
      </form>

      <div className="stack">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.completato ? 'done' : ''}`}>
            <div
              className={`task-check ${task.completato ? 'checked' : ''}`}
              onClick={() => handleToggle(task.id)}
            />
            <div className="task-body">
              <div className="task-title">{task.titolo}</div>
              <div className="task-meta">{task.materia} · {task.scadenza} · {task.priorita}</div>
            </div>
            <button className="task-delete" onClick={() => handleDelete(task.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Task