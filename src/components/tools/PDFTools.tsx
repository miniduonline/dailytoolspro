import React, { useState } from 'react';
import { Upload, Download, Merge, Split, Compass as Compress, FileText } from 'lucide-react';

export const PDFTools: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'merge' | 'split' | 'compress'>('merge');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const TabButton: React.FC<{ 
    id: 'merge' | 'split' | 'compress'; 
    icon: React.ReactNode; 
    label: string; 
    description: string 
  }> = ({ id, icon, label, description }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`p-4 rounded-lg border-2 transition-colors text-left ${
        activeTab === id
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          activeTab === id 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}>
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{label}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
        </div>
      </div>
    </button>
  );

  const FileList: React.FC = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Uploaded Files ({files.length})
        </h4>
        {files.length > 0 && (
          <button
            onClick={clearFiles}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No files uploaded yet
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-red-500" />
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
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PDF Tools</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Merge, split, and compress PDF files
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TabButton
              id="merge"
              icon={<Merge className="h-5 w-5" />}
              label="Merge PDFs"
              description="Combine multiple PDFs into one"
            />
            <TabButton
              id="split"
              icon={<Split className="h-5 w-5" />}
              label="Split PDF"
              description="Split PDF into separate pages"
            />
            <TabButton
              id="compress"
              icon={<Compress className="h-5 w-5" />}
              label="Compress PDF"
              description="Reduce PDF file size"
            />
          </div>
          
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Upload PDF Files
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {activeTab === 'merge' 
                ? 'Select multiple PDF files to merge them into one document'
                : activeTab === 'split'
                ? 'Select a PDF file to split into individual pages'
                : 'Select PDF files to compress and reduce their size'
              }
            </p>
            <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Choose PDF Files
              <input
                type="file"
                accept=".pdf"
                multiple={activeTab === 'merge'}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <FileList />
          
          {files.length > 0 && (
            <div className="space-y-4">
              {activeTab === 'merge' && files.length > 1 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Ready to Merge
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    {files.length} PDF files will be merged in the order shown above.
                  </p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Merge className="h-4 w-4" />
                    <span>Merge PDFs</span>
                  </button>
                </div>
              )}
              
              {activeTab === 'split' && files.length === 1 && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                    Ready to Split
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    The PDF will be split into individual pages.
                  </p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Split className="h-4 w-4" />
                    <span>Split PDF</span>
                  </button>
                </div>
              )}
              
              {activeTab === 'compress' && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                    Ready to Compress
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                    {files.length} PDF file{files.length > 1 ? 's' : ''} will be compressed to reduce file size.
                  </p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                    <Compress className="h-4 w-4" />
                    <span>Compress PDF{files.length > 1 ? 's' : ''}</span>
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Note</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This is a demo interface. In a production environment, these operations would be processed 
              server-side using PDF manipulation libraries. File processing happens locally in your browser 
              for privacy and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};