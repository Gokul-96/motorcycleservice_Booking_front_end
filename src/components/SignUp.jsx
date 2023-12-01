import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Email validation criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if password meets criteria
    if (!password.match(passwordRegex)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.');
      return;
    }

    // Check if email is valid
    if (!email.match(emailRegex)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await auth.signup({ username, email, password });
       console.log('response', response)
      // Check if the signup was successful
      if (response && response.data && response.data.message === 'User created successfully') {
        // Navigate to the sign-in page
        navigate('/signin');
      } else {
        setError('User already exists. Please sign in.');
      }
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="login container">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control input-small"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          Sign up
        </button>
      </form>

      <br />
      <p>OR</p>
      <br />
      <Link to="/signin" className="btn btn-secondary">
        Sign In 
      </Link>
    </div>
  );
}

export default Signup;