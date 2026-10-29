import React, { useState, useEffect } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import CelestialPortal from './components/CelestialPortal';
import HeroUniverse from './components/HeroUniverse';
import VIPTicketAndCountdown from './components/VIPTicketAndCountdown';
import DrivePhotoUpload from './components/DrivePhotoUpload';
import RSVPSection from './components/RSVPSection';
import GiftRegistry from './components/GiftRegistry';
import CosmicFooter from './components/CosmicFooter';
import AudioControlBar from './components/AudioControlBar';
import CoupleDashboard from './components/CoupleDashboard';

export default function App() {
  const [isUniverseOpened, setIsUniverseOpened] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return (
        params.get('dashboard') === '1' ||
        params.get('dashboard') === 'true' ||
        window.location.hash === '#dashboard'
      );
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setIsDashboardOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleEnterUniverse = (warpingActive) => {
    setIsWarping(warpingActive);
    if (!warpingActive) {
      setIsUniverseOpened(true);
    }
  };

  const handleOpenDashboard = () => {
    setIsDashboardOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDashboard = () => {
    setIsDashboardOpen(false);
    setIsUniverseOpened(true);
    if (window.location.hash === '#dashboard') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#6e6b41] text-[#FAE7C9] overflow-x-hidden selection:bg-[#E1C78F]/40 selection:text-[#FAE7C9]">
      {/* Background Golden Motes & Ethereal Botanical Ambient Canvas */}
      <StarfieldCanvas isWarping={isWarping} />

      {isDashboardOpen ? (
        <CoupleDashboard onClose={handleCloseDashboard} />
      ) : (
        <>
          {/* Welcome Sealed Botanical Invitation Portal */}
          {!isUniverseOpened && (
            <CelestialPortal
              onEnterUniverse={handleEnterUniverse}
              onOpenDashboard={handleOpenDashboard}
              isOpened={isUniverseOpened}
            />
          )}

          {/* Main Wedding Experience */}
          <div
            className={`transition-all duration-1000 ${
              isUniverseOpened
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <main className="relative z-10">
              {/* 1. Hero: Exact Invitation Card from PDF + Exploration Buttons */}
              <HeroUniverse />

              {/* 2. Date & Real-time Countdown ("ME ENCANTAAAAA") + Venue Casona Los Nogales + Nota con Cariño */}
              <VIPTicketAndCountdown />

              {/* 3. Shared Google Drive Photos & QR Code ("ESTÁ MUY BUENO 👌") */}
              <DrivePhotoUpload />

              {/* 4. Gift Registry: Novios Paris */}
              <GiftRegistry />

              {/* 5. RSVP: Confirma Tu Asistencia (Individual 1 Person + Safe Companion Option) */}
              <RSVPSection />
            </main>

            {/* Botanical Footer */}
            <CosmicFooter onOpenDashboard={handleOpenDashboard} />
          </div>

          {/* Floating Audio Control Bar */}
          {isUniverseOpened && <AudioControlBar />}
        </>
      )}
    </div>
  );
}
