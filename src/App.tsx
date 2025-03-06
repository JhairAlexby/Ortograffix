import { useState } from 'react';
import './App.css';
import { GameProvider } from './contexts/GameContext';
import Laboratory from './components/Laboratory';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <Laboratory />
      </div>
    </GameProvider>
  );
}

export default App;