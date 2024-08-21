import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import EmailSent from './components/EmailSent/EmailSent';
import EmailVerified from './components/EmailVerified/EmailVerified';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const user = localStorage.getItem("token");
  
  return (
    <div className='app-container'>
      <Routes>
        {user && <Route path="/" exact element={<Dashboard />} />}
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/register" />} />
        <Route path="/webcam" exact element={<WebcamCapture />} />
        <Route path="/emailsent" exact element={<EmailSent />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerified />} />
      </Routes>
    </div>
  )
}

export default App;