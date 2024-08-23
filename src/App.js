import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import News from './News'; 
import Explore from './Explore';
import Profile from './Profile';
import Notifications from './Notifications';
import Saved from './Saved'; 
import { useNews } from './NewsContext'; 
import Settings from './Settings';
import Layout from './Layout'; 
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
const App = () => {
  const { savedNews, addSavedNews } = useNews();

  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Routes for unauthenticated users */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes for authenticated users */}
        <Route path="/" element={<Layout />}>
          <Route path="news" element={<News addSavedNews={addSavedNews} />} />
          <Route path="explore" element={<Explore />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="saved" element={<Saved savedNews={savedNews} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="Profile" element={<Profile />} />
          {/* Default route if needed */}
          <Route index element={<News addSavedNews={addSavedNews} />} />
        </Route>

        {/* Redirect to login if no routes match */}
        <Route path="*" element={<Login />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
