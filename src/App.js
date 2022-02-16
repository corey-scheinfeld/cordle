import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import WordGrid from './WordGrid.js';


function App() {
  const [word, setWord] = useState("Apple");
  return (
    <div className="App">
      <h1>Cordle</h1>
      <WordGrid></WordGrid>
    </div>
  );
}

export default App;
