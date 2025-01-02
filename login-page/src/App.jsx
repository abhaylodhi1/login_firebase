import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './index.css';
import Dashboard from './Dashboard'; 
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUbbBsXpJxqCKcFpCl7aY6UBU8OlXmu3s",
  authDomain: "login-auth-73800.firebaseapp.com",
  projectId: "login-auth-73800",
  storageBucket: "login-auth-73800.firebasestorage.app",
  messagingSenderId: "657749383584",
  appId: "1:657749383584:web:b900477b59ee2706266cc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      setIsLoggedIn(true); // Set login status
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="app-container">
      <h1>HEALIX</h1>
      
      {/* If user is logged in, show Dashboard link */}
      {isLoggedIn ? (
        <div>
          <nav class="dashboard">
            <Link to="/dashboard">Explore medicines</Link>
          </nav>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
