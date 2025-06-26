import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const conversions = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meter', factor: 1 },
        kilometer: { name: 'Kilometer', factor: 1000 },
        centimeter: { name: 'Centimeter', factor: 0.01 },
        millimeter: { name: 'Millimeter', factor: 0.001 },
        inch: { name: 'Inch', factor: 0.0254 },
        foot: { name: 'Foot', factor: 0.3048 },
        yard: { name: 'Yard', factor: 0.9144 },
        mile: { name: 'Mile', factor: 1609.344 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilogram', factor: 1 },
        gram: { name: 'Gram', factor: 0.001 },
        pound: { name: 'Pound', factor: 0.453592 },
        ounce: { name: 'Ounce', factor: 0.0283495 },
        ton: { name: 'Ton', factor: 1000 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius' },
        fahrenheit: { name: 'Fahrenheit' },
        kelvin: { name: 'Kelvin' }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liter: { name: 'Liter', factor: 1 },
        milliliter: { name: 'Milliliter', factor: 0.001 },
        gallon: { name: 'Gallon (US)', factor: 3.78541 },
        quart: { name: 'Quart', factor: 0.946353 },
        cup: { name: 'Cup', factor: 0.236588 },
        fluid_ounce: { name: 'Fluid Ounce', factor: 0.0295735 }
      }
    }
  };

  useEffect(() => {
    const units = Object.keys(conversions[category as keyof typeof conversions].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
    setFromValue('');
    setToValue('');
  }, [category]);

  const convertValue = (value: string, from: string, to: string) => {
    if (!value || !from || !to) return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';

    const categoryData = conversions[category as keyof typeof conversions];
    
    if (category === 'temperature') {
      return convertTemperature(numValue, from, to).toString();
    } else {
      const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.factor || 1;
      const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.factor || 1;
      const result = (numValue * fromFactor) / toFactor;
      return result.toString();
    }
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    const converted = convertValue(value, fromUnit, toUnit);
    setToValue(converted);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    const converted = convertValue(value, toUnit, fromUnit);
    setFromValue(converted);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const categoryData = conversions[category as keyof typeof conversions];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unit Converter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Convert between different units of measurement
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(conversions).map(([key, cat]) => (
                <option key={key} value={key}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  const converted = convertValue(fromValue, e.target.value, toUnit);
                  setToValue(converted);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(categoryData.units).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-center mb-8">
              <button
                onClick={swapUnits}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full transition-colors"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  const converted = convertValue(fromValue, fromUnit, e.target.value);
                  setToValue(converted);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(categoryData.units).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
              <input
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Result"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};