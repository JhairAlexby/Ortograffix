import React from "react";
import { cn } from "@/lib/utils";
import { Beaker, CheckCircle, Zap, Lock, BrainCircuit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExperimentPathProps {
  totalExperiments: number;
  currentExperiment: number;
  completedExperiments: number[];
  onExperimentClick?: (index: number) => void;
}

const ExperimentPath: React.FC<ExperimentPathProps> = ({
  totalExperiments,
  currentExperiment,
  completedExperiments,
  onExperimentClick
}) => {
  const getExperimentsPerRow = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 3;
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 5;
    }
    return 8;
  };

  const [experimentsPerRow, setExperimentsPerRow] = React.useState(5);
  
  React.useEffect(() => {
    const handleResize = () => {
      setExperimentsPerRow(getExperimentsPerRow());
    };
    
    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rows = Math.ceil(totalExperiments / experimentsPerRow);
  
  const rowsArray = Array.from({ length: rows }, (_, rowIndex) => {
    const start = rowIndex * experimentsPerRow;
    const end = Math.min(start + experimentsPerRow, totalExperiments);
    const experiments = Array.from({ length: end - start }, (_, i) => start + i);
    
    const isReversed = rowIndex % 2 === 1;
    return {
      experiments: isReversed ? [...experiments].reverse() : experiments,
      isReversed
    };
  });

  const getExperimentStatusClass = (experimentIndex: number) => {
    if (experimentIndex === currentExperiment) {
      return "bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white shadow-lg scale-110 z-10";
    } else if (completedExperiments.includes(experimentIndex)) {
      return "bg-green-500/30 border border-green-500";
    } else if (experimentIndex < currentExperiment) {
      return "bg-yellow-500/30 border border-yellow-500";
    } else {
      return "bg-gray-300/50 border border-gray-400/30";
    }
  };

  const getExperimentIcon = (experimentIndex: number) => {
    if (experimentIndex === currentExperiment) {
      return <Zap className="h-6 w-6 text-white animate-pulse" />;
    } else if (completedExperiments.includes(experimentIndex)) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (experimentIndex < currentExperiment) {
      return <Beaker className="h-5 w-5 text-blue-600" />;
    } else {
      return <Lock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getExperimentColor = (experimentIndex: number) => {
    const colors = [
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
      "from-teal-400 to-teal-600"
    ];
    return colors[experimentIndex % colors.length];
  };

  return (
    <div className="w-full max-w-full overflow-x-auto py-8">
      <div className="relative mx-auto px-4">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
          <BrainCircuit className="w-8 h-8 mx-auto text-blue-600" />
        </div>
        
        {rowsArray.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={cn(
              "flex items-center mb-6 relative",
              row.isReversed ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Línea de conexión */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-purple-300 top-1/2 transform -translate-y-1/2 z-0"></div>
            
            {/* Experimentos de esta fila */}
            {row.experiments.map((experimentIndex) => (
              <div 
                key={experimentIndex}
                className="relative flex-grow flex justify-center items-center z-10"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105",
                          getExperimentStatusClass(experimentIndex)
                        )}
                        onClick={() => onExperimentClick && onExperimentClick(experimentIndex)}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          experimentIndex === currentExperiment ? "bg-gradient-to-r " + getExperimentColor(experimentIndex) : ""
                        )}>
                          {getExperimentIcon(experimentIndex)}
                        </div>
                        <div className="absolute -bottom-6 text-xs font-medium text-gray-700">
                          {experimentIndex + 1}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Experimento {experimentIndex + 1}</p>
                      <p className="text-xs text-gray-500">
                        {experimentIndex === currentExperiment 
                          ? "Experimento actual" 
                          : completedExperiments.includes(experimentIndex)
                            ? "Completado" 
                            : experimentIndex < currentExperiment
                              ? "Disponible"
                              : "Bloqueado"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Burbujas decorativas para el experimento actual */}
                {experimentIndex === currentExperiment && (
                  <>
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float" style={{ top: '0px', left: '30%', animationDelay: '0s' }}></div>
                    <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ top: '-10px', right: '40%', animationDelay: '0.5s' }}></div>
                    <div className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-float" style={{ bottom: '5px', right: '30%', animationDelay: '1s' }}></div>
                  </>
                )}
              </div>
            ))}
            
            {/* Conectores entre filas */}
            {rowIndex < rowsArray.length - 1 && (
              <div 
                className={cn(
                  "absolute h-12 w-1 bg-gradient-to-b from-purple-300 to-blue-300",
                  row.isReversed ? "left-[calc(100%/10)]" : "right-[calc(100%/10)]",
                  "bottom-0 transform translate-y-full"
                )}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentPath;