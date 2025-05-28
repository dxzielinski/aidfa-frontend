import React, { useEffect, useState } from 'react';

const Forecast: React.FC = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPredictions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predictions/spending`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.detail || 'Failed to load forecast.');
        setPredictions(json.predictions || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load forecast.');
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div>
      <h2>Spending Forecast</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {predictions.map((entry, idx) => (
          <li key={idx}>
            {entry.month}: ${entry.expected_spending.toFixed(2)} (Range: ${entry.range.lower.toFixed(2)}–${entry.range.upper.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
