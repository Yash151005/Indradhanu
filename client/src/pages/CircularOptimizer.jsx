import React, { useState, useEffect } from 'react';
import { circularAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import { ArrowPathIcon, ChartPieIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const CircularOptimizer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wasteStreams, setWasteStreams] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchCircularData();
  }, []);

  const fetchCircularData = async () => {
    try {
      setLoading(true);
      const [wasteRes, metricsRes, recRes] = await Promise.all([
        circularAPI.getWasteStreams(),
        circularAPI.getMetrics(),
        circularAPI.getRecommendations()
      ]);

      setWasteStreams(wasteRes.data.data || []);
      setMetrics(metricsRes.data.data || {});
      setRecommendations(recRes.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runOptimization = async () => {
    try {
      const response = await circularAPI.optimize({
        facilityId: 'test-facility',
        wasteStreams: []
      });
      alert(
        `Optimization completed! Resource recovery improved to ${response.data.data.resourceRecovery.optimizedRate.toFixed(1)}%`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <ArrowPathIcon className="h-10 w-10 text-earth-600 mr-3" />
            Circular AI Optimizer
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Genetic Algorithms for waste stream optimization and circular economy
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Material Circularity"
            value={`${metrics.avgMaterialCircularity?.toFixed(1) || 0}%`}
            subtitle="Average score"
            icon={ArrowPathIcon}
            color="earth"
          />
          <StatCard
            title="Waste to Resource"
            value={`${metrics.avgWasteToResource?.toFixed(1) || 0}%`}
            subtitle="Conversion rate"
            icon={ChartPieIcon}
            color="primary"
          />
          <StatCard
            title="Landfill Diversion"
            value={`${metrics.avgLandfillDiversion?.toFixed(1) || 0}%`}
            subtitle="Average rate"
            icon={LightBulbIcon}
            color="ocean"
          />
        </div>

        {/* Waste Streams */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waste Streams Analysis</h2>
          {wasteStreams.length === 0 ? (
            <p className="text-gray-500">No waste stream data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Material Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Avg Recyclability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wasteStreams.map((stream, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stream._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stream.totalQuantity?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stream.avgRecyclability?.toFixed(1) || 'N/A'}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stream.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Recommendations</h2>
          {recommendations.length === 0 ? (
            <p className="text-gray-500">No recommendations available.</p>
          ) : (
            <div className="space-y-4">
              {recommendations.slice(0, 5).map((rec, index) => (
                <div key={index} className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">{rec.facility?.name || 'Facility'}</h3>
                  {rec.recommendations?.slice(0, 3).map((r, i) => (
                    <div key={i} className="mt-2">
                      <p className="text-sm font-medium text-gray-800">{r.category}</p>
                      <p className="text-sm text-gray-600">{r.description}</p>
                      <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                        r.priority === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {r.priority} priority
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Optimization Tool */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Run Genetic Algorithm Optimization</h2>
          <p className="text-gray-600 mb-6">
            Optimize waste processing efficiency and resource recovery using AI algorithms
          </p>
          <button onClick={runOptimization} className="btn-primary">
            Run Optimization
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularOptimizer;
