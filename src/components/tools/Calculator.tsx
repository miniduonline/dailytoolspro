import React, { useState } from 'react';
import { Delete } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button: React.FC<{ onClick: () => void; className?: string; children: React.ReactNode }> = ({ 
    onClick, 
    className = '', 
    children 
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-lg font-semibold rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calculator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Basic calculator for mathematical operations
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-right">
              <div className="text-3xl font-mono text-gray-900 dark:text-white overflow-hidden">
                {display}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <Button 
              onClick={clear}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Clear
            </Button>
            <Button 
              onClick={() => setDisplay(display.slice(0, -1) || '0')}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
            >
              <Delete className="h-5 w-5 mx-auto" />
            </Button>
            <Button 
              onClick={() => performOperation('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ÷
            </Button>
            
            <Button 
              onClick={() => inputNumber('7')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              7
            </Button>
            <Button 
              onClick={() => inputNumber('8')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              8
            </Button>
            <Button 
              onClick={() => inputNumber('9')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              9
            </Button>
            <Button 
              onClick={() => performOperation('*')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ×
            </Button>
            
            <Button 
              onClick={() => inputNumber('4')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              4
            </Button>
            <Button 
              onClick={() => inputNumber('5')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              5
            </Button>
            <Button 
              onClick={() => inputNumber('6')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              6
            </Button>
            <Button 
              onClick={() => performOperation('-')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              −
            </Button>
            
            <Button 
              onClick={() => inputNumber('1')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              1
            </Button>
            <Button 
              onClick={() => inputNumber('2')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              2
            </Button>
            <Button 
              onClick={() => inputNumber('3')}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              3
            </Button>
            <Button 
              onClick={() => performOperation('+')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              +
            </Button>
            
            <Button 
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              0
            </Button>
            <Button 
              onClick={inputDecimal}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            >
              .
            </Button>
            <Button 
              onClick={handleEquals}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};