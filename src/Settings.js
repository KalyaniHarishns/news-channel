import React, { useState, useEffect } from 'react';
import './Settings.css';
import defaultProfilePic from './Images/Icon.png'; // Default profile image

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
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to control forgot password modal
  const [creatingProfile, setCreatingProfile] = useState(false); // State to toggle create profile mode

  useEffect(() => {
    // Fetch profile data when the component mounts
    fetch('/api/user/profile')
      .then(response => response.json())
      .then(data => {
        if (data && data.profile) {
          setProfile(data.profile);
          setEditProfile(data.profile); // Initialize editProfile state
          setProfileImagePreview(data.profile.profileImage || defaultProfilePic);
        } else {
          console.error('Profile data is missing or in an unexpected format:', data);
        }
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

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
    const formData = new FormData();
    for (const key in editProfile) {
      formData.append(key, editProfile[key]);
    }

    fetch(creatingProfile ? '/api/user/profile/create' : '/api/user/profile', {
      method: creatingProfile ? 'POST' : 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (creatingProfile) {
        alert('Profile created successfully');
        setCreatingProfile(false); // Exit create mode
      } else {
        setProfile(editProfile); // Update profile with edited data
        alert('Profile updated successfully');
      }
      setIsEditing(false); // Exit edit mode
    })
    .catch(error => console.error('Error processing profile:', error));
  };

  const handleRemove = () => {
    // Call API to remove profile data
    fetch('/api/user/profile', {
      method: 'DELETE'
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
      }); // Clear profile data
      setProfileImagePreview(defaultProfilePic); // Reset profile image
      alert('Profile removed successfully');
    })
    .catch(error => console.error('Error removing profile:', error));
  };

  const handleForgotPassword = () => {
    // Logic to handle forgot password, e.g., show a modal or redirect to a password reset page
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
      setShowForgotPassword(false); // Close modal or redirect
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
            onClick={() => document.getElementById('profile-image-upload').click()} // Trigger file input click on profile pic click
          />
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            className="file-input" // Hide file input but keep it accessible
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
          <button type="submit" className="save-button">{creatingProfile ? 'Create Profile' : 'Save Changes'}</button>
          <button type="button" onClick={() => { setIsEditing(false); setCreatingProfile(false); }} className="cancel-button">Cancel</button>
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
        </div>
      )}

      <button onClick={() => setCreatingProfile(true)} className="create-profile-button">Create New Profile</button>

      {/* Forgot Password Modal */}
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
