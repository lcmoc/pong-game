import "./styles.css";

import React, { useCallback, useEffect } from "react";

import { useDoc } from "@syncstate/react";

const Ball = ({ increaseCounter, hasCollisionWithPad, yStep }) => {
  const [playingIsActive, setPlayingIsActive] = useDoc("/playingIsActive");

  const [ballPos, setBallPos] = useDoc("/ballPos");
  const [direction, setDirection] = useDoc("/direction");

  const topPos = ballPos.topPos;
  const leftPos = ballPos.leftPos;

  const getRightPos = useCallback(() => {
    return leftPos + ballWidth;
  }, [leftPos]);

  const xStep = 0.09;
  const ballHeight = 4;
  const ballWidth = 2;
  const isInRightGoal = getRightPos() >= 100;
  const isInLeftGoal = leftPos <= 0;
  const isInGoal = isInRightGoal || isInLeftGoal;
  const initialPos = 50;
  const randomDirection = Math.random() < 0.5;

  const style = {
    top: `${topPos}%`,
    left: `${leftPos}%`,
    height: `${ballHeight}%`,
    width: `${ballWidth}%`,
  };

  const isGoalCollision = useCallback(() => {
    return isInGoal;
  }, [isInGoal]);

  const padCollision = useCallback(() => {
    const collisionValue = hasCollisionWithPad();
    const currentXDirection = collisionValue === 1 || !(collisionValue === 2);

    if (collisionValue && collisionValue !== 0) {
      setDirection({
        ...direction,
        x: currentXDirection,
      });
    }
  }, [hasCollisionWithPad, direction, setDirection]);

  useEffect(() => {
    const reinitialize = () => {
      const goal = (isInRightGoal && 2) || (isInLeftGoal && 1);

      increaseCounter(goal);
      setBallPos({
        topPos: initialPos,
        leftPos: initialPos,
        rightPos: getRightPos(),
      });
      setDirection({ y: randomDirection, x: randomDirection });
    };

    const getBottomPos = () => {
      return ballPos.topPos + ballHeight;
    };

    const doStep = () => {
      const doyStep = direction.y ? topPos + yStep : topPos - yStep;
      const doXStep = direction.x ? leftPos + xStep : leftPos - xStep;

      setBallPos({
        topPos: doyStep,
        leftPos: doXStep,
        rightPos: getRightPos(),
      });
    };

    const wallCollision = () => {
      // const topIsReached = ballPos.topPos <= 0;
      // const bottomIsReached = getBottomPos() >= 100;

      // const newYDirection = topIsReached || !bottomIsReached || direction.y;
      // console.log('oppositeYDirection', newYDirection);

      //   setDirection({
      //     ...direction,
      //     y: newYDirection
      //   })

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
    randomDirection,
  ]);

  return <div className="Ball" style={style}></div>;
};

export default Ball;
