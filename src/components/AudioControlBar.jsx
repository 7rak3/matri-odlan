import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioControlBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [kickPulse, setKickPulse] = useState(false);

  useEffect(() => {
    const unsubState = cosmicAudio.subscribe((state) => {
      setIsMuted(state.isMuted);
      setIsPlaying(state.isPlaying);
    });

    const unsubBeat = cosmicAudio.subscribeBeat(({ isKick }) => {
      if (isKick) {
        setKickPulse(true);
        setTimeout(() => setKickPulse(false), 90);
      }
    });

    return () => {
      unsubState();
      unsubBeat();
    };
  }, []);

  const handleToggle = () => {
    cosmicAudio.init();
    if (!isPlaying) {
      cosmicAudio.startMusicLoop();
    } else {
      cosmicAudio.toggleMute();
    }
  };

  const isActive = isPlaying && !isMuted;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <button
        onClick={handleToggle}
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full cosmic-glass border transition-all duration-300 shadow-2xl cursor-pointer ${
          isActive
            ? 'border-amber-400/50 shadow-[0_0_25px_rgba(250,224,132,0.35)] bg-[#070d24]/90'
            : 'border-slate-700/60 bg-[#050818]/80 text-slate-400 hover:border-slate-500'
        }`}
        title={isActive ? 'Clic para silenciar la música' : 'Clic para activar la música'}
      >
        {/* Animated Soundwave Equalizer */}
        <div className="flex items-center gap-0.5 h-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isActive
                  ? kickPulse
                    ? 'bg-amber-300 h-4 scale-y-125'
                    : 'bg-amber-400 h-2.5'
                  : 'bg-slate-600 h-1'
              }`}
              style={{
                transitionDelay: `${i * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Minimal Label */}
        <div className="text-left pr-1">
          <div className="text-[10px] font-montserrat uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
            <Disc3 className={`w-3 h-3 ${isActive ? 'animate-spin-slow text-amber-300' : 'text-slate-500'}`} />
            <span>122 BPM</span>
          </div>
          <div className="text-[11px] font-cinzel text-white leading-none">
            {isActive ? 'Melodic House' : 'Música Silenciada'}
          </div>
        </div>

        {/* Speaker / Mute Icon */}
        <div className="p-1 rounded-full bg-white/5 text-amber-200 group-hover:text-white transition-colors">
          {isActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
    </div>
  );
}
