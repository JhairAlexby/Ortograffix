import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PatternVisualizerProps {
  pattern: string;
  explanation?: string;
}

const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ 
  pattern, 
  explanation 
}) => {
  const renderPatternParts = () => {
    if (pattern === "^c[aeiou]sa$") {
      return (
        <div className="flex flex-wrap items-center justify-center gap-1 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  ^
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inicio de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  c
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra c</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  s
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra s</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  a
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra a</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  $
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fin de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    if (pattern === "^m[aeiou]r[aeiou]$") {
      return (
        <div className="flex flex-wrap items-center justify-center gap-1 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  ^
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inicio de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  m
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra m</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  r
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra r</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  $
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fin de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    if (pattern === "^p[aeiou]t[aeiou]$") {
      return (
        <div className="flex flex-wrap items-center justify-center gap-1 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  ^
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inicio de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  p
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra p</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  t
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra t</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  $
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fin de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    if (pattern === "^b[aeiou]ll[aeiou]$") {
      return (
        <div className="flex flex-wrap items-center justify-center gap-1 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  ^
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inicio de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  b
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letra b</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-accent-foreground shadow-sm">
                  ll
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Letras ll</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-auto min-w-10 items-center justify-center rounded-md bg-primary/20 px-2 text-primary shadow-sm">
                  [<span className="text-red-500">a</span>
                  <span className="text-orange-500">e</span>
                  <span className="text-yellow-500">i</span>
                  <span className="text-green-500">o</span>
                  <span className="text-blue-500">u</span>]
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cualquier vocal (a, e, i, o, u)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-900 shadow-sm">
                  $
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fin de palabra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center py-4">
        <div className="rounded-md border border-border bg-card px-4 py-3 font-mono text-lg">
          {pattern}
        </div>
      </div>
    );
  };

  const getPatternExplanation = () => {
    if (explanation) {
      return explanation;
    }

    const explanations: Record<string, string> = {
      "^c[aeiou]sa$": "Este patrón busca palabras de 4 letras que empiezan con 'c', siguen con una vocal, luego 's' y terminan con 'a'.",
      "^m[aeiou]r[aeiou]$": "Este patrón busca palabras de 4 letras que empiezan con 'm', siguen con una vocal, luego 'r', y terminan con una vocal.",
      "^p[aeiou]t[aeiou]$": "Este patrón busca palabras de 4 letras que empiezan con 'p', siguen con una vocal, luego 't', y terminan con una vocal.",
      "^b[aeiou]ll[aeiou]$": "Este patrón busca palabras de 5 letras que empiezan con 'b', siguen con una vocal, luego 'll', y terminan con una vocal."
    };
    
    return explanations[pattern] || "Este patrón busca palabras específicas según una estructura.";
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-sm font-medium">Fórmula mágica:</h3>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
            <code>{pattern}</code>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>La fórmula mágica es un patrón que describe qué palabras estamos buscando</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="overflow-x-auto">
          {renderPatternParts()}
        </div>

        <Separator className="my-3" />

        <div className="text-xs text-muted-foreground">
          <div className="mb-2 grid grid-cols-3 gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-blue-100"></div>
              <span>Delimitadores</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-accent/20"></div>
              <span>Letras específicas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-primary/20"></div>
              <span>Grupos de letras</span>
            </div>
          </div>

          <p>{getPatternExplanation()}</p>
        </div>
      </div>
    </Card>
  );
};

export default PatternVisualizer;