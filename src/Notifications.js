import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';
import image from './NewsImage.jpg';

const NewsApp = () => {
    const [news, setNews] = useState([]);
    const [lastFetched, setLastFetched] = useState(null);

    const fetchNews = useCallback(async () => {
        try {
          const response = await axios.get('/api/search', {
                params: {
                    'api-key': 'ba57ab6e-280b-465c-8972-89f0aece932d',
                    'show-fields': 'thumbnail,trailText,headline',
                    'page-size': 10,
                    'order-by': 'newest',
                },
            });
            const latestNews = response.data.response.results;
            setLastFetched(Date.now());

            if (lastFetched) {
                const newNews = latestNews.filter(article => 
                    !news.some(oldArticle => oldArticle.id === article.id)
                );

                if (newNews.length > 0) {
                    newNews.forEach(article => {
                        alert(`New Article: ${article.headline}\n\n${article.trailText}\n\nRead more: ${article.webUrl}`);
                    });
                }
            }

            setNews(latestNews);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }, [lastFetched, news]);

    const getImageUrl = (url) => url || image;

    useEffect(() => {
        fetchNews();
        const interval = setInterval(fetchNews, 60000);

        return () => clearInterval(interval);
    }, [fetchNews]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="news-app">
            <h1>Latest News</h1>
            <ul>
                {news.map((article, index) => (
                    <li key={index} className="news-item1" onClick={() => window.open(`${article.webUrl}`, '_blank')}>
                        <img className='news-img' src={getImageUrl(article.fields.thumbnail)} alt={article.headline || 'News Image'} />
                        {console.log(article)}
                        <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
                            <h2>{article.headline}</h2>
                        </a>
                        <p>{article.trailText}</p>
                        <p className="source"><strong>Source:</strong> The Guardian</p>
                        <p className="published"><strong>Published:</strong> {formatDate(article.webPublicationDate)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsApp;
