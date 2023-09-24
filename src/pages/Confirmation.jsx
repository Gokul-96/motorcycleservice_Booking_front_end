import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams(); // Use useParams to get the bookingId from the URL

  useEffect(() => {
    const apiUrl = `http://localhost:5000/confirmation/${bookingId}`;
    console.log('API URL:', apiUrl);
  
    // Fetch booking confirmation details from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setConfirmationData(response.data);
      } catch (error) {
        console.error('Error fetching confirmation:', error);
      }
    };
  
    fetchData(); // Call fetchData fn
  
  }, [bookingId]);
  return (
    <div className="confirmation">
      <h2>Booking Confirmed</h2>
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