import React, { useState } from 'react';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch("https://aidfa-backend-804472887420.europe-central2.run.app/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });

      const data = await response.json();
      setMessage(data.message || 'Registered successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-4">
      <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>
      <input
        placeholder="Full Name"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
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
        onClick={handleRegister}
        className="btn w-full"
      >
        Register
      </button>
      <p className="text-center text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Register;
