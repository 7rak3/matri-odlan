import React from 'react';
import { MapPin, Navigation, Clock, Music, Utensils, Sparkles, AlertCircle, Shirt, Zap, Disc3 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

const FESTIVAL_LINEUP = [
  {
    time: '17:30',
    bpm: '118 BPM',
    stage: 'STAGE 01: SUNSET GARDEN',
    title: 'Sunset Warmup & Cóctel Cósmico',
    desc: 'Deep Organic House, cava de autor y bocados mientras el sol cae sobre la cordillera.',
    icon: Disc3,
    tag: 'Organic & Downtempo',
  },
  {
    time: '18:30',
    bpm: 'HARMONIC',
    stage: 'THE SACRED DOME',
    title: 'La Ceremonia de las Estrellas (The Vows)',
    desc: 'El momento sagrado: Jose y Odlan unen sus almas en juramento eterno bajo el firmamento.',
    icon: Sparkles,
    tag: 'The Eternal "I Do"',
  },
  {
    time: '19:45',
    bpm: 'CHILL',
    stage: 'GRAND CRYSTAL HALL',
    title: 'Banquete Real & Brindis Sensorial',
    desc: 'Cena gastronómica de alta gama maridada con vinos reserva en el salón de estrellas.',
    icon: Utensils,
    tag: 'Gourmet Experience',
  },
  {
    time: '21:30',
    bpm: '124 BPM',
    stage: 'THE MAINSTAGE',
    title: 'Jose & Odlan: B2B Forever (Apertura de Pista)',
    desc: 'Sintetizadores, show de láseres, barra premium y una pista de baile electrónica sin gravedad.',
    icon: Music,
    tag: 'Melodic House & Techno',
  },
  {
    time: '01:30',
    bpm: 'RECHARGE',
    stage: 'THE REFUEL ZONE',
    title: 'Midnight Fuel ("El Bajón Gourmet")',
    desc: 'Mini burgers trufadas, papas rústicas, churros de chocolate y recarga de electrolitos.',
    icon: Zap,
    tag: 'After-Hours Bites',
  },
  {
    time: '03:30',
    bpm: 'FINALE',
    stage: 'COSMIC HORIZON',
    title: 'Sunrise Finale & Bengalas Estelares',
    desc: 'Caminata entre luces incandescentes y el último track bailable para sellar la noche de nuestras vidas.',
    icon: Sparkles,
    tag: 'Closing Anthem',
  },
];

export default function ItineraryAndLocation() {
  const address = 'Camino San José 450, Chicureo, Colina, Región Metropolitana';
  const gmapsUrl = 'https://maps.google.com/?q=Casona+San+Jose+Chicureo';
  const wazeUrl = 'https://waze.com/ul?q=Casona+San+Jose+Chicureo';

  return (
    <section id="itinerario" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/15 to-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          FESTIVAL LINEUP & TIMETABLE
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          El Cronograma de la Odisea
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Cada set musical y cada etapa de la velada sincronizados para una experiencia inmersiva inolvidable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Festival Lineup Timetable */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-fuchsia-500 before:to-transparent">
            {FESTIVAL_LINEUP.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="relative group text-left">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[27px] md:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#050a24] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.6)] group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>

                  {/* Card */}
                  <div className="cosmic-glass p-5 rounded-2xl border border-cyan-400/25 group-hover:border-cyan-300/70 transition-all duration-300 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-cyan-300 font-bold text-lg md:text-xl tracking-wider">
                          {item.time}
                        </span>
                        <span className="text-[10px] font-montserrat uppercase px-2 py-0.5 rounded bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-200">
                          {item.bpm}
                        </span>
                      </div>
                      <span className="text-[10px] font-montserrat uppercase text-amber-300/80 tracking-wider">
                        {item.stage}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-base md:text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-cyan-400 shrink-0" />
                      {item.title}
                    </h4>

                    <p className="font-montserrat text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#091535] border border-cyan-400/30 text-[10px] font-montserrat text-cyan-200">
                      ⚡ {item.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Venue Sanctuary & Dress Code */}
        <div className="lg:col-span-5 space-y-8">
          {/* Sanctuary Location Box */}
          <div className="cosmic-glass p-6 md:p-8 rounded-3xl border border-cyan-400/30 text-left relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-cyan-300 uppercase mb-3">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Santuario de la Celebración
            </div>

            <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-1">
              Casona San José
            </h3>

            <p className="font-garamond italic text-base text-amber-200/80 mb-4">
              Chicureo, Santiago de Chile
            </p>

            <p className="font-montserrat text-xs md:text-sm text-slate-300 leading-relaxed mb-6 font-light">
              {address}
            </p>

            {/* Direct Navigation Buttons */}
            <div className="space-y-3">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.2)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/25 via-blue-500/30 to-cyan-500/25 border border-cyan-400/60 text-cyan-100 hover:text-white hover:border-cyan-200 transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                Abrir en Google Maps
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.2)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#091535] border border-cyan-400/40 text-cyan-200 hover:text-white hover:border-cyan-300 transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                Navegar con Waze
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-cyan-400/20 flex items-center gap-2.5 text-xs text-slate-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Estacionamiento privado con guardias y servicio de transfer para el retorno.</span>
            </div>
          </div>

          {/* Dress Code Box */}
          <div className="cosmic-glass p-6 md:p-8 rounded-3xl border border-cyan-400/30 text-left shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-cyan-300 uppercase mb-3">
              <Shirt className="w-4 h-4 text-cyan-400" />
              Código de Vestimenta
            </div>

            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-2">
              Celestial Gala & Black Tie
            </h3>

            <p className="font-garamond italic text-base text-amber-200/80 mb-4">
              Elegancia festivalera de alta gama: Esmoquin o traje oscuro para ellos, vestido largo de gala para ellas.
            </p>

            {/* Colors */}
            <div className="mb-6">
              <span className="text-[11px] font-montserrat tracking-wider uppercase text-slate-400 block mb-2.5">
                Paleta Cósmica Sugerida:
              </span>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Azul Noche', color: '#09153a' },
                  { name: 'Oro Estelar', color: '#d4af37' },
                  { name: 'Cian Profundo', color: '#0e7490' },
                  { name: 'Magenta Noche', color: '#701a75' },
                  { name: 'Negro Gala', color: '#11131a' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-1 group">
                    <div
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color }}
                      title={item.name}
                    />
                    <span className="text-[9px] text-slate-400 font-montserrat hidden md:block">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/35 text-xs text-rose-200/90 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Importante con cariño:</strong> El blanco y el marfil están reservados exclusivamente para la novia.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
