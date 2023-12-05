import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    
    </div>
  );
};

export default Logout;