import './App.css';

import Pong from './screens/Pong';
import WaitingScreen from './screens/WaitingScreen';
import { useDoc } from '@syncstate/react';

function App() {
  const [activeUser, setActiveUser] = useDoc("/activeUser");
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pong Game</h1>
      </header>
      <main className='App-Main'>
      {activeUser !== 2 ? <WaitingScreen /> : <Pong />}
      </main>
    </div>
  );
}

export default App;
