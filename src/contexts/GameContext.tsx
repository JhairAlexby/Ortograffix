import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Definición de interfaces y tipos
export interface Challenge {
  id: number;
  pattern: string;
  explanation: string;
  possibleWords: string[];
  correctWords: string[];
  timeLimit: number; // en segundos
}

export interface Level {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  requiredPoints: number;
}

interface GameState {
  currentLevel: number;
  levels: Level[];
  totalPoints: number;
  currentChallenge: number;
  userInput: string;
  feedback: {
    isCorrect: boolean;
    message: string;
    errorPosition?: number;
  } | null;
  gameStarted: boolean;
  remainingTime: number;
  correctWords: string[];
  incorrectAttempts: string[];
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  checkWord: (word: string) => void;
  setUserInput: (input: string) => void;
  nextChallenge: () => void;
  resetLevel: () => void;
}

// Datos iniciales
const initialLevels: Level[] = [
  {
    id: 1,
    name: "Primer Experimento",
    description: "Encuentra palabras que coincidan con el patrón del científico",
    challenges: [
      {
        id: 1,
        pattern: "^c[aeiou]sa$",
        explanation: "Palabras que empiezan con 'c', siguen con una vocal, luego 's' y terminan con 'a'",
        possibleWords: ["casa", "cesa", "cisa", "cosa", "cusa"],
        correctWords: ["casa"],
        timeLimit: 60
      },
      {
        id: 2,
        pattern: "^m[aeiou]r[aeiou]$",
        explanation: "Palabras que empiezan con 'm', siguen con una vocal, luego 'r', y terminan con una vocal",
        possibleWords: ["mara", "mera", "mira", "mora", "mura"],
        correctWords: ["mira"],
        timeLimit: 60
      },
      {
        id: 3,
        pattern: "^p[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'p', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["pata", "peta", "pita", "pota", "puta"],
        correctWords: ["pata"],
        timeLimit: 60
      },
      {
        id: 4,
        pattern: "^b[aeiou]ll[aeiou]$",
        explanation: "Palabras que empiezan con 'b', siguen con una vocal, luego 'll', y terminan con una vocal",
        possibleWords: ["balla", "belle", "belli", "bollo", "bulla"],
        correctWords: ["bella"],
        timeLimit: 60
      }
    ],
    requiredPoints: 4 // Se necesitan 4 puntos para completar el nivel
  }
];

const initialState: GameState = {
  currentLevel: 0,
  levels: initialLevels,
  totalPoints: 0,
  currentChallenge: 0,
  userInput: '',
  feedback: null,
  gameStarted: false,
  remainingTime: 0,
  correctWords: [],
  incorrectAttempts: []
};

// Creación del contexto
const GameContext = createContext<GameContextType | undefined>(undefined);

// Proveedor del contexto
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Timer para el desafío actual
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (gameState.gameStarted && gameState.remainingTime > 0) {
      timer = setInterval(() => {
        setGameState(prevState => ({
          ...prevState,
          remainingTime: prevState.remainingTime - 1
        }));
      }, 1000);
    } else if (gameState.remainingTime === 0 && gameState.gameStarted) {
      // Tiempo agotado
      setGameState(prevState => ({
        ...prevState,
        feedback: {
          isCorrect: false,
          message: '¡Tiempo agotado! Inténtalo de nuevo.'
        }
      }));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.gameStarted, gameState.remainingTime]);

  // Iniciar el juego
  const startGame = () => {
    const currentLevelData = initialState.levels[initialState.currentLevel];
    const currentChallengeData = currentLevelData.challenges[initialState.currentChallenge];
    
    setGameState({
      ...initialState,
      gameStarted: true,
      remainingTime: currentChallengeData.timeLimit
    });
  };

  // Validar si la palabra coincide con el patrón
  const checkWord = (word: string) => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    const challenge = currentLevel.challenges[gameState.currentChallenge];
    
    // Verificar si la palabra ya fue encontrada correctamente
    if (gameState.correctWords.includes(word)) {
      setGameState(prevState => ({
        ...prevState,
        feedback: {
          isCorrect: false,
          message: '¡Ya has encontrado esta palabra!'
        }
      }));
      return;
    }
    
    // Verificar si la palabra es correcta
    if (challenge.correctWords.includes(word)) {
      const newCorrectWords = [...gameState.correctWords, word];
      const newPoints = gameState.totalPoints + 1;
      
      setGameState(prevState => ({
        ...prevState,
        totalPoints: newPoints,
        correctWords: newCorrectWords,
        feedback: {
          isCorrect: true,
          message: '¡Correcto! Has encontrado una palabra válida.'
        },
        userInput: ''
      }));
    } else {
      // La palabra no coincide con el patrón, analizar dónde está el error
      const pattern = new RegExp(challenge.pattern);
      let errorPosition = -1;
      let errorMessage = "Esta palabra no coincide con el patrón.";
      
      // Identificar posible posición del error (simplificado)
      if (word.length > 0) {
        if (!word.startsWith(challenge.pattern.substring(1, 2))) {
          errorPosition = 0;
          errorMessage = "El inicio de la palabra no coincide con el patrón.";
        } else if (word.length > 1 && !pattern.test(word)) {
          // Verificar problemas con vocales o consonantes específicas
          const patternParts = challenge.pattern.slice(1, -1).split('');
          for (let i = 0; i < word.length; i++) {
            if (patternParts[i] === '[aeiou]' && !/[aeiou]/.test(word[i])) {
              errorPosition = i;
              errorMessage = "Aquí debería haber una vocal (a, e, i, o, u).";
              break;
            }
          }
        }
      }
      
      // Guardar el intento incorrecto
      const newIncorrectAttempts = [...gameState.incorrectAttempts, word];
      
      setGameState(prevState => ({
        ...prevState,
        incorrectAttempts: newIncorrectAttempts,
        feedback: {
          isCorrect: false,
          message: errorMessage,
          errorPosition: errorPosition !== -1 ? errorPosition : undefined
        }
      }));
    }
  };

  // Actualizar el input del usuario
  const setUserInput = (input: string) => {
    setGameState(prevState => ({
      ...prevState,
      userInput: input,
      feedback: null
    }));
  };

  // Pasar al siguiente desafío
  const nextChallenge = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    
    // Verificar si hay más desafíos en el nivel actual
    if (gameState.currentChallenge < currentLevel.challenges.length - 1) {
      const nextChallengeIndex = gameState.currentChallenge + 1;
      const nextChallenge = currentLevel.challenges[nextChallengeIndex];
      
      setGameState(prevState => ({
        ...prevState,
        currentChallenge: nextChallengeIndex,
        userInput: '',
        feedback: null,
        correctWords: [],
        incorrectAttempts: [],
        remainingTime: nextChallenge.timeLimit
      }));
    } else {
      // Nivel completado
      const hasEnoughPoints = gameState.totalPoints >= currentLevel.requiredPoints;
      
      if (hasEnoughPoints && gameState.currentLevel < gameState.levels.length - 1) {
        // Avanzar al siguiente nivel
        const nextLevelIndex = gameState.currentLevel + 1;
        const nextLevel = gameState.levels[nextLevelIndex];
        
        setGameState(prevState => ({
          ...prevState,
          currentLevel: nextLevelIndex,
          currentChallenge: 0,
          userInput: '',
          feedback: {
            isCorrect: true,
            message: `¡Nivel completado! Avanzando al nivel: ${nextLevel.name}`
          },
          correctWords: [],
          incorrectAttempts: [],
          remainingTime: nextLevel.challenges[0].timeLimit
        }));
      } else if (hasEnoughPoints) {
        // Juego completado
        setGameState(prevState => ({
          ...prevState,
          gameStarted: false,
          feedback: {
            isCorrect: true,
            message: '¡Felicidades! Has completado todos los niveles.'
          }
        }));
      } else {
        // No tiene suficientes puntos para avanzar
        setGameState(prevState => ({
          ...prevState,
          feedback: {
            isCorrect: false,
            message: `Necesitas ${currentLevel.requiredPoints} puntos para completar este nivel. ¡Inténtalo de nuevo!`
          }
        }));
      }
    }
  };

  // Reiniciar el nivel actual
  const resetLevel = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    
    setGameState(prevState => ({
      ...prevState,
      currentChallenge: 0,
      userInput: '',
      totalPoints: 0,
      feedback: null,
      correctWords: [],
      incorrectAttempts: [],
      remainingTime: currentLevel.challenges[0].timeLimit
    }));
  };

  const value = {
    gameState,
    startGame,
    checkWord,
    setUserInput,
    nextChallenge,
    resetLevel
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Hook para acceder al contexto
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};