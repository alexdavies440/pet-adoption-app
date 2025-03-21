import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Profile from './components/Profile'
import './App.css'

function App() {

  const [jwt, setJwt] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header jwt={jwt} />
        <Routes>
          <Route path='/' element={<Home jwt={jwt} />} />
          <Route path='/login' element={
            <Login
              jwt={jwt}
              setJwt={setJwt}
            />
          }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile jwt={jwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
