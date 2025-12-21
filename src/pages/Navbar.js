import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="main-navbar">
      <ul className="nav-left">
        <li><Link to="/achievements">Achievements</Link></li>
        <li><Link to="/annualcamp">Annual Camp</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/clubsPage">Clubs</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;
