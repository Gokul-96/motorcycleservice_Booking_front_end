import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function SignUp() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      await auth.signup({ username, email, password });
      
      setSuccessMessage('Sign up successful. Please proceed to sign in.');
      setTimeout(() => {
        navigate('/signin');
      }, 3000); 
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div>
      {auth.isAuthenticated() ? (
        <p>Welcome, {auth.userProfile.user.username}!</p>
      ) : (
        <div>
          {error && <div>{error}</div>}
          {successMessage && <div>{successMessage}</div>}
          <form onSubmit={handleSignUp}>
            <div className="mb-3">
              <input
                type="text"
                required
                className="form-control input-small"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                required
                className="form-control input-small"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                required
                className="form-control input-small"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
      <Link to="/signin">Sign In</Link>
    </div>
  );
}

export default SignUp;