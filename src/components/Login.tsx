import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backend-804472887420.europe-central2.run.app/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      setMessage(data.message || 'Login successful!');
    } catch (error) {
      console.error(error);
      setMessage('Login failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-4">
      <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="btn w-full"
      >
        Login
      </button>
      <p className="text-center text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Login;
