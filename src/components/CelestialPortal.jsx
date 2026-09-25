import React, { useState } from 'react';
import { Sparkles, Disc3, Radio, Zap } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CelestialPortal({ onEnterUniverse, isOpened }) {
  const [openingState, setOpeningState] = useState('idle'); // 'idle' | 'unsealing' | 'swinging' | 'warping' | 'opened'

  const handleOpen = () => {
    if (openingState !== 'idle') return;

    setOpeningState('unsealing');
    // Trigger electronic noise riser + sub drop
    cosmicAudio.playPortalElectronicDrop();

    // Stage 1: Laser blast & doors swing
    setTimeout(() => {
      setOpeningState('swinging');
    }, 900);

    // Stage 2: Hyperspace warp dive on the drop
    setTimeout(() => {
      setOpeningState('warping');
      onEnterUniverse(true);
    }, 1800);

    // Stage 3: Land in the universe, start 122 BPM melodic groove
    setTimeout(() => {
      setOpeningState('opened');
      cosmicAudio.startMusicLoop();
      onEnterUniverse(false);
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
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isWarping ? 'opacity-0 pointer-events-none scale-150' : 'opacity-100'
      }`}
      style={{
        perspective: '1200px',
        background: 'radial-gradient(ellipse at center, rgba(18,12,38,0.92) 0%, rgba(2,4,11,0.98) 75%)',
        transition: 'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease',
        transform: isWarping ? 'scale(3.2)' : 'scale(1)',
      }}
    >
      {/* Background Volumetric Lasers (Afterlife / Zamna Stage Lights) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Sky Lasers */}
        <div className="absolute -top-20 left-1/4 w-1 h-[140vh] bg-gradient-to-b from-fuchsia-500/40 via-purple-500/20 to-transparent rotate-[25deg] blur-[1px]" />
        <div className="absolute -top-20 right-1/4 w-1 h-[140vh] bg-gradient-to-b from-cyan-400/40 via-sky-500/20 to-transparent -rotate-[25deg] blur-[1px]" />
        <div className="absolute -top-20 left-1/3 w-0.5 h-[140vh] bg-gradient-to-b from-amber-400/40 to-transparent rotate-[12deg] blur-[1px]" />
        <div className="absolute -top-20 right-1/3 w-0.5 h-[140vh] bg-gradient-to-b from-amber-400/40 to-transparent -rotate-[12deg] blur-[1px]" />

        {/* Concentric Rotating Sacred Glyphs */}
        <div
          className={`w-[520px] h-[520px] md:w-[720px] md:h-[720px] rounded-full border border-fuchsia-500/20 border-dashed animate-spin-slow transition-all duration-1000 ${
            isUnsealing ? 'scale-115 border-cyan-400/70 shadow-[0_0_80px_rgba(56,189,248,0.5)]' : ''
          }`}
        />
        <div className="absolute w-[400px] h-[400px] md:w-[560px] md:h-[560px] rounded-full border border-amber-400/30 animate-spin-reverse-slow" />
        <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-cyan-400/25 animate-pulse-ring" />
      </div>

      {/* Main Portal Stage Structure */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
        {/* Top Festival Tag & Monogram */}
        <div
          className={`transition-all duration-700 ${
            isUnsealing ? 'opacity-0 -translate-y-12' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-cyan-500/20 border border-fuchsia-400/40 text-fuchsia-200 text-[11px] md:text-xs tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>122 BPM • ASTRAL ODYSSEY</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <p className="font-garamond italic text-xl md:text-2xl text-amber-100/90 mb-1 tracking-wide">
            Prepárate para cruzar al festival de amor de
          </p>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-widest gold-gradient-text uppercase mb-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            Jose & Odlan
          </h1>

          <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] text-cyan-300/80 uppercase mb-6 font-medium">
            24 • OCTUBRE • 2026 • CHILE
          </p>
        </div>

        {/* 3D Celestial Monumental Portal Door */}
        <div
          className="relative w-64 h-80 md:w-80 md:h-96 my-2 rounded-t-[150px] p-2 bg-gradient-to-b from-amber-400/30 via-purple-900/20 to-transparent border-2 border-amber-400/50 shadow-[0_0_70px_rgba(192,132,252,0.35)]"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Inside Portal Vortex Glow */}
          <div
            className={`absolute inset-2 rounded-t-[145px] overflow-hidden flex items-center justify-center transition-all duration-1000 ${
              isSwinging
                ? 'bg-gradient-to-t from-cyan-200 via-fuchsia-300 to-white shadow-[0_0_150px_rgba(255,255,255,1)]'
                : 'bg-[#04081c]'
            }`}
          >
            {isSwinging && (
              <div className="absolute inset-0 bg-white animate-pulse" />
            )}
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-fuchsia-600/40 via-cyan-400/30 to-amber-300/30 blur-2xl animate-pulse" />
          </div>

          {/* Left Door Wing */}
          <div
            className="absolute top-2 left-2 bottom-2 w-[calc(50%-8px)] rounded-tl-[145px] bg-gradient-to-b from-[#090d24] to-[#040614] border-r border-amber-400/40 border-l border-t border-b border-amber-500/40 shadow-2xl flex flex-col items-end justify-center pr-3 transition-transform duration-1000 origin-left"
            style={{
              transform: isSwinging ? 'rotateY(-115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(217,70,239,0.2), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent" />
            <div className="text-[10px] tracking-widest text-amber-300/60 font-cinzel rotate-90 my-4 select-none">
              J • O
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Right Door Wing */}
          <div
            className="absolute top-2 right-2 bottom-2 w-[calc(50%-8px)] rounded-tr-[145px] bg-gradient-to-b from-[#090d24] to-[#040614] border-l border-amber-400/40 border-r border-t border-b border-amber-500/40 shadow-2xl flex flex-col items-start justify-center pl-3 transition-transform duration-1000 origin-right"
            style={{
              transform: isSwinging ? 'rotateY(115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(56,189,248,0.2), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-fuchsia-400/80 to-transparent" />
            <div className="text-[10px] tracking-widest text-amber-300/60 font-cinzel -rotate-90 my-4 select-none">
              ∞ • ∞
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Center Monolithic Emblem */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ${
              isSwinging
                ? 'scale-150 opacity-0 filter blur-sm rotate-90'
                : isUnsealing
                ? 'scale-125 shadow-[0_0_80px_#38bdf8]'
                : 'scale-100'
            }`}
          >
            <div className="relative w-18 h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-tr from-fuchsia-600 via-amber-300 to-cyan-400 p-[2px] shadow-[0_0_35px_rgba(217,70,239,0.7)]">
              <div className="w-full h-full rounded-full bg-[#070b22] flex items-center justify-center border border-white/20">
                <Disc3
                  className={`w-9 h-9 text-amber-300 transition-transform duration-700 ${
                    isUnsealing ? 'rotate-180 scale-125 text-cyan-300' : 'animate-spin-slow'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Enter the Odyssey */}
        <div
          className={`mt-6 transition-all duration-700 ${
            isUnsealing ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={handleOpen}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-fuchsia-600/30 via-amber-400/40 to-cyan-500/30 border-2 border-amber-300 shadow-[0_0_40px_rgba(217,70,239,0.4)] hover:shadow-[0_0_60px_rgba(56,189,248,0.7)] hover:border-cyan-200 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-lg group-hover:bg-fuchsia-500/25 transition-all" />

            <div className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-cinzel text-base md:text-lg font-bold tracking-[0.25em] text-white uppercase text-gold-glow">
                ENTRAR AL UNIVERSO
              </span>
              <Sparkles className="w-5 h-5 text-cyan-300 animate-spin-slow" />
            </div>
          </button>

          <p className="font-garamond italic text-sm md:text-base text-amber-200/70 mt-3 tracking-wider">
            Toca para abrir la puerta e iniciar el viaje con sonido en vivo
          </p>
        </div>
      </div>
    </div>
  );
}
