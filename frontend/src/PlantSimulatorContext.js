import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const PlantSimulatorContext = createContext();

const initialState = {
  plants: [],
  environmentalFactors: {
    temperature: 25,
    rainfall: 50,
    soilQuality: 0.7,
    sunlight: 12,
  },
  selectedPlants: [],
};

function plantSimulatorReducer(state, action) {
  switch (action.type) {
    case "CREATE_PLANT":
      return {
        ...state,
        plants: [...state.plants, action.payload],
      };
    case "GROW_PLANTS":
      return {
        ...state,
        plants: state.plants.map((plant) => ({
          ...plant,
          growthStage: Math.min(plant.growthStage + 10, 100),
          genome: {
            ...plant.genome,
            height: Math.min(plant.genome.height + 5, 100),
          },
        })),
      };
    case "UPDATE_ENVIRONMENT":
      return {
        ...state,
        environmentalFactors: {
          ...state.environmentalFactors,
          [action.payload.factor]: action.payload.value,
        },
      };
    case "SELECT_PLANT":
      return {
        ...state,
        selectedPlants:
          state.selectedPlants.length < 2
            ? [...state.selectedPlants, action.payload]
            : [state.selectedPlants[1], action.payload],
      };
    case "DESELECT_PLANT":
      return {
        ...state,
        selectedPlants: state.selectedPlants.filter(
          (id) => id !== action.payload
        ),
      };
    case "BREED_PLANTS":
      if (state.selectedPlants.length !== 2) return state;
      const [plant1, plant2] = state.selectedPlants.map((id) =>
        state.plants.find((p) => p.id === id)
      );
      const childPlant = {
        id: Date.now(),
        growthStage: 0,
        genome: {
          height: (plant1.genome.height + plant2.genome.height) / 2,
          leafShape:
            Math.random() < 0.5
              ? plant1.genome.leafShape
              : plant2.genome.leafShape,
          flowerColor: blendColors(
            plant1.genome.flowerColor,
            plant2.genome.flowerColor
          ),
          resiliency: (plant1.genome.resiliency + plant2.genome.resiliency) / 2,
        },
      };
      return {
        ...state,
        plants: [...state.plants, childPlant],
        selectedPlants: [],
      };
    default:
      return state;
  }
}

function blendColors(color1, color2) {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  const r = Math.round((r1 + r2) / 2)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round((g1 + g2) / 2)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round((b1 + b2) / 2)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function PlantSimulatorProvider({ children }) {
  const [state, dispatch] = useReducer(plantSimulatorReducer, initialState);

  const createPlant = useCallback(() => {
    const newPlant = {
      id: Date.now(),
      growthStage: 0,
      genome: {
        height: Math.random() * 50 + 50,
        leafShape: ["round", "oval", "heart", "long"][
          Math.floor(Math.random() * 4)
        ],
        flowerColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
        resiliency: Math.random() * 50 + 50,
      },
    };
    dispatch({ type: "CREATE_PLANT", payload: newPlant });
  }, []);

  const growPlants = useCallback(() => {
    dispatch({ type: "GROW_PLANTS" });
  }, []);

  const updateEnvironment = useCallback((factor, value) => {
    dispatch({ type: "UPDATE_ENVIRONMENT", payload: { factor, value } });
  }, []);

  const selectPlant = useCallback((plantId) => {
    dispatch({ type: "SELECT_PLANT", payload: plantId });
  }, []);

  const deselectPlant = useCallback((plantId) => {
    dispatch({ type: "DESELECT_PLANT", payload: plantId });
  }, []);

  const breedPlants = useCallback(() => {
    dispatch({ type: "BREED_PLANTS" });
  }, []);

  const value = {
    state,
    createPlant,
    growPlants,
    updateEnvironment,
    selectPlant,
    deselectPlant,
    breedPlants,
  };

  return (
    <PlantSimulatorContext.Provider value={value}>
      {children}
    </PlantSimulatorContext.Provider>
  );
}

export function usePlantSimulator() {
  const context = useContext(PlantSimulatorContext);
  if (context === undefined) {
    throw new Error(
      "usePlantSimulator must be used within a PlantSimulatorProvider"
    );
  }
  return context;
}
