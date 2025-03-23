import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Profile from './components/Profile'
import './App.css'

function App() {
  const [credentials, setCredentials] = useState("");
  
  return (
    <>
      <BrowserRouter>
        <Header credentials={credentials} setCredentials={setCredentials} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setCredentials={setCredentials} />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile credentials={credentials} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
