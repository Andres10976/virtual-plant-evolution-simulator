// Combined plant growth and breeding logic

const growPlant = (plant, environmentalFactors) => {
    const { temperature, rainfall, soilQuality, sunlight } = environmentalFactors;
    
    // Calculate base growth rate
    let growthRate = calculateGrowthRate(temperature, rainfall, soilQuality, sunlight);
    
    // Apply plant's resiliency factor
    growthRate *= (plant.genome.resiliency / 100);
    
    // Update growth stage
    plant.growthStage = Math.min(plant.growthStage + growthRate, 100);
    
    // Update other attributes based on growth
    updatePlantAttributes(plant, growthRate, environmentalFactors);
    
    return plant;
  };
  
  const calculateGrowthRate = (temperature, rainfall, soilQuality, sunlight) => {
    // Ideal conditions
    const idealTemp = 25; // 25°C
    const idealRainfall = 50; // 50mm per week
    const idealSunlight = 12; // 12 hours per day
  
    // Calculate stress factors
    const tempStress = 1 - Math.abs(temperature - idealTemp) / 50;
    const rainfallStress = 1 - Math.abs(rainfall - idealRainfall) / 100;
    const sunlightStress = 1 - Math.abs(sunlight - idealSunlight) / 24;
  
    // Combine factors (soil quality is already on a 0-1 scale)
    return (tempStress * 0.25 + rainfallStress * 0.25 + soilQuality * 0.25 + sunlightStress * 0.25) * 10;
  };
  
  const updatePlantAttributes = (plant, growthRate, environmentalFactors) => {
    // Update height
    plant.genome.height = Math.min(plant.genome.height + (growthRate * 0.5), 100);
    
    // Update leaf shape based on environmental factors
    if (environmentalFactors.temperature > 30 && plant.genome.leafShape !== 'long') {
      plant.genome.leafShape = 'long'; // Adapt to hot climates
    } else if (environmentalFactors.rainfall > 70 && plant.genome.leafShape !== 'heart') {
      plant.genome.leafShape = 'heart'; // Adapt to wet climates
    }
    
    // Update flower color based on sunlight
    if (environmentalFactors.sunlight > 14) {
      plant.genome.flowerColor = intensifyColor(plant.genome.flowerColor);
    } else if (environmentalFactors.sunlight < 8) {
      plant.genome.flowerColor = fadeColor(plant.genome.flowerColor);
    }
    
    // Update resiliency based on overall stress
    const overallStress = (Math.abs(environmentalFactors.temperature - 25) / 50 +
                           Math.abs(environmentalFactors.rainfall - 50) / 100 +
                           Math.abs(environmentalFactors.sunlight - 12) / 24) / 3;
    plant.genome.resiliency = Math.min(Math.max(plant.genome.resiliency + overallStress * 5, 0), 100);
  
    // Handle extreme conditions (from plantLogic.js)
    if (environmentalFactors.temperature > 35 || environmentalFactors.rainfall < 20 || 
        environmentalFactors.soilQuality < 0.3 || environmentalFactors.sunlight > 14) {
      plant.genome.resiliency = Math.min(plant.genome.resiliency + 5, 100);
    }
  };
  
  const intensifyColor = (color) => {
    // Simple color intensification logic
    return color.replace(/(\d+)/g, (match) => Math.min(parseInt(match) + 20, 255));
  };
  
  const fadeColor = (color) => {
    // Simple color fading logic
    return color.replace(/(\d+)/g, (match) => Math.max(parseInt(match) - 20, 0));
  };
  
  const breedPlants = (parent1, parent2) => {
    const childGenome = {
      height: (parent1.genome.height + parent2.genome.height) / 2,
      leafShape: Math.random() < 0.5 ? parent1.genome.leafShape : parent2.genome.leafShape,
      flowerColor: blendColors(parent1.genome.flowerColor, parent2.genome.flowerColor),
      resiliency: (parent1.genome.resiliency + parent2.genome.resiliency) / 2
    };
    
    return {
      genome: childGenome,
      growthStage: 0,
      generation: Math.max(parent1.generation, parent2.generation) + 1
    };
  };
  
  const blendColors = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const blendedRgb = {
      r: Math.round((rgb1.r + rgb2.r) / 2),
      g: Math.round((rgb1.g + rgb2.g) / 2),
      b: Math.round((rgb1.b + rgb2.b) / 2)
    };
    
    return rgbToHex(blendedRgb);
  };
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const rgbToHex = (rgb) => {
    return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
  };
  
  module.exports = { growPlant, breedPlants };