// src/App.tsx
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import PdfUploader from './components/PdfUploader';
import SpendingTrends from './components/SpendingTrends';
import SpendingAnalysis from './components/SpendingAnalysis';
import Forecast from './components/Forecast';
import PredictionHistory from './components/PredictionHistory';

const App: React.FC = () => {
  const [view, setView] = useState<
    'register' | 'login' | 'upload' | 'trends' | 'analysis' | 'forecast' | 'history'
  >('register');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-10">
        <header className="border-b pb-6">
          <h1 className="text-5xl font-extrabold text-center text-indigo-700 font-sans">
            AI-Driven Financial Analyzer
          </h1>
        </header>

        <nav className="flex flex-wrap justify-center gap-4">
          {[
            ['Register', 'register'],
            ['Login', 'login'],
            ['Upload PDF', 'upload'],
            ['Spending Trends', 'trends'],
            ['Stored Analysis', 'analysis'],
            ['Forecast', 'forecast'],
            ['Prediction History', 'history'],
          ].map(([label, key]) => (
            <button
              key={key}
              className="btn text-sm sm:text-base"
              onClick={() => setView(key as any)}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className="px-4 sm:px-8 md:px-16">
          {view === 'register' && <Register />}
          {view === 'login' && <Login />}
          {view === 'upload' && <PdfUploader />}
          {view === 'trends' && <SpendingTrends />}
          {view === 'analysis' && <SpendingAnalysis />}
          {view === 'forecast' && <Forecast />}
          {view === 'history' && <PredictionHistory />}
        </main>
      </div>
    </div>
  );
};

export default App;
