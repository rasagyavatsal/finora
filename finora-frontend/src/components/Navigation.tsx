import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                alt="Finora"
              />
            </Link>
            {/* ... rest of the navigation */}
          </div>
        </div>
      </div>
    </nav>
  );
}