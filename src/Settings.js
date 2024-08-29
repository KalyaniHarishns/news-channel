import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import defaultProfilePic from './Images/Icon.png'; 

function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: null,
  });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(defaultProfilePic);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/profile');
      setProfiles(response.data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (name === 'profileImage' && files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }

    try {
      if (selectedProfile) {
        await axios.put(`http://localhost:3001/api/profile/${selectedProfile._id}`, data);
      } else {
        await axios.post('http://localhost:3001/api/profile', data);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        profileImage: null,
      });
      setProfileImagePreview(defaultProfilePic);
      setSelectedProfile(null);
      fetchProfiles();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      password: '', 
      phoneNumber: profile.phoneNumber,
      profileImage: null,
    });
    setProfileImagePreview(profile.profileImage || defaultProfilePic);
  };

  const handleDelete = async (profileId) => {
    try {
      await axios.delete(`http://localhost:3001/api/profile/${profileId}`);
      fetchProfiles();
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  
  const createButtonStyle = {
    width: '100px',
    backgroundColor: 'green',
    border: 'none',
    borderRadius: '10px',
    height: '30px',
    alignItems: 'center',
    color: 'white',
  };

  const editButtonStyle = {
    width: '100px',
    backgroundColor: 'teal',
    border: 'none',
    borderRadius: '10px',
    height: '30px',
    alignItems: 'center',
    color: 'white',
  };

  const deleteButtonStyle = {
    width: '100px',
    backgroundColor: 'crimson',
    border: 'none',
    borderRadius: '10px',
    height: '30px',
    alignItems: 'center',
    color: 'white',
  };
  const createButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center', 
    marginTop: '20px', 
  };
  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  return (
    <div className="profile-page">
      <h1>Create Profile</h1>
      <div className="profile-image-preview">
        <img
          src={profileImagePreview}
          alt="Profile Preview"
          className="profile-image"
        />
        <label htmlFor="profileImage"></label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <div style={createButtonContainerStyle}>
          <button
            type="submit"
            style={createButtonStyle}
          >
            Create
          </button>
        </div>
      </form>
      <div className="profile-list">
        <h>Profile List</h>
        <ul>
          {profiles.map((profile) => (
            <li key={profile._id}>
              <h3>{profile.firstName} {profile.lastName}</h3>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phoneNumber}</p>
              <div style={buttonContainerStyle}>
                <button
                  onClick={() => handleEdit(profile)}
                  style={editButtonStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(profile._id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
