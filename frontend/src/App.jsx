import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import UserDetails from './Components/UserDetails'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userDetails" element={<UserDetails/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
