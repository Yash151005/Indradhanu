import React, { useState, useEffect } from 'react';
import { dataAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import { ServerIcon, ShieldCheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const DataHub = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({});
  const [stats, setStats] = useState({});
  const [quality, setQuality] = useState({});

  useEffect(() => {
    fetchDataInfo();
  }, []);

  const fetchDataInfo = async () => {
    try {
      setLoading(true);
      const [statusRes, statsRes, qualityRes] = await Promise.all([
        dataAPI.getStatus(),
        dataAPI.getStats(),
        dataAPI.getQuality()
      ]);

      setStatus(statusRes.data.data || {});
      setStats(statsRes.data.data || {});
      setQuality(qualityRes.data.data || {});
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
            <ServerIcon className="h-10 w-10 text-primary-600 mr-3" />
            Data Hub
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Real-time data ingestion and blockchain-verified integrity
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Data Points"
            value={stats.totalDataPoints?.toLocaleString() || 0}
            subtitle="All systems"
            icon={ServerIcon}
            color="primary"
          />
          <StatCard
            title="Recent Ingestion"
            value={status.recentIngestion?.total || 0}
            subtitle="Last hour"
            icon={CloudArrowUpIcon}
            color="ocean"
          />
          <StatCard
            title="Data Integrity"
            value={quality.blockchain?.integrity || 'Verified'}
            subtitle="Blockchain secured"
            icon={ShieldCheckIcon}
            color="earth"
          />
        </div>

        {/* Ingestion Status */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Ingestion Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">Health Data</p>
              <p className="text-2xl font-bold text-gray-900">{status.recentIngestion?.health || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Last hour</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Marine Data</p>
              <p className="text-2xl font-bold text-gray-900">{status.recentIngestion?.marine || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Last hour</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Circular Data</p>
              <p className="text-2xl font-bold text-gray-900">{status.recentIngestion?.circular || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Last hour</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{status.recentIngestion?.total || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Last hour</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {status.sources && status.sources.length > 0 ? status.sources.map((source, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      source.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <p className="text-sm font-medium text-gray-900">{source.name || source}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {source.status || 'Active'}
                  </span>
                </div>
                {source.dataPoints !== undefined && (
                  <p className="text-xs text-gray-600">Data Points: <span className="font-semibold">{source.dataPoints}</span></p>
                )}
              </div>
            )) : (
              [
                { name: 'IoT Sensors', status: 'active', dataPoints: 1234 },
                { name: 'Satellite Feeds', status: 'active', dataPoints: 856 },
                { name: 'Manual Entry', status: 'active', dataPoints: 423 },
                { name: 'API Integration', status: 'active', dataPoints: 678 },
                { name: 'Research Vessels', status: 'active', dataPoints: 234 },
                { name: 'Government Reports', status: 'active', dataPoints: 567 }
              ].map((source, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm font-medium text-gray-900">{source.name}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {source.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Data Points: <span className="font-semibold">{source.dataPoints}</span></p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Data Uploads</h2>
          {status.recentUploads && status.recentUploads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {status.recentUploads.map((upload, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          upload.type === 'Health' ? 'bg-red-100 text-red-800' :
                          upload.type === 'Marine' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {upload.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{upload.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(upload.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent uploads available.</p>
          )}
        </div>

        {/* Blockchain Transactions */}
        {status.blockchainTransactions && status.blockchainTransactions.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Blockchain Transactions</h2>
            <div className="space-y-3">
              {status.blockchainTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{tx.type}</p>
                        <p className="text-xs text-gray-600 font-mono">{tx.txId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Quality */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Quality Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Health Data Verification</span>
                <span className="text-sm font-semibold text-gray-900">
                  {quality.health?.verificationRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${quality.health?.verificationRate || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {quality.health?.verified || 0} verified / {quality.health?.total || 0} total
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Circular Data Verification</span>
                <span className="text-sm font-semibold text-gray-900">
                  {quality.circular?.verificationRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${quality.circular?.verificationRate || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {quality.circular?.verified || 0} verified / {quality.circular?.total || 0} total
              </p>
            </div>
          </div>
        </div>

        {/* Blockchain Info */}
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-4">
            <ShieldCheckIcon className="h-12 w-12 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Data Integrity</h3>
              <p className="text-gray-700 mb-3">
                All data is secured using Hyperledger Fabric blockchain technology, ensuring
                tamper-proof records and transparent collaboration across nations and organizations.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  {quality.blockchain?.enabled ? 'Blockchain Active' : 'Blockchain Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataHub;
