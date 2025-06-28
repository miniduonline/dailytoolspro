import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Wrench, Moon, Sun, User, LogOut, Coffee, Menu, X, MapPin } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('');

  // Get user's country based on their location
  useEffect(() => {
    const getUserCountry = async () => {
      try {
        // Try to get country from IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          setUserCountry(data.country_code);
        }
      } catch (error) {
        // Fallback: try to get from timezone
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const countryFromTimezone = getCountryFromTimezone(timezone);
          if (countryFromTimezone) {
            setUserCountry(countryFromTimezone);
          }
        } catch (timezoneError) {
          console.log('Could not determine user country');
        }
      }
    };

    getUserCountry();
  }, []);

  // Helper function to get country from timezone
  const getCountryFromTimezone = (timezone: string): string => {
    const timezoneToCountry: { [key: string]: string } = {
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Rome': 'IT',
      'Europe/Madrid': 'ES',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Kolkata': 'IN',
      'Asia/Dubai': 'AE',
      'Australia/Sydney': 'AU',
      'America/Toronto': 'CA',
      'America/Sao_Paulo': 'BR',
      'Europe/Moscow': 'RU',
      'Asia/Seoul': 'KR',
      'Europe/Amsterdam': 'NL',
      'Europe/Stockholm': 'SE',
      'Europe/Zurich': 'CH',
      'Asia/Singapore': 'SG',
      'Asia/Hong_Kong': 'HK',
      'Pacific/Auckland': 'NZ',
      'Africa/Cairo': 'EG',
      'Africa/Johannesburg': 'ZA',
      'America/Mexico_City': 'MX',
      'America/Argentina/Buenos_Aires': 'AR',
      'Europe/Istanbul': 'TR',
      'Asia/Bangkok': 'TH',
      'Asia/Jakarta': 'ID',
      'Asia/Manila': 'PH',
      'Europe/Warsaw': 'PL',
      'Europe/Prague': 'CZ',
      'Europe/Vienna': 'AT',
      'Europe/Brussels': 'BE',
      'Europe/Copenhagen': 'DK',
      'Europe/Helsinki': 'FI',
      'Europe/Oslo': 'NO',
      'Europe/Dublin': 'IE',
      'Europe/Lisbon': 'PT',
      'Europe/Athens': 'GR',
      'Europe/Budapest': 'HU',
      'Europe/Bucharest': 'RO',
      'Europe/Sofia': 'BG',
      'Europe/Zagreb': 'HR',
      'Asia/Karachi': 'PK',
      'Asia/Dhaka': 'BD',
      'Asia/Colombo': 'LK',
      'Asia/Kathmandu': 'NP',
      'Asia/Tashkent': 'UZ',
      'Asia/Almaty': 'KZ',
      'Asia/Baku': 'AZ',
      'Asia/Yerevan': 'AM',
      'Asia/Tbilisi': 'GE',
      'Asia/Tehran': 'IR',
      'Asia/Baghdad': 'IQ',
      'Asia/Kuwait': 'KW',
      'Asia/Riyadh': 'SA',
      'Asia/Qatar': 'QA',
      'Asia/Muscat': 'OM',
      'Asia/Beirut': 'LB',
      'Asia/Damascus': 'SY',
      'Asia/Amman': 'JO',
      'Asia/Jerusalem': 'IL',
      'Africa/Lagos': 'NG',
      'Africa/Nairobi': 'KE',
      'Africa/Addis_Ababa': 'ET',
      'Africa/Casablanca': 'MA',
      'Africa/Tunis': 'TN',
      'Africa/Algiers': 'DZ',
      'America/Lima': 'PE',
      'America/Bogota': 'CO',
      'America/Caracas': 'VE',
      'America/Santiago': 'CL',
      'America/La_Paz': 'BO',
      'America/Asuncion': 'PY',
      'America/Montevideo': 'UY',
      'America/Guatemala': 'GT',
      'America/Costa_Rica': 'CR',
      'America/Panama': 'PA',
      'America/Havana': 'CU',
      'America/Jamaica': 'JM',
      'America/Port_of_Spain': 'TT'
    };

    return timezoneToCountry[timezone] || '';
  };

  // Get country flag emoji
  const getCountryFlag = (countryCode: string): string => {
    if (!countryCode || countryCode.length !== 2) return '';
    
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
  };

  // Safe boolean checks
  const isEmailVerified = Boolean(user?.emailVerified);
  const accountType = user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email';

  // Safe helper functions with proper null checks
  const getInitials = (user: any): string => {
    try {
      if (user?.displayName && typeof user.displayName === 'string') {
        const names = user.displayName.trim().split(' ').filter(n => n.length > 0);
        return names.map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
      }
      if (user?.email && typeof user.email === 'string') {
        return user.email[0].toUpperCase();
      }
      return 'U';
    } catch (error) {
      console.error('Error getting initials:', error);
      return 'U';
    }
  };

  const getDisplayName = (user: any): string => {
    try {
      if (user?.displayName && typeof user.displayName === 'string' && user.displayName.trim()) {
        return user.displayName.trim();
      }
      if (user?.email && typeof user.email === 'string') {
        return user.email.split('@')[0];
      }
      return 'User';
    } catch (error) {
      console.error('Error getting display name:', error);
      return 'User';
    }
  };

  const getFirstName = (user: any): string => {
    const fullName = getDisplayName(user);
    return fullName.split(' ')[0];
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
                  <div className="hidden md:flex flex-col">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-tight">
                      {getDisplayName(user)}
                    </span>
                    {userCountry && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span className="flex items-center space-x-1">
                          <span>{getCountryFlag(userCountry)}</span>
                          <span>{userCountry}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Country display for mobile - just flag */}
                  {userCountry && (
                    <div className="md:hidden text-sm">
                      <span>{getCountryFlag(userCountry)}</span>
                    </div>
                  )}
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
                <div className="flex items-center space-x-2">
                  {/* Country display for non-logged users */}
                  {userCountry && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <MapPin className="h-3 w-3" />
                      <span className="flex items-center space-x-1">
                        <span>{getCountryFlag(userCountry)}</span>
                        <span className="hidden sm:inline">{userCountry}</span>
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center space-x-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                </div>
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
                {/* Mobile country display */}
                {userCountry && (
                  <div className="flex items-center space-x-2 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="flex items-center space-x-2">
                      <span>{getCountryFlag(userCountry)}</span>
                      <span>Browsing from {userCountry}</span>
                    </span>
                  </div>
                )}
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