import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface Challenge {
  id: number;
  pattern: string;
  explanation: string;
  possibleWords: string[];
  correctWords: string[];
  timeLimit: number; 
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
      },
      {
        id: 5,
        pattern: "^t[aeiou]c[aeiou]$",
        explanation: "Palabras que empiezan con 't', siguen con una vocal, luego 'c', y terminan con una vocal",
        possibleWords: ["taca", "teca", "tica", "toca", "tuca"],
        correctWords: ["toca"],
        timeLimit: 60
      },
      {
        id: 6,
        pattern: "^l[aeiou]p[aeiou]$",
        explanation: "Palabras que empiezan con 'l', siguen con una vocal, luego 'p', y terminan con una vocal",
        possibleWords: ["lapa", "lepa", "lipa", "lopa", "lupa"],
        correctWords: ["lupa"],
        timeLimit: 60
      },
      {
        id: 7,
        pattern: "^n[aeiou]v[aeiou]$",
        explanation: "Palabras que empiezan con 'n', siguen con una vocal, luego 'v', y terminan con una vocal",
        possibleWords: ["nava", "neva", "niva", "nova", "nuva"],
        correctWords: ["nave"],
        timeLimit: 60
      },
      {
        id: 8,
        pattern: "^s[aeiou]l[aeiou]$",
        explanation: "Palabras que empiezan con 's', siguen con una vocal, luego 'l', y terminan con una vocal",
        possibleWords: ["sala", "sela", "sila", "sola", "sula"],
        correctWords: ["sala"],
        timeLimit: 60
      },
      {
        id: 9,
        pattern: "^r[aeiou]m[aeiou]$",
        explanation: "Palabras que empiezan con 'r', siguen con una vocal, luego 'm', y terminan con una vocal",
        possibleWords: ["rama", "rema", "rima", "roma", "ruma"],
        correctWords: ["rama"],
        timeLimit: 60
      },
      {
        id: 10,
        pattern: "^g[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'g', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["gata", "geta", "gita", "gota", "guta"],
        correctWords: ["gata"],
        timeLimit: 60
      },
      {
        id: 11,
        pattern: "^d[aeiou]l[aeiou]$",
        explanation: "Palabras que comienzan con 'd', siguen con una vocal, luego 'l' y terminan con una vocal",
        possibleWords: ["dala", "dela", "dila", "dola", "dula"],
        correctWords: ["dela"],
        timeLimit: 60
      },
      {
        id: 12,
        pattern: "^f[aeiou]n[aeiou]$",
        explanation: "Palabras que empiezan con 'f', siguen con una vocal, luego 'n', y terminan con una vocal",
        possibleWords: ["fana", "fena", "fina", "fona", "funa"],
        correctWords: ["fina"],
        timeLimit: 60
      },
      {
        id: 13,
        pattern: "^p[aeiou]s[aeiou]$",
        explanation: "Palabras que empiezan con 'p', siguen con una vocal, luego 's', y terminan con una vocal",
        possibleWords: ["pasa", "pesa", "pisa", "posa", "pusa"],
        correctWords: ["pasa"],
        timeLimit: 60
      },
      {
        id: 14,
        pattern: "^m[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'm', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["mata", "meta", "mita", "mota", "muta"],
        correctWords: ["meta"],
        timeLimit: 60
      },
      {
        id: 15,
        pattern: "^r[aeiou]p[aeiou]$",
        explanation: "Palabras que empiezan con 'r', siguen con una vocal, luego 'p', y terminan con una vocal",
        possibleWords: ["rapa", "repa", "ripa", "ropa", "rupa"],
        correctWords: ["ropa"],
        timeLimit: 60
      },
      {
        id: 16,
        pattern: "^p[aeiou]dr[aeiou]$",
        explanation: "Palabras que empiezan con 'p', siguen con una vocal, luego 'dr' y terminan con una vocal",
        possibleWords: ["padre", "pedra", "pidro", "podru", "pudri"],
        correctWords: ["padre"],
        timeLimit: 60
      },
      {
        id: 17,
        pattern: "^tr[aeiou]b[aeiou]$",
        explanation: "Palabras que comienzan con 'tr', siguen con una vocal, luego 'b' y terminan con una vocal",
        possibleWords: ["traba", "trebo", "tribu", "troba", "trubu"],
        correctWords: ["traba"],
        timeLimit: 60
      },
      {
        id: 18,
        pattern: "^gr[aeiou]p[aeiou]$",
        explanation: "Palabras que comienzan con 'gr', siguen con una vocal, luego 'p' y terminan con una vocal",
        possibleWords: ["grapa", "grepe", "gripi", "gropo", "grupu"],
        correctWords: ["grapa"],
        timeLimit: 60
      },
      {
        id: 19,
        pattern: "^br[aeiou]s[aeiou]$",
        explanation: "Palabras que comienzan con 'br', siguen con una vocal, luego 's' y terminan con una vocal",
        possibleWords: ["brasa", "brese", "brisi", "broso", "brusu"],
        correctWords: ["brasa"],
        timeLimit: 60
      },
      {
        id: 20,
        pattern: "^cl[aeiou]p[aeiou]$",
        explanation: "Palabras que comienzan con 'cl', siguen con una vocal, luego 'p' y terminan con una vocal",
        possibleWords: ["clapa", "clepe", "clipi", "clopo", "clupu"],
        correctWords: ["clapa"],
        timeLimit: 60
      },
      {
        id: 21,
        pattern: "^fl[aeiou]t[aeiou]$",
        explanation: "Palabras que comienzan con 'fl', siguen con una vocal, luego 't' y terminan con una vocal",
        possibleWords: ["flata", "flete", "fliti", "floto", "flutu"],
        correctWords: ["flota"],
        timeLimit: 60
      },
      {
        id: 22,
        pattern: "^tr[aeiou]n[aeiou]$",
        explanation: "Palabras que comienzan con 'tr', siguen con una vocal, luego 'n' y terminan con una vocal",
        possibleWords: ["trana", "trene", "trini", "trono", "trunu"],
        correctWords: ["trono"],
        timeLimit: 60
      },
      {
        id: 23,
        pattern: "^fr[aeiou]g[aeiou]$",
        explanation: "Palabras que comienzan con 'fr', siguen con una vocal, luego 'g' y terminan con una vocal",
        possibleWords: ["fraga", "frege", "frigi", "frogo", "frugu"],
        correctWords: ["fraga"],
        timeLimit: 60
      },
      {
        id: 24,
        pattern: "^pl[aeiou]m[aeiou]$",
        explanation: "Palabras que comienzan con 'pl', siguen con una vocal, luego 'm' y terminan con una vocal",
        possibleWords: ["plama", "pleme", "plimi", "plomo", "plumu"],
        correctWords: ["plomo"],
        timeLimit: 60
      },
      {
        id: 25,
        pattern: "^dr[aeiou]p[aeiou]$",
        explanation: "Palabras que comienzan con 'dr', siguen con una vocal, luego 'p' y terminan con una vocal",
        possibleWords: ["drapa", "dripe", "drapo", "drope", "drupa"],
        correctWords: ["drape"],
        timeLimit: 60
      },
      {
        id: 26,
        pattern: "^bl[aeiou]s[aeiou]$",
        explanation: "Palabras que comienzan con 'bl', siguen con una vocal, luego 's' y terminan con una vocal",
        possibleWords: ["blasa", "blese", "bliso", "bloso", "blusa"],
        correctWords: ["blusa"],
        timeLimit: 60
      },
      {
        id: 27,
        pattern: "^gr[aeiou]m[aeiou]$",
        explanation: "Palabras que comienzan con 'gr', siguen con una vocal, luego 'm' y terminan con una vocal",
        possibleWords: ["grama", "greme", "grimi", "gromo", "grumu"],
        correctWords: ["grama"],
        timeLimit: 60
      },
      {
        id: 28,
        pattern: "^sn[aeiou]k[aeiou]$",
        explanation: "Palabras que comienzan con 'sn', siguen con una vocal, luego 'k' y terminan con una vocal",
        possibleWords: ["snake", "sneke", "sniko", "snaka", "snuku"],
        correctWords: ["snake"],
        timeLimit: 60
      },
      {
        id: 29,
        pattern: "^tw[aeiou]s[aeiou]$",
        explanation: "Palabras que comienzan con 'tw', siguen con una vocal, luego 's' y terminan con una vocal",
        possibleWords: ["twasa", "twese", "twiso", "twoso", "twusa"],
        correctWords: ["twist"],
        timeLimit: 60
      },
      {
        id: 30,
        pattern: "^sc[aeiou]t[aeiou]$",
        explanation: "Palabras que comienzan con 'sc', siguen con una vocal, luego 't' y terminan con una vocal",
        possibleWords: ["scata", "scete", "sciti", "scoto", "scutu"],
        correctWords: ["scota"],
        timeLimit: 60
      }
    ],
    requiredPoints: 6 // puntos para ganar (cambiar al mimso numero de desafios) 
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

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

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

  const startGame = () => {
    const currentLevelData = initialState.levels[initialState.currentLevel];
    const currentChallengeData = currentLevelData.challenges[initialState.currentChallenge];
    
    setGameState({
      ...initialState,
      gameStarted: true,
      remainingTime: currentChallengeData.timeLimit
    });
  };

  const checkWord = (word: string) => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    const challenge = currentLevel.challenges[gameState.currentChallenge];
    
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
      const pattern = new RegExp(challenge.pattern);
      let errorPosition = -1;
      let errorMessage = "Esta palabra no coincide con el patrón.";
      
      if (word.length > 0) {
        if (!word.startsWith(challenge.pattern.substring(1, 2))) {
          errorPosition = 0;
          errorMessage = "El inicio de la palabra no coincide con el patrón.";
        } else if (word.length > 1 && !pattern.test(word)) {
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

  const setUserInput = (input: string) => {
    setGameState(prevState => ({
      ...prevState,
      userInput: input,
      feedback: null
    }));
  };

  const nextChallenge = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    
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
      const hasEnoughPoints = gameState.totalPoints >= currentLevel.requiredPoints;
      
      if (hasEnoughPoints && gameState.currentLevel < gameState.levels.length - 1) {
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
        setGameState(prevState => ({
          ...prevState,
          gameStarted: false,
          feedback: {
            isCorrect: true,
            message: '¡Felicidades! Has completado todos los niveles.'
          }
        }));
      } else {
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

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};