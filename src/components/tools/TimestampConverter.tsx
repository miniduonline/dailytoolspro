import React, { useState } from 'react';
import { Clock, Calendar, ArrowRightLeft } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [humanDate, setHumanDate] = useState(new Date().toISOString().slice(0, 16));
  const [timezone, setTimezone] = useState('UTC');

  const convertToHuman = (ts: string) => {
    try {
      const date = new Date(parseInt(ts) * 1000);
      return {
        iso: date.toISOString(),
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        relative: getRelativeTime(date)
      };
    } catch {
      return null;
    }
  };

  const convertToTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return Math.floor(date.getTime() / 1000);
    } catch {
      return null;
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const setCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const setCurrentDate = () => {
    setHumanDate(new Date().toISOString().slice(0, 16));
  };

  const humanResult = convertToHuman(timestamp);
  const timestampResult = convertToTimestamp(humanDate);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timestamp Converter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Convert between Unix timestamps and human-readable dates
          </p>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timestamp to Human */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Timestamp to Human
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unix Timestamp
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1640995200"
                  />
                  <button
                    onClick={setCurrentTimestamp}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Now
                  </button>
                </div>
              </div>

              {humanResult && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">ISO 8601</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">{humanResult.iso}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Local Time</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">{humanResult.local}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">UTC</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">{humanResult.utc}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Relative</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">{humanResult.relative}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Human to Timestamp */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Human to Timestamp
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date & Time
                </label>
                <div className="flex space-x-2">
                  <input
                    type="datetime-local"
                    value={humanDate}
                    onChange={(e) => setHumanDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={setCurrentDate}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Now
                  </button>
                </div>
              </div>

              {timestampResult && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Unix Timestamp</div>
                  <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
                    {timestampResult}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Seconds since January 1, 1970 UTC
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">About Unix Timestamps</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Unix timestamp is the number of seconds since January 1, 1970 UTC</li>
              <li>• Also known as Epoch time or POSIX time</li>
              <li>• Widely used in programming and databases</li>
              <li>• Always in UTC timezone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};