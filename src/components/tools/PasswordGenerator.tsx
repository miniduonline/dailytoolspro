import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (options.uppercase) charset += uppercase;
    if (options.lowercase) charset += lowercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    if (charset === '') {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const getStrengthColor = () => {
    if (length < 8) return 'text-red-500';
    if (length < 12) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStrengthText = () => {
    if (length < 8) return 'Weak';
    if (length < 12) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Password Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate secure passwords with customizable options
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password Length: {length}
              </label>
              <span className={`text-sm font-medium ${getStrengthColor()}`}>
                {getStrengthText()}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Options</h3>
            
            {Object.entries({
              uppercase: 'Uppercase Letters (A-Z)',
              lowercase: 'Lowercase Letters (a-z)',
              numbers: 'Numbers (0-9)',
              symbols: 'Symbols (!@#$%^&*)'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key as keyof typeof options]}
                  onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700 dark:text-gray-300">{label}</span>
              </label>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Password
              </label>
              <button
                onClick={generatePassword}
                className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Security Tips</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Use at least 12 characters for better security</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Never reuse passwords across different accounts</li>
              <li>• Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};