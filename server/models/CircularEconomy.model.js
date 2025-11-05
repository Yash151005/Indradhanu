const mongoose = require('mongoose');

const CircularEconomySchema = new mongoose.Schema({
  facility: {
    name: String,
    type: {
      type: String,
      enum: ['recycling-center', 'waste-processing', 'manufacturing', 'collection-point', 'research-facility']
    },
    location: {
      city: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    }
  },
  wasteStreams: [{
    materialType: {
      type: String,
      enum: ['plastic', 'metal', 'glass', 'organic', 'electronic', 'textile', 'paper', 'mixed']
    },
    quantity: {
      value: Number,
      unit: String // kg, tons, etc.
    },
    source: String,
    recyclabilityScore: {
      type: Number,
      min: 0,
      max: 100
    },
    contaminationLevel: {
      type: String,
      enum: ['clean', 'low', 'moderate', 'high']
    }
  }],
  optimization: {
    algorithmUsed: {
      type: String,
      default: 'genetic-algorithm'
    },
    processEfficiency: Number,
    resourceRecovery: {
      currentRate: Number,
      optimizedRate: Number,
      improvementPotential: Number
    },
    carbonFootprint: {
      current: Number,
      projected: Number,
      reduction: Number
    },
    economicValue: {
      currentValue: Number,
      potentialValue: Number,
      currency: String
    }
  },
  circularMetrics: {
    materialCircularity: {
      type: Number,
      min: 0,
      max: 100
    },
    wasteToResource: Number,
    landfillDiversionRate: Number,
    energyRecovery: Number,
    waterRecycled: Number
  },
  recommendations: [{
    category: String,
    description: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    estimatedImpact: mongoose.Schema.Types.Mixed,
    implementationCost: Number,
    roi: Number
  }],
  sustainability: {
    sdgAlignment: [{
      sdgNumber: Number,
      impactScore: Number
    }],
    environmentalBenefit: String,
    socialImpact: String
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

// Indexes
CircularEconomySchema.index({ 'facility.type': 1, timestamp: -1 });
CircularEconomySchema.index({ 'wasteStreams.materialType': 1 });

module.exports = mongoose.model('CircularEconomy', CircularEconomySchema);
