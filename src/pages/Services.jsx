import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const handleServiceSelection = (service) => {
    if (selectedServices.some((selected) => selected._id === service._id)) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((selected) => selected._id !== service._id)
      );
    } else {
      setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
    }
  };

  const handleAddServicesClick = () => {
    const currentSelectedServices = location.state?.selectedServices || [];
    const updatedServices = [...currentSelectedServices, ...selectedServices];
    navigate('/bookings', {
      state: {
        services: updatedServices,
      },
    });
  };

  const handleBookingClick = () => {
    if (selectedServices.length > 0) {
      navigate('/bookings', { state: { services: selectedServices } });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filterServices = () => {
    if (selectedCategory) {
      return services.filter((service) => service.category === selectedCategory);
    }
    return services;
  };

  const sortServices = (servicesToSort) => {
    return servicesToSort.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  };

  return (
    <div className="container mt-5">
      <h2>Our Services</h2>
      <div className="mb-3">
        <label className="me-2">Select Category:</label>
        <select
          className="form-select form-select-sm me-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {[...new Set(services.map((service) => service.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label className="me-2">Sort By:</label>
        <select
          className="form-select form-select-sm me-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <label className="me-2">Sort Order:</label>
        <select
          className="form-select form-select-sm me-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {sortServices(filterServices()).map((service) => (
          <div key={service.id} className="col">
            <div
              className={`card ${
                selectedServices.includes(service) ? 'border-primary' : ''
              }`}
            >
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">Description: {service.description}</p>
                <p className="card-text">Price: {service.price}</p>
                <p className="card-text">Category: {service.category}</p>
                <button
                  className={`btn btn-secondary ${
                    selectedServices.includes(service) ? 'btn-selected' : ''
                  }`}
                  onClick={() => handleServiceSelection(service)}
                >
                  {selectedServices.includes(service) ? 'Unselect' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-4">
          <h3>Selected Service{selectedServices.length > 1 ? 's' : ''}</h3>
          {selectedServices.map((selectedService) => (
            <div key={selectedService.id}>
              <p>Title: {selectedService.title}</p>
              <p>Description: {selectedService.description}</p>
              <p>Price: {selectedService.price}</p>
            </div>
          ))}
          <button className="btn btn-primary mt-3 me-2" onClick={handleAddServicesClick}>
            Add to Bookings
          </button>
          <button className="btn btn-primary mt-3" onClick={handleBookingClick}>
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;