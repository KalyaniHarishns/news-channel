// src/services/profileService.js

export const fetchProfile = async () => {
    const response = await fetch('http://localhost:5000/api/user/profile'); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.profile;
};

export const createProfile = async (profileData) => {
    const response = await fetch('http://localhost:5000/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.profile;
};

export const updateProfile = async (profileData) => {
    const response = await fetch('http://localhost:5000/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.profile;
};

export const deleteProfile = async () => {
    const response = await fetch('http://localhost:5000/api/user/profile', {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.message;
};
