import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://motor-cycle-servicebooking-back-end.onrender.com/api/users/Profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profileData ? (
        <div>
          <h2>Welcome {profileData.username}!</h2>
          
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;