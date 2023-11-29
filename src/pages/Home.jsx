import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import motorcycleImage1 from '../assets/photo1.jpeg';
import motorcycleImage2 from '../assets/photo2.jpeg';
import motorcycleImage3 from '../assets/photo3.jpeg';
import { useAuth } from '../AuthContext';
import '../styles.css';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, [isAuthenticated]); 

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://motor-cycle-servicebooking-back-end.onrender.com/services');
    
      const data = response.data;

      // Updatestate with the fetched services
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  
  useEffect(() => {
    if (isAuthenticated()) {
      
      const user = localStorage.getItem('user');
      if (user) {
        setAuthenticatedUser(JSON.parse(user));
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="home">
      <div className="text-center py-5">
        <h1 className="display-4 text-primary mb-4 fw-bold">
          Welcome to Suzu Motorcycle Services
        </h1>
        <p className="fst-italic text-capitalize fs-2 text-secondary">
          We will spend quality time to take care of your moments with loved ones
        </p>

        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={motorcycleImage1} className="d-block w-100" alt="Motorcycle 1" />
            </div>
            <div className="carousel-item">
              <img src={motorcycleImage2} className="d-block w-100" alt="Motorcycle 2" />
            </div>
            <div className="carousel-item">
              <img src={motorcycleImage3} className="d-block w-100" alt="Motorcycle 3" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <br />
      <br />
        {isAuthenticated() && user && (
          <div>
  <h3 style={{ color: 'green' }}>
    Hello, {user.username}! You have logged in. You can explore services.
  </h3>
  <br />
  <button
              className="btn btn-primary"
              onClick={() => {
                navigate('/services');
              }}
            >
              Explore Services
            </button>
          </div>
)}
        
      </div>


        <div className="about container py-5">
       
        <h4 className="mb-4" style={{ fontSize: '24px', color: '#333' }}>Service Advantage</h4>
        <div className="d-flex justify-content-around">
         
          <div className="text-center" style={{ fontSize: '18px', color: '#555' }}>
            <h5>Free Pick Up and Drop</h5>   
          </div>

          
          <div className="text-center" style={{ fontSize: '18px', color: '#555' }}>
            <h5>Certified Parts Replacement</h5>
          </div>

         
          <div className="text-center" style={{ fontSize: '18px', color: '#555' }}>
            <h5>Trained Service Personnel</h5>
          </div>
          
        </div>
        <h2>About Us</h2>
        <p>
          With over 12 years of experience, Suzu Motorcycle Services is not just a business; it's a passion.
          We are dedicated motorcycle enthusiasts who believe that every bike deserves the best care.
          Our skilled team of mechanics and technicians ensures that your motorcycle gets the attention it deserves from routine maintenance to performance upgrades.
        </p>
      </div>
    </div>
  );
};


export default Home;
