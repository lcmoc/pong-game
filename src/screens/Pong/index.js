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
  const [activeUser, setActiveUser] = useDoc("/activeUser");
  const [score, setScore] = useState({ left: 0, right: 0 });

  const reinitialize = () => {
    setBallPos({
      topPos: 50,
      leftPos: 50,
    });
    setLeftPadPos({
      topPos: 50,
    });
    setRightPadPos({
      topPos: 50,
    });
    !newGame && setScore({ left: 0, right: 0 });
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
    if (activeUser === 2) {
      setPlayingIsActive(!playingIsActive);
      setNewGame(!newGame);
      reinitialize();
    }
  };

  return (
    <div>
      <div className="Score">
        {score.left} / {score.right}
      </div>
      <Table increaseCounter={increaseCounter} />
      <button onClick={() => handleGameStart()} className="PlayButton">
        {playingIsActive ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Pong;
