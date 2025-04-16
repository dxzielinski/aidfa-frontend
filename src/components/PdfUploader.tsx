import React, { useState } from 'react';

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF file.');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/upload-pdf', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      setMessage(JSON.stringify(data.transactions, null, 2));
    } catch (error) {
      console.error(error);
      setMessage('Upload failed.');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /> <br />
      <button onClick={handleUpload}>Upload</button>
      <pre>{message}</pre>
    </div>
  );
};

export default PdfUploader;