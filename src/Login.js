import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your authentication logic here, such as calling an API
    try {
      // Example: Assuming you have a function loginUser(email, password) for authentication
      await loginUser(email, password);
      // Redirect to the home page after successful login
      history.push('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Update error message based on actual error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// This function simulates user authentication. Replace it with your actual authentication logic.
async function loginUser(email, password) {
  // You would typically make an API call to your backend server here to authenticate the user
  // For demonstration purposes, let's simulate a delay to mimic an API call
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

  // Assuming successful authentication
  if (email === 'user@example.com' && password === 'password') {
    // Simulate storing user data in localStorage for maintaining login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  } else {
    // Simulate authentication failure by throwing an error
    throw new Error('Authentication failed');
  }
}


export default Login;
