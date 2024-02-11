import React from 'react';
import { useAuth } from '../AuthContext';
import '../styles.css';

function Profile() {
  const auth = useAuth();

  return (
    <div className="profile">
      <p>Welcome, <span className="username">{auth.userProfile.user.username}</span>!</p>
    </div>
  );
}

export default Profile;