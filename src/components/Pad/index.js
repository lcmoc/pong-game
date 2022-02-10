import "./styles.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";

const Pad = ({ playingIsActive, padPosHandler, isRightPad }) => {
  const [topPos, setTopPos] = useState(50);

  const step = 2;
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
      setTopPos(
        (keyCode === arrowUp && moveUp()) ||
          (keyCode === arrowDown && moveDown()) ||
          topPos
      );
    },
    [moveDown, moveUp, topPos]
  );

  const moveRightPad = useCallback(
    (keyCode) => {
      setTopPos(
        (keyCode === wUp && moveUp()) ||
          (keyCode === sDown && moveDown()) ||
          topPos
      );
    },
    [moveDown, moveUp, topPos]
  );

  const move = useCallback(
    (keyCode) => {
      [arrowUp, arrowDown, wUp, sDown].includes(keyCode) &&
        ((!isRightPad && moveLeftPad(keyCode)) ||
          (isRightPad && moveRightPad(keyCode)));
    },
    [moveRightPad, moveLeftPad, isRightPad]
  );

  const getRightPos = useCallback(() => {
    return leftPos + padWidth;
  }, [leftPos, padWidth]);

  const padPosProps = useMemo(() => {
    return {
      leftPos: isRightPad ? leftPos : getRightPos(),
      topPos: topPos,
      bottomPos: getBottomPos(),
    };
  }, [isRightPad, leftPos, getRightPos, getBottomPos, topPos]);

  const movePad = useCallback(
    (pressedKey) => {
      move(pressedKey.keyCode);
      padPosHandler(padPosProps, isRightPad);
    },
    [padPosHandler, move, isRightPad, padPosProps]
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
