import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user details and token in local storage
        localStorage.setItem('userId', data.user._id); // Save user ID
        localStorage.setItem('userEmail', data.user.email); // Save user email
        localStorage.setItem('userName', data.user.name); // Save user name
        localStorage.setItem('userProfileImage', data.user.profileImage || ''); // Save profile image URL if available

        // Call login function from context (if needed)
        login(data.token);

        alert('Login successful');
        // Optionally, fetch user details
        fetchUserDetails(data.user._id);

      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`);
      const userDetails = await response.json();

      if (response.ok) {
        console.log('User details:', userDetails);
        // Handle user details as needed
      } else {
        console.error('Failed to fetch user details:', userDetails.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="header">
        <div className="text">Login</div>
      </div>

      <div className="input1">
        <div className="input">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
