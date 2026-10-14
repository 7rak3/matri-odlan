import React from 'react';
import { Gift, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

export default function GiftRegistry() {
  const parisNoviosUrl = 'https://novios.paris.cl/';

  return (
    <section id="regalos" className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#46573c]/50 border border-amber-300/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>MESA DE REGALOS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-3">
          Lista de Novios
        </h2>

        <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-300/70 to-transparent mb-4" />

        <p className="font-garamond italic text-lg md:text-xl text-cream-100/90 leading-relaxed">
          Tu presencia y tu abrazo son nuestro mayor regalo en este día tan soñado.
          Si además deseas hacernos un presente, hemos registrado nuestra lista de novios en Tiendas Paris:
        </p>
      </div>

      {/* Novios Paris Official Card */}
      <HoloTiltCard className="w-full max-w-2xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#2b3724]/90 border border-amber-300/35 relative overflow-hidden shadow-[0_20px_60px_rgba(8,12,6,0.8)] backdrop-blur-xl text-center space-y-6">
          {/* Paris Icon / Monogram */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-300/30 to-amber-400/10 border-2 border-amber-300/50 flex items-center justify-center mx-auto shadow-md">
            <Gift className="w-8 h-8 text-amber-300" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-montserrat uppercase tracking-[0.3em] text-amber-200/90 font-medium">
              TIENDAS PARIS • NOVIOS PARIS
            </span>

            <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-cream-50">
              Novios Paris
            </h3>

            <p className="font-montserrat text-xs sm:text-sm text-cream-200/90 max-w-md mx-auto font-light leading-relaxed">
              Puedes buscar nuestra lista de matrimonio directamente en el portal de Novios Paris o acercarte a cualquier tienda del país.
            </p>
          </div>

          {/* Pending Code Notice / Placeholder */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1b2317]/95 border border-amber-300/25 max-w-md mx-auto space-y-1.5">
            <div className="text-[10px] font-montserrat uppercase tracking-widest text-amber-300/80">
              Código de Novios
            </div>
            <div className="font-cinzel text-lg sm:text-xl font-bold text-amber-200 tracking-wider">
              Odlan & María Jose
            </div>
            <div className="text-[11px] font-montserrat text-cream-300/70 italic">
              (Código numérico directo disponible próximamente en este espacio)
            </div>
          </div>

          {/* Direct Action Button to Paris.cl */}
          <div className="pt-2">
            <a
              href={parisNoviosUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cosmicAudio.playChime(1.4)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(250,224,132,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Ver Lista en Novios Paris</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-amber-200/80 font-montserrat pt-2">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>¡Gracias infinitas por ser parte de nuestra nueva etapa!</span>
          </div>
        </div>
      </HoloTiltCard>
    </section>
  );
}
