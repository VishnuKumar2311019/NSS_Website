import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnnualCampPage.css';
import MainLayout from './MainLayout';

/* ============================================================
   YEAR-SPECIFIC CAMP DATA
   Add your day descriptions and image paths per year here.
   Images should live in:
     src/assets/camp-gallery/2024-2025/day1-photo1.jpg  etc.
     src/assets/camp-gallery/2025-2026/day1-photo1.jpg  etc.
============================================================ */

const campData = {
  '2024-2025': {
    label: '2024–2025',
    dateRange: '24.02.2024 – 01.03.2024',
    village: 'Thandalam Village',
    volunteers: 70,
    days: [
      {
        id: 'day1',
        title: 'Day 1 – Team Formation & Village Survey',
        description:
          'Volunteers conducted village surveys covering 85 households and began school renovation activities while building strong community connections.',
      },
      {
        id: 'day2',
        title: 'Day 2 – Saplings & Community Drive',
        description:
          'Saplings were planted in schools and garbage clearance drives were conducted, strengthening environmental awareness.',
      },
      {
        id: 'day3',
        title: 'Day 3 – Empowering Students & Civic Engagement',
        description:
          'Infrastructure improvements continued, and a voter ID registration drive helped register around 100 individuals.',
      },
      {
        id: 'day4',
        title: 'Day 4 – School Renovation & Youth Discussion',
        description:
          'Classroom renovations were completed and interactive sessions were conducted on social awareness.',
      },
      {
        id: 'day5',
        title: 'Day 5 – Lake Cleanup & Fun Activities',
        description:
          'A lake cleanup drive was conducted with EFI, followed by fun activities to boost volunteer morale.',
      },
      {
        id: 'day6',
        title: 'Day 6 – Science Expo & Cultural Heritage',
        description:
          'A science exhibition and cultural visit strengthened both academic and cultural learning.',
      },
      {
        id: 'day7',
        title: 'Day 7 – Valedictory & Reflections',
        description:
          'The valedictory ceremony celebrated volunteer contributions and concluded the camp on a positive note.',
      },
    ],
    conclusion:
      'The NSS Annual Camp 2024–2025 fostered leadership, service, and community bonding, leaving a lasting impact on both volunteers and villagers.',
    /* 
      HOW TO ADD PHOTOS
      -----------------
      Place images inside: src/assets/camp-gallery/2024-2025/
      Name them with a "dayN-" prefix so they auto-group, e.g.:
        day1-survey.jpg, day1-meeting.jpg
        day2-planting.jpg
        ...or just: photo1.jpg, photo2.jpg (they'll appear in the All Photos tab)

      Then uncomment and fill the array below, OR keep it empty
      and the page will attempt to auto-load via require.context.
    */
    // manualPhotos: [
    //   { src: require('../assets/camp-gallery/2024-2025/day1-survey.jpg'), day: 'day1', caption: 'Village Survey' },
    // ],
  },

  '2025-2026': {
    label: '2025–2026',
    dateRange: 'TBA',
    village: 'TBA',
    volunteers: 0,
    days: [
      {
        id: 'day1',
        title: 'Day 1',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day2',
        title: 'Day 2',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day3',
        title: 'Day 3',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day4',
        title: 'Day 4',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day5',
        title: 'Day 5',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day6',
        title: 'Day 6',
        description: 'Details will be updated after the camp.',
      },
      {
        id: 'day7',
        title: 'Day 7',
        description: 'Details will be updated after the camp.',
      },
    ],
    conclusion:
      'Camp details and photos will be added once the 2025–2026 Annual Camp is concluded.',
  },
};

/* ============================================================
   HELPER – try to load images from a year-specific folder
   using webpack's require.context. Falls back to an empty
   array if the folder doesn't exist yet.
============================================================ */
function loadImagesForYear(year) {
  try {
    const ctx = require.context(
      '../assets/camp-gallery',
      true,                          // search sub-folders
      /\.(png|jpe?g|svg|webp)$/
    );
    return ctx
      .keys()
      .filter((k) => k.includes(`/${year}/`))
      .map((k) => ({ src: ctx(k), key: k }));
  } catch {
    return [];
  }
}

/* Derive which day an image belongs to from its filename */
function dayOfImage(key) {
  const match = key.match(/day(\d+)/i);
  return match ? `day${match[1]}` : null;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
const AnnualCampPage = () => {
  const { year } = useParams();           // e.g. "2024-2025"
  const navigate = useNavigate();

  const data = campData[year];

  /* If unknown year, show a friendly message */
  if (!data) {
    return (
      <MainLayout>
        <div className="camp-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#003366' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Year Not Found</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              No camp data found for <strong>{year}</strong>.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#003366', color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
                fontSize: '1rem', fontWeight: '600',
              }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* Load photos for this year */
  const allImages = loadImagesForYear(year);

  /* Active day filter: null = show all */
  const [activeDay, setActiveDay] = useState(null);
  const [lightbox, setLightbox] = useState(null); // src string or null

  const visibleImages =
    activeDay === null
      ? allImages
      : allImages.filter((img) => dayOfImage(img.key) === activeDay);

  const isUpcoming = data.volunteers === 0;

  return (
    <MainLayout>
      <div className="camp-container">

        {/* ===== SIDEBAR ===== */}
        <aside className="camp-sidebar">
          {/* Year badge */}
          <div className="camp-year-badge">{data.label}</div>

          <nav>
            <ul>
              <li><a href="#overview">Overview</a></li>
              {data.days.map((d, i) => (
                <li key={d.id}>
                  <a href={`#${d.id}`}>Day {i + 1}</a>
                </li>
              ))}
              <li><a href="#conclusion">Conclusion</a></li>
              <li><a href="#gallery">📸 Gallery</a></li>
            </ul>
          </nav>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="camp-content">

          {/* OVERVIEW */}
          <section id="overview">
            <h2>Overview – NSS Annual Camp {data.label}</h2>
            {isUpcoming ? (
              <div className="camp-upcoming-banner">
                🚀 This camp is upcoming. Details and photos will be updated soon!
              </div>
            ) : (
              <div className="camp-meta-grid">
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">📅</span>
                  <div>
                    <strong>Dates</strong>
                    <p>{data.dateRange}</p>
                  </div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{data.village}</p>
                  </div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">👥</span>
                  <div>
                    <strong>Volunteers</strong>
                    <p>{data.volunteers}+</p>
                  </div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">🗓️</span>
                  <div>
                    <strong>Duration</strong>
                    <p>7 Days</p>
                  </div>
                </div>
              </div>
            )}
            <p style={{ marginTop: '1.2rem' }}>
              <strong>SSN COLLEGE OF ENGINEERING</strong> — Kalavakkam – 603110<br />
              NSS Annual Camp {data.label} conducted by the NSS Unit of SSN and Anna University.
            </p>
          </section>

          {/* DAY-WISE SECTIONS */}
          {data.days.map((day, i) => {
            const dayImages = allImages.filter(
              (img) => dayOfImage(img.key) === day.id
            );
            return (
              <section key={day.id} id={day.id}>
                <h2>{day.title}</h2>
                <p>{day.description}</p>

                {dayImages.length > 0 && (
                  <div className="gallery-grid" style={{ marginTop: '1.2rem' }}>
                    {dayImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.src}
                        alt={`Day ${i + 1} – Photo ${idx + 1}`}
                        onClick={() => setLightbox(img.src)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                )}

                {dayImages.length === 0 && !isUpcoming && (
                  <p className="camp-no-photos">
                    📷 Photos for Day {i + 1} will appear here once uploaded to{' '}
                    <code>src/assets/camp-gallery/{year}/day{i + 1}-*.jpg</code>
                  </p>
                )}
              </section>
            );
          })}

          {/* CONCLUSION */}
          <section id="conclusion">
            <h2>Conclusion</h2>
            <p>{data.conclusion}</p>
          </section>

          {/* GALLERY DASHBOARD */}
          <section id="gallery">
            <h2>📸 Photo Gallery – {data.label}</h2>

            {/* Day filter tabs */}
            <div className="camp-gallery-tabs">
              <button
                className={`camp-gallery-tab ${activeDay === null ? 'active' : ''}`}
                onClick={() => setActiveDay(null)}
              >
                All Photos {allImages.length > 0 && `(${allImages.length})`}
              </button>
              {data.days.map((d, i) => {
                const count = allImages.filter(
                  (img) => dayOfImage(img.key) === d.id
                ).length;
                return (
                  <button
                    key={d.id}
                    className={`camp-gallery-tab ${activeDay === d.id ? 'active' : ''}`}
                    onClick={() => setActiveDay(d.id)}
                  >
                    Day {i + 1} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Photo grid */}
            {visibleImages.length > 0 ? (
              <div className="gallery-grid camp-gallery-grid">
                {visibleImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={`Camp photo ${idx + 1}`}
                    onClick={() => setLightbox(img.src)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            ) : (
              <div className="camp-empty-gallery">
                {isUpcoming ? (
                  <>
                    <span style={{ fontSize: '3rem' }}>🏕️</span>
                    <p>Photos will be added once the {data.label} camp is completed.</p>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '3rem' }}>📂</span>
                    <p>
                      No photos loaded yet. Add images to{' '}
                      <code>src/assets/camp-gallery/{year}/</code> and they will
                      appear here automatically.
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                      Tip: prefix filenames with <code>dayN-</code> (e.g.{' '}
                      <code>day1-survey.jpg</code>) to enable day-wise filtering.
                    </p>
                  </>
                )}
              </div>
            )}
          </section>

        </main>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div
          className="camp-lightbox-overlay"
          onClick={() => setLightbox(null)}
        >
          <div className="camp-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="camp-lightbox-close"
              onClick={() => setLightbox(null)}
            >
              ✖
            </button>
            <img src={lightbox} alt="Camp preview" className="camp-lightbox-img" />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AnnualCampPage;
