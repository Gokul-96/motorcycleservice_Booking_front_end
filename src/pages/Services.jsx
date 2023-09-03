


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // Initialize selected services as an empty array

  const navigate = useNavigate();

  const handleServiceSelection = (service) => {        // for toggle
    if (selectedServices.includes(service)) {
      setSelectedServices(prevSelectedServices =>
        prevSelectedServices.filter(selected => selected !== service)
      );
    } else {
      setSelectedServices(prevSelectedServices => [...prevSelectedServices, service]);
    }
  };

  const handleBookingClick = () => {
    if (selectedServices.length > 0) {
      navigate('/booking', { state: { services: selectedServices } });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3008/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  return (
    
          <div className="services">
            <h2>Our Services</h2>
            <div className="service-container">
            {services.map((service) => (
  <div
    className={`service-card ${selectedServices.includes(service) ? 'selected' : ''}`}
    key={parseInt(service.id)}
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
    <h3>Selected Service{selectedServices.length > 1 ? 's' : ''}</h3>
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



