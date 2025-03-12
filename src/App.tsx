import { GameProvider } from "./contexts/GameContext";
import Laboratory from "./components/Laboratory";
import "./App.css"; 
import "./index.css"; 
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