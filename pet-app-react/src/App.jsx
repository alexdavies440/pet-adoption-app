import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Profile from './components/Profile';
import Organizations from './components/Organizations.jsx';
import { apiKey, secret } from "../../../sensitive/pet-adoption-app/keys.js";

import './App.css';


function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    generateBearerToken();
    checkAuthenticated();
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

  function generateBearerToken() {

    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: 'POST',
      body: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": apiKey,
        "client_secret": secret
      })
    })
      .then(res => res.json())
      .then(data => setToken(data.access_token))
  }

  console.log(token);

  return (
    <>
      <BrowserRouter>
        <Header
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <Routes>
          <Route
            path='/'
            element={<Home
              token={token}
            />}
          />
          <Route
            path='/organizations'
            element={<Organizations
              token={token}
            />}
          />
          <Route
            path='/login'
            element={<Login
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/profile'
            element={<Profile
              authenticated={authenticated}
            />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
