import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Redirect to the portfolio page
    window.location.href = '/medic.html';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">🎉 Welcome to Healix medical site 🎉</h2>
        <p className="dashboard-message">
          Explore several type of medicines and suppliments.
        </p>
        <button className="dashboard-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
