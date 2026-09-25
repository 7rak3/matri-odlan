import React from 'react';
import { ArrowDown, Star, Heart } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Constellation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.3em] uppercase mb-8 shadow-[0_0_25px_rgba(212,175,55,0.2)] animate-float">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>La Boda de Nuestras Vidas</span>
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        </div>

        {/* Script Intro Subhead */}
        <p className="font-garamond italic text-2xl md:text-4xl text-amber-100/90 mb-3 tracking-wide">
          Bajo la bendición del firmamento
        </p>

        {/* Grand Headline */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-widest gold-gradient-text uppercase mb-6 leading-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          Jose & Odlan
        </h1>

        {/* Sacred Union Statement */}
        <div className="flex items-center gap-4 max-w-md mx-auto mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-200" />
          <Heart className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-200" />
        </div>

        <p className="font-montserrat text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
          Nos conocimos cuando las estrellas se alinearon, y hoy te invitamos a ser testigo del momento en que prometemos amarnos por toda la eternidad.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('historia')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-300/60 text-white font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase font-semibold hover:border-amber-200 hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            Descubrir la Historia
          </button>

          <button
            onClick={() => scrollTo('invitacion')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-200 font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-amber-500/10 hover:border-amber-300 transition-all cursor-pointer"
          >
            Ver Mi Pase VIP
          </button>
        </div>

        {/* Down Indicator */}
        <div
          onClick={() => scrollTo('historia')}
          className="mt-16 inline-flex flex-col items-center gap-2 text-amber-300/60 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-[0.3em]">
            Desliza para viajar
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </div>
      </div>
    </section>
  );
}
