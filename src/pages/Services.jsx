


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // Initialize selected services as an empty array

  const navigate = useNavigate();

  //toggle
  const handleServiceSelection = (service) => {
    //check selected service id equal to existing service id if it match it already selected so now we want deselect service button
    //some() -  checks if only some elements pass a criteria.Even one element match it return true.
    if (selectedServices.some((selected) => selected._id === service._id)) {
      // Deselect the service
      setSelectedServices((prevSelectedServices) =>
      //create a new array from a given array
        prevSelectedServices.filter((selected) => selected._id !== service._id)
      );
    } else {
      //updates the selectedServices state by creating a new array that includes all the previously selected services and appends the new service to it
      setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
    }
  };

  const handleAddServicesClick = () => {
    // Get the currently selected services
    const currentSelectedServices = location.state?.selectedServices || [];
  
    // Combine the current selected services with the newly selected services
    const updatedServices = [...currentSelectedServices, ...selectedServices];
  
    navigate('/bookings', {
      state: {
        services: updatedServices, // Pass the updated services
      },
    });
  };

  const handleBookingClick = () => {
    //checks if there are any selected services (selectedServices.length > 0)
    if (selectedServices.length > 0) {
      //using navigate fn it navigate to booking page with current state object and inside service property is there.
      navigate('/bookings', { state: { services: selectedServices } });
    }
  };


//fetch from service data from backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services')
      setServices(response.data); //store data
    }
    catch(error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
  
    fetchServices();
  }, []);

  return (
    
          <div className="service">
            <h2>Our Services</h2>
            <div className="service-container">
            {services.map((service) => (
  <div
    className={`service-card ${selectedServices.includes(service) ? 'selected' : ''}`}
    key={service.id}
    //selected - see styles.css for color changes to green if service select.
      //if condition true - it will add the string 'selected' to the className.
       //if condition false - it will add empty string '' to the className. 
  >
    <h3>{service.title}</h3>
    <p>Description: {service.description}</p>
    <p>Price: {service.price}</p>
    <p>Category: {service.category}</p>
    <button
      className={`btn-secondary ${selectedServices.includes(service) ? 'btn-selected' : ''}`}
    
      onClick={() => handleServiceSelection(service)}
    >
                  {/* selectedservices - currently selected service that user has chosen by clicking on it */}
                  {/* service being considered in the map loop as iterate through the list of services fetched from the API */}
                  {/* Ternary operator */}
                  {selectedServices.includes(service) ? 'Unselect' : 'Select'}
                  </button>
                   {/* <Link to={`/service/${service.id}`}>View Details</Link>   */}
                </div>
              ))}
            </div>
            {/* selectedService is truthy then inside paranthesis will render */}
             {/* display selected data's */}
         {/* Display selected services */}
{selectedServices.length > 0 && (
  <div className="selected-service">
  <h3>Selected Service{selectedServices.length > 1 ? 's' : ''}</h3>    {/*  this line for plural - selected services */}
    {selectedServices.map(selectedService => (
      <div key={selectedService.id}>
        <p>Title: {selectedService.title}</p>
        <p>Description: {selectedService.description}</p>
        <p>Price: {selectedService.price}</p>
      </div>
    ))}
    <button className="btn-book" onClick={handleBookingClick}>
      Book Now
    </button>
  </div>
)}
          </div>
        );
      };
  

export default Services;



