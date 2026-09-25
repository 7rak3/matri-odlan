import React from 'react';
import { ArrowDown, Heart, Sparkles, Mail } from 'lucide-react';
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
        {/* Wedding Alert Aviation Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs tracking-[0.2em] uppercase mb-8 shadow-[0_0_30px_rgba(250,224,132,0.25)] animate-float">
          <span>🚨</span>
          <span className="font-bold">ALERTA DE MATRIMONIO</span>
          <span className="text-amber-400">•</span>
          <span className="text-amber-300 font-semibold">SAVE THE DATE ✨ 20.02.2027</span>
        </div>

        {/* Script Intro */}
        <p className="font-garamond italic text-2xl md:text-4xl text-amber-100/90 mb-3 tracking-wide">
          Nuestra historia continúa en un nuevo y maravilloso vuelo
        </p>

        {/* Real Couple Portrait Medal */}
        <div className="relative my-4 group">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-200 shadow-[0_0_35px_rgba(250,224,132,0.4)] group-hover:scale-105 transition-transform duration-500">
            <img
              src="/photos/foto-01.jpg"
              alt="Jose & Odlan"
              className="w-full h-full rounded-full object-cover border-2 border-[#02040b]"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#04081c] border border-amber-400/50 text-[10px] font-montserrat uppercase tracking-widest text-amber-200 shadow-md whitespace-nowrap">
            Piloto & Tripulante • 7+ Años
          </div>
        </div>

        {/* Grand Headline */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-widest gold-gradient-text uppercase mb-6 leading-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
          Jose & Odlan
        </h1>

        {/* Sacred Heartbeat Bar */}
        <div className="flex items-center gap-4 max-w-md mx-auto mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-200" />
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-200" />
        </div>

        <p className="font-montserrat text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
          "Entre cabinas de avión, cielos abiertos y más de siete años volando juntos, aprendimos que el amor es el destino más hermoso de todos. Por favor, no hagan planes y reserven esta fecha: ¡nuestra historia continúa y queremos que vuelen con nosotros!"
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('historia')}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-500/30 border-2 border-amber-300 text-white font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase font-semibold hover:border-amber-100 hover:shadow-[0_0_35px_rgba(250,224,132,0.5)] transition-all cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Descubrir Nuestro Viaje</span>
          </button>

          <button
            onClick={() => scrollTo('invitacion')}
            className="px-7 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-amber-500/15 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Ver Carta de Invitación</span>
          </button>

          <button
            onClick={() => scrollTo('rsvp')}
            className="px-7 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-amber-500/15 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Confirmar Asistencia</span>
          </button>
        </div>

        {/* Down Indicator */}
        <div
          onClick={() => scrollTo('historia')}
          className="mt-16 inline-flex flex-col items-center gap-2 text-amber-300/70 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-[0.3em]">
            Desliza para comenzar el viaje
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </div>
      </div>
    </section>
  );
}
