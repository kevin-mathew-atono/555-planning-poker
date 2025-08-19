import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Meet Add-on Home
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to your Google Meet add-on! Choose where you'd like to go:
        </p>
        <div className="space-y-4">
          <Link
            to="/mainstage"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
          >
            Go to Main Stage
          </Link>
          <Link
            to="/side-panel"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
          >
            Open Side Panel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;