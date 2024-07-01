// App.js
import React from "react";
import { PlantSimulatorProvider } from "./PlantSimulatorContext";
import PlantVisualization from "./components/PlantVisualization/PlantVisualization";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import EvolutionDashboard from "./components/EvolutionDashboard/EvolutionDashboard";
import EnvironmentVisualizer from "./components/EnvironmentVisualizer/EnvironmentVisualizer";
import "./App.css";

function App() {
  return (
    <PlantSimulatorProvider>
      <div className="App">
        <h1>Virtual Plant Evolution Simulator</h1>
        <EnvironmentVisualizer />
        <div className="main-content">
          <div className="column">
            <PlantVisualization />
          </div>
          <div className="column">
            <ControlPanel />
          </div>
        </div>
        <EvolutionDashboard />
      </div>
    </PlantSimulatorProvider>
  );
}

export default App;
