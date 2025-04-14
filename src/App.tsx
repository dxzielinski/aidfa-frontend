import React, { useState } from 'react';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/process-transactions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Financial Analyzer</h1>

      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>
        Analyze
      </button>

      {loading && <p>Loading analysis...</p>}

      {insights && (
        <div style={{ marginTop: '2rem' }}>
          <h2>AI Insights:</h2>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
};

export default App;
