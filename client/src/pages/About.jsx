import React from 'react';
import { GlobeAltIcon, HeartIcon, BeakerIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Indradhanu AICRS</h1>
          <p className="text-xl text-gray-600">
            AI-Driven Global Climate Resilience System
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Indradhanu (AICRS) is a unified AI-powered platform that bridges fragmented global data 
            silos in Public Health, Marine Protection, and the Circular Economy to build climate 
            resilience. We transform climate data into actionable intelligence, empowering global 
            collaboration toward a resilient, data-driven future.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Engines</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <HeartIcon className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Health-Climate Nexus Engine</h3>
                <p className="text-gray-700">
                  Uses LSTM-based time-series forecasting to predict and mitigate disease outbreaks 
                  linked to meteorological variations. Provides real-time health monitoring and early 
                  warning systems for climate-sensitive diseases.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <BeakerIcon className="h-8 w-8 text-ocean-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marine Digital Twin</h3>
                <p className="text-gray-700">
                  Employs Reinforcement Learning and ecosystem simulation models to monitor biodiversity 
                  and evaluate conservation strategies through "what-if" scenario testing. Tracks ocean 
                  health, coral reef status, and marine species populations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ArrowPathIcon className="h-8 w-8 text-earth-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Circular AI Optimizer</h3>
                <p className="text-gray-700">
                  Driven by Genetic Algorithms, transforms global waste streams into sustainable 
                  resources, promoting circular practices and reducing landfill impact. Optimizes 
                  material recovery and resource efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">AI/ML Technologies</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Python & TensorFlow</li>
                <li>• LSTM Neural Networks</li>
                <li>• Reinforcement Learning</li>
                <li>• Genetic Algorithms</li>
                <li>• Adversarial Debiasing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Platform Technologies</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• React & Node.js</li>
                <li>• MongoDB Database</li>
                <li>• Hyperledger Fabric Blockchain</li>
                <li>• IoT & Satellite Integration</li>
                <li>• Cloud-Native Microservices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card mb-8 bg-gradient-to-r from-blue-50 to-green-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">UN SDG Impact</h2>
          <p className="text-gray-700 mb-4">
            Indradhanu directly contributes to multiple United Nations Sustainable Development Goals:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">SDG 3</div>
              <p className="text-gray-900 font-semibold">Good Health and Well-being</p>
              <p className="text-sm text-gray-600">Climate-health nexus monitoring</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">SDG 12</div>
              <p className="text-gray-900 font-semibold">Responsible Consumption</p>
              <p className="text-sm text-gray-600">Circular economy optimization</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">SDG 13</div>
              <p className="text-gray-900 font-semibold">Climate Action</p>
              <p className="text-sm text-gray-600">Data-driven climate resilience</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">SDG 14</div>
              <p className="text-gray-900 font-semibold">Life Below Water</p>
              <p className="text-sm text-gray-600">Marine ecosystem protection</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <GlobeAltIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Built for a Sustainable Future
          </h3>
          <p className="text-gray-700">
            Empowering governments, NGOs, industries, and researchers with actionable climate intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
