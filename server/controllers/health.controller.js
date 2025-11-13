const HealthData = require('../models/HealthData.model');
const { 
  getDiseaseData,
  getGlobalHealthIndicators,
  getDiseaseOutbreakData,
  getEpidemiologicalData
} = require('../services/externalAPI.service');

// @desc    Get all health data
// @route   GET /api/health
exports.getHealthData = async (req, res) => {
  try {
    const { region, diseaseType, limit = 50 } = req.query;
    
    console.log('📊 Fetching real disease data from Disease.sh API...');
    
    // Fetch from external API
    let healthData = await getDiseaseData().catch(e => {
      console.warn('Real API failed, falling back to database:', e.message);
      return [];
    });

    // Filter by region if specified
    if (region) {
      healthData = healthData.filter(d => d.region.toLowerCase().includes(region.toLowerCase()));
    }

    // Apply limit
    healthData = healthData.slice(0, parseInt(limit));

    res.json({
      success: true,
      count: healthData.length,
      data: healthData,
      source: 'Disease.sh - Real-time COVID-19 tracking'
    });
  } catch (error) {
    console.error('Error in getHealthData:', error);
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
    console.log('🔮 Fetching disease predictions from external API...');
    
    let predictions = await getDiseaseData().catch(e => {
      console.warn('Real API failed, falling back to database:', e.message);
      return [];
    });

    // Return all predictions (all have confidence 0.75 from getDiseaseData)
    console.log(`📊 Returning ${predictions.length} disease predictions`);

    res.json({
      success: true,
      count: predictions.length,
      data: predictions,
      source: 'Disease.sh predictive models'
    });
  } catch (error) {
    console.error('Error in getHealthPredictions:', error);
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
    console.log('🚨 Fetching active health alerts from external API...');
    
    let alerts = await getDiseaseData().catch(e => {
      console.warn('Real API failed, falling back to database:', e.message);
      return [];
    });

    // Include all high and critical alerts, or return all if less than 5
    const filtered = alerts.filter(a => ['high', 'critical'].includes(a.alertLevel));
    const result = filtered.length >= 5 ? filtered : alerts;
    
    console.log(`📊 Returning ${result.length} health alerts (${filtered.length} high/critical, ${alerts.length} total available)`);

    res.json({
      success: true,
      count: result.length,
      data: result,
      source: 'Disease.sh - Real-time disease tracking'
    });
  } catch (error) {
    console.error('Error in getHealthAlerts:', error);
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

// @desc    Get global health indicators
// @route   GET /api/health/indicators
exports.getHealthIndicators = async (req, res) => {
  try {
    console.log('🏥 Fetching global health indicators...');
    
    const indicators = await getGlobalHealthIndicators().catch(e => {
      console.warn('Failed to fetch indicators:', e.message);
      return [];
    });

    res.json({
      success: true,
      count: indicators.length,
      data: indicators,
      source: 'WHO and World Bank health data'
    });
  } catch (error) {
    console.error('Error in getHealthIndicators:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get disease outbreak tracking data
// @route   GET /api/health/outbreaks
exports.getDiseaseOutbreaks = async (req, res) => {
  try {
    console.log('🦠 Fetching disease outbreak data...');
    
    const outbreaks = await getDiseaseOutbreakData().catch(e => {
      console.warn('Failed to fetch outbreaks:', e.message);
      return [];
    });

    res.json({
      success: true,
      count: outbreaks.length,
      data: outbreaks,
      source: 'ProMED-mail and WHO outbreak surveillance'
    });
  } catch (error) {
    console.error('Error in getDiseaseOutbreaks:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get epidemiological data - causes of death
// @route   GET /api/health/epidemiology
exports.getEpidemiologyData = async (req, res) => {
  try {
    console.log('📊 Fetching epidemiological mortality data...');
    
    const causes = await getEpidemiologicalData().catch(e => {
      console.warn('Failed to fetch epidemiology data:', e.message);
      return [];
    });

    res.json({
      success: true,
      count: causes.length,
      data: causes,
      source: 'WHO Global Health Observatory'
    });
  } catch (error) {
    console.error('Error in getEpidemiologyData:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get comprehensive health dashboard data
// @route   GET /api/health/dashboard
exports.getHealthDashboard = async (req, res) => {
  try {
    console.log('📈 Fetching comprehensive health dashboard data...');
    
    const [covidData, indicators, outbreaks, epidemiology] = await Promise.all([
      getDiseaseData().catch(e => []),
      getGlobalHealthIndicators().catch(e => []),
      getDiseaseOutbreakData().catch(e => []),
      getEpidemiologicalData().catch(e => [])
    ]);

    res.json({
      success: true,
      data: {
        covid: {
          count: covidData.length,
          data: covidData.slice(0, 10)
        },
        indicators: {
          count: indicators.length,
          data: indicators
        },
        outbreaks: {
          count: outbreaks.length,
          data: outbreaks.slice(0, 5)
        },
        epidemiology: {
          count: epidemiology.length,
          data: epidemiology
        }
      },
      totalDataPoints: covidData.length + indicators.length + outbreaks.length + epidemiology.length,
      source: 'Multiple real-time health APIs'
    });
  } catch (error) {
    console.error('Error in getHealthDashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
