import logo from "./logo.png";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import WordGrid from "./WordGrid.js";
import KeyBoard from "./KeyBoard.js";
import wordList from "./wordList.json";
import ShareModal from "./ShareModal";

function App() {
  const [word, setWord] = useState("bench");
  const [guess, setGuess] = useState([]);
  const [err, setErr] = useState(false);
  const [win, setWin] = useState(false);
  const [emojis, setEmojis] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [edit, setEdit] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [themes, setThemes] = useState([
    {
      //blank
      class: "blank0",
      buttons: "q w e r t y u i o p a s d f g h j k l z x c v b n m",
    },
    {
      //guessed
      class: "guessed1",
      buttons: " ",
    },
    {
      //letter included
      class: "included2",
      buttons: " ",
    },
    {
      //placed correct
      class: "correct3",
      buttons: " ",
    },
  ]);

  const [grid, setGrid] = useState([
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
    [
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
      { color: "white", value: null },
    ],
  ]);

  useEffect(() => {
    let curr = [...grid];

    if (guess.length != 0) {
      curr[attempts][guess.length - 1].value = guess[guess.length - 1];
    }

    setGrid(curr);
  }, [guess]);

  useEffect(() => {
    let curr = [...grid];

    if (edit == "{bksp}") {
      curr[attempts][guess.length - 1].value = null;
      setGuess(guess.slice(0, guess.length - 1));
      setGrid(curr);
    } else if (edit === "{enter}" && grid[attempts][4] != null) {
      if (wordList.includes(guess.join(""))) {
        setErr(false);
        checkEntry(guess);
        setAttempts(attempts + 1);
        setGuess([]);
      } else {
        setErr(true);
      }
    }

    if (edit != "") {
      setEdit("");
    }
  }, [edit]);

  const emojiMap = ["😳", "🙄", "🥳"];
  const checkEntry = (entry) => {
    const emojiRow = [];
    const curr_themes = [...themes];
    const curr_grid = [...grid];
    let letter_history = [];

    const counts = {};
    word.split("").forEach((letter) => {
      counts[letter] = (counts[letter] || 0) + 1;
    });

    entry.map((letter, index) => {
      //const theme_history = parseInt(curr_themes.find(set => set.buttons.includes(letter)).class.slice(-1));
      var emoji = 0;
      if (word[index] == letter) {
        curr_themes[3].buttons += letter + " ";
        curr_grid[attempts][index].color = "rgb(31, 156, 48)";
        emoji = 2;
      } else if (
        word.includes(letter) &&
        ((!letter_history.includes(letter) &&
          !(entry[word.indexOf(letter)] == letter)) ||
          counts[letter] > 1)
      ) {
        curr_themes[2].buttons += letter + " ";
        curr_grid[attempts][index].color = "rgb(209, 184, 40)";
        emoji = 1;
      } else {
        curr_themes[1].buttons += letter + " ";
        curr_grid[attempts][index].color = "rgb(133, 128, 128)";
      }

      letter_history.push(letter);

      emojiRow.push(emojiMap[emoji]);
    });

    setThemes(curr_themes);
    const emojiLine = emojiRow.join("");
    setEmojis((currLine) => currLine + "\n" + emojiLine);

    if (entry.join("") == word) {
      console.log("win!");
      setWin(true);
      setModalOpen(true);
    }
  };

  return (
    <div className="App" style = {{marginBottom: 10}}>
      <h1 style={{marginBottom: 0}}>CORDLE</h1>
      <div style ={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}> 
      <h2 style={{ marginTop: 15, marginBottom: 15, display:'inline'}}>
        {err
          ? "Not A Valid Word"
          : win
          ? "Excellent!"
          : attempts == 6
          ? "Try again tommorow!"
          : "A Corey Wordle"}
      </h2>
      {win
        ? <ShareModal
            isVisible={isModalOpen}
            hideModal={() => setModalOpen(false)}
            grid={`Cordle ${attempts}/6 \n` + emojis}
          />
        : null}
      </div>
      <WordGrid grid={grid} themes={themes} />
      <div style={{ width: "100%", margin: "auto", marginTop: 10 }}>
        <KeyBoard
          guess={guess}
          setGuess={setGuess}
          attempts={attempts}
          setEdit={setEdit}
          themes={themes}
        />
      </div>
    </div>
  );
}

export default App;
