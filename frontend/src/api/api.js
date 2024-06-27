import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPlants = async () => {
  try {
    const response = await axios.get(`${API_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

export const createPlant = async () => {
  try {
    const response = await axios.post(`${API_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error('Error creating plant:', error);
    throw error;
  }
};

export const growPlant = async (plantId) => {
  try {
    const response = await axios.put(`${API_URL}/plants/${plantId}/grow`);
    return response.data;
  } catch (error) {
    console.error('Error growing plant:', error);
    throw error;
  }
};

export const breedPlants = async (plant1Id, plant2Id) => {
  try {
    const response = await axios.post(`${API_URL}/plants/breed`, { plant1Id, plant2Id });
    return response.data;
  } catch (error) {
    console.error('Error breeding plants:', error);
    throw error;
  }
};