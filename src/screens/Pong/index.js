import './styles.css'

import React, {useState} from 'react';

import Score from "../../components/Score";
import Table from "../../components/Table";

const Pong = () => {
    const [playingIsActive, setPlayingIsActive] = useState(false);

    return(
        <>
            <Score />
            <Table playingIsActive={playingIsActive}/>
            <button onClick={() => setPlayingIsActive(!playingIsActive)} className="PlayButton"> {playingIsActive ? 'Stop' : 'Start'}</button>
        </>
    )
};

export default Pong;
