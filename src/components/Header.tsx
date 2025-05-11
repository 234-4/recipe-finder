import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Heart, Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">RecipeFinder</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<Search />} label="Search Recipes" />
            <NavLink to="/favorites" icon={<Heart />} label="Favorites" />
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-orange-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <ul className="space-y-4">
              <MobileNavLink to="/" icon={<Search />} label="Search Recipes" />
              <MobileNavLink to="/favorites" icon={<Heart />} label="Favorites" />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'text-orange-600 bg-orange-50' 
          : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to}
        className={`flex items-center py-3 px-4 rounded-md ${
          isActive 
            ? 'text-orange-600 bg-orange-50' 
            : 'text-gray-700 hover:text-orange-500'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default Header;