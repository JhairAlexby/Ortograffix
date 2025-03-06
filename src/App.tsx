import { GameProvider } from "./contexts/GameContext";
import Laboratory from "./components/Laboratory";
import "./App.css"; // Usando el archivo CSS existente
import "./index.css"; // Asegurando que también se importe el CSS base
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <GameProvider>
        <Laboratory />
      </GameProvider>
    </TooltipProvider>
  );
}

export default App;