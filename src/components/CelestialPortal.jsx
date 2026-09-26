import React, { useState } from 'react';
import { Sparkles, Key, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import Rings3DCanvas from './Rings3DCanvas';

export default function CelestialPortal({ onEnterUniverse, isOpened }) {
  const [openingState, setOpeningState] = useState('idle'); // 'idle' | 'unsealing' | 'swinging' | 'warping' | 'opened'
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem('matri_unlocked') === 'true' ? 'matri2026' : '';
    } catch {
      return '';
    }
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleOpen = () => {
    if (openingState !== 'idle') return;

    setOpeningState('unsealing');
    // Trigger electronic noise riser + sub drop
    cosmicAudio.playPortalElectronicDrop();

    // Stage 1: Doors swing & 3D rings split
    setTimeout(() => {
      setOpeningState('swinging');
    }, 900);

    // Stage 2: Hyperspace warp dive on the drop
    setTimeout(() => {
      setOpeningState('warping');
      onEnterUniverse(true);
    }, 1800);

    // Stage 3: Land in universe, start 122 BPM Melodic Deep House
    setTimeout(() => {
      setOpeningState('opened');
      cosmicAudio.startMusicLoop();
      onEnterUniverse(false);
    }, 3200);
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    if (openingState !== 'idle') return;

    const cleanPass = password.trim().toLowerCase();
    if (cleanPass === 'matri2026') {
      setError('');
      setIsUnlocked(true);
      try {
        sessionStorage.setItem('matri_unlocked', 'true');
      } catch {
        // ignore storage errors
      }
      handleOpen();
    } else {
      setError('Clave incorrecta. Revisa tu tarjeta de invitación ✨');
      try {
        cosmicAudio.playChime(0.6);
      } catch {
        // ignore audio errors
      }
    }
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
        background: 'radial-gradient(ellipse at center, rgba(20,12,38,0.94) 0%, rgba(2,4,11,0.98) 75%)',
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
        transform: isWarping ? 'scale(3.2)' : 'scale(1)',
      }}
    >
      {/* Background Volumetric Glows & Sacred Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Soft Golden Nebula Glow */}
        <div className="w-[520px] h-[520px] md:w-[720px] md:h-[720px] rounded-full bg-amber-500/10 blur-3xl animate-pulse" />

        {/* Outer Filigree Ring */}
        <div
          className={`w-[480px] h-[480px] md:w-[680px] md:h-[680px] rounded-full border border-amber-300/25 border-dashed animate-spin-slow transition-all duration-1000 ${
            isUnsealing ? 'scale-115 border-amber-200/70 shadow-[0_0_80px_rgba(250,224,132,0.5)]' : ''
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-semibold">NUESTRO MATRIMONIO • SAVE THE DATE</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <p className="font-garamond italic text-xl md:text-2xl text-amber-100/90 mb-1 tracking-wide">
            Tenemos el honor de invitarte a celebrar la unión de
          </p>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest gold-gradient-text uppercase mb-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            Jose & Odlan
          </h1>

          <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] text-amber-200/90 uppercase mb-6 font-semibold">
            ✨ SÁBADO 20 • FEBRERO • 2027 ✨
          </p>
        </div>

        {/* 3D Real Three.js Golden Wedding Rings Monument */}
        <div
          className="relative w-64 h-72 md:w-80 md:h-88 my-2 rounded-t-[150px] p-2 bg-gradient-to-b from-amber-300/35 via-amber-900/15 to-transparent border-2 border-amber-400/60 shadow-[0_0_70px_rgba(212,175,55,0.3)] flex items-center justify-center overflow-hidden"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Inside Glow */}
          <div
            className={`absolute inset-2 rounded-t-[145px] overflow-hidden flex items-center justify-center transition-all duration-1000 ${
              isSwinging
                ? 'bg-gradient-to-t from-amber-200 via-amber-100 to-white shadow-[0_0_150px_rgba(255,245,214,1)]'
                : 'bg-[#080d24]/90'
            }`}
          >
            {isSwinging && (
              <div className="absolute inset-0 bg-white animate-pulse" />
            )}
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-400/20 to-amber-200/40 blur-2xl animate-pulse" />
          </div>

          {/* Three.js Real 3D Interlocking Rings */}
          <div className="relative z-20">
            <Rings3DCanvas isOpening={isUnsealing || isSwinging} />
          </div>
        </div>

        {/* Action Form: Password Guard & Abrir Nuestra Boda */}
        <div
          className={`mt-6 w-full max-w-sm mx-auto transition-all duration-700 ${
            isUnsealing ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
            {/* Input with Lock icon */}
            <div className="relative w-full mb-3">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-300/80">
                {isUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-300/80" />
                )}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ingresa la clave secreta..."
                className={`w-full pl-11 pr-11 py-3.5 bg-[#070d24]/90 backdrop-blur-md border rounded-full text-center text-sm md:text-base tracking-[0.2em] font-cinzel text-amber-100 placeholder:text-amber-200/40 placeholder:tracking-normal placeholder:font-montserrat placeholder:text-xs md:placeholder:text-sm focus:outline-none transition-all shadow-[0_0_25px_rgba(0,0,0,0.6)] ${
                  error
                    ? 'border-rose-500/80 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.35)] animate-shake'
                    : isUnlocked
                    ? 'border-emerald-400/80 shadow-[0_0_25px_rgba(52,211,153,0.35)]'
                    : 'border-amber-400/40 focus:border-amber-300 focus:shadow-[0_0_30px_rgba(250,224,132,0.3)]'
                }`}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-300/60 hover:text-amber-200 transition-colors cursor-pointer"
                title={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-300 font-montserrat tracking-wide mb-3 animate-shake">
                <span>{error}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={openingState !== 'idle'}
              className="group relative w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-500/30 border-2 border-amber-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(250,224,132,0.7)] hover:border-amber-100 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-lg group-hover:bg-amber-400/25 transition-all" />

              <div className="relative flex items-center justify-center gap-3">
                <Key className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
                <span className="font-cinzel text-sm md:text-base font-bold tracking-[0.25em] text-white uppercase text-gold-glow">
                  {isUnlocked ? 'ENTRANDO...' : 'ABRIR NUESTRA BODA'}
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
            </button>
          </form>

          <p className="font-garamond italic text-sm md:text-base text-amber-200/80 mt-3 tracking-wider text-center">
            Ingresa la clave de tu invitación para abrir las puertas
          </p>
        </div>
      </div>
    </div>
  );
}
