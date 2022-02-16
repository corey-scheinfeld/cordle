import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import wordGrid from './wordGrid.js';


function App() {
  const [word, setWord] = useState("Apple");
  return (
    <div className="App">
      <h1>Cordle</h1>
      <wordGrid/>
    </div>
  );
}

export default App;
