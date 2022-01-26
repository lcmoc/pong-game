import './App.css';

import Pong from './screens/Pong';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pong Game</h1>
      </header>
      <main className='App-Main'>
        <Pong />
      </main>
    </div>
  );
}

export default App;
