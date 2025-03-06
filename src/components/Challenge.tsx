import React, { useState, useRef, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import Timer from "./common/Timer";
import PatternVisualizer from "./game/PatternVisualizer";
import { validateWord, generateHint } from "@/services/regexService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon, SendIcon, ArrowRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <div className="w-full space-y-4">
      {/* Cabecera del desafío */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary-foreground">
            Desafío {gameState.currentChallenge + 1}/{currentLevel.challenges.length}
          </Badge>
          <h2 className="text-lg sm:text-xl font-semibold">
            Descifra la palabra correcta
          </h2>
        </div>
        <Timer
          seconds={gameState.remainingTime}
          warningThreshold={30}
          dangerThreshold={10}
          totalSeconds={challenge.timeLimit}
        />
      </div>

      {/* Visualizador de patrones */}
      <PatternVisualizer pattern={challenge.pattern} />

      {/* Área de entrada */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={gameState.userInput}
                onChange={handleInputChange}
                placeholder="Escribe una palabra que coincida con el patrón..."
                className={`pr-10 ${
                  liveValidation?.isValid
                    ? "border-green-500 bg-green-50/10"
                    : gameState.userInput
                    ? "border-red-300 bg-red-50/10"
                    : ""
                }`}
                disabled={gameState.remainingTime <= 0}
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                disabled={!gameState.userInput || gameState.remainingTime <= 0}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Retroalimentación en tiempo real */}
            {gameState.userInput && liveValidation && !liveValidation.isValid && liveValidation.errorMessage && (
              <div className="text-xs text-red-500 pl-1 animate-in fade-in-50">
                {liveValidation.errorMessage}
              </div>
            )}

            {/* Mensaje de feedback */}
            {gameState.feedback && (
              <div className={`p-3 rounded-md text-sm ${
                gameState.feedback.isCorrect 
                  ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}>
                {gameState.feedback.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Área de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Palabras correctas */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Palabras correctas
            </h3>
            {gameState.correctWords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {gameState.correctWords.map((word, index) => (
                  <Badge key={index} variant="success">
                    {word}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-xs italic">
                Aún no has encontrado palabras correctas
              </p>
            )}
          </CardContent>
        </Card>

        {/* Intentos incorrectos */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Intentos incorrectos
            </h3>
            {gameState.incorrectAttempts.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {gameState.incorrectAttempts.map((word, index) => (
                  <Badge key={index} variant="destructive">
                    {word}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-xs italic">
                No hay intentos incorrectos
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pista y avance */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-6 gap-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHint}
            className="gap-1"
          >
            <LightbulbIcon className="h-4 w-4" />
            {showHint ? "Ocultar pista" : "¿Necesitas una pista?"}
          </Button>
          {showHint && (
            <div className="mt-2 p-3 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 max-w-md">
              <p className="text-sm">{generateHint(challenge.pattern, gameState.userInput)}</p>
            </div>
          )}
        </div>

        <Button
          onClick={handleNextChallenge}
          variant="magical"
          className="gap-1"
        >
          {gameState.currentChallenge < currentLevel.challenges.length - 1 ? (
            <>
              Siguiente Desafío
              <ArrowRightIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              Completar Nivel
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Puntos necesarios para completar nivel */}
      <Separator className="my-2" />
      <div className="flex justify-center">
        <p className="text-xs text-muted-foreground">
          Necesitas {currentLevel.requiredPoints} puntos para completar este nivel. Tienes {gameState.totalPoints} puntos.
        </p>
      </div>
    </div>
  );
};

export default Challenge;