import React from 'react';
import { Heart, ShieldCheck, Sparkles, Smile, Home, Sun } from 'lucide-react';
import HoloTiltCard from './HoloTiltCard';

const METRICS = [
  {
    number: '2,080+',
    unit: 'DÍAS',
    label: 'De Amor y Complicidad',
    detail: 'Desde aquel primer café en 2021 hasta nuestro gran día.',
  },
  {
    number: '1',
    unit: 'PROMESA',
    label: 'Para Toda la Vida',
    detail: 'Elegirnos, cuidarnos y amarnos en cada amanecer.',
  },
  {
    number: '15+',
    unit: 'CIUDADES',
    label: 'Recorridas de la Mano',
    detail: 'Viajes, montañas y playas que guardan nuestras risas.',
  },
  {
    number: '∞',
    unit: 'SUEÑOS',
    label: 'Por Cumplir Juntos',
    detail: 'El matrimonio es solo la primera página de nuestra historia.',
  },
];

const PILLARS = [
  {
    icon: Home,
    title: 'Hogar en un Abrazo',
    desc: 'Descubrimos que el hogar no es una dirección fija, sino la paz y la calma que sentimos al abrazarnos después de un día difícil.',
  },
  {
    icon: Smile,
    title: 'Risas Inagotables',
    desc: 'La complicidad de entendernos con una sola mirada, compartir chistes internos y no perder jamás la capacidad de jugar como niños.',
  },
  {
    icon: ShieldCheck,
    title: 'Compañeros de Vida',
    desc: 'Un equipo inquebrantable donde cada victoria se celebra doble y donde ningún obstáculo se enfrenta en soledad.',
  },
  {
    icon: Sun,
    title: 'Amor Incondicional',
    desc: 'Elegir amarnos con nuestras virtudes y aprender con paciencia, ternura y respeto mutuo cada día del año.',
  },
];

export default function LoveMetrics() {
  return (
    <section className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          NUESTRO MATRIMONIO EN CIFRAS
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Forjados Para Amarnos Toda la Vida
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Cada día a tu lado ha sido un regalo del cielo. Los números solo intentan resumir la inmensidad de lo que sentimos.
        </p>
      </div>

      {/* Googlebook-style Monumental Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
        {METRICS.map((metric, i) => (
          <div
            key={i}
            className="cosmic-glass rounded-2xl p-6 md:p-8 text-left border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 group shadow-lg"
          >
            <div className="text-[10px] md:text-xs font-montserrat tracking-widest text-amber-300/70 uppercase mb-2">
              {metric.unit}
            </div>

            <div className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-black gold-gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
              {metric.number}
            </div>

            <h3 className="font-cinzel text-sm md:text-base font-bold text-white mb-1.5">
              {metric.label}
            </h3>

            <p className="font-montserrat text-xs text-slate-300 font-light leading-relaxed">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* 4 Matrimonial Pillars (Googlebook Feature Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <HoloTiltCard key={i} className="h-full">
              <div className="cosmic-glass rounded-2xl p-6 h-full border border-amber-400/20 hover:border-amber-400/50 transition-all duration-300 text-left flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-amber-300/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-amber-300" />
                  </div>

                  <h4 className="font-cinzel text-lg font-bold text-white mb-2.5">
                    {pillar.title}
                  </h4>

                  <p className="font-montserrat text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-400/15 flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-wider text-amber-200/60">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Pilar de Nuestro Amor</span>
                </div>
              </div>
            </HoloTiltCard>
          );
        })}
      </div>
    </section>
  );
}
