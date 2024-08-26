import React, { useState, useEffect } from 'react';
import './Settings.css';
import defaultProfilePic from './Images/Icon.png';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: ''
  });
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [profileImagePreview, setProfileImagePreview] = useState(defaultProfilePic);
  const [isEditing, setIsEditing] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // Check local storage first
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      setProfile(profileData);
      setEditProfile(profileData);
      setProfileImagePreview(profileData.profileImage || defaultProfilePic);
    } else {
      // Fetch from API if not in local storage
      const apiKey = 'mySuperSecretKey123!@#';
      fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data && data.profile) {
            setProfile(data.profile);
            setEditProfile(data.profile);
            setProfileImagePreview(data.profile.profileImage || defaultProfilePic);
            // Store fetched profile data in local storage
            localStorage.setItem('profile', JSON.stringify(data.profile));
          } else {
            console.error('Profile data is missing or in an unexpected format:', data);
          }
        })
        .catch(error => console.error('Error fetching profile data:', error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setEditProfile({ ...editProfile, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in editProfile) {
      if (editProfile[key]) formData.append(key, editProfile[key]);
    }

    fetch('/api/user/profile', {
      method: creatingProfile ? 'POST' : 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (creatingProfile) {
          alert('Profile created successfully');
          setCreatingProfile(false);
        } else {
          setProfile(editProfile);
          alert('Profile updated successfully');
          // Update local storage with new profile data
          localStorage.setItem('profile', JSON.stringify(editProfile));
        }
        setIsEditing(false);
      })
      .catch(error => console.error('Error processing profile:', error));
  };

  const handleRemove = () => {
    const token = localStorage.getItem('token');
    fetch('/api/user/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProfile({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: '',
          profileImage: ''
        });
        setProfileImagePreview(defaultProfilePic);
        // Clear profile data from local storage
        localStorage.removeItem('profile');
        alert('Profile removed successfully');
      })
      .catch(error => console.error('Error removing profile:', error));
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    fetch('/api/user/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(data => {
        alert('Password reset instructions have been sent to your email.');
        setShowForgotPassword(false);
      })
      .catch(error => console.error('Error sending password reset instructions:', error));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-pic-container">
          <img
            src={profileImagePreview}
            alt="Profile"
            className="profile-pic"
            onClick={() => document.getElementById('profile-image-upload').click()}
          />
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
          />
        </div>
        <h1>{creatingProfile ? 'Create Profile' : 'Update Profile'}</h1>
      </div>

      {creatingProfile || isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={editProfile.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={editProfile.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editProfile.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={editProfile.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
            Forgot Password?
          </button>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={editProfile.phoneNumber}
              onChange={handleInputChange}
            />
          </label>
          <div className="container">
            <button type="submit" className="save-button3">
              {creatingProfile ? 'Create Profile' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCreatingProfile(false);
                setEditProfile(profile);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
          <button onClick={handleRemove} className="remove-button">Remove Profile</button>
          <button onClick={() => setCreatingProfile(true)} className="create-profile-button">Create New Profile</button>
        </div>
      )}

      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowForgotPassword(false)}>&times;</span>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <label>
                Enter your email:
                <input type="email" name="email" required />
              </label>
              <button type="submit" className="submit-button">Send Reset Instructions</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
