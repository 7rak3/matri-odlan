import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CosmicFooter() {
  const scrollToTop = () => {
    cosmicAudio.playChime(1.5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-amber-400/20 bg-[#02040b]/90 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <span className="font-cinzel text-amber-300 font-bold text-sm tracking-widest">
            J&O
          </span>
        </div>

        <h3 className="font-cinzel text-2xl font-bold gold-gradient-text tracking-widest uppercase mb-2">
          Jose & Odlan
        </h3>

        <p className="font-garamond italic text-base text-amber-200/80 mb-6">
          "Dos almas, una sola órbita eterna."
        </p>

        <p className="font-montserrat text-xs text-slate-400 max-w-md mx-auto leading-relaxed mb-8 font-light">
          20 de Febrero de 2027 • Santiago de Chile.
          <br />
          Piloto & Tripulante de Cabina ✈️ • Gracias por ser parte de nuestro viaje.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-amber-300/80 mb-8 font-montserrat">
          <span>Diseñado con amor infinito</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>para nuestra boda</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 border border-amber-400/30 text-amber-300 hover:text-white hover:border-amber-300 transition-all shadow-lg cursor-pointer group"
          title="Volver arriba"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
