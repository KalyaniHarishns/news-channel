import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import globe from './globe.jpg';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div className="sidebar">
     
      <div className="sidebar-header">
        <h1>DAILY</h1>
        
     
      <div className="globe">
          <img src={globe} alt='Globe' />
        </div>
        </div>
      <ul>
        <li>
          <Link to="/News">Home</Link> 
        </li>
        <li>
          <Link to="/saved">Saved</Link>
        </li>
        <li>
          <Link to="/Explore">Explore</Link>
        </li>
        <li>
          <Link to="/Notifications">Notifications </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
