import "./styles.css";

import React, { useState } from "react";

import Table from "../../components/Table";
import { useDoc } from "@syncstate/react";

const Pong = () => {
  const [playingIsActive, setPlayingIsActive] = useDoc("/playingIsActive");
  
  const [score, setScore] = useState({ left: 0, right: 0 });

  const increaseCounter = (isInRightGoal, isInLeftGoal) => {
    setScore({
      left: isInRightGoal ? score.left + 1 : score.left,
      right: isInLeftGoal ? score.right + 1 : score.right,
    });
  };

  const handleGameStart = () => {
    !playingIsActive && setScore({left: 0, right: 0})
    setPlayingIsActive(!playingIsActive);
  };

  return (
    <>
      <div className="Score">{score.left} / {score.right}</div>
      <Table
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
