import React,{ useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import motorcycleImage1 from '../assets/photo1.jpeg';
import motorcycleImage2 from '../assets/photo2.jpeg';
import motorcycleImage3 from '../assets/photo3.jpeg';
import '../styles.css';
import {useDispatch, useSelector} from 'react-redux';
import userServices from '../services/users';

const Home = () => {

  const dispatch =useDispatch();
  const userData = useSelector(state => state.user);
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  const getProfile = async () => {
    if(userData.user) {
    try {
      const userInfo = await userServices.getProfile(userData.user.token);
      setUser(userInfo); 
    } catch (error) {
      console.error('Error getting user profile', error);
    }
    }
  };

  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data from state or localStorage
    // For example, dispatch an action to clear user data
    dispatch({ type: 'LOGOUT' });

    // Navigate to the logout page or any other desired page
    navigate('/logout');
  };
  useEffect(() => {
    getProfile();
  }, [userData.user]);
  

  return (
    <div className="home">
      <div className="text-center py-5">
      <div>
      <p className="user-info">
  {user?.username && (
    <>
      {user?.username} has logged in!{' '}
      <button className="logout-link" onClick={handleLogout}>
        Logout
      </button>
    </>
  )}
</p>
      </div>
        <h1 className="display-4 text-primary mb-4 fw-bold">
          Welcome to Suzu Motorcycle Services
        </h1>
        <p className="fst-italic text-capitalize fs-2 text-secondary">
          We will spend quality time to take care of your moments with loved ones
        </p>

        {/* In compact space showcase more images or slides */}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={motorcycleImage1}
                className="d-block w-100 carousel-image"
                alt="Motorcycle 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={motorcycleImage2}
                className="d-block w-100 carousel-image"
                alt="Motorcycle 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={motorcycleImage3}
                className="d-block w-100 carousel-image"
                alt="Motorcycle 3"
              />
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
      </div>

      
      <Link to="/services" className="btn btn-primary explore-button">
        Explore Services
      </Link>

      <div className="about container py-5 service-advantage">
        <h4 className="mb-4">Service Advantage</h4>
        <div className="d-flex justify-content-around advantage-list">
          <div className="text-center advantage-item">
            <h5>Free Pick Up and Drop</h5>
          </div>
          <div className="text-center advantage-item">
            <h5>Certified Parts Replacement</h5>
          </div>
          <div className="text-center advantage-item">
            <h5>Trained Service Personnel</h5>
          </div>
        </div>

<br></br>
<br></br>
<br></br>
<br></br>
        <h2>About Us</h2>
        <p>
          With over 12 years of experience, Suzu Motorcycle Services is not just a business; it's a
          passion. We are dedicated motorcycle enthusiasts who believe that every bike deserves the
          best care. Our skilled team of mechanics and technicians ensures that your motorcycle gets
          the attention it deserves from routine maintenance to performance upgrades.
        </p>
        
      </div>
    </div>
  );
};

export default Home;