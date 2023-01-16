import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Register from './components/register';
import { UserProvider } from './contexts/userContext';
function App() {
  return (< BrowserRouter >
    <UserProvider>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/drive/:name" element={<Main/>} />
    </Routes>
    </UserProvider>
  </BrowserRouter >)
};

export default App;
