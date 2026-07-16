import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { recoveryItems, RecoveryItem } from './data/items';
import { tutorialVideos } from './data/videos';
import { aboutRekova, kitOverview } from './data/about';

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
}

const initialGuestInfo: GuestInfo = { name: '', email: '', phone: '' };

function App() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecoveryItem | null>(null);
  const [planCondition, setPlanCondition] = useState<'travel' | 'legs' | 'feet' | 'inflamed' | 'stressed'>('travel');
  const [intensity, setIntensity] = useState<number>(3);
  const [formData, setFormData] = useState<GuestInfo>(initialGuestInfo);
  const [currentUser, setCurrentUser] = useState<GuestInfo | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [registeredGuests, setRegisteredGuests] = useState<GuestInfo[]>([]);
  const [activeScreen, setActiveScreen] = useState<'home' | 'academy' | 'guides' | 'kit' | 'about' | 'signups' | 'profile'>('home');

  useEffect(() => {
    const storedCurrent = localStorage.getItem('rekovaGuestInfo');
    const storedGuests = localStorage.getItem('rekovaGuestList');

    if (storedCurrent) {
      setCurrentUser(JSON.parse(storedCurrent));
    }

    if (storedGuests) {
      setRegisteredGuests(JSON.parse(storedGuests));
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const saveGuestList = (list: GuestInfo[]) => {
    localStorage.setItem('rekovaGuestList', JSON.stringify(list));
    setRegisteredGuests(list);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextGuests = [
      formData,
      ...registeredGuests.filter((guest) => guest.email.toLowerCase() !== formData.email.toLowerCase()),
    ];

    localStorage.setItem('rekovaGuestInfo', JSON.stringify(formData));
    saveGuestList(nextGuests);
    setCurrentUser(formData);
    setFormData(initialGuestInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem('rekovaGuestInfo');
    setCurrentUser(null);
  };

  const handleOpenVideo = (url: string) => {
    if (!url) return;
    const embed = getEmbedUrl(url) || url;
    setPlayingVideo(embed);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    if (url.includes('youtube.com/watch')) {
      const searchParams = new URLSearchParams(url.split('?')[1]);
      const id = searchParams.get('v');
      if (id) {
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&playsinline=1`;
      }
    }

    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match?.[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview?autoplay=1`;
      }
    }

    if (url.includes('therabody.imagerelay.com')) {
      return `${url}`;
    }

    return url;
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
      case 'academy':
        return (
          <>
            <div className="screen-grid">
              <div className="mobile-card centered-card">
                <h2>Daily Recovery Plan</h2>
                <p>Follow a simple mobile-first flow for compression, red light, and cold therapy.</p>
                <div className="card-actions card-actions-center">
                  <button type="button" onClick={() => setShowPlanModal(true)}>
                    Get My Daily Plan
                  </button>
                </div>
              </div>
              <div className="mobile-card">
                <div className="partners-section">
                  <div className="partners-heading">
                    <h3>Featured partners</h3>
                    <p>Recovery partners we work with today.</p>
                  </div>
                  <div className="partners-grid">
                    <div className="partner-card partner-therabody">
                      <img src="/partners/therabody.svg" alt="Therabody" />
                    </div>
                    <div className="partner-card partner-hyperice">
                      <img src="/partners/hyperice.svg" alt="Hyperice" />
                    </div>
                    <div className="partner-card partner-clearlight">
                      <img src="/partners/clearlight.svg" alt="Clearlight" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'guides':
        return (
          <div className="screen-grid">
            <div className="mobile-card full-width">
              <h2>Guides</h2>
              <p>Browse every recovery tutorial and equipment walkthrough from your kit.</p>
            </div>

            {tutorialVideos.length > 0 ? (
              tutorialVideos.map((video) => {
                const matched = recoveryItems.find((r) => r.videoUrl === video.url);
                const benefits = matched?.benefits ?? [];
                return (
                  <div key={video.id} className="mobile-card">
                    {matched?.imageUrl && (
                      <img src={matched.imageUrl} alt={video.title} className="guide-equipment-image" />
                    )}
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <div className="card-actions">
                      <button type="button" onClick={() => handleOpenVideo(video.url)} className="button solid">
                        Watch Tutorial
                      </button>
                    </div>
                    {benefits.length > 0 && (
                      <ul className="benefits-list">
                        {benefits.map((b, i) => (
                          <li key={`${video.id}-${i}`}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })
            ) : (
              recoveryItems.map((item) => (
                <div key={item.id} className="mobile-card">
                  <h2>{item.name}</h2>
                  <p>{item.short}</p>
                  <div className="card-actions">
                    <button type="button" onClick={() => setSelectedItem(item)}>
                      Learn more
                    </button>
                    {item.videoUrl ? (
                      <button type="button" onClick={() => handleOpenVideo(item.videoUrl ?? '')}>
                        Watch tutorial
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'kit':
        return (
          <div className="screen-grid">
            <div className="mobile-card full-width">
              <h2>About Rekova</h2>
              <p>{aboutRekova.story}</p>
              <p>
                <strong>Vision:</strong> {aboutRekova.vision}
              </p>
              <p>
                <strong>Founded:</strong> {aboutRekova.founded} — {aboutRekova.founder}
              </p>
              <div className="card-actions">
                <a href={`mailto:${aboutRekova.contact}`} className="button outline">
                  Contact us
                </a>
              </div>
            </div>

            <div className="mobile-card">
              <h2>Kit Overview</h2>
              <p>{kitOverview.description}</p>
              <ul>
                {kitOverview.highlights.map((h, i) => (
                  <li key={`highlight-${i}`}>{h}</li>
                ))}
              </ul>
            </div>

            {recoveryItems.slice(0, 4).map((item) => (
              <div key={item.id} className="mobile-card">
                <h2>{item.name}</h2>
                <p>{item.short}</p>
                <div className="card-actions">
                  <button type="button" onClick={() => setSelectedItem(item)}>
                    Learn
                  </button>
                  {item.videoUrl ? (
                    <button type="button" onClick={() => handleOpenVideo(item.videoUrl ?? '')}>
                      Watch Tutorial
                    </button>
                  ) : null}
                </div>
                {item.benefits && (
                  <ul className="benefits-list">
                    {item.benefits.map((b, i) => (
                      <li key={`${item.id}-${i}`}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      case 'signups':
        return (
          <div className="guest-items">
            {registeredGuests.length > 0 ? (
              registeredGuests.map((guest) => (
                <div key={guest.email} className="guest-item">
                  <strong>{guest.name}</strong>
                  <span>{guest.email}</span>
                  <span>{guest.phone}</span>
                </div>
              ))
            ) : (
              <div className="mobile-card">
                <h2>No signups yet</h2>
                <p>The guest list will appear here once users sign up.</p>
              </div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="screen-grid">
            <div className="mobile-card compact-card">
              <h2>Account</h2>
              <div className="profile-details">
                <p>{currentUser?.name}</p>
                <p>{currentUser?.email}</p>
                <p>{currentUser?.phone}</p>
              </div>
              <div className="profile-contact">
                <div className="profile-contact-label">Contact Us:</div>
                <a href="mailto:tyler@rekovarecovery.com" className="button outline profile-contact-button">
                  tyler@rekovarecovery.com
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const generatePlan = (condition: string, intensityLevel: number) => {
    // Use only equipment that is currently featured in the guides.
    const planMap: Record<string, Array<{ id: string; minutes: number }>> = {
      travel: [
        { id: 'jetboots-prime', minutes: 18 },
        { id: 'redlight', minutes: 10 },
        { id: 'coldplunge', minutes: 5 },
        { id: 'thermback', minutes: 10 },
        { id: 'maskglo', minutes: 8 },
      ],
      legs: [
        { id: 'jetboots-prime', minutes: 20 },
        { id: 'percussion', minutes: 6 },
        { id: 'thermback', minutes: 10 },
      ],
      feet: [
        { id: 'jetboots-prime', minutes: 15 },
        { id: 'percussion', minutes: 5 },
      ],
      inflamed: [
        { id: 'jetboots-prime', minutes: 15 },
        { id: 'redlight', minutes: 12 },
        { id: 'coldplunge', minutes: 5 },
        { id: 'thermback', minutes: 12 },
        { id: 'maskglo', minutes: 8 },
      ],
      stressed: [
        { id: 'jetboots-prime', minutes: 15 },
        { id: 'redlight', minutes: 10 },
        { id: 'coldplunge', minutes: 4 },
        { id: 'thermback', minutes: 10 },
        { id: 'maskglo', minutes: 8 },
      ],
    };

    const selected = planMap[condition] || planMap.travel;
    // Adjust durations by intensity (scale factor 0.75 - 1.25)
    const factor = 0.5 + intensityLevel / 6; // intensity 1->0.66, 5->1.33 roughly

    return selected
      .map((step) => {
        const item = recoveryItems.find((r) => r.id === step.id);
        return {
          ...step,
          minutes: Math.max(1, Math.round(step.minutes * factor)),
          name: item?.name ?? step.id,
          benefits: item?.benefits ?? [],
          videoUrl: item?.videoUrl,
        };
      });
  };

  const EquipmentModal = () => {
    if (!selectedItem) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-card modal-equipment-card">
          <div className="modal-header">
            <div>
              <h3>{selectedItem.name}</h3>
              <p>{selectedItem.short}</p>
            </div>
            <button type="button" className="close-button" onClick={() => setSelectedItem(null)}>
              ×
            </button>
          </div>
          <div className="equipment-details">
            {selectedItem.imageUrl && (
              <img src={selectedItem.imageUrl} alt={selectedItem.name} className="equipment-image" />
            )}
            <div className="equipment-info">
              <div className="equipment-section">
                <h4>What it does</h4>
                <p>{selectedItem.usage}</p>
              </div>
              <div className="equipment-section">
                <h4>Benefits</h4>
                <ul>
                  {selectedItem.benefits.map((benefit, index) => (
                    <li key={`${selectedItem.id}-benefit-${index}`}>{benefit}</li>
                  ))}
                </ul>
              </div>
              {selectedItem.videoUrl && (
                <div className="equipment-section">
                  <h4>Video walkthrough</h4>
                  <button type="button" className="button outline" onClick={() => handleOpenVideo(selectedItem.videoUrl ?? '')}>
                    Watch tutorial
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={() => setSelectedItem(null)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PlanModal = () => {
    const plan = generatePlan(planCondition, intensity);
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <h3>Your Daily Recovery Plan</h3>
              <p>Pick the situation that best matches you and adjust intensity for personalization.</p>
            </div>
            <button type="button" className="close-button" onClick={() => setShowPlanModal(false)}>
              ×
            </button>
          </div>

          <div className="modal-controls">
            <div className="condition-grid">
              <label>
                <input
                  type="radio"
                  name="condition"
                  checked={planCondition === 'travel'}
                  onChange={() => setPlanCondition('travel')}
                />
                Travel recovery
              </label>
              <label>
                <input
                  type="radio"
                  name="condition"
                  checked={planCondition === 'legs'}
                  onChange={() => setPlanCondition('legs')}
                />
                Legs aching
              </label>
              <label>
                <input
                  type="radio"
                  name="condition"
                  checked={planCondition === 'feet'}
                  onChange={() => setPlanCondition('feet')}
                />
                Feet hurting
              </label>
              <label>
                <input
                  type="radio"
                  name="condition"
                  checked={planCondition === 'inflamed'}
                  onChange={() => setPlanCondition('inflamed')}
                />
                Inflamed / swollen
              </label>
              <label>
                <input
                  type="radio"
                  name="condition"
                  checked={planCondition === 'stressed'}
                  onChange={() => setPlanCondition('stressed')}
                />
                Stressed / fatigued
              </label>
            </div>

            <div className="intensity-control">
              <div className="intensity-label">
                <span>Intensity</span>
                <strong>{intensity}</strong>
              </div>
              <input type="range" min={1} max={5} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
            </div>
          </div>

          <div className="plan-steps">
            {plan.map((step) => (
              <div key={step.id} className="plan-step">
                <div className="step-left">
                  <div className="step-title-row">
                    <strong>{step.name}</strong>
                    <span className="step-minutes">{step.minutes} min</span>
                  </div>
                  <ul>
                    {step.benefits.map((b, i) => (
                      <li key={`${step.id}-${i}`}>{b}</li>
                    ))}
                  </ul>
                </div>
                {/* tutorial button removed per request */}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={() => setShowPlanModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const VideoModal = () => {
    if (!playingVideo) return null;

    return (
      <div className="modal-overlay" onClick={() => setPlayingVideo(null)}>
        <div className="video-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setPlayingVideo(null)}>
            Close
          </button>
          <div className="video-wrapper">
            <iframe
              src={playingVideo}
              title="Tutorial video"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  };

  const screenLabel = {
    home: 'Home',
    academy: 'Academy',
    guides: 'Guides',
    kit: 'Kit',
    signups: 'Signups',
    profile: 'My Profile',
  };

  if (!currentUser) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/rekova-logo.png" alt="Rekova logo" />
            <div>
              <p>Rekova Academy</p>
              <span>Recovery onboarding</span>
            </div>
          </div>
          <h1>Sign up to access the recovery tutorials.</h1>
          <p>
            Enter your name, email, and phone to start. This keeps guest access gated and collects the data
            before users reach the training content.
          </p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(123) 456-7890"
              />
            </label>
            <button type="submit" className="button solid">
              Continue to app
            </button>
          </form>
          <div className="auth-note">
            <p>
              Guest signups are stored locally for the demo. Once backend routing is ready, we can send
              this data to your CRM or analytics service.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-app-layout">
      <div className="mobile-app-header">
        <div className="brand-inline">
          <img src="/rekova-logo.png" alt="Rekova logo" />
          <div>
            <p>Rekova Academy</p>
          </div>
        </div>
        <button type="button" className="button outline" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="phone-shell">
        <div className="phone-top" />
        <div className="phone-screen">
          <div className="top-tabbar">
            <button
              type="button"
              className={`tab-button ${activeScreen === 'home' ? 'active' : ''}`}
              onClick={() => setActiveScreen('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`tab-button ${activeScreen === 'academy' ? 'active' : ''}`}
              onClick={() => setActiveScreen('academy')}
            >
              Academy
            </button>
            <button
              type="button"
              className={`tab-button ${activeScreen === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveScreen('guides')}
            >
              Guides
            </button>
            <button
              type="button"
              className={`tab-button ${activeScreen === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveScreen('profile')}
            >
              My Profile
            </button>
          </div>
          <div className="screen-header">
            <div>
              <p className="header-subtitle">Welcome {currentUser.name}</p>
              <h2>Recovery App Dashboard</h2>
            </div>
          </div>
          <div className="screen-body">{renderScreen()}</div>

          <div className="screen-footer">
            <p>Contact: <a href="mailto:Rekovarecovery@gmail.com">Rekovarecovery@gmail.com</a></p>
          </div>
        </div>
      </div>
      {showPlanModal && <PlanModal />}
      {selectedItem && <EquipmentModal />}
      {playingVideo && <VideoModal />}
    </div>
  );
}

export default App;
