const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbName = process.env.NODE_ENV === 'test' ? 'test_plant_evolution' : 'plant_evolution';
    const uri = process.env.NODE_ENV === 'test' 
      ? process.env.MONGO_URI
      : process.env.MONGO_URI;
    
    const conn = await mongoose.connect(uri, {
      dbName: dbName
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;