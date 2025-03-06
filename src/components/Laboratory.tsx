import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import Challenge from './Challenge';
import ScientistCharacter from './common/ScientistCharacter';
import Flask from './laboratory/Flask';

const Laboratory: React.FC = () => {
  const { gameState, startGame } = useGame();
  const [showIntro, setShowIntro] = useState(true);
  const [animateScientist, setAnimateScientist] = useState(false);

  // Efecto para animar al científico cuando hay feedback
  useEffect(() => {
    if (gameState.feedback) {
      setAnimateScientist(true);
      const timer = setTimeout(() => {
        setAnimateScientist(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.feedback]);

  const handleStartGame = () => {
    setShowIntro(false);
    startGame();
  };

  // Renderiza la introducción del juego
  const renderIntro = () => (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <h1 className="text-4xl font-bold text-center text-purple-800">El Laboratorio de Palabras</h1>
      
      <div className="text-center mb-4">
        <ScientistCharacter animate={false} size="large" mood="happy" />
        <p className="text-xl mt-4 text-gray-700">
          ¡Bienvenido a mi laboratorio mágico de palabras! Soy el profesor Letralocas y necesito tu ayuda para completar mis experimentos.
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">¿Cómo jugar?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Te mostraré una <strong>fórmula mágica</strong> (expresión regular) que describe un patrón de letras.</li>
          <li>Tu misión es escribir palabras que coincidan con ese patrón.</li>
          <li>Por cada palabra correcta, ganarás puntos.</li>
          <li>Completa cada desafío para avanzar al siguiente nivel.</li>
        </ul>
      </div>

      <div className="bg-purple-100 p-4 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Guía de los Patrones</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>^</strong> - Indica el inicio de la palabra.</li>
          <li><strong>[aeiou]</strong> - Representa cualquier vocal (a, e, i, o, u).</li>
          <li><strong>$</strong> - Indica el final de la palabra.</li>
        </ul>
        <p className="mt-2 text-gray-700">Por ejemplo, <strong>^c[aeiou]sa$</strong> busca palabras que empiezan con "c", siguen con cualquier vocal, luego "s" y terminan con "a".</p>
      </div>

      <button
        onClick={handleStartGame}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all transform hover:scale-105"
      >
        ¡Comenzar la Aventura!
      </button>
    </div>
  );

  // Renderiza el laboratorio con el desafío actual
  const renderLaboratory = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    const challenge = currentLevel.challenges[gameState.currentChallenge];

    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Cabecera */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">El Laboratorio de Palabras</h1>
              <p className="text-lg">Nivel {currentLevel.id}: {currentLevel.name}</p>
            </div>
            <div className="bg-purple-800 rounded-lg p-3 text-center">
              <p className="text-sm opacity-80">Puntos</p>
              <p className="text-2xl font-bold">{gameState.totalPoints}/{currentLevel.requiredPoints}</p>
            </div>
          </header>

          {/* Área principal del laboratorio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Científico y diálogo */}
            <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 flex flex-col items-center justify-center">
              <ScientistCharacter 
                animate={animateScientist} 
                mood={gameState.feedback?.isCorrect ? "excited" : gameState.feedback ? "confused" : "thinking"} 
                size="medium" 
              />
              
              <div className="mt-4 bg-white text-indigo-900 p-4 rounded-lg relative speech-bubble">
                {gameState.feedback ? (
                  <p className={`text-lg ${gameState.feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {gameState.feedback.message}
                  </p>
                ) : (
                  <p className="text-lg">
                    Experimento {gameState.currentChallenge + 1}: {challenge.explanation}
                  </p>
                )}
              </div>
            </div>

            {/* Panel central - Desafío actual */}
            <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 col-span-1 lg:col-span-2">
              <Challenge />
            </div>
          </div>

          {/* Frascos con fórmulas y palabras */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {gameState.levels[gameState.currentLevel].challenges.map((c, index) => (
              <Flask
                key={c.id}
                active={index === gameState.currentChallenge}
                completed={index < gameState.currentChallenge}
                formula={c.pattern}
                color={index % 2 === 0 ? "blue" : "purple"}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {showIntro ? renderIntro() : renderLaboratory()}
    </div>
  );
};

export default Laboratory;