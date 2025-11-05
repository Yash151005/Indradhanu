import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { dataAPI, healthAPI, marineAPI, circularAPI } from '../services/api';
import {
  GlobeAltIcon,
  HeartIcon,
  BeakerIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalDataPoints: 0,
    healthAlerts: 0,
    marineLocations: 0,
    circularFacilities: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dataStats, healthAlerts, marineData, circularData] = await Promise.all([
        dataAPI.getStats(),
        healthAPI.getAlerts(),
        marineAPI.getAll({ limit: 1 }),
        circularAPI.getAll({ limit: 1 })
      ]);

      setStats({
        totalDataPoints: dataStats.data.data.totalDataPoints || 0,
        healthAlerts: healthAlerts.data.count || 0,
        marineLocations: marineData.data.count || 0,
        circularFacilities: circularData.data.count || 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-ocean-100 border border-primary-200">
              <span className="w-2 h-2 bg-health-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold text-primary-700">Live System Active</span>
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary-600 via-ocean-600 to-health-600 bg-clip-text text-transparent">
              Indradhanu AICRS
            </span>
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto font-medium mb-3">
            AI-Driven Global Climate Resilience System
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Unifying Public Health, Marine Protection, and Circular Economy for a sustainable future
          </p>
        </div>

        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard
            title="Total Data Points"
            value={stats.totalDataPoints.toLocaleString()}
            subtitle="Across all systems"
            icon={GlobeAltIcon}
            color="primary"
          />
          <StatCard
            title="Active Health Alerts"
            value={stats.healthAlerts}
            subtitle="Requires attention"
            icon={ExclamationTriangleIcon}
            color="red"
          />
          <StatCard
            title="Marine Locations"
            value={stats.marineLocations}
            subtitle="Being monitored"
            icon={BeakerIcon}
            color="ocean"
          />
          <StatCard
            title="Circular Facilities"
            value={stats.circularFacilities}
            subtitle="Optimizing waste"
            icon={ArrowPathIcon}
            color="health"
          />
        </div>

        {/* Core Engines */}
        <h2 className="section-title text-center mb-10">
          <span className="gradient-text">Core AI Engines</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-red-50 border border-red-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-200/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-md inline-block mb-6">
                <HeartIcon className="h-12 w-12 text-alert-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Health-Climate Nexus</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                LSTM-based forecasting to predict and mitigate disease outbreaks linked to climate variations.
              </p>
              <a href="/health" className="inline-flex items-center font-semibold text-alert-600 hover:text-alert-700 group-hover:translate-x-1 transition-transform">
                Explore Engine →
              </a>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border border-ocean-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-ocean-200/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-md inline-block mb-6">
                <BeakerIcon className="h-12 w-12 text-ocean-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Marine Digital Twin</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Reinforcement Learning for ecosystem simulation and biodiversity conservation strategies.
              </p>
              <a href="/marine" className="inline-flex items-center font-semibold text-ocean-600 hover:text-ocean-700 group-hover:translate-x-1 transition-transform">
                Explore Engine →
              </a>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border border-health-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-health-200/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-md inline-block mb-6">
                <ArrowPathIcon className="h-12 w-12 text-health-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Circular AI Optimizer</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Genetic Algorithms transforming waste streams into sustainable resources and circular practices.
              </p>
              <a href="/circular" className="inline-flex items-center font-semibold text-health-600 hover:text-health-700 group-hover:translate-x-1 transition-transform">
                Explore Engine →
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card-gradient mb-16">
          <h2 className="section-title">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white transition-colors">
              <CheckCircleIcon className="h-7 w-7 text-health-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Adaptive Policy Simulator</h4>
                <p className="text-slate-600 text-sm">Test interventions safely before implementation</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white transition-colors">
              <CheckCircleIcon className="h-7 w-7 text-ocean-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Blockchain Data Integrity</h4>
                <p className="text-slate-600 text-sm">Hyperledger Fabric-based secure collaboration</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white transition-colors">
              <CheckCircleIcon className="h-7 w-7 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Bias & Fairness Auditor</h4>
                <p className="text-slate-600 text-sm">Continuous monitoring for equitable outcomes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white transition-colors">
              <CheckCircleIcon className="h-7 w-7 text-circular-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Real-time Data Ingestion</h4>
                <p className="text-slate-600 text-sm">IoT and satellite feed integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* UN SDG Impact */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            <span className="gradient-text">UN Sustainable Development Goals Impact</span>
          </h3>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
            Driving measurable progress toward global sustainability targets
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl font-black text-alert-600 mb-3">3</div>
              <p className="text-sm font-bold text-slate-800 mb-1">Good Health</p>
              <p className="text-xs text-slate-600">& Well-being</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-100 border border-circular-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl font-black text-circular-600 mb-3">12</div>
              <p className="text-sm font-bold text-slate-800 mb-1">Responsible</p>
              <p className="text-xs text-slate-600">Consumption</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-health-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl font-black text-health-600 mb-3">13</div>
              <p className="text-sm font-bold text-slate-800 mb-1">Climate</p>
              <p className="text-xs text-slate-600">Action</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 border border-ocean-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl font-black text-ocean-600 mb-3">14</div>
              <p className="text-sm font-bold text-slate-800 mb-1">Life Below</p>
              <p className="text-xs text-slate-600">Water</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
