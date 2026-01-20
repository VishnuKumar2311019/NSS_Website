import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import "./TeamsPage.css";
import MainLayout from './MainLayout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Core team verticals with detailed information - matching clubs structure
const coreTeamVerticals = {
  eventmanagement: {
    name: "🎯 Event Management",
    color: "#f59e0b",
    role: "The Event Management Vertical is responsible for the end-to-end coordination of NSS events, ensuring smooth execution and adherence to schedules, permissions, and logistics.",
    responsibilities: [
      { phase: "Before the Event", items: [
        "Confirm event date, time, and venue",
        "Coordinate with the Design Team for posters and publicity",
        "Inform Media and Photography teams",
        "Assess financial requirements and inform the Finance Team",
        "Arrange banners, tools, and permissions"
      ]},
      { phase: "After the Event", items: [
        "Ensure attendance is properly updated",
        "Confirm photo and video documentation",
        "Coordinate with Documentation Team for report submission",
        "Verify bill settlement with Finance Team"
      ]}
    ]
  },
  finance: {
    name: "💰 Finance",
    color: "#10b981",
    role: "The Finance Vertical manages budgeting, bill handling, and financial transparency for NSS activities.",
    responsibilities: [
      { phase: "Responsibilities", items: [
        "Budget planning for events",
        "Collecting and managing bills with proper bill numbers",
        "Uploading financial records",
        "Handling finances for offline events and annual camps"
      ]},
      { phase: "Key Principles", items: [
        "Responsible spending",
        "Proper documentation",
        "Accountability and transparency"
      ]}
    ]
  },
  photography: {
    name: "📸 Photography & Videography",
    color: "#06b6d4",
    role: "Documents all NSS activities visually for record-keeping and outreach.",
    responsibilities: [
      { phase: "Responsibilities", items: [
        "Capturing high-quality photos and videos during events",
        "Providing documentation photos for reports",
        "Supporting social media and archival needs"
      ]}
    ]
  },
  socialmedia: {
    name: "📱 Social Media",
    color: "#ec4899",
    role: "Manages all official NSS SSN social media handles and ensures consistent online engagement.",
    responsibilities: [
      { phase: "Responsibilities", items: [
        "Posting updates, reels, and stories for events",
        "Engaging students through quizzes and interactive content",
        "Maintaining platforms such as Instagram, Facebook, YouTube, X (Twitter), and Linktree"
      ]}
    ]
  },
  technical: {
    name: "💻 Technical",
    color: "#6366f1",
    role: "The Technical Vertical manages the official NSS SSN website and digital infrastructure.",
    responsibilities: [
      { phase: "Responsibilities", items: [
        "Developing and maintaining the NSS website",
        "Updating events, teams, and activity data",
        "Fixing technical issues and ensuring smooth operation",
        "Coordinating with other verticals to upload content",
        "Managing basic backend and database updates"
      ]}
    ]
  }
};

// Volunteers overview
const volunteerOverview = {
  description:
    "Our volunteers are the backbone of NSS at SSN College. They participate in events, help communities, and contribute to social welfare. Every volunteer is encouraged to actively engage in multiple initiatives and report their hours.",
  responsibilities: [
    "Participate in NSS events and initiatives.",
    "Support core verticals during events.",
    "Maintain ethical conduct and teamwork.",
    "Log attendance and contribution hours."
  ],
};

// Sample monthly contributions
const monthlyContributions = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  datasets: [
    {
      label: "Hours Contributed",
      backgroundColor: "#ffffff",
      data: [120, 100, 80, 150, 200, 170, 190, 210, 180, 160, 140, 130],
    }
  ]
};

const TeamsPage = () => {
  const [selectedTab, setSelectedTab] = useState("core");
  const [showAttendancePrompt, setShowAttendancePrompt] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [attendanceAccess, setAttendanceAccess] = useState(false);
  const [activeVertical, setActiveVertical] = useState('eventmanagement');

  const handleAttendanceSubmit = () => {
    if (passcode === "SSN2025") {
      setAttendanceAccess(true);
      setShowAttendancePrompt(false);
      setPasscode("");
    } else {
      alert("Incorrect passcode. Access denied.");
      setPasscode("");
    }
  };

  const vertical = coreTeamVerticals[activeVertical];

  return (
    <MainLayout>

      <div className="teams-page">
        <h2>NSS Teams</h2>

        {/* Tabs */}
        <div className="team-tabs">
          <button
            className={selectedTab === "core" ? "active" : ""}
            onClick={() => setSelectedTab("core")}
          >
            Core Team
          </button>
          <button
            className={selectedTab === "volunteers" ? "active" : ""}
            onClick={() => setSelectedTab("volunteers")}
          >
            Volunteers
          </button>
        </div>

        {/* Core Team - New UI matching Clubs */}
        {selectedTab === "core" && (
          <div className="core-team-new">
            
            {/* Intro */}
            <div className="core-intro-new">
              <p>
                The National Service Scheme (NSS) at SSN College of Engineering operates through 
                well-defined verticals to ensure that every activity is planned, executed, documented, 
                and communicated efficiently. Each vertical plays a crucial role in transforming service 
                ideas into impactful action while maintaining discipline, transparency, and professionalism.
              </p>
            </div>

            {/* Vertical Selector */}
            <div className="vertical-selector">
              {Object.keys(coreTeamVerticals).map((key) => (
                <button
                  key={key}
                  className={`vertical-selector-btn ${activeVertical === key ? 'active' : ''}`}
                  onClick={() => setActiveVertical(key)}
                  style={{
                    borderColor: activeVertical === key ? coreTeamVerticals[key].color : '#003366'
                  }}
                >
                  {coreTeamVerticals[key].name}
                </button>
              ))}
            </div>

            {/* Vertical Content */}
            <div className="vertical-content">
              
              {/* Vertical Header */}
              <div 
                className="vertical-content-header"
                style={{ backgroundColor: vertical.color }}
              >
                <h1>{vertical.name}</h1>
              </div>

              {/* Role/Overview */}
              <div className="vertical-section-content role-section">
                <h2>Role Overview</h2>
                <p>{vertical.role}</p>
              </div>

              {/* Responsibilities */}
              <div className="vertical-section-content responsibilities-section">
                <h2>Responsibilities</h2>
                {vertical.responsibilities.map((resp, idx) => (
                  <div key={idx} className="responsibility-block">
                    <h3>{resp.phase}</h3>
                    <div className="responsibility-list">
                      {resp.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="responsibility-item">
                          <span className="check-mark">✓</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Join CTA */}
              <div 
                className="vertical-cta"
                style={{ backgroundColor: vertical.color }}
              >
                <h2>Join {vertical.name}</h2>
                <p>Be part of our operational excellence and make every NSS event successful!</p>
              </div>

            </div>
          </div>
        )}

        {/* Volunteers */}
        {selectedTab === "volunteers" && (
          <div className="volunteers-section">

            <div className="volunteer-intro">
              <p>{volunteerOverview.description}</p>
              <h4>Responsibilities</h4>
              <ul>
                {volunteerOverview.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="overview-cards">
              <div className="card">
                <h3>Total Volunteers</h3>
                <p>1300+</p>
              </div>
              <div className="card">
                <h3>Total Hours Contributed</h3>
                <p>1000+</p>
              </div>
              <div className="card">
                <h3>Events Organized</h3>
                <p>250+</p>
              </div>
            </div>

            {/* Monthly Contributions Graph */}
            <div className="contributions-graph">
              <h4>Monthly Contributions of NSS Club</h4>
              <Bar
                data={monthlyContributions}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: true, text: "Hours Contributed per Month" },
                  },
                }}
              />
            </div>

            {/* Attendance Section */}
            <div className="attendance-section">
              {!attendanceAccess ? (
                <button
                  className="attendance-btn"
                  onClick={() => setShowAttendancePrompt(true)}
                >
                  View Attendance Sheets
                </button>
              ) : (
                <div className="attendance-links">
                  <h4>Select Year</h4>

                  <a
                    href="#"
                    className="attendance-btn"
                  >
                    📘 First Year Attendance
                  </a>

                  <a
                    href="https://docs.google.com/spreadsheets/d/1HBx1zccr7rSksv-H9IbO2U292MaUhar70t-PUkQ_Ulc/edit?gid=1040787099#gid=1040787099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attendance-btn"
                  >
                    📗 Second Year Attendance
                  </a>

                  <a
                    href="https://docs.google.com/spreadsheets/d/1DFk62phy0veBHnJj3saI96LiyS-zV3GYp92mnYSgt5k/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attendance-btn"
                  >
                    📙 Third Year Attendance
                  </a>
                </div>
              )}

              {showAttendancePrompt && (
                <div className="attendance-modal">
                  <div className="modal-content">
                    <h4>Enter Passcode</h4>
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter passcode"
                    />
                    <div className="modal-buttons">
                      <button onClick={handleAttendanceSubmit}>Submit</button>
                      <button onClick={() => setShowAttendancePrompt(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

    </MainLayout>
  );
};

export default TeamsPage;