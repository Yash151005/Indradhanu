const MarineData = require('../models/MarineData.model');

// @desc    Get all marine data
// @route   GET /api/marine
exports.getMarineData = async (req, res) => {
  try {
    const { oceanZone, limit = 50 } = req.query;
    
    let query = {};
    if (oceanZone) query['location.oceanZone'] = oceanZone;

    const marineData = await MarineData.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: marineData.length,
      data: marineData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get ecosystem status
// @route   GET /api/marine/ecosystem
exports.getEcosystemStatus = async (req, res) => {
  try {
    const ecosystemData = await MarineData.aggregate([
      {
        $group: {
          _id: '$location.oceanZone',
          avgBiodiversity: { $avg: '$ecosystemMetrics.biodiversityIndex' },
          avgWaterTemp: { $avg: '$ecosystemMetrics.waterQuality.temperature' },
          avgpH: { $avg: '$ecosystemMetrics.waterQuality.pH' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: ecosystemData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get biodiversity metrics
// @route   GET /api/marine/biodiversity
exports.getBiodiversityMetrics = async (req, res) => {
  try {
    const biodiversityData = await MarineData.find({
      'ecosystemMetrics.biodiversityIndex': { $exists: true }
    })
      .select('location ecosystemMetrics.biodiversityIndex ecosystemMetrics.speciesCount ecosystemMetrics.endangeredSpecies timestamp')
      .sort({ timestamp: -1 })
      .limit(30);

    res.json({
      success: true,
      count: biodiversityData.length,
      data: biodiversityData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get marine monitoring locations
// @route   GET /api/marine/locations
exports.getMarineLocations = async (req, res) => {
  try {
    const locations = await MarineData.distinct('location');

    res.json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Run scenario simulation
// @route   POST /api/marine/scenario
exports.runScenarioSimulation = async (req, res) => {
  try {
    const { locationId, scenarioName, parameters } = req.body;

    // Simulate RL-based scenario testing
    const simulationResult = {
      scenarioName,
      parameters,
      projectedOutcome: {
        biodiversityChange: Math.random() * 20 - 10, // Simulated change
        ecosystemResilience: Math.random() * 100,
        timeframe: '5 years'
      },
      confidence: Math.random() * 30 + 70 // 70-100% confidence
    };

    res.status(201).json({
      success: true,
      message: 'Scenario simulation completed',
      data: simulationResult
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Simulation failed',
      error: error.message
    });
  }
};
