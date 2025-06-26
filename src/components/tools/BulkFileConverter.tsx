import React, { useState } from 'react';
import { Upload, Download, FileText, Image as ImageIcon, RefreshCw, X } from 'lucide-react';

export const BulkFileConverter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [conversionType, setConversionType] = useState<'word-to-pdf' | 'pdf-to-word' | 'image-to-webp' | 'webp-to-image'>('word-to-pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<Array<{
    name: string;
    url: string;
    size: string;
  }>>([]);

  const conversionOptions = [
    { value: 'word-to-pdf', label: 'Word to PDF', accept: '.doc,.docx', icon: FileText },
    { value: 'pdf-to-word', label: 'PDF to Word', accept: '.pdf', icon: FileText },
    { value: 'image-to-webp', label: 'Image to WebP', accept: 'image/*', icon: ImageIcon },
    { value: 'webp-to-image', label: 'WebP to Image', accept: '.webp', icon: ImageIcon }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
    setConvertedFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertFiles = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    setConvertedFiles([]);

    // Simulate conversion process
    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const file = files[i];
      const extension = getOutputExtension(conversionType);
      const convertedName = file.name.replace(/\.[^/.]+$/, extension);
      
      // Create a mock converted file
      const mockBlob = new Blob(['Mock converted file content'], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(mockBlob);
      
      setConvertedFiles(prev => [...prev, {
        name: convertedName,
        url,
        size: formatFileSize(file.size * (0.8 + Math.random() * 0.4)) // Simulate size change
      }]);
    }

    setIsConverting(false);
  };

  const getOutputExtension = (type: string) => {
    switch (type) {
      case 'word-to-pdf': return '.pdf';
      case 'pdf-to-word': return '.docx';
      case 'image-to-webp': return '.webp';
      case 'webp-to-image': return '.png';
      default: return '.converted';
    }
  };

  const downloadFile = (file: { name: string; url: string }) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const downloadAll = () => {
    convertedFiles.forEach(file => {
      setTimeout(() => downloadFile(file), 100);
    });
  };

  const currentOption = conversionOptions.find(opt => opt.value === conversionType);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bulk File Converter</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Convert multiple files at once with fast drag & drop interface
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              <span className="text-orange-700 dark:text-orange-300 text-sm font-medium">Premium</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Conversion Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {conversionOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setConversionType(option.value as any)}
                    className={`p-4 rounded-lg border-2 transition-colors text-left ${
                      conversionType === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${
                        conversionType === option.value 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`} />
                      <span className={`font-medium ${
                        conversionType === option.value 
                          ? 'text-blue-900 dark:text-blue-100' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Upload Files for {currentOption?.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Drag and drop files here or click to browse
            </p>
            <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
              <input
                type="file"
                accept={currentOption?.accept}
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Files to Convert ({files.length})
                </h4>
                <button
                  onClick={clearFiles}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={convertFiles}
                disabled={isConverting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Converting... ({convertedFiles.length}/{files.length})</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Convert All Files</span>
                  </>
                )}
              </button>
            </div>
          )}

          {convertedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Converted Files ({convertedFiles.length})
                </h4>
                <button
                  onClick={downloadAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download All</span>
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {convertedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {file.size}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(file)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Premium Features</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Convert up to 100 files at once</li>
              <li>• High-quality conversion algorithms</li>
              <li>• Batch processing with progress tracking</li>
              <li>• Support for advanced file formats</li>
              <li>• Priority processing queue</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};