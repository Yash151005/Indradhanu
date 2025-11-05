const HealthData = require('../models/HealthData.model');

// @desc    Get all health data
// @route   GET /api/health
exports.getHealthData = async (req, res) => {
  try {
    const { region, diseaseType, limit = 50 } = req.query;
    
    let query = {};
    if (region) query.region = region;
    if (diseaseType) query.diseaseType = diseaseType;

    const healthData = await HealthData.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: healthData.length,
      data: healthData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get disease outbreak predictions
// @route   GET /api/health/predictions
exports.getHealthPredictions = async (req, res) => {
  try {
    const predictions = await HealthData.find({
      'predictions.shortTerm.predictedCases': { $exists: true }
    })
      .sort({ 'predictions.shortTerm.confidence': -1 })
      .limit(20);

    res.json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get active health alerts
// @route   GET /api/health/alerts
exports.getHealthAlerts = async (req, res) => {
  try {
    const alerts = await HealthData.find({
      alertLevel: { $in: ['high', 'critical'] }
    })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get health statistics by region
// @route   GET /api/health/stats/:region
exports.getHealthStatsByRegion = async (req, res) => {
  try {
    const { region } = req.params;

    const stats = await HealthData.aggregate([
      { $match: { region } },
      {
        $group: {
          _id: '$diseaseType',
          totalCases: { $sum: '$casesReported' },
          avgCases: { $avg: '$casesReported' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      region,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Submit new health data
// @route   POST /api/health
exports.submitHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.create(req.body);

    res.status(201).json({
      success: true,
      data: healthData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};
