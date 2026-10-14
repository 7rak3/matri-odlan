import React, { useState } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import CelestialPortal from './components/CelestialPortal';
import HeroUniverse from './components/HeroUniverse';
import VIPTicketAndCountdown from './components/VIPTicketAndCountdown';
import DrivePhotoUpload from './components/DrivePhotoUpload';
import RSVPSection from './components/RSVPSection';
import GiftRegistry from './components/GiftRegistry';
import CosmicFooter from './components/CosmicFooter';
import AudioControlBar from './components/AudioControlBar';

export default function App() {
  const [isUniverseOpened, setIsUniverseOpened] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  const handleEnterUniverse = (warpingActive) => {
    setIsWarping(warpingActive);
    if (!warpingActive) {
      setIsUniverseOpened(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#171d13] text-[#f7f5ee] overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Background Golden Motes & Ethereal Botanical Ambient Canvas */}
      <StarfieldCanvas isWarping={isWarping} />

      {/* Welcome Sealed Botanical Invitation Portal */}
      {!isUniverseOpened && (
        <CelestialPortal
          onEnterUniverse={handleEnterUniverse}
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
        <CosmicFooter />
      </div>

      {/* Floating Audio Control Bar */}
      {isUniverseOpened && <AudioControlBar />}
    </div>
  );
}
