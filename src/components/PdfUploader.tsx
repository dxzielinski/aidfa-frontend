import React, { useState } from 'react';

const PdfUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload-pdf`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      console.log('Upload response:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed.');
      }

      setMessage('PDF uploaded and processed successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Upload failed.');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} /> <br />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default PdfUploader;
