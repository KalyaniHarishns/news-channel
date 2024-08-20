import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Sidebar.css';
import logo from './logo.png';
import userPhoto from './userPhoto.jpg';
import { useNavigate } from 'react-router-dom';
import { useNews } from './NewsContext'; 

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

import image1 from './Images/BreakingNews1.jpg';
import image2 from './Images/MorningNews.jpg';
import image3 from './Images/stockImage.jpg';
import image4 from './Images/skyNews.jpg';
import image5 from './Images/WorldNews.jpg';
import image6 from './Images/Live.jpg';

const channelImages = [
  channelImage1, channelImage2, channelImage3, channelImage4, channelImage5, channelImage6, channelImage7,
  channelImage8, channelImage9, channelImage10, channelImage11, channelImage12, channelImage13, channelImage14,
  channelImage15
];
const newsImages = [
  image1, image2, image3, image4, image5, image6
];

const profilesData = [
  { name: 'Kalyani', email: 'kalyani@gmail.com' },
  { name: 'Saanvi', email: 'saanvi@gmail.com' },
  { name: 'Harish', email: 'harish@gmail.com' }
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(profilesData[0]); // Default profile

  const { addSavedNews } = useNews(); 
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const handleLogout = () => {
    navigate('/login'); 
  };

  const getArticles = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=bfdf4cb923be4950b2e30557ea76c65e`);
      setFilteredNews(response?.data?.articles || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get('https://newsapi.org/v2/sources?apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setChannels(channelsResponse?.data?.sources || []);

        const todayNewsResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setTodayNews(todayNewsResponse?.data?.articles || []);

        const featuredNewsResponse = await axios.get('https://newsapi.org/v2/everything?q=featured&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
        setFeaturedNews(featuredNewsResponse?.data?.articles || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      getArticles(searchQuery);
    } else {
      setFilteredNews([]);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      getArticles(searchQuery);
    }
  };

  const getImageUrl = (url) => url || image1;
  const displayedNews = searchQuery ? filteredNews : todayNews;
  const topNews = displayedNews.slice(0, showAllTodayNews ? displayedNews.length : 3);
  const bottomNews = displayedNews.slice(3, showAllTodayNews ? displayedNews.length : 6);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,  
    slidesToScroll: 3,  
    rows: 1,  
    arrows: true,  
    centerMode: false,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          rows: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          rows: 1,
        }
      }
    ]
  };

  const handleAddProfile = (e) => {
    e.stopPropagation(); 
    setIsDropdownOpen(prev => !prev); 
  };

  const scrollLeft = () => {
    sliderRef.current.slickPrev();
  };

  const scrollRight = () => {
    sliderRef.current.slickNext();
  };

  const visibleChannels = showAllChannels ? channels : channels.slice(0, 7);

  const getChannelImage = (index) => channelImages[index % channelImages.length];

  const getNewsImage = (index) => newsImages[index % newsImages.length];

  const handleLogoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false); // Close dropdown when modal closes
  };

  const handleSave = (article, event) => {
    event.stopPropagation();
    event.preventDefault(); 
    addSavedNews(article); 
  };

  const handleEmailSelect = (email) => {
    const profile = profilesData.find(profile => profile.email === email);
    setSelectedProfile(profile);
    setIsDropdownOpen(false); // Close dropdown after selection
    console.log('Selected Profile:', profile);
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
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>
          <div className='logo' onClick={handleLogoClick}>
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
          <div className="channels-list-container1">
            <div className="channels-list1">
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
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={(e) => handleSave(article, e)} className="save-button1">Save</button>
                      </div> 
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
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={(e) => handleSave(article, e)} className="save-button2">Save</button> 
                      </div>
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
                    <h3 className="news-item-title1">{article.title}</h3>
                    <button onClick={(e) => handleSave(article, e)} className="save-button">Save</button> 
                  </div>
                ))
              )}
            </Slider>
            <div className="carousel-controls">
              <button className="carousel-control left" onClick={scrollLeft}>{"<"}</button> 
              <button className="carousel-control right" onClick={scrollRight}>{">"}</button> 
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <div className="modal-header">
              <div className="profile-container">
                <img src={userPhoto} alt="User" className="modal-photo" />
                <button className="add-profile-button" onClick={handleAddProfile}>+</button>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {profilesData.map(profile => (
                      <p key={profile.email} onClick={() => handleEmailSelect(profile.email)}>
                        {profile.email}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <h2>{selectedProfile.name}</h2>
              <p>{selectedProfile.email}</p>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
