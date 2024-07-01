import React from "react";
import { usePlantSimulator } from "../../PlantSimulatorContext";
import Plant from "./Plant";
import "./PlantVisualization.css";

const PlantVisualization = () => {
  const { state } = usePlantSimulator();
  const { plants, selectedPlants } = state;

  return (
    <div className="plant-visualization">
      <h2>Plant Visualization</h2>
      <div className="plant-grid">
        {plants.map((plant) => (
          <div className="plant-container" key={plant.id}>
            <Plant
              plant={plant}
              isSelected={selectedPlants.includes(plant.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantVisualization;
