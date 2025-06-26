import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Star } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Tool } from '../../types/tool';
import { useAuth } from '../../contexts/AuthContext';

interface ToolCardProps {
  tool: Tool;
  isFavorite?: boolean;
  onToggleFavorite?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const { user } = useAuth();
  const Icon = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<any>;

  const handleClick = (e: React.MouseEvent) => {
    if (tool.isPremium && !user) {
      // Let the link handle navigation to show the premium modal
      return;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(tool.id);
    }
  };

  return (
    <Link
      to={`/tool/${tool.id}`}
      onClick={handleClick}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {tool.isPremium && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
                    <Lock className="h-3 w-3" />
                    <span>Premium</span>
                  </span>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {tool.category}
                </span>
              </div>
            </div>
          </div>
          
          {onToggleFavorite && user && (
            <button
              onClick={handleFavoriteClick}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star 
                className={`h-4 w-4 transition-colors ${
                  isFavorite 
                    ? 'text-yellow-500 fill-current' 
                    : 'text-gray-400 dark:text-gray-600 hover:text-yellow-500'
                }`} 
              />
            </button>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            {tool.isPremium && !user ? 'Sign in to use' : 'Use tool →'}
          </span>
          {tool.isPremium && !user && (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
    </Link>
  );
};