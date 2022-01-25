import './App.css';

import PlayButton from './components/PlayButton';
import Score from './components/Score';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pong Game</h1>
      </header>
      <main className='App-Main'>
        <Score />
        <Table />
        <PlayButton />
      </main>
    </div>
  );
}

export default App;
