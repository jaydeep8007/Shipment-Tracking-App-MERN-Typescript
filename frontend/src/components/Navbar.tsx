// components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-md shadow-md text-white">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">
            <span className="text-blue-400">Ship</span>Track
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300 transition">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-300 transition">Contact</Link>
          </li>
        </ul>

        <div className="md:hidden">
          {/* You can add a hamburger menu here for mobile */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
