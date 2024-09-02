import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import defaultProfilePic from './Images/Icon.png'; 
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [dataId, setDataId] = useState(null);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(defaultProfilePic); 
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setDataId(userId);
      updateData(userId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      setDetails({
        name: response.data.name,
        email: response.data.email,
        password: '', // Do not pre-fill password for security reasons
      });
      setProfileImagePreview(response.data.profileImage || defaultProfilePic); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', details.name);
    formData.append('email', details.email);
    if (details.password) {
      formData.append('password', details.password);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    
    try {
      await axios.put(`http://localhost:3001/api/users/${dataId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Data updated successfully");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.response?.data?.message || 'An error occurred while updating the profile.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${dataId}`);
      console.log("Profile deleted successfully");
      // Clear local storage and state
      localStorage.removeItem('userId');
      setDetails({
        name: '',
        email: '',
        password: '',
      });
      setDataId(null);
      setProfileImagePreview(defaultProfilePic); // Reset to default image
      // Redirect to signup page
      navigate('/signup'); // Redirect to signup page
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div>
      <div className="settings-container">
        <div className="setting-card">
          <h1>{isEditMode ? 'Edit Profile' : 'Create Profile'}</h1>
        </div>
      </div>
      <div className='signup-containers'>
        <div className="profile-image-preview">
          <img
            src={profileImagePreview}
            alt="Profile Preview"
            className="profile-image"
          />
          <div className="inputt">
            <label htmlFor="profileImage" className="labe">Profile Image:</label><br />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="inputt">
            <label htmlFor="name" className="labe">Name:</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={details.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div className="inputt">
            <label htmlFor="email" className="labe">E-mail:</label><br />
            <input
              type="text"
              id="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="inputt">
            <label htmlFor="password" className="labe">Password:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
        
          <button className='settings-save' type="submit">
            Save Changes
          </button>
        </form>
        {dataId && (
          <div className="button-group">
            <button 
              className='settings-delete' 
              onClick={handleDelete}>
              Delete Profile
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Settings;
