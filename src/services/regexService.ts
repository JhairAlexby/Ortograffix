/**
 * Servicio para validar palabras contra patrones de expresiones regulares
 * y proporcionar retroalimentación detallada sobre los errores.
 */

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  errorPosition?: number;
  matchedGroups?: RegExpMatchArray | string[];
}

/**
 * Valida si una palabra coincide con un patrón de expresión regular
 * @param word - La palabra a validar
 * @param pattern - El patrón de expresión regular
 * @returns Un objeto con el resultado de la validación
 */
export const validateWord = (word: string, pattern: string): ValidationResult => {
  try {
    const regex = new RegExp(pattern);
    const isValid = regex.test(word);
    
    if (isValid) {
      const matches = word.match(regex);
      return {
        isValid: true,
        matchedGroups: matches || undefined
      };
    }
    
    // Si la palabra no es válida, intentamos identificar dónde está el error
    return analyzeError(word, pattern);
  } catch (error) {
    console.error('Error al validar la expresión regular:', error);
    return {
      isValid: false,
      errorMessage: 'Error en la validación. Por favor intenta con otra palabra.'
    };
  }
};

/**
 * Analiza el error en una palabra que no coincide con el patrón
 * @param word - La palabra ingresada
 * @param pattern - El patrón de expresión regular
 * @returns Información detallada sobre el error
 */
const analyzeError = (word: string, pattern: string): ValidationResult => {
  // Patrones simples para el primer nivel - análisis específico
  if (pattern === "^c[aeiou]sa$") {
    if (!word.startsWith('c')) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe comenzar con la letra "c"',
        errorPosition: 0
      };
    }
    if (word.length > 1 && !/[aeiou]/.test(word[1])) {
      return {
        isValid: false,
        errorMessage: 'La segunda letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 1
      };
    }
    if (word.length > 2 && word[2] !== 's') {
      return {
        isValid: false,
        errorMessage: 'La tercera letra debe ser "s"',
        errorPosition: 2
      };
    }
    if (word.length > 3 && word[3] !== 'a') {
      return {
        isValid: false,
        errorMessage: 'La palabra debe terminar con "a"',
        errorPosition: 3
      };
    }
    if (word.length !== 4) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe tener exactamente 4 letras',
        errorPosition: word.length > 4 ? 4 : word.length
      };
    }
  }
  
  else if (pattern === "^m[aeiou]r[aeiou]$") {
    if (!word.startsWith('m')) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe comenzar con la letra "m"',
        errorPosition: 0
      };
    }
    if (word.length > 1 && !/[aeiou]/.test(word[1])) {
      return {
        isValid: false,
        errorMessage: 'La segunda letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 1
      };
    }
    if (word.length > 2 && word[2] !== 'r') {
      return {
        isValid: false,
        errorMessage: 'La tercera letra debe ser "r"',
        errorPosition: 2
      };
    }
    if (word.length > 3 && !/[aeiou]/.test(word[3])) {
      return {
        isValid: false,
        errorMessage: 'La cuarta letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 3
      };
    }
    if (word.length !== 4) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe tener exactamente 4 letras',
        errorPosition: word.length > 4 ? 4 : word.length
      };
    }
  }
  
  else if (pattern === "^p[aeiou]t[aeiou]$") {
    if (!word.startsWith('p')) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe comenzar con la letra "p"',
        errorPosition: 0
      };
    }
    if (word.length > 1 && !/[aeiou]/.test(word[1])) {
      return {
        isValid: false,
        errorMessage: 'La segunda letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 1
      };
    }
    if (word.length > 2 && word[2] !== 't') {
      return {
        isValid: false,
        errorMessage: 'La tercera letra debe ser "t"',
        errorPosition: 2
      };
    }
    if (word.length > 3 && !/[aeiou]/.test(word[3])) {
      return {
        isValid: false,
        errorMessage: 'La cuarta letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 3
      };
    }
    if (word.length !== 4) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe tener exactamente 4 letras',
        errorPosition: word.length > 4 ? 4 : word.length
      };
    }
  }
  
  else if (pattern === "^b[aeiou]ll[aeiou]$") {
    if (!word.startsWith('b')) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe comenzar con la letra "b"',
        errorPosition: 0
      };
    }
    if (word.length > 1 && !/[aeiou]/.test(word[1])) {
      return {
        isValid: false,
        errorMessage: 'La segunda letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 1
      };
    }
    if (word.length > 2 && (word[2] !== 'l' || (word.length > 3 && word[3] !== 'l'))) {
      return {
        isValid: false,
        errorMessage: 'La tercera y cuarta letras deben ser "ll"',
        errorPosition: 2
      };
    }
    if (word.length > 4 && !/[aeiou]/.test(word[4])) {
      return {
        isValid: false,
        errorMessage: 'La quinta letra debe ser una vocal (a, e, i, o, u)',
        errorPosition: 4
      };
    }
    if (word.length !== 5) {
      return {
        isValid: false,
        errorMessage: 'La palabra debe tener exactamente 5 letras',
        errorPosition: word.length > 5 ? 5 : word.length
      };
    }
  }
  
  // Análisis genérico para patrones que no tienen reglas específicas
  return {
    isValid: false,
    errorMessage: 'La palabra no coincide con el patrón solicitado',
    errorPosition: 0
  };
};

/**
 * Explica un patrón de expresión regular de manera sencilla
 * @param pattern - El patrón de expresión regular
 * @returns Explicación del patrón en lenguaje simple
 */
export const explainPattern = (pattern: string): string => {
  const explanations: Record<string, string> = {
    "^c[aeiou]sa$": "Busca palabras que empiezan con 'c', siguen con cualquier vocal (a, e, i, o, u), luego 's' y terminan con 'a'.",
    "^m[aeiou]r[aeiou]$": "Busca palabras que empiezan con 'm', siguen con cualquier vocal, luego 'r' y terminan con cualquier vocal.",
    "^p[aeiou]t[aeiou]$": "Busca palabras que empiezan con 'p', siguen con cualquier vocal, luego 't' y terminan con cualquier vocal.",
    "^b[aeiou]ll[aeiou]$": "Busca palabras que empiezan con 'b', siguen con cualquier vocal, luego 'll' y terminan con cualquier vocal."
  };
  
  return explanations[pattern] || "Este patrón busca palabras que siguen una estructura específica.";
};

/**
 * Genera sugerencias para ayudar al usuario
 * @param pattern - El patrón de expresión regular
 * @param word - La palabra ingresada por el usuario
 * @returns Una sugerencia de ayuda
 */
export const generateHint = (pattern: string, word: string): string => {
  const validationResult = validateWord(word, pattern);
  
  if (!validationResult.isValid && validationResult.errorMessage) {
    return validationResult.errorMessage;
  }
  
  if (pattern === "^c[aeiou]sa$") {
    return "Una palabra de 4 letras que empieza con 'c' y termina con 'sa'.";
  }
  
  if (pattern === "^m[aeiou]r[aeiou]$") {
    return "Piensa en una palabra de 4 letras que empieza con 'm', tiene una 'r' en el medio y termina con vocal.";
  }
  
  if (pattern === "^p[aeiou]t[aeiou]$") {
    return "¿Qué parte del cuerpo de un animal tiene 4 letras, empieza con 'p' y tiene una 't' en el medio?";
  }
  
  if (pattern === "^b[aeiou]ll[aeiou]$") {
    return "Una palabra que significa 'hermosa' en español, que empieza con 'b' y tiene 'll' en el medio.";
  }
  
  return "Intenta encontrar palabras que coincidan exactamente con el patrón.";
};