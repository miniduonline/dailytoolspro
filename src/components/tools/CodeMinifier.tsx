import React, { useState } from 'react';
import { Code, Minimize2, Copy, Check, Download } from 'lucide-react';

export const CodeMinifier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    savings: number;
  } | null>(null);

  const minifyHTML = (html: string) => {
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .replace(/\s+>/g, '>') // Remove spaces before closing brackets
      .replace(/<\s+/g, '<') // Remove spaces after opening brackets
      .trim();
  };

  const minifyCSS = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/;\s*/g, ';') // Remove spaces after semicolons
      .replace(/,\s*/g, ',') // Remove spaces after commas
      .replace(/:\s*/g, ':') // Remove spaces after colons
      .trim();
  };

  const minifyJS = (js: string) => {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/;\s*/g, ';') // Remove spaces after semicolons
      .replace(/,\s*/g, ',') // Remove spaces after commas
      .replace(/\s*=\s*/g, '=') // Remove spaces around equals
      .replace(/\s*\+\s*/g, '+') // Remove spaces around plus
      .replace(/\s*-\s*/g, '-') // Remove spaces around minus
      .replace(/\s*\*\s*/g, '*') // Remove spaces around multiply
      .replace(/\s*\/\s*/g, '/') // Remove spaces around divide
      .trim();
  };

  const minifyCode = () => {
    if (!input.trim()) {
      setOutput('');
      setStats(null);
      return;
    }

    let minified = '';
    
    switch (activeTab) {
      case 'html':
        minified = minifyHTML(input);
        break;
      case 'css':
        minified = minifyCSS(input);
        break;
      case 'js':
        minified = minifyJS(input);
        break;
    }

    setOutput(minified);
    
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savings = Math.round(((originalSize - minifiedSize) / originalSize) * 100);
    
    setStats({
      originalSize,
      minifiedSize,
      savings
    });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      minifyCode();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, activeTab]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadMinified = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minified.${activeTab}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
    <!-- This is a comment -->
    <div class="container">
        <h1>Hello World</h1>
        <p>This is a paragraph.</p>
    </div>
</body>
</html>`;
      case 'css':
        return `/* This is a CSS comment */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}`;
      case 'js':
        return `// This is a JavaScript comment
function calculateSum(a, b) {
    /* Multi-line comment
       explaining the function */
    return a + b;
}

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log('Sum:', sum);`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HTML / CSS / JS Minifier</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Minify and compress your code instantly to improve performance
          </p>
        </div>
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'html'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>HTML</span>
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'css'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>CSS</span>
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'js'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>JavaScript</span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-sm text-blue-600 dark:text-blue-400">Original Size</div>
                <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  {formatBytes(stats.originalSize)}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="text-sm text-green-600 dark:text-green-400">Minified Size</div>
                <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                  {formatBytes(stats.minifiedSize)}
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="text-sm text-purple-600 dark:text-purple-400">Savings</div>
                <div className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                  {stats.savings}%
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <div className="text-sm text-orange-600 dark:text-orange-400">Bytes Saved</div>
                <div className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                  {formatBytes(stats.originalSize - stats.minifiedSize)}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {activeTab.toUpperCase()} Input
                </label>
                <button
                  onClick={() => setInput(getPlaceholder())}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Load Example
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={`Paste your ${activeTab.toUpperCase()} code here...`}
              />
            </div>
            
            {/* Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minified Output
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    disabled={!output}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={downloadMinified}
                    disabled={!output}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
                placeholder="Minified code will appear here..."
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
              <Minimize2 className="h-4 w-4 mr-1" />
              Minification Features
            </h4>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>HTML:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Removes comments</li>
                  <li>• Collapses whitespace</li>
                  <li>• Removes spaces between tags</li>
                </ul>
              </div>
              <div>
                <strong>CSS:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Removes comments</li>
                  <li>• Removes unnecessary spaces</li>
                  <li>• Optimizes selectors</li>
                </ul>
              </div>
              <div>
                <strong>JavaScript:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Removes comments</li>
                  <li>• Collapses whitespace</li>
                  <li>• Optimizes operators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};