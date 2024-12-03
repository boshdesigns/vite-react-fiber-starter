import React, { useState, useEffect, useContext, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";
import MainScene from "./MainScene";
import GameHud from "./components/GameHud";
import GameContext from "./context/GameContext";

import "./styles.css";

const App = () => {
  const [gameMode, updateGameMode] = useState(false);

  const [allowGameMode, updateAllowGameMode] = useState(false);
  const [endScreen, updateEndScreen] = useState(false);

  const [time, setTime] = useState(5);

  const timer = useRef();

  useEffect(() => {
    setTimeout(() => {
      updateAllowGameMode(true);
    }, 3000);
  }, []);

  const [score, updateScore] = useState(0);
  const setScore = () => {
    updateScore(score + 1);
  };

  const resetGame = () => {
    setGameMode();
    updateScore(0);
    setTime(5);
    clearInterval(timer.current);
    timer.current = null;
    updateEndScreen(false);
  };

  const setGameMode = () => {
    updateScore(0);

    toggleTimer();
    updateGameMode(!gameMode);
    updateEndScreen(false);
  };

  const displayEndScreen = () => {
    updateEndScreen(true);
  };

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      timer.current = null;
      updateGameMode(!gameMode);

      displayEndScreen();
    }
  }, [time]);

  const toggleTimer = () => {
    if (timer.current == null) {
      setTime(5);
      timer.current = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    }
  };

  return (
    <GameContext.Provider value={{ score, setScore, setGameMode, gameMode, allowGameMode, time, setTime }}>
      <Router>
        <div className='app'>
          <GameHud />
          <button
            className={"play-button" + (gameMode || !allowGameMode ? " play-button--hidden" : "")}
            onClick={() => {
              setGameMode();
            }}
          >
            Click to play
          </button>
          <button
            className={"quit-button" + (!gameMode ? " quit-button--hidden" : "")}
            onClick={() => {
              resetGame();
            }}
          >
            Click to quit
          </button>

          <div className={"end-screen" + (endScreen ? " end-screen--visible" : "")}>
            <p>Game Over</p>
            <p>Your score: {score}</p>
          </div>

          <header style={{ opacity: gameMode ? 0 : 1, transition: "0.5s opacity ease-in-out 0.3s" }}></header>
          <main>
            <Routes>
              <Route exact path='/' element={<SceneTwo />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameContext.Provider>
  );
};

export default App;
