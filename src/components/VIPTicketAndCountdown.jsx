import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, MapPin, Navigation, Sparkles, Heart } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

// Wedding Date: Feb 20, 2027, 17:30 CLT
const TARGET_DATE = new Date('2027-02-20T17:30:00-03:00');

export default function VIPTicketAndCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const address = 'Casona Los Nogales, Santiago de Chile';
  const gmapsUrl = 'https://maps.google.com/?q=Casona+Los+Nogales';
  const wazeUrl = 'https://waze.com/ul?q=Casona+Los+Nogales';

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Matrimonio Odlan & María Jose 💍✨'
  )}&dates=20270220T203000Z/20270221T070000Z&details=${encodeURIComponent(
    'Celebración del Matrimonio de Odlan & María Jose. ¡Esperamos compartir este día inolvidable junto a ti! Casona Los Nogales, Santiago de Chile.'
  )}&location=${encodeURIComponent('Casona Los Nogales, Santiago, Chile')}`;

  const downloadIcs = () => {
    cosmicAudio.playChime(1.5);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Odlan y Maria Jose//Matrimonio//ES',
      'BEGIN:VEVENT',
      'UID:matrimonio-odlan-y-mariajose-20270220',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20270220T203000Z',
      'DTEND:20270221T070000Z',
      'SUMMARY:Matrimonio Odlan & María Jose 💍✨',
      'DESCRIPTION:Celebración del matrimonio de Odlan & María Jose en Casona Los Nogales. Te esperamos con todo nuestro cariño.',
      'LOCATION:Casona Los Nogales, Santiago, Chile',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Matrimonio-Odlan-y-MariaJose-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 space-y-20 py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* 1. Countdown Section ("ME ENCANTAAAAA") */}
      <section id="fecha-lugar" className="scroll-mt-24 text-center">
        {/* Eyebrow Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B0926A]/35 border border-[#FAE7C9]/45 text-[#FAE7C9] text-xs tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
            <span>SAVE THE DATE • RESERVA LA FECHA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-3">
            Fecha & Lugar
          </h2>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1C78F] to-transparent mb-4" />

          <p className="font-garamond italic text-lg md:text-xl text-[#FAE7C9]/95 leading-relaxed">
            Nuestra historia continúa y nos encantaría que seas parte de este día tan especial.
          </p>
        </div>

        {/* Countdown Timer Display Card */}
        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#575432]/90 border border-[#FAE7C9]/45 shadow-[0_20px_50px_rgba(45,42,20,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat uppercase tracking-[0.25em] text-[#E1C78F] mb-6 font-medium">
            <Clock className="w-4 h-4 text-[#FAE7C9] animate-pulse" />
            <span>Tiempo restante para nuestro matrimonio</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
            {[
              { label: 'DÍAS', value: timeLeft.days },
              { label: 'HORAS', value: timeLeft.hours },
              { label: 'MINUTOS', value: timeLeft.minutes },
              { label: 'SEGUNDOS', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl bg-[#484529]/95 border border-[#E1C78F]/40 shadow-inner"
              >
                <span className="font-cinzel text-2xl sm:text-5xl md:text-6xl font-bold gold-gradient-text leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs font-montserrat tracking-widest text-[#FAE7C9]/90 mt-2 uppercase font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="font-montserrat text-xs sm:text-sm md:text-base text-[#FAE7C9] font-semibold mt-8 tracking-[0.2em] uppercase">
            ✨ SÁBADO 20 DE FEBRERO DE 2027 • SANTIAGO DE CHILE ✨
          </p>
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cosmicAudio.playChime(1.3)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#575432] border border-[#FAE7C9]/50 text-[#FAE7C9] text-xs font-montserrat tracking-widest uppercase hover:bg-[#B0926A]/55 hover:border-[#FAE7C9] transition-all duration-300 shadow-md font-medium"
          >
            <Calendar className="w-4 h-4 text-[#E1C78F]" />
            <span>Añadir a Google Calendar</span>
          </a>

          <button
            onClick={downloadIcs}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#575432] border border-[#FAE7C9]/50 text-[#FAE7C9] text-xs font-montserrat tracking-widest uppercase hover:bg-[#B0926A]/55 hover:border-[#FAE7C9] transition-all duration-300 shadow-md cursor-pointer font-medium"
          >
            <Download className="w-4 h-4 text-[#E1C78F]" />
            <span>Descargar Recordatorio (.ICS)</span>
          </button>
        </div>
      </section>

      {/* 2. Venue Location & Loving Dress Note Section */}
      <section id="ubicacion" className="scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Venue Card (7 cols) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#575432]/90 border border-[#FAE7C9]/45 shadow-[0_15px_40px_rgba(45,42,20,0.45)] text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-montserrat tracking-widest text-[#E1C78F] uppercase mb-3 font-semibold">
                <MapPin className="w-4 h-4 text-[#E1C78F]" />
                <span>Lugar de Nuestra Celebración</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#FAE7C9] mb-2">
                Casona Los Nogales
              </h3>

              <p className="font-garamond italic text-lg text-[#E1C78F] mb-4">
                Santiago de Chile
              </p>

              <p className="font-montserrat text-xs sm:text-sm text-[#FAE7C9]/90 leading-relaxed mb-6 font-light">
                {address}
              </p>
            </div>

            {/* Direct Navigation Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.2)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B0926A]/65 via-[#E1C78F]/55 to-[#B0926A]/65 border border-[#FAE7C9]/70 text-[#FAE7C9] hover:text-white hover:border-white transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#FAE7C9]" />
                <span>Abrir en Google Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.2)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#484529] border border-[#E1C78F]/45 text-[#FAE7C9] hover:text-white hover:border-[#FAE7C9] transition-all font-montserrat text-xs tracking-widest uppercase font-semibold shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#E1C78F]" />
                <span>Navegar con Waze</span>
              </a>
            </div>
          </div>

          {/* Loving Dress Note Card (5 cols) — ONLY this was requested */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#575432]/90 border border-[#FAE7C9]/45 shadow-[0_15px_40px_rgba(45,42,20,0.45)] text-left flex flex-col justify-center">
            <div className="p-6 rounded-2xl bg-[#484529]/95 border border-[#E1C78F]/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#B0926A]/35 border border-[#FAE7C9]/50 flex items-center justify-center mx-auto shadow-sm">
                <Heart className="w-6 h-6 text-[#FAE7C9] fill-[#E1C78F]/40 animate-pulse" />
              </div>

              <h4 className="font-cinzel text-lg sm:text-xl font-bold gold-gradient-text uppercase tracking-wider">
                Nota con Cariño
              </h4>

              <div className="w-12 h-0.5 mx-auto bg-[#E1C78F]/60" />

              <p className="font-garamond italic text-lg sm:text-xl text-[#FAE7C9] leading-relaxed">
                "El blanco y el marfil están reservados exclusivamente para la novia."
              </p>

              <p className="font-montserrat text-xs text-[#E1C78F] tracking-wide font-light">
                ¡Gracias por acompañarnos con tanto amor y complicidad!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
