import React, { useState, useEffect } from 'react';
import { policyAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { DocumentTextIcon, PlayIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const PolicySimulator = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulations, setSimulations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    policyName: '',
    domain: 'health',
    targetRegion: '',
    description: '',
    createdBy: 'demo-user'
  });

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setLoading(true);
      const response = await policyAPI.getAll();
      setSimulations(response.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSimulation = async (e) => {
    e.preventDefault();
    try {
      await policyAPI.create({
        ...newPolicy,
        parameters: { testParam: 'value' }
      });
      alert('Policy simulation created successfully!');
      fetchSimulations();
      setNewPolicy({
        policyName: '',
        domain: 'health',
        targetRegion: '',
        description: '',
        createdBy: 'demo-user'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const runSimulation = async (id) => {
    try {
      await policyAPI.run(id);
      alert('Simulation completed successfully!');
      fetchSimulations();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSimulation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this policy simulation?')) {
      return;
    }
    try {
      await policyAPI.delete(id);
      alert('Policy simulation deleted successfully!');
      fetchSimulations();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (sim) => {
    setEditingId(sim._id);
    setNewPolicy({
      policyName: sim.policyName,
      domain: sim.domain,
      targetRegion: sim.targetRegion,
      description: sim.description,
      createdBy: sim.createdBy
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewPolicy({
      policyName: '',
      domain: 'health',
      targetRegion: '',
      description: '',
      createdBy: 'demo-user'
    });
  };

  const updateSimulation = async (e) => {
    e.preventDefault();
    try {
      await policyAPI.update(editingId, newPolicy);
      alert('Policy simulation updated successfully!');
      fetchSimulations();
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  };

  const rerunSimulation = async (id) => {
    if (!window.confirm('Are you sure you want to rerun this simulation? Previous results will be replaced.')) {
      return;
    }
    try {
      await policyAPI.run(id);
      alert('Simulation rerun completed successfully!');
      fetchSimulations();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <DocumentTextIcon className="h-10 w-10 text-primary-600 mr-3" />
            Adaptive Policy Simulator
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Test climate interventions safely before implementation
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        {/* Create New Simulation */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {editingId ? 'Edit Policy Simulation' : 'Create New Policy Simulation'}
          </h2>
          <form onSubmit={editingId ? updateSimulation : createSimulation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={newPolicy.policyName}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policyName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <select
                  className="input-field"
                  value={newPolicy.domain}
                  onChange={(e) => setNewPolicy({ ...newPolicy, domain: e.target.value })}
                >
                  <option value="health">Health</option>
                  <option value="marine">Marine</option>
                  <option value="circular-economy">Circular Economy</option>
                  <option value="cross-domain">Cross-Domain</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Region
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={newPolicy.targetRegion}
                  onChange={(e) => setNewPolicy({ ...newPolicy, targetRegion: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Simulation' : 'Create Simulation'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Simulations */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Simulations</h2>
          {simulations.length === 0 ? (
            <p className="text-gray-500">No simulations found. Create one above!</p>
          ) : (
            <div className="space-y-4">
              {simulations.map((sim) => (
                <div key={sim._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{sim.policyName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{sim.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Domain: <span className="font-medium">{sim.domain}</span></span>
                        <span>Region: <span className="font-medium">{sim.targetRegion}</span></span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          sim.status === 'completed' ? 'bg-green-100 text-green-800' :
                          sim.status === 'simulating' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sim.status}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      {sim.status !== 'completed' ? (
                        <button
                          onClick={() => runSimulation(sim._id)}
                          className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          title="Run Simulation"
                        >
                          <PlayIcon className="h-4 w-4" />
                          <span>Run</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => rerunSimulation(sim._id)}
                          className="flex items-center space-x-1 px-3 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
                          title="Rerun Simulation"
                        >
                          <ArrowPathIcon className="h-4 w-4" />
                          <span>Rerun</span>
                        </button>
                      )}
                      <button
                        onClick={() => startEditing(sim)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteSimulation(sim._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {sim.simulationResults && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <p className="text-sm text-gray-600">
                        Confidence: {sim.simulationResults.confidence?.toFixed(1)}%
                      </p>
                      {sim.simulationResults.projectedOutcomes && (
                        <div className="mt-2 space-y-1">
                          {sim.simulationResults.projectedOutcomes.slice(0, 3).map((outcome, i) => (
                            <p key={i} className="text-xs text-gray-600">
                              • {outcome.metric}: {outcome.changePercentage?.toFixed(1)}% change
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicySimulator;
