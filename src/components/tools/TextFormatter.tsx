import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const TextFormatter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const formatText = (type: string) => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return text.replace(/\b\w/g, l => l.toUpperCase());
      case 'reverse':
        return text.split('').reverse().join('');
      case 'removeSpaces':
        return text.replace(/\s+/g, '');
      case 'removeLineBreaks':
        return text.replace(/\n/g, ' ');
      default:
        return text;
    }
  };

  const copyToClipboard = async (formattedText: string) => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatOptions = [
    { id: 'uppercase', label: 'UPPERCASE', description: 'Convert to uppercase' },
    { id: 'lowercase', label: 'lowercase', description: 'Convert to lowercase' },
    { id: 'capitalize', label: 'Capitalize', description: 'Capitalize first letter of each word' },
    { id: 'reverse', label: 'Reverse', description: 'Reverse the text' },
    { id: 'removeSpaces', label: 'Remove Spaces', description: 'Remove all spaces' },
    { id: 'removeLineBreaks', label: 'Remove Line Breaks', description: 'Remove line breaks' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Text Formatter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Format and transform your text in various ways
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your text here..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formatOptions.map((option) => {
              const formattedText = formatText(option.id);
              return (
                <div key={option.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{option.label}</h3>
                    <button
                      onClick={() => copyToClipboard(formattedText)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{option.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 min-h-[80px] text-sm font-mono text-gray-900 dark:text-white overflow-wrap break-words">
                    {formattedText || 'Enter text to see result...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};