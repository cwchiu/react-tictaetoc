import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe from "./containers/TicTacToe";
function App() {
  const [setting, setSetting] = useState({
    gameScale: 3,
    winnerCondition: 3,
    isSinglePlayer: true
  });
  return (
    <div className="App">
            <TicTacToe
        setting={setting}
        setSetting={setSetting}
      />
    </div>
  );
}

export default App;
