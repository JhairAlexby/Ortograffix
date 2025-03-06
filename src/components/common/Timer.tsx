import React, { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
  warningThreshold?: number;
  dangerThreshold?: number;
}

/**
 * Componente de temporizador que muestra el tiempo restante y cambia de color
 * según se acerca al límite
 */
const Timer: React.FC<TimerProps> = ({ 
  seconds, 
  warningThreshold = 30, 
  dangerThreshold = 10 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Efecto para controlar el parpadeo cuando queda poco tiempo
  useEffect(() => {
    if (seconds <= dangerThreshold) {
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev);
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
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Determinar el color del temporizador basado en el tiempo restante
  const getTimerColor = () => {
    if (seconds <= dangerThreshold) {
      return isBlinking ? 'bg-red-600' : 'bg-red-500';
    }
    if (seconds <= warningThreshold) {
      return 'bg-yellow-500';
    }
    return 'bg-green-500';
  };
  
  // Calcular el porcentaje de tiempo restante
  const getProgressPercentage = () => {
    // Asumimos que el tiempo inicial era un minuto como máximo
    const maxTime = 60;
    return Math.min(100, (seconds / maxTime) * 100);
  };
  
  return (
    <div className="w-24 sm:w-32">
      <div className="text-center mb-1 text-xxs sm:text-xs">Tiempo Restante</div>
      <div className="relative h-6 sm:h-8 rounded-full bg-gray-200 shadow-inner overflow-hidden">
        <div 
          className={`absolute left-0 top-0 bottom-0 ${getTimerColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs sm:text-base">
          {formatTime(seconds)}
        </div>
      </div>
    </div>
  );
};

export default Timer;