import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ssnLogo from "../assets/ssn-logo.png";
import nssLogo from "../assets/Nss-logo.png";

const Navbar = () => {
  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <div className="top-header">
        <img src={ssnLogo} alt="SSN Logo" className="ssn-logo" />

        <div className="header-text">
          <h1>National Service Scheme (NSS) Unit of SSN</h1>
          <h2>Sri Sivasubramaniya Nadar College of Engineering, Kalavakkam - 603 110</h2>
          <p>(An Autonomous Institution, Affiliated to Anna University, Chennai)</p>
          <span className="time-text">
            {new Date().toLocaleString()}
          </span>
        </div>

        <img src={nssLogo} alt="NSS Logo" className="nss-logo" />
      </div>

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="announcement-bar">
        🌟 Maintenance Visit – Sept 23 • 📢 Team Meet – Sept 23 • 🎉 Orientation – Sept 24
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="main-navbar">
        <ul className="nav-left">
          <li><Link to="/achievements">Achievements</Link></li>
          <li><Link to="/annualcamp">Annual Camp</Link></li>

          <li className="dropdown">
            <span>Teams ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/teams">Core Team</Link></li>
              <li><Link to="/teams">Volunteers</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>Clubs ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/clubsPage">Nature Club</Link></li>
              <li><Link to="/clubsPage">Sustainability Club</Link></li>
              <li><Link to="/clubsPage">Tulir Club</Link></li>
            </ul>
          </li>

          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
