import React from 'react';
import { Heart, ArrowUp, Lock } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CosmicFooter({ onOpenDashboard }) {
  const scrollToTop = () => {
    cosmicAudio.playChime(1.3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-[#FAE7C9]/30 bg-[#575432]/95 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-[#FAE7C9]/50 bg-[#B0926A]/35 flex items-center justify-center mb-4 shadow-sm">
          <span className="font-cinzel text-[#FAE7C9] font-bold text-xs tracking-widest">
            O|M
          </span>
        </div>

        <h3 className="font-cinzel text-2xl font-bold gold-gradient-text tracking-widest uppercase mb-2">
          Odlan & María Jose
        </h3>

        <p className="font-garamond italic text-base text-[#FAE7C9]/95 mb-4">
          "Unidos en amor para toda la vida."
        </p>

        <p className="font-montserrat text-xs text-[#E1C78F]/90 max-w-md mx-auto leading-relaxed mb-6 font-light">
          20 de Febrero de 2027 • Casona Los Nogales, Santiago de Chile.
          <br />
          Gracias por ser parte de este día tan especial.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-[#FAE7C9]/90 mb-6 font-montserrat">
          <span>Hecho con amor</span>
          <Heart className="w-3.5 h-3.5 text-[#E1C78F] fill-[#E1C78F]" />
          <span>para nuestro matrimonio</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#464428] border border-[#FAE7C9]/45 text-[#FAE7C9] hover:text-white hover:border-white transition-all shadow-md cursor-pointer group"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="px-4 py-2.5 rounded-full bg-[#464428] hover:bg-[#B0926A]/55 border border-[#FAE7C9]/40 text-[#E1C78F] hover:text-[#FAE7C9] text-[11px] font-montserrat uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Dashboard Novios</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
