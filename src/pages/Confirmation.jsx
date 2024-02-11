import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles.css';

const Confirmation = () => {
  const { userProfile } = useAuth();
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchConfirmationData = async () => {
      try {
        if (userProfile && userProfile.token) {
          const response = await axios.get(
            `https://motor-cycle-servicebooking-back-end.onrender.com/confirmation/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${userProfile.token}`,
              },
            }
          );
          setConfirmationData(response.data);
        } else {
          console.error('User profile not available.');
        }
      } catch (error) {
        console.error('Error fetching confirmation data:', error);
      }
    };

    fetchConfirmationData();
  }, [bookingId, userProfile]);

  return (
    <div className="confirmation text-center">
      <h2>Booking Confirmed</h2>
      {confirmationData && userProfile && !!userProfile && (
        <div className="details">
          <p>Booking ID: {confirmationData.bookingId}</p>
          <p>Name: {confirmationData.name}</p>
          <p>Email: {confirmationData.email}</p>
          <p>Phone Number: {confirmationData.phoneNumber}</p>
          <p>District: {confirmationData.district}</p>
          <p>Date: {confirmationData.date}</p>
        </div>
      )}
    </div>
  );
};

export default Confirmation;