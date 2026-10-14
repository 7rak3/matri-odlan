import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CosmicFooter() {
  const scrollToTop = () => {
    cosmicAudio.playChime(1.3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-amber-300/20 bg-[#161d12]/95 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-amber-300/40 bg-amber-400/10 flex items-center justify-center mb-4 shadow-sm">
          <span className="font-cinzel text-amber-200 font-bold text-xs tracking-widest">
            O|M
          </span>
        </div>

        <h3 className="font-cinzel text-2xl font-bold gold-gradient-text tracking-widest uppercase mb-2">
          Odlan & María Jose
        </h3>

        <p className="font-garamond italic text-base text-cream-200/90 mb-4">
          "Unidos en amor para toda la vida."
        </p>

        <p className="font-montserrat text-xs text-cream-300/70 max-w-md mx-auto leading-relaxed mb-6 font-light">
          20 de Febrero de 2027 • Casona Los Nogales, Santiago de Chile.
          <br />
          Gracias por ser parte de este día tan especial.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-amber-200/80 mb-6 font-montserrat">
          <span>Hecho con amor</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>para nuestro matrimonio</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-[#24301f] border border-amber-300/30 text-amber-300 hover:text-white hover:border-amber-200 transition-all shadow-md cursor-pointer group"
          title="Volver arriba"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
