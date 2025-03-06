import React from 'react';

interface FlaskProps {
  active: boolean;
  completed: boolean;
  formula: string;
  color: 'blue' | 'purple' | 'green' | 'red' | 'orange';
}

/**
 * Componente que representa un frasco de laboratorio con una fórmula (patrón regex)
 */
const Flask: React.FC<FlaskProps> = ({ active, completed, formula, color }) => {
  // Determinar el color del líquido y del brillo
  const getColors = () => {
    const colors = {
      blue: {
        liquidGradient: 'from-blue-400 to-blue-600',
        glowColor: 'bg-blue-300',
        borderColor: 'border-blue-700'
      },
      purple: {
        liquidGradient: 'from-purple-400 to-purple-600',
        glowColor: 'bg-purple-300',
        borderColor: 'border-purple-700'
      },
      green: {
        liquidGradient: 'from-green-400 to-green-600',
        glowColor: 'bg-green-300',
        borderColor: 'border-green-700'
      },
      red: {
        liquidGradient: 'from-red-400 to-red-600',
        glowColor: 'bg-red-300',
        borderColor: 'border-red-700'
      },
      orange: {
        liquidGradient: 'from-orange-400 to-orange-600',
        glowColor: 'bg-orange-300',
        borderColor: 'border-orange-700'
      }
    };
    
    return colors[color];
  };
  
  const { liquidGradient, glowColor, borderColor } = getColors();
  
  // Clase para la animación del burbujeo
  const bubbleAnimation = active ? 'animate-bubble' : '';
  
  // Clase para el estado completado
  const completedClass = completed ? 'opacity-50' : '';
  
  // Clase para el frasco activo
  const activeClass = active ? 'transform scale-110 shadow-lg' : '';
  
  // Reducir la fórmula para mostrarla en el frasco
  const shortFormula = formula.length > 10 ? formula.slice(0, 10) + '...' : formula;
  
  return (
    <div className={`relative mx-auto ${activeClass} ${completedClass} transition-all duration-300`}>
      {/* Etiqueta del frasco */}
      <div className="absolute -top-6 left-0 right-0 bg-white rounded-t-lg px-2 py-1 text-xs text-center overflow-hidden text-gray-700 font-mono border border-gray-300">
        {shortFormula}
      </div>
      
      {/* Frasco */}
      <div className={`relative w-20 h-28 mx-auto ${borderColor} border-2 rounded-b-xl rounded-t-lg bg-opacity-70 bg-white overflow-hidden`}>
        {/* Cuello del frasco */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-white border-b-2 border-gray-300"></div>
        
        {/* Líquido */}
        <div className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b ${liquidGradient}`}>
          {/* Burbujas */}
          {active && (
            <>
              <div className={`absolute w-2 h-2 rounded-full ${glowColor} opacity-70 bottom-2 left-3 ${bubbleAnimation}`} style={{ animationDelay: '0s' }}></div>
              <div className={`absolute w-1.5 h-1.5 rounded-full ${glowColor} opacity-70 bottom-4 left-7 ${bubbleAnimation}`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`absolute w-2.5 h-2.5 rounded-full ${glowColor} opacity-70 bottom-6 left-5 ${bubbleAnimation}`} style={{ animationDelay: '1s' }}></div>
              <div className={`absolute w-1 h-1 rounded-full ${glowColor} opacity-70 bottom-10 left-10 ${bubbleAnimation}`} style={{ animationDelay: '1.5s' }}></div>
            </>
          )}
        </div>
        
        {/* Brillo del frasco */}
        <div className="absolute top-4 left-1 w-6 h-14 bg-white opacity-20 rounded-full transform rotate-20"></div>
        
        {/* Indicador de completado */}
        {completed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-80 rounded-full p-1">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Indicador de activo */}
      {active && (
        <div className="absolute -bottom-4 left-0 right-0 text-xs text-center text-white font-bold">
          Activo
        </div>
      )}
    </div>
  );
};

export default Flask;