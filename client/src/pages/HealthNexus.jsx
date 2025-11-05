import React, { useState, useEffect } from 'react';
import { healthAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import { HeartIcon, ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const HealthNexus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      const [predictionsRes, alertsRes] = await Promise.all([
        healthAPI.getPredictions(),
        healthAPI.getAlerts()
      ]);

      setPredictions(predictionsRes.data.data || []);
      setAlerts(alertsRes.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <HeartIcon className="h-10 w-10 text-red-600 mr-3" />
            Health-Climate Nexus Engine
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            LSTM-based time-series forecasting for disease outbreak prediction
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Predictions"
            value={predictions.length}
            subtitle="Disease outbreak forecasts"
            icon={ChartBarIcon}
            color="primary"
          />
          <StatCard
            title="Critical Alerts"
            value={alerts.filter(a => a.alertLevel === 'critical').length}
            subtitle="Requires immediate action"
            icon={ExclamationTriangleIcon}
            color="red"
          />
          <StatCard
            title="Regions Monitored"
            value={new Set(predictions.map(p => p.region)).size}
            subtitle="Global coverage"
            icon={HeartIcon}
            color="earth"
          />
        </div>

        {/* Active Alerts */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Health Alerts</h2>
          {alerts.length === 0 ? (
            <p className="text-gray-500">No active alerts at this time.</p>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.alertLevel === 'critical'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-orange-50 border-orange-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.region}</h3>
                      <p className="text-sm text-gray-600">{alert.diseaseType} outbreak</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Cases reported: {alert.casesReported.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.alertLevel === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-orange-200 text-orange-800'
                      }`}
                    >
                      {alert.alertLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Predictions */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Disease Outbreak Predictions</h2>
          {predictions.length === 0 ? (
            <p className="text-gray-500">No predictions available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Disease Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Predicted Cases
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeframe
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.slice(0, 10).map((pred, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pred.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pred.diseaseType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pred.predictions?.shortTerm?.predictedCases?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pred.predictions?.shortTerm?.confidence
                          ? `${pred.predictions.shortTerm.confidence.toFixed(1)}%`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pred.predictions?.shortTerm?.days
                          ? `${pred.predictions.shortTerm.days} days`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthNexus;
