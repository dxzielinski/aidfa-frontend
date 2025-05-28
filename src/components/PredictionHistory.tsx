import React, { useEffect, useState } from 'react';

const PredictionHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predictions/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.detail || 'Failed to load history.');
        setHistory(json.history || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load history.');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Prediction History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {history.map((entry, idx) => (
        <div key={idx}>
          <strong>{new Date(entry.created_at).toLocaleString()}</strong>
          <ul>
            {entry.predictions.map((pred: any, i: number) => (
              <li key={i}>
                {pred.month}: ${pred.expected_spending.toFixed(2)} (Range: ${pred.range.lower.toFixed(2)}–${pred.range.upper.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PredictionHistory;
