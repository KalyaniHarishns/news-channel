import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleAddProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/profiles', newProfile);
      setProfiles([...profiles, response.data]);
      setNewProfile({ username: '', email: '' });
      alert('Profile added successfully!');
    } catch (error) {
      console.error('Error adding profile:', error);
      alert('Error adding profile.');
    }
  };

  const handleRemoveProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/profiles/${id}`);
      setProfiles(profiles.filter(profile => profile.id !== id));
      alert('Profile removed successfully!');
    } catch (error) {
      console.error('Error removing profile:', error);
      alert('Error removing profile.');
    }
  };

  return (
    <div>
      <h1>Manage Profiles</h1>

      <form onSubmit={handleAddProfile}>
        <h2>Add New Profile</h2>
        <label htmlFor="new-username">Username:</label>
        <input
          type="text"
          id="new-username"
          name="username"
          value={newProfile.username}
          onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
          required
        />
        <br />
        <label htmlFor="new-email">Email:</label>
        <input
          type="email"
          id="new-email"
          name="email"
          value={newProfile.email}
          onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
          required
        />
        <br />
        <button type="submit">Add Profile</button>
      </form>

      <h2>Current Profiles:</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <button onClick={() => handleRemoveProfile(profile.id)}>Remove Profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
