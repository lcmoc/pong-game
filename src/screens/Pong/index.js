import "./styles.css";

import React, { useState } from "react";

import Table from "../../components/Table";

const Pong = () => {
  const [playingIsActive, setPlayingIsActive] = useState(false);
  const [score, setScore] = useState({ left: 0, right: 0 });
  const [newGame, setNewGame] = useState(false);

  const increaseCounter = (isInRightGoal, isInLeftGoal) => {
    setScore({
      left: isInRightGoal ? score.left + 1 : score.left,
      right: isInLeftGoal ? score.right + 1 : score.right,
    });
  };

  const handleGameStart = () => {
    !newGame && setScore({left: 0, right: 0})
    setNewGame(!newGame);
    setPlayingIsActive(!playingIsActive)
  };

  return (
    <>
      <div className="Score">{score.left} / {score.right}</div>
      <Table
        newGame={newGame}
        playingIsActive={playingIsActive}
        increaseCounter={increaseCounter}
      />
      <button
        onClick={() => handleGameStart()}
        className="PlayButton"
      >
        {playingIsActive ? "Stop" : "Start"}
      </button>
    </>
  );
};

export default Pong;
