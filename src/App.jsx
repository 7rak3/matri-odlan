import React, { useState } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import CelestialPortal from './components/CelestialPortal';
import CosmicNavbar from './components/CosmicNavbar';
import HeroUniverse from './components/HeroUniverse';
import StorySection from './components/StorySection';
import VIPTicketAndCountdown from './components/VIPTicketAndCountdown';
import ItineraryAndLocation from './components/ItineraryAndLocation';
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

  const handleReopenPortal = () => {
    setIsUniverseOpened(false);
    setIsWarping(false);
  };

  return (
    <div className="relative min-h-screen bg-[#030611] text-[#f4efe6] overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#fcedb3]">
      {/* 3D Realtime Starfield Canvas (always present in background) */}
      <StarfieldCanvas isWarping={isWarping} />

      {/* The 3D Celestial Portal Door */}
      {!isUniverseOpened && (
        <CelestialPortal
          onEnterUniverse={handleEnterUniverse}
          isOpened={isUniverseOpened}
        />
      )}

      {/* Main Wedding Universe Experience */}
      <div
        className={`transition-all duration-1000 ${
          isUniverseOpened
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <CosmicNavbar onReopenPortal={handleReopenPortal} />

        <main className="relative z-10">
          <HeroUniverse />
          <StorySection />
          <VIPTicketAndCountdown />
          <ItineraryAndLocation />
          <RSVPSection />
          <GiftRegistry />
        </main>

        <CosmicFooter />

        {/* Floating audio control bar */}
        <AudioControlBar />
      </div>
    </div>
  );
}
