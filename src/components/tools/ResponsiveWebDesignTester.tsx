import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Laptop, Download, ExternalLink, RefreshCw } from 'lucide-react';

export const ResponsiveWebDesignTester: React.FC = () => {
  const [url, setUrl] = useState('');
  const [currentDevice, setCurrentDevice] = useState('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState('');

  const devices = [
    { id: 'desktop', name: 'Desktop', width: 1920, height: 1080, icon: Monitor },
    { id: 'laptop', name: 'Laptop', width: 1366, height: 768, icon: Laptop },
    { id: 'tablet', name: 'Tablet', width: 768, height: 1024, icon: Tablet },
    { id: 'mobile', name: 'Mobile', width: 375, height: 667, icon: Smartphone }
  ];

  const handleLoadUrl = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    
    // Add protocol if missing
    let testUrl = url;
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl;
    }

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoadedUrl(testUrl);
    setIsLoading(false);
  };

  const getCurrentDevice = () => devices.find(d => d.id === currentDevice) || devices[0];

  const exportScreenshot = () => {
    // In a real implementation, this would capture the iframe content
    alert('Screenshot export feature would be implemented here');
  };

  const openInNewTab = () => {
    if (loadedUrl) {
      window.open(loadedUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Responsive Web Design Tester</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Preview your site on multiple devices and screen sizes with export options
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              <span className="text-orange-700 dark:text-orange-300 text-sm font-medium">Premium</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter website URL (e.g., example.com)"
            />
            <button
              onClick={handleLoadUrl}
              disabled={isLoading || !url.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  <span>Load Site</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setCurrentDevice(device.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    currentDevice === device.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{device.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {device.width}×{device.height}
                  </span>
                </button>
              );
            })}
          </div>

          {loadedUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getCurrentDevice().name} Preview
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getCurrentDevice().width} × {getCurrentDevice().height}px
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={exportScreenshot}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={openInNewTab}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center">
                <div 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{
                    width: Math.min(getCurrentDevice().width, 1200),
                    height: Math.min(getCurrentDevice().height, 800),
                    transform: getCurrentDevice().width > 1200 ? `scale(${1200 / getCurrentDevice().width})` : 'none',
                    transformOrigin: 'top left'
                  }}
                >
                  <iframe
                    src={loadedUrl}
                    className="w-full h-full border-0"
                    title={`${getCurrentDevice().name} preview`}
                    sandbox="allow-same-origin allow-scripts allow-forms"
                  />
                </div>
              </div>
            </div>
          )}

          {!loadedUrl && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Website Loaded
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter a URL above to start testing responsive design
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Premium Features</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Test on 20+ device presets</li>
                <li>• Custom viewport dimensions</li>
                <li>• Screenshot export in multiple formats</li>
                <li>• Side-by-side device comparison</li>
                <li>• Performance metrics overlay</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Testing Tips</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Test navigation and touch targets</li>
                <li>• Check text readability on small screens</li>
                <li>• Verify image scaling and loading</li>
                <li>• Test form usability on mobile</li>
                <li>• Check horizontal scrolling issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};