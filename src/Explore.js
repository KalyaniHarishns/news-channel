import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import './Sidebar.css';

import logo from './logo.png';
import channelImage1 from './Images/abcNews.jpg';
import channelImage2 from './Images/stockImage.jpg';
import channelImage3 from './Images/News7.jpg';
import channelImage4 from './Images/BBCNews.jpg';
import channelImage5 from './Images/News.jpg';
import channelImage6 from './Images/FoxImage.jpg';
import image1 from './Images/BreakingNews1.jpg';
import image2 from './Images/MorningNews.jpg';
import image3 from './Images/stockImage.jpg';
import image4 from './Images/skyNews.jpg';
import image5 from './Images/WorldNews.jpg';
import image6 from './Images/Live.jpg';

const staticImages = [
  channelImage1,
  channelImage2,
  channelImage3,
  channelImage4,
  channelImage5,
  channelImage6,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
];

const App = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllChannels, setShowAllChannels] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setChannels(channelsResponse?.data?.sources);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const visibleChannels = showAllChannels ? channels : channels.slice(0, 6);
  return (
    <div className="App">
      <main className="App-main">
        <section className="section">
          <div className="section-header">
            <h2>Explore Channels</h2>
            <button className="see-all-button" onClick={() => setShowAllChannels(prev => !prev)}>
              {showAllChannels ? 'See Less' : 'See All'}
            </button>
          </div>
          <div className="channels-list-container">
            <div className="channels-list">
              {loading ? (
                <p>Loading channels...</p>
              ) : (
                visibleChannels.length > 0 && visibleChannels.map((channel, index) => (
                  <div
                    key={channel.id || index}
                    className="channel"
                    onClick={() => window.open(`${channel.url}`, '_blank')}
                  >
                    <img 
                      src={staticImages[index % staticImages.length]} 
                      alt={channel.name || 'Channel Image'} 
                      className="channel-img" 
                    />
                    <div className="channel-name">{channel.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
         </main>
    </div>
  );
};

export default App;
