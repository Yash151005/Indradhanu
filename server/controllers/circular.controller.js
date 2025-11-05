const CircularEconomy = require('../models/CircularEconomy.model');

// @desc    Get all circular economy data
// @route   GET /api/circular
exports.getCircularData = async (req, res) => {
  try {
    const { facilityType, limit = 50 } = req.query;
    
    let query = {};
    if (facilityType) query['facility.type'] = facilityType;

    const circularData = await CircularEconomy.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: circularData.length,
      data: circularData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get waste stream data
// @route   GET /api/circular/waste-streams
exports.getWasteStreams = async (req, res) => {
  try {
    const wasteData = await CircularEconomy.aggregate([
      { $unwind: '$wasteStreams' },
      {
        $group: {
          _id: '$wasteStreams.materialType',
          totalQuantity: { $sum: '$wasteStreams.quantity.value' },
          avgRecyclability: { $avg: '$wasteStreams.recyclabilityScore' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: wasteData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get circular economy recommendations
// @route   GET /api/circular/recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await CircularEconomy.find({
      'recommendations.0': { $exists: true }
    })
      .select('facility recommendations timestamp')
      .sort({ timestamp: -1 })
      .limit(20);

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get circular economy metrics
// @route   GET /api/circular/metrics
exports.getCircularMetrics = async (req, res) => {
  try {
    const metrics = await CircularEconomy.aggregate([
      {
        $group: {
          _id: null,
          avgMaterialCircularity: { $avg: '$circularMetrics.materialCircularity' },
          avgWasteToResource: { $avg: '$circularMetrics.wasteToResource' },
          avgLandfillDiversion: { $avg: '$circularMetrics.landfillDiversionRate' },
          totalFacilities: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: metrics[0] || {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Run optimization algorithm
// @route   POST /api/circular/optimize
exports.runOptimization = async (req, res) => {
  try {
    const { facilityId, wasteStreams } = req.body;

    // Simulate Genetic Algorithm optimization
    const optimizationResult = {
      algorithmUsed: 'genetic-algorithm',
      processEfficiency: Math.random() * 20 + 75, // 75-95%
      resourceRecovery: {
        currentRate: 60,
        optimizedRate: Math.random() * 15 + 80, // 80-95%
        improvementPotential: Math.random() * 25 + 20 // 20-45%
      },
      carbonFootprint: {
        current: 1000,
        projected: Math.random() * 300 + 400, // 400-700
        reduction: Math.random() * 40 + 30 // 30-70%
      },
      economicValue: {
        currentValue: 50000,
        potentialValue: Math.random() * 30000 + 80000, // 80k-110k
        currency: 'USD'
      }
    };

    res.status(200).json({
      success: true,
      message: 'Optimization completed',
      data: optimizationResult
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Optimization failed',
      error: error.message
    });
  }
};
