import React, { useState } from 'react';
import { Search, Info, Copy, Check } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const testRegex = () => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          allMatches.push(match);
        }
      }

      setMatches(allMatches);
      setError('');
    } catch (err) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  };

  React.useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightMatches = (text: string) => {
    if (matches.length === 0) return text;

    const parts = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      if (match.index !== undefined) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        
        // Add highlighted match
        parts.push(
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">
            {match[0]}
          </mark>
        );
        
        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const flagOptions = [
    { value: 'g', label: 'Global', description: 'Find all matches' },
    { value: 'i', label: 'Ignore Case', description: 'Case insensitive' },
    { value: 'm', label: 'Multiline', description: '^$ match line breaks' },
    { value: 's', label: 'Dot All', description: '. matches newlines' },
    { value: 'u', label: 'Unicode', description: 'Full unicode support' },
    { value: 'y', label: 'Sticky', description: 'Match from lastIndex' }
  ];

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Basic email validation' },
    { name: 'Phone', pattern: '\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}', description: 'US phone number' },
    { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?', description: 'HTTP/HTTPS URLs' },
    { name: 'IP Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', description: 'IPv4 addresses' },
    { name: 'Hex Color', pattern: '#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}', description: 'Hex color codes' },
    { name: 'Date', pattern: '\\d{1,2}[/-]\\d{1,2}[/-]\\d{4}', description: 'Date MM/DD/YYYY or MM-DD-YYYY' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Regex Tester</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Test regular expressions with real-time matching and explanations
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Regular Expression Pattern
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">/</span>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter regex pattern..."
                  />
                  <span className="text-gray-500 dark:text-gray-400">/</span>
                  <input
                    type="text"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-16 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="flags"
                  />
                </div>
                {error && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Flags
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {flagOptions.map((flag) => (
                    <label key={flag.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={flags.includes(flag.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(flags + flag.value);
                          } else {
                            setFlags(flags.replace(flag.value, ''));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300" title={flag.description}>
                        {flag.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test String
                </label>
                <textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter text to test against the regex..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Matches ({matches.length})
                  </label>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {matches.length > 0 ? `${matches.length} found` : 'No matches'}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[200px] font-mono text-sm overflow-auto">
                  {testString ? (
                    <div className="text-gray-900 dark:text-white whitespace-pre-wrap">
                      {highlightMatches(testString)}
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 text-center">
                      Enter test string to see matches
                    </div>
                  )}
                </div>
              </div>
              
              {matches.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Match Details
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Match {index + 1}
                          </span>
                          <button
                            onClick={() => copyToClipboard(match[0])}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                          >
                            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-gray-500" />}
                          </button>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          <div>Value: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">{match[0]}</code></div>
                          <div>Index: {match.index}</div>
                          {match.length > 1 && (
                            <div>Groups: {match.slice(1).map((group, i) => (
                              <code key={i} className="bg-gray-200 dark:bg-gray-600 px-1 rounded mr-1">
                                {group || 'undefined'}
                              </code>
                            ))}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Patterns</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {commonPatterns.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setPattern(item.pattern)}
                  className="p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{item.description}</div>
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-1 break-all">
                    {item.pattern}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Regex Quick Reference
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>• <code>.</code> - Any character</div>
              <div>• <code>*</code> - 0 or more</div>
              <div>• <code>+</code> - 1 or more</div>
              <div>• <code>?</code> - 0 or 1</div>
              <div>• <code>^</code> - Start of string</div>
              <div>• <code>$</code> - End of string</div>
              <div>• <code>[abc]</code> - Character class</div>
              <div>• <code>(abc)</code> - Capture group</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};