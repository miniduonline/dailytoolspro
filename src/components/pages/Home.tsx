import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../ui/SearchBar';
import { ToolCard } from '../ui/ToolCard';
import { tools, toolCategories } from '../../data/tools';
import { useAuth } from '../../contexts/AuthContext';
import { useToolTracking } from '../../hooks/useToolTracking';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Coffee, 
  Bell, 
  X, 
  TrendingUp, 
  Users, 
  Star, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Laptop,
  Code,
  Image,
  FileText,
  Calculator,
  Palette,
  Lock,
  Download,
  Heart
} from 'lucide-react';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNotificationBanner, setShowNotificationBanner] = useState(true);
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useToolTracking();

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const freeTools = filteredTools.filter(tool => !tool.isPremium);
  const premiumTools = filteredTools.filter(tool => tool.isPremium);

  // Mock data for enhanced sections
  const featuredTools = tools.slice(0, 6);

  const handleEnableNotifications = async () => {
    try {
      if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return;
      }

      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        localStorage.setItem('notificationsEnabled', 'true');
        setShowNotificationBanner(false);
        
        new Notification('Daily Tools Pro', {
          body: 'You\'ll now receive notifications about new tools!',
          icon: '/favicon.ico'
        });
      } else if (permission === 'denied') {
        alert('Notifications were blocked. Please enable them in your browser settings.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const closeBanner = () => {
    setShowNotificationBanner(false);
    localStorage.setItem('notificationBannerDismissed', 'true');
  };

  React.useEffect(() => {
    const isDismissed = localStorage.getItem('notificationBannerDismissed');
    const isEnabled = localStorage.getItem('notificationsEnabled');
    
    if (isDismissed || isEnabled) {
      setShowNotificationBanner(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Notification Banner */}
      {showNotificationBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center space-x-3 flex-1">
                <Bell className="h-5 w-5 text-yellow-300 mt-0.5 sm:mt-0 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium">
                    Stay updated with new tools!
                  </p>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 sm:mt-0">
                    Enable notifications to be the first to know when we add new productivity tools
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleEnableNotifications}
                  className="flex-1 sm:flex-none px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm border border-white/20"
                >
                  Enable Notifications
                </button>
                <button
                  onClick={closeBanner}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close notification banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Daily Web Tools Hub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Essential tools for productivity, creativity, and development. Everything you need in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Always Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                <span>Web-Based</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{tools.length}+</div>
                <div className="text-blue-200 text-sm">Tools Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-blue-200 text-sm">Daily Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-blue-200 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our most popular and powerful tools that help thousands of users every day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredTools.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={user ? toggleFavorite : undefined}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              const freeToolsSection = document.getElementById('free-tools-section');
              if (freeToolsSection) {
                freeToolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <span>View All Tools</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tool Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of tools organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {toolCategories.map(category => {
              const categoryCount = tools.filter(tool => tool.category === category.id).length;
              const iconMap = {
                'text': FileText,
                'image': Image,
                'development': Code,
                'productivity': CheckCircle,
                'design': Palette,
                'converter': ArrowRight,
                'calculator': Calculator,
                'utility': Zap
              };
              const Icon = iconMap[category.id] || Zap;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {categoryCount} tools available
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Tools ({tools.length})
          </button>
          {toolCategories.map(category => {
            const categoryCount = tools.filter(tool => tool.category === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name} ({categoryCount})
              </button>
            );
          })}
        </div>
      </section>

      {/* Free Tools Section */}
      {freeTools.length > 0 && (
        <section id="free-tools-section" className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Free Tools
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {freeTools.length} tools available
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTools.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={user ? toggleFavorite : undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* Premium Tools Section */}
      {premiumTools.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Premium Tools
            </h2>
            <div className="flex items-center space-x-4">
              {!user && (
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  Sign in to unlock
                </span>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {premiumTools.length} tools available
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTools.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={user ? toggleFavorite : undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Daily Tools Pro?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've built the ultimate toolkit for modern professionals, students, and creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All tools are optimized for speed and performance. No waiting, just instant results.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Privacy Protected
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data stays on your device. We don't store or track your personal information.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works perfectly on all devices - desktop, tablet, and mobile phones.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                No Installation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Web-based tools that work instantly in your browser. No downloads required.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Always Free
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Core tools are completely free to use. Premium features available for power users.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built based on user feedback and requests. Your input shapes our development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Daily Tools Pro
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Are all tools really free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! Most of our tools are completely free to use with no limitations. We also offer premium tools with advanced features for users who need extra functionality.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you store my data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, we prioritize your privacy. Most tools process data locally in your browser, and we don't store your personal files or data on our servers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I use these tools on mobile devices?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! All our tools are fully responsive and work seamlessly on smartphones, tablets, and desktop computers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How often do you add new tools?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We regularly add new tools based on user requests and market needs. Enable notifications to be the first to know about new additions!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-orange-50 dark:bg-orange-900/10 border-t border-orange-200 dark:border-orange-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <Coffee className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Support This Project
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Daily Tools Pro is free to use and always will be. If you find it helpful, 
              consider supporting the development with a coffee! Your support helps us add more tools and keep the service running.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://buymeacoffee.com/miniduonline"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                <Coffee className="h-5 w-5" />
                <span>Buy Me Coffee</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Loved by 10+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </section>
      )}
    </div>
  );
};