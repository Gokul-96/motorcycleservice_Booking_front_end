import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function SignIn() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log("Button clicked")
    try {
      const signInData = { email, password };

      const user = await auth.signin(signInData);

      // Set the user profile using the actual user data
      auth.signin(user);

      // Check if there's a redirect state indicating a redirect to the confirmation page
      const redirectToConfirmation = location.state?.redirectToConfirmation;

      if (redirectToConfirmation) {
        // If there's a redirect state, navigate to the confirmation page
        navigate('/confirmation'); // Update the path as needed
      } else {
        // Otherwise, navigate to the home page
        navigate('/'); // Update the path as needed
      }
    } catch (error) {
      // Handle authentication failure, e.g., display an error message
      console.error('Authentication failed:', error.message);
    }
  };

  return (
    <div>
      {auth.isAuthenticated() ? (
        <p>Welcome, {auth.userProfile.user.username}!</p>
      ) : (
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <input
              type="email"
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
              className="form-control input-small"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off" 
            />
          </div>

          <button type="submit">Sign In</button>
        </form>
      )}
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default SignIn;