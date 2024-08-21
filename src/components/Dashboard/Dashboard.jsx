import React from "react";
import "./Dashboard.css";


const Dashboard = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>ReferralHub</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
