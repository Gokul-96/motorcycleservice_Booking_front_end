import React from 'react';
import { Link } from 'react-router-dom';




const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <p>&copy; 2023 Suzu Motorcycle Services. All rights reserved.</p>
        <div>
          <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link> | <Link className="footer-link" to="/terms-of-service">Terms of Service</Link>
        </div>
        <div className="social-icons mt-3">
          <a href="#" className="footer-icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="footer-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="footer-icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;