import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Profile from './components/Profile'
import './App.css'

function App() {

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthenticated()
  }, [])

  // Should return 200 status code if a use is logged in
  function checkAuthenticated() {
      fetch("http://localhost:8080/principal", {
          credentials: "include"
      })
          .then(res => {
            if (res.status == 200) {
              setAuthenticated(true);
              console.log(res.status);
            }
          })
          .catch(() => console.log("Not logged in"))
  }
  
  
  return (
    <>
      <BrowserRouter>
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile authenticated={authenticated} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
