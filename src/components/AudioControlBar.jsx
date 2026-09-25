import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Heart, Disc3 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioControlBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('ceremony');

  useEffect(() => {
    const unsubState = cosmicAudio.subscribe((state) => {
      setIsMuted(state.isMuted);
      setIsPlaying(state.isPlaying);
      setMode(state.mode);
    });

    return unsubState;
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
    const nextMode = mode === 'ceremony' ? 'fiesta' : 'ceremony';
    cosmicAudio.setMode(nextMode);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 cosmic-glass px-4 py-2.5 rounded-full border border-amber-400/40 shadow-2xl backdrop-blur-xl">
      {/* Pulse Heart Indicator */}
      <Heart
        className={`w-3.5 h-3.5 transition-colors ${
          isPlaying && !isMuted ? 'text-rose-400 fill-rose-400 animate-pulse' : 'text-slate-500'
        }`}
      />

      {/* Track Label */}
      <div className="hidden sm:block text-left">
        <div className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-wider text-amber-300">
          <Music className="w-3 h-3 text-amber-400" />
          <span>{mode === 'ceremony' ? 'PIANO ROMÁNTICO' : 'FIESTA MELODIC'}</span>
        </div>
        <div className="text-[11px] font-cinzel text-white truncate max-w-[130px]">
          Jose & Odlan Amor
        </div>
      </div>

      {/* Switch between Piano Ceremonia vs Fiesta House */}
      <button
        onClick={handleToggleMode}
        className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[10px] font-montserrat uppercase tracking-wider text-amber-200 border border-amber-400/30 flex items-center gap-1 transition-colors cursor-pointer"
        title={mode === 'ceremony' ? 'Activar modo Fiesta House' : 'Activar modo Piano Ceremonia'}
      >
        {mode === 'ceremony' ? (
          <>
            <Disc3 className="w-3 h-3 text-cyan-300 animate-spin-slow" />
            <span className="hidden md:inline">FIESTA</span>
          </>
        ) : (
          <>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span className="hidden md:inline">PIANO</span>
          </>
        )}
      </button>

      {/* Mute Button */}
      <button
        onClick={handleTogglePlay}
        className="p-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 hover:text-white transition-colors cursor-pointer border border-amber-400/30"
        title={isMuted ? 'Activar Sonido' : 'Silenciar'}
      >
        {isMuted || !isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
