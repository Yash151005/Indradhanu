const PolicySimulation = require('../models/PolicySimulation.model');

// @desc    Get all policy simulations
// @route   GET /api/policy
exports.getPolicySimulations = async (req, res) => {
  try {
    const { domain, status } = req.query;
    
    let query = {};
    if (domain) query.domain = domain;
    if (status) query.status = status;

    const simulations = await PolicySimulation.find(query)
      .sort({ timestamp: -1 })
      .limit(50);

    res.json({
      success: true,
      count: simulations.length,
      data: simulations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get simulation results by ID
// @route   GET /api/policy/:id
exports.getSimulationResults = async (req, res) => {
  try {
    const simulation = await PolicySimulation.findById(req.params.id);

    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    res.json({
      success: true,
      data: simulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new policy simulation
// @route   POST /api/policy
exports.createSimulation = async (req, res) => {
  try {
    const simulation = await PolicySimulation.create({
      ...req.body,
      createdBy: req.body.createdBy || 'system'
    });

    res.status(201).json({
      success: true,
      data: simulation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// @desc    Run policy simulation
// @route   POST /api/policy/:id/run
exports.runSimulation = async (req, res) => {
  try {
    const simulation = await PolicySimulation.findById(req.params.id);

    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    // Simulate policy outcomes
    const results = {
      scenario: `${simulation.policyName} - Impact Analysis`,
      projectedOutcomes: [
        {
          metric: 'Environmental Impact',
          baseline: 50,
          projected: Math.random() * 30 + 65,
          changePercentage: Math.random() * 40 + 10,
          timeframe: '3 years'
        },
        {
          metric: 'Economic Benefit',
          baseline: 1000000,
          projected: Math.random() * 500000 + 1200000,
          changePercentage: Math.random() * 40 + 20,
          timeframe: '3 years'
        },
        {
          metric: 'Social Impact Score',
          baseline: 60,
          projected: Math.random() * 20 + 75,
          changePercentage: Math.random() * 30 + 15,
          timeframe: '3 years'
        }
      ],
      confidence: Math.random() * 20 + 75,
      assumptions: ['Stable climate conditions', 'Adequate funding', 'Stakeholder cooperation'],
      limitations: ['Limited historical data', 'External factors not fully accounted']
    };

    simulation.simulationResults = results;
    simulation.status = 'completed';
    await simulation.save();

    res.json({
      success: true,
      message: 'Simulation completed successfully',
      data: simulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Simulation failed',
      error: error.message
    });
  }
};

// @desc    Approve policy
// @route   PUT /api/policy/:id/approve
exports.approvePolicy = async (req, res) => {
  try {
    const simulation = await PolicySimulation.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    res.json({
      success: true,
      message: 'Policy approved',
      data: simulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
