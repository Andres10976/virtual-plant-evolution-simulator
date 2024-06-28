import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlant,
  growPlant,
  breedPlants,
  updateEnvironment,
} from "../../redux/plantsSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plants.plants);
  const environment = useSelector((state) => state.plants.environmentalFactors);
  const [selectedPlants, setSelectedPlants] = useState([]);

  const handleCreatePlant = () => {
    dispatch(createPlant());
  };

  const handleGrowPlants = () => {
    plants.forEach((plant) => dispatch(growPlant(plant._id)));
  };

  const handleBreedPlants = () => {
    if (selectedPlants.length === 2) {
      dispatch(
        breedPlants({
          plant1Id: selectedPlants[0],
          plant2Id: selectedPlants[1],
        })
      );
      setSelectedPlants([]);
    }
  };

  const handlePlantSelection = (plantId) => {
    setSelectedPlants((prev) => {
      if (prev.includes(plantId)) {
        return prev.filter((id) => id !== plantId);
      } else if (prev.length < 2) {
        return [...prev, plantId];
      }
      return prev;
    });
  };

  const handleEnvironmentChange = (factor, value) => {
    dispatch(updateEnvironment({ [factor]: parseFloat(value) }));
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <button onClick={handleCreatePlant}>Create New Plant</button>
      <button onClick={handleGrowPlants}>Grow All Plants</button>
      <button
        onClick={handleBreedPlants}
        disabled={selectedPlants.length !== 2}
      >
        Breed Selected Plants
      </button>
      <div>
        <h3>Select Plants for Breeding:</h3>
        {plants.map((plant) => (
          <button
            key={plant._id}
            onClick={() => handlePlantSelection(plant._id)}
            style={{
              backgroundColor: selectedPlants.includes(plant._id)
                ? "lightblue"
                : "white",
            }}
          >
            Plant {plant._id}
          </button>
        ))}
      </div>
      <div>
        <h3>Environmental Controls:</h3>
        <label>
          Temperature:
          <input
            type="range"
            min="0"
            max="50"
            value={environment.temperature}
            onChange={(e) =>
              handleEnvironmentChange("temperature", e.target.value)
            }
          />
          {environment.temperature}°C
        </label>
        <label>
          Rainfall:
          <input
            type="range"
            min="0"
            max="100"
            value={environment.rainfall}
            onChange={(e) =>
              handleEnvironmentChange("rainfall", e.target.value)
            }
          />
          {environment.rainfall}mm
        </label>
        <label>
          Soil Quality:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={environment.soilQuality}
            onChange={(e) =>
              handleEnvironmentChange("soilQuality", e.target.value)
            }
          />
          {environment.soilQuality}
        </label>
        <label>
          Sunlight:
          <input
            type="range"
            min="0"
            max="24"
            value={environment.sunlight}
            onChange={(e) =>
              handleEnvironmentChange("sunlight", e.target.value)
            }
          />
          {environment.sunlight} hours
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
