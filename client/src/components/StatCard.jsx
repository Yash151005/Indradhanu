import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: {
      icon: 'text-primary-600 bg-gradient-to-br from-primary-100 to-primary-200',
      gradient: 'from-primary-50 to-primary-100',
      border: 'border-primary-200',
      glow: 'hover:shadow-glow'
    },
    ocean: {
      icon: 'text-ocean-600 bg-gradient-to-br from-ocean-100 to-ocean-200',
      gradient: 'from-ocean-50 to-ocean-100',
      border: 'border-ocean-200',
      glow: 'hover:shadow-glow-ocean'
    },
    health: {
      icon: 'text-health-600 bg-gradient-to-br from-health-100 to-health-200',
      gradient: 'from-health-50 to-health-100',
      border: 'border-health-200',
      glow: 'hover:shadow-glow-health'
    },
    circular: {
      icon: 'text-circular-600 bg-gradient-to-br from-circular-100 to-circular-200',
      gradient: 'from-circular-50 to-circular-100',
      border: 'border-circular-200',
      glow: 'hover:shadow-lg'
    },
    red: {
      icon: 'text-alert-600 bg-gradient-to-br from-alert-100 to-alert-200',
      gradient: 'from-alert-50 to-alert-100',
      border: 'border-alert-200',
      glow: 'hover:shadow-lg'
    },
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} p-6 transition-all duration-300 ${colors.glow} transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-slate-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-slate-600 font-medium">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-4 rounded-xl ${colors.icon} shadow-md`}>
            <Icon className="h-8 w-8" />
          </div>
        )}
      </div>
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl -mr-16 -mt-16"></div>
    </div>
  );
};

export default StatCard;
