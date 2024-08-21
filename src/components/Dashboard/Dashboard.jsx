import React from "react";
import "./Dashboard.css";
import success from "../../assets/speeding_car.jpg";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";

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
          <h1>Chart will be displayed here</h1>
          <div className="chart_container">
            <Line 
              className="chart" 
              data={data}
            />
          </div>
          <div className="referral_share_box">
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Dashboard;
