import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ToolCard } from '../ui/ToolCard';
import { tools } from '../../data/tools';
import { useToolTracking } from '../../hooks/useToolTracking';
import { User, Star, Clock, Settings, TrendingUp, Award, Calendar, Target } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { 
    favorites, 
    recentTools, 
    toggleFavorite, 
    getToolStats,
    clearRecent,
    clearFavorites 
  } = useToolTracking();

  // Debug logging with proper error handling
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dashboard mounted');
      console.log('User:', user);
      console.log('Loading:', loading);
    }
  }, [user, loading]);

  // Memoized computations for better performance
  const favoriteTools = useMemo(() => 
    tools.filter(tool => favorites.includes(tool.id)), 
    [favorites]
  );

  const recentToolsData = useMemo(() => 
    tools.filter(tool => recentTools.includes(tool.id))
      .sort((a, b) => recentTools.indexOf(a.id) - recentTools.indexOf(b.id)),
    [recentTools]
  );

  const premiumTools = useMemo(() => 
    tools.filter(tool => tool.isPremium), 
    []
  );

  const stats = useMemo(() => getToolStats(), [getToolStats]);

  // Safe date formatting with error handling
  const memberSince = useMemo(() => {
    try {
      if (user?.metadata?.creationTime) {
        const date = new Date(user.metadata.creationTime);
        if (isNaN(date.getTime())) {
          return 'Unknown';
        }
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      return 'Unknown';
    } catch (error) {
      console.error('Error formatting member since date:', error);
      return 'Unknown';
    }
  }, [user?.metadata?.creationTime]);

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

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    if (process.env.NODE_ENV === 'development') {
      console.log('No user found, redirecting to home');
    }
    return <Navigate to="/" replace />;
  }

  // Safe render logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering dashboard for user:', user.email);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* User Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl border-2 border-gray-200 dark:border-gray-600">
                  {getInitials(user)}
                </div>
                {isEmailVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Welcome back, {getFirstName(user)}!
                </h1>
                <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 truncate">
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                    isEmailVerified 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    <User className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">{isEmailVerified ? 'Verified Account' : 'Unverified'}</span>
                    <span className="sm:hidden">{isEmailVerified ? 'Verified' : 'Unverified'}</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    {accountType}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Member since {memberSince}</span>
                    <span className="sm:hidden">{memberSince.includes(',') ? memberSince.split(',')[1]?.trim() || memberSince : memberSince}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {tools?.length || 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Tools Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {premiumTools?.length || 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Premium Access
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Settings className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {tools?.length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Total Tools
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {favorites?.length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Favorites
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {recentTools?.length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Recently Used
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.totalInteractions || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Total Activity
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Tools */}
        {favoriteTools.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mr-2" />
                <span className="hidden sm:inline">Your Favorite Tools</span>
                <span className="sm:hidden">Favorites</span>
              </h2>
              {clearFavorites && (
                <button
                  onClick={clearFavorites}
                  className="text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {favoriteTools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Tools */}
        {recentToolsData.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2" />
                <span className="hidden sm:inline">Recently Used Tools</span>
                <span className="sm:hidden">Recent</span>
              </h2>
              {clearRecent && (
                <button
                  onClick={clearRecent}
                  className="text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <span className="hidden sm:inline">Clear History</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {recentToolsData.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={favorites.includes(tool.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Premium Tools */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 mr-2" />
            <span className="hidden sm:inline">Your Premium Tools</span>
            <span className="sm:hidden">Premium Tools</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {premiumTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Empty States */}
        {favoriteTools.length === 0 && recentToolsData.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">🚀</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start exploring tools!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 px-4">
              Use tools to see them appear in your recent list, and star your favorites for quick access.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Browse All Tools
            </a>
          </div>
        )}

        {/* Account Status Warning */}
        {!isEmailVerified && accountType === 'Email' && (
          <div className="mt-6 sm:mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">
                  Email Verification Required
                </h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Please verify your email address to ensure account security and receive important updates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};