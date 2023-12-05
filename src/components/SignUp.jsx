import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
   
    try {
      await auth.signup({ username, email, password });
      // If signup is successful, navigate to the sign-in page
      navigate('/signin');
    } catch (error) {
      setError('Signup failed. Please try again.'); // Update the error state if signup fails
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
          Sign Up
        </button>
      </form>

      <br />
      <p>Already Registered?</p>
      <br />
      <Link to="/signin" className="btn btn-secondary">
        Sign In 
      </Link>
    </div>
  );
}

export default SignUp;