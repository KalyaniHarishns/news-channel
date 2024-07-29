import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Sidebar.css';

import image from './NewsImage.jpg';
import NewsChannels from './NewsChannels.webp';
import logo from './logo.png';

const App = () => {
  const [channels, setChannels] = useState([]);
  const [todayNews, setTodayNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [showAllChannels, setShowAllChannels] = useState(false);
  const [showAllTodayNews, setShowAllTodayNews] = useState(false);
  const [showAllFeaturedNews, setShowAllFeaturedNews] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setChannels(channelsResponse?.data?.sources);

        const todayNewsResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setTodayNews(todayNewsResponse?.data?.articles);

        const featuredNewsResponse = await axios.get('https://newsapi.org/v2/everything?q=featured&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setFeaturedNews(featuredNewsResponse?.data?.articles);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    console.log('Search query:', event.target.value); 
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    console.log('Search button clicked'); 
    console.log('Search Query:', searchQuery); 
    console.log('Articles before filtering:', todayNews); 

    const filteredArticles = todayNews.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log('Filtered Articles:', filteredArticles); 
    setFilteredNews(filteredArticles);
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

  return (
    <div className="App">
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
            <button onClick={handleSearchButtonClick} className="search-button">Search</button>
          </div>
          <img src={logo} className='logo' alt='Logo'/>
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
                channels.length > 0 && (showAllChannels ? channels : channels.slice(0, 5)).map(channel => (
                  <div
                    key={channel.id}
                    className="channel"
                    onClick={() => window.open(`${channel?.url}`, '_blank')}
                  >
                    <img src={NewsChannels} alt={channel.name} className="channel-img" />
                    <div className="channel-name">{channel.name}</div>
                    {/* {console.log(channels)} */}
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
              {topNews.map((article, index) => (
                <div key={index} className="news-item" onClick={() => window.open(`${article?.url}`, '_blank')}>
                  <div className='news-item-img'>
                    <img
                      src={getImageUrl(article.urlToImage)}
                      alt={article.title || 'News Image'}
                      className="news-item-img"
                    />
                  </div>
                  <div className='news-item-content'>
                    <h3 className="news-item-title">{article.title}</h3>
                  </div>
                   {console.log(article)}
                </div>
              ))}
            </div>
            <div className="news-items">
              {bottomNews.map((article, index) => (
                <div key={index} className="news-item" onClick={() => window.open(`${article?.url}`, '_blank')}>
                  <div className='news-item-img'>
                    <img
                      src={getImageUrl(article.urlToImage)}
                      alt={article.title || 'News Image'}
                    />
                  </div>
                  <div className='news-item-content'>
                    <h3 className="news-item-title">{article.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Featured News</h2>
            {/* <button className="see-all-button" onClick={() => setShowAllFeaturedNews(prev => !prev)}>
              {showAllFeaturedNews ? 'See Less' : 'See All'}
            </button> */}
          </div>
          <div className="featured-news-container">
            <Slider {...settings} ref={sliderRef}>
              {featuredNews.map((article, index) => (
                <div key={index} className="news-item1" onClick={() => window.open(`${article?.url}`, '_blank')}>
                  <div className='news-item-img1'>
                    <img
                      src={getImageUrl(article.urlToImage)}
                      alt={article.title || 'News Image'}
                    />
                  </div>
                  {/* {console.log(article)} */}
                  <div className='news-item-content'>
                    <h3 className="news-item-title1">{article.title}</h3>
                  </div>
                </div>
              ))}
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
