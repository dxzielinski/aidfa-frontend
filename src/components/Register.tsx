import React, { useState } from 'react';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
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
    <div>
      <h2>Register</h2>
      <input placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} /> <br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
