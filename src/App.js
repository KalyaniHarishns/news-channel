


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import News from './News'; 
import Explore from'./Explore';
import Notifications from'./Notifications';
import Saved from'./Saved';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/News" element={<News />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Saved" element={<Saved/>} />
      </Routes>
    </Router>
  );
};

export default App;

