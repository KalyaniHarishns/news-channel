import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';
import image from './NewsImage.jpg';
const NewsApp = () => {
    const [news, setNews] = useState([]);
    const [lastFetched, setLastFetched] = useState(null);

    const fetchNews = useCallback(async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bfdf4cb923be4950b2e30557ea76c65e');
            const latestNews = response.data.articles;
            setLastFetched(Date.now());

            if (lastFetched) {
                const newNews = latestNews.filter(article => 
                    !news.some(oldArticle => oldArticle.url === article.url)
                );

                if (newNews.length > 0) {
                    newNews.forEach(article => {
                        alert(`New Article: ${article.title}\n\n${article.description}\n\nRead more: ${article.url}`);
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
                    <li key={index} className="news-item1" onClick={() => window.open(`${article.url}`, '_blank')}>
                       
                            <img className='news-img' src={getImageUrl(article.urlToImage)} alt={article.title || 'News Image'} />
                        
                        {/* {console.log(article)} */}
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <h2>{article.title}</h2>
                        </a>
                        <p>{article.description}</p>
                        <p className="source"><strong>Source:</strong> {article.source.name}</p>
                        <p className="published"><strong>Published:</strong> {formatDate(article.publishedAt)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsApp;
