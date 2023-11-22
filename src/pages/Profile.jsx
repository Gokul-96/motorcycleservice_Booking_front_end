import React, { useState, useEffect } from 'react';

function ProfileComponent() {
  const [user, setUser] = useState(null);

  const apiCallToFetchUserData = async () => {
    try {
      // Assuming user ID available in your component state
      const userId = '6552ffe80258fc025d94079b'; 
      const response = await fetch(`http://localhost:5000/user/${userId}`);

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await apiCallToFetchUserData();
      setUser(userData);
    } catch (error) {
      // Handle error, e.g., show an error message or redirect to an error page
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
      {/* Add more information or components based on your requirements */}
    </div>
  );
}

export default ProfileComponent;