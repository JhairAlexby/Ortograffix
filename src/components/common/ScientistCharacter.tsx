import React from 'react';

interface ScientistCharacterProps {
  animate?: boolean;
  mood?: 'happy' | 'thinking' | 'excited' | 'confused' | 'neutral';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Componente que representa al científico loco del laboratorio
 */
const ScientistCharacter: React.FC<ScientistCharacterProps> = ({ 
  animate = false, 
  mood = 'neutral',
  size = 'medium'
}) => {
  // Determinar el tamaño del científico
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-24 h-24';
      case 'medium':
        return 'w-32 h-32';
      case 'large':
        return 'w-48 h-48';
      default:
        return 'w-32 h-32';
    }
  };
  
  // Determinar la expresión facial según el estado de ánimo
  const getFacialExpression = () => {
    switch (mood) {
      case 'happy':
        return (
          <>
            <path d="M20,20 Q25,25 30,20" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="15" cy="15" r="2" fill="#000" />
            <circle cx="35" cy="15" r="2" fill="#000" />
          </>
        );
      case 'thinking':
        return (
          <>
            <path d="M20,20 Q25,22 30,20" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="15" cy="15" r="2" fill="#000" />
            <circle cx="35" cy="15" r="2" fill="#000" />
            <circle cx="42" cy="18" r="3" fill="#fff" stroke="#000" />
            <circle cx="45" cy="13" r="2" fill="#fff" stroke="#000" />
          </>
        );
      case 'excited':
        return (
          <>
            <path d="M20,18 Q25,25 30,18" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="15" cy="15" r="2.5" fill="#000" />
            <circle cx="35" cy="15" r="2.5" fill="#000" />
            <path d="M50,10 L45,15 L50,20" stroke="#000" strokeWidth="1.5" fill="none" />
          </>
        );
      case 'confused':
        return (
          <>
            <path d="M20,22 Q25,18 30,22" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="15" cy="15" r="2" fill="#000" />
            <circle cx="35" cy="15" r="2" fill="#000" />
            <path d="M40,5 Q45,10 50,5" stroke="#000" strokeWidth="1.5" fill="none" />
          </>
        );
      default: // neutral
        return (
          <>
            <path d="M20,20 Q25,22 30,20" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="15" cy="15" r="2" fill="#000" />
            <circle cx="35" cy="15" r="2" fill="#000" />
          </>
        );
    }
  };
  
  // Animación cuando se activa
  const animationClass = animate ? 'animate-bounce' : '';
  
  return (
    <div className={`${getSize()} ${animationClass}`}>
      <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
        {/* Cabello despeinado */}
        <path d="M10,15 Q5,5 15,5 Q25,0 30,5 Q40,0 45,10 Q50,15 45,20" fill="#ddd" />
        
        {/* Cara */}
        <circle cx="25" cy="25" r="20" fill="#ffe0bd" />
        
        {/* Expresión facial */}
        {getFacialExpression()}
        
        {/* Gafas */}
        <circle cx="15" cy="15" r="5" fill="none" stroke="#000" strokeWidth="1" />
        <circle cx="35" cy="15" r="5" fill="none" stroke="#000" strokeWidth="1" />
        <path d="M20,15 L30,15" stroke="#000" strokeWidth="1" />
        <path d="M5,15 L10,15" stroke="#000" strokeWidth="1" />
        <path d="M40,15 L45,15" stroke="#000" strokeWidth="1" />
        
        {/* Bata de laboratorio */}
        <path d="M5,30 L10,45 L15,60 L25,55 L35,60 L40,45 L45,30" fill="#fff" stroke="#ddd" />
        
        {/* Detalles de la bata */}
        <path d="M20,30 L20,50" stroke="#ddd" strokeWidth="1" />
        <path d="M30,30 L30,50" stroke="#ddd" strokeWidth="1" />
        <circle cx="25" cy="35" r="2" fill="#ddd" />
        <circle cx="25" cy="40" r="2" fill="#ddd" />
        <circle cx="25" cy="45" r="2" fill="#ddd" />
        
        {/* Burbujas o elementos de poción (para el modo 'thinking' o 'excited') */}
        {(mood === 'thinking' || mood === 'excited') && (
          <>
            <circle cx="45" cy="8" r="3" fill="#a0f" fillOpacity="0.5" className="animate-pulse" />
            <circle cx="48" cy="15" r="2" fill="#0af" fillOpacity="0.5" className="animate-pulse" />
            <circle cx="42" cy="12" r="1.5" fill="#fa0" fillOpacity="0.5" className="animate-pulse" />
          </>
        )}
      </svg>
    </div>
  );
};

export default ScientistCharacter;