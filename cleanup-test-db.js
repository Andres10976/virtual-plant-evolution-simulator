const mongoose = require('mongoose');

async function cleanupTestDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'test_plant_evolution'
    });

    // Get all collections
    const collections = await mongoose.connection.db.collections();

    // Drop each collection
    for (let collection of collections) {
      await collection.drop();
    }

    console.log('Test database cleaned up successfully');
  } catch (error) {
    console.error('Error cleaning up test database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

cleanupTestDatabase();