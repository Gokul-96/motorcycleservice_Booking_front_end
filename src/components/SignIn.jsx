import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Profile from './Profile'; 
function SignIn() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const signInData = { email, password };
      const user = await auth.signin(signInData);

      setSuccessMessage('Sign in successful.');
      setTimeout(() => {
        const redirectToConfirmation = location.state?.redirectToConfirmation;
        if (redirectToConfirmation) {
          navigate('/confirmation'); // Update the path as needed
        } else {
          navigate('/'); 
        }
      }, 3000);
    } catch (error) {
      setErrorMessage('Please enter correct email and password.');
      console.error('Authentication failed:', error.message);
    }
  };

  return (
    <div>
      {auth.isAuthenticated() ? (
        <Profile /> 
      ) : (
        <div>
          {errorMessage && <div>{errorMessage}</div>}
          {successMessage && <div>{successMessage}</div>}
          <form onSubmit={handleSignIn}>
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
                autoComplete="off"
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
      <>
      <p>
        Email: gok@gmail.com
        Password:gok@123
      </p>
      </>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default SignIn;