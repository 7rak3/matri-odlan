import React, { useState } from 'react';
import { Heart, Sparkles, Feather, Quote } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

const VOWS = [
  {
    id: 'jose',
    author: 'Votos de Jose para Odlan',
    role: 'De Jose, con amor infinito',
    quote: '"Prometo ser tu refugio en los días grises y tu mayor sonrisa en los días de sol."',
    letter: [
      'Odlan, contigo entendí que el amor verdadero no hace ruido ni exige perfección: da paz, cobijo y libertad.',
      'Prometo mirarte cada mañana con la misma admiración y agradecimiento del primer día. Prometo celebrar tus victorias más grandes y sostenerte con ternura cuando el camino se ponga cuesta arriba.',
      'Gracias por enseñarme que amar es construir un equipo incondicional donde jamás se está solo. Te elijo hoy, te elegiré mañana y te elegiré por toda la eternidad.',
    ],
    signature: 'Jose',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'odlan',
    author: 'Votos de Odlan para Jose',
    role: 'De Odlan, con todo el corazón',
    quote: '"Desde el primer café supe que mi hogar no era un lugar en el mapa, sino tú."',
    letter: [
      'Jose, llegar a ti fue como regresar a un lugar donde siempre debí haber estado. En tus ojos encontré la complicidad más pura y la certeza de que todo tenía sentido.',
      'Prometo escucharte siempre con el alma, cuidar de tus sueños con la misma pasión que los míos y jamás perder la magia de nuestras risas desveladas bajo las sábanas.',
      'Prometo ser tu compañero más fiel, tu cómplice eterno y recordarte cada día lo profundamente amado que eres. Este "Sí" es para siempre.',
    ],
    signature: 'Odlan',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pacto',
    author: 'Nuestra Alianza Sagrada',
    role: 'El Juramento Mutuo',
    quote: '"Lo que el amor ha unido con verdad y respeto, que nada en este mundo lo separe jamás."',
    letter: [
      'Frente a Dios, bajo las estrellas del firmamento y ante las personas que más amamos en esta vida, sellamos nuestra unión.',
      'Prometemos caminar hombro con hombro, amarnos con generosidad, perdonar con humildad y cultivar un hogar donde reinen la ternura, el respeto y la alegría.',
      'Nuestras alianzas de oro son el símbolo visible de un compromiso invisible: dos almas que deciden fundirse en una sola luz.',
    ],
    signature: 'Jose & Odlan',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
  },
];

export default function LoveVows() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (idx) => {
    cosmicAudio.playChime(1.1 + idx * 0.15);
    setActiveTab(idx);
  };

  const currentVow = VOWS[activeTab];

  return (
    <section id="votos" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <Feather className="w-3.5 h-3.5 text-rose-300" />
          EL CORAZÓN DE NUESTRO MATRIMONIO
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Nuestros Votos de Amor
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Las palabras que nacen de lo más profundo de nuestras almas para prometer una vida juntos.
        </p>
      </div>

      {/* Googlebook-style Interactive Tab Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {VOWS.map((vow, idx) => (
          <button
            key={vow.id}
            onClick={() => handleTabChange(idx)}
            className={`px-5 py-3 rounded-full text-xs md:text-sm font-cinzel font-semibold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === idx
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(250,224,132,0.6)] scale-105'
                : 'cosmic-glass text-slate-300 hover:text-white hover:border-amber-400/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === idx ? 'text-rose-600 fill-rose-600' : 'text-rose-400'}`} />
            <span>{vow.author}</span>
          </button>
        ))}
      </div>

      {/* Main Vow Display Card */}
      <HoloTiltCard className="w-full">
        <div className="cosmic-glass rounded-3xl p-6 md:p-12 border border-amber-400/35 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {/* Subtle Watermark Monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] md:text-[220px] font-script text-amber-400/[0.03] select-none pointer-events-none">
            J&O
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl h-80 md:h-96 group">
                <img
                  src={currentVow.image}
                  alt={currentVow.author}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04081c] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs font-montserrat tracking-widest text-amber-300 uppercase block mb-1">
                    {currentVow.role}
                  </span>
                  <span className="font-script text-3xl text-white font-normal drop-shadow-md">
                    {currentVow.signature}
                  </span>
                </div>
              </div>
            </div>

            {/* Letter Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-400/20">
                <Quote className="w-5 h-5 text-amber-300" />
                <span className="font-garamond italic text-sm md:text-base text-amber-200">
                  {currentVow.quote}
                </span>
              </div>

              <div className="space-y-4">
                {currentVow.letter.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-garamond text-base md:text-lg text-slate-200 leading-relaxed font-light tracking-wide italic"
                  >
                    "{paragraph}"
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-amber-400/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-montserrat text-amber-300/80">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Promesa eterna de matrimonio</span>
                </div>

                <div className="font-script text-3xl text-amber-200">
                  {currentVow.signature}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HoloTiltCard>
    </section>
  );
}
