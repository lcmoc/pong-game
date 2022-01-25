import "./styles.css";

import React, { useState } from "react";

const PlayButton = () => {
  const [playing, setPlaying] = useState(false);

  return <button onClick={() => setPlaying(!playing)} className="PlayButton"> {playing ? 'Stop' : 'Start'}</button>;
};

export default PlayButton;
