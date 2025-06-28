import React, { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';

export const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWords = (count: number) => {
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words;
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5;
    const words = generateWords(wordCount);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generateText = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        const words = generateWords(count);
        if (startWithLorem && count > 0) {
          words[0] = 'Lorem';
          if (count > 1) words[1] = 'ipsum';
        }
        result = words.join(' ');
        break;
        
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        if (startWithLorem && sentences.length > 0) {
          sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        }
        result = sentences.join(' ');
        break;
        
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        if (startWithLorem && paragraphs.length > 0) {
          paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
        }
        result = paragraphs.join('\n\n');
        break;
    }
    
    setGenerated(result);
  };

  React.useEffect(() => {
    generateText();
  }, [count, type, startWithLorem]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lorem Ipsum Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate placeholder text for your designs and layouts
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Count
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="startWithLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="startWithLorem" className="text-sm text-gray-700 dark:text-gray-300">
                Start with "Lorem ipsum"
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Text
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              value={generated}
              readOnly
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <Type className="h-4 w-4 mr-1" />
              About Lorem Ipsum
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Lorem Ipsum is placeholder text used in the printing and typesetting industry since the 1500s. 
              It's derived from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};