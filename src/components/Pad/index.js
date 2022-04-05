import "./styles.css";

import React, { useCallback, useEffect } from "react";

import { useDoc } from "@syncstate/react";

const Pad = ({
  pad,
  keyCodeUp,
  keyCodeDown,
  padPosPath,
}) => {
  const [padPos, setPadPos] = useDoc(padPosPath);
  // const [playingIsActive, setPlayingIsActive] = useDoc("/playingIsActive");

  const isLeftPad = pad === 1;
  const step = 2;
  const padWidth = 3;
  const padHeight = 25;
  const leftPos = !isLeftPad ? 100 - padWidth : 0;
  const padSurface = !isLeftPad ? 100 - padWidth : 0 + padWidth;

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
  
  const movePad = useCallback(
    (pressedKey) => {
      const keyCode = pressedKey.keyCode;
      
      if(keyCode === keyCodeUp || keyCode === keyCodeDown) {
        const stepUp =
          (keyCode === keyCodeUp && topPos > 0 && topPos - step) || null;
        const stepDown =
          (keyCode === keyCodeDown && getBottomPos() < 100 && topPos + step) ||
          null;

        const newTopPos = stepDown || stepUp || padPos.topPos;

        setPadPos({
          leftPos: padSurface,
          topPos: newTopPos,
          bottomPos: getBottomPos(),
        });
      }
    },
    [padSurface,
      keyCodeUp,
      getBottomPos,
      padPos.topPos,
      setPadPos,
      topPos,
      keyCodeDown,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", movePad);

    return () => {
      document.removeEventListener("keydown", movePad);
    };
  }, [movePad]);

  return <div className="Pad" style={style}></div>;
};

export default Pad;
