import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams(); // Use useParams to get the bookingId from the URL

  const fetchConfirmationData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/confirmation/${bookingId}`)
      console.log('Data confirmed:', response.data); 
      setConfirmationData(response.data);
        console.log('Data confirmed:', response.data);
    }
    catch(error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
  
    fetchConfirmationData();
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