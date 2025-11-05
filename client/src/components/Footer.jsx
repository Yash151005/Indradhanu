import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-auto border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-ocean-400 bg-clip-text text-transparent">
              Indradhanu AICRS
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              AI-Driven Global Climate Resilience System for a sustainable future. 
              Empowering nations with actionable climate intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-primary-400 transition-colors duration-200">Dashboard</a></li>
              <li><a href="/health" className="hover:text-primary-400 transition-colors duration-200">Health Nexus</a></li>
              <li><a href="/marine" className="hover:text-primary-400 transition-colors duration-200">Marine Twin</a></li>
              <li><a href="/circular" className="hover:text-primary-400 transition-colors duration-200">Circular Economy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">UN SDG Impact</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-health-400 rounded-full"></span>
                <span>SDG 3: Good Health and Well-being</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-circular-400 rounded-full"></span>
                <span>SDG 12: Responsible Consumption</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>SDG 13: Climate Action</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-ocean-400 rounded-full"></span>
                <span>SDG 14: Life Below Water</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Indradhanu AICRS. Built with 💚 for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
