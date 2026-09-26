import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc3, SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioControlBar() {
  const [audioState, setAudioState] = useState({
    isMuted: false,
    isPlaying: false,
    currentTrackIndex: 0,
    totalTracks: 4,
    title: 'Melodic Deep House',
    genre: 'Deep House Atmospheric',
    bpm: 122,
  });
  const [kickPulse, setKickPulse] = useState(false);

  useEffect(() => {
    const unsubState = cosmicAudio.subscribe((state) => {
      setAudioState((prev) => ({
        ...prev,
        ...state,
      }));
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

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    cosmicAudio.togglePlayPause();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    cosmicAudio.toggleMute();
  };

  const handlePrevTrack = (e) => {
    e.stopPropagation();
    cosmicAudio.prevTrack();
  };

  const handleNextTrack = (e) => {
    e.stopPropagation();
    cosmicAudio.nextTrack();
  };

  const isActive = audioState.isPlaying && !audioState.isMuted;

  return (
    <aside
      aria-label="Reproductor de música de la boda"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none max-w-[calc(100vw-2rem)]"
    >
      <div
        className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.8)] ${
          isActive
            ? 'border-amber-400/60 shadow-[0_0_30px_rgba(250,224,132,0.35)] bg-[#070d24]/95'
            : 'border-slate-800 bg-[#040714]/90 text-slate-400'
        }`}
      >
        {/* Spinning Disc & Equalizer */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <Disc3
              className={`w-6 h-6 transition-colors ${
                isActive ? 'text-amber-300 animate-spin-slow' : 'text-slate-600'
              }`}
            />
            {isActive && (
              <span className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 animate-ping" />
            )}
          </div>

          {/* Soundwave Bars */}
          <div className="hidden sm:flex items-center gap-0.5 h-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-0.5 sm:w-1 rounded-full transition-all duration-150 ${
                  isActive
                    ? kickPulse
                      ? 'bg-amber-300 h-4 scale-y-125'
                      : 'bg-amber-400 h-2'
                    : 'bg-slate-700 h-1'
                }`}
                style={{
                  transitionDelay: `${i * 35}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Track Info */}
        <div className="text-left min-w-[105px] sm:min-w-[135px] max-w-[130px] sm:max-w-[170px] overflow-hidden">
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-montserrat uppercase tracking-wider text-amber-300/90 font-medium">
            <span className="px-1.5 py-0.2 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold">
              {audioState.currentTrackIndex + 1}/{audioState.totalTracks}
            </span>
            <span className="truncate">{audioState.bpm} BPM</span>
          </div>
          <div className="text-[11px] sm:text-xs font-cinzel text-white font-semibold truncate leading-tight mt-0.5">
            {audioState.title}
          </div>
        </div>

        {/* Playback Controls (Prev, Play/Pause, Next) */}
        <div className="flex items-center gap-1 sm:gap-1.5 border-l border-r border-amber-400/20 px-1 sm:px-2">
          {/* Previous Track */}
          <button
            onClick={handlePrevTrack}
            className="p-1.5 rounded-full text-slate-300 hover:text-amber-300 hover:bg-amber-400/10 transition-all cursor-pointer active:scale-90"
            title="Pista anterior"
            aria-label="Pista anterior"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`p-2 rounded-full transition-all transform active:scale-95 cursor-pointer shadow-md ${
              audioState.isPlaying
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(250,224,132,0.4)]'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            }`}
            title={audioState.isPlaying ? 'Pausar música' : 'Reproducir música'}
            aria-label={audioState.isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {audioState.isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={handleNextTrack}
            className="p-1.5 rounded-full text-slate-300 hover:text-amber-300 hover:bg-amber-400/10 transition-all cursor-pointer active:scale-90"
            title="Pista siguiente"
            aria-label="Pista siguiente"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mute / Unmute Button */}
        <button
          onClick={handleToggleMute}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            audioState.isMuted
              ? 'text-rose-400 hover:text-rose-300 bg-rose-500/10'
              : 'text-amber-200 hover:text-white bg-white/5'
          }`}
          title={audioState.isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          aria-label={audioState.isMuted ? 'Activar sonido' : 'Silenciar sonido'}
        >
          {audioState.isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
