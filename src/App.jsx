import React, { useState, useEffect } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import CelestialPortal from './components/CelestialPortal';
import CosmicNavbar from './components/CosmicNavbar';
import HeroUniverse from './components/HeroUniverse';
import StorySection from './components/StorySection';
import LoveStoryGallery from './components/LoveStoryGallery';
import VIPTicketAndCountdown from './components/VIPTicketAndCountdown';
import ItineraryAndLocation from './components/ItineraryAndLocation';
import RSVPSection from './components/RSVPSection';
import GiftRegistry from './components/GiftRegistry';
import CosmicFooter from './components/CosmicFooter';
import AudioControlBar from './components/AudioControlBar';
import { cosmicAudio } from './utils/audioEngine';

export default function App() {
  const [isUniverseOpened, setIsUniverseOpened] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [beatPulse, setBeatPulse] = useState(0);

  // Sync universe visual pulsation with 122 BPM house kicks
  useEffect(() => {
    const unsub = cosmicAudio.subscribeBeat(({ isKick }) => {
      if (isKick) {
        setBeatPulse(1);
        setTimeout(() => setBeatPulse(0), 120);
      }
    });
    return unsub;
  }, []);

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
    <div className="relative min-h-screen bg-[#02040b] text-[#f4efe6] overflow-x-hidden selection:bg-[#fae084]/30 selection:text-[#fae084]">
      {/* 3D Realtime Volumetric Nebula & Starfield Canvas */}
      <StarfieldCanvas isWarping={isWarping} beatPulse={beatPulse} />

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
          <LoveStoryGallery />
          <VIPTicketAndCountdown />
          <ItineraryAndLocation />
          <RSVPSection />
          <GiftRegistry />
        </main>

        <CosmicFooter />

        {/* Floating minimal audio control bar */}
        <AudioControlBar />
      </div>
    </div>
  );
}
