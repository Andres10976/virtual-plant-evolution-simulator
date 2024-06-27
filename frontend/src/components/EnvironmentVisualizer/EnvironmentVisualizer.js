import React from 'react';
import { useSelector } from 'react-redux';
import './EnvironmentVisualizer.css';

const EnvironmentVisualizer = () => {
  const environment = useSelector(state => state.plants.environmentalFactors);

  return (
    <div className="environment-visualizer">
      <div className="sky" style={{ backgroundColor: getSkyColor(environment.temperature, environment.sunlight) }}>
        <div className="sun" style={{ transform: `translateY(${100 - environment.sunlight * 4}px)` }}></div>
        <div className="clouds" style={{ opacity: getCloudOpacity(environment.rainfall) }}>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
      </div>
      <div className="ground" style={{ backgroundColor: getSoilColor(environment.soilQuality) }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="raindrop" style={{ animationDelay: `${index * 0.1}s` }}></div>
        ))}
      </div>
    </div>
  );
};

const getSkyColor = (temperature, sunlight) => {
  const baseColor = [135, 206, 235]; // Sky blue
  const sunsetColor = [255, 164, 27]; // Sunset orange
  
  let factor = (temperature - 15) / 35; // Normalize temperature to 0-1 range
  factor = Math.max(0, Math.min(1, factor)); // Clamp to 0-1
  
  const r = Math.round(baseColor[0] * (1 - factor) + sunsetColor[0] * factor);
  const g = Math.round(baseColor[1] * (1 - factor) + sunsetColor[1] * factor);
  const b = Math.round(baseColor[2] * (1 - factor) + sunsetColor[2] * factor);
  
  return `rgb(${r}, ${g}, ${b})`;
};

const getCloudOpacity = (rainfall) => {
  return Math.min(rainfall / 100, 0.8);
};

const getSoilColor = (soilQuality) => {
  const poorSoil = [210, 180, 140]; // Light brown
  const richSoil = [101, 67, 33];   // Dark brown
  
  const r = Math.round(poorSoil[0] * (1 - soilQuality) + richSoil[0] * soilQuality);
  const g = Math.round(poorSoil[1] * (1 - soilQuality) + richSoil[1] * soilQuality);
  const b = Math.round(poorSoil[2] * (1 - soilQuality) + richSoil[2] * soilQuality);
  
  return `rgb(${r}, ${g}, ${b})`;
};

export default EnvironmentVisualizer;