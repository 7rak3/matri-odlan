import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioControlBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = cosmicAudio.subscribe((state) => {
      setIsMuted(state.isMuted);
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    cosmicAudio.init();
    if (!isPlaying) {
      cosmicAudio.startAmbientMusic();
    } else {
      cosmicAudio.toggleMute();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 cosmic-glass px-4 py-2.5 rounded-full border border-amber-400/30 shadow-2xl backdrop-blur-xl">
      {/* Waveform Visualizer */}
      <div className="flex items-center gap-0.5 h-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-amber-400 transition-all duration-300 ${
              isPlaying && !isMuted ? 'animate-pulse' : 'h-1 opacity-40'
            }`}
            style={{
              height: isPlaying && !isMuted ? `${8 + (i % 2) * 6}px` : '4px',
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>

      <div className="hidden sm:block text-left">
        <div className="text-[10px] font-montserrat uppercase tracking-wider text-amber-300/80">
          Música Celestial
        </div>
        <div className="text-[11px] font-cinzel text-white truncate max-w-[130px]">
          Jose & Odlan Pad
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="p-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white transition-colors cursor-pointer"
        title={isMuted ? 'Activar Música' : 'Silenciar Música'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
