import React, { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import Challenge from "./Challenge";
import ScientistCharacter from "./common/ScientistCharacter";
import ExperimentPath from "./laboratory/ExperimentPath";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Beaker, Star, Brain, Book, PlayCircle, RefreshCw, Home } from "lucide-react";

const Laboratory: React.FC = () => {
  const { gameState, startGame, resetGame } = useGame();
  const [showIntro, setShowIntro] = useState(true);
  const [animateScientist, setAnimateScientist] = useState(false);

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

  const handleRestartGame = () => {
    resetGame();
  };

  const handleReturnToMenu = () => {
    resetGame();
    setShowIntro(true);
  };

  const renderGameOver = () => {
    return (
      <div className="w-full">
        <div className="container max-w-5xl mx-auto px-4 pt-8 pb-16 flex items-center justify-center">
          <Card className="magical-pattern shadow-xl border-none overflow-hidden w-full">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-lg mb-2">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <Beaker className="h-10 w-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-red-700">
                ¡Experimento Fallido!
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Buen intento, pero se agotó el tiempo
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6 pt-0">
              <div className="flex justify-center mb-8">
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl">
                  <ScientistCharacter animate={false} size="large" mood="confused" />
                </div>
              </div>
              
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Book className="inline mr-2 h-5 w-5" /> Mensaje del Profesor
                </h2>
                <p className="text-gray-700 mb-4">
                  {gameState.feedback?.message || "¡Oh no! No pudiste completar el experimento a tiempo. El profesor Letralocas necesita tu ayuda para completar todos los desafíos."}
                </p>
                <p className="text-gray-700">
                  No te preocupes, ¡la ciencia se basa en intentarlo una y otra vez! Vamos a limpiar el laboratorio y comenzar de nuevo con nuestros experimentos mágicos.
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleRestartGame}
                  variant="glow"
                  size="lg"
                  className="gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  ¡Reiniciar Experimentos!
                </Button>
                
                <Button
                  onClick={handleReturnToMenu}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Home className="h-5 w-5" />
                  Volver al Menú
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderIntro = () => (
    <div className="w-full">
      <div className="container max-w-5xl mx-auto px-4 pt-8 pb-16 flex items-center justify-center">
        <Card className="magical-pattern shadow-xl border-none overflow-hidden w-full">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-lg mb-2">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Beaker className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-blue-700">
              El Laboratorio de Palabras
            </CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              Una aventura mágica para aprender jugando
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6 pt-0">
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div className="flex justify-center">
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl">
                  <ScientistCharacter animate={false} size="large" mood="happy" />
                </div>
              </div>
              
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Book className="inline mr-2 h-5 w-5" /> Bienvenido
                </h2>
                <p className="text-gray-700 mb-4">
                  ¡Hola! Soy el profesor Letralocas y necesito tu ayuda para completar mis experimentos con palabras mágicas.
                </p>
                <p className="text-gray-700">
                  Juntos descifraremos fórmulas mágicas y crearemos las palabras correctas para que mis experimentos sean todo un éxito.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/30 backdrop-blur-sm border-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-1">
                    <Brain className="h-5 w-5 mr-2 text-blue-700" />
                    <CardTitle className="text-lg text-gray-800">¿Cómo jugar?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs">1</span>
                      <span>Te mostraré una <strong>fórmula mágica</strong> que describe un patrón de letras.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs">2</span>
                      <span>Tu misión es escribir palabras que coincidan con el patrón.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs">3</span>
                      <span>Por cada palabra correcta, ganarás puntos para avanzar.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs">4</span>
                      <span><strong>¡Cuidado!</strong> Si se acaba el tiempo en cualquier desafío, ¡perderás y tendrás que comenzar de nuevo!</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/30 backdrop-blur-sm border-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-1">
                    <Star className="h-5 w-5 mr-2 text-yellow-600" />
                    <CardTitle className="text-lg text-gray-800">Guía de Patrones</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Badge className="bg-blue-500/50 border-0 shrink-0 mt-0.5 text-blue-900">^</Badge>
                      <span>Indica el <strong>inicio</strong> de la palabra.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="bg-blue-500/50 border-0 shrink-0 mt-0.5 text-blue-900">[aeiou]</Badge>
                      <span>Representa <strong>cualquier vocal</strong> (a, e, i, o, u).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="bg-blue-500/50 border-0 shrink-0 mt-0.5 text-blue-900">$</Badge>
                      <span>Indica el <strong>final</strong> de la palabra.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button
                onClick={handleStartGame}
                variant="glow"
                size="lg"
                className="gap-2"
              >
                <PlayCircle className="h-5 w-5" />
                ¡Comenzar la Aventura!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLaboratory = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    const challenge = currentLevel.challenges[gameState.currentChallenge];
    const completedChallenges = Array.from({ length: gameState.currentChallenge }, (_, i) => i);

    return (
      <div className="laboratory-pattern text-foreground w-full">
        <div className="container">
          {/* Cabecera */}
          <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <Beaker className="h-6 w-6 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                  El Laboratorio de Palabras
                </span>
              </h1>
              <p className="text-muted-foreground">
                Nivel {currentLevel.id}: {currentLevel.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10">
                <Star className="h-3 w-3 mr-1 text-yellow-400" />
                <span>Puntos: {gameState.totalPoints}/{currentLevel.requiredPoints}</span>
              </Badge>
              
              <Button
                onClick={handleReturnToMenu}
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Volver al Menú</span>
              </Button>
            </div>
          </header>

          <Separator className="mb-6" />

          {/* Contenedor principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
            {/* Columna izquierda - Personaje y mensaje */}
            <div className="lg:col-span-1 flex flex-col items-center justify-start gap-4 w-full">
              <Card className="w-full bg-primary/5 backdrop-blur-sm border-primary/10">
                <CardContent className="p-6 flex flex-col items-center">
                  <ScientistCharacter
                    animate={animateScientist}
                    mood={
                      gameState.feedback?.isCorrect
                        ? "excited"
                        : gameState.feedback
                        ? "confused"
                        : "thinking"
                    }
                    size="medium"
                  />

                  <div className="mt-4 w-full">
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        gameState.feedback
                          ? gameState.feedback.isCorrect
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                          : "bg-accent/10 text-accent-foreground border border-accent/20"
                      }`}
                    >
                      {gameState.feedback ? (
                        <p>{gameState.feedback.message}</p>
                      ) : (
                        <p>
                          <span className="font-semibold">Experimento {gameState.currentChallenge + 1}:</span> ¡Necesito tu ayuda para encontrar la palabra correcta!
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detalles del experimento actual (solo móvil) */}
              <div className="w-full lg:hidden bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Experimento actual</h3>
                    <p className="text-xs text-gray-600">Desafío {gameState.currentChallenge + 1} de {currentLevel.challenges.length}</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-100/30 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Patrón: <code>{challenge.pattern}</code></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Desafío actual */}
            <div className="lg:col-span-3 w-full">
              <Challenge />
            </div>
          </div>

          {/* Nueva visualización de experimentos */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Beaker className="h-5 w-5 text-blue-500" />
                <span>Mapa de Experimentos</span>
              </h3>
              <Badge variant="outline" className="bg-blue-500/10">
                <span>Progreso: {Math.round((gameState.currentChallenge / currentLevel.challenges.length) * 100)}%</span>
              </Badge>
            </div>
            
            <ExperimentPath
              totalExperiments={currentLevel.challenges.length}
              currentExperiment={gameState.currentChallenge}
              completedExperiments={completedChallenges}
            />
          </div>

          {/* Botón para volver al menú en dispositivos móviles (fijo en la parte inferior) */}
          <div className="sm:hidden fixed bottom-4 right-4">
            <Button
              onClick={handleReturnToMenu}
              variant="secondary"
              size="sm"
              className="shadow-lg rounded-full h-12 w-12 p-0 flex items-center justify-center"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Determinar qué renderizar basado en los estados
  let content;
  if (showIntro) {
    content = renderIntro();
  } else if (gameState.gameOver) {
    content = renderGameOver();
  } else {
    content = renderLaboratory();
  }

  return (
    <div className="w-full overflow-x-hidden">
      {content}
    </div>
  );
};

export default Laboratory;