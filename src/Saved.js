
import React from 'react';
import { useNews } from './NewsContext'; 
import './Saved.css'; 

const Saved = () => {
  const { savedNews } = useNews(); 

  return (
    <section className="section saved-news-section">
      <div className="section-header">
        <h2>Saved News</h2>
      </div>
      <div className="saved-news-container">
        {savedNews.length === 0 ? (
          <p>No saved news available.</p>
        ) : (
          savedNews.map((article, index) => (
            <div key={index} className="news-item">
              <div className='news-item-img'>
                <img
                  src={article.urlToImage || './NewsImage.jpg'}
                  alt={article.title || 'News Image'}
                />
              </div>
              <div className='news-item-content'>
                <h3 className="news-item-title">{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Saved;
