// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const Booking = () => {
//   const location = useLocation();
//   const [confirmedBookingId, setConfirmedBookingId] = useState();
//   const navigate = useNavigate();
//   const { isAuthenticated, token } = useAuth();
//   console.log('Token:', token);
  
//   let selectedService;

//   if (location.state && location.state.services) {
//     selectedService = location.state.services;
//   } else {
//     selectedService = [];
//   }

//   const [bookingData, setBookingData] = useState({
//     service: selectedService.map((service) => service.id),
//     name: '',
//     email: '',
//     phoneNumber: '',
//     district: '',
//     date: '',
//   });

//   const initialSelectedServices = location.state?.services || [];
//   const [selectedServices, setSelectedServices] = useState(initialSelectedServices);

//   const handleDeleteService = (service) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete the service: ${service.title}?`);

//     if (isConfirmed) {
//       setSelectedServices((prevSelectedServices) =>
//         prevSelectedServices.filter((selected) => selected._id !== service._id)
//       );
//     }
//   };

//   const handleAddServiceClick = () => {
//     navigate('/services', { state: { selectedServices: selectedServices } });
//   };

//   useEffect(() => {
//     if (location.state?.newServices) {
//       setSelectedServices((prevSelectedServices) => [
//         ...prevSelectedServices,
//         ...location.state.newServices,
//       ]);
//     }
//   }, [location.state]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setBookingData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleBookingSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       if (selectedServices.length === 0) {
//         console.error('No services selected.');
//         return;
//       }
  
//       if (!isAuthenticated()) {
//         navigate('/signin');
//         return;
//       }

//       const selectedServiceIds = selectedServices.map((service) => service.id.toString());
//       const requestData = {
//         service: selectedServiceIds,
//         ...bookingData,
//       };

//       const response = await axios.post(
//         'http://localhost:5000/bookings',
//         requestData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         const { bookingId } = response.data;
//         setConfirmedBookingId(bookingId);
//         navigate(`/confirmation/${bookingId}`);
//       } else {
//         console.error('BookingId is undefined');
//       }
//     } catch (error) {
//       console.error('Error confirming booking:', error);
//     }
//   };

//   return (
//     <div className="booking container">
//       <h2>Confirm Booking</h2>
//       <form onSubmit={handleBookingSubmit}>
//         {selectedServices.length > 0 ? (
//           <div>
//             <h5>Selected Services</h5>
//             {selectedServices.map((service) => (
//               <div key={service._id}>
//                 <div>
//                   <p>Service: {service.title}</p>
//                   <button className="btn btn-danger" onClick={() => handleDeleteService(service)}>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No services selected</p>
//         )}

//         <button className="btn btn-primary" onClick={handleAddServiceClick}>
//           Choose New Services
//         </button>

//         <div className="input-fields">
//           <input
//             type="text" required
//             name="name"
//             placeholder="Name"
//             value={bookingData.name}
//             onChange={handleInputChange}
//             autoComplete="off" 
//             className="form-control input-small"
//           />
//           <input
//             type="email" required
//             name="email"
//             placeholder="Email"
//             value={bookingData.email}
//             onChange={handleInputChange}
//             autoComplete="off" 
//             className="form-control input-small"
//           />
//           <input
//             type="tel" required
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={bookingData.phoneNumber}
//             onChange={handleInputChange}
//             className="form-control input-small"
//           />
//           <input
//             type="text" required
//             name="district"
//             placeholder="District"
//             value={bookingData.district}
//             onChange={handleInputChange}
//             className="form-control input-small"
//           />
//           <input
//             type="date" required
//             name="date"
//             value={bookingData.date}
//             onChange={handleInputChange}
//             className="form-control input-small"
//           />

//           <button type="submit" className="btn btn-primary">
//             Confirm Booking
//           </button>

//           {confirmedBookingId !== undefined && (
//             <p>Your Booking ID: {confirmedBookingId}</p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Booking;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Booking = () => {
  const location = useLocation();
  const [confirmedBookingId, setConfirmedBookingId] = useState();
  const navigate = useNavigate();
  const { isAuthenticated, token, userProfile } = useAuth(); // Access userProfile from useAuth
  console.log('Token:', token);
  
  let selectedService;

  if (location.state && location.state.services) {
    selectedService = location.state.services;
  } else {
    selectedService = [];
  }

  const [bookingData, setBookingData] = useState({
    service: selectedService.map((service) => service.id),
    name: userProfile.user.username, // Populate with user's username
    email: userProfile.user.email, // Populate with user's email
    phoneNumber: '',
    district: '',
    date: '',
  });

  const initialSelectedServices = location.state?.services || [];
  const [selectedServices, setSelectedServices] = useState(initialSelectedServices);

  const handleDeleteService = (service) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the service: ${service.title}?`);

    if (isConfirmed) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((selected) => selected._id !== service._id)
      );
    }
  };

  const handleAddServiceClick = () => {
    navigate('/services', { state: { selectedServices: selectedServices } });
  };

  useEffect(() => {
    if (location.state?.newServices) {
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        ...location.state.newServices,
      ]);
    }
  }, [location.state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (selectedServices.length === 0) {
        console.error('No services selected.');
        return;
      }
  
      if (!isAuthenticated()) {
        navigate('/signin');
        return;
      }

      const selectedServiceIds = selectedServices.map((service) => service.id.toString());
      const requestData = {
        service: selectedServiceIds,
        ...bookingData,
      };

      const response = await axios.post(
        'http://localhost:5000/bookings',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const { bookingId } = response.data;
        setConfirmedBookingId(bookingId);
        navigate(`/confirmation/${bookingId}`);
      } else {
        console.error('BookingId is undefined');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  return (
    <div className="booking container">
      <h2>Confirm Booking</h2>
      <form onSubmit={handleBookingSubmit}>
        {selectedServices.length > 0 ? (
          <div>
            <h5>Selected Services</h5>
            {selectedServices.map((service) => (
              <div key={service._id}>
                <div>
                  <p>Service: {service.title}</p>
                  <button className="btn btn-danger" onClick={() => handleDeleteService(service)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No services selected</p>
        )}

        <button className="btn btn-primary" onClick={handleAddServiceClick}>
          Choose New Services
        </button>

        <div className="input-fields">
          <input
            type="text" required
            name="name"
            placeholder="Name"
            value={bookingData.name}
            onChange={handleInputChange}
            autoComplete="off" 
            className="form-control input-small"
          />
          <input
            type="email" required
            name="email"
            placeholder="Email"
            value={bookingData.email}
            onChange={handleInputChange}
            autoComplete="off" 
            className="form-control input-small"
          />
          <input
            type="tel" required
            name="phoneNumber"
            placeholder="Phone Number"
            value={bookingData.phoneNumber}
            onChange={handleInputChange}
            className="form-control input-small"
          />
          <input
            type="text" required
            name="district"
            placeholder="District"
            value={bookingData.district}
            onChange={handleInputChange}
            className="form-control input-small"
          />
          <input
            type="date" required
            name="date"
            value={bookingData.date}
            onChange={handleInputChange}
            className="form-control input-small"
          />

          <button type="submit" className="btn btn-primary">
            Confirm Booking
          </button>

          {confirmedBookingId !== undefined && (
            <p>Your Booking ID: {confirmedBookingId}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Booking;