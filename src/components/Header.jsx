import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from "../assets/logo.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated() ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Button variant="link" onClick={logout}>
                  Log Out
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant="primary">Login/Signup</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;