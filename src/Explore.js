import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsChannels from './NewsChannels.webp';
import './Sidebar.css';  

const App = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllChannels, setShowAllChannels] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=eb1be1c8ad3c4d948afcf48ca3908dc1');
                setChannels(channelsResponse?.data?.sources);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    

    return (
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
              channels.length > 0 && (showAllChannels ? channels : channels.slice(0, 6)).map(channel => (
                <div
                  key={channel.id}
                  className="channel"
                  onClick={() => window.open(`${channel?.url}`, '_blank')}
                >
                  <img src={NewsChannels} alt={channel.name} className="channel-img" />
                  <div className="channel-name">{channel.name}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    );
};

export default App;
