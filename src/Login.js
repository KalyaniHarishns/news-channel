import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [signupDetails, setSignupDetails] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/studylogins', loginDetails);
      if (response.status === 200) { 
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email); 
        navigate('/News'); 
      } else {
        setError('Invalid email or password'); 
      }
    } catch (error) {
      console.error('Login failed:', error.response || error.message); 
      setError('An error occurred. Please try again.');
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/studysignups', signupDetails);
      console.log('Signup successful:', response.data);
      navigate('/login'); 
      setSignupDetails({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Signup failed:', error.response || error.message);
      setError(error.response?.data?.message || 'An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="auth-buttons">
        <button onClick={handleToggle} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={handleToggle} className={!isLogin ? 'active' : ''}>Signup</button>
      </div>
     
      <forms onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
        {!isLogin && (
          <input
            type="text1"
            name="name"
            placeholder="Username"
            value={signupDetails.name}
            onChange={handleSignupChange}
            required
          />
        )}
        <input
          type="email1"
          name="email"
          placeholder="Email"
          value={isLogin ? loginDetails.email : signupDetails.email}
          onChange={isLogin ? handleLoginChange : handleSignupChange}
          required
        />
        <input
          type="password1"
          name="password"
          placeholder="Password"
          value={isLogin ? loginDetails.password : signupDetails.password}
          onChange={isLogin ? handleLoginChange : handleSignupChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        {error && <p className="error-message">{error}</p>}
      </forms>
      </div>
  
  );
};

export default Login;
