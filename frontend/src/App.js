import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PlantVisualization from './components/PlantVisualization/PlantVisualization';
import ControlPanel from './components/ControlPanel/ControlPanel';
import EvolutionDashboard from './components/EvolutionDashboard/EvolutionDashboard';
import EnvironmentVisualizer from './components/EnvironmentVisualizer/EnvironmentVisualizer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Virtual Plant Evolution Simulator</h1>
        <EnvironmentVisualizer />
        <div className="main-content">
          <PlantVisualization />
          <ControlPanel />
        </div>
        <EvolutionDashboard />
      </div>
    </Provider>
  );
}

export default App;