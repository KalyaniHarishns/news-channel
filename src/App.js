import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import News from './News'; 
import Explore from './Explore';
import Notifications from './Notifications';
import Saved from './Saved'; 
import { useNews } from './NewsContext'; 
import  Settings from './Settings';


const App = () => {
  const { savedNews, addSavedNews } = useNews();

  return (
    <>
    
    <Router>
    <Sidebar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        <Route path="/news" element={<News addSavedNews={addSavedNews} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/saved" element={<Saved savedNews={savedNews} />} />
        <Route path="/Settings" element={<Settings/>} />
        
      
      </Routes>
    </Router>
    </>
  );
};

export default App;
