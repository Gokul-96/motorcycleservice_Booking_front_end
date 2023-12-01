import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams();

  const fetchConfirmationData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/confirmation/${bookingId}`);
      setConfirmationData(response.data);
      console.log('Confirmation Data:', response.data);
    } catch (error) {
      console.error('Error fetching confirmation data:', error);
    }
  };

  useEffect(() => {
    fetchConfirmationData();
  }, [bookingId]);

  return (
    <div className="confirmation text-center">
      <h2>Booking Confirmed</h2>
      {confirmationData ? (
        <div>
          <p>Booking ID: {confirmationData.bookingId}</p>
        
          <p>Name: {confirmationData.name}</p>
          <p>Email: {confirmationData.email}</p>
          <p>Phone Number: {confirmationData.phoneNumber}</p>
          <p>District: {confirmationData.district}</p>
          <p>Date: {confirmationData.date}</p>
        </div>
      ) : (
        <p className="alert alert-info">Loading confirmation...</p>
      )}
    </div>
  );
};

export default Confirmation;