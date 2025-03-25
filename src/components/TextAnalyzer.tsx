import React, { useState, useCallback } from 'react';
import { Type, CaseUpper as UpperCase, CaseLower as LowerCase, Copy, Trash2, RotateCcw, AlignCenter, AlignLeft, AlignRight, Bold, Italic, Clock, Hash, BarChart2 } from 'lucide-react';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const transformText = (type: 'upper' | 'lower' | 'capitalize' | 'reverse') => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'capitalize':
        setText(
          text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
        );
        break;
      case 'reverse':
        setText(text.split('').reverse().join(''));
        break;
    }
  };

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const clearText = () => {
    setText('');
  };

  const getWordCount = () => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const words = getWordCount();
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Type className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Text Analyzer</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Section */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text
          </label>
          <textarea
            id="text"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={handleTextChange}
          />
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => transformText('upper')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UpperCase className="h-4 w-4 mr-2" />
              UPPERCASE
            </button>
            <button
              onClick={() => transformText('lower')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LowerCase className="h-4 w-4 mr-2" />
              lowercase
            </button>
            <button
              onClick={() => transformText('capitalize')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Bold className="h-4 w-4 mr-2" />
              Capitalize
            </button>
            <button
              onClick={() => transformText('reverse')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reverse
            </button>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={clearText}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
            Text Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-500">Words</span>
              </div>
              <p className="mt-2 text-2xl font-semibold">{getWordCount()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <Type className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-500">Characters</span>
              </div>
              <p className="mt-2 text-2xl font-semibold">{getCharacterCount()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-500">Reading Time</span>
              </div>
              <p className="mt-2 text-2xl font-semibold">{getReadingTime()} min</p>
            </div>
          </div>
        </div>

        {/* Preview */}
        {text && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="whitespace-pre-wrap">{text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAnalyzer;