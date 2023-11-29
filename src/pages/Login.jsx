import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AuthService } from '../AuthService';
import '../styles.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
  
    // Validation checks
    if (!email || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }
  
    try {
      console.log('Attempting to login...');
      const userData = await AuthService.login(email, password);
      console.log('userData:', userData);
  
      if (userData === 'exist') {
        console.log('Login successful. User data:', userData);
        login(userData); 
        navigate('/');
      } else {
        setValidationError('Incorrect email or password. If you haven\'t signed up, please sign up now.');
      }
    } catch (error) {
      setValidationError('Error during login. Please try again.');
      console.error('Login error:', error);
    }
  };
  return (
    <div className="login container">
      <h2>Login</h2>
      {validationError && <div className="alert alert-danger">{validationError}</div>}
      <form onSubmit={submit}>
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
          Login
        </button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup" className="btn btn-secondary">
        Signup Page
      </Link>
    </div>
  );
}

export default Login;