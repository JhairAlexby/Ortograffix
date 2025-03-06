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
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold">Desafío {gameState.currentChallenge + 1} de {currentLevel.challenges.length}</h2>
        <Timer 
          seconds={gameState.remainingTime} 
          warningThreshold={30} 
          dangerThreshold={10} 
        />
      </div>

      {/* Visualizador del patrón */}
      <div className="bg-white text-purple-900 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Fórmula mágica:</h3>
        <PatternVisualizer pattern={challenge.pattern} />
        
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700">
          <p>Esta fórmula busca palabras específicas. {challenge.explanation}</p>
        </div>
      </div>

      {/* Área de input */}
      <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={gameState.userInput}
            onChange={handleInputChange}
            className={`w-full p-3 sm:p-4 text-base sm:text-xl rounded-lg border-2 focus:outline-none text-purple-900 ${
              liveValidation?.isValid 
                ? 'border-green-500 bg-green-50' 
                : gameState.userInput 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300'
            }`}
            placeholder="Escribe una palabra que coincida..."
            disabled={gameState.remainingTime <= 0}
          />
          {gameState.userInput && liveValidation && !liveValidation.isValid && liveValidation.errorPosition !== undefined && (
            <div className="absolute top-full mt-1 left-0 bg-red-100 text-red-800 p-2 rounded text-xs sm:text-sm z-10">
              {liveValidation.errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-1 sm:p-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
            disabled={!gameState.userInput || gameState.remainingTime <= 0}
          >
            Comprobar
          </button>
        </div>
      </form>

      {/* Área de resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-6">
        {/* Palabras correctas */}
        <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Palabras correctas</h3>
          {gameState.correctWords.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {gameState.correctWords.map((word, index) => (
                <span key={index} className="bg-green-200 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 italic text-xs sm:text-sm">Aún no has encontrado palabras correctas</p>
          )}
        </div>

        {/* Intentos incorrectos */}
        <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Intentos incorrectos</h3>
          {gameState.incorrectAttempts.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {gameState.incorrectAttempts.map((word, index) => (
                <span key={index} className="bg-red-200 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 italic text-xs sm:text-sm">No hay intentos incorrectos</p>
          )}
        </div>
      </div>

      {/* Pista */}
      <div className="mt-4 sm:mt-6">
        <button
          type="button"
          onClick={toggleHint}
          className="text-yellow-300 hover:text-yellow-100 underline focus:outline-none text-sm sm:text-base"
        >
          {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
        </button>
        {showHint && (
          <div className="mt-2 bg-yellow-100 text-yellow-800 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
            <p>{generateHint(challenge.pattern, gameState.userInput)}</p>
          </div>
        )}
      </div>

      {/* Botón para avanzar */}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <button
          onClick={handleNextChallenge}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-lg text-sm sm:text-base"
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