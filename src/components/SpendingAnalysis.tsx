import React, { useEffect, useState } from 'react';

const SpendingAnalysis: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const response = await fetch("https://aidfa-backend-804472887420.europe-central2.run.app/analysis/spending-trends", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.detail || 'Failed to load data.');
        setData(json.spending_trends || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load data.');
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div>
      <h2>Spending Trends (Stored Analysis)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {data.map((trend, idx) => (
          <li key={idx}>
            {trend.month_id}: {trend.category} → ${Math.abs(trend.total_spent).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpendingAnalysis;
