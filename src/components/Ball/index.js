import './styles.css'

import React, { useEffect, useState } from 'react';

const Ball = ({playingIsActive}) => {
    const [topPos, setTopPos] = useState(50);
    const [leftPos, setLeftPos] = useState(50);
    const speed = 1;

    useEffect(() => {
        const gameIntervalId = playingIsActive && setInterval(() => {
            setLeftPos(leftPos + speed);
            setTopPos(topPos + speed);
        }, 1000);

        return () => clearInterval(gameIntervalId);
    }, [leftPos, topPos, playingIsActive]);
    

    return(
        <div className='Ball' style={{top: `${topPos}%`, left: `${leftPos}%`}}></div>
    )
};

export default Ball;
