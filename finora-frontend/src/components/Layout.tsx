// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl p-8">
        <FaceFrownIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-finora-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;