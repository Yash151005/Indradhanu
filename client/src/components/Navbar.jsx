import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/' },
    { name: 'Health Nexus', path: '/health' },
    { name: 'Marine Twin', path: '/marine' },
    { name: 'Circular Economy', path: '/circular' },
    { name: 'Policy Simulator', path: '/policy' },
    { name: 'Data Hub', path: '/data' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <GlobeAltIcon className="h-9 w-9 text-primary-600 group-hover:text-primary-700 transition-colors" />
                <div className="absolute inset-0 bg-primary-400 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                  Indradhanu
                </span>
                <span className="block text-xs text-slate-500 font-medium -mt-1">AICRS Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
