import './styles.css'

import React, { useCallback, useEffect, useState } from 'react';

const Ball = ({playingIsActive, increaseCounter}) => {
    const [topPos, setTopPos] = useState(50);
    const [leftPos, setLeftPos] = useState(50);
    const [direction, setDirection] = useState({y: Math.random() < 0.5, x: Math.random() < 0.5});

    const getRightPos = useCallback( () => {
        return leftPos + ballWidth;
    }, [leftPos]) ;

    const step = 1;
    const ballHeight = 4;
    const ballWidth = 2
    const isInRightGoal = getRightPos() >= 100;
    const isInLeftGoal = leftPos <= 0;

    const style = {
        top: `${topPos}%`,
        left: `${leftPos}%`,   
        height: `${ballHeight}%`,   
        width: `${ballWidth}%`, 
    }

    const isGoalCollision = useCallback(() => {        
        return (isInRightGoal || isInLeftGoal);
    }, [isInLeftGoal, isInRightGoal]);

    useEffect(() => {

        const reinitialize = () => {
            increaseCounter(isInRightGoal, isInLeftGoal);
            setTopPos(50);
            setLeftPos(50);
            setDirection({y: Math.random() < 0.5, x: Math.random() < 0.5});
        };
        
        const getBottomPos = () => {
            return topPos + ballHeight;
        };

        const doStep = () => {
            setLeftPos( direction.x ? leftPos + step : leftPos - step);
            setTopPos(direction.y ? topPos + step : topPos - step);    
        };

        const wallCollision = () => {
            if(getBottomPos() === 100) {
                setDirection({...direction, y: false});
            } else if(topPos === 0) {
                setDirection({...direction, y: true});
            }
        };
        
        const gameIntervalId = playingIsActive && !isGoalCollision() && setInterval(() => {
            wallCollision();      
            //padCollision()
            doStep();
        }, 50);

        isGoalCollision() && reinitialize();

        return () => clearInterval(gameIntervalId);
    }, [leftPos, topPos, playingIsActive, direction, increaseCounter, isGoalCollision, isInRightGoal, isInLeftGoal]);
    
    return(
        <div className='Ball' style={style}></div>
    )
};

export default Ball;
