import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login'); 
  };

  return (
    <div className="sidebar">
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
