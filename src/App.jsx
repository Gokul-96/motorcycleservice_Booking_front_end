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
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { AuthProvider } from './AuthContext';
import Logout from './components/LogOut';






function App() {
  return (
    <AuthProvider>
      <Router>
        
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
        
      </Router>
      </AuthProvider>
  );
}

export default App;