import "./styles.css";

import React, { useCallback, useEffect } from "react";

import { useDoc } from "@syncstate/react";

const Pad = ({
  pad = 1,
  keyCodeUp,
  keyCodeDown,
  padPosPath,
}) => {
  const [padPos, setPadPos] = useDoc(padPosPath);
  const [playingIsActive, setPlayingIsActive] = useDoc("/playingIsActive");

  const step = 2;
  const padWidth = 3;
  const padHeight = 25;
  const leftPos = pad === 2 ? 100 - padWidth : 0;
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
    const bounceWallPos =
      (pad === 2 && leftPos) || (pad === 1 && leftPos + padWidth);
    return bounceWallPos;
  }, [leftPos, padWidth, pad]);

  const move = useCallback(
    (keyCode) => {
      const stepUp =
        (keyCode === keyCodeUp && topPos > 0 && topPos - step) || null;
      const stepDown =
        (keyCode === keyCodeDown && getBottomPos() < 100 && topPos + step) ||
        null;

      const newTopPos = stepDown || stepUp || padPos.topPos;

      setPadPos({
        leftPos: getBounceWall(),
        topPos: newTopPos,
        bottomPos: getBottomPos(),
      });
    },
    [
      keyCodeUp,
      getBottomPos,
      getBounceWall,
      padPos.topPos,
      setPadPos,
      topPos,
      keyCodeDown,
    ]
  );

  const movePad = useCallback(
    (pressedKey) => { 
      move(pressedKey.keyCode);
    },
    [move]
  );

  useEffect(() => {
    playingIsActive && document.addEventListener("keydown", movePad);

    return () => {
      document.removeEventListener("keydown", movePad);
    };
  }, [playingIsActive, movePad]);

  return <div className="Pad" style={style}></div>;
};

export default Pad;
