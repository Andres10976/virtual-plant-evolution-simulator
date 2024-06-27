import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch all plants
export const fetchPlants = async () => {
  try {
    const response = await axios.get(`${API_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

// Create a new plant
export const createPlant = async () => {
  try {
    const defaultPlantData = {
      name: 'New Plant',
      genome: {
        height: Math.floor(Math.random() * 50) + 50, // Random height between 50-100
        leafShape: ['round', 'oval', 'heart', 'long'][Math.floor(Math.random() * 4)],
        flowerColor: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
        resiliency: Math.floor(Math.random() * 50) + 50 // Random resiliency between 50-100
      }
    };
    const response = await axios.post(`${API_URL}/plants`, defaultPlantData);
    return response.data;
  } catch (error) {
    console.error('Error creating plant:', error);
    throw error;
  }
};

// Grow a specific plant
export const growPlant = async (plantId, environmentalFactors) => {
  try {
    const response = await axios.put(`${API_URL}/plants/${plantId}/grow`, environmentalFactors);
    return response.data;
  } catch (error) {
    console.error('Error growing plant:', error);
    throw error;
  }
};

// Breed two plants
export const breedPlants = async (plant1Id, plant2Id) => {
  try {
    const response = await axios.post(`${API_URL}/plants/breed`, { plant1Id, plant2Id });
    return response.data;
  } catch (error) {
    console.error('Error breeding plants:', error);
    throw error;
  }
};

// Update environmental factors
export const updateEnvironment = async (environmentalFactors) => {
  try {
    const response = await axios.put(`${API_URL}/environment`, environmentalFactors);
    return response.data;
  } catch (error) {
    console.error('Error updating environment:', error);
    throw error;
  }
};

// Get a specific plant
export const getPlant = async (plantId) => {
  try {
    const response = await axios.get(`${API_URL}/plants/${plantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plant:', error);
    throw error;
  }
};

// Delete a plant
export const deletePlant = async (plantId) => {
  try {
    const response = await axios.delete(`${API_URL}/plants/${plantId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};

// Get current environmental factors
export const getEnvironment = async () => {
  try {
    const response = await axios.get(`${API_URL}/environment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching environment:', error);
    throw error;
  }
};