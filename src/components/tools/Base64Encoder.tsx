import React, { useState } from 'react';
import { Copy, Check, ArrowUpDown } from 'lucide-react';

export const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const processText = (text: string) => {
    setError('');
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(text)));
        setOutput(decoded);
      }
    } catch (err) {
      setError('Invalid input for decoding. Please check your Base64 string.');
      setOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim() === '') {
      setOutput('');
      setError('');
    } else {
      processText(value);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    
    // Swap input and output
    const tempInput = input;
    setInput(output);
    setOutput(tempInput);
    
    // Process the swapped input
    if (output.trim() !== '') {
      processText(output);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Base64 Encoder/Decoder</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Encode and decode Base64 strings
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setMode('encode')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {mode === 'encode' ? 'Plain Text' : 'Base64 Encoded'}
                </label>
                <button
                  onClick={toggleMode}
                  className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Swap</span>
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={
                  mode === 'encode' 
                    ? 'Enter text to encode...' 
                    : 'Enter Base64 string to decode...'
                }
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {mode === 'encode' ? 'Base64 Encoded' : 'Plain Text'}
                </label>
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  rows={8}
                  className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                    error 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Result will appear here..."
                />
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-center p-4">
                      <div className="text-red-500 text-sm font-medium">{error}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">About Base64</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
              It's commonly used to encode binary data that needs to be transmitted over text-based protocols 
              like email or HTTP. The encoding uses 64 characters: A-Z, a-z, 0-9, and two additional characters (+ and /).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};