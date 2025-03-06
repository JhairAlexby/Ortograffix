import React from 'react';

interface PatternVisualizerProps {
  pattern: string;
}

/**
 * Componente que visualiza y explica un patrón de expresión regular de forma amigable para niños
 */
const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ pattern }) => {
  // Función para dividir y colorear las partes del patrón
  const renderPatternParts = () => {
    // Para los patrones iniciales, vamos a manejarlos de forma específica
    if (pattern === "^c[aeiou]sa$") {
      return (
        <div className="flex items-center justify-center text-3xl font-mono">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1" title="Inicio de palabra">^</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra c">c</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra s">s</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra a">a</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded" title="Fin de palabra">$</span>
        </div>
      );
    }
    
    if (pattern === "^m[aeiou]r[aeiou]$") {
      return (
        <div className="flex items-center justify-center text-3xl font-mono">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1" title="Inicio de palabra">^</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra m">m</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra r">r</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded" title="Fin de palabra">$</span>
        </div>
      );
    }
    
    if (pattern === "^p[aeiou]t[aeiou]$") {
      return (
        <div className="flex items-center justify-center text-3xl font-mono">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1" title="Inicio de palabra">^</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra p">p</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra t">t</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded" title="Fin de palabra">$</span>
        </div>
      );
    }
    
    if (pattern === "^b[aeiou]ll[aeiou]$") {
      return (
        <div className="flex items-center justify-center text-3xl font-mono">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1" title="Inicio de palabra">^</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letra b">b</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1" title="Letras ll">ll</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-1" title="Cualquier vocal">
            [<span className="text-red-500">a</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>]
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded" title="Fin de palabra">$</span>
        </div>
      );
    }
    
    // Renderizado genérico para otros patrones
    return (
      <div className="text-2xl font-mono bg-white p-2 rounded text-center">
        {pattern}
      </div>
    );
  };

  // Función para explicar el patrón en lenguaje sencillo
  const explainPattern = () => {
    const explanations: Record<string, string> = {
      "^c[aeiou]sa$": "Este patrón busca palabras de 4 letras que empiezan con 'c', siguen con una vocal, luego 's' y terminan con 'a'.",
      "^m[aeiou]r[aeiou]$": "Este patrón busca palabras de 4 letras que empiezan con 'm', siguen con una vocal, luego 'r', y terminan con una vocal.",
      "^p[aeiou]t[aeiou]$": "Este patrón busca palabras de 4 letras que empiezan con 'p', siguen con una vocal, luego 't', y terminan con una vocal.",
      "^b[aeiou]ll[aeiou]$": "Este patrón busca palabras de 5 letras que empiezan con 'b', siguen con una vocal, luego 'll', y terminan con una vocal."
    };
    
    return explanations[pattern] || "Este patrón busca palabras específicas";
  };

  return (
    <div className="pattern-visualizer mb-4">
      {renderPatternParts()}
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-blue-100 mr-2"></div>
          <span>Delimitadores (inicio/fin)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-purple-100 mr-2"></div>
          <span>Letras específicas</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-green-100 mr-2"></div>
          <span>Grupos de letras</span>
        </div>
      </div>
      
      <p className="mt-2 text-gray-700">{explainPattern()}</p>
    </div>
  );
};

export default PatternVisualizer;