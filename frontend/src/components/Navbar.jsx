import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
    const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const[menuicon, setMenuIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-screen z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-A7727D">Murmr</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a 
              href="#features" 
              className="!text-gray-700 hover:text-A7727D transition duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="!text-gray-700 hover:text-A7727D transition duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#safety" 
              className="!text-gray-700 hover:text-A7727D transition duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Safety
            </a>
            <a 
              href="#faq" 
              className="!text-gray-700 hover:text-A7727D transition duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <button 
              className="!bg-white text-A7727D border border-A7727D hover:text-gray-900 transition duration-300 font-medium px-4 py-2 rounded-lg"
              onClick={() => navigate('/login')}
              type="button"
            >
              Sign In
            </button>
            <button 
              className="bg-A7727D hover:bg-opacity-90 text-white px-6 py-2 rounded-lg transition duration-300 font-medium"
              onClick={() => navigate('/signup')}
              type="button"
            >
              Join Now
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-A7727D">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#features" 
                className="block px-3 py-2 text-gray-700 hover:text-A7727D transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block px-3 py-2 text-gray-700 hover:text-A7727D transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#safety" 
                className="block px-3 py-2 text-gray-700 hover:text-A7727D transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Safety
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 text-gray-700 hover:text-A7727D transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="px-3 py-2 space-y-2">
                <button className="w-full text-A7727D font-medium"
                onClick={() => navigate('/login')}>Sign In</button>
                <button className="w-full bg-A7727D text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => navigate('/signup')}>Join Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;