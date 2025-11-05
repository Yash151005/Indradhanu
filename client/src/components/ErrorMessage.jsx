import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ message }) => {
  return (
    <div className="card bg-red-50 border-red-200">
      <div className="flex items-center space-x-3">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        <div>
          <h3 className="text-red-800 font-semibold">Error</h3>
          <p className="text-red-700 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
