import React from "react";
import { cn } from "@/lib/utils";
import { Beaker, Brain, Lightbulb, HeartPulse, Star } from "lucide-react";

interface ScientistCharacterProps {
  animate?: boolean;
  mood?: "happy" | "thinking" | "excited" | "confused" | "neutral";
  size?: "small" | "medium" | "large";
}

const ScientistCharacter: React.FC<ScientistCharacterProps> = ({
  animate = false,
  mood = "neutral",
  size = "medium",
}) => {
  // Tamaños para diferentes pantallas
  const sizes = {
    small: "w-16 h-16 sm:w-20 sm:h-20",
    medium: "w-24 h-24 sm:w-32 sm:h-32",
    large: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
  };

  // Animación
  const animation = animate ? "animate-float" : "";

  // Determinar el icono y color según el estado de ánimo
  const getMoodIcon = () => {
    switch (mood) {
      case "happy":
        return <Star className="text-yellow-400 animate-pulse" />;
      case "thinking":
        return <Brain className="text-blue-400 animate-pulse" />;
      case "excited":
        return <Lightbulb className="text-yellow-400 animate-pulse" />;
      case "confused":
        return <HeartPulse className="text-red-400 animate-pulse" />;
      default:
        return <Beaker className="text-purple-400" />;
    }
  };

  return (
    <div className={cn("relative flex flex-col items-center", animation)}>
      <div
        className={cn(
          "relative rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-1",
          sizes[size]
        )}
      >
        <div className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-1 shadow-md">
          {getMoodIcon()}
        </div>
        <div className="h-full w-full overflow-hidden rounded-full bg-white">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Cabello */}
            <path
              d="M20,30 Q10,10 30,10 Q50,0 70,10 Q90,10 80,30"
              fill="#706F6F"
              stroke="#333"
              strokeWidth="1"
            />

            {/* Cara */}
            <circle cx="50" cy="50" r="40" fill="#FFE0BD" />

            {/* Expresión según el estado de ánimo */}
            {mood === "happy" && (
              <path
                d="M30,55 Q50,70 70,55"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {mood === "thinking" && (
              <path
                d="M30,60 Q50,60 70,60"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {mood === "excited" && (
              <path
                d="M30,50 Q50,75 70,50"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {mood === "confused" && (
              <path
                d="M30,65 Q50,50 70,65"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {mood === "neutral" && (
              <path
                d="M30,60 Q50,65 70,60"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}

            {/* Ojos */}
            <circle className={cn(mood === "excited" ? "animate-pulse" : "")} cx="35" cy="40" r="5" fill="#333" />
            <circle className={cn(mood === "excited" ? "animate-pulse" : "")} cx="65" cy="40" r="5" fill="#333" />

            {/* Gafas */}
            <circle
              cx="35"
              cy="40"
              r="10"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <circle
              cx="65"
              cy="40"
              r="10"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M45,40 L55,40"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15,40 L25,40"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M75,40 L85,40"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Burbujas de pensamiento para el modo thinking */}
      {(mood === "thinking" || mood === "excited") && (
        <div className="absolute -right-4 -top-4 z-0">
          <div className="h-3 w-3 rounded-full bg-blue-400 opacity-70 animate-float" style={{ animationDelay: "0s" }} />
          <div className="ml-4 mt-2 h-4 w-4 rounded-full bg-purple-400 opacity-70 animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="ml-1 mt-1 h-2 w-2 rounded-full bg-indigo-400 opacity-70 animate-float" style={{ animationDelay: "1s" }} />
        </div>
      )}
    </div>
  );
};

export default ScientistCharacter;