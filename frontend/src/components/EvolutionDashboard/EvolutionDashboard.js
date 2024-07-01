import React from "react";
import { usePlantSimulator } from "../../PlantSimulatorContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./EvolutionDashboard.css";

const EvolutionDashboard = () => {
  const { state } = usePlantSimulator();
  const { plants } = state;

  const averageHeight =
    plants.reduce((sum, plant) => sum + plant.genome.height, 0) / plants.length;
  const averageResiliency =
    plants.reduce((sum, plant) => sum + plant.genome.resiliency, 0) /
    plants.length;

  const generationData = plants.reduce((acc, plant) => {
    if (!acc[plant.genome.generation]) {
      acc[plant.genome.generation] = {
        generation: plant.genome.generation,
        avgHeight: 0,
        avgResiliency: 0,
        count: 0,
      };
    }
    acc[plant.genome.generation].avgHeight += plant.genome.height;
    acc[plant.genome.generation].avgResiliency += plant.genome.resiliency;
    acc[plant.genome.generation].count++;
    return acc;
  }, {});

  const chartData = Object.values(generationData).map((gen) => ({
    generation: gen.generation,
    avgHeight: gen.avgHeight / gen.count,
    avgResiliency: gen.avgResiliency / gen.count,
  }));

  return (
    <div className="evolution-dashboard">
      <h2>Evolution Dashboard</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>Total Plants</h3>
          <p>{plants.length}</p>
        </div>
        <div className="stat-item">
          <h3>Average Height</h3>
          <p>{averageHeight.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <h3>Average Resiliency</h3>
          <p>{averageResiliency.toFixed(2)}</p>
        </div>
      </div>
      <div className="chart">
        <h3>Trait Evolution Over Generations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="generation" allowDecimals={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgHeight"
              stroke="#8884d8"
              name="Avg Height"
            />
            <Line
              type="monotone"
              dataKey="avgResiliency"
              stroke="#82ca9d"
              name="Avg Resiliency"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EvolutionDashboard;
