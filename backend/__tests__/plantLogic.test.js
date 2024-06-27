const { growPlant, breedPlants } = require('../utils/plantLogic');

describe('Plant Growth', () => {
  test('growPlant increases growth stage', () => {
    const plant = {
      genome: { height: 50, leafShape: 'oval', flowerColor: '#FF0000', resiliency: 70 },
      growthStage: 0
    };
    const environmentalFactors = { temperature: 25, rainfall: 50, soilQuality: 0.7, sunlight: 12 };
    
    const grownPlant = growPlant(plant, environmentalFactors);
    
    expect(grownPlant.growthStage).toBeGreaterThan(0);
    expect(grownPlant.genome.height).toBeGreaterThan(50);
  });

  test('growPlant handles extreme conditions', () => {
    const plant = {
      genome: { height: 50, leafShape: 'oval', flowerColor: '#FF0000', resiliency: 70 },
      growthStage: 0
    };
    const extremeConditions = { temperature: 40, rainfall: 10, soilQuality: 0.2, sunlight: 16 };
    
    const grownPlant = growPlant(plant, extremeConditions);
    
    expect(grownPlant.growthStage).toBeGreaterThan(0);
    expect(grownPlant.genome.resiliency).toBeGreaterThan(70);
  });
});

describe('Plant Breeding', () => {
  test('breedPlants produces child with mixed traits', () => {
    const parent1 = {
      genome: { height: 60, leafShape: 'oval', flowerColor: '#FF0000', resiliency: 70 },
      generation: 1
    };
    const parent2 = {
      genome: { height: 80, leafShape: 'long', flowerColor: '#0000FF', resiliency: 80 },
      generation: 1
    };
    
    const child = breedPlants(parent1, parent2);
    
    expect(child.genome.height).toBeGreaterThanOrEqual(60);
    expect(child.genome.height).toBeLessThanOrEqual(80);
    expect(['oval', 'long']).toContain(child.genome.leafShape);
    expect(child.genome.flowerColor).not.toBe('#FF0000');
    expect(child.genome.flowerColor).not.toBe('#0000FF');
    expect(child.genome.resiliency).toBeGreaterThanOrEqual(70);
    expect(child.genome.resiliency).toBeLessThanOrEqual(80);
    expect(child.generation).toBe(2);
  });
});