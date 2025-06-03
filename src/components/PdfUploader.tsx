import React, { useState } from 'react';

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-804472887420.europe-central2.run.app/upload-pdf', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message || 'PDF uploaded and processed successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload PDF</h2>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
        <button
          onClick={handleUpload}
          className="btn w-full"
        >
          Upload
        </button>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default PdfUploader;
