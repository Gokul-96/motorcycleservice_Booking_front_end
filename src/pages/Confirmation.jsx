import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Confirmation = () => {
  const { userProfile } = useAuth();
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchConfirmationData = async () => {
      try {
          // Check if userProfile is not null before accessing its properties
          if (userProfile && userProfile.token) {
            console.log('User Profile:', userProfile); // Log the user profile
            console.log('Token:', userProfile.token); // Log the token
            console.log('Booking ID:', bookingId); // Log the booking ID
        const response = await axios.get(
          `http://localhost:5000/confirmation/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${userProfile.token}`,
            },
          }
        );
        setConfirmationData(response.data);
        console.log('Confirmation Data:', response.data);
      } else {
        console.error('User profile.');
      }
      } catch (error) {
        console.error('Error fetching confirmation data:', error);
      }
    };

    fetchConfirmationData();
  }, [bookingId, userProfile]);

  return (
    <div className="confirmation text-center">
    
      <h2 >Booking Confirmed</h2>
      
    
      {confirmationData && userProfile && !!userProfile && (
        <div>
          <p>Booking ID: {confirmationData.bookingId}</p>
          <p>Name: {confirmationData.name}</p>
          <p>Email: {confirmationData.email}</p>
          <p>Phone Number: {confirmationData.phoneNumber}</p>
          <p>District: {confirmationData.district}</p>
          <p>Date: {confirmationData.date}</p>
          <p>Sign-in Username: {userProfile.user.username}</p>
        </div>
      )}
      {/* {(!userProfile || !userProfile.user) && (
        <p>Please log in to view confirmation details.</p>
      )} */}
    </div>
  );
};

export default Confirmation;