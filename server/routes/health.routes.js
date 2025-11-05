const express = require('express');
const router = express.Router();
const {
  getHealthData,
  getHealthPredictions,
  submitHealthData,
  getHealthAlerts,
  getHealthStatsByRegion
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

// @route   GET /api/health/stats/:region
// @desc    Get health statistics by region
// @access  Public
router.get('/stats/:region', getHealthStatsByRegion);

// @route   POST /api/health
// @desc    Submit new health data
// @access  Private
router.post('/', submitHealthData);

module.exports = router;
