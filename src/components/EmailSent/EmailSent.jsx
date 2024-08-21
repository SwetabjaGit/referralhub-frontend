import React from 'react';
import './EmailSent.css';

const EmailSent = () => {
  return (
    <div className="email-sent-container">
      <div className="content-wrapper">
        <h1>Almost there ...</h1>
        <p>Please check your email 13stabjahazra@gmail.com to confirm your account</p>
        <div className="divider"></div>
        <p className="bottom-text">If you haven't received our email in 15 minutes, please check your spam folder.</p>
      </div>
    </div>
  )
}

export default EmailSent