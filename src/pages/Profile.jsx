import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

function ProfileComponent() {
  const [user, setUser] = useState(null);
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${loggedInUser._id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (loggedInUser) {
      fetchUserData();
    }
  }, [loggedInUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

export default ProfileComponent;