import React, { useState } from 'react';
import { Copy, Check, Palette, Box } from 'lucide-react';

export const CSSGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gradient' | 'shadow' | 'border'>('gradient');
  const [copied, setCopied] = useState(false);

  // Gradient state
  const [gradient, setGradient] = useState({
    type: 'linear',
    direction: 'to right',
    color1: '#3B82F6',
    color2: '#8B5CF6',
    color3: '#EC4899'
  });

  // Shadow state
  const [shadow, setShadow] = useState({
    x: 0,
    y: 4,
    blur: 6,
    spread: 0,
    color: '#000000',
    opacity: 25,
    inset: false
  });

  // Border state
  const [border, setBorder] = useState({
    width: 2,
    style: 'solid',
    color: '#3B82F6',
    radius: 8
  });

  const generateGradientCSS = () => {
    const { type, direction, color1, color2, color3 } = gradient;
    if (type === 'linear') {
      return `background: linear-gradient(${direction}, ${color1}, ${color2}, ${color3});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2}, ${color3});`;
    }
  };

  const generateShadowCSS = () => {
    const { x, y, blur, spread, color, opacity, inset } = shadow;
    const shadowColor = `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`;
    return `box-shadow: ${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${shadowColor};`;
  };

  const generateBorderCSS = () => {
    const { width, style, color, radius } = border;
    return `border: ${width}px ${style} ${color};\nborder-radius: ${radius}px;`;
  };

  const getCurrentCSS = () => {
    switch (activeTab) {
      case 'gradient':
        return generateGradientCSS();
      case 'shadow':
        return generateShadowCSS();
      case 'border':
        return generateBorderCSS();
      default:
        return '';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPreviewStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: '200px',
      height: '120px',
      margin: '0 auto',
      borderRadius: '8px'
    };

    switch (activeTab) {
      case 'gradient':
        return {
          ...baseStyle,
          background: gradient.type === 'linear' 
            ? `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`
            : `radial-gradient(circle, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`
        };
      case 'shadow':
        const shadowColor = `${shadow.color}${Math.round(shadow.opacity * 2.55).toString(16).padStart(2, '0')}`;
        return {
          ...baseStyle,
          backgroundColor: '#f3f4f6',
          boxShadow: `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadowColor}`
        };
      case 'border':
        return {
          ...baseStyle,
          backgroundColor: '#f3f4f6',
          border: `${border.width}px ${border.style} ${border.color}`,
          borderRadius: `${border.radius}px`
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CSS Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate CSS for gradients, shadows, and borders with live preview
          </p>
        </div>
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('gradient')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'gradient'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Palette className="h-4 w-4" />
              <span>Gradient</span>
            </button>
            <button
              onClick={() => setActiveTab('shadow')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'shadow'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Box className="h-4 w-4" />
              <span>Shadow</span>
            </button>
            <button
              onClick={() => setActiveTab('border')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'border'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Box className="h-4 w-4" />
              <span>Border</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              {activeTab === 'gradient' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gradient Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={gradient.type}
                      onChange={(e) => setGradient(prev => ({ ...prev, type: e.target.value as 'linear' | 'radial' }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </div>

                  {gradient.type === 'linear' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Direction
                      </label>
                      <select
                        value={gradient.direction}
                        onChange={(e) => setGradient(prev => ({ ...prev, direction: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="to right">To Right</option>
                        <option value="to left">To Left</option>
                        <option value="to bottom">To Bottom</option>
                        <option value="to top">To Top</option>
                        <option value="45deg">45 Degrees</option>
                        <option value="135deg">135 Degrees</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color 1
                      </label>
                      <input
                        type="color"
                        value={gradient.color1}
                        onChange={(e) => setGradient(prev => ({ ...prev, color1: e.target.value }))}
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color 2
                      </label>
                      <input
                        type="color"
                        value={gradient.color2}
                        onChange={(e) => setGradient(prev => ({ ...prev, color2: e.target.value }))}
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color 3
                      </label>
                      <input
                        type="color"
                        value={gradient.color3}
                        onChange={(e) => setGradient(prev => ({ ...prev, color3: e.target.value }))}
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shadow' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shadow Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        X Offset: {shadow.x}px
                      </label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadow.x}
                        onChange={(e) => setShadow(prev => ({ ...prev, x: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Y Offset: {shadow.y}px
                      </label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadow.y}
                        onChange={(e) => setShadow(prev => ({ ...prev, y: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blur: {shadow.blur}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={shadow.blur}
                        onChange={(e) => setShadow(prev => ({ ...prev, blur: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Spread: {shadow.spread}px
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={shadow.spread}
                        onChange={(e) => setShadow(prev => ({ ...prev, spread: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Opacity: {shadow.opacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.opacity}
                      onChange={(e) => setShadow(prev => ({ ...prev, opacity: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color
                      </label>
                      <input
                        type="color"
                        value={shadow.color}
                        onChange={(e) => setShadow(prev => ({ ...prev, color: e.target.value }))}
                        className="w-20 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        id="inset"
                        checked={shadow.inset}
                        onChange={(e) => setShadow(prev => ({ ...prev, inset: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="inset" className="text-sm text-gray-700 dark:text-gray-300">
                        Inset Shadow
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'border' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Border Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Width: {border.width}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={border.width}
                      onChange={(e) => setBorder(prev => ({ ...prev, width: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Style
                    </label>
                    <select
                      value={border.style}
                      onChange={(e) => setBorder(prev => ({ ...prev, style: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="groove">Groove</option>
                      <option value="ridge">Ridge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={border.color}
                      onChange={(e) => setBorder(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Border Radius: {border.radius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={border.radius}
                      onChange={(e) => setBorder(prev => ({ ...prev, radius: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Preview and CSS Output */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 flex items-center justify-center">
                  <div style={getPreviewStyle()} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated CSS</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{getCurrentCSS()}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};