import React, { useState, useEffect } from 'react';
import { marineAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import { BeakerIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';

const MarineTwin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ecosystemData, setEcosystemData] = useState([]);
  const [biodiversity, setBiodiversity] = useState([]);
  const [scenarioForm, setScenarioForm] = useState({
    scenarioName: '',
    parameters: {}
  });

  useEffect(() => {
    fetchMarineData();
  }, []);

  const fetchMarineData = async () => {
    try {
      setLoading(true);
      const [ecosystemRes, biodiversityRes] = await Promise.all([
        marineAPI.getEcosystem(),
        marineAPI.getBiodiversity()
      ]);

      setEcosystemData(ecosystemRes.data.data || []);
      setBiodiversity(biodiversityRes.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const avgBiodiversity =
    ecosystemData.reduce((acc, eco) => acc + (eco.avgBiodiversity || 0), 0) /
    (ecosystemData.length || 1);

  const runScenario = async () => {
    try {
      const response = await marineAPI.runScenario(scenarioForm);
      alert(`Scenario completed! Biodiversity change: ${response.data.data.projectedOutcome.biodiversityChange.toFixed(2)}%`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <BeakerIcon className="h-10 w-10 text-ocean-600 mr-3" />
            Marine Digital Twin
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Reinforcement Learning for marine ecosystem simulation and conservation
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Ocean Zones"
            value={ecosystemData.length}
            subtitle="Being monitored"
            icon={GlobeAltIcon}
            color="ocean"
          />
          <StatCard
            title="Avg Biodiversity Index"
            value={avgBiodiversity.toFixed(1)}
            subtitle="Out of 100"
            icon={SparklesIcon}
            color="earth"
          />
          <StatCard
            title="Species Tracked"
            value={biodiversity.reduce((sum, b) => sum + (b.ecosystemMetrics?.speciesCount || 0), 0)}
            subtitle="Across all locations"
            icon={BeakerIcon}
            color="primary"
          />
        </div>

        {/* Ecosystem Status */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ecosystem Status by Ocean Zone</h2>
          {ecosystemData.length === 0 ? (
            <p className="text-gray-500">No ecosystem data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ocean Zone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Biodiversity Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Avg Water Temp (°C)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Avg pH
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Locations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ecosystemData.map((eco, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {eco._id || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {eco.avgBiodiversity?.toFixed(1) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {eco.avgWaterTemp?.toFixed(1) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {eco.avgpH?.toFixed(2) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {eco.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Scenario Simulator */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What-If Scenario Simulator</h2>
          <p className="text-gray-600 mb-6">
            Test conservation strategies using Reinforcement Learning algorithms
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scenario Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Reduce Overfishing by 50%"
                value={scenarioForm.scenarioName}
                onChange={(e) =>
                  setScenarioForm({ ...scenarioForm, scenarioName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conservation Action
              </label>
              <select className="input-field">
                <option>Marine Protected Area</option>
                <option>Fishing Restrictions</option>
                <option>Pollution Control</option>
                <option>Coral Restoration</option>
              </select>
            </div>
          </div>
          <button onClick={runScenario} className="btn-primary">
            Run Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarineTwin;
