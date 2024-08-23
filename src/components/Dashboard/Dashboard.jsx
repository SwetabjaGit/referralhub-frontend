import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
import axios from "axios";

import whatsappIcon from "../../assets/whatsapp.svg";
import facebookIcon from "../../assets/facebook.svg";
import twitterIcon from "../../assets/twitter.svg";
import telegramIcon from "../../assets/telegram.svg";
import referlinkIcon from "../../assets/referlink.svg";
import socialLinks from "../../utils/socialLinks";

import baseurl from "../../utils/baseurl";

Chart.register(CategoryScale);


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [referralLink, setReferralLink] = useState(null);

  useEffect(() => {
    const generateReferralLink = (code) => {
      return `https://referral-hub.netlify.app/register?referralCode=${code}`;
    }

    const getUserDetails = async () => {
      try {
        const options = {
          method: 'GET',
          url: `${baseurl}/api/users/getuserdetails`,
          headers: {
            'auth-token': localStorage.getItem("token")
          }
        };
        const { data } = await axios.request(options);
        //console.log(data.user);
        setUserData(data.user);
        setReferralLink(generateReferralLink(data.user.referralCode));
      } catch(error) {
        console.log(error);
      }
    }
    getUserDetails();
  }, []);

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

  const getDateFromTimestamp = (date, from) => {
    let timestamp = new Date(date);
    let monthName = timestamp.toLocaleString("en-US", { month: "long" });
    //let dateString = timestamp.getDate() +" "+ monthName +" "+ timestamp.getFullYear();
    let dateArray = timestamp.toUTCString().split(" ");
    let dateString = dateArray[0] + " " + dateArray[1] + " " + dateArray[2] + " " + dateArray[3]; 
    //console.log(dateString);
    return dateString;
  }

  const getUpperCased = (str) => {
    if(str == null){
      return "NULL";
    } else {
      return str.toUpperCase();
    }
  }

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
          <img className="profile_image" src={userData && userData.imageUrl} alt="profile_img" />
          <div className="dashboard_data">
            <h1>{userData && userData.email}</h1>
            <p>CreatedAt: <span>{userData && getDateFromTimestamp(userData.createdAt)}</span></p>
            <p>Photo Status: 
              <span className={
                userData && (userData.imageVerified ? 
                  "photo_verified_text_green" : 
                  "photo_verified_text_red"
                )}
              >
                {userData && (userData.imageVerified ? "Verified" : "Not Verified")}
              </span>
            </p>
            <p>ReferralCode: <span>{userData && getUpperCased(userData.referralCode)}</span></p>
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
                      ₹{userData && userData.rewardsEarned}
                    </span>
                  </div>
                </div>
              </div>
              <div className="referral_statstics_box">
                <span color="#1e2433" className="referred_friends_text">
                  Referred Friends
                </span>
                <span color="#3067f0" className="referred_friends_value">
                  {userData && userData.numReferrals}
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
              <a href={socialLinks.whatsapp + " " + referralLink} target="_blank" className="social_icon_wrapper">
                <img src={whatsappIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.facebook + " " + referralLink} target="_blank" className="social_icon_wrapper">
                <img src={facebookIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.twitter + " " + referralLink} target="_blank" className="social_icon_wrapper">
                <img src={twitterIcon} className="social_icon" alt="logo" />
              </a>
              <a href={socialLinks.telegram + "  " + referralLink} target="_blank" className="social_icon_wrapper">
                <img src={telegramIcon} className="social_icon" alt="logo" />
              </a>
              <a href={referralLink} target="_blank" className="social_icon_wrapper">
                <img src={referlinkIcon} className="social_icon" alt="logo" />
              </a>
            </div>
            <h2>YOUR CODE</h2>
            <p>{userData ? getUpperCased(userData.referralCode) : "00000000"}</p>
          </div>
          <div className="referred_users_box">
            <h2>REFERRED FRIENDS</h2>
            <div className="referred_users_divider"></div>
            {userData && 
              userData.referrals && 
              userData.referrals.length > 0 ?
              userData.referrals.map(item => {
                return (
                  <div key={item.email} className="referred_user_item">
                    <div className="user_item_left">
                      <span>{item.email}</span>
                    </div>
                    <div className="user_item_right">
                      <span>{getDateFromTimestamp(item.referralDate)}</span>
                    </div>
                  </div>
                )
              }) : (
                <h2>You have not referred any friends</h2>
              )
            }
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Dashboard;
