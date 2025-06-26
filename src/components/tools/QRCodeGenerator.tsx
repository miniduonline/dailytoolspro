import React, { useState, useEffect } from 'react';
import { Download, Copy, Check } from 'lucide-react';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple QR code generation using a public API
  const generateQRCode = (input: string) => {
    if (!input.trim()) {
      setQrCode('');
      return;
    }
    
    const size = 200;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}`;
    setQrCode(apiUrl);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode(text);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [text]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy QR code URL:', err);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Code Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate QR codes for text, URLs, and more
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter text, URL, or any data to generate QR code..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={copyToClipboard}
                  disabled={!qrCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                </button>
                
                <button
                  onClick={downloadQRCode}
                  disabled={!qrCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated QR Code</h3>
              
              <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-8 min-h-[300px]">
                {qrCode ? (
                  <img 
                    src={qrCode} 
                    alt="Generated QR Code"
                    className="max-w-full h-auto rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2">📱</div>
                    <p>Enter text or URL to generate QR code</p>
                  </div>
                )}
              </div>
              
              {text && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Tip:</strong> QR codes can contain up to 4,296 characters. 
                    Scan with any QR code reader or camera app.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};