import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status and profile on component mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 401) {
        // Unauthorized, handle it accordingly
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data.profile); // Set profile data
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const createProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 401) {
        // Unauthorized, handle it accordingly
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data.profile); // Update profile data
      alert('Profile created successfully');
      navigate('/profile'); // Redirect to profile page or desired location
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const updateProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 401) {
        // Unauthorized, handle it accordingly
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data.profile); // Update profile data
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const deleteProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        // Unauthorized, handle it accordingly
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setProfile(null); // Clear profile data
      alert('Profile deleted successfully');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ profile, createProfile, updateProfile, deleteProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
