import logo from "../../assets/tmu_logo.svg";
import "./Login.css";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
    } else {
      setError('');
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          console.log('Login successful');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('An error occurred, please try again later');
      }
    }
  }

  return (
    <>
      <div className="login-component main-wrap">
        <main className="login">
          <div className="img-wrap">
            <img src={logo} alt="TMU Logo" width={100} height={100} />
          </div>
          <h1 className="sitename">UniFynd</h1>
          <form onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="login-btn">Login</button>
            <a href="/signup" className="register-btn">
              Register
            </a>
            <a href="/home" className="register-btn">
              Home (temp)
            </a>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;