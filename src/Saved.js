import React, { useState, useEffect } from 'react';


const SAMPLE_VIDEOS = [
  {
    id: 1,
    title: 'Breaking News: Major Event',
    description: 'A major event just occurred in the world of news.',
    thumbnail: 'https://via.placeholder.com/200x100?text=Video+1',
    videoUrl: 'https://abcnews.go.com/Video '
  },
  {
    id: 2,
    title: 'Technology Update',
    description: 'Latest advancements in technology.',
    thumbnail: 'https://via.placeholder.com/200x100?text=Video+2',
    videoUrl: 'https://www.example.com/video2.mp4'
  },
  {
    id: 3,
    title: 'Sports Highlights',
    description: 'Highlights from recent sports events.',
    thumbnail: 'https://via.placeholder.com/200x100?text=Video+3',
    videoUrl: 'https://www.example.com/video3.mp4'
  }
];

const App = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const storedVideos = JSON.parse(localStorage.getItem('savedVideos')) || [];
    setSavedVideos(storedVideos);

    // Simulate fetching video data
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Replace this with actual API call if needed
        setTimeout(() => {
          setVideoList(SAMPLE_VIDEOS);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleSaveVideo = (video) => {
    const newSavedVideos = [...savedVideos, video];
    setSavedVideos(newSavedVideos);
    localStorage.setItem('savedVideos', JSON.stringify(newSavedVideos));
  };

  const handleRemoveVideo = (id) => {
    const updatedVideos = savedVideos.filter(video => video.id !== id);
    setSavedVideos(updatedVideos);
    localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));
  };

  return (
    <div>
      <h1>Video List</h1>
      <div className='video-list-1'>
        {loading && <p>Loading videos...</p>}
        {error && <p>Error fetching videos: {error}</p>}
        {videoList.length === 0 ? (
          <p>No videos available.</p>
        ) : (
          videoList.map((video) => (
            <div key={video.id}>
                {console.log(video)}
              <h3>{video.title}</h3>
              <img src={video.thumbnail} alt={video.title} style={{ width: '200px' }} />
              <p>{video.description}</p>
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
              <button onClick={() => handleSaveVideo(video)}>Save</button>
            </div>
           
          ))
        )}
      </div>

      <h2>Saved Videos</h2>
      <div className='video-list-2'>
        {savedVideos.length === 0 ? (
          <p>No videos saved.</p>
        ) : (
          savedVideos.map((video) => (
            <div key={video.id}>
              <h3>{video.title}</h3>
              <img src={video.thumbnail} alt={video.title} style={{ width: '200px' }} />
              <p>{video.description}</p>
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
              <button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
              {/* {console.log(video)} */}
            </div>
       
          ))
        )}
        
        </div>
    </div>
  );
};

export default App;
