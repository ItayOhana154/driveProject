import './App.css';
import React, { useEffect, useState } from 'react';
import { browserRouter, Routes, Route } from 'react-router';
import Login from './components/login';
import Main from './components/main';

function App() {
  return (< browserRouter >
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/drive/:name" element={<Main/>} />
    </Routes>
  </browserRouter >)
};


export default App;
