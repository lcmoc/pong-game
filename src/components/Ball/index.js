import "./styles.css";

import React, { useCallback, useEffect } from "react";

import { useDoc } from "@syncstate/react";

const Ball = ({
  playingIsActive,
  increaseCounter,
  hasCollisionWithPad,
  yStep,
}) => {
  const [ballPos, setBallPos] = useDoc("/ballPos");
  const [direction, setDirection] = useDoc("/direction");
  
  const topPos = ballPos.topPos;
  const leftPos = ballPos.leftPos;

  const getRightPos = useCallback(() => {
    return leftPos + ballWidth;
  }, [leftPos]);

  const xStep = 0.05
  const ballHeight = 4;
  const ballWidth = 2;
  const isInRightGoal = getRightPos() >= 100;
  const isInLeftGoal = leftPos <= 0;

  const style = {
    top: `${topPos}%`,
    left: `${leftPos}%`,
    height: `${ballHeight}%`,
    width: `${ballWidth}%`,
  };

  const isGoalCollision = useCallback(() => {
    return isInRightGoal || isInLeftGoal;
  }, [isInLeftGoal, isInRightGoal]);

  const padCollision = useCallback(() => {
    hasCollisionWithPad() === 1 &&
      setDirection({
        ...direction,
        x: true
      })

    hasCollisionWithPad() === 2 &&
    setDirection({
        ...direction,
        x: false
      })
  }, [hasCollisionWithPad, direction, setDirection]);

  useEffect(() => {
    const reinitialize = () => {
      increaseCounter(isInRightGoal, isInLeftGoal);
      setBallPos({topPos: 50, leftPos: 50, rightPos: getRightPos()})
      setDirection({y: Math.random() < 0.5, x: Math.random() < 0.5 });
    };

    const getBottomPos = () => {
      return topPos + ballHeight;
    };

    const doStep = () => {
      setBallPos({
        ...ballPos,
        topPos: direction.y ? topPos + yStep : topPos - yStep,
        leftPos: direction.x ? leftPos + xStep : leftPos - xStep,
        rightPos: getRightPos(),
      })
    };

    const wallCollision = () => {
      if (getBottomPos() >= 100) {
        setDirection({ ...direction, y: false });
      } else if (topPos <= 0) {
        setDirection({ ...direction, y: true });
      }
    };

    const gameIntervalId =
      playingIsActive &&
      !isGoalCollision() &&
      setInterval(() => {
        wallCollision();
        padCollision();
        doStep();
      }, 1);

    isGoalCollision() && reinitialize();

    return () => clearInterval(gameIntervalId);
  }, [
    leftPos,
    topPos,
    playingIsActive,
    increaseCounter,
    isGoalCollision,
    isInRightGoal,
    isInLeftGoal,
    padCollision,
    yStep,
    ballPos,
    setBallPos,
    setDirection,
    direction,
    getRightPos,
  ]);

  return <div className="Ball" style={style}></div>;
};

export default Ball;
