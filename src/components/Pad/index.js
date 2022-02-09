import "./styles.css";

import React, { useCallback, useEffect, useState } from "react";

const Pad = ({ playingIsActive, padPosHandler, isRightPad }) => {
  const [topPos, setTopPos] = useState(50);

  const step = 1;
  const padWidth = 3;
  const padHeight = 25;
  const arrowUp = 38; // keyCode Arrow up
  const arrowDown = 40; // keyCode Arrow down
  const wUp = 87; // keyCode w
  const sDown = 83; // keyCode s

  const leftPos = isRightPad ? 100 - padWidth : 0;

  const style = {
    top: `${topPos}%`,
    left: `${leftPos}%`,
    width: `${padWidth}%`,
    height: `${padHeight}%`,
  };

  const getBottomPos = useCallback(() => {
    return topPos + padHeight;
  }, [topPos]);

  const moveDown = useCallback(() => {
    return getBottomPos() < 100 && topPos + step;
  }, [getBottomPos, topPos]);

  const moveUp = useCallback(() => {
    return topPos > 0 && topPos - step;
  }, [topPos]);

  const moveLeftPad = useCallback(
    (keyCode) => {
      return (
        (keyCode === arrowUp && moveUp) || (keyCode === arrowDown && moveDown)
      );
    },
    [moveDown, moveUp]
  );

  const moveRightPad = useCallback(
    (keyCode) => {
      return (keyCode === wUp && moveUp) || (keyCode === sDown && moveDown);
    },
    [moveDown, moveUp]
  );

  const move = useCallback(
    (keyCode) => {
      return (
        [arrowUp, arrowDown, wUp, sDown].includes(keyCode) &&
        ((!isRightPad && moveLeftPad(keyCode)) ||
          (isRightPad && moveRightPad(keyCode)))
      );
    },
    [moveRightPad, moveLeftPad, isRightPad]
  );

  const getRightPos = useCallback(() => {
    return leftPos + padWidth;
  }, [leftPos, padWidth]);

  const movePad = useCallback(
    (pressedKey) => {
      const props = {
        leftPos: isRightPad ? leftPos : getRightPos(),
        topPos: topPos,
        bottomPos: getBottomPos(),
      };

      setTopPos(move(pressedKey.keyCode));
      padPosHandler(props, isRightPad);
    },
    [
      padPosHandler,
      move,
      getRightPos,
      getBottomPos,
      topPos,
      isRightPad,
      leftPos,
    ]
  );

  useEffect(() => {
    playingIsActive && document.addEventListener("keydown", movePad);

    //padPosHandler(leftPos + padWidth, topPos + padHeight);

    return () => {
      document.removeEventListener("keydown", movePad);
    };
  }, [playingIsActive, movePad, padPosHandler, topPos, isRightPad]);

  return <div className="Pad" style={style}></div>;
};

export default Pad;
