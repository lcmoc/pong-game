import "./styles.css";

import Ball from "../Ball";
import Pad from "../Pad";
import { useState } from "react";

const Table = ({ playingIsActive, increaseCounter }) => {
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

  const padPosHandler = (leftPos, topPos, bottomPos, right) => {
    
    if (!right) {
      setLeftPadPos({
        leftPos: leftPos,
        topPos: topPos,
        bottomPos: bottomPos,
      });
    }

    if (right) {
      setRightPadPos({
        leftPos: leftPos,
        topPos: topPos,
        bottomPos: bottomPos,
      });
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

    return (leftPadCollision && 1) || (rightPadCollision && 2);
  };

  const ballIsOnSameXCoordinateAsPad = (leftPos, rightPos) => {
    const leftPadCollision = leftPadPos.leftPos >= leftPos;
    const rightPadCollision = rightPadPos.leftPos <= rightPos;

    return (leftPadCollision && 1) || (rightPadCollision && 2);
  };

  const hasCollisionWithPad = (leftPos, topPos, rightPos) => {
    const xCollisionPad = ballIsOnSameXCoordinateAsPad(leftPos, rightPos);

    if (xCollisionPad === 1) {
      return ballIsOnSameYCoordinateAsPad(topPos, xCollisionPad);
    }

    if (xCollisionPad === 2) {
      return ballIsOnSameYCoordinateAsPad(topPos, xCollisionPad);
    }

    return 0;
  };

  return (
    <div className="OuterWrapper">
      <div className="InnerWrapper">
        <Pad playingIsActive={playingIsActive} padPosHandler={padPosHandler} />
        <Ball
          playingIsActive={playingIsActive}
          increaseCounter={increaseCounter}
          hasCollisionWithPad={hasCollisionWithPad}
        />
        <Pad
          playingIsActive={playingIsActive}
          padPosHandler={padPosHandler}
          isRightPad
        />
      </div>
    </div>
  );
};

export default Table;
