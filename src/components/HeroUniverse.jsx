import React from 'react';
import { Calendar, MapPin, Camera, Gift, Heart, ArrowDown } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function HeroUniverse() {
  const scrollTo = (id) => {
    cosmicAudio.playChime(1.2);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-8 pb-20 px-4 text-center z-10">
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
        
        {/* Main Wedding Invitation Card — Exact Match to PDF with new palette */}
        <div
          className="relative w-full max-w-xl mx-auto rounded-[32px] p-8 sm:p-14 md:p-16 text-center shadow-[0_25px_70px_rgba(45,42,20,0.55)] border-2 border-[#FAE7C9]/45 transition-all duration-500 hover:shadow-[0_30px_90px_rgba(225,199,143,0.3)]"
          style={{
            backgroundColor: '#5c5936',
            backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(176, 146, 106, 0.32) 0%, rgba(87, 84, 50, 0.96) 100%)',
          }}
        >
          {/* Subtle inner border frame */}
          <div className="absolute inset-3 sm:inset-4 rounded-[24px] border border-[#FAE7C9]/30 pointer-events-none" />

          {/* O | M Monogram with Botanical Branch */}
          <div className="relative flex items-center justify-center my-4 sm:my-6">
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {/* Letter O */}
              <span className="font-cinzel text-7xl sm:text-8xl md:text-9xl font-light text-[#FAE7C9] tracking-tighter leading-none select-none">
                O
              </span>

              {/* Vertical divider with detailed botanical olive branch SVG */}
              <div className="relative h-44 sm:h-56 md:h-64 flex items-center justify-center">
                {/* Thin Crema vertical line */}
                <div className="w-[1.5px] h-full bg-[#FAE7C9]/85 shadow-[0_0_8px_rgba(250,231,201,0.45)]" />

                {/* Handcrafted Botanical Olive Leaves Vector Overlay */}
                <svg
                  className="absolute inset-0 w-28 sm:w-36 h-full -left-12 sm:-left-16 pointer-events-none text-[#E1C78F] drop-shadow-[0_2px_4px_rgba(40,38,18,0.4)]"
                  viewBox="0 0 100 220"
                  fill="none"
                  stroke="currentColor"
                >
                  {/* Main Stem */}
                  <path
                    d="M 50 15 Q 48 60 51 110 T 49 205"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* Top Leaves */}
                  <path d="M 50 25 C 40 20 32 30 40 42 C 45 40 49 34 50 25 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <path d="M 50 35 C 60 28 68 38 60 50 C 55 48 51 42 50 35 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />

                  {/* Mid-Upper Leaves & Olives */}
                  <path d="M 49 60 C 35 52 26 65 38 80 C 44 76 48 68 49 60 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <ellipse cx="36" cy="68" rx="3.5" ry="5.5" transform="rotate(-20 36 68)" fill="currentColor" strokeWidth="1" />
                  
                  <path d="M 50 75 C 65 65 74 80 62 95 C 56 90 51 82 50 75 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <ellipse cx="64" cy="85" rx="3.5" ry="5.5" transform="rotate(25 64 85)" fill="currentColor" strokeWidth="1" />

                  {/* Middle Sprigs */}
                  <path d="M 50 105 C 32 98 25 116 38 130 C 45 125 49 115 50 105 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <path d="M 51 120 C 68 110 76 128 64 142 C 57 136 52 128 51 120 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <ellipse cx="38" cy="115" rx="3.2" ry="5.2" transform="rotate(-15 38 115)" fill="currentColor" strokeWidth="1" />

                  {/* Lower Leaves */}
                  <path d="M 49 150 C 34 145 28 162 40 174 C 46 168 49 158 49 150 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <path d="M 50 165 C 66 158 72 176 60 188 C 55 182 51 173 50 165 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
                  <ellipse cx="62" cy="172" rx="3.2" ry="5" transform="rotate(20 62 172)" fill="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Letter M */}
              <span className="font-cinzel text-7xl sm:text-8xl md:text-9xl font-light text-[#FAE7C9] tracking-tighter leading-none select-none">
                M
              </span>
            </div>
          </div>

          {/* Subtitle: ¡NOS CASAMOS! */}
          <div className="mt-4 mb-2">
            <span className="font-montserrat text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#E1C78F] uppercase font-light">
              ¡NOS CASAMOS!
            </span>
          </div>

          {/* Bride & Groom: Odlan & María Jose */}
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-normal text-[#FAE7C9] tracking-wide my-4 sm:my-6 leading-tight drop-shadow-[0_4px_12px_rgba(40,38,18,0.35)]">
            Odlan & María Jose
          </h1>

          {/* Date & Venue Footer with Divider */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-[#FAE7C9]/35 max-w-md mx-auto">
            <div className="text-right">
              <span className="block font-cinzel text-sm sm:text-lg md:text-xl font-bold text-[#FAE7C9] tracking-widest leading-snug">
                20 DE
              </span>
              <span className="block font-cinzel text-xs sm:text-base md:text-lg font-light text-[#E1C78F] tracking-widest leading-snug">
                FEB 2027
              </span>
            </div>

            <div className="w-[1.5px] h-10 sm:h-12 bg-[#FAE7C9]/80 shadow-[0_0_6px_rgba(250,231,201,0.35)]" />

            <div className="text-left">
              <span className="block font-cinzel text-sm sm:text-lg md:text-xl font-bold text-[#FAE7C9] tracking-widest leading-snug">
                CASONA
              </span>
              <span className="block font-cinzel text-xs sm:text-base md:text-lg font-light text-[#E1C78F] tracking-widest leading-snug">
                LOS NOGALES
              </span>
            </div>
          </div>
        </div>

        {/* Guided Exploration Buttons (Replaces top navbar as requested) */}
        <div className="mt-12 w-full max-w-2xl mx-auto">
          <p className="font-garamond italic text-base sm:text-lg text-[#FAE7C9] mb-5 tracking-wide">
            Explora cada detalle de nuestra celebración:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('fecha-lugar')}
              className="px-5 py-3 rounded-full bg-[#575432]/90 hover:bg-[#B0926A]/55 border border-[#FAE7C9]/50 text-[#FAE7C9] font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E1C78F]" />
              <span>Fecha & Cuenta Regresiva</span>
            </button>

            <button
              onClick={() => scrollTo('ubicacion')}
              className="px-5 py-3 rounded-full bg-[#575432]/90 hover:bg-[#B0926A]/55 border border-[#FAE7C9]/50 text-[#FAE7C9] font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E1C78F]" />
              <span>Casona Los Nogales</span>
            </button>

            <button
              onClick={() => scrollTo('fotos-drive')}
              className="px-5 py-3 rounded-full bg-[#575432]/90 hover:bg-[#B0926A]/55 border border-[#FAE7C9]/50 text-[#FAE7C9] font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#E1C78F]" />
              <span>Fotos al Drive</span>
            </button>

            <button
              onClick={() => scrollTo('regalos')}
              className="px-5 py-3 rounded-full bg-[#575432]/90 hover:bg-[#B0926A]/55 border border-[#FAE7C9]/50 text-[#FAE7C9] font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#E1C78F]" />
              <span>Novios Paris</span>
            </button>

            <button
              onClick={() => scrollTo('rsvp')}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(250,231,201,0.45)] hover:shadow-[0_0_45px_rgba(250,231,201,0.75)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#7d5238] fill-[#7d5238]" />
              <span>Confirma tu Asistencia</span>
            </button>
          </div>
        </div>

        {/* Down Indicator */}
        <div
          onClick={() => scrollTo('fecha-lugar')}
          className="mt-12 inline-flex flex-col items-center gap-1.5 text-[#FAE7C9]/85 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-[0.3em]">
            Desliza para continuar
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#E1C78F]" />
        </div>
      </div>
    </section>
  );
}
