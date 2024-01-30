import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../useAuth'; 

import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use the useAuth hook to get the signIn function and userProfile
  const { signIn, userProfile } = useAuth();
  
  // Assuming that 'bookingId' is part of your Redux state
  const bookingId = useSelector((state) => state.booking.bookingId);

  useEffect(() => {
    console.log('After Dispatching SIGNIN_SUCCESS:', userProfile?.user);
  }, [userProfile]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Use optional chaining to handle cases where userProfile is undefined
    const user = await signIn({ email, password });
    if (user) {
      dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: user,
      });
       // Wait for the userProfile to be updated
    await new Promise(resolve => setTimeout(resolve, 0));
      console.log('After dispatching SIGNIN_SUCCESS:', user.user);
      // Replace 'yourBookingId' with the actual booking ID
      navigate(`/confirmation/${bookingId}`);
    }
  };

  return (
    <div className="login container">
      <h3>{'Signin'}</h3>

      <form onSubmit={handleSignIn}>
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
          {'Sign In'}
        </button>
      </form>
      <div className="note">User Credentials</div>
      <div className="notes">
        <>
          <b>Email:</b> gokul@gmail.com
        </>
        <br></br>
        <>
          <b>Password:</b> gokul
        </>
      </div>
      

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