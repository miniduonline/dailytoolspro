import React, { useState } from 'react';
import { Globe, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const WebsiteUptimeChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    status: 'online' | 'offline' | 'error';
    responseTime?: number;
    statusCode?: number;
    error?: string;
  } | null>(null);

  const checkWebsite = async () => {
    if (!url.trim()) return;

    setIsChecking(true);
    setResult(null);

    try {
      const startTime = Date.now();
      
      // Add protocol if missing
      let testUrl = url;
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = 'https://' + testUrl;
      }

      // Use a CORS proxy for demo purposes
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(testUrl)}`;
      
      const response = await fetch(proxyUrl);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        setResult({
          status: 'online',
          responseTime,
          statusCode: 200
        });
      } else {
        setResult({
          status: 'offline',
          responseTime,
          statusCode: response.status
        });
      }
    } catch (error) {
      setResult({
        status: 'error',
        error: 'Failed to check website. Please verify the URL is correct.'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkWebsite();
  };

  const getStatusIcon = () => {
    if (!result) return null;
    
    switch (result.status) {
      case 'online':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'offline':
        return <XCircle className="h-8 w-8 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    if (!result) return '';
    
    switch (result.status) {
      case 'online':
        return 'Website is Online';
      case 'offline':
        return 'Website is Offline';
      case 'error':
        return 'Check Failed';
    }
  };

  const getStatusColor = () => {
    if (!result) return '';
    
    switch (result.status) {
      case 'online':
        return 'text-green-600 dark:text-green-400';
      case 'offline':
        return 'text-red-600 dark:text-red-400';
      case 'error':
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Website Uptime Checker</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Check if any website is currently online and view response time
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example.com or https://example.com"
                />
                <button
                  type="submit"
                  disabled={isChecking || !url.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {isChecking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Check</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getStatusIcon()}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${getStatusColor()}`}>
                  {getStatusText()}
                </h3>
                
                {result.status === 'online' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>Response Time: {result.responseTime}ms</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Status Code: {result.statusCode}
                    </div>
                  </div>
                )}
                
                {result.status === 'offline' && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Status Code: {result.statusCode}
                    </div>
                    {result.responseTime && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Response Time: {result.responseTime}ms
                      </div>
                    )}
                  </div>
                )}
                
                {result.status === 'error' && result.error && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {result.error}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">How it works</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Sends a request to the specified website</li>
              <li>• Measures response time and status</li>
              <li>• Works with any publicly accessible website</li>
              <li>• Automatically adds HTTPS if no protocol specified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};