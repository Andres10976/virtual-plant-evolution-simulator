const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const {growPlant, breedPlants} = require('../utils/plantLogic');
const mongoose = require('mongoose');

// Create a new plant
router.post('/', async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific plant
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update plant growth
router.put('/:id/grow', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    let plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    
    const environmentalFactors = {
      temperature: req.body.temperature || 25,
      rainfall: req.body.rainfall || 50,
      soilQuality: req.body.soilQuality || 0.5,
      sunlight: req.body.sunlight || 12
    };
    
    plant = growPlant(plant, environmentalFactors);
    await plant.save();
    
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Breed plants
router.post('/breed', async (req, res) => {
  try {
    const { plant1Id, plant2Id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(plant1Id) || !mongoose.Types.ObjectId.isValid(plant2Id)) {
      return res.status(404).json({ message: 'One or both plants not found' });
    }
    const plant1 = await Plant.findById(plant1Id);
    const plant2 = await Plant.findById(plant2Id);
    
    if (!plant1 || !plant2) return res.status(404).json({ message: 'One or both plants not found' });
    
    const childPlant = new Plant(breedPlants(plant1, plant2));
    childPlant.name = `Offspring of ${plant1.name} and ${plant2.name}`;
    
    await childPlant.save();
    res.status(201).json(childPlant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;