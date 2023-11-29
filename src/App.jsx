import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import ServiceDetails from './pages/ServiceDetails';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './AuthContext';


function App() {
  return (
   
      <Router>
         <AuthProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        </AuthProvider>
      </Router>
    
  );
}

export default App;