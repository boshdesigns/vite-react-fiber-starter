import React, { useState, useEffect, useContext } from "react";
import GameContext from "../context/GameContext";

const GameHud = () => {
  const { score, gameMode, time } = useContext(GameContext);
  // State variables
  // const [score, setScore] = useState(0);
  // const [time, setTime] = useState(0);

  // Effects
  useEffect(() => {
    // Code to run on component mount

    // Return a cleanup function if needed
    return () => {
      // Code to run on component unmount
    };
  }, []);

  // Event handlers
  const handleButtonClick = () => {
    // Code to handle button click
  };

  // Render
  return (
    <div className={"gamehud__container" + (!gameMode ? " gamehud__container--hidden" : "")}>
      <p className='gamehud__score'>Score: {score}</p>
      <p className='gamehud__time'>Time: {time}</p>
    </div>
  );
};

export default GameHud;
