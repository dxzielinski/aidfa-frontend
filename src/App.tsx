import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import PdfUploader from './components/PdfUploader';
import SpendingTrends from './components/SpendingTrends';

const App: React.FC = () => {
  const [view, setView] = useState<'register' | 'login' | 'upload' | 'trends'>('register');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI-Driven Financial Analyzer</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('upload')}>Upload PDF</button>
        <button onClick={() => setView('trends')}>Spending Trends</button>
      </nav>
      {view === 'register' && <Register />}
      {view === 'login' && <Login />}
      {view === 'upload' && <PdfUploader />}
      {view === 'trends' && <SpendingTrends />}
    </div>
  );
};

export default App;