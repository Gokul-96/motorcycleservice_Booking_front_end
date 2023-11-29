import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../AuthService';
import '../styles.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setValidationError('All fields are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setValidationError('Password must be at least 8 characters long and include uppercase, lowercase, and a number.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      const isSignupSuccessful = await AuthService.signup(username, email, password);

      if (isSignupSuccessful) {
        navigate('/login');
      } else {
        setValidationError('User already exists.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  return (
    <div className="login container">
      <h2>Signup</h2>
      {validationError && <div className="alert alert-danger">{validationError}</div>}
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
        <div className="mb-3">
          <input
            type="password"
            className="form-control input-small"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login" className="btn btn-secondary">
        Login Page
      </Link>
    </div>
  );
}

export default Signup;