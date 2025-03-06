import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
  seconds: number;
  warningThreshold?: number;
  dangerThreshold?: number;
  totalSeconds?: number;
}

const Timer: React.FC<TimerProps> = ({
  seconds,
  warningThreshold = 30,
  dangerThreshold = 10,
  totalSeconds = 60,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Efecto para el parpadeo cuando queda poco tiempo
  useEffect(() => {
    if (seconds <= dangerThreshold) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500);

      return () => clearInterval(interval);
    } else {
      setIsBlinking(false);
    }
  }, [seconds, dangerThreshold]);

  // Formatear el tiempo como MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calcular el porcentaje de tiempo restante
  const getProgressPercentage = () => {
    return Math.min(100, (seconds / totalSeconds) * 100);
  };

  // Determinar el color según el tiempo restante
  const getTimerColorClass = () => {
    if (seconds <= dangerThreshold) {
      return isBlinking ? "bg-red-600" : "bg-red-500";
    }
    if (seconds <= warningThreshold) {
      return "bg-yellow-500";
    }
    return "bg-green-500";
  };

  return (
    <div className="w-32 sm:w-40">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center text-xs">
          <Clock className="mr-1 h-3 w-3" />
          <span>Tiempo restante</span>
        </div>
        <span className={cn(
          "text-xs font-bold",
          seconds <= dangerThreshold ? "text-red-400" : 
          seconds <= warningThreshold ? "text-yellow-400" : "text-green-400"
        )}>
          {formatTime(seconds)}
        </span>
      </div>
      <Progress
        value={getProgressPercentage()}
        className="h-2"
        indicatorClassName={getTimerColorClass()}
      />
    </div>
  );
};

export default Timer;