const express = require('express');
const router = express.Router();
const {
  getHealthData,
  getHealthPredictions,
  submitHealthData,
  getHealthAlerts,
  getHealthStatsByRegion,
  getHealthIndicators,
  getDiseaseOutbreaks,
  getEpidemiologyData,
  getHealthDashboard
} = require('../controllers/health.controller');

// @route   GET /api/health
// @desc    Get all health data
// @access  Public
router.get('/', getHealthData);

// @route   GET /api/health/predictions
// @desc    Get disease outbreak predictions
// @access  Public
router.get('/predictions', getHealthPredictions);

// @route   GET /api/health/alerts
// @desc    Get active health alerts
// @access  Public
router.get('/alerts', getHealthAlerts);

// @route   GET /api/health/indicators
// @desc    Get global health indicators
// @access  Public
router.get('/indicators', getHealthIndicators);

// @route   GET /api/health/outbreaks
// @desc    Get disease outbreak tracking
// @access  Public
router.get('/outbreaks', getDiseaseOutbreaks);

// @route   GET /api/health/epidemiology
// @desc    Get epidemiological mortality data
// @access  Public
router.get('/epidemiology', getEpidemiologyData);

// @route   GET /api/health/dashboard
// @desc    Get comprehensive health dashboard
// @access  Public
router.get('/dashboard', getHealthDashboard);

// @route   GET /api/health/stats/:region
// @desc    Get health statistics by region
// @access  Public
router.get('/stats/:region', getHealthStatsByRegion);

// @route   POST /api/health
// @desc    Submit new health data
// @access  Private
router.post('/', submitHealthData);

module.exports = router;
