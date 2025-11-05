const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
    index: true
  },
  country: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  diseaseType: {
    type: String,
    required: true,
    enum: ['respiratory', 'vector-borne', 'water-borne', 'heat-related', 'other']
  },
  casesReported: {
    type: Number,
    required: true,
    min: 0
  },
  populationAtRisk: {
    type: Number,
    required: true
  },
  weatherConditions: {
    temperature: Number,
    humidity: Number,
    precipitation: Number,
    airQuality: Number
  },
  predictions: {
    shortTerm: {
      days: Number,
      predictedCases: Number,
      confidence: Number
    },
    longTerm: {
      months: Number,
      predictedCases: Number,
      confidence: Number
    }
  },
  alertLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  mitigationStrategies: [String],
  dataSource: {
    type: String,
    enum: ['iot', 'satellite', 'manual', 'hospital', 'government']
  },
  verified: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
HealthDataSchema.index({ region: 1, timestamp: -1 });
HealthDataSchema.index({ diseaseType: 1, alertLevel: 1 });

module.exports = mongoose.model('HealthData', HealthDataSchema);
