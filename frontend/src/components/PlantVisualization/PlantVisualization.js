import React from 'react';
import { useSelector } from 'react-redux';
import Plant from './Plant';

const PlantVisualization = () => {
  const plants = useSelector(state => state.plants.plants);
  const selectedPlant = useSelector(state => state.plants.selectedPlant);

  return (
    <div className="plant-visualization">
      <h2>Plant Visualization</h2>
      <div className="plant-container">
        {selectedPlant ? (
          <Plant plant={selectedPlant} />
        ) : (
          plants.map(plant => (
            <Plant key={plant._id} plant={plant} />
          ))
        )}
      </div>
    </div>
  );
};

export default PlantVisualization;