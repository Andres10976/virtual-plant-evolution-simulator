// Plant.js
import React, { useState } from "react";
import "./Plant.css";

const Plant = ({ plant, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, genome, growthStage } = plant;
  const { height, leafShape, flowerColor, resiliency } = genome;

  const plantStyle = {
    width: `${height / 2}px`,
    height: `${height}px`,
    animationDuration: `${10 - resiliency / 10}s`,
  };

  const stemStyle = {
    height: `${height * 0.8}px`,
  };

  const leafStyle = {
    borderRadius:
      leafShape === "round" ? "50%" : leafShape === "oval" ? "40%" : "0",
  };

  const flowerStyle = {
    backgroundColor: flowerColor,
  };

  return (
    <div
      className={`plant growth-${Math.floor(growthStage / 10)} ${
        isSelected ? "selected" : ""
      }`}
      style={plantStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="stem" style={stemStyle}></div>
      <div className="leaf left" style={leafStyle}></div>
      <div className="leaf right" style={leafStyle}></div>
      <div className="flower" style={flowerStyle}></div>
      {isHovered && (
        <div className="info">
          <p>Plant {id.toString().slice(-4)}</p>
          <p>
            H: {height.toFixed(1)} R: {resiliency.toFixed(1)}
          </p>
          <p>Growth: {growthStage}%</p>
        </div>
      )}
    </div>
  );
};

export default Plant;
