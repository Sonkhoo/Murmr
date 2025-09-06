import { useState } from 'react'
import './App.css'
import Landing from './Pages/Landing'
import { MurmrLogin, MurmrSignup } from './Pages/Auth/Login'
import Onboarding from './Pages/OnBoarding'
import MurmrDashboard from './Pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<MurmrLogin />} />
        <Route path="/signup" element={<MurmrSignup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<MurmrDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
