import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css';

import channelImage1 from './Images/abcNews.jpg';
import channelImage2 from './Images/ABC News.jpg';
import channelImage3 from './Images/Aftenpost.jpg';
import channelImage4 from './Images/Aljazeera.jpg';
import channelImage5 from './Images/Ansa.it.jpg';
import channelImage6 from './Images/Argaam.jpg';
import channelImage7 from './Images/ARS.jpg';
import channelImage8 from './Images/AryNews.jpg';
import channelImage9 from './Images/AssociatedPress.jpg';
import channelImage10 from './Images/AFR.jpg';
import channelImage11 from './Images/Axios.jpg';
import channelImage12 from './Images/BBCNews.jpg';
import channelImage13 from './Images/BBCSport.png';
import channelImage14 from './Images/Bild.jpg';
import channelImage15 from './Images/BlastingNewsBR.png';

const staticImages = [
  channelImage1,channelImage2,channelImage3,channelImage4, channelImage5,channelImage6,channelImage7,
  channelImage8, channelImage9,channelImage10, channelImage11, channelImage12,channelImage13, channelImage14, 
  channelImage15];
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


  const maxChannelsToShow = 15;
  const visibleChannels = showAllChannels ? channels.slice(0, maxChannelsToShow) : channels.slice(0, Math.min(channels.length, maxChannelsToShow));

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
