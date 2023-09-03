import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Confirmation = () => {
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    // Fetch booking confirmation details from the backend
    axios.get('http://localhost:3008/confirmation') // Replace with your API endpoint
      .then(response => {
        setConfirmationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching confirmation:', error);
      });
  }, []);

  return (
    <div className="confirmation">
      <h2>Booking Confirmation</h2>
      {confirmationData ? (
        <div>
          <p>Booking ID: {confirmationData.bookingId}</p>
          <p>Service: {confirmationData.serviceTitle}</p>
          <p>Name: {confirmationData.name}</p>
          <p>Email: {confirmationData.email}</p>
          <p>Phone Number: {confirmationData.phoneNumber}</p>
          <p>District: {confirmationData.district}</p>
          <p>Date: {confirmationData.date}</p>
        </div>
      ) : (
        <p>Loading confirmation...</p>
      )}
    </div>
  );
};

export default Confirmation;