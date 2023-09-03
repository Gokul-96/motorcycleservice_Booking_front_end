//rfce
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import logo from '../assets/logo.jpg';

//state for toggle
const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

//toggle fn
  const toggle= () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" className="logo-img" />
        Suzu Motorcycle Services</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle} // Toggle used to the collapsed the menu state
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${isCollapsed ? '' : ' show'}`} id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <Link className="nav-link" to="/" onClick={toggle}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={toggle}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={toggle}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;