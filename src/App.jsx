import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App