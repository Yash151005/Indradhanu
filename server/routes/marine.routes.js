const express = require('express');
const router = express.Router();
const {
  getMarineData,
  getEcosystemStatus,
  runScenarioSimulation,
  getBiodiversityMetrics,
  getMarineLocations
} = require('../controllers/marine.controller');

// @route   GET /api/marine
// @desc    Get all marine data
// @access  Public
router.get('/', getMarineData);

// @route   GET /api/marine/ecosystem
// @desc    Get ecosystem status
// @access  Public
router.get('/ecosystem', getEcosystemStatus);

// @route   GET /api/marine/biodiversity
// @desc    Get biodiversity metrics
// @access  Public
router.get('/biodiversity', getBiodiversityMetrics);

// @route   GET /api/marine/locations
// @desc    Get marine monitoring locations
// @access  Public
router.get('/locations', getMarineLocations);

// @route   POST /api/marine/scenario
// @desc    Run scenario simulation
// @access  Private
router.post('/scenario', runScenarioSimulation);

module.exports = router;
