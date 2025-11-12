const express = require('express');
const router = express.Router();
const {
  getPolicySimulations,
  createSimulation,
  runSimulation,
  getSimulationResults,
  approvePolicy,
  updateSimulation,
  deleteSimulation
} = require('../controllers/policy.controller');

// @route   GET /api/policy
// @desc    Get all policy simulations
// @access  Public
router.get('/', getPolicySimulations);

// @route   GET /api/policy/:id
// @desc    Get simulation results by ID
// @access  Public
router.get('/:id', getSimulationResults);

// @route   POST /api/policy
// @desc    Create new policy simulation
// @access  Private
router.post('/', createSimulation);

// @route   POST /api/policy/:id/run
// @desc    Run policy simulation
// @access  Private
router.post('/:id/run', runSimulation);

// @route   PUT /api/policy/:id/approve
// @desc    Approve policy
// @access  Admin
router.put('/:id/approve', approvePolicy);

// @route   PUT /api/policy/:id
// @desc    Update policy simulation
// @access  Private
router.put('/:id', updateSimulation);

// @route   DELETE /api/policy/:id
// @desc    Delete policy simulation
// @access  Private
router.delete('/:id', deleteSimulation);

module.exports = router;
