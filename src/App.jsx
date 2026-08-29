import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Flashcard from './pages/Flashcard'
import Timer from './pages/Timer'
import Mazzo from './pages/Mazzo'
import Studia from './pages/Studia'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Condivisione from './pages/Condivisione'
import ProgressiCondivisi from './pages/ProgressiCondivisi'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />

          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/task" element={<Task />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/flashcard/:deckId" element={<Mazzo />} />
        <Route path="/flashcard/:deckId/studia" element={<Studia />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/condivisione" element={<Condivisione />} />
        <Route path="/condivisione/:id/progressi" element={<ProgressiCondivisi />} />
      </Route>
    </Routes>
  )
}

export default App