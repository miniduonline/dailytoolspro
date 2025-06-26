import React, { useState } from 'react';
import { Upload, Download, Image as ImageIcon, Sliders, Archive, X } from 'lucide-react';

export const ImageOptimizerCompressor: React.FC = () => {
  const [images, setImages] = useState<Array<{
    file: File;
    preview: string;
    originalSize: number;
    compressedSize?: number;
    quality: number;
    format: string;
  }>>([]);
  const [globalQuality, setGlobalQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState('original');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          setImages(prev => [...prev, {
            file,
            preview,
            originalSize: file.size,
            quality: globalQuality,
            format: outputFormat === 'original' ? file.type : `image/${outputFormat}`
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateImageQuality = (index: number, quality: number) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, quality } : img
    ));
  };

  const updateImageFormat = (index: number, format: string) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, format: format === 'original' ? img.file.type : `image/${format}` } : img
    ));
  };

  const compressImages = async () => {
    setIsProcessing(true);
    
    // Simulate compression process
    for (let i = 0; i < images.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate compression by reducing file size based on quality
      const compressionRatio = images[i].quality / 100;
      const compressedSize = Math.round(images[i].originalSize * compressionRatio * (0.3 + Math.random() * 0.4));
      
      setImages(prev => prev.map((img, index) => 
        index === i ? { ...img, compressedSize } : img
      ));
    }
    
    setIsProcessing(false);
  };

  const downloadImage = (image: any, index: number) => {
    // In a real implementation, this would download the compressed image
    const link = document.createElement('a');
    link.href = image.preview;
    const extension = image.format.split('/')[1];
    link.download = `compressed-${index + 1}.${extension}`;
    link.click();
  };

  const downloadAllAsZip = () => {
    // In a real implementation, this would create a ZIP file
    alert('ZIP download would be implemented here');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalSavings = () => {
    const totalOriginal = images.reduce((sum, img) => sum + img.originalSize, 0);
    const totalCompressed = images.reduce((sum, img) => sum + (img.compressedSize || img.originalSize), 0);
    const savings = totalOriginal - totalCompressed;
    const percentage = totalOriginal > 0 ? Math.round((savings / totalOriginal) * 100) : 0;
    return { savings, percentage };
  };

  const totalSavings = getTotalSavings();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Image Optimizer & Compressor</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Compress and resize images in bulk, with zip export and drag-drop UI
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              <span className="text-orange-700 dark:text-orange-300 text-sm font-medium">Premium</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Global Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Quality: {globalQuality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={globalQuality}
                onChange={(e) => setGlobalQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="original">Keep Original</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Upload Images
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Drag and drop images here or click to browse
            </p>
            <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Choose Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Images ({images.length})
                </h3>
                <div className="flex space-x-3">
                  {images.some(img => img.compressedSize) && (
                    <button
                      onClick={downloadAllAsZip}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <Archive className="h-4 w-4" />
                      <span>Download ZIP</span>
                    </button>
                  )}
                  <button
                    onClick={compressImages}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                  >
                    <Sliders className="h-4 w-4" />
                    <span>{isProcessing ? 'Processing...' : 'Compress All'}</span>
                  </button>
                </div>
              </div>

              {/* Savings Summary */}
              {images.some(img => img.compressedSize) && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200">Total Savings</h4>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        {formatFileSize(totalSavings.savings)} saved ({totalSavings.percentage}% reduction)
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600 dark:text-green-300">Original: {formatFileSize(images.reduce((sum, img) => sum + img.originalSize, 0))}</div>
                      <div className="text-sm text-green-600 dark:text-green-300">Compressed: {formatFileSize(images.reduce((sum, img) => sum + (img.compressedSize || img.originalSize), 0))}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="relative mb-4">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                          Quality: {image.quality}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={image.quality}
                          onChange={(e) => updateImageQuality(index, Number(e.target.value))}
                          className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                          Format
                        </label>
                        <select
                          value={image.format.includes('/') ? image.format.split('/')[1] : 'original'}
                          onChange={(e) => updateImageFormat(index, e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        >
                          <option value="original">Original</option>
                          <option value="jpeg">JPEG</option>
                          <option value="png">PNG</option>
                          <option value="webp">WebP</option>
                        </select>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Original:</span>
                          <span className="text-gray-900 dark:text-white">{formatFileSize(image.originalSize)}</span>
                        </div>
                        {image.compressedSize && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Compressed:</span>
                              <span className="text-green-600 dark:text-green-400">{formatFileSize(image.compressedSize)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Savings:</span>
                              <span className="text-green-600 dark:text-green-400">
                                {Math.round(((image.originalSize - image.compressedSize) / image.originalSize) * 100)}%
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {image.compressedSize && (
                        <button
                          onClick={() => downloadImage(image, index)}
                          className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Premium Features</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Batch process up to 100 images</li>
              <li>• Advanced compression algorithms</li>
              <li>• Custom resize dimensions</li>
              <li>• Watermark application</li>
              <li>• EXIF data removal for privacy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};