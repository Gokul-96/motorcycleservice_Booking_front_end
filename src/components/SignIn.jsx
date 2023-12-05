import React, { useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.user);


  useEffect(() => {
    console.log('From store:', userProfile.user);
  }, [userProfile.user]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const user = await auth.signin({ email, password });
    if (user) {
      dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: user,
      });
  
      
  
      navigate('/');
    }
  };

  console.log('From store:', userProfile.user);

  const handleLogout = () => {
    // Dispatch action to clear user state
    dispatch({ type: 'SIGNOUT' });
    // Other logout actions like clearing session storage can be added here
  };

  return (
    <div className="login container">
    <h3>{userProfile.user ? 'Logout' : 'Signin'}</h3>

    <form onSubmit={userProfile.user ? handleLogout : handleSignIn}>
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
          {userProfile.user ? 'Logout' : 'Sign In'}
        </button>
      </form>

      <br />
      <p>Don't have an account?</p>
      <br />
      <Link to="/signup" className="btn btn-secondary">
        Sign Up
      </Link>
    </div>
  );
}

export default SignIn;