import React, { useState } from 'react';
import { Link, Copy, Check, ExternalLink } from 'lucide-react';

export const URLShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const shortenUrl = () => {
    if (!url.trim()) return;
    
    // Generate a mock short URL
    const shortCode = Math.random().toString(36).substring(2, 8);
    setShortUrl(`https://short.ly/${shortCode}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">URL Shortener</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create short, shareable links from long URLs
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Long URL
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/very/long/url"
              />
              <button
                onClick={shortenUrl}
                disabled={!url.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Link className="h-4 w-4" />
                <span>Shorten</span>
              </button>
            </div>
          </div>

          {shortUrl && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Short URL
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 rounded-lg text-gray-900 dark:text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};