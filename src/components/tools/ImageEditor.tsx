import React, { useState } from 'react';
import { Upload, Download, RotateCw, Crop, Sliders, Save } from 'lucide-react';

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hue: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0
  });
  const [rotation, setRotation] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness}%) 
        contrast(${filters.contrast}%) 
        saturate(${filters.saturate}%) 
        hue-rotate(${filters.hue}deg) 
        blur(${filters.blur}px)
        grayscale(${filters.grayscale}%)
        sepia(${filters.sepia}%)
      `,
      transform: `rotate(${rotation}deg)`
    };
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      hue: 0,
      blur: 0,
      grayscale: 0,
      sepia: 0
    });
    setRotation(0);
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const downloadImage = () => {
    if (!image) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        // Apply filters
        ctx.filter = `
          brightness(${filters.brightness}%) 
          contrast(${filters.contrast}%) 
          saturate(${filters.saturate}%) 
          hue-rotate(${filters.hue}deg) 
          blur(${filters.blur}px)
          grayscale(${filters.grayscale}%)
          sepia(${filters.sepia}%)
        `;
        
        // Handle rotation
        if (rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        } else {
          ctx.drawImage(img, 0, 0);
        }
        
        // Download
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };
    
    img.src = image;
  };

  const FilterSlider: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
  }> = ({ label, value, min, max, step = 1, unit = '', onChange }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Image Editor</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Advanced image editing with filters and transformations
          </p>
        </div>
        
        <div className="p-6">
          {!image ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Upload an image to get started
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Drag and drop an image file or click to browse
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
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={rotateImage}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <RotateCw className="h-4 w-4" />
                      <span>Rotate</span>
                    </button>
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={downloadImage}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                  <img
                    src={image}
                    alt="Preview"
                    style={getFilterStyle()}
                    className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sliders className="h-5 w-5 mr-2" />
                    Filters
                  </h3>
                  
                  <div className="space-y-4">
                    <FilterSlider
                      label="Brightness"
                      value={filters.brightness}
                      min={0}
                      max={200}
                      unit="%"
                      onChange={(value) => setFilters(prev => ({ ...prev, brightness: value }))}
                    />
                    
                    <FilterSlider
                      label="Contrast"
                      value={filters.contrast}
                      min={0}
                      max={200}
                      unit="%"
                      onChange={(value) => setFilters(prev => ({ ...prev, contrast: value }))}
                    />
                    
                    <FilterSlider
                      label="Saturation"
                      value={filters.saturate}
                      min={0}
                      max={200}
                      unit="%"
                      onChange={(value) => setFilters(prev => ({ ...prev, saturate: value }))}
                    />
                    
                    <FilterSlider
                      label="Hue Rotate"
                      value={filters.hue}
                      min={0}
                      max={360}
                      unit="°"
                      onChange={(value) => setFilters(prev => ({ ...prev, hue: value }))}
                    />
                    
                    <FilterSlider
                      label="Blur"
                      value={filters.blur}
                      min={0}
                      max={10}
                      step={0.1}
                      unit="px"
                      onChange={(value) => setFilters(prev => ({ ...prev, blur: value }))}
                    />
                    
                    <FilterSlider
                      label="Grayscale"
                      value={filters.grayscale}
                      min={0}
                      max={100}
                      unit="%"
                      onChange={(value) => setFilters(prev => ({ ...prev, grayscale: value }))}
                    />
                    
                    <FilterSlider
                      label="Sepia"
                      value={filters.sepia}
                      min={0}
                      max={100}
                      unit="%"
                      onChange={(value) => setFilters(prev => ({ ...prev, sepia: value }))}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Tips</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Adjust brightness for light/dark images</li>
                    <li>• Increase contrast for sharper images</li>
                    <li>• Use grayscale for black & white effect</li>
                    <li>• Sepia adds vintage warmth</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};