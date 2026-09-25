import React from 'react';
import { MapPin, Navigation, Clock, Wine, Heart, Utensils, Music, Sparkles, AlertCircle, Shirt, GlassWater } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

const WEDDING_SCHEDULE = [
  {
    time: '17:30',
    title: 'Recepción & Cóctel al Atardecer',
    desc: 'Bienvenida a los invitados con cava de honor, bocados de autor y el reencuentro de familias en los jardines.',
    icon: Wine,
    phase: 'El Reencuentro',
  },
  {
    time: '18:30',
    title: 'La Ceremonia & "Sí, Acepto"',
    desc: 'El momento más emotivo: entrada de los novios, lectura de votos, intercambio de alianzas y el despegue de nuestra nueva vida juntos.',
    icon: Heart,
    phase: 'El Momento Cumbre',
  },
  {
    time: '19:45',
    title: 'Banquete Nupcial & Brindis de Honor',
    desc: 'Cena de gala maridada, discursos de los padres, palabras de agradecimiento y el brindis por una vida de felicidad.',
    icon: Utensils,
    phase: 'La Celebración',
  },
  {
    time: '21:30',
    title: 'El Primer Baile & Fiesta de Amor',
    desc: 'El vals de los recién casados seguido de la apertura de la pista de baile con música bailable y alegría desbordante.',
    icon: Music,
    phase: 'La Fiesta',
  },
  {
    time: '01:30',
    title: 'Trasnoche Gourmet ("El Bajón")',
    desc: 'Estación de medianoche con papas rústicas trufadas, mini burgers artesanales y churros para recargar energía.',
    icon: GlassWater,
    phase: 'Energía & Sabor',
  },
  {
    time: '03:30',
    title: 'Despedida de Bengalas',
    desc: 'Cierre mágico entre un túnel de luces incandescentes, abrazos y buenos deseos para sellar una noche inolvidable.',
    icon: Sparkles,
    phase: 'El Gran Final',
  },
];

export default function ItineraryAndLocation() {
  const address = 'Camino San José 450, Chicureo, Colina, Región Metropolitana';
  const gmapsUrl = 'https://maps.google.com/?q=Casona+San+Jose+Chicureo';
  const wazeUrl = 'https://waze.com/ul?q=Casona+San+Jose+Chicureo';

  return (
    <section id="itinerario" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          PROGRAMA DE NUESTRO DÍA
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          El Itinerario de Nuestra Boda
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Cada momento fue soñado con amor para compartirlo junto a ti y celebrar la alegría de unir nuestras vidas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-rose-400 before:to-transparent">
            {WEDDING_SCHEDULE.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="relative group text-left">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[27px] md:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#050a24] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>

                  {/* Card */}
                  <div className="cosmic-glass p-5 rounded-2xl border border-amber-400/25 group-hover:border-amber-400/60 transition-all duration-300 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-cinzel text-amber-300 font-bold text-lg md:text-xl tracking-wider">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-rose-300 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                        {item.phase}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-base md:text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                      {item.title}
                    </h4>

                    <p className="font-montserrat text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Venue Sanctuary & Dress Code */}
        <div className="lg:col-span-5 space-y-8">
          {/* Sanctuary Location Box */}
          <div className="cosmic-glass p-6 md:p-8 rounded-3xl border border-amber-400/30 text-left relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-amber-300 uppercase mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              Santuario de Nuestra Boda
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
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/25 via-amber-400/30 to-amber-500/25 border border-amber-400/60 text-amber-100 hover:text-white hover:border-amber-200 transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                Abrir en Google Maps
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.2)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#091535] border border-amber-400/30 text-amber-200 hover:text-white hover:border-amber-300 transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                Navegar con Waze
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-amber-400/20 flex items-center gap-2.5 text-xs text-slate-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Estacionamiento privado con guardias y servicio para el retorno.</span>
            </div>
          </div>

          {/* Dress Code Box */}
          <div className="cosmic-glass p-6 md:p-8 rounded-3xl border border-amber-400/30 text-left shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-amber-300 uppercase mb-3">
              <Shirt className="w-4 h-4 text-amber-400" />
              Código de Vestimenta
            </div>

            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-2">
              Gala Nupcial & Black Tie
            </h3>

            <p className="font-garamond italic text-base text-amber-200/80 mb-4">
              Queremos que te sientas radiante: Traje oscuro o esmoquin para ellos, vestido largo de gala para ellas.
            </p>

            {/* Colors */}
            <div className="mb-6">
              <span className="text-[11px] font-montserrat tracking-wider uppercase text-slate-400 block mb-2.5">
                Paleta Sugerida:
              </span>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Azul Noche', color: '#09153a' },
                  { name: 'Oro Champán', color: '#d4af37' },
                  { name: 'Verde Esmeralda', color: '#0a3a2a' },
                  { name: 'Borgoña', color: '#4a1224' },
                  { name: 'Negro Gala', color: '#11131a' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-1 group">
                    <div
                      className="w-8 h-8 rounded-full border border-amber-400/40 shadow-md group-hover:scale-110 transition-transform"
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
                <strong>Nota con cariño:</strong> El blanco y el marfil están reservados exclusivamente para la novia.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
