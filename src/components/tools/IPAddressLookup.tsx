import React, { useState } from 'react';
import { Globe, MapPin, Wifi, Server } from 'lucide-react';

export const IPAddressLookup: React.FC = () => {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookupIP = async () => {
    if (!ip.trim()) return;

    setLoading(true);
    try {
      // Mock IP lookup data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResult({
        ip: ip,
        country: 'United States',
        region: 'California',
        city: 'San Francisco',
        isp: 'Example ISP',
        timezone: 'America/Los_Angeles',
        latitude: 37.7749,
        longitude: -122.4194
      });
    } catch (error) {
      console.error('IP lookup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMyIP = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIp(data.ip);
      await lookupIP();
    } catch (error) {
      console.error('Failed to get IP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IP Address Lookup</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Get location and ISP information for any IP address
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              IP Address
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="192.168.1.1"
              />
              <button
                onClick={lookupIP}
                disabled={loading || !ip.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>Lookup</span>
              </button>
            </div>
            <button
              onClick={getMyIP}
              disabled={loading}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Get my IP address
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Looking up IP information...</p>
            </div>
          )}

          {result && !loading && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                IP Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">IP Address</div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.ip}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.city}, {result.region}, {result.country}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">ISP</div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.isp}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Timezone</div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.timezone}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Coordinates: {result.latitude}, {result.longitude}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};