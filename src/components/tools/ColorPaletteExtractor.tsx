import React, { useState } from 'react';
import { Upload, Palette, Copy, Check, ExternalLink } from 'lucide-react';

export const ColorPaletteExtractor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [colors, setColors] = useState<Array<{
    hex: string;
    rgb: string;
    percentage: number;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        setImageUrl('');
        extractColors(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      setImage(imageUrl);
      extractColors(imageUrl);
    }
  };

  const extractColors = async (imageSrc: string) => {
    setIsProcessing(true);
    
    try {
      // Create canvas and load image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Resize image for faster processing
        const maxSize = 100;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Get image data
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const extractedColors = analyzeColors(imageData);
          setColors(extractedColors);
        }
        setIsProcessing(false);
      };
      
      img.onerror = () => {
        setIsProcessing(false);
        alert('Failed to load image. Please check the URL or try a different image.');
      };
      
      img.src = imageSrc;
    } catch (error) {
      setIsProcessing(false);
      console.error('Error extracting colors:', error);
    }
  };

  const analyzeColors = (imageData: ImageData) => {
    const data = imageData.data;
    const colorMap = new Map<string, number>();
    const totalPixels = data.length / 4;
    
    // Sample every 4th pixel for performance
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Skip transparent pixels
      if (a < 128) continue;
      
      // Quantize colors to reduce noise
      const quantizedR = Math.round(r / 32) * 32;
      const quantizedG = Math.round(g / 32) * 32;
      const quantizedB = Math.round(b / 32) * 32;
      
      const hex = rgbToHex(quantizedR, quantizedG, quantizedB);
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }
    
    // Sort by frequency and get top colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([hex, count]) => {
        const rgb = hexToRgb(hex);
        return {
          hex,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          percentage: Math.round((count / (totalPixels / 4)) * 100)
        };
      });
    
    return sortedColors;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const exportPalette = () => {
    const paletteData = {
      colors: colors.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        percentage: color.percentage
      })),
      extractedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Color Palette Extractor</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload an image or paste a URL to extract dominant colors
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Image</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Click to upload an image
                  </p>
                  <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div className="text-center text-gray-500 dark:text-gray-400">
                OR
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Image URL</h3>
                <form onSubmit={handleUrlSubmit} className="flex space-x-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="submit"
                    disabled={!imageUrl.trim()}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Load</span>
                  </button>
                </form>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Preview</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Palette className="h-12 w-12 mx-auto mb-2" />
                    <p>No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isProcessing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Extracting colors...</p>
            </div>
          )}

          {colors.length > 0 && !isProcessing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Extracted Color Palette
                </h3>
                <button
                  onClick={exportPalette}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div
                      className="w-full h-16 rounded-lg mb-3 border border-gray-200 dark:border-gray-600"
                      style={{ backgroundColor: color.hex }}
                    />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {color.hex.toUpperCase()}
                        </span>
                        <button
                          onClick={() => copyToClipboard(color.hex, `hex-${index}`)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          {copied === `hex-${index}` ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {color.rgb}
                        </span>
                        <button
                          onClick={() => copyToClipboard(color.rgb, `rgb-${index}`)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          {copied === `rgb-${index}` ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {color.percentage}% of image
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Tips</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Works best with images that have distinct color regions</li>
              <li>• Colors are quantized and sorted by frequency</li>
              <li>• Transparent pixels are ignored in the analysis</li>
              <li>• Export palette as JSON for use in design tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};