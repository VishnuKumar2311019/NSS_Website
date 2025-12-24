import React, { useState, useEffect } from 'react';
import './Home.css';
import ssnLogo from '../assets/ssn-logo.png';
import nssLogo from '../assets/Nss-logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* Load Google Font once */
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap";
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [latestActivities, setLatestActivities] = useState([]);

  /* ===== Fetch trending (optional – future use) ===== */
  useEffect(() => {
    axios.get('https://nss-website-backend.onrender.com/admin/get-trending')
      .catch(() => {});
  }, []);

  /* ===== Fetch latest activities ===== */
  useEffect(() => {
    fetch("https://nss-website-backend.onrender.com/api/activities")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLatestActivities(data);
        } else {
          setLatestActivities([]);
        }
      })
      .catch(() => setLatestActivities([]));
  }, []);

  /* ===== Live clock ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-wrapper">

      {/* ================= BANNER ================= */}
      <div className="banner">
        <div className="logo-container">
          <img src={ssnLogo} alt="SSN Logo" className="logo" />
        </div>

        <div className="college-info">
          <h1>National Service Scheme (NSS) Unit of SSN</h1>
          <h2>Sri Sivasubramaniya Nadar College of Engineering, Kalavakkam - 603110</h2>
          <p>(Autonomous | Affiliated to Anna University)</p>
          <div className="time-display">
            {currentTime.toLocaleString()}
          </div>
        </div>

        <div className="nss-logo-container">
          <img src={nssLogo} alt="NSS Logo" className="nss-logo" />
        </div>
      </div>

      {/* ================= ANNOUNCEMENT BAR ================= */}
      <div className="announcement-bar">
        <marquee scrollamount="6">
          🌟 Maintenance Visit – Sept 23 • 📢 Team Meet – Sept 23 • 🎉 Orientation – Sept 24
        </marquee>
      </div>

      {/* ================= HERO ================= */}
      <div className="hero-section">
        <h1 className="hero-text">Welcome to NSS Unit of SSN</h1>
      </div>

      {/* ================= LATEST ACTIVITIES ================= */}
      <div className="trending-activities-wrapper">
        <div className="activities-section">
          <h2>🟢 Latest Activities</h2>
          <div className="activities-box">
            {!latestActivities.length ? (
              <p>No recent activities.</p>
            ) : (
              latestActivities.map((activity, index) => (
                <Link key={index} to="/activities" className="ticker-item">
                  {activity.title} – <span>{activity.date}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN SECTIONS ================= */}
      <section className="mission-section">
        <h2><Link to="/mission">Our Mission</Link></h2>
        <p>
          NSS at SSN aims to develop social responsibility, leadership,
          and empathy through meaningful community service.
        </p>
        <Link to="/mission" className="read-more">Read More →</Link>
      </section>

      <section className="annualreport-section">
        <h2><Link to="/annualreport">Annual Report</Link></h2>
        <p>A snapshot of our yearly initiatives and impact.</p>
        <Link to="/annualreport" className="read-more">View Reports →</Link>
      </section>

      <section className="volunteer-section">
        <h2><Link to="/volunteer_stories">Volunteer Stories</Link></h2>
        <blockquote>
          "Being part of NSS helped me grow while serving society."
          <span> – NSS Volunteer</span>
        </blockquote>
        <Link to="/volunteer_stories" className="read-more">Read Stories →</Link>
      </section>

      <section className="initiatives-section">
        <h2><Link to="/initiatives">Recent Initiatives</Link></h2>
        <ul>
          <li>🌿 Sapling Drive – July 2025</li>
          <li>🏥 Blood Donation Camp – June 2025</li>
          <li>🧹 Swachh Bharat Rally – May 2025</li>
        </ul>
        <Link to="/initiatives" className="read-more">Explore More →</Link>
      </section>

      <section className="collaborators-section">
        <h2><Link to="/collaborators">Our Collaborators</Link></h2>
        <div className="logo-row">
          <div className="collab-logo">EFI</div>
          <div className="collab-logo">Goonj</div>
        </div>
        <Link to="/collaborators" className="read-more">Meet Our Partners →</Link>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://instagram.com/nssofssn" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/@nssofssn" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
          </a>
          <a href="https://x.com/SSNNSS579516641" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
          </a>
          <a href="https://www.facebook.com/nssofssn" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/nssssn/posts/?feedView=all" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default Home;
