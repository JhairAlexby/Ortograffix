import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface Challenge {
  id: number;
  pattern: string;
  explanation: string;
  possibleWords: string[];
  correctWords: string[];
  timeLimit: number; 
}

export interface Level {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  requiredPoints: number;
}

interface GameState {
  currentLevel: number;
  levels: Level[];
  totalPoints: number;
  currentChallenge: number;
  userInput: string;
  feedback: {
    isCorrect: boolean;
    message: string;
    errorPosition?: number;
  } | null;
  gameStarted: boolean;
  gameOver: boolean; // Nuevo estado para controlar cuando el juego ha terminado
  remainingTime: number;
  correctWords: string[];
  incorrectAttempts: string[];
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  checkWord: (word: string) => void;
  setUserInput: (input: string) => void;
  nextChallenge: () => void;
  resetLevel: () => void;
  resetGame: () => void; // Nueva función para reiniciar el juego completamente
}

const initialLevels: Level[] = [
  {
    id: 1,
    name: "Primer Experimento",
    description: "Encuentra palabras que coincidan con el patrón del científico",
    challenges: [
      {
        id: 1,
        pattern: "^c[aeiou]sa$",
        explanation: "Palabras que empiezan con 'c', siguen con una vocal, luego 's' y terminan con 'a'",
        possibleWords: ["casa", "cesa", "cisa", "cosa", "cusa"],
        correctWords: ["casa", "cesa", "cisa", "cosa", "cusa"],
        timeLimit: 60
      },
      {
        id: 2,
        pattern: "^m[aeiou]r[aeiou]$",
        explanation: "Palabras que empiezan con 'm', siguen con una vocal, luego 'r', y terminan con una vocal",
        possibleWords: ["mara", "mare", "mari", "maro", "maru", "mera", "mere", "meri", "mero", "meru", "mira", "mire", "miri", "miro", "miru", "mora", "more", "mori", "moro", "moru", "mura", "mure", "muri", "muro", "muru"],
        correctWords: ["mara", "mare", "mari", "maro", "maru", "mera", "mere", "meri", "mero", "meru", "mira", "mire", "miri", "miro", "miru", "mora", "more", "mori", "moro", "moru", "mura", "mure", "muri", "muro", "muru"],
        timeLimit: 60
      },
      {
        id: 3,
        pattern: "^p[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'p', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["pata", "pate", "pati", "pato", "patu", "peta", "pete", "peti", "peto", "petu", "pita", "pite", "piti", "pito", "pitu", "pota", "pote", "poti", "poto", "potu", "puta", "pute", "puti", "puto", "putu"],
        correctWords: ["pata", "pate", "pati", "pato", "patu", "peta", "pete", "peti", "peto", "petu", "pita", "pite", "piti", "pito", "pitu", "pota", "pote", "poti", "poto", "potu", "puta", "pute", "puti", "puto", "putu"],
        timeLimit: 60
      },
      {
        id: 4,
        pattern: "^b[aeiou]ll[aeiou]$",
        explanation: "Palabras que empiezan con 'b', siguen con una vocal, luego 'll', y terminan con una vocal",
        possibleWords: ["balla", "balle", "balli", "ballo", "ballu", "bella", "belle", "belli", "bello", "bellu", "billa", "bille", "billi", "billo", "billu", "bolla", "bolle", "bolli", "bollo", "bollu", "bulla", "bulle", "bulli", "bullo", "bullu"],
        correctWords: ["balla", "balle", "balli", "ballo", "ballu", "bella", "belle", "belli", "bello", "bellu", "billa", "bille", "billi", "billo", "billu", "bolla", "bolle", "bolli", "bollo", "bollu", "bulla", "bulle", "bulli", "bullo", "bullu"],
        timeLimit: 60
      },
      {
        id: 5,
        pattern: "^t[aeiou]c[aeiou]$",
        explanation: "Palabras que empiezan con 't', siguen con una vocal, luego 'c', y terminan con una vocal",
        possibleWords: ["taca", "tace", "taci", "taco", "tacu", "teca", "tece", "teci", "teco", "tecu", "tica", "tice", "tici", "tico", "ticu", "toca", "toce", "toci", "toco", "tocu", "tuca", "tuce", "tuci", "tuco", "tucu"],
        correctWords:  ["taca", "tace", "taci", "taco", "tacu", "teca", "tece", "teci", "teco", "tecu", "tica", "tice", "tici", "tico", "ticu", "toca", "toce", "toci", "toco", "tocu", "tuca", "tuce", "tuci", "tuco", "tucu"],
        timeLimit: 60
      },
      {
        id: 6,
        pattern: "^l[aeiou]p[aeiou]$",
        explanation: "Palabras que empiezan con 'l', siguen con una vocal, luego 'p', y terminan con una vocal",
        possibleWords: ["lapa", "lape", "lapi", "lapo", "lapu", "lepa", "lepe", "lepi", "lepo", "lepu", "lipa", "lipe", "lipi", "lipo", "lipu", "lopa", "lope", "lopi", "lopo", "lopu", "lupa", "lupe", "lupi", "lupo", "lupu"],
        correctWords: ["lapa", "lape", "lapi", "lapo", "lapu", "lepa", "lepe", "lepi", "lepo", "lepu", "lipa", "lipe", "lipi", "lipo", "lipu", "lopa", "lope", "lopi", "lopo", "lopu", "lupa", "lupe", "lupi", "lupo", "lupu"],
        timeLimit: 60
      },
      {
        id: 7,
        pattern: "^n[aeiou]v[aeiou]$",
        explanation: "Palabras que empiezan con 'n', siguen con una vocal, luego 'v', y terminan con una vocal",
        possibleWords: ["nava", "nave", "navi", "navo", "navu", "neva", "neve", "nevi", "nevo", "nevu", "niva", "nive", "nivi", "nivo", "nivu", "nova", "nove", "novi", "novo", "novu", "nuva", "nuve", "nuvi", "nuvo", "nuvu"],
        correctWords: ["nava", "nave", "navi", "navo", "navu", "neva", "neve", "nevi", "nevo", "nevu", "niva", "nive", "nivi", "nivo", "nivu", "nova", "nove", "novi", "novo", "novu", "nuva", "nuve", "nuvi", "nuvo", "nuvu"],
        timeLimit: 60
      },
      {
        id: 8,
        pattern: "^s[aeiou]l[aeiou]$",
        explanation: "Palabras que empiezan con 's', siguen con una vocal, luego 'l', y terminan con una vocal",
        possibleWords: ["sala", "sale", "sali", "salo", "salu", "sela", "sele", "seli", "selo", "selu", "sila", "sile", "sili", "silo", "silu", "sola", "sole", "soli", "solo", "solu", "sula", "sule", "suli", "sulo", "sulu"],
        correctWords: ["sala", "sale", "sali", "salo", "salu", "sela", "sele", "seli", "selo", "selu", "sila", "sile", "sili", "silo", "silu", "sola", "sole", "soli", "solo", "solu", "sula", "sule", "suli", "sulo", "sulu"],
        timeLimit: 60
      },
      {
        id: 9,
        pattern: "^r[aeiou]m[aeiou]$",
        explanation: "Palabras que empiezan con 'r', siguen con una vocal, luego 'm', y terminan con una vocal",
        possibleWords: ["rama", "rame", "rami", "ramo", "ramu", "rema", "reme", "remi", "remo", "remu", "rima", "rime", "rimi", "rimo", "rimu", "roma", "rome", "romi", "romo", "romu", "ruma", "rume", "rumi", "rumo", "rumu"],
        correctWords: ["rama", "rame", "rami", "ramo", "ramu", "rema", "reme", "remi", "remo", "remu", "rima", "rime", "rimi", "rimo", "rimu", "roma", "rome", "romi", "romo", "romu", "ruma", "rume", "rumi", "rumo", "rumu"],
        timeLimit: 60
      },
      {
        id: 10,
        pattern: "^g[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'g', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["gata", "gate", "gati", "gato", "gatu", "geta", "gete", "geti", "geto", "getu", "gita", "gite", "giti", "gito", "gitu", "gota", "gote", "goti", "goto", "gotu", "guta", "gute", "guti", "guto", "gutu"],
        correctWords: ["gata", "gate", "gati", "gato", "gatu", "geta", "gete", "geti", "geto", "getu", "gita", "gite", "giti", "gito", "gitu", "gota", "gote", "goti", "goto", "gotu", "guta", "gute", "guti", "guto", "gutu"],
        timeLimit: 60
      },
      {
        id: 11,
        pattern: "^f[aeiou]r[aeiou]$",
        explanation: "Palabras que empiezan con 'f', siguen con una vocal, luego 'r', y terminan con una vocal",
        possibleWords: ["fara", "fare", "fari", "faro", "faru", "fera", "fere", "feri", "fero", "feru", "fira", "fire", "firi", "firo", "firu", "fora", "fore", "fori", "foro", "foru", "fura", "fure", "furi", "furo", "furu"],
        correctWords: ["fara", "fare", "fari", "faro", "faru", "fera", "fere", "feri", "fero", "feru", "fira", "fire", "firi", "firo", "firu", "fora", "fore", "fori", "foro", "foru", "fura", "fure", "furi", "furo", "furu"],
        timeLimit: 60
      },
      {
        id: 12,
        pattern: "^v[aeiou]n[aeiou]$",
        explanation: "Palabras que empiezan con 'v', siguen con una vocal, luego 'n', y terminan con una vocal",
        possibleWords: ["vana", "vane", "vani", "vano", "vanu", "vena", "vene", "veni", "veno", "venu", "vina", "vine", "vini", "vino", "vinu", "vona", "vone", "voni", "vono", "vonu", "vuna", "vune", "vuni", "vuno", "vunu"],
        correctWords: ["vana", "vane", "vani", "vano", "vanu", "vena", "vene", "veni", "veno", "venu", "vina", "vine", "vini", "vino", "vinu", "vona", "vone", "voni", "vono", "vonu", "vuna", "vune", "vuni", "vuno", "vunu"],
        timeLimit: 60
      },
      {
        id: 13,
        pattern: "^d[aeiou]m[aeiou]$",
        explanation: "Palabras que empiezan con 'd', siguen con una vocal, luego 'm', y terminan con una vocal",
        possibleWords: ["dama", "dame", "dami", "damo", "damu", "dema", "deme", "demi", "demo", "demu", "dima", "dime", "dimi", "dimo", "dimu", "doma", "dome", "domi", "domo", "domu", "duma", "dume", "dumi", "dumo", "dumu"],
        correctWords: ["dama", "dame", "dami", "damo", "damu", "dema", "deme", "demi", "demo", "demu", "dima", "dime", "dimi", "dimo", "dimu", "doma", "dome", "domi", "domo", "domu", "duma", "dume", "dumi", "dumo", "dumu"],
        timeLimit: 60
      },
      {
        id: 14,
        pattern: "^t[aeiou]r[aeiou]$",
        explanation: "Palabras que empiezan con 't', siguen con una vocal, luego 'r', y terminan con una vocal",
        possibleWords: ["tara", "tare", "tari", "taro", "taru", "tera", "tere", "teri", "tero", "teru", "tira", "tire", "tiri", "tiro", "tiru", "tora", "tore", "tori", "toro", "toru", "tura", "ture", "turi", "turo", "turu"],
        correctWords: ["tara", "tare", "tari", "taro", "taru", "tera", "tere", "teri", "tero", "teru", "tira", "tire", "tiri", "tiro", "tiru", "tora", "tore", "tori", "toro", "toru", "tura", "ture", "turi", "turo", "turu"],
        timeLimit: 60
      },
      {
        id: 15,
        pattern: "^p[aeiou]l[aeiou]$",
        explanation: "Palabras que empiezan con 'p', siguen con una vocal, luego 'l', y terminan con una vocal",
        possibleWords: ["pala", "pale", "pali", "palo", "palu", "pela", "pele", "peli", "pelo", "pelu", "pila", "pile", "pili", "pilo", "pilu", "pola", "pole", "poli", "polo", "polu", "pula", "pule", "puli", "pulo", "pulu"],
        correctWords: ["pala", "pale", "pali", "palo", "palu", "pela", "pele", "peli", "pelo", "pelu", "pila", "pile", "pili", "pilo", "pilu", "pola", "pole", "poli", "polo", "polu", "pula", "pule", "puli", "pulo", "pulu"],
        timeLimit: 60
      },
      {
        id: 16,
        pattern: "^m[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'm', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["mata", "mate", "mati", "mato", "matu", "meta", "mete", "meti", "meto", "metu", "mita", "mite", "miti", "mito", "mitu", "mota", "mote", "moti", "moto", "motu", "muta", "mute", "muti", "muto", "mutu"],
        correctWords: ["mata", "mate", "mati", "mato", "matu", "meta", "mete", "meti", "meto", "metu", "mita", "mite", "miti", "mito", "mitu", "mota", "mote", "moti", "moto", "motu", "muta", "mute", "muti", "muto", "mutu"],
        timeLimit: 60
      },
      {
        id: 17,
        pattern: "^s[aeiou]p[aeiou]$",
        explanation: "Palabras que empiezan con 's', siguen con una vocal, luego 'p', y terminan con una vocal",
        possibleWords: ["sapa", "sape", "sapi", "sapo", "sapu", "sepa", "sepe", "sepi", "sepo", "sepu", "sipa", "sipe", "sipi", "sipo", "sipu", "sopa", "sope", "sopi", "sopo", "sopu", "supa", "supe", "supi", "supo", "supu"],
        correctWords: ["sapa", "sape", "sapi", "sapo", "sapu", "sepa", "sepe", "sepi", "sepo", "sepu", "sipa", "sipe", "sipi", "sipo", "sipu", "sopa", "sope", "sopi", "sopo", "sopu", "supa", "supe", "supi", "supo", "supu"],
        timeLimit: 60
      },
      {
        id: 18,
        pattern: "^c[aeiou]v[aeiou]$",
        explanation: "Palabras que empiezan con 'c', siguen con una vocal, luego 'v', y terminan con una vocal",
        possibleWords: ["cava", "cave", "cavi", "cavo", "cavu", "ceva", "ceve", "cevi", "cevo", "cevu", "civa", "cive", "civi", "civo", "civu", "cova", "cove", "covi", "covo", "covu", "cuva", "cuve", "cuvi", "cuvo", "cuvu"],
        correctWords: ["cava", "cave", "cavi", "cavo", "cavu", "ceva", "ceve", "cevi", "cevo", "cevu", "civa", "cive", "civi", "civo", "civu", "cova", "cove", "covi", "covo", "covu", "cuva", "cuve", "cuvi", "cuvo", "cuvu"],
        timeLimit: 60
      },
      {
        id: 19,
        pattern: "^b[aeiou]t[aeiou]$",
        explanation: "Palabras que empiezan con 'b', siguen con una vocal, luego 't', y terminan con una vocal",
        possibleWords: ["bata", "bate", "bati", "bato", "batu", "beta", "bete", "beti", "beto", "betu", "bita", "bite", "biti", "bito", "bitu", "bota", "bote", "boti", "boto", "botu", "buta", "bute", "buti", "buto", "butu"],
        correctWords: ["bata", "bate", "bati", "bato", "batu", "beta", "bete", "beti", "beto", "betu", "bita", "bite", "biti", "bito", "bitu", "bota", "bote", "boti", "boto", "botu", "buta", "bute", "buti", "buto", "butu"],
        timeLimit: 60
      },
      {
        id: 20,
        pattern: "^g[aeiou]m[aeiou]$",
        explanation: "Palabras que empiezan con 'g', siguen con una vocal, luego 'm', y terminan con una vocal",
        possibleWords: ["gama", "game", "gami", "gamo", "gamu", "gema", "geme", "gemi", "gemo", "gemu", "gima", "gime", "gimi", "gimo", "gimu", "goma", "gome", "gomi", "gomo", "gomu", "guma", "gume", "gumi", "gumo", "gumu"],
        correctWords: ["gama", "game", "gami", "gamo", "gamu", "gema", "geme", "gemi", "gemo", "gemu", "gima", "gime", "gimi", "gimo", "gimu", "goma", "gome", "gomi", "gomo", "gomu", "guma", "gume", "gumi", "gumo", "gumu"],
        timeLimit: 60
      },
      {
        id: 21,
        pattern: "^fl[aeiou]t[aeiou]$",
        explanation: "Palabras que comienzan con 'fl', siguen con una vocal, luego 't' y terminan con una vocal",
        possibleWords: ["flata", "flate", "flati", "flato", "flatu", "fleta", "flete", "fleti", "fleto", "fletu", "flita", "flite", "fliti", "flito", "flitu", "flota", "flote", "floti", "floto", "flotu", "fluta", "flute", "fluti", "fluto", "flutu"],
        correctWords: ["flata", "flate", "flati", "flato", "flatu", "fleta", "flete", "fleti", "fleto", "fletu", "flita", "flite", "fliti", "flito", "flitu", "flota", "flote", "floti", "floto", "flotu", "fluta", "flute", "fluti", "fluto", "flutu"],
        timeLimit: 60
      },
      {
        id: 22,
        pattern: "^tr[aeiou]n[aeiou]$",
        explanation: "Palabras que comienzan con 'tr', siguen con una vocal, luego 'n' y terminan con una vocal",
        possibleWords: ["trana", "trane", "trani", "trano", "tranu", "trena", "trene", "treni", "treno", "trenu", "trina", "trine", "trini", "trino", "trinu", "trona", "trone", "troni", "trono", "tronu", "truna", "trune", "truni", "truno", "trunu"],
        correctWords: ["trana", "trane", "trani", "trano", "tranu", "trena", "trene", "treni", "treno", "trenu", "trina", "trine", "trini", "trino", "trinu", "trona", "trone", "troni", "trono", "tronu", "truna", "trune", "truni", "truno", "trunu"],
        timeLimit: 60
      },
      {
        id: 23,
        pattern: "^fr[aeiou]g[aeiou]$",
        explanation: "Palabras que comienzan con 'fr', siguen con una vocal, luego 'g' y terminan con una vocal",
        possibleWords: ["fraga", "frage", "fragi", "frago", "fragu", "frega", "frege", "fregi", "frego", "fregu", "friga", "frige", "frigi", "frigo", "frigu", "froga", "froge", "frogi", "frogo", "frogu", "fruga", "fruge", "frugi", "frugo", "frugu"],
        correctWords: ["fraga", "frage", "fragi", "frago", "fragu", "frega", "frege", "fregi", "frego", "fregu", "friga", "frige", "frigi", "frigo", "frigu", "froga", "froge", "frogi", "frogo", "frogu", "fruga", "fruge", "frugi", "frugo", "frugu"],
        timeLimit: 60
      },
      {
        id: 24,
        pattern: "^pl[aeiou]m[aeiou]$",
        explanation: "Palabras que comienzan con 'pl', siguen con una vocal, luego 'm' y terminan con una vocal",
        possibleWords: ["plama", "plame", "plami", "plamo", "plamu", "plema", "pleme", "plemi", "plemo", "plemu", "plima", "plime", "plimi", "plimo", "plimu", "ploma", "plome", "plomi", "plomo", "plomu", "pluma", "plume", "plumi", "plumo", "plumu"],
        correctWords: ["plama", "plame", "plami", "plamo", "plamu", "plema", "pleme", "plemi", "plemo", "plemu", "plima", "plime", "plimi", "plimo", "plimu", "ploma", "plome", "plomi", "plomo", "plomu", "pluma", "plume", "plumi", "plumo", "plumu"],
        timeLimit: 60
      },
      {
        id: 25,
        pattern: "^dr[aeiou]p[aeiou]$",
        explanation: "Palabras que comienzan con 'dr', siguen con una vocal, luego 'p' y terminan con una vocal",
        possibleWords: ["drapa", "drape", "drapi", "drapo", "drapu", "drepa", "drepe", "drepi", "drepo", "drepu", "dripa", "dripe", "dripi", "dripo", "dripu", "dropa", "drope", "dropi", "dropo", "dropu", "drupa", "drupe", "drupi", "drupo", "drupu"],
        correctWords: ["drapa", "drape", "drapi", "drapo", "drapu", "drepa", "drepe", "drepi", "drepo", "drepu", "dripa", "dripe", "dripi", "dripo", "dripu", "dropa", "drope", "dropi", "dropo", "dropu", "drupa", "drupe", "drupi", "drupo", "drupu"],
        timeLimit: 60
      },
      {
        id: 26,
        pattern: "^bl[aeiou]s[aeiou]$",
        explanation: "Palabras que comienzan con 'bl', siguen con una vocal, luego 's' y terminan con una vocal",
        possibleWords: ["blasa", "blase", "blasi", "blaso", "blasu", "blesa", "blese", "blesi", "bleso", "blesu", "blisa", "blise", "blisi", "bliso", "blisu", "blosa", "blose", "blosi", "bloso", "blosu", "blusa", "bluse", "blusi", "bluso", "blusu"],
        correctWords: ["blasa", "blase", "blasi", "blaso", "blasu", "blesa", "blese", "blesi", "bleso", "blesu", "blisa", "blise", "blisi", "bliso", "blisu", "blosa", "blose", "blosi", "bloso", "blosu", "blusa", "bluse", "blusi", "bluso", "blusu"],
        timeLimit: 60
      },
      {
        id: 27,
        pattern: "^gr[aeiou]m[aeiou]$",
        explanation: "Palabras que comienzan con 'gr', siguen con una vocal, luego 'm' y terminan con una vocal",
        possibleWords: ["grama", "grame", "grami", "gramo", "gramu", "grema", "greme", "gremi", "gremo", "gremu", "grima", "grime", "grimi", "grimo", "grimu", "groma", "grome", "gromi", "gromo", "gromu", "gruma", "grume", "grumi", "grumo", "grumu"],
        correctWords: ["grama", "grame", "grami", "gramo", "gramu", "grema", "greme", "gremi", "gremo", "gremu", "grima", "grime", "grimi", "grimo", "grimu", "groma", "grome", "gromi", "gromo", "gromu", "gruma", "grume", "grumi", "grumo", "grumu"],
        timeLimit: 60
      },
      {
        id: 28,
        pattern: "^sn[aeiou]k[aeiou]$",
        explanation: "Palabras que comienzan con 'sn', siguen con una vocal, luego 'k' y terminan con una vocal",
        possibleWords: ["snaka", "snake", "snaki", "snako", "snaku", "sneka", "sneke", "sneki", "sneko", "sneku", "snika", "snike", "sniki", "sniko", "sniku", "snoka", "snoke", "snoki", "snoko", "snoku", "snuka", "snuke", "snuki", "snuko", "snuku"],
        correctWords: ["snaka", "snake", "snaki", "snako", "snaku", "sneka", "sneke", "sneki", "sneko", "sneku", "snika", "snike", "sniki", "sniko", "sniku", "snoka", "snoke", "snoki", "snoko", "snoku", "snuka", "snuke", "snuki", "snuko", "snuku"],
        timeLimit: 60
      },
      {
        id: 29,
        pattern: "^tw[aeiou]s[aeiou]$",
        explanation: "Palabras que comienzan con 'tw', siguen con una vocal, luego 's' y terminan con una vocal",
        possibleWords: ["twasa", "twase", "twasi", "twaso", "twasu", "twesa", "twese", "twesi", "tweso", "twesu", "twisa", "twise", "twisi", "twiso", "twisu", "twosa", "twose", "twosi", "twoso", "twosu", "twusa", "twuse", "twusi", "twuso", "twusu"],
        correctWords: ["twasa", "twase", "twasi", "twaso", "twasu", "twesa", "twese", "twesi", "tweso", "twesu", "twisa", "twise", "twisi", "twiso", "twisu", "twosa", "twose", "twosi", "twoso", "twosu", "twusa", "twuse", "twusi", "twuso", "twusu"],
        timeLimit: 60
      },
      {
        id: 30,
        pattern: "^sc[aeiou]t[aeiou]$",
        explanation: "Palabras que comienzan con 'sc', siguen con una vocal, luego 't' y terminan con una vocal",
        possibleWords: ["scata", "scate", "scati", "scato", "scatu", "sceta", "scete", "sceti", "sceto", "scetu", "scita", "scite", "sciti", "scito", "scitu", "scota", "scote", "scoti", "scoto", "scotu", "scuta", "scute", "scuti", "scuto", "scutu"],
        correctWords: ["scata", "scate", "scati", "scato", "scatu", "sceta", "scete", "sceti", "sceto", "scetu", "scita", "scite", "sciti", "scito", "scitu", "scota", "scote", "scoti", "scoto", "scotu", "scuta", "scute", "scuti", "scuto", "scutu"],
        timeLimit: 60
      }
    ],
    requiredPoints: 6 // puntos para ganar (cambiar al mimso numero de desafios) 
  }
];

const initialState: GameState = {
  currentLevel: 0,
  levels: initialLevels,
  totalPoints: 0,
  currentChallenge: 0,
  userInput: '',
  feedback: null,
  gameStarted: false,
  gameOver: false, // Inicializamos gameOver como false
  remainingTime: 0,
  correctWords: [],
  incorrectAttempts: []
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (gameState.gameStarted && gameState.remainingTime > 0 && !gameState.gameOver) {
      timer = setInterval(() => {
        setGameState(prevState => ({
          ...prevState,
          remainingTime: prevState.remainingTime - 1
        }));
      }, 1000);
    } else if (gameState.remainingTime === 0 && gameState.gameStarted && !gameState.gameOver) {
      // Si el tiempo llega a 0, establecemos el juego como terminado (game over)
      setGameState(prevState => ({
        ...prevState,
        gameOver: true,
        feedback: {
          isCorrect: false,
          message: '¡Tiempo agotado! Has perdido. ¡Buen intento, pero tendrás que empezar de nuevo!'
        }
      }));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.gameStarted, gameState.remainingTime, gameState.gameOver]);

  const startGame = () => {
    const currentLevelData = initialState.levels[initialState.currentLevel];
    const currentChallengeData = currentLevelData.challenges[initialState.currentChallenge];
    
    setGameState({
      ...initialState,
      gameStarted: true,
      gameOver: false,
      remainingTime: currentChallengeData.timeLimit
    });
  };

  const resetGame = () => {
    startGame();
  };

  const checkWord = (word: string) => {
    if (gameState.gameOver) return; // No hacemos nada si el juego ya terminó

    const currentLevel = gameState.levels[gameState.currentLevel];
    const challenge = currentLevel.challenges[gameState.currentChallenge];
    
    if (gameState.correctWords.includes(word)) {
      setGameState(prevState => ({
        ...prevState,
        feedback: {
          isCorrect: false,
          message: '¡Ya has encontrado esta palabra!'
        }
      }));
      return;
    }
    
    if (challenge.correctWords.includes(word)) {
      const newCorrectWords = [...gameState.correctWords, word];
      const newPoints = gameState.totalPoints + 1;
      
      setGameState(prevState => ({
        ...prevState,
        totalPoints: newPoints,
        correctWords: newCorrectWords,
        feedback: {
          isCorrect: true,
          message: '¡Correcto! Has encontrado una palabra válida.'
        },
        userInput: ''
      }));
    } else {
      const pattern = new RegExp(challenge.pattern);
      let errorPosition = -1;
      let errorMessage = "Esta palabra no coincide con el patrón.";
      
      if (word.length > 0) {
        if (!word.startsWith(challenge.pattern.substring(1, 2))) {
          errorPosition = 0;
          errorMessage = "El inicio de la palabra no coincide con el patrón.";
        } else if (word.length > 1 && !pattern.test(word)) {
          const patternParts = challenge.pattern.slice(1, -1).split('');
          for (let i = 0; i < word.length; i++) {
            if (patternParts[i] === '[aeiou]' && !/[aeiou]/.test(word[i])) {
              errorPosition = i;
              errorMessage = "Aquí debería haber una vocal (a, e, i, o, u).";
              break;
            }
          }
        }
      }
      
      const newIncorrectAttempts = [...gameState.incorrectAttempts, word];
      
      setGameState(prevState => ({
        ...prevState,
        incorrectAttempts: newIncorrectAttempts,
        feedback: {
          isCorrect: false,
          message: errorMessage,
          errorPosition: errorPosition !== -1 ? errorPosition : undefined
        }
      }));
    }
  };

  const setUserInput = (input: string) => {
    if (gameState.gameOver) return; // No hacemos nada si el juego ya terminó
    
    setGameState(prevState => ({
      ...prevState,
      userInput: input,
      feedback: null
    }));
  };

  const nextChallenge = () => {
    if (gameState.gameOver) return; // No hacemos nada si el juego ya terminó
    
    const currentLevel = gameState.levels[gameState.currentLevel];
    
    if (gameState.currentChallenge < currentLevel.challenges.length - 1) {
      const nextChallengeIndex = gameState.currentChallenge + 1;
      const nextChallenge = currentLevel.challenges[nextChallengeIndex];
      
      setGameState(prevState => ({
        ...prevState,
        currentChallenge: nextChallengeIndex,
        userInput: '',
        feedback: null,
        correctWords: [],
        incorrectAttempts: [],
        remainingTime: nextChallenge.timeLimit
      }));
    } else {
      const hasEnoughPoints = gameState.totalPoints >= currentLevel.requiredPoints;
      
      if (hasEnoughPoints && gameState.currentLevel < gameState.levels.length - 1) {
        const nextLevelIndex = gameState.currentLevel + 1;
        const nextLevel = gameState.levels[nextLevelIndex];
        
        setGameState(prevState => ({
          ...prevState,
          currentLevel: nextLevelIndex,
          currentChallenge: 0,
          userInput: '',
          feedback: {
            isCorrect: true,
            message: `¡Nivel completado! Avanzando al nivel: ${nextLevel.name}`
          },
          correctWords: [],
          incorrectAttempts: [],
          remainingTime: nextLevel.challenges[0].timeLimit
        }));
      } else if (hasEnoughPoints) {
        setGameState(prevState => ({
          ...prevState,
          gameStarted: false,
          feedback: {
            isCorrect: true,
            message: '¡Felicidades! Has completado todos los niveles.'
          }
        }));
      } else {
        setGameState(prevState => ({
          ...prevState,
          feedback: {
            isCorrect: false,
            message: `Necesitas ${currentLevel.requiredPoints} puntos para completar este nivel. ¡Inténtalo de nuevo!`
          }
        }));
      }
    }
  };

  const resetLevel = () => {
    const currentLevel = gameState.levels[gameState.currentLevel];
    
    setGameState(prevState => ({
      ...prevState,
      currentChallenge: 0,
      userInput: '',
      totalPoints: 0,
      feedback: null,
      correctWords: [],
      incorrectAttempts: [],
      remainingTime: currentLevel.challenges[0].timeLimit,
      gameOver: false // Restablecemos el estado de game over
    }));
  };

  const value = {
    gameState,
    startGame,
    checkWord,
    setUserInput,
    nextChallenge,
    resetLevel,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};