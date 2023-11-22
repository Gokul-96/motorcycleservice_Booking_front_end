import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AuthService } from '../AuthService';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to login...');
      const userData = await AuthService.login(email, password);
      console.log('userData:', userData);

      if (userData) {
        console.log('Login successful. User data:', userData);
        login(userData);
        navigate('/');
      } else {
        alert('Incorrect email or password, If you still not sign up then sign up now');
      }
    } catch (error) {
      alert('Error during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login container">
      <h2>Login</h2>
      <form onSubmit={submit}>
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