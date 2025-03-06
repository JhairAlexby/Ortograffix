import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FlaskProps {
  active: boolean;
  completed: boolean;
  formula: string;
  color: "blue" | "purple" | "green" | "red" | "orange";
}

const Flask: React.FC<FlaskProps> = ({
  active,
  completed,
  formula,
  color,
}) => {
  // Colores para los diferentes tipos de frascos
  const flaskColors = {
    blue: {
      gradient: "from-blue-400 to-blue-600",
      bubbles: "bg-blue-200",
    },
    purple: {
      gradient: "from-purple-400 to-purple-600",
      bubbles: "bg-purple-200",
    },
    green: {
      gradient: "from-green-400 to-green-600",
      bubbles: "bg-green-200",
    },
    red: {
      gradient: "from-red-400 to-red-600",
      bubbles: "bg-red-200",
    },
    orange: {
      gradient: "from-orange-400 to-orange-600",
      bubbles: "bg-orange-200",
    },
  };

  const { gradient, bubbles } = flaskColors[color];

  // Abreviar fórmula larga
  const shortFormula = formula.length > 10 ? formula.slice(0, 8) + "..." : formula;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "relative group transition-all duration-300",
              active && "scale-110",
              completed && "opacity-70"
            )}
          >
            {/* Etiqueta de la fórmula */}
            <div className="absolute -top-6 left-0 right-0 mx-auto w-4/5 bg-white text-center text-xs font-mono py-1 px-2 rounded-t-md shadow-sm border border-gray-200 truncate">
              {shortFormula}
            </div>

            {/* Contenedor del frasco */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-16 h-24 sm:w-20 sm:h-28 relative rounded-b-xl",
                active ? "ring-2 ring-white/50 shadow-lg" : ""
              )}>
                {/* Cuello del frasco */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 h-4 bg-gray-200/90 border-2 border-gray-300/80 rounded-t-sm z-10"></div>

                {/* Cuerpo del frasco */}
                <div className="absolute top-3 inset-x-0 bottom-0 bg-gray-200/30 backdrop-blur-sm border-2 border-gray-300/50 rounded-b-xl overflow-hidden">
                  {/* Líquido */}
                  <div 
                    className={cn(
                      "absolute bottom-0 left-0 right-0 bg-gradient-to-b",
                      gradient,
                      completed ? "h-full" : "h-3/4"
                    )}
                  >
                    {/* Burbujas */}
                    {active && (
                      <>
                        <div className={cn("absolute w-2 h-2 rounded-full", bubbles, "animate-bubble")} 
                          style={{ bottom: "10%", left: "20%", animationDelay: "0s" }}></div>
                        <div className={cn("absolute w-1.5 h-1.5 rounded-full", bubbles, "animate-bubble")} 
                          style={{ bottom: "20%", left: "60%", animationDelay: "0.5s" }}></div>
                        <div className={cn("absolute w-2.5 h-2.5 rounded-full", bubbles, "animate-bubble")} 
                          style={{ bottom: "30%", left: "30%", animationDelay: "1s" }}></div>
                      </>
                    )}

                    {/* Brillo */}
                    <div className="absolute top-0 left-0 w-1/3 h-full flask-shine"></div>
                  </div>

                  {/* Indicador de completado */}
                  {completed && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
              </div>

              {active && (
                <span className="mt-2 text-xs font-semibold text-white bg-accent/80 px-2 py-0.5 rounded-full">
                  Activo
                </span>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formula}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {completed ? "Completado" : active ? "Desafío actual" : "Próximo desafío"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Flask;