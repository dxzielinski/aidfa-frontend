import React, { useState } from 'react';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For success or error messages
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading state

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleRegister = async () => {
    if (!backendUrl) {
      setMessage("Error: Backend URL is not configured in the frontend.");
      console.error("REACT_APP_BACKEND_URL is not set");
      return;
    }

    setIsLoading(true); // Optional: Set loading state
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });

      const data = await response.json(); // Try to parse JSON regardless of response.ok

      if (!response.ok) {
        // Backend returned an error (e.g., 400, 401, 500)
        // FastAPI often returns error details in data.detail
        setMessage(data.detail || `Error: ${response.status} - ${response.statusText}`);
        console.error("Registration failed with status:", response.status, "Response data:", data);
      } else {
        // Successful registration
        setMessage(data.message || 'Registered successfully!');
        // Optionally clear form fields or redirect
        // setFullName('');
        // setEmail('');
        // setPassword('');
      }
    } catch (error: any) {
      // Network error or issue with the fetch itself, or if response.json() fails
      console.error("An unexpected error occurred:", error);
      setMessage('Registration failed due to a network or unexpected error. Please try again.');
    } finally {
      setIsLoading(false); // Optional: Clear loading state
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Full Name"
        value={fullName} // Controlled component
        onChange={(e) => setFullName(e.target.value)}
        disabled={isLoading} // Optional
      /> <br />
      <input
        placeholder="Email"
        type="email" // Good practice for email fields
        value={email} // Controlled component
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading} // Optional
      /> <br />
      <input
        type="password"
        placeholder="Password"
        value={password} // Controlled component
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading} // Optional
      /> <br />
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {message && <p>{message}</p>} {/* Only show message if it exists */}
    </div>
  );
};

export default Register;