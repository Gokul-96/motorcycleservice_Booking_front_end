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
function App() {
  return (
    <div>
   <Router>
      <div className="app">
        <Header />     {/*Inside routes data would be static  */}
      
        <Routes>
        {/* inside routes data will change - In webrowser type booking with domain like http://localhost:5173/booking means it shows booking page  */}
          <Route path="/" exact element={<Home />} />  {/* root component */}
          <Route path="/services"  element={<Services />} />  {/*Route - how different parts of a webpage should be rendered based on the URL */}
          <Route path="/bookings" element={<Booking />} />   {/*element - what should be render based on URL */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation  />} />
        
         

        </Routes>
        <Footer />
      </div>
    </Router>
  </div>
  )
}

export default App