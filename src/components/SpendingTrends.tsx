import React, { useEffect, useState } from 'react';

const SpendingTrends: React.FC = () => {
  const [trends, setTrends] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrends = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view spending trends.');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/spending-trends`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('Trends:', data);

        if (!response.ok) {
          throw new Error(data.detail || 'Failed to fetch trends.');
        }

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format.');
        }

        setTrends(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch trends.');
      }
    };

    fetchTrends();
  }, []);

  return (
    <div>
      <h2>Spending Trends</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && trends.length === 0 && <p>Loading trends...</p>}
      {trends.length > 0 && (
        <ul>
          {trends.map((trend, index) => (
            <li key={index}>
              {trend.year}-{trend.month}: {trend.category} → ${Math.abs(trend.total_spent).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpendingTrends;
