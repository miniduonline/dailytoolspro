import React, { useState } from 'react';
import { Type, Hash, FileText, Clock } from 'lucide-react';

export const TextCounter: React.FC = () => {
  const [text, setText] = useState('');

  const getStats = () => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    
    // Reading time estimation (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime
    };
  };

  const stats = getStats();

  const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number; suffix?: string }> = ({ 
    icon, 
    label, 
    value, 
    suffix = '' 
  }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {value.toLocaleString()}{suffix}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Text Counter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Count characters, words, sentences, and more in your text
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text Input
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Type or paste your text here to see the statistics..."
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  icon={<Type className="h-4 w-4 text-blue-500" />}
                  label="Characters"
                  value={stats.characters}
                />
                
                <StatCard
                  icon={<Type className="h-4 w-4 text-green-500" />}
                  label="Characters (no spaces)"
                  value={stats.charactersNoSpaces}
                />
                
                <StatCard
                  icon={<Hash className="h-4 w-4 text-purple-500" />}
                  label="Words"
                  value={stats.words}
                />
                
                <StatCard
                  icon={<FileText className="h-4 w-4 text-orange-500" />}
                  label="Sentences"
                  value={stats.sentences}
                />
                
                <StatCard
                  icon={<FileText className="h-4 w-4 text-red-500" />}
                  label="Paragraphs"
                  value={stats.paragraphs}
                />
                
                <StatCard
                  icon={<FileText className="h-4 w-4 text-indigo-500" />}
                  label="Lines"
                  value={stats.lines}
                />
              </div>
              
              <div className="mt-6">
                <StatCard
                  icon={<Clock className="h-4 w-4 text-teal-500" />}
                  label="Estimated Reading Time"
                  value={stats.readingTime}
                  suffix={` minute${stats.readingTime !== 1 ? 's' : ''}`}
                />
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Quick Facts</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Average reading speed: 200 words per minute</li>
                  <li>• Twitter limit: 280 characters</li>
                  <li>• SMS limit: 160 characters</li>
                  <li>• Facebook post ideal: 40-80 characters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};