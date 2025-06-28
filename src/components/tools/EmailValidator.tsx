import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const EmailValidator: React.FC = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{
    isValid: boolean;
    reason?: string;
    suggestions?: string[];
  } | null>(null);

  const validateEmail = (email: string) => {
    if (!email) {
      setResult(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isBasicValid = emailRegex.test(email);
    
    if (!isBasicValid) {
      setResult({
        isValid: false,
        reason: 'Invalid email format',
        suggestions: ['Check for typos', 'Ensure @ symbol is present', 'Include domain extension']
      });
      return;
    }

    // Additional checks
    const parts = email.split('@');
    const domain = parts[1];
    
    if (domain.includes('..')) {
      setResult({
        isValid: false,
        reason: 'Domain contains consecutive dots',
        suggestions: ['Remove extra dots from domain']
      });
      return;
    }

    if (parts[0].length > 64) {
      setResult({
        isValid: false,
        reason: 'Local part too long (max 64 characters)',
        suggestions: ['Shorten the part before @ symbol']
      });
      return;
    }

    setResult({
      isValid: true,
      reason: 'Valid email format'
    });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateEmail(email);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [email]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Validator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Validate email addresses and get formatting suggestions
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@domain.com"
              />
            </div>
          </div>

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.isValid 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {result.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-medium ${
                  result.isValid 
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {result.reason}
                </span>
              </div>
              
              {result.suggestions && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Suggestions:
                    </span>
                  </div>
                  <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Email Format Rules</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Must contain exactly one @ symbol</li>
              <li>• Local part (before @) max 64 characters</li>
              <li>• Domain must have at least one dot</li>
              <li>• No consecutive dots allowed</li>
              <li>• Cannot start or end with dots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};