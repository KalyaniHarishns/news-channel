import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBookmark, FaCompass, FaBell, FaCog } from 'react-icons/fa';

import './News.css';
import globe from './globe.jpg';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); 
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };

  return (
    <>
      {!isSidebarOpen ? 
        <div className="hamburger" onClick={toggleSidebar}>
          <div className="bar" style={{backgroundColor: 'black'}}></div>
          <div className="bar" style={{backgroundColor: 'black'}}></div>
          <div className="bar" style={{backgroundColor: 'black'}}></div>
        </div> :
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h1>DAILY</h1>
            <div className="globe">
              <img src={globe} alt='Globe' />
            </div>
            <div className="hamburger" onClick={toggleSidebar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/News">
                <FaHome className="icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/saved">
                <FaBookmark className="icon" /> Saved
              </Link>
            </li>
            <li>
              <Link to="/Explore">
                <FaCompass className="icon" /> Explore
              </Link>
            </li>
            <li>
              <Link to="/Notifications">
                <FaBell className="icon" /> Notifications
              </Link>
            </li>
            <li>
              <Link to="/Settings">
                <FaCog className="icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export default Sidebar;
