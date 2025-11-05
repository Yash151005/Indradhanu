const mongoose = require('mongoose');

const MarineDataSchema = new mongoose.Schema({
  location: {
    name: String,
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    oceanZone: {
      type: String,
      enum: ['coastal', 'pelagic', 'deep-sea', 'reef', 'polar']
    }
  },
  ecosystemMetrics: {
    biodiversityIndex: {
      type: Number,
      min: 0,
      max: 100
    },
    speciesCount: Number,
    endangeredSpecies: [String],
    coralHealth: Number,
    waterQuality: {
      temperature: Number,
      pH: Number,
      salinity: Number,
      dissolvedOxygen: Number,
      turbidity: Number
    }
  },
  threats: {
    overfishing: {
      type: String,
      enum: ['none', 'low', 'moderate', 'severe']
    },
    pollution: {
      plasticDensity: Number,
      chemicalContaminants: [String],
      oilSpills: Boolean
    },
    climateImpact: {
      bleachingRisk: Number,
      acidification: Number,
      temperatureChange: Number
    }
  },
  digitalTwin: {
    simulationId: String,
    lastUpdated: Date,
    scenarios: [{
      scenarioName: String,
      parameters: mongoose.Schema.Types.Mixed,
      projectedOutcome: {
        biodiversityChange: Number,
        ecosystemResilience: Number,
        timeframe: String
      },
      confidence: Number
    }]
  },
  conservationStatus: {
    protectedArea: Boolean,
    managementPlan: String,
    interventions: [String],
    successMetrics: mongoose.Schema.Types.Mixed
  },
  dataSource: {
    type: String,
    enum: ['satellite', 'underwater-drone', 'sensor-array', 'research-vessel', 'manual']
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Geospatial index for location-based queries
MarineDataSchema.index({ 'location.coordinates': '2dsphere' });
MarineDataSchema.index({ 'location.oceanZone': 1, timestamp: -1 });

module.exports = mongoose.model('MarineData', MarineDataSchema);
