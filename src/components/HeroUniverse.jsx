import React from 'react';
import { ArrowDown, Heart, Radio, Disc3, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function HeroUniverse() {
  const scrollTo = (id) => {
    cosmicAudio.playChime(1.1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-24 pb-16 px-4 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Festival Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs tracking-[0.3em] uppercase mb-8 shadow-[0_0_30px_rgba(56,189,248,0.3)] animate-float">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>ASTRAL ODYSSEY • 122 BPM MELODIC UNION</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Script Intro */}
        <p className="font-garamond italic text-2xl md:text-4xl text-amber-100/90 mb-3 tracking-wide">
          Bajo la bendición del firmamento y el pulso de la música
        </p>

        {/* Grand Headline */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-widest gold-gradient-text uppercase mb-6 leading-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
          Jose & Odlan
        </h1>

        {/* Sacred Heartbeat Bar */}
        <div className="flex items-center gap-4 max-w-md mx-auto mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-amber-200" />
          <Heart className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-fuchsia-400 to-amber-200" />
        </div>

        <p className="font-montserrat text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
          Nos encontramos cuando las frecuencias del universo colisionaron. Hoy te invitamos a ser parte de nuestra odisea: una unión eterna celebrada con melodías celestiales, amor y baile hasta el amanecer.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('historia')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/30 to-amber-500/25 border-2 border-cyan-400/70 text-white font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase font-semibold hover:border-cyan-200 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            Descubrir la Historia
          </button>

          <button
            onClick={() => scrollTo('invitacion')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-amber-500/15 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Disc3 className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Ver Mi Pase VIP</span>
          </button>
        </div>

        {/* Down Indicator */}
        <div
          onClick={() => scrollTo('historia')}
          className="mt-16 inline-flex flex-col items-center gap-2 text-cyan-300/70 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-[0.3em]">
            Desliza para viajar en la odisea
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </div>
      </div>
    </section>
  );
}
