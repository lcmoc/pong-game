import "./styles.css";

import React, { useState } from "react";

import Table from "../../components/Table";
import { useDoc } from "@syncstate/react";

const Pong = () => {
  const [playingIsActive, setPlayingIsActive] = useDoc("/playingIsActive");
  const [newGame, setNewGame] = useDoc("/newGame");
  const [leftPadPos, setLeftPadPos] = useDoc("/leftPadPos");
  const [rightPadPos, setRightPadPos] = useDoc("/rightPadPos");
  const [ballPos, setBallPos] = useDoc("/ballPos");

  const [score, setScore] = useState({ left: 0, right: 0 });

  const reinitialize = () => {
    setBallPos({
      topPos: 50,
      leftPos: 50,
    });
    setLeftPadPos({
      topPos: 50
    });
    setRightPadPos({
      topPos: 50
    })
  };

  const increaseCounter = (goal) => {
    const currentLeftScore = goal === 2 ? score.left + 1 : score.left;
    const currentRightScore = goal === 1 ? score.right + 1 : score.right;

    setScore({
      left: currentLeftScore,
      right: currentRightScore,
    });
  };

  const handleGameStart = () => {
    setPlayingIsActive(!playingIsActive);
    setNewGame(!newGame)
    !newGame && setScore({ left: 0, right: 0 });
    reinitialize();
  };

  return (
    <>
      <div className="Score">
        {score.left} / {score.right}
      </div>
      <Table increaseCounter={increaseCounter} />
      <button onClick={() => handleGameStart()} className="PlayButton">
        {playingIsActive ? "Stop" : "Start"}
      </button>
    </>
  );
};

export default Pong;
