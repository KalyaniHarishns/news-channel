 
import React from 'react';
import './Explore.css';  

const ChannelItem = ({ name, description, url, logo }) => {
  return (
    <div className="channel-item">
      <img src={logo} alt={name} className="channel-logo" />
  
      <div className="channel-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      </div>
    </div>
  );
};

export default ChannelItem;
