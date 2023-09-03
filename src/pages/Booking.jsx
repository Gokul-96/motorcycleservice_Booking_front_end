import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
  const location = useLocation(); // it returns an object that contains information about the current URL location
  //Access location data in component

  let selectedService;
//location.state - holt the state
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

 
const navigate = useNavigate(); //useNavigate hook used to navigate between routes 

const [selectedServices, setSelectedServices] = useState(selectedService);  //After return set new value in setselectedservice

  const handleDeleteService = (serviceToDelete) => {
    console.log('Before deletion:', selectedServices);

    
  
    const confirmDelete = window.confirm(`Want to delete Now "${serviceToDelete.title}"?`);
    if (confirmDelete) {
      setSelectedServices((prevServices) => {

        //filter method to create new array that is updatedServices. This new array includes all services from the previous state (prevServices) except for the one that matches the serviceToDelete.
        const updatedServices = prevServices.filter((service) => service.id !== serviceToDelete.id); // it means if condition true thn service and serviceToDelete have different id values
        //in other word it use for exclude the service that i wants to delete.
        console.log('Updated Services:', updatedServices); 
        return updatedServices;
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


  const handleBookingSubmit = () => {
    if (selectedService.length === 0) {
      console.error('No services selected.');
      return;// Exit early if no service is selected
    }

    // Extract service IDs from selected services
    const selectedServiceIds = selectedServices.map((service) => service.id.toString());
    // Add the selectedServiceIds to the requestData
    const requestData = {
      service: selectedServiceIds,
      ...bookingData,
    };

    // Send bookingData to the backend
    //make HTTP POST requests to a specified URL
    axios.post('http://localhost:3008/bookings', requestData) //bookingdata -  data being sent in the POST request body & object contain various fields
      .then((response) => {
        // Handle success here
        console.log('Booking confirmed:', response.data);
        navigate('/confirmation'); // Navigate to confirmation page
      })
      .catch((error) => {
        // Handle error
        console.error('Error confirming booking:', error);
      });
  };

  // State variable to track the edited service
  const [editedService, setEditedService] = useState(null);


  // Function to update the selectedServices array with edited service
  const updateSelectedService = (updatedService) => {
    const updatedServices = selectedService.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    setSelectedServices(updatedServices);
    setEditedService(null); // Clear the edited service state
  };



  return (
    <div className="booking">
      <h2>Confirm Booking</h2>
      {selectedService.length > 0 ? (
        <div>
          <h5>Selected Services</h5>
          {selectedService.map((service) => (
            <div key={service.id}>
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
      <input type="text" name="name" placeholder="Name" value={bookingData.name} onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" value={bookingData.email} onChange={handleInputChange} />
      <input type="tel" name="phoneNumber" placeholder="Phone Number" value={bookingData.phoneNumber} onChange={handleInputChange} />
      <input type="text" name="district" placeholder="District" value={bookingData.district} onChange={handleInputChange} />
      <input type="date" name="date" value={bookingData.date} onChange={handleInputChange} />
      <button className="btn-primary" onClick={handleBookingSubmit}>
        Confirm Booking
      </button>
    </div>
  )
};

export default Booking;






