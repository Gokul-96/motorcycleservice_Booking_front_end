import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from "../assets/logo.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            className="logo-img d-inline-block align-top"
            width="30"
            height="30"
          />
          Suzu Motorcycle Services
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-link-custom">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>
            {isAuthenticated() ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  Profile
                </Nav.Link>
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signin">
                  <Button variant="success">Sign In</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;