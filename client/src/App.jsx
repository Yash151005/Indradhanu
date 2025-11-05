import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import HealthNexus from './pages/HealthNexus';
import MarineTwin from './pages/MarineTwin';
import CircularOptimizer from './pages/CircularOptimizer';
import PolicySimulator from './pages/PolicySimulator';
import DataHub from './pages/DataHub';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/health" element={<HealthNexus />} />
            <Route path="/marine" element={<MarineTwin />} />
            <Route path="/circular" element={<CircularOptimizer />} />
            <Route path="/policy" element={<PolicySimulator />} />
            <Route path="/data" element={<DataHub />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
