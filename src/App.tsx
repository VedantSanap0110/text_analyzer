import React from 'react';
import TextAnalyzer from './components/TextAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <TextAnalyzer />
      </div>
    </div>
  );
}

export default App;