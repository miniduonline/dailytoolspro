import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = (jsonString: string, indent: number = 2) => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON format. Please check your syntax.');
      setOutput('');
    }
  };

  const minifyJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON format. Please check your syntax.');
      setOutput('');
    }
  };

  const validateJSON = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim() === '') {
      setOutput('');
      setError('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isValidJSON = input.trim() !== '' && validateJSON(input);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JSON Formatter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Format, validate, and minify JSON data
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => formatJSON(input, 2)}
              disabled={!isValidJSON}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Format (2 spaces)
            </button>
            <button
              onClick={() => formatJSON(input, 4)}
              disabled={!isValidJSON}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Format (4 spaces)
            </button>
            <button
              onClick={() => minifyJSON(input)}
              disabled={!isValidJSON}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Minify
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!output}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  JSON Input
                </label>
                <div className="flex items-center space-x-2">
                  {input.trim() !== '' && (
                    <div className={`flex items-center space-x-1 ${isValidJSON ? 'text-green-600' : 'text-red-600'}`}>
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {isValidJSON ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                placeholder='Enter your JSON here... e.g., {"name": "John", "age": 30}'
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formatted Output
              </label>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  rows={15}
                  className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm ${
                    error 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Formatted JSON will appear here..."
                />
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-center p-4">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                      <div className="text-red-600 dark:text-red-400 font-medium">{error}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">JSON Tips</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use double quotes for strings and property names</li>
              <li>• Supported data types: string, number, boolean, array, object, null</li>
              <li>• No trailing commas or comments allowed</li>
              <li>• Use format to improve readability or minify to reduce size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};