import "./styles.css";

import Ball from "../Ball";
import Pad from "../Pad";
import { useDoc } from "@syncstate/react";
import { useState } from "react";

const Table = ({ increaseCounter }) => {
  const [yStep, setYStep] = useState(0);

  const leftPadPosPath = "/leftPadPos";
  const rightPadPosPath = "/rightPadPos";

  const [leftPadPos, setLeftPadPos] = useDoc(leftPadPosPath);
  const [rightPadPos, setRightPadPos] = useDoc(rightPadPosPath);
  const [ballPos, setBallPos] = useDoc("/ballPos");
  const [newGame, setNewGame] = useDoc("/ballPos");

  const keyCodeArrowUp = 38;
  const keyCodeArrowDown = 40;
  const keyCodeW = 87;
  const keyCodeS = 83;

  const handleYSpeed = (topPos) => {
    const ballPosOnPad =
      (100 / (leftPadPos.bottomPos - leftPadPos.topPos)) *
      (topPos - leftPadPos.topPos);

    const directionStraight = ballPosOnPad === 50 && 0;
    const directionUp = ballPosOnPad < 50 && (100 - ballPosOnPad) / 1000;
    const directionDown = ballPosOnPad > 50 && ballPosOnPad / 1000;

    const newYStep = directionStraight || directionUp || directionDown || yStep;

    setYStep(newYStep);
  };

  const ballIsOnSameYCoordinateAsPad = (topPos, xCollisionPad) => {
    const leftPadCollision =
      xCollisionPad === 1 &&
      topPos <= leftPadPos.bottomPos &&
      topPos >= leftPadPos.topPos;

    const rightPadCollision =
      xCollisionPad === 2 &&
      topPos <= rightPadPos.bottomPos &&
      topPos >= rightPadPos.topPos;

    (leftPadCollision || rightPadCollision) && handleYSpeed(topPos);

    return (leftPadCollision && 1) || (rightPadCollision && 2);
  };

  const ballIsOnSameXCoordinateAsPad = (leftPos, rightPos) => {
    const leftPadCollision = leftPadPos.leftPos >= leftPos;
    const rightPadCollision = rightPadPos.leftPos <= rightPos;

    return (leftPadCollision && 1) || (rightPadCollision && 2);
  };

  const hasCollisionWithPad = () => {
    const xCollisionPad = ballIsOnSameXCoordinateAsPad(
      ballPos.leftPos,
      ballPos.rightPos
    );

    return ballIsOnSameYCoordinateAsPad(ballPos.topPos, xCollisionPad);
  };

  return (
    <div className="OuterWrapper">
      <div className="InnerWrapper">
        {newGame && (
          <>
            <Pad
              pad={1}
              keyCodeUp={keyCodeW}
              keyCodeDown={keyCodeS}
              padPosPath={leftPadPosPath}
              key={"leftPad"}
            />
            <Ball
              increaseCounter={increaseCounter}
              hasCollisionWithPad={hasCollisionWithPad}
              yStep={yStep}
            />
            <Pad
              pad={2}
              keyCodeUp={keyCodeArrowUp}
              keyCodeDown={keyCodeArrowDown}
              padPosPath={rightPadPosPath}
              key={"rightPad"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
