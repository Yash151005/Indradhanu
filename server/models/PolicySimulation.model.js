const mongoose = require('mongoose');

const PolicySimulationSchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true,
    enum: ['health', 'marine', 'circular-economy', 'cross-domain']
  },
  description: String,
  targetRegion: {
    type: String,
    required: true
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  simulationResults: {
    scenario: String,
    projectedOutcomes: [{
      metric: String,
      baseline: Number,
      projected: Number,
      changePercentage: Number,
      timeframe: String
    }],
    confidence: {
      type: Number,
      min: 0,
      max: 100
    },
    assumptions: [String],
    limitations: [String]
  },
  impact: {
    environmental: mongoose.Schema.Types.Mixed,
    economic: mongoose.Schema.Types.Mixed,
    social: mongoose.Schema.Types.Mixed,
    healthOutcomes: mongoose.Schema.Types.Mixed
  },
  stakeholders: [{
    name: String,
    type: String,
    expectedImpact: String
  }],
  implementation: {
    feasibility: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    estimatedCost: Number,
    timeToImplement: String,
    requiredResources: [String]
  },
  biasAudit: {
    fairnessScore: Number,
    detectedBiases: [String],
    mitigationActions: [String],
    lastAudited: Date
  },
  status: {
    type: String,
    enum: ['draft', 'simulating', 'completed', 'approved', 'rejected'],
    default: 'draft'
  },
  createdBy: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

PolicySimulationSchema.index({ domain: 1, status: 1 });
PolicySimulationSchema.index({ targetRegion: 1, timestamp: -1 });

module.exports = mongoose.model('PolicySimulation', PolicySimulationSchema);
