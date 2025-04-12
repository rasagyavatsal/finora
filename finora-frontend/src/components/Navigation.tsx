import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-3xl font-bold text-gold">
            Finora
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/about" className="hover:text-gold">About</Link>
            <Link to="/contact" className="hover:text-gold">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}