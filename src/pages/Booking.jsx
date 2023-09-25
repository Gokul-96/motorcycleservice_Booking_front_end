import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

const Booking = () => {
  const location = useLocation(); // it returns an object that contains information about the current URL location
  //Access location data in component

    // State variable to store the bookingId
    const [confirmedBookingId, setConfirmedBookingId] = useState();
console.log('render');
  const navigate = useNavigate(); //useNavigate hook used to navigate between routes 

  let selectedService;
//location.state - hold the state
  if (location.state && location.state.services) {
    selectedService = location.state.services; 
  } else {
    selectedService = [];
  }
  //both conditions are met, it assigns location.state.services to selectedService else it assign in empty array
  
  console.log('location.state:', location.state);


  const [bookingData, setBookingData] = useState({
    service: selectedService.map((service) => service.id),    //here services data store 
    name: '',
    email: '',
    phoneNumber: '',
    district: '',
    date: '',
  });

 
  const initialSelectedServices = location.state?.services || [];
  const [selectedServices, setSelectedServices] = useState(initialSelectedServices);
//After return set new value in setselectedservice

const handleAddServiceClick = () => {
  // Navigate to the Services page and pass the current selectedServices as state
  navigate('/services', { state: { selectedServices } });
};


useEffect(() => {
  if (location.state?.newServices) {
    setSelectedServices((prevSelectedServices) => [
      ...prevSelectedServices,
      ...location.state.newServices,
    ]);
  }
}, [location.state]);

  const handleDeleteService = (serviceToDelete) => {
    console.log('Before deletion:', selectedServices);

    
  
    const confirmDelete = window.confirm(`Want to delete Now "${serviceToDelete.title}"?`);
    if (confirmDelete) {
      setSelectedServices((prevServices) => {
        if (Array.isArray(prevServices)) {
         
        //filter method to create new array that is updatedServices. This new array includes all services from the previous state (prevServices) except for the one that matches the serviceToDelete.
        return prevServices.filter((selected) => selected.id !== serviceToDelete._id); // it means if condition true thn service and serviceToDelete have different id values
        //in other word it use for exclude the service that i wants to delete.
        //console.log('Updated Services:', updatedServices); 
        //return updatedServices;
         }
      return prevServices;
      });
    }
  
    console.log('After deletion:', selectedServices);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;    //  extracts the name and value properties from the event.target object
    setBookingData((prevData) => ({     //setBookingData - update booking data and takes prevData (previous data)
      ...prevData,   //spread operator- properties into new object
      [name]: value, // Assign new value in name
    }));
  };
  console.log('Booking Data:', bookingData);
  console.log('Selected Services:', selectedServices);

  const handleBookingSubmit =async (event) => {
    event.preventDefault();
    try{
    if (selectedService.length === 0) {
      console.error('No services selected.');
      return;// Exit early if no service is selected
    }

    // Extract service IDs from selected services
    const selectedServiceIds = selectedServices.map((service) => service.id.toString());
    // Add the selectedServiceIds to  requestData
    const requestData = {
      service: selectedServiceIds,
      ...bookingData,
    };

    // Send bookingData to the backend
    //make HTTP POST requests to a specified URL
    const response = await axios.post('http://localhost:5000/bookings', requestData)
     console.log('respon:', response);
      if (response.status === 201) {
        const { bookingId } = response.data;
         // Update the confirmedBookingId state with the received bookingId
         setConfirmedBookingId(bookingId);
        console.log('BookingId:', bookingId);
        console.log('Booking confirmed:', response.data);
        
        setTimeout(() => {
          navigate(`/confirmation/${bookingId}`);
        }, 10000); 
      } else {
        console.error('BookingId is undefined');
      }
    }catch(error){
      console.error('Error confirming booking:', error);
    }
};


 



  return (
    <div className="booking">
      <h2>Confirm Booking</h2>
      {selectedServices.length > 0 ? (
        <div>
          <h5>Selected Services</h5>
          {selectedServices.map((service) => (
            <div key={service._id}>
              <div>
                <p>Service: {service.title}</p>

                <button onClick={() => handleDeleteService(service)}>Delete</button>
              </div>
            </div>
          ))}
        
 </div>
      ) : (

        <p>No services selected</p>
      )}



      <button className="btn-primary" onClick={handleAddServiceClick}>
        Update Services
      </button>

      <div className="input-fields">
      <input type="text" name="name" placeholder="Name" value={bookingData.name} onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" value={bookingData.email} onChange={handleInputChange} />
      <input type="tel" name="phoneNumber" placeholder="Phone Number" value={bookingData.phoneNumber} onChange={handleInputChange} />
      <input type="text" name="district" placeholder="District" value={bookingData.district} onChange={handleInputChange} />
      <input type="date" name="date" value={bookingData.date} onChange={handleInputChange} />
      
      <button className="btn-primary" onClick={handleBookingSubmit}>
        Confirm Booking
      </button>

      {confirmedBookingId !== undefined && (
  <p>Your Booking ID: {confirmedBookingId}</p>
)}

    </div>
    </div>
  )
};

export default Booking;






