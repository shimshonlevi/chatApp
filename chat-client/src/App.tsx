import React from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Chat from './components/Chat'
import { ToastContainer } from 'react-toastify'
import SetAvater from './components/SetAvater'

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setAvatar" element={<SetAvater />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/" element={<Register />} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App