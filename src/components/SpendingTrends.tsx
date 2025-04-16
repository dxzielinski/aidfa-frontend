import React, { useState } from 'react';

const SpendingTrends: React.FC = () => {
  const [trends, setTrends] = useState<any[]>([]);

  const fetchTrends = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/spending-trends', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setTrends(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch trends');
    }
  };

  return (
    <div>
      <h2>Spending Trends</h2>
      <button onClick={fetchTrends}>Load Trends</button>
      <ul>
      {Array.isArray(trends) &&
        trends.map((trend, idx) => (
          <li key={idx}>{JSON.stringify(trend)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpendingTrends;
