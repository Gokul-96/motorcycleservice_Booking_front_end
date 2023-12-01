import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`/services/${id}`)
      .then(response => {
        setService(response.data);
      })
      .catch(error => {
        console.error(`Error fetching service details for ID ${id}:`, error);
      });
  }, [id]);

  return (
    <div className="service-details container">
      {service ? (
        <>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <p>Price: {service.price}</p>
        </>
      ) : (
        <p>Loading service details...</p>
      )}
    </div>
  );
};

export default ServiceDetails;