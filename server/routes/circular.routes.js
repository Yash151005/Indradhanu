const express = require('express');
const router = express.Router();
const {
  getCircularData,
  getWasteStreams,
  runOptimization,
  getRecommendations,
  getCircularMetrics
} = require('../controllers/circular.controller');

// @route   GET /api/circular
// @desc    Get all circular economy data
// @access  Public
router.get('/', getCircularData);

// @route   GET /api/circular/waste-streams
// @desc    Get waste stream data
// @access  Public
router.get('/waste-streams', getWasteStreams);

// @route   GET /api/circular/recommendations
// @desc    Get circular economy recommendations
// @access  Public
router.get('/recommendations', getRecommendations);

// @route   GET /api/circular/metrics
// @desc    Get circular economy metrics
// @access  Public
router.get('/metrics', getCircularMetrics);

// @route   POST /api/circular/optimize
// @desc    Run optimization algorithm
// @access  Private
router.post('/optimize', runOptimization);

module.exports = router;
