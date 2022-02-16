import logo from './logo.png';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import WordGrid from './WordGrid.js';
import KeyBoard from './KeyBoard.js';
import 'reactjs-popup/dist/index.css';
import wordList from "./wordList.json";


function App() {
  const [word, setWord] = useState("yerba");
  const [guess, setGuess] = useState([]);
  const [err, setErr] = useState(false);
  const [win, setWin] = useState(false);

  const [edit, setEdit] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [themes, setThemes] = useState(
    [
      {
        //blank
        class: "blank0",
        buttons: "q w e r t y u i o p a s d f g h j k l z x c v b n m"
      },
      {
        //guessed
        class: "guessed1",
        buttons: " "
      },
      {
        //letter included
        class: "included2",
        buttons: " "
      },
      {
        //placed correct
        class: "correct3",
        buttons: " "
      }
    ]

  );
  

  const [grid, setGrid] = useState([
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
    [{color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}, {color: "white", value:null}],
  ]);

  useEffect(() => {
    let curr = [...grid];


    if(guess.length != 0){
      curr[attempts][guess.length-1].value = guess[guess.length-1];
    }

    setGrid(curr);


	}, [guess]);

  useEffect(() => {
    let curr = [...grid];

    if(edit == "{bksp}"){
      curr[attempts][guess.length-1].value = null;
      setGuess(guess.slice(0, guess.length-1));
      setGrid(curr);
    }

    else if(edit === "{enter}" && grid[attempts][4] != null){
      if(wordList.includes(guess.join(""))){
        setErr(false);
        checkEntry(guess);  
        setAttempts(attempts+1);
        setGuess([]);
      }
      else{
        setErr(true);
      }
    }

    if(edit != ""){
      setEdit("");
    }
    
	} , [edit]);

 const checkEntry = (entry) => {
    const curr_themes = [...themes];
    const curr_grid = [...grid];
    
    entry.map((letter, index)=>{
      const history = parseInt(curr_themes.find(set => set.buttons.includes(letter)).class.slice(-1));

      if(word[index] == letter && history != 3){
        curr_themes[3].buttons+=(letter+" ");
        curr_themes[history].buttons.replace(letter+" ", '');

        curr_grid[attempts][index].color = 'rgb(31, 156, 48)';
      }
      else if(word.includes(letter) && history < 2){
        curr_themes[2].buttons+=(letter+" ");
        curr_themes[history].buttons.replace(letter.concat(" "), '');

        curr_grid[attempts][index].color = 'rgb(209, 184, 40)';
      }
      else if(history == 0){
        curr_themes[1].buttons+=(letter+" ");
        curr_themes[0].buttons.replace((letter+" "), '');

        curr_grid[attempts][index].color = 'rgb(133, 128, 128)';
      }

    });

    setThemes(curr_themes);

    if(entry.join("") == word){
      console.log("win!");
      setWin(true);
    }
  };


  return (
    <div className="App">
      <h1>CORDLE</h1>
      <h2>{err? "Not A Valid Word": win? "Excellent!": guess.length == 6 ? "Try again tommorow!": "A Corey Wordle"}</h2>
      <WordGrid grid = {grid} themes={themes}/>
      <div style={{width: '100%', margin:'auto', marginTop:10, marginBottom:100}}>
        <KeyBoard guess = {guess} setGuess = {setGuess} attempts = {attempts} setEdit = {setEdit} themes = {themes}/>
      </div>
      
    </div>
  );
}

export default App;
