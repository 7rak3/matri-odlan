import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

const CHAPTERS = [
  {
    id: 'origen',
    tabName: '01 • Cuando éramos bbys',
    period: 'Inicios • Más de 7 años',
    title: 'Nuestros Inicios y Primeras Sonrisas',
    location: 'Donde todo comenzó',
    quote: '"La primera foto, éramos unos bbys 🥺❤️"',
    story:
      'Pareciera que fue ayer que nos conocimos. Desde esos primeros días de risas y complicidad, supimos que habíamos encontrado no solo un amor, sino al compañero de vida ideal. Más de siete años después, esa misma chispa y ternura siguen brillando intactas.',
    details: [
      { label: 'Tiempo construyendo amor', value: 'Más de 7 años juntos' },
      { label: 'Apodos del corazón', value: 'Mi 🤎 de melón, mi odlajo' },
      { label: 'La certeza', value: 'Te amo infinito bb' },
    ],
    image: '/photos/foto-03.jpg',
  },
  {
    id: 'aventuras',
    tabName: '02 • Viajes & Aventuras',
    period: '2019 — 2027',
    title: 'Descubriendo el Mundo de la Mano',
    location: 'Ciudades, Playas y Nuevos Horizontes',
    quote: '"Mi partner, mi 🤎 de melón y mi mejor cómplice."',
    story:
      'Maletas listas, ciudades nuevas, atardeceres dorados frente al mar y la complicidad de reírnos de todo juntos. En cada viaje confirmamos que no solo somos novios: somos los mejores amigos, un equipo inseparable y el refugio mutuo ante cualquier desafío.',
    details: [
      { label: 'Destino favorito', value: 'Atardeceres frente al mar y calles mágicas' },
      { label: 'El mayor aprendizaje', value: 'Caminar y reír siempre de la mano' },
      { label: 'Familia completa', value: 'Nosotros y nuestro fiel perrito 🐾' },
    ],
    image: '/photos/foto-02.jpg',
  },
  {
    id: 'propuesta',
    tabName: '03 • Hacia el Altar',
    period: 'Febrero 2027',
    title: 'Nuestra Historia Continúa ✨ 20.02.2027 ✨',
    location: 'Casona San José de Chicureo, Santiago',
    quote: '"Para siempre es solo el comienzo de nuestra historia."',
    story:
      'Después de más de siete años de escribir juntos los capítulos más hermosos, damos el paso que sellará nuestro amor. Con el corazón lleno de emoción y gratitud, estamos listos para decir "Sí, Acepto" rodeados de nuestra familia y amigos.',
    details: [
      { label: 'Nuestra gran fecha', value: 'Sábado 20 de Febrero de 2027' },
      { label: 'Lugar', value: 'Casona San José de Chicureo' },
      { label: 'La promesa', value: 'Amarnos y cuidarnos para siempre ❤️' },
    ],
    image: '/photos/foto-06.jpg',
  },
];

export default function StorySection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleTab = (idx) => {
    cosmicAudio.playChime(1.1 + idx * 0.15);
    setActiveIdx(idx);
  };

  const current = CHAPTERS[activeIdx];

  return (
    <section id="historia" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          NUESTRO VIAJE
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Nuestra Historia de Amor
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Más de siete años caminando juntos, coleccionando risas y soñando con este gran día.
        </p>
      </div>

      {/* Googlebook-style Interactive Chapter Nav Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {CHAPTERS.map((chap, idx) => (
          <button
            key={chap.id}
            onClick={() => handleTab(idx)}
            className={`px-6 py-3 rounded-full text-xs md:text-sm font-cinzel font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeIdx === idx
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(250,224,132,0.6)] scale-105'
                : 'cosmic-glass text-slate-300 hover:text-white hover:border-amber-400/50'
            }`}
          >
            <span>{chap.tabName}</span>
          </button>
        ))}
      </div>

      {/* Active Chapter Showcase Card */}
      <HoloTiltCard className="w-full">
        <div className="cosmic-glass rounded-3xl p-6 md:p-12 border border-amber-400/35 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Photo Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl h-80 md:h-[420px] group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04081c] via-transparent to-transparent opacity-85" />

                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#04081c]/80 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{current.period}</span>
                </div>

                {/* Romantic Quote on Photo */}
                <div className="absolute bottom-5 left-5 right-5 text-center">
                  <p className="font-garamond italic text-base md:text-lg text-amber-100 drop-shadow-md">
                    {current.quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative & Details */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="flex items-center gap-2 text-xs font-montserrat text-amber-300/80 uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{current.location}</span>
              </div>

              <h3 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide leading-tight">
                {current.title}
              </h3>

              <p className="font-montserrat text-sm md:text-base text-slate-200 leading-relaxed font-light">
                {current.story}
              </p>

              {/* Memory Specs Box (Googlebook Feature Specs) */}
              <div className="bg-[#050a22]/80 rounded-2xl p-5 border border-amber-400/20 space-y-3">
                {current.details.map((item, dIdx) => (
                  <div key={dIdx} className="flex justify-between items-center text-xs font-montserrat border-b border-slate-800/80 pb-2 last:border-b-0 last:pb-0">
                    <span className="text-slate-400 font-light">{item.label}</span>
                    <span className="text-amber-200 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-montserrat">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Jose & Odlan juntos</span>
                </div>

                <button
                  onClick={() => handleTab((activeIdx + 1) % CHAPTERS.length)}
                  className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider text-amber-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Siguiente Capítulo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </HoloTiltCard>
    </section>
  );
}
