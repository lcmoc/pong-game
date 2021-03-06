import "./styles.css";

import Ball from "../Ball";
import Pad from "../Pad";
import { useState } from "react";

const Table = ({ playingIsActive, increaseCounter, newGame }) => {
  const [yStep, setYStep] = useState(0);

  const [leftPadPos, setLeftPadPos] = useState({
    leftPos: 3,
    topPos: 50,
    bottomPos: 75,
  });

  const [rightPadPos, setRightPadPos] = useState({
    leftPos: 97,
    topPos: 50,
    bottomPos: 75,
  });

  const padPosHandler = (props, right) => {
    const allPropsAreSet = props.leftPos && props.topPos && props.bottomPos;

    !right &&
      allPropsAreSet &&
      setLeftPadPos({
        ...props,
      });

    right &&
      allPropsAreSet &&
      setRightPadPos({
        ...props,
      });
  };

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

  const hasCollisionWithPad = (leftPos, topPos, rightPos) => {
    const xCollisionPad = ballIsOnSameXCoordinateAsPad(leftPos, rightPos);
    switch (xCollisionPad) {
      case 1:
        return ballIsOnSameYCoordinateAsPad(topPos, xCollisionPad);
      case 2:
        return ballIsOnSameYCoordinateAsPad(topPos, xCollisionPad);
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
              playingIsActive={playingIsActive}
              padPosHandler={padPosHandler}
            />
            <Ball
              playingIsActive={playingIsActive}
              increaseCounter={increaseCounter}
              hasCollisionWithPad={hasCollisionWithPad}
              yStep={yStep}
            />
            <Pad
              playingIsActive={playingIsActive}
              padPosHandler={padPosHandler}
              isRightPad
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
