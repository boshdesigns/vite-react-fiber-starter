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
  const [time, setTime] = useState(60);

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

  const setGameMode = () => {
    toggleTimer();
    updateGameMode(!gameMode);
  };

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current);
      timer.current = null;
      updateGameMode(!gameMode);
    }
  }, [time]);

  const toggleTimer = () => {
    if (timer.current == null) {
      setTime(60);
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
              setGameMode();
            }}
          >
            Click to quit
          </button>
          <h2>Frontend Development</h2>

          <header style={{ opacity: gameMode ? 0 : 1, transition: "0.5s opacity ease-in-out 0.3s" }}>
            <h1>Bish Bash Bosh Designs</h1>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Scene One</Link>
                </li>
                <li>
                  <Link to='/scene-two'>Scene Two</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route exact path='/' element={<SceneOne />} />
              <Route path='/scene-two' element={<SceneTwo />} />
              <Route path='/scene-three' element={<MainScene />} />
              <Route path='/scene-four' element={<MainScene />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameContext.Provider>
  );
};

export default App;
