import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Wrench, Moon, Sun, User, LogOut, Coffee, Menu, X } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (user: any) => {
    if (user.displayName) {
      return user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = (user: any) => {
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400 transition-transform group-hover:rotate-12" />
              <span className="text-xs sm:text-lg font-bold text-gray-900 dark:text-white">
                Daily Tools Pro
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tools
              </Link>
              <Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Categories
              </Link>
              {user && (
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a
                href="https://buymeacoffee.com/miniduonline"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition-colors"
              >
                <Coffee className="h-4 w-4" />
                <span>Support</span>
              </a>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                    {getInitials(user)}
                  </div>
                  <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {getDisplayName(user)}
                  </span>
                  <button
                    onClick={logout}
                    className="hidden sm:flex items-center space-x-1 px-2 sm:px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden md:inline">Sign Out</span>
                  </button>
                  {/* Mobile logout button */}
                  <button
                    onClick={logout}
                    className="sm:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link 
                  to="/categories" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                {user && (
                  <Link 
                    to="/dashboard" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <a
                  href="https://buymeacoffee.com/miniduonline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 py-2 text-orange-500 hover:text-orange-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Coffee className="h-4 w-4" />
                  <span>Support Us</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};