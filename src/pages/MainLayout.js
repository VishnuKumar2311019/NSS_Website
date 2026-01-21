import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ssnLogo from "../assets/ssn-logo.png";
import nssLogo from "../assets/Nss-logo.png";
import { Award, Users, Mail, Menu, X, TentTree, Image } from "lucide-react";
import "../pages/Home.css"; // reuse existing styles

const MainLayout = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== BLUE BANNER ===== */}
      <div className="banner">
        <div className="logo-container">
          <img src={ssnLogo} alt="SSN College logo" className="logo" />
        </div>

        <div className="college-info">
          <h2>Sri Sivasubramaniya Nadar College of Engineering, Kalavakkam - 603110</h2>
          <p>(An Autonomous Institution, Affiliated to Anna University, Chennai)</p>
          <h1>National Service Scheme (NSS)</h1>
          <div className="time-display">{currentTime.toLocaleString()}</div>
        </div>

        <div className="nss-logo-container">
          <img src={nssLogo} alt="National Service Scheme logo" className="nss-logo" />
        </div>
      </div>

      {/* ===== ANNOUNCEMENT BAR (NO MARQUEE) ===== */}
      <div className="announcement-bar">
        <div className="announcement-scroll">
          🌟 Maintenance Visit – Sept 23 • 📢 Team Meet – Sept 23 • 🎉 Orientation – Sept 24
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="top-nav">
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-list ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>

          <li>
            <Link to="/achievements">
              <Award size={18} /> Achievements
            </Link>
          </li>

          <li>
            <Link to="/annualcamp">
              <TentTree size={18} /> Annual Camp
            </Link>
          </li>

          <li className="dropdown">
            <button type="button" className="dropdown-trigger">
              <Users size={18} /> Teams ▾
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/teams">Core Team</Link></li>
              <li><Link to="/teams">Volunteers</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/clubsPage">
              <Image size={18} /> Clubs
            </Link>
          </li>

          <li>
            <Link to="/gallery">
              <Image size={18} /> Gallery
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <Mail size={18} /> Contact
            </Link>
          </li>

          <li className="mobile-login">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </li>
        </ul>

        <div className="login-button">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
