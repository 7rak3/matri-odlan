import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, MapPin, Sparkles, Heart } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

// Wedding Date: Feb 20, 2027, 17:30 CLT (GMT-3)
const TARGET_DATE = new Date('2027-02-20T17:30:00-03:00');

export default function VIPTicketAndCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer calculations
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = TARGET_DATE - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Matrimonio Jose & Odlan 💍✨ (20.02.2027)'
  )}&dates=20270220T203000Z/20270221T070000Z&details=${encodeURIComponent(
    'Celebración del Matrimonio de Jose & Odlan. ¡Esperamos compartir este día inolvidable junto a ti! Casona San José de Chicureo, Santiago de Chile.'
  )}&location=${encodeURIComponent('Casona San José de Chicureo, Santiago, Chile')}`;

  const downloadIcs = () => {
    cosmicAudio.playChime(1.5);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jose y Odlan//Matrimonio//ES',
      'BEGIN:VEVENT',
      'UID:matrimonio-jose-y-odlan-20270220',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20270220T203000Z',
      'DTEND:20270221T070000Z',
      'SUMMARY:Matrimonio Jose & Odlan 💍✨',
      'DESCRIPTION:Celebración del matrimonio de Jose & Odlan en Casona San José de Chicureo. Te esperamos con todo nuestro cariño.',
      'LOCATION:Casona San José de Chicureo, Santiago, Chile',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Matrimonio-Jose-y-Odlan-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="invitacion" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>SAVE THE DATE • RESERVA LA FECHA</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Fecha & Lugar
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Nuestra historia continúa y nos encantaría que seas parte de este día tan especial.
        </p>
      </div>

      {/* Countdown to "20.02.2027" */}
      <div className="mb-16">
        <div className="cosmic-glass rounded-3xl p-6 md:p-8 max-w-3xl mx-auto text-center border border-amber-400/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-montserrat uppercase tracking-[0.2em] text-amber-300 mb-6">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Tiempo restante para nuestro matrimonio</span>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'DÍAS', value: timeLeft.days },
              { label: 'HORAS', value: timeLeft.hours },
              { label: 'MINUTOS', value: timeLeft.minutes },
              { label: 'SEGUNDOS', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center p-3 md:p-5 rounded-2xl bg-gradient-to-b from-[#0c1433]/90 to-[#04081c]/95 border border-amber-400/20 shadow-inner"
              >
                <span className="font-cinzel text-2xl md:text-5xl font-bold gold-gradient-text">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs font-montserrat tracking-widest text-amber-200/70 mt-1 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="font-montserrat text-sm md:text-base text-amber-200 font-semibold mt-6 tracking-wide">
            ✨ SÁBADO 20 DE FEBRERO DE 2027 • SANTIAGO DE CHILE ✨
          </p>
        </div>
      </div>

      {/* The Luxury Wedding Save The Date Letter Card */}
      <div className="max-w-3xl mx-auto">
        <HoloTiltCard className="w-full">
          <div className="relative rounded-3xl overflow-hidden p-3 md:p-4 bg-gradient-to-b from-amber-400/40 via-amber-700/20 to-amber-900/30 border-2 border-amber-300/60 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.2)]">
            {/* Interior Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#091129] via-[#050b1e] to-[#040717] p-8 md:p-14 border border-amber-300/40 text-center space-y-6">
              {/* Monogram Seal */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-amber-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(250,224,132,0.3)]">
                  <span className="font-cinzel text-amber-300 font-bold text-sm tracking-widest">
                    J&O
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-amber-400/40" />
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                  <div className="h-px w-12 bg-amber-400/40" />
                </div>
              </div>

              {/* Couple Header */}
              <div>
                <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-amber-300/80 mb-2">
                  Tenemos el honor de invitarte a celebrar la unión de
                </p>

                <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black gold-gradient-text tracking-widest uppercase mb-3">
                  Jose & Odlan
                </h1>

                <p className="font-garamond italic text-base md:text-lg text-slate-200 leading-relaxed max-w-lg mx-auto">
                  Nuestra historia continúa y nos encantaría que nos acompañes en el día en que prometemos amarnos y cuidarnos para siempre.
                </p>
              </div>

              {/* Date Callout Box */}
              <div className="py-2">
                <p className="font-garamond italic text-base md:text-xl text-amber-200/90 mb-3">
                  Por favor, reserva esta fecha en tu calendario:
                </p>

                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-300 shadow-[0_0_40px_rgba(250,224,132,0.35)] max-w-lg mx-auto">
                  <div className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black gold-gradient-text tracking-widest uppercase">
                    ✨ 20.02.2027 ✨
                  </div>
                  <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] uppercase text-white font-bold mt-2">
                    SÁBADO 20 DE FEBRERO DE 2027
                  </p>
                </div>
              </div>

              {/* Event Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-400/20 text-xs font-montserrat max-w-xl mx-auto">
                <div className="p-3.5 rounded-xl bg-[#091433]/70 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1">Fecha</div>
                  <div className="text-white font-semibold text-sm">20 Febrero 2027</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091433]/70 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1">Hora</div>
                  <div className="text-white font-semibold text-sm">17:30 Horas</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091433]/70 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Lugar
                  </div>
                  <div className="text-white font-semibold text-sm">Casona San José</div>
                  <div className="text-[11px] text-amber-200/60 mt-0.5">Chicureo, Santiago</div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="pt-2 text-center">
                <p className="font-montserrat text-xs text-slate-300">
                  Pronto compartiremos más detalles e información en la invitación formal.
                </p>
                <p className="font-script text-2xl md:text-3xl text-amber-200/80 mt-1">
                  ¡Nos vemos pronto!
                </p>
              </div>
            </div>
          </div>
        </HoloTiltCard>
      </div>

      {/* Calendar Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md font-medium"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          Añadir a Google Calendar (20.02.2027)
        </a>

        <button
          onClick={downloadIcs}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md cursor-pointer font-medium"
        >
          <Download className="w-4 h-4 text-amber-400" />
          Descargar Recordatorio (.ICS / Apple)
        </button>
      </div>
    </section>
  );
}
