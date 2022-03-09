import "./styles.css";

import React, { useCallback, useEffect } from "react";

import { useDoc } from "@syncstate/react";

const Pad = ({ playingIsActive, isRightPad = false, keyCodeUp, keyCodeDown, padPosPath}) => {  
  const [padPos, setPadPos] = useDoc(padPosPath);

  const step = 2;
  const padWidth = 3;
  const padHeight = 25;
  const leftPos = isRightPad ? 100 - padWidth : 0;
  const topPos = padPos.topPos;

  const style = {
    top: `${topPos}%`,
    left: `${leftPos}%`,
    width: `${padWidth}%`,
    height: `${padHeight}%`,
  };

  const getBottomPos = useCallback(() => {
    return topPos + padHeight;
  }, [topPos]);

  const getBounceWall = useCallback(() => {
    return !isRightPad ? leftPos + padWidth: leftPos;
  }, [leftPos, padWidth, isRightPad]);

  const moveDown = useCallback(() => {
      setPadPos({
        ...padPos,
        leftPos: getBounceWall(),
        topPos: getBottomPos() < 100 && topPos + step,
        bottomPos: getBottomPos()
      })
  }, [getBottomPos, topPos, padPos, setPadPos, getBounceWall]);

  const moveUp = useCallback(() => {
    setPadPos({
      ...padPos,
      leftPos: getBounceWall(),
      topPos: topPos > 0 && topPos - step,
      bottomPos: getBottomPos()
    });
  }, [topPos, padPos, setPadPos, getBottomPos, getBounceWall]);

  const movePad = useCallback(
    (pressedKey) => {
      const keyCode = pressedKey.keyCode
      
      keyCode === keyCodeUp && moveUp();
      keyCode === keyCodeDown && moveDown();
    },
    [keyCodeUp, keyCodeDown, moveUp, moveDown]
  );

  useEffect(() => {
    document.addEventListener("keydown", movePad);

    return () => {
      document.removeEventListener("keydown", movePad);
    };
  }, [playingIsActive, movePad]);

  return <div className="Pad" style={style}></div>;
};

export default Pad;
