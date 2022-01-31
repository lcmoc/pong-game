import "./styles.css";

import React, { useState } from "react";

import Table from "../../components/Table";

const Pong = () => {
  const [playingIsActive, setPlayingIsActive] = useState(false);
  const [score, setScore] = useState({ left: 0, right: 0 });

  const increaseCounter = (isInRightGoal, isInLeftGoal) => {
    console.log('xxx');
    setScore({
      left: isInRightGoal ? score.left + 1 : score.left,
      right: isInLeftGoal ? score.right + 1 : score.right,
    });
  };

  return (
    <>
      <div className="Score">{score.left} / {score.right}</div>
      <Table
        playingIsActive={playingIsActive}
        increaseCounter={increaseCounter}
      />
      <button
        onClick={() => setPlayingIsActive(!playingIsActive)}
        className="PlayButton"
      >
        {playingIsActive ? "Stop" : "Start"}
      </button>
    </>
  );
};

export default Pong;
