import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [action, setAction] = useState("SignUp");
  const navigate = useNavigate();

  const handleLogin = () => {
    
      navigate('/sidebar'); 
  };

  return (
    <div className="LoginContainer">
      <div className="header">
        <div className="text">Login</div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <input placeholder="Email" type="email" />
          </div>
        )}
        <div className="input">
          <input placeholder="Password" type="password" />
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
