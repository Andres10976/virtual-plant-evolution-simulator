// ControlPanel.js
import React from "react";
import { usePlantSimulator } from "../../PlantSimulatorContext";
import {
  FaSeedling,
  FaLeaf,
  FaDna,
  FaThermometerHalf,
  FaTint,
  FaMountain,
  FaSun,
} from "react-icons/fa";
import "./ControlPanel.css";

const ControlPanel = () => {
  const {
    state,
    createPlant,
    growPlants,
    breedPlants,
    updateEnvironment,
    selectPlant,
    deselectPlant,
  } = usePlantSimulator();

  const { plants, environmentalFactors, selectedPlants } = state;

  const handlePlantSelection = (plantId) => {
    if (selectedPlants.includes(plantId)) {
      deselectPlant(plantId);
    } else {
      selectPlant(plantId);
    }
  };

  const handleEnvironmentChange = (factor, value) => {
    updateEnvironment(factor, parseFloat(value));
  };

  return (
    <div className="control-panel">
      <h2 className="control-panel-title">Control Panel</h2>
      <div className="control-panel-actions">
        <button className="action-button create" onClick={createPlant}>
          <FaSeedling /> Create New Plant
        </button>
        <button className="action-button grow" onClick={growPlants}>
          <FaLeaf /> Grow All Plants
        </button>
        <button
          className="action-button breed"
          onClick={breedPlants}
          disabled={selectedPlants.length !== 2}
        >
          <FaDna /> Breed Selected Plants
        </button>
      </div>
      <div className="plant-selection">
        <h3>Select Plants for Breeding:</h3>
        <div className="plant-grid">
          {plants.map((plant) => (
            <button
              key={plant.id}
              onClick={() => handlePlantSelection(plant.id)}
              className={`plant-button ${
                selectedPlants.includes(plant.id) ? "selected" : ""
              }`}
            >
              Plant {plant.id.toString().slice(-4)}
            </button>
          ))}
        </div>
      </div>
      <div className="environmental-controls">
        <h3>Environmental Controls:</h3>
        <div className="slider-container">
          <label>
            <FaThermometerHalf /> Temperature:
            <input
              type="range"
              min="0"
              max="50"
              value={environmentalFactors.temperature}
              onChange={(e) =>
                handleEnvironmentChange("temperature", e.target.value)
              }
            />
            <span>{environmentalFactors.temperature}°C</span>
          </label>
        </div>
        <div className="slider-container">
          <label>
            <FaTint /> Rainfall:
            <input
              type="range"
              min="0"
              max="100"
              value={environmentalFactors.rainfall}
              onChange={(e) =>
                handleEnvironmentChange("rainfall", e.target.value)
              }
            />
            <span>{environmentalFactors.rainfall}mm</span>
          </label>
        </div>
        <div className="slider-container">
          <label>
            <FaMountain /> Soil Quality:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={environmentalFactors.soilQuality}
              onChange={(e) =>
                handleEnvironmentChange("soilQuality", e.target.value)
              }
            />
            <span>{environmentalFactors.soilQuality.toFixed(1)}</span>
          </label>
        </div>
        <div className="slider-container">
          <label>
            <FaSun /> Sunlight:
            <input
              type="range"
              min="0"
              max="24"
              value={environmentalFactors.sunlight}
              onChange={(e) =>
                handleEnvironmentChange("sunlight", e.target.value)
              }
            />
            <span>{environmentalFactors.sunlight} hours</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
