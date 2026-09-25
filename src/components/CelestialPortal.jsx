import React, { useState } from 'react';
import { Sparkles, Key, Compass, Star } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CelestialPortal({ onEnterUniverse, isOpened }) {
  const [openingState, setOpeningState] = useState('idle'); // 'idle' | 'unsealing' | 'swinging' | 'warping' | 'opened'

  const handleOpen = () => {
    if (openingState !== 'idle') return;

    // Step 1: Unsealing & audio launch
    setOpeningState('unsealing');
    cosmicAudio.playPortalOpenSound();

    // Step 2: Doors swing open in 3D
    setTimeout(() => {
      setOpeningState('swinging');
    }, 700);

    // Step 3: Hyperspace warp acceleration
    setTimeout(() => {
      setOpeningState('warping');
      onEnterUniverse(true); // triggers starfield hyperspace mode
    }, 1700);

    // Step 4: Finished entering universe
    setTimeout(() => {
      setOpeningState('opened');
      cosmicAudio.startAmbientMusic();
      onEnterUniverse(false); // return starfield to normal speed
    }, 3200);
  };

  if (openingState === 'opened' || isOpened) {
    return null;
  }

  const isUnsealing = openingState === 'unsealing';
  const isSwinging = openingState === 'swinging' || openingState === 'warping';
  const isWarping = openingState === 'warping';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isWarping ? 'opacity-0 pointer-events-none scale-150' : 'opacity-100'
      }`}
      style={{
        perspective: '1200px',
        background: 'radial-gradient(ellipse at center, rgba(14,24,56,0.9) 0%, rgba(3,6,17,0.98) 75%)',
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
        transform: isWarping ? 'scale(3)' : 'scale(1)',
      }}
    >
      {/* Background Sacred Geometric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Ring */}
        <div
          className={`w-[480px] h-[480px] md:w-[650px] md:h-[650px] rounded-full border border-amber-400/20 border-dashed animate-spin-slow transition-all duration-1000 ${
            isUnsealing ? 'scale-110 border-amber-300/60 shadow-[0_0_50px_rgba(212,175,55,0.4)]' : ''
          }`}
        />
        {/* Middle Ring with Cardinal Points */}
        <div
          className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full border border-amber-300/30 animate-spin-reverse-slow"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fae084]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fae084]" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fae084]" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fae084]" />
        </div>
        {/* Inner Pulsing Ring */}
        <div className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border border-amber-200/20 animate-pulse-ring" />
      </div>

      {/* Main Celestial Portal Arch Frame */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
        {/* Top Monogram & Astronomical Heading */}
        <div
          className={`transition-all duration-700 ${
            isUnsealing ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] md:text-xs tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-300" />
            Portal Interdimensional
          </div>

          <p className="font-garamond italic text-xl md:text-2xl text-amber-100/80 mb-1 tracking-wide">
            Estás a punto de ingresar al universo de
          </p>

          <h1 className="font-cinzel text-4xl md:text-6xl font-bold tracking-widest gold-gradient-text uppercase mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            Jose & Odlan
          </h1>

          <p className="font-montserrat text-xs md:text-sm tracking-[0.25em] text-amber-200/60 uppercase mb-8">
            24 • OCTUBRE • 2026
          </p>
        </div>

        {/* 3D The Celestial Monument Door */}
        <div
          className="relative w-64 h-80 md:w-80 md:h-96 my-2 rounded-t-[140px] p-2 bg-gradient-to-b from-amber-500/25 via-amber-900/10 to-transparent border border-amber-400/40 shadow-[0_0_60px_rgba(212,175,55,0.25)]"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Internal Portal Void / Light Beam Behind Doors */}
          <div
            className={`absolute inset-2 rounded-t-[135px] overflow-hidden flex items-center justify-center transition-all duration-1000 ${
              isSwinging
                ? 'bg-gradient-to-t from-amber-100 via-amber-200 to-white shadow-[0_0_120px_rgba(255,255,255,0.9)]'
                : 'bg-[#05091a]'
            }`}
          >
            {isSwinging && (
              <div className="absolute inset-0 bg-white animate-pulse" />
            )}
            <div className="absolute w-32 h-32 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          </div>

          {/* Left Door Leaf */}
          <div
            className="absolute top-2 left-2 bottom-2 w-[calc(50%-8px)] rounded-tl-[135px] bg-[#070e24] border-r border-amber-400/30 border-l border-t border-b border-amber-500/40 shadow-2xl flex flex-col items-end justify-center pr-3 transition-transform duration-1000 origin-left"
            style={{
              transform: isSwinging ? 'rotateY(-110deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(212,175,55,0.15), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
            <div className="text-[10px] tracking-widest text-amber-400/40 font-cinzel rotate-90 my-4 select-none">
              J • O
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Right Door Leaf */}
          <div
            className="absolute top-2 right-2 bottom-2 w-[calc(50%-8px)] rounded-tr-[135px] bg-[#070e24] border-l border-amber-400/30 border-r border-t border-b border-amber-500/40 shadow-2xl flex flex-col items-start justify-center pl-3 transition-transform duration-1000 origin-right"
            style={{
              transform: isSwinging ? 'rotateY(110deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(212,175,55,0.15), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
            <div className="text-[10px] tracking-widest text-amber-400/40 font-cinzel -rotate-90 my-4 select-none">
              ∞ • ∞
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Central Golden Seal Lock (Breaks and flies forward upon open) */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ${
              isSwinging
                ? 'scale-150 opacity-0 filter blur-sm rotate-45'
                : isUnsealing
                ? 'scale-125 shadow-[0_0_60px_#f5cf53]'
                : 'scale-100'
            }`}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-[#94741c] via-[#f7d566] to-[#fff3c4] p-[2px] shadow-[0_0_25px_rgba(212,175,55,0.6)]">
              <div className="w-full h-full rounded-full bg-[#0a122e] flex items-center justify-center border border-amber-300/40">
                <Star
                  className={`w-7 h-7 text-amber-300 transition-transform duration-700 ${
                    isUnsealing ? 'rotate-180 scale-125 text-white' : 'animate-pulse'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* The Action Button */}
        <div
          className={`mt-6 transition-all duration-700 ${
            isUnsealing ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={handleOpen}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-300/60 shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:border-amber-200 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Ambient Button Glow Layer */}
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-md group-hover:bg-amber-400/25 transition-all" />

            <div className="relative flex items-center gap-3">
              <Key className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-cinzel text-base md:text-lg font-semibold tracking-[0.25em] text-white uppercase text-gold-glow">
                ABRIR EL UNIVERSO
              </span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
          </button>

          <p className="font-garamond italic text-sm text-amber-200/60 mt-3 tracking-wider">
            Toca el sello para abrir las puertas de nuestro destino
          </p>
        </div>
      </div>
    </div>
  );
}
