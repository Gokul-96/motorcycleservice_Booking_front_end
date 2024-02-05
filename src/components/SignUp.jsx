
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function SignUp() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    try {
      await auth.signup({ username, email, password });
      // If signup is successful navigate to the sign-in page
      navigate('/signin');
    } catch (error) {
      setError('error.message'); // Update the error state if signup fails
    }
  };
  return (
    <div>
      {auth.isAuthenticated() ? (
        <p>Welcome, {auth.userProfile.user.username}!</p>
      ) : (
        <div>
        {error && <div>{error}</div>} 
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
           <input
            type="text"
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