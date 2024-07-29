import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
    const [action, setAction] = useState("SignUp");
    const navigate = useNavigate();

    const handleSubmit = () => {navigate('/login');
    };

    return (
        <div className="SignUpcontainer">
            <div className="header">
                <div className="text">{action}</div>
            </div>
            <div className="inputs">
                {action === "SignUp" && (
                    <div className="input">
                        <input placeholder="Name" type="text" />
                    </div>
                )}
                <div className="input">
                    <input placeholder="Email" type="email" />
                </div>
                <div className="input">
                    <input placeholder="Password" type="password" />
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={handleSubmit}>
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
