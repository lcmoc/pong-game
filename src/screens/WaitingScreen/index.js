import "./styles.css";

import { useDoc } from "@syncstate/react";

const WaitingScreen = () => {
  const [activeUser] = useDoc("/activeUser");
  const notEnoughPlayers = activeUser < 2;
  const toManyPlayers = activeUser > 2;

  return (
    <div>
      {notEnoughPlayers && <h2>Waiting for an other player ...</h2>}
      {toManyPlayers && <h2>Game is full, wait for somebody to leave</h2>}
      <p>Player count: {activeUser}</p>
    </div>
  );
};

export default WaitingScreen;
