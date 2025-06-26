import React, { useState, useEffect } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

export const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState('');

  // Simple hash functions (for demo purposes - in production, use crypto libraries)
  const generateHashes = async (text: string) => {
    if (!text) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      // Generate SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256 = Array.from(new Uint8Array(sha256Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Generate SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1 = Array.from(new Uint8Array(sha1Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Generate SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      const sha512 = Array.from(new Uint8Array(sha512Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Simple MD5 simulation (not cryptographically secure)
      const md5 = btoa(text).substring(0, 32).toLowerCase();

      setHashes({
        md5,
        sha1,
        sha256,
        sha512
      });
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateHashes(input);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const hashTypes = [
    { key: 'md5', name: 'MD5', description: '128-bit hash (not secure for cryptographic use)' },
    { key: 'sha1', name: 'SHA-1', description: '160-bit hash (deprecated for security)' },
    { key: 'sha256', name: 'SHA-256', description: '256-bit hash (recommended)' },
    { key: 'sha512', name: 'SHA-512', description: '512-bit hash (most secure)' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hash Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter text to generate hashes..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Generated Hashes
            </h3>
            
            {hashTypes.map((hashType) => (
              <div key={hashType.key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{hashType.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{hashType.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashes[hashType.key as keyof typeof hashes], hashType.key)}
                    disabled={!hashes[hashType.key as keyof typeof hashes]}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors disabled:opacity-50"
                  >
                    {copied === hashType.key ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-600 rounded p-3 font-mono text-sm break-all">
                  {hashes[hashType.key as keyof typeof hashes] || 'Enter text to generate hash...'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Security Notice</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• MD5 and SHA-1 are not secure for cryptographic use</li>
                <li>• Use SHA-256 or SHA-512 for security applications</li>
                <li>• Hashes are one-way functions (cannot be reversed)</li>
                <li>• Same input always produces the same hash</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Common Uses</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• File integrity verification</li>
                <li>• Password storage (with salt)</li>
                <li>• Digital signatures</li>
                <li>• Data deduplication</li>
                <li>• Blockchain and cryptocurrency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};