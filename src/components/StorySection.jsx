import React from 'react';
import { Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import HoloTiltCard from './HoloTiltCard';

const CHAPTERS = [
  {
    number: '01',
    constellation: 'Centaurus • Primer Contacto',
    title: 'La Alineación Cuántica',
    subtitle: 'El día en que dos órbitas colisionaron',
    date: '14 de Febrero, 2021',
    location: 'Un rincón secreto de Santiago',
    story:
      'No fue casualidad. En medio del bullicio de la ciudad, un cruce de miradas detuvo el tiempo. Una conversación sobre constelaciones, sueños compartidos y un café que duró cinco horas. Desde esa tarde supimos que el universo conspiraba para no separarnos jamás.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    quote: '"Hay almas que se reconocen antes de haberse tocado."',
  },
  {
    number: '02',
    constellation: 'Orión • La Odisea Juntos',
    title: 'Expansión en Órbita',
    subtitle: 'Nuestras aventuras recorriendo el mundo',
    date: '2022 — 2025',
    location: 'Desiertos, Mares & Cumbres Nevadas',
    story:
      'Más de 15 ciudades, miles de kilómetros y una colección infinita de anécdotas. Aprendimos que el hogar no es una coordenada geográfica, sino la paz de mirarnos a los ojos después de un día caótico y decir: "estamos juntos en esto".',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    quote: '"Nuestro universo favorito cabe en un abrazo."',
  },
  {
    number: '03',
    constellation: 'Cassiopeia • El Destino',
    title: 'El Gran "Sí, Acepto"',
    subtitle: 'Bajo el cielo más puro del mundo',
    date: '28 de Diciembre, 2025',
    location: 'Bajo las estrellas del Valle del Elqui',
    story:
      'Con el viento nocturno como testigo y un telescopio apuntando a la Vía Láctea, Odlan tomó la mano de Jose. Una rodilla en la arena tibia, un brillo en los ojos y una promesa eterna. Entre lágrimas y sonrisas, el "SÍ" resonó en todo el cosmos.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    quote: '"Para siempre es solo el comienzo."',
  },
];

export default function StorySection() {
  return (
    <section id="historia" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Bitácora de Vuelo
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Nuestra Historia
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Tres estaciones cósmicas que guiaron nuestros pasos hasta el día más luminoso de nuestras vidas.
        </p>
      </div>

      {/* Chapters Cards */}
      <div className="space-y-24">
        {CHAPTERS.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.number}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-10 lg:gap-14`}
            >
              {/* Visual Tilt Card */}
              <div className="w-full lg:w-1/2">
                <HoloTiltCard className="w-full">
                  <div className="relative rounded-2xl overflow-hidden p-2.5 bg-gradient-to-br from-amber-500/30 via-slate-900/60 to-amber-900/20 border border-amber-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group">
                    <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05091a] via-transparent to-transparent opacity-80" />

                      {/* Floating Chapter Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#070e24]/80 backdrop-blur-md border border-amber-400/40 flex items-center gap-2 shadow-lg">
                        <span className="font-cinzel font-bold text-amber-300 text-sm">{item.number}</span>
                        <span className="text-[10px] tracking-widest text-amber-200/80 uppercase font-montserrat">
                          {item.constellation}
                        </span>
                      </div>

                      {/* Romantic Quote on Card */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-garamond italic text-sm md:text-base text-amber-100/90 text-center drop-shadow-md">
                          {item.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoloTiltCard>
              </div>

              {/* Text Narrative */}
              <div className="w-full lg:w-1/2 text-left">
                <div className="flex items-center gap-4 text-xs font-montserrat text-amber-300/80 uppercase tracking-widest mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
                  {item.title}
                </h3>

                <p className="font-garamond italic text-lg text-amber-200/70 mb-5">
                  {item.subtitle}
                </p>

                <p className="font-montserrat text-sm md:text-base text-slate-300 leading-relaxed mb-6 font-light">
                  {item.story}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/5 border border-amber-400/20 text-xs text-amber-300 font-montserrat">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Jose & Odlan juntos</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
