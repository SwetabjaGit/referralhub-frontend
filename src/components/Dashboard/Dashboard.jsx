import React from "react";
import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";

import success from "../../assets/speeding_car.jpg";
import whatsappIcon from "../../assets/whatsapp.svg";
import facebookIcon from "../../assets/facebook.svg";
import twitterIcon from "../../assets/twitter.svg";
import telegramIcon from "../../assets/telegram.svg";
import referlinkIcon from "../../assets/referlink.svg";
import socialLinks from "../../utils/socialLinks";

Chart.register(CategoryScale);


const Dashboard = () => {
  const search = useLocation().search;
  const paramId = new URLSearchParams(search).get("id");
  console.log('id: ', paramId);


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: 'No of Referrals',
        data: [2, -37, 31, -44, 3, -75, 40],
        borderColor: 'rgb(255, 99, 132)',
      },
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="main_dashboard_container">
      <nav className="navbar">
        <h1>ReferralHub</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="dashboard_header">
        <h1>ReferralHub Referral Program</h1>
        <p>Refer & earn upto 50% of the trading fee paid by your friends as a reward. Be your own boss!</p>
      </div>
      <div className="dashboard_content">
        <div className="dashboard_left_panel">
          <img className="profile_image" src={success} alt="profile_img" />
          <div className="dashboard_data">
            <h1>13stabjahazra@gmail.com</h1>
            <p>CreatedAt: <span>12 March 2024</span></p>
            <p>Photo Status: 
              <span className="photo_verified_text">Verified</span>
            </p>
            <p>ReferralCode: <span>6asc5c7a</span></p>
          </div>
        </div>
        <div className="dashboard_right_panel">
          <h1>Referral Tracking Data</h1>
          <div className="referral_statistics_container">
            <div className="referral_statstics_wrapper">
              <div className="referral_statstics_box">
                <div className="gross_rewards">
                  <span color="#1e2433" className="gross_rewards_text">
                    Gross Rewards Earned
                  </span>  
                </div>
                <div className="gross_rewards_container">
                  <div className="gross_rewards">
                    <span color="#1e2433" className="gross_rewards_value">
                      ₹0.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="referral_statstics_box">
                <span color="#1e2433" className="referred_friends_text">
                  Referred Friends
                </span>
                <span color="#3067f0" className="referred_friends_value">
                  2
                </span>
              </div>
            </div>
          </div>
          <div className="chart_container">
            <Line 
              className="chart" 
              data={data}
            />
          </div>
          <div className="referral_share_box">
            <h2>SHARE NOW</h2>
            <div className="social_icons_container">
              <a href={socialLinks.whatsapp} target="_blank" className="social_icon_wrapper">
                <img src={whatsappIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.facebook} target="_blank" className="social_icon_wrapper">
                <img src={facebookIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.twitter} target="_blank" className="social_icon_wrapper">
                <img src={twitterIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.telegram} target="_blank" className="social_icon_wrapper">
                <img src={telegramIcon} className="social_icon" alt="logo" />
              </a>
              <a className="social_icon_wrapper">
                <img src={referlinkIcon} className="social_icon" alt="logo" />
              </a>
            </div>
            <h2>YOUR CODE</h2>
            <p>RABJTDFV</p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Dashboard;
