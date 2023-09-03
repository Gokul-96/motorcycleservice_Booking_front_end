import React from 'react';
import motorcycleImage from '../assets/pxfuel.jpg';

const Home = () => {
  return (
    <div className="home">
      {/* py - padding y means vertical top and bottom spacing */}
      <div className=" text-center py-5">
    {/* display-4 - Used to large heading style , text-primary - color of the text , mb -4 - margin bottom 4 unit , fw-bold - font weight text to bold */}
        <h1 className="display-4 text-primary mb-4 fw-bold">Welcome to Suzu Motorcycle Services</h1>
        {/* font style- italic, text-capitalize- first word capital in all words  */}
        <p className="fst-italic text-capitalize fs-2 text-secondary">I don't like Motorcycle....., I love it</p>
        <img src= {motorcycleImage} alt="Motorcycle" className="img-fluid mb-4" style={{ maxWidth: '1200px' }} />
      </div>
      <div className="about container py-5">
        <h2>About Us</h2>
        <p>
          With over 30 years of experience, Suzu Motorcycle Services is not just a business; it's a passion. We are dedicated motorcycle enthusiasts who believe that every bike deserves the best care. Our skilled team of mechanics and technicians ensures that your motorcycle gets the attention it deserves, from routine maintenance to performance upgrades.
        </p>
      </div>
    </div>
  );
};

export default Home;