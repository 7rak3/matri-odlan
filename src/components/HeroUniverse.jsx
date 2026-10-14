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
        
        {/* Main Wedding Invitation Card — Exact Match to PDF */}
        <div
          className="relative w-full max-w-xl mx-auto rounded-[32px] p-8 sm:p-14 md:p-16 text-center shadow-[0_25px_70px_rgba(8,12,6,0.85)] border border-[#e8dfcb]/30 transition-all duration-500 hover:shadow-[0_30px_90px_rgba(212,175,55,0.2)]"
          style={{
            backgroundColor: '#435138',
            backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(94, 117, 78, 0.45) 0%, rgba(55, 68, 45, 0.95) 100%)',
          }}
        >
          {/* Subtle inner border frame */}
          <div className="absolute inset-3 sm:inset-4 rounded-[24px] border border-[#f4eedb]/20 pointer-events-none" />

          {/* O | M Monogram with Botanical Branch */}
          <div className="relative flex items-center justify-center my-4 sm:my-6">
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {/* Letter O */}
              <span className="font-cinzel text-7xl sm:text-8xl md:text-9xl font-light text-[#f7f5ed] tracking-tighter leading-none select-none">
                O
              </span>

              {/* Vertical divider with detailed botanical olive branch SVG */}
              <div className="relative h-44 sm:h-56 md:h-64 flex items-center justify-center">
                {/* Thin white vertical line */}
                <div className="w-[1.5px] h-full bg-[#f7f5ed]/80 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

                {/* Handcrafted Botanical Olive Leaves Vector Overlay */}
                <svg
                  className="absolute inset-0 w-28 sm:w-36 h-full -left-12 sm:-left-16 pointer-events-none text-[#f7f5ed]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
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
              <span className="font-cinzel text-7xl sm:text-8xl md:text-9xl font-light text-[#f7f5ed] tracking-tighter leading-none select-none">
                M
              </span>
            </div>
          </div>

          {/* Subtitle: ¡NOS CASAMOS! */}
          <div className="mt-4 mb-2">
            <span className="font-montserrat text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#f7f5ed] uppercase font-light">
              ¡NOS CASAMOS!
            </span>
          </div>

          {/* Bride & Groom: Odlan & María Jose */}
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-normal text-[#f7f5ed] tracking-wide my-4 sm:my-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            Odlan & María Jose
          </h1>

          {/* Date & Venue Footer with Divider */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-[#f7f5ed]/30 max-w-md mx-auto">
            <div className="text-right">
              <span className="block font-cinzel text-sm sm:text-lg md:text-xl font-bold text-[#f7f5ed] tracking-widest leading-snug">
                20 DE
              </span>
              <span className="block font-cinzel text-xs sm:text-base md:text-lg font-light text-[#f7f5ed]/95 tracking-widest leading-snug">
                FEB 2027
              </span>
            </div>

            <div className="w-[1.5px] h-10 sm:h-12 bg-[#f7f5ed]/80 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />

            <div className="text-left">
              <span className="block font-cinzel text-sm sm:text-lg md:text-xl font-bold text-[#f7f5ed] tracking-widest leading-snug">
                CASONA
              </span>
              <span className="block font-cinzel text-xs sm:text-base md:text-lg font-light text-[#f7f5ed]/95 tracking-widest leading-snug">
                LOS NOGALES
              </span>
            </div>
          </div>
        </div>

        {/* Guided Exploration Buttons (Replaces top navbar as requested) */}
        <div className="mt-12 w-full max-w-2xl mx-auto">
          <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 mb-5 tracking-wide">
            Explora cada detalle de nuestra celebración:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('fecha-lugar')}
              className="px-5 py-3 rounded-full bg-[#2a3622]/90 hover:bg-[#35452b] border border-amber-300/40 text-cream-100 font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Fecha & Cuenta Regresiva</span>
            </button>

            <button
              onClick={() => scrollTo('ubicacion')}
              className="px-5 py-3 rounded-full bg-[#2a3622]/90 hover:bg-[#35452b] border border-amber-300/40 text-cream-100 font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Casona Los Nogales</span>
            </button>

            <button
              onClick={() => scrollTo('fotos-drive')}
              className="px-5 py-3 rounded-full bg-[#2a3622]/90 hover:bg-[#35452b] border border-amber-300/40 text-cream-100 font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Fotos al Drive</span>
            </button>

            <button
              onClick={() => scrollTo('regalos')}
              className="px-5 py-3 rounded-full bg-[#2a3622]/90 hover:bg-[#35452b] border border-amber-300/40 text-cream-100 font-cinzel text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>Novios Paris</span>
            </button>

            <button
              onClick={() => scrollTo('rsvp')}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500/80 via-amber-400 to-amber-500/80 text-slate-950 font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(250,224,132,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-800 fill-rose-800" />
              <span>Confirma tu Asistencia</span>
            </button>
          </div>
        </div>

        {/* Down Indicator */}
        <div
          onClick={() => scrollTo('fecha-lugar')}
          className="mt-12 inline-flex flex-col items-center gap-1.5 text-cream-200/70 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-[0.3em]">
            Desliza para continuar
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
        </div>
      </div>
    </section>
  );
}
