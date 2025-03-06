import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import Timer from './common/Timer';
import PatternVisualizer from './game/PatternVisualizer';
import { validateWord, generateHint } from '../services/regexService';

const Challenge: React.FC = () => {
  const { gameState, setUserInput, checkWord, nextChallenge } = useGame();
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const currentLevel = gameState.levels[gameState.currentLevel];
  const challenge = currentLevel.challenges[gameState.currentChallenge];

  // Efecto para enfocar el input cuando cambia el desafío
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.currentChallenge]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState.userInput.trim()) {
      checkWord(gameState.userInput.trim());
    }
  };

  const handleNextChallenge = () => {
    nextChallenge();
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Genera una validación en tiempo real para retroalimentación visual
  const getLiveValidation = () => {
    if (!gameState.userInput) return null;
    
    return validateWord(gameState.userInput, challenge.pattern);
  };

  const liveValidation = getLiveValidation();

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Desafío {gameState.currentChallenge + 1} de {currentLevel.challenges.length}</h2>
        <Timer 
          seconds={gameState.remainingTime} 
          warningThreshold={30} 
          dangerThreshold={10} 
        />
      </div>

      {/* Visualizador del patrón */}
      <div className="bg-white text-purple-900 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Fórmula mágica:</h3>
        <PatternVisualizer pattern={challenge.pattern} />
        
        <div className="mt-4 text-sm text-gray-700">
          <p>Esta fórmula busca palabras específicas. {challenge.explanation}</p>
        </div>
      </div>

      {/* Área de input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={gameState.userInput}
            onChange={handleInputChange}
            className={`w-full p-4 text-xl rounded-lg border-2 focus:outline-none text-purple-900 ${
              liveValidation?.isValid 
                ? 'border-green-500 bg-green-50' 
                : gameState.userInput 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300'
            }`}
            placeholder="Escribe una palabra que coincida con el patrón..."
            disabled={gameState.remainingTime <= 0}
          />
          {gameState.userInput && liveValidation && !liveValidation.isValid && liveValidation.errorPosition !== undefined && (
            <div className="absolute top-full mt-1 left-0 bg-red-100 text-red-800 p-2 rounded text-sm">
              {liveValidation.errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="absolute right-2 top-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
            disabled={!gameState.userInput || gameState.remainingTime <= 0}
          >
            Comprobar
          </button>
        </div>
      </form>

      {/* Área de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Palabras correctas */}
        <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Palabras correctas</h3>
          {gameState.correctWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {gameState.correctWords.map((word, index) => (
                <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 italic">Aún no has encontrado palabras correctas</p>
          )}
        </div>

        {/* Intentos incorrectos */}
        <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Intentos incorrectos</h3>
          {gameState.incorrectAttempts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {gameState.incorrectAttempts.map((word, index) => (
                <span key={index} className="bg-red-200 text-red-800 px-3 py-1 rounded-full">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 italic">No hay intentos incorrectos</p>
          )}
        </div>
      </div>

      {/* Pista */}
      <div className="mt-6">
        <button
          type="button"
          onClick={toggleHint}
          className="text-yellow-300 hover:text-yellow-100 underline focus:outline-none"
        >
          {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
        </button>
        {showHint && (
          <div className="mt-2 bg-yellow-100 text-yellow-800 p-3 rounded-lg">
            <p>{generateHint(challenge.pattern, gameState.userInput)}</p>
          </div>
        )}
      </div>

      {/* Botón para avanzar */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNextChallenge}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          {gameState.currentChallenge < currentLevel.challenges.length - 1 
            ? 'Siguiente Desafío →' 
            : 'Completar Nivel ✓'}
        </button>
      </div>
    </div>
  );
};

export default Challenge;