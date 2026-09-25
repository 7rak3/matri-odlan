import React, { useState } from 'react';
import { Heart, Sparkles, Key } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CelestialPortal({ onEnterUniverse, isOpened }) {
  const [openingState, setOpeningState] = useState('idle'); // 'idle' | 'unsealing' | 'swinging' | 'warping' | 'opened'

  const handleOpen = () => {
    if (openingState !== 'idle') return;

    setOpeningState('unsealing');
    // Emotional piano glissando & bell
    cosmicAudio.playWeddingPortalOpen();

    // Stage 1: Doors swing open in 3D
    setTimeout(() => {
      setOpeningState('swinging');
    }, 900);

    // Stage 2: Smooth camera dive into golden light
    setTimeout(() => {
      setOpeningState('warping');
      onEnterUniverse(true);
    }, 1800);

    // Stage 3: Arrive at wedding universe, start emotional romantic piano
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
        background: 'radial-gradient(ellipse at center, rgba(35,22,12,0.92) 0%, rgba(3,5,15,0.98) 75%)',
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
        transform: isWarping ? 'scale(3.2)' : 'scale(1)',
      }}
    >
      {/* Background Sacred Concentric Rings & Golden Starlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Soft Golden Halo */}
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-amber-500/10 blur-3xl animate-pulse" />

        {/* Outer Filigree Ring */}
        <div
          className={`w-[480px] h-[480px] md:w-[680px] md:h-[680px] rounded-full border border-amber-300/25 border-dashed animate-spin-slow transition-all duration-1000 ${
            isUnsealing ? 'scale-110 border-amber-200/70 shadow-[0_0_80px_rgba(250,224,132,0.5)]' : ''
          }`}
        />
        {/* Middle Sacred Ring */}
        <div className="absolute w-[360px] h-[360px] md:w-[520px] md:h-[520px] rounded-full border border-amber-400/30 animate-spin-reverse-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fae084]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fae084]" />
        </div>
      </div>

      {/* Main Wedding Monumental Portal */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
        {/* Heading */}
        <div
          className={`transition-all duration-700 ${
            isUnsealing ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs tracking-[0.3em] uppercase mb-4 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>NUESTRO MATRIMONIO</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <p className="font-garamond italic text-xl md:text-2xl text-amber-100/90 mb-1 tracking-wide">
            Tenemos el honor de invitarte a celebrar la unión de
          </p>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest gold-gradient-text uppercase mb-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            Jose & Odlan
          </h1>

          <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] text-amber-200/80 uppercase mb-6 font-light">
            SÁBADO 24 • OCTUBRE • 2026
          </p>
        </div>

        {/* 3D Wedding Sanctuary Arch Doors */}
        <div
          className="relative w-64 h-80 md:w-80 md:h-96 my-2 rounded-t-[150px] p-2.5 bg-gradient-to-b from-amber-300/35 via-amber-900/20 to-transparent border-2 border-amber-400/60 shadow-[0_0_70px_rgba(212,175,55,0.3)]"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Internal Warm Candlelight / Golden Glow behind doors */}
          <div
            className={`absolute inset-2 rounded-t-[145px] overflow-hidden flex items-center justify-center transition-all duration-1000 ${
              isSwinging
                ? 'bg-gradient-to-t from-amber-200 via-amber-100 to-white shadow-[0_0_150px_rgba(255,245,214,1)]'
                : 'bg-[#080d24]'
            }`}
          >
            {isSwinging && (
              <div className="absolute inset-0 bg-white animate-pulse" />
            )}
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-400/20 to-amber-200/40 blur-2xl animate-pulse" />
          </div>

          {/* Left Door Wing */}
          <div
            className="absolute top-2 left-2 bottom-2 w-[calc(50%-8px)] rounded-tl-[145px] bg-gradient-to-b from-[#0c1228] to-[#050817] border-r border-amber-400/40 border-l border-t border-b border-amber-500/50 shadow-2xl flex flex-col items-end justify-center pr-3 transition-transform duration-1000 origin-left"
            style={{
              transform: isSwinging ? 'rotateY(-115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(212,175,55,0.2), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
            <div className="text-[11px] tracking-widest text-amber-300/70 font-cinzel rotate-90 my-4 select-none">
              JOSE
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Right Door Wing */}
          <div
            className="absolute top-2 right-2 bottom-2 w-[calc(50%-8px)] rounded-tr-[145px] bg-gradient-to-b from-[#0c1228] to-[#050817] border-l border-amber-400/40 border-r border-t border-b border-amber-500/50 shadow-2xl flex flex-col items-start justify-center pl-3 transition-transform duration-1000 origin-right"
            style={{
              transform: isSwinging ? 'rotateY(115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(212,175,55,0.2), transparent 70%)',
            }}
          >
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
            <div className="text-[11px] tracking-widest text-amber-300/70 font-cinzel -rotate-90 my-4 select-none">
              ODLAN
            </div>
            <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent" />
          </div>

          {/* Center Emblem: Two Interlocked 3D Golden Wedding Rings */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ${
              isSwinging
                ? 'scale-150 opacity-0 filter blur-sm rotate-45'
                : isUnsealing
                ? 'scale-125 shadow-[0_0_80px_#fae084]'
                : 'scale-100'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Left Ring */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-amber-300 shadow-[0_0_20px_rgba(250,224,132,0.8)] -mr-4 bg-transparent animate-spin-slow" />
              {/* Right Ring */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-amber-200 shadow-[0_0_20px_rgba(250,224,132,0.8)] bg-transparent animate-spin-reverse-slow" />
              {/* Heart Sparkle in Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 drop-shadow-[0_0_8px_#fb7185] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Abrir las Puertas de Nuestra Boda */}
        <div
          className={`mt-6 transition-all duration-700 ${
            isUnsealing ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={handleOpen}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-500/30 border-2 border-amber-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(250,224,132,0.7)] hover:border-amber-100 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-lg group-hover:bg-amber-400/25 transition-all" />

            <div className="relative flex items-center gap-3">
              <Key className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-cinzel text-base md:text-lg font-bold tracking-[0.25em] text-white uppercase text-gold-glow">
                ABRIR NUESTRA BODA
              </span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
          </button>

          <p className="font-garamond italic text-sm md:text-base text-amber-200/80 mt-3 tracking-wider">
            Toca el sello para abrir las puertas y comenzar la experiencia con música en vivo
          </p>
        </div>
      </div>
    </div>
  );
}
