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
  
  const handleYSpeed = (topPos) => {
    const ballPosOnPad = (100 / (leftPadPos.bottomPos - leftPadPos.topPos) * (topPos - leftPadPos.topPos));
    
    if (ballPosOnPad === 50) {
      setYStep(0)
    }

    if(ballPosOnPad < 50) {
      setYStep((100 - ballPosOnPad) / 1000);
    }

    if(ballPosOnPad > 50) {
      setYStep(ballPosOnPad / 1000);
    }

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
    const xCollisionPad = ballIsOnSameXCoordinateAsPad(ballPos.leftPos, ballPos.rightPos);
    switch (xCollisionPad) {
      case 1:
        return ballIsOnSameYCoordinateAsPad(ballPos.topPos, xCollisionPad);
      case 2:
        return ballIsOnSameYCoordinateAsPad(ballPos.topPos, xCollisionPad);
      default:
        return 0;
    }
  };

  return (
    <div className="OuterWrapper">
      <div className="InnerWrapper">
        {newGame && (
          <>
            <Pad
              isRightPad={false}
              keyCodeUp={87} // keyCode w
              keyCodeDown={83} // keyCode s
              padPosPath={leftPadPosPath}
              key={"leftPad"}
            />
            <Ball
              increaseCounter={increaseCounter}
              hasCollisionWithPad={hasCollisionWithPad}
              yStep={yStep}
            />
            <Pad
              isRightPad
              keyCodeUp={38} // keyCode Arrow up
              keyCodeDown={40} // keyCode Arrow down
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
