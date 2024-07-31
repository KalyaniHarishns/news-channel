import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Sidebar.css';
import Sidebar from './Sidebar.js';
import image from './NewsImage.jpg';
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

const channelImages = [
  channelImage1,
  channelImage2,
  channelImage3,
  channelImage4,
  channelImage5,
  channelImage6
];

const newsImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
];

const App = () => {
  const [channels, setChannels] = useState([]);
  const [todayNews, setTodayNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [allNews, setAllNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [showAllChannels, setShowAllChannels] = useState(false);
  const [showAllTodayNews, setShowAllTodayNews] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setChannels(channelsResponse?.data?.sources);

        const todayNewsResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        const todayNewsData = todayNewsResponse?.data?.articles || [];

        const featuredNewsResponse = await axios.get('https://newsapi.org/v2/everything?q=featured&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        const featuredNewsData = featuredNewsResponse?.data?.articles || [];

        setTodayNews(todayNewsData);
        setFeaturedNews(featuredNewsData);
        
        
        setAllNews([...todayNewsData, ...featuredNewsData]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  
    const filteredArticles = allNews.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filteredArticles);
  }, [searchQuery, allNews]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getImageUrl = (url) => url || image;

  const displayedNews = searchQuery ? filteredNews : todayNews;
  const topNews = displayedNews.slice(0, showAllTodayNews ? displayedNews.length : 3);
  const bottomNews = displayedNews.slice(3, showAllTodayNews ? displayedNews.length : 6);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const scrollLeft = () => {
    sliderRef.current.slickPrev();
  };

  const scrollRight = () => {
    sliderRef.current.slickNext();
  };

  const visibleChannels = showAllChannels ? channels : channels.slice(0, 6);

  const getChannelImage = (index) => channelImages[index % channelImages.length];

  const getNewsImage = (index) => newsImages[index % newsImages.length];

  return (
    <div className="App">
      <Sidebar />
      <header className="App-header">
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="search-input"
            />
            <button onClick={() => setSearchQuery(searchQuery)} className="search-button">Search</button>
          
          </div>
          <div className='logo'>
          <img src={logo} className='logo' alt='Logo'/>
          </div>
        </div>
      </header>
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
                      src={getChannelImage(index)} 
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

        <section className="section">
          <div className="section-header">
            <h2>Today's Updates</h2>
            <button className="see-all-button" onClick={() => setShowAllTodayNews(prev => !prev)}>
              {showAllTodayNews ? 'See Less' : 'See All'}
            </button>
          </div>
          <div className="news-container">
            <div className="news-items">
              {topNews.length === 0 ? (
                <p>No news available.</p>
              ) : (
                topNews.map((article, index) => (
                  <div key={index} className="news-item" onClick={() => window.open(`${article?.url}`, '_blank')}>
                    <div className='news-item-img'>
                      <img
                        src={getNewsImage(index)} 
                        alt={article.title || 'News Image'}
                        className="news-item-img"
                      />
                    </div>
                    <div className='news-item-content'>
                      <h3 className="news-item-title">{article.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="news-items">
              {bottomNews.length === 0 ? (
                <p>No news available.</p>
              ) : (
                bottomNews.map((article, index) => (
                  <div key={index} className="news-item" onClick={() => window.open(`${article?.url}`, '_blank')}>
                    <div className='news-item-img'>
                      <img
                        src={getNewsImage(index + 3)} 
                        alt={article.title || 'News Image'}
                      />
                    </div>
                    <div className='news-item-content'>
                      <h3 className="news-item-title">{article.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Featured News</h2>
          </div>
          <div className="featured-news-container">
            <Slider {...settings} ref={sliderRef}>
              {featuredNews.length === 0 ? (
                <p>No featured news available.</p>
              ) : (
                featuredNews.map((article, index) => (
                  <div key={index} className="news-item1" onClick={() => window.open(`${article?.url}`, '_blank')}>
                    <div className='news-item-img1'>
                      <img
                        src={getImageUrl(article.urlToImage)}
                        alt={article.title || 'News Image'}
                      />
                    </div>
                    <div className='news-item-content'>
                      <h3 className="news-item-title1">{article.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </Slider>
            <div className="carousel-controls">
              <button className="carousel-control left" onClick={scrollLeft}>◀</button>
              <button className="carousel-control right" onClick={scrollRight}>▶</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
