const express = require('express');
const router = express.Router();
const {
  getDataIngestionStatus,
  getTotalDataPoints,
  getDataQualityMetrics
} = require('../controllers/data.controller');

// @route   GET /api/data/status
// @desc    Get data ingestion status
// @access  Public
router.get('/status', getDataIngestionStatus);

// @route   GET /api/data/stats
// @desc    Get total data points across all systems
// @access  Public
router.get('/stats', getTotalDataPoints);

// @route   GET /api/data/quality
// @desc    Get data quality metrics
// @access  Public
router.get('/quality', getDataQualityMetrics);

module.exports = router;
