import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Sidebar.css'; 

useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=eb1be1c8ad3c4d948afcf48ca3908dc1');
        setChannels(channelsResponse?.data?.sources);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching channels:', error);
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);
