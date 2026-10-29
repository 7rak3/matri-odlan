import React, { useState } from 'react';
import { Sparkles, Key, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import Rings3DCanvas from './Rings3DCanvas';

export default function CelestialPortal({ onEnterUniverse, onOpenDashboard, isOpened }) {
  const [openingState, setOpeningState] = useState('idle'); // 'idle' | 'unsealing' | 'opened'
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem('matri_unlocked') === 'true' ? 'matri2027' : '';
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
    cosmicAudio.playChime(1.5);

    setTimeout(() => {
      onEnterUniverse(true);
    }, 800);

    setTimeout(() => {
      setOpeningState('opened');
      cosmicAudio.startMusicLoop();
      onEnterUniverse(false);
    }, 1800);
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    if (openingState !== 'idle') return;

    const cleanPass = password.trim().toLowerCase();
    if (cleanPass === 'dashboard' || cleanPass === 'novios2027' || cleanPass === 'admin') {
      try {
        sessionStorage.setItem('matri_dashboard_auth', 'true');
        sessionStorage.setItem('matri_unlocked', 'true');
      } catch {
        // ignore
      }
      if (onOpenDashboard) onOpenDashboard();
      return;
    }

    // Accept matri2027 or matri2026 or odlan
    if (cleanPass === 'matri2027' || cleanPass === 'matri2026' || cleanPass === 'odlan' || cleanPass === 'amor') {
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isUnsealing ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(126, 122, 77, 0.97) 0%, rgba(110, 107, 65, 0.99) 75%)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Volumetric Botanical Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#FAE7C9]/15 blur-3xl animate-pulse" />
        <div className="w-[380px] h-[380px] md:w-[540px] md:h-[540px] rounded-full border border-[#FAE7C9]/30 border-dashed animate-spin-slow" />
      </div>

      {/* Main Botanical Sealed Card */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
        {/* Monogram Seal */}
        <div
          className={`transition-all duration-700 ${
            isUnsealing ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B0926A]/35 border border-[#FAE7C9]/50 text-[#FAE7C9] text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_25px_rgba(225,199,143,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
            <span className="font-semibold">NUESTRO MATRIMONIO</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
          </div>

          <p className="font-garamond italic text-xl md:text-2xl text-[#FAE7C9] mb-1 tracking-wide">
            Tenemos el honor de invitarte a celebrar la unión de
          </p>

          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest gold-gradient-text uppercase mb-2 drop-shadow-[0_6px_20px_rgba(45,42,20,0.45)]">
            Odlan & María Jose
          </h1>

          <p className="font-montserrat text-xs md:text-sm tracking-[0.25em] text-[#E1C78F] uppercase mb-5 font-medium">
            20 DE FEBRERO 2027 • CASONA LOS NOGALES
          </p>
        </div>

        {/* 3D Wedding Rings / Seal Portal Card */}
        <div
          className="relative w-60 h-64 md:w-72 md:h-76 my-2 rounded-t-[140px] rounded-b-3xl p-3 bg-gradient-to-b from-[#B0926A] to-[#575432] border-2 border-[#FAE7C9]/65 shadow-[0_15px_50px_rgba(45,42,20,0.55)] flex items-center justify-center overflow-hidden"
        >
          {/* Internal soft glow */}
          <div className="absolute inset-2 rounded-t-[132px] rounded-b-2xl bg-[#575432]/95 border border-[#FAE7C9]/35 flex items-center justify-center overflow-hidden">
            <div className="absolute w-36 h-36 rounded-full bg-[#FAE7C9]/20 blur-xl animate-pulse" />
            <div className="relative z-20">
              <Rings3DCanvas isOpening={isUnsealing} />
            </div>
          </div>
        </div>

        {/* Password Form */}
        <div
          className={`mt-6 w-full max-w-sm mx-auto transition-all duration-700 ${
            isUnsealing ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
            <div className="relative w-full mb-3">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E1C78F]">
                {isUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Lock className="w-4 h-4 text-[#E1C78F]" />
                )}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ingresa la clave de invitación..."
                className={`w-full pl-11 pr-11 py-3.5 bg-[#525030]/95 backdrop-blur-md border rounded-full text-center text-sm md:text-base tracking-[0.2em] font-cinzel text-[#FAE7C9] placeholder:text-[#FAE7C9]/55 placeholder:tracking-normal placeholder:font-montserrat placeholder:text-xs md:placeholder:text-sm focus:outline-none transition-all shadow-[0_4px_20px_rgba(45,42,20,0.4)] ${
                  error
                    ? 'border-rose-300 text-rose-100 animate-shake'
                    : isUnlocked
                    ? 'border-emerald-300 text-emerald-100'
                    : 'border-[#FAE7C9]/55 focus:border-[#FAE7C9] focus:shadow-[0_0_25px_rgba(250,231,201,0.35)]'
                }`}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#E1C78F] hover:text-[#FAE7C9] transition-colors cursor-pointer"
                title={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="text-xs text-rose-200 font-montserrat tracking-wide mb-3 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={openingState !== 'idle'}
              className="group relative w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#B0926A] via-[#E1C78F] to-[#B0926A] border-2 border-[#FAE7C9] shadow-[0_0_35px_rgba(225,199,143,0.4)] hover:shadow-[0_0_55px_rgba(250,231,201,0.65)] hover:border-white transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <div className="relative flex items-center justify-center gap-3">
                <Key className="w-4 h-4 text-[#3a3820] group-hover:rotate-45 transition-transform duration-300" />
                <span className="font-cinzel text-sm md:text-base font-bold tracking-[0.25em] text-[#3a3820] uppercase">
                  {isUnlocked ? 'ABRIENDO...' : 'ABRIR INVITACIÓN'}
                </span>
                <Sparkles className="w-4 h-4 text-[#3a3820] animate-spin-slow" />
              </div>
            </button>
          </form>

          <p className="font-garamond italic text-sm text-[#FAE7C9]/90 mt-3 tracking-wider text-center">
            Ingresa la clave de tu invitación para ver todos los detalles
          </p>

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="mt-4 text-[11px] font-montserrat uppercase tracking-[0.2em] text-[#E1C78F]/85 hover:text-[#FAE7C9] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Acceso Novios • Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
