import React, { useState } from 'react';
import { Shield, Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const checkCriteria = (password: string) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noSpaces: !/\s/.test(password),
      noCommon: !isCommonPassword(password)
    };
  };

  const isCommonPassword = (password: string) => {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
      'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon',
      'master', 'hello', 'login', 'pass', 'admin123', 'root', 'user'
    ];
    return commonPasswords.includes(password.toLowerCase());
  };

  const calculateStrength = (password: string) => {
    if (!password) return { score: 0, level: 'None', color: 'gray' };
    
    const criteria = checkCriteria(password);
    const passed = Object.values(criteria).filter(Boolean).length;
    const total = Object.keys(criteria).length;
    const score = Math.round((passed / total) * 100);
    
    if (score < 30) return { score, level: 'Very Weak', color: 'red' };
    if (score < 50) return { score, level: 'Weak', color: 'orange' };
    if (score < 70) return { score, level: 'Fair', color: 'yellow' };
    if (score < 90) return { score, level: 'Good', color: 'blue' };
    return { score, level: 'Excellent', color: 'green' };
  };

  const getTimeToCrack = (password: string) => {
    if (!password) return 'N/A';
    
    const charset = {
      lowercase: 26,
      uppercase: 26,
      numbers: 10,
      symbols: 32
    };
    
    let possibleChars = 0;
    if (/[a-z]/.test(password)) possibleChars += charset.lowercase;
    if (/[A-Z]/.test(password)) possibleChars += charset.uppercase;
    if (/\d/.test(password)) possibleChars += charset.numbers;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) possibleChars += charset.symbols;
    
    const combinations = Math.pow(possibleChars, password.length);
    const guessesPerSecond = 1000000000; // 1 billion guesses per second
    const secondsToCrack = combinations / (2 * guessesPerSecond);
    
    if (secondsToCrack < 60) return 'Less than a minute';
    if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`;
    if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`;
    if (secondsToCrack < 31536000) return `${Math.round(secondsToCrack / 86400)} days`;
    if (secondsToCrack < 31536000000) return `${Math.round(secondsToCrack / 31536000)} years`;
    return 'Centuries';
  };

  const getSuggestions = (password: string) => {
    const criteria = checkCriteria(password);
    const suggestions = [];
    
    if (!criteria.length) suggestions.push('Use at least 8 characters');
    if (!criteria.lowercase) suggestions.push('Add lowercase letters (a-z)');
    if (!criteria.uppercase) suggestions.push('Add uppercase letters (A-Z)');
    if (!criteria.numbers) suggestions.push('Add numbers (0-9)');
    if (!criteria.symbols) suggestions.push('Add special characters (!@#$%^&*)');
    if (!criteria.noSpaces) suggestions.push('Remove spaces');
    if (!criteria.noCommon) suggestions.push('Avoid common passwords');
    
    if (suggestions.length === 0) {
      suggestions.push('Consider making it even longer for maximum security');
    }
    
    return suggestions;
  };

  const criteria = checkCriteria(password);
  const strength = calculateStrength(password);
  const timeToCrack = getTimeToCrack(password);
  const suggestions = getSuggestions(password);

  const CriteriaItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <div className={`flex items-center space-x-2 ${met ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
      {met ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
      <span className="text-sm">{text}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Password Strength Checker</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Analyze and visualize the strength of any password with suggestions
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your password here..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {password && (
            <>
              {/* Strength Meter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Strength
                  </span>
                  <span className={`text-sm font-semibold text-${strength.color}-600 dark:text-${strength.color}-400`}>
                    {strength.level} ({strength.score}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 bg-${strength.color}-500`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>

              {/* Security Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Security Metrics</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Length:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{password.length} characters</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Time to crack:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{timeToCrack}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Entropy:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {Math.round(password.length * Math.log2(95))} bits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Character Types</span>
                  </div>
                  <div className="space-y-1">
                    <CriteriaItem met={criteria.lowercase} text="Lowercase letters" />
                    <CriteriaItem met={criteria.uppercase} text="Uppercase letters" />
                    <CriteriaItem met={criteria.numbers} text="Numbers" />
                    <CriteriaItem met={criteria.symbols} text="Special characters" />
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Security Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <CriteriaItem met={criteria.length} text="At least 8 characters" />
                  <CriteriaItem met={criteria.noSpaces} text="No spaces" />
                  <CriteriaItem met={criteria.noCommon} text="Not a common password" />
                  <CriteriaItem met={Object.values(criteria).filter(Boolean).length >= 5} text="Multiple character types" />
                </div>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Suggestions for Improvement</h4>
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start space-x-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Password Security Tips</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Use a unique password for each account</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Avoid personal information in passwords</li>
              <li>• Update passwords regularly for sensitive accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};