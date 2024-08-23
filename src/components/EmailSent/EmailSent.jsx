import React, { useEffect, useState } from 'react';
import './EmailSent.css';

const EmailSent = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"));
    localStorage.removeItem("userEmail");
    /* setEmail((value) => {
      value = localStorage.getItem("userEmail");
      console.log("value: ", value);
      localStorage.removeItem("userEmail");
      return value;
    }); */
  }, []);

  return (
    <div className="email-sent-container">
      <div className="content-wrapper">
        <h1>Almost there ...</h1>
        <p>Please check your email {email} to confirm your account</p>
        <div className="divider"></div>
        <p className="bottom-text">If you haven't received our email in 15 minutes, please check your spam folder.</p>
      </div>
    </div>
  )
}

export default EmailSent