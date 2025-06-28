import React, { useState } from 'react';
import { Code, Copy, Check, Download } from 'lucide-react';

export const CSSBeautifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const beautifyCSS = (css: string) => {
    if (!css.trim()) {
      setOutput('');
      return;
    }

    try {
      let formatted = css
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Add newlines after opening braces
        .replace(/\{/g, ' {\n')
        // Add newlines after closing braces
        .replace(/\}/g, '\n}\n')
        // Add newlines after semicolons
        .replace(/;/g, ';\n')
        // Clean up multiple newlines
        .replace(/\n\s*\n/g, '\n')
        .trim();

      // Add proper indentation
      const lines = formatted.split('\n');
      let indentLevel = 0;
      const indent = ' '.repeat(indentSize);
      
      const formattedLines = lines.map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';
        
        if (trimmedLine.includes('}')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const indentedLine = indent.repeat(indentLevel) + trimmedLine;
        
        if (trimmedLine.includes('{')) {
          indentLevel++;
        }
        
        return indentedLine;
      });

      setOutput(formattedLines.join('\n'));
    } catch (error) {
      setOutput('Error formatting CSS');
    }
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      beautifyCSS(input);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, indentSize]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    setInput(`body{margin:0;padding:0;font-family:Arial,sans-serif}h1,h2,h3{color:#333;margin-bottom:10px}.container{max-width:1200px;margin:0 auto;padding:20px}.button{background-color:#007bff;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer}.button:hover{background-color:#0056b3}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CSS Beautifier</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Format and beautify your CSS code with proper indentation
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Indent Size
                </label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={loadExample}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Load Example
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                CSS Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Paste your CSS code here..."
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Formatted Output
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
                    onClick={downloadCSS}
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
                placeholder="Formatted CSS will appear here..."
              />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <Code className="h-4 w-4 mr-1" />
              CSS Formatting Features
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Proper indentation for nested rules</li>
              <li>• Consistent spacing around braces and semicolons</li>
              <li>• Line breaks for better readability</li>
              <li>• Customizable indent size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};