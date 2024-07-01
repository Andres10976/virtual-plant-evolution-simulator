# Virtual Plant Evolution Simulator

![image](https://github.com/Andres10976/virtual-plant-evolution-simulator/assets/44916243/97b5b0a0-b67c-427a-afed-ea3651270ece)

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Acknowledgments](#acknowledgments)

## Project Overview

The Virtual Plant Evolution Simulator is an interactive web application that allows users to simulate the growth, adaptation, and evolution of virtual plants in various environmental conditions. This project combines elements of biology, genetics, and computer science to create a unique educational and entertainment platform.

Users can create, grow, and breed virtual plants, observing how they adapt to different environmental factors over time. The simulator provides a visual representation of plant growth and evolution, along with data analytics to track changes across generations.

## Key Features

1. **Plant Creation and Customization**

   - Create virtual plants with customizable genetic traits
   - Initial traits include height potential, leaf shape, flower color, and environmental resiliency

2. **Dynamic Growth Simulation**

   - Plants grow over time based on their genetic traits and environmental conditions
   - Growth is affected by factors such as temperature, rainfall, soil quality, and sunlight

3. **Environmental Customization**

   - Create and modify virtual environments with different climate conditions
   - Adjust environmental factors in real-time to observe their effects on plant growth

4. **Genetic Inheritance and Breeding**

   - Cross-breed different plants to create offspring with inherited traits
   - Breeding system includes both dominant and recessive trait inheritance, as well as the potential for mutations

5. **Evolution Visualization**

   - Visual representations of how plant populations change over generations
   - Observe adaptations to different environments over time

6. **Data Analytics and Reporting**
   - Generate reports and visualizations on plant growth, population dynamics, and genetic diversity
   - Track the lineage of plants and analyze evolutionary trends

## Technologies Used

- Frontend: React.js, Redux, Recharts
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Updates: Socket.io
- Testing: Jest, Supertest
- Version Control: Git

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/virtual-plant-evolution-simulator.git
   cd virtual-plant-evolution-simulator
   ```

2. Install dependencies for both frontend and backend:

   ```
   npm install
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development servers:
   In the root directory:
   ```
   npm run dev
   ```
   This will start both the frontend and backend servers concurrently.

## Project Structure

```
virtual-plant-evolution-simulator/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── redux/
│       ├── api/
│       └── App.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── __tests__/
│   └── server.js
├── package.json
└── README.md
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`
2. Use the Control Panel to create new plants, adjust environmental factors, and breed plants
3. Observe plant growth and evolution in the Plant Visualization area
4. Track population statistics and trends in the Evolution Dashboard

## API Endpoints

- `GET /api/plants`: Fetch all plants
- `POST /api/plants`: Create a new plant
- `GET /api/plants/:id`: Get a specific plant
- `PUT /api/plants/:id/grow`: Update plant growth
- `POST /api/plants/breed`: Breed two plants
- `PUT /api/environment`: Update environmental factors

For detailed API documentation, please refer to the [API Documentation](api-docs.md) file.

## Testing

To run the test suite:

```
cd backend
npm test
```

This will run the Jest test suite, which includes unit tests for plant logic and API endpoint tests.

## Acknowledgments

- Built with love for science education and interactive simulations
