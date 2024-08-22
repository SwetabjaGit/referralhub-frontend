import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../assets/success3.png";
import "./EmailVerified.css";

import baseurl from "../../utils/baseurl";


const EmailVerified = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const generateReferral = async () => {
      try {
        const url = `${baseurl}/api/users/${param.id}/generatereferral`;
        const { data } = await axios.post(url);
        console.log(data);
      } catch(error) {
        console.log(error);
      }
    }

    const verifyEmailUrl = async () => {
      try {
        const url = `${baseurl}/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        /* await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setValidUrl(true);
          }) */
        console.log(data);
        setValidUrl(true);
        generateReferral();
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {validUrl ? (
        <div className="email-verified-container">
          <img
            className="success_image" 
            src={success} 
            alt="success_img"
          />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerified;
