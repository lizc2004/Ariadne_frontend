import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Flashcard from './pages/Flashcard'
import Timer from './pages/Timer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/task" element={<ProtectedRoute><Task /></ProtectedRoute>} />
      <Route path="/flashcard" element={<ProtectedRoute><Flashcard /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><Timer /></ProtectedRoute>} />
    </Routes>
  )
}

export default App