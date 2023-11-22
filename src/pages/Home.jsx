import React from 'react';
import { useLocation } from 'react-router-dom';
import motorcycleImage from '../assets/photo1.jpeg';
import '../styles.css';

const Home = () => {
  const location = useLocation();

  return (
    <div className="home">
      <div className="text-center py-5">
        <h1 className="display-4 text-primary mb-4 fw-bold">Welcome to Suzu Motorcycle Services</h1>
        <p className="fst-italic text-capitalize fs-2 text-secondary">
          We will spend quality time to take care of your moments with loved ones
        </p>

       
        <img src={motorcycleImage} alt="Motorcycle" className="single-image" />

        {location.state && location.state.id ? (
          <h1>Hello {location.state.id} welcome to the service</h1>
        ) : (
          <h1>Welcome to the service</h1>
        )}
      </div>

      <div className="about container py-5">
        <h2>About Us</h2>
        <p>
          With over 12 years of experience, Suzu Motorcycle Services is not just a business; it's a passion. We are dedicated motorcycle enthusiasts who believe that every bike deserves the best care. Our skilled team of mechanics and technicians ensures that your motorcycle gets the attention it deserves from routine maintenance to performance upgrades.
        </p>
      </div>
    </div>
  );
};

export default Home;