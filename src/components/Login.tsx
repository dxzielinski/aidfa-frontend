import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok && data.idToken) {
        localStorage.setItem('token', data.idToken);
        setMessage('Login successful!');
      } else {
        setMessage(data.detail || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
