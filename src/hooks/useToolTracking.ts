import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useToolTracking = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);

  // Load data from localStorage on mount and when user changes
  useEffect(() => {
    const loadData = () => {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        const savedRecent = localStorage.getItem('recentTools');
        
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
        } else {
          setFavorites([]);
        }
        
        if (savedRecent) {
          const parsedRecent = JSON.parse(savedRecent);
          setRecentTools(Array.isArray(parsedRecent) ? parsedRecent : []);
        } else {
          setRecentTools([]);
        }
      } catch (error) {
        console.error('Error loading tool tracking data:', error);
        setFavorites([]);
        setRecentTools([]);
      }
    };

    loadData();
  }, [user]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('recentTools', JSON.stringify(recentTools));
    } catch (error) {
      console.error('Error saving recent tools:', error);
    }
  }, [recentTools]);

  const toggleFavorite = (toolId: string) => {
    if (!user) return; // Only allow favorites for logged-in users
    
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      return newFavorites;
    });
  };

  const addToRecent = (toolId: string) => {
    setRecentTools(prev => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter(id => id !== toolId);
      // Add to beginning and limit to 10 items
      const newRecent = [toolId, ...filtered].slice(0, 10);
      return newRecent;
    });
  };

  const clearRecent = () => {
    setRecentTools([]);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getToolStats = () => {
    return {
      favoritesCount: favorites.length,
      recentCount: recentTools.length,
      totalInteractions: favorites.length + recentTools.length
    };
  };

  return {
    favorites,
    recentTools,
    toggleFavorite,
    addToRecent,
    clearRecent,
    clearFavorites,
    getToolStats,
    isFavorite: (toolId: string) => favorites.includes(toolId),
    isRecent: (toolId: string) => recentTools.includes(toolId)
  };
};