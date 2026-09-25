import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc3, Sun, Flame } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioControlBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('festival');
  const [kickFlash, setKickFlash] = useState(false);

  useEffect(() => {
    const unsubState = cosmicAudio.subscribe((state) => {
      setIsMuted(state.isMuted);
      setIsPlaying(state.isPlaying);
      setMode(state.mode);
    });

    const unsubBeat = cosmicAudio.subscribeBeat(({ isKick }) => {
      if (isKick) {
        setKickFlash(true);
        setTimeout(() => setKickFlash(false), 90);
      }
    });

    return () => {
      unsubState();
      unsubBeat();
    };
  }, []);

  const handleTogglePlay = () => {
    cosmicAudio.init();
    if (!isPlaying) {
      cosmicAudio.startMusicLoop();
    } else {
      cosmicAudio.toggleMute();
    }
  };

  const handleToggleMode = () => {
    cosmicAudio.init();
    cosmicAudio.playChime(1.4);
    const nextMode = mode === 'festival' ? 'sunset' : 'festival';
    cosmicAudio.setMode(nextMode);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 cosmic-glass px-4 py-2.5 rounded-full border border-cyan-400/40 shadow-2xl backdrop-blur-xl">
      {/* 122 BPM Kick Flash LED */}
      <div
        className={`w-2.5 h-2.5 rounded-full transition-all duration-75 ${
          kickFlash && isPlaying && !isMuted
            ? 'bg-cyan-300 scale-150 shadow-[0_0_12px_#38bdf8]'
            : 'bg-cyan-900/60 scale-100'
        }`}
        title="122 BPM Clock"
      />

      {/* Track Label */}
      <div className="hidden sm:block text-left">
        <div className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-wider text-cyan-300">
          <Disc3 className={`w-3 h-3 text-cyan-400 ${isPlaying && !isMuted ? 'animate-spin-slow' : ''}`} />
          <span>122 BPM • ASTRAL HOUSE</span>
        </div>
        <div className="text-[11px] font-cinzel text-white truncate max-w-[130px]">
          Jose & Odlan Live
        </div>
      </div>

      {/* Switch between Festival Beat vs Sunset Chill */}
      <button
        onClick={handleToggleMode}
        className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[10px] font-montserrat uppercase tracking-wider text-amber-200 border border-amber-400/30 flex items-center gap-1 transition-colors cursor-pointer"
        title={mode === 'festival' ? 'Cambiar a modo Sunset Chill' : 'Cambiar a modo Festival Beat'}
      >
        {mode === 'festival' ? (
          <>
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="hidden md:inline">BEAT ON</span>
          </>
        ) : (
          <>
            <Sun className="w-3 h-3 text-amber-300" />
            <span className="hidden md:inline">CHILL</span>
          </>
        )}
      </button>

      {/* Mute Button */}
      <button
        onClick={handleTogglePlay}
        className="p-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 hover:text-white transition-colors cursor-pointer border border-cyan-400/30"
        title={isMuted ? 'Activar Sonido' : 'Silenciar'}
      >
        {isMuted || !isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
