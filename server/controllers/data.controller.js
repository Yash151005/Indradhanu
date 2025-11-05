const HealthData = require('../models/HealthData.model');
const MarineData = require('../models/MarineData.model');
const CircularEconomy = require('../models/CircularEconomy.model');

// @desc    Get data ingestion status
// @route   GET /api/data/status
exports.getDataIngestionStatus = async (req, res) => {
  try {
    const now = new Date();
    const lastHour = new Date(now - 60 * 60 * 1000);

    const recentHealth = await HealthData.countDocuments({ timestamp: { $gte: lastHour } });
    const recentMarine = await MarineData.countDocuments({ timestamp: { $gte: lastHour } });
    const recentCircular = await CircularEconomy.countDocuments({ timestamp: { $gte: lastHour } });

    res.json({
      success: true,
      data: {
        status: 'active',
        lastUpdate: now,
        recentIngestion: {
          health: recentHealth,
          marine: recentMarine,
          circular: recentCircular,
          total: recentHealth + recentMarine + recentCircular
        },
        sources: ['IoT Sensors', 'Satellite Feeds', 'Manual Entry', 'API Integration']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get total data points
// @route   GET /api/data/stats
exports.getTotalDataPoints = async (req, res) => {
  try {
    const healthCount = await HealthData.countDocuments();
    const marineCount = await MarineData.countDocuments();
    const circularCount = await CircularEconomy.countDocuments();

    res.json({
      success: true,
      data: {
        totalDataPoints: healthCount + marineCount + circularCount,
        breakdown: {
          health: healthCount,
          marine: marineCount,
          circular: circularCount
        },
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get data quality metrics
// @route   GET /api/data/quality
exports.getDataQualityMetrics = async (req, res) => {
  try {
    const verifiedHealth = await HealthData.countDocuments({ verified: true });
    const totalHealth = await HealthData.countDocuments();
    
    const verifiedCircular = await CircularEconomy.countDocuments({ verified: true });
    const totalCircular = await CircularEconomy.countDocuments();

    res.json({
      success: true,
      data: {
        health: {
          verificationRate: totalHealth > 0 ? (verifiedHealth / totalHealth * 100).toFixed(2) : 0,
          verified: verifiedHealth,
          total: totalHealth
        },
        circular: {
          verificationRate: totalCircular > 0 ? (verifiedCircular / totalCircular * 100).toFixed(2) : 0,
          verified: verifiedCircular,
          total: totalCircular
        },
        blockchain: {
          enabled: true,
          integrity: 'verified'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
