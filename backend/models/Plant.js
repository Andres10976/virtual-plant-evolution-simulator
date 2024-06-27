const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  genome: {
    height: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    leafShape: {
      type: String,
      required: true,
      enum: ['round', 'oval', 'heart', 'long']
    },
    flowerColor: {
      type: String,
      required: true
    },
    resiliency: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  generation: {
    type: Number,
    default: 1
  },
  growthStage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plant', PlantSchema);