import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ClubsPage.css';
import MainLayout from './MainLayout';

const clubsData = {
  nature: {
    name: "🌿 Nature Club",
    color: "#10b981",
    vision: "To foster a campus environment where the presence and well-being of diverse animal and bird species are protected, celebrated, and sustained.",
    objectives: [
      "Restore and protect natural habitats on campus",
      "Support campus biodiversity and wildlife conservation",
      "Promote awareness about coexistence with nature",
      "Collaborate with environmental experts and organizations"
    ],
    activities: [
      { icon: "📸", title: "Wildlife Photography Initiatives", desc: "Wild Camera Events to document campus biodiversity" },
      { icon: "🍽️", title: "Food & Water Stations", desc: "Setting up feeding stations for birds and animals" },
      { icon: "🏠", title: "Nesting Boxes Installation", desc: "Installing safe nesting boxes across campus" },
      { icon: "💰", title: "Fundraising Activities", desc: "Organizing fundraisers for campus animals" },
      { icon: "🐾", title: "Animal Shelter Visits", desc: "Regular visits to local animal shelters" },
      { icon: "🎤", title: "Expert Talks", desc: "Sessions by environmentalists and veterinarians" }
    ]
  },
  sustainability: {
    name: "♻️ Sustainability Club",
    color: "#0ea5e9",
    vision: "To inspire students to understand and apply the 17 Sustainable Development Goals (SDGs) and adopt sustainable practices in daily life.",
    objectives: [
      "Promote environmental responsibility and sustainability",
      "Reduce resource consumption and encourage recycling",
      "Spread awareness on climate change and eco-friendly living",
      "Encourage research and application of sustainable technologies"
    ],
    activities: [
      { icon: "🎉", title: "Sustainability Week Celebrations", desc: "Week-long events promoting sustainable living" },
      { icon: "👣", title: "Carbon Footprint Calculation", desc: "Activities to measure environmental impact" },
      { icon: "🌍", title: "SDG Awareness Sessions", desc: "Educational programs on sustainable development goals" },
      { icon: "♻️", title: "Best Out of Waste Competitions", desc: "Creative recycling and upcycling contests" },
      { icon: "📱", title: "Sustainability Campaigns", desc: "Awareness reels and social media content" }
    ]
  },
  electoral: {
    name: "🗳️ Electoral Club",
    color: "#f59e0b",
    vision: "To empower college students with awareness of the electoral process and foster active civic participation.",
    objectives: [
      "Encourage student participation in democratic processes",
      "Promote voter registration and electoral awareness",
      "Educate students on voting rights and responsibilities",
      "Strengthen civic consciousness among youth"
    ],
    activities: [
      { icon: "🆔", title: "Voter ID Registration Campaigns", desc: "Helping students register as voters" },
      { icon: "🗳️", title: "Mock Elections", desc: "Conducting simulated elections within campus" },
      { icon: "🎤", title: "Awareness Talks", desc: "Sessions on elections and governance" },
      { icon: "❓", title: "Quizzes on Democracy", desc: "Interactive quizzes on Indian polity" },
      { icon: "📊", title: "Electoral Surveys", desc: "Conducting awareness surveys among students" }
    ]
  },
  tulir: {
    name: "🌾 Tulir Club (Organic Farming)",
    color: "#84cc16",
    vision: "To inspire a culture of organic farming among students and encourage eco-friendly agricultural practices.",
    objectives: [
      "Educate students on the importance of organic farming",
      "Provide hands-on farming experience",
      "Promote sustainable food practices",
      "Build collaboration with organic farmers and experts"
    ],
    activities: [
      { icon: "🌱", title: "Organic Farming Plot", desc: "Establishing and maintaining campus farm plots" },
      { icon: "👨‍🌾", title: "Hands-on Workshops", desc: "Live demonstrations and practical training" },
      { icon: "🚜", title: "Farm Visits", desc: "Interaction with organic farmers" },
      { icon: "🎊", title: "Harvest Festivals", desc: "Celebrating harvest and seed festivals" },
      { icon: "📚", title: "Guest Lectures", desc: "Sessions on sustainable agriculture" }
    ]
  },
  wisewing: {
    name: "👩‍🦰 Wise Wing (Women Empowerment)",
    color: "#ec4899",
    vision: "To build a society where women are self-reliant, valued contributors to social progress, and agents of positive change.",
    mission: "To create a supportive platform for young women to lead community service initiatives while fostering inclusivity, equality, and social responsibility.",
    objectives: [
      "Create a safe and supportive community within campus",
      "Promote awareness on women's rights and health",
      "Encourage leadership and skill development",
      "Support underprivileged women and communities"
    ],
    activities: [
      { icon: "📢", title: "Awareness Campaigns", desc: "Campaigns on women's issues and rights" },
      { icon: "🏥", title: "Health Programs", desc: "Health and hygiene awareness sessions" },
      { icon: "🎗️", title: "Breast Cancer Awareness", desc: "Educational initiatives on early detection" },
      { icon: "💼", title: "Skill Development Workshops", desc: "Leadership and professional skill building" }
    ]
  },
  drugawareness: {
    name: "🚫 Drug Awareness Club",
    color: "#ef4444",
    vision: "To create a drug-free campus environment and educate students about the dangers of substance abuse.",
    objectives: [
      "Raise awareness about drug abuse and its consequences",
      "Provide support systems for affected individuals",
      "Conduct preventive education programs",
      "Collaborate with healthcare professionals and counselors"
    ],
    activities: [
      { icon: "📚", title: "Educational Sessions", desc: "Awareness talks on drug abuse prevention" },
      { icon: "🎬", title: "Documentary Screenings", desc: "Films highlighting impact of substance abuse" },
      { icon: "🤝", title: "Peer Support Programs", desc: "Creating support networks among students" },
      { icon: "👨‍⚕️", title: "Expert Consultations", desc: "Sessions with healthcare professionals" },
      { icon: "📝", title: "Awareness Campaigns", desc: "Posters, drives, and social media outreach" }
    ]
  }
};

const ClubsPage = () => {
  const location = useLocation();
  const [activeClub, setActiveClub] = useState('nature');

  useEffect(() => {
    // Get club from URL query parameter (e.g., /clubs?club=sustainability)
    const params = new URLSearchParams(location.search);
    const club = params.get('club');
    if (club && clubsData[club]) {
      setActiveClub(club);
    }
  }, [location]);

  const club = clubsData[activeClub];

  return (
    <MainLayout>
      <div className="clubs-page">
        
        {/* Club Selector */}
        <div className="club-selector">
          {Object.keys(clubsData).map((key) => (
            <button
              key={key}
              className={`club-selector-btn ${activeClub === key ? 'active' : ''}`}
              onClick={() => setActiveClub(key)}
              style={{
                borderColor: activeClub === key ? clubsData[key].color : '#003366'
              }}
            >
              {clubsData[key].name}
            </button>
          ))}
        </div>

        {/* Club Content */}
        <div className="club-content">
          
          {/* Club Header */}
          <div 
            className="club-header"
            style={{ backgroundColor: club.color }}
          >
            <h1>{club.name}</h1>
          </div>

          {/* Vision */}
          <div className="club-section vision-section">
            <h2>Vision</h2>
            <p>{club.vision}</p>
          </div>

          {/* Mission (if exists) */}
          {club.mission && (
            <div className="club-section mission-section">
              <h2>Mission</h2>
              <p>{club.mission}</p>
            </div>
          )}

          {/* Objectives */}
          <div className="club-section objectives-section">
            <h2>Objectives</h2>
            <div className="objectives-list">
              {club.objectives.map((obj, idx) => (
                <div key={idx} className="objective-item">
                  <span className="check-mark">✓</span>
                  <p>{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="club-section activities-section">
            <h2>Our Activities</h2>
            <div className="activities-grid">
              {club.activities.map((activity, idx) => (
                <div 
                  key={idx} 
                  className="activity-card"
                  style={{ borderLeftColor: club.color }}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <h3>{activity.title}</h3>
                  <p>{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div 
            className="club-cta"
            style={{ backgroundColor: club.color }}
          >
            <h2>Join {club.name}</h2>
            <p>Be part of our mission and make a meaningful impact!</p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ClubsPage;