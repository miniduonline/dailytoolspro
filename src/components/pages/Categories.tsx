import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { toolCategories, tools } from '../../data/tools';

export const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our collection of tools organized by category. Find exactly what you need 
            for your productivity, creativity, and development tasks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolCategories.map(category => {
            const Icon = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
            const categoryTools = tools.filter(tool => tool.category === category.id);
            const freeTools = categoryTools.filter(tool => !tool.isPremium).length;
            const premiumTools = categoryTools.filter(tool => tool.isPremium).length;
            
            return (
              <Link
                key={category.id}
                to={`/?category=${category.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {categoryTools.length} tools available
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex space-x-4">
                      <span className="text-green-600 dark:text-green-400">
                        {freeTools} free
                      </span>
                      {premiumTools > 0 && (
                        <span className="text-orange-600 dark:text-orange-400">
                          {premiumTools} premium
                        </span>
                      )}
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium">
                      Browse tools →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're constantly adding new tools based on user feedback. 
              Let us know what tools you'd like to see added!
            </p>
            <a
              href="mailto:admin@dailytoolspro.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Suggest a Tool
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};