// import React, { useState } from 'react';
// import './ForgotPassword.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');

//   const handleForgotPassword = async () => {
//     try {
//       const response = await fetch('/api/password-reset/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });
//       const data = await response.json();
//       alert(data.message);
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//     }
//   };

//   return (
//     <div className="ForgotPasswordContainer">
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleForgotPassword}>Send Reset Instructions</button>
//     </div>
//   );
// };

// export default ForgotPassword;
