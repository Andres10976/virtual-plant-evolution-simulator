import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPlants as fetchPlantsApi,
  createPlant as createPlantApi,
  growPlant as growPlantApi,
  breedPlants as breedPlantsApi,
} from "../api/api";

export const fetchPlants = createAsyncThunk("plants/fetchPlants", async () => {
  const response = await fetchPlantsApi();
  return response;
});

export const createPlant = createAsyncThunk("plants/createPlant", async () => {
  const response = await createPlantApi();
  return response;
});

export const growPlant = createAsyncThunk(
  "plants/growPlant",
  async (plantId) => {
    const response = await growPlantApi(plantId);
    return response;
  }
);

export const breedPlants = createAsyncThunk(
  "plants/breedPlants",
  async ({ plant1Id, plant2Id }) => {
    const response = await breedPlantsApi(plant1Id, plant2Id);
    return response;
  }
);

const initialState = {
  plants: [],
  selectedPlant: null,
  environmentalFactors: {
    temperature: 25,
    rainfall: 50,
    soilQuality: 0.7,
    sunlight: 12,
  },
  status: "idle",
  error: null,
};

export const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    selectPlant: (state, action) => {
      state.selectedPlant = state.plants.find(
        (plant) => plant._id === action.payload
      );
    },
    deselectPlant: (state) => {
      state.selectedPlant = null;
    },
    updateEnvironment: (state, action) => {
      state.environmentalFactors = {
        ...state.environmentalFactors,
        ...action.payload,
      };
    },
    resetEnvironment: (state) => {
      state.environmentalFactors = initialState.environmentalFactors;
    },
    clearError: (state) => {
      state.error = null;
    },
    updatePlant: (state, action) => {
      const index = state.plants.findIndex(
        (plant) => plant._id === action.payload._id
      );
      if (index !== -1) {
        state.plants[index] = action.payload;
      }
      if (
        state.selectedPlant &&
        state.selectedPlant._id === action.payload._id
      ) {
        state.selectedPlant = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPlant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPlant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plants.push(action.payload);
      })
      .addCase(createPlant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(growPlant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(growPlant.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.plants.findIndex(
          (plant) => plant._id === action.payload._id
        );
        if (index !== -1) {
          state.plants[index] = action.payload;
        }
        if (
          state.selectedPlant &&
          state.selectedPlant._id === action.payload._id
        ) {
          state.selectedPlant = action.payload;
        }
      })
      .addCase(growPlant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(breedPlants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(breedPlants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plants.push(action.payload);
      })
      .addCase(breedPlants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectPlant,
  deselectPlant,
  updateEnvironment,
  resetEnvironment,
  clearError,
  updatePlant,
} = plantsSlice.actions;

// Selectors
export const selectAllPlants = (state) => state.plants.plants;
export const selectSelectedPlant = (state) => state.plants.selectedPlant;
export const selectEnvironmentalFactors = (state) =>
  state.plants.environmentalFactors;
export const selectPlantsStatus = (state) => state.plants.status;
export const selectPlantsError = (state) => state.plants.error;

export default plantsSlice.reducer;
