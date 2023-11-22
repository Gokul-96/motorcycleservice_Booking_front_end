import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../AuthService';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const isSignupSuccessful = await AuthService.signup(username, email, password);

      if (isSignupSuccessful) {
        navigate('/login');
      } else {
        alert('User already exists');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="login container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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