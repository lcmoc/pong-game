import './styles.css'

import React, { useEffect, useState } from 'react';

const Pad = () => {
    const [topPos, setTopPos] = useState(50);
    const step = 10

    document.addEventListener('keydown', (pressedKey) => movePad(pressedKey));

    const movePad = (pressedKey) => {
        if(pressedKey.keyCode === 40) { // arrow down
            setTopPos(topPos + step);
        } else if(pressedKey.keyCode === 38) { // arrow up
            setTopPos(topPos - step);
        }
    };
    
    const style = {
        top: `${topPos}%`,
        left: `${topPos}%`,
        right: `${topPos}%`
    }

    return(
        <div className='Pad' style={style}></div>
    )
};

export default Pad;