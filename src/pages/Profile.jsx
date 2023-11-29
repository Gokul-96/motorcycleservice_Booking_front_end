import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

function ProfileComponent() {
  const [user, setUser] = useState(null);
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    console.log('Inside useEffect');
    const fetchUserData = async () => {
      try {
        if (loggedInUser && loggedInUser._id) {
          const response = await fetch(`https://motor-cycle-servicebooking-back-end.onrender.com/user/${loggedInUser._id}`);
          console.log('Response status:', response.status);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the case where user data cannot be fetched
        setUser({ username: 'Unknown', email: 'Unknown' });
      }
    };

    if (loggedInUser && loggedInUser._id) {
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