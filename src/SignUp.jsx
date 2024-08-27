import React, { useState } from 'react';
import './Signup.css'; // Ensure this file has the CSS rules you provided
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name,email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign-up successful! You can now log in.');
        navigate('/login'); 
      } else {
        alert(data.message || 'Sign-up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="SignUpContainer">
      <div className="header">
        <div className="text">Sign Up</div>
      </div>

      <div className="inputs">
      <div className="input">
          <input
            placeholder="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           </div>
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
        <div className="input">
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSignUp}>
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default SignUp;
