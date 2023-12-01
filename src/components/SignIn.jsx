


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';


function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
  
    try {
      const response = await auth.signin({ email, password });
      console.log('Signin successful', response);
  
      // Check if the signin was successful
      if (response && response.data && response.data.token) {
        // Handle successful signin (e.g., save token to localStorage)
        navigate('/'); // Redirect to home or another page
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('signin failed', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login container">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSignIn}>
      <div className="mb-3">
          <input
            type="email"
            className="form-control input-small"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control input-small"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>

      <br />
      <p>Already have an account?</p>
      <br />
      <Link to="/signup" className="btn btn-secondary">
        Sign Up
      </Link>
    </div>
  );
}

export default Signin;