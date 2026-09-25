import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Share2, Check, Download, Heart, Mail } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

// Wedding Date: Oct 24, 2026, 17:30 CLT (GMT-3)
const TARGET_DATE = new Date('2026-10-24T17:30:00-03:00');

export default function VIPTicketAndCountdown() {
  const [guestName, setGuestName] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('invitado') || params.get('to') || params.get('guest');
      if (guestParam) return guestParam.replace(/\+/g, ' ');
    }
    return 'Familia & Amigos de Honor';
  });

  const [copiedLink, setCopiedLink] = useState(false);
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

  const handleCopyCustomLink = () => {
    cosmicAudio.playChime(1.4);
    const cleanUrl = window.location.origin + window.location.pathname;
    const personalizedUrl = `${cleanUrl}?invitado=${encodeURIComponent(guestName)}`;

    navigator.clipboard.writeText(personalizedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Matrimonio Jose & Odlan 💍👰🤵'
  )}&dates=20261024T203000Z/20261025T070000Z&details=${encodeURIComponent(
    'Celebración del matrimonio de Jose & Odlan. ¡Esperamos compartir este día inolvidable junto a ti!'
  )}&location=${encodeURIComponent('Casona San José de Chicureo, Santiago, Chile')}`;

  const downloadIcs = () => {
    cosmicAudio.playChime(1.5);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jose y Odlan//Matrimonio Sagrado//ES',
      'BEGIN:VEVENT',
      'UID:matrimonio-jose-y-odlan-2026',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261024T203000Z',
      'DTEND:20261025T070000Z',
      'SUMMARY:Matrimonio Jose & Odlan 💍',
      'DESCRIPTION:Celebración de matrimonio de Jose y Odlan en Chicureo. Te esperamos con todo nuestro amor.',
      'LOCATION:Casona San José de Chicureo, Santiago, Chile',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Matrimonio-Jose-y-Odlan.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="invitacion" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          INVITACIÓN NUPCIAL OFICIAL
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Nuestra Carta de Invitación
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Tu presencia y tu cariño son el regalo más valioso en el día en que unimos nuestras vidas.
        </p>
      </div>

      {/* Countdown to "Sí, Acepto" */}
      <div className="mb-16">
        <div className="cosmic-glass rounded-3xl p-6 md:p-8 max-w-3xl mx-auto text-center border border-amber-400/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-montserrat uppercase tracking-[0.2em] text-amber-300 mb-6">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Tiempo restante para decir: "Sí, Acepto"</span>
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

          <p className="font-garamond italic text-sm md:text-base text-amber-200/70 mt-6">
            Sábado 24 de Octubre de 2026 • 17:30 Horas • Chicureo, Santiago de Chile
          </p>
        </div>
      </div>

      {/* The Luxury Wedding Invitation Letter Card */}
      <div className="max-w-3xl mx-auto">
        <HoloTiltCard className="w-full">
          <div className="relative rounded-3xl overflow-hidden p-3 md:p-4 bg-gradient-to-b from-amber-400/40 via-amber-700/20 to-amber-900/30 border-2 border-amber-300/60 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.2)]">
            {/* Interior Parchment Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#091129] via-[#050b1e] to-[#040717] p-8 md:p-14 border border-amber-300/40 text-center space-y-6">
              {/* Top Sacred Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-amber-400/40" />
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                  <div className="h-px w-12 bg-amber-400/40" />
                </div>

                <p className="font-garamond italic text-sm md:text-base text-amber-200/80 tracking-wider">
                  Con la bendición de Dios, de nuestras familias y la alegría del corazón
                </p>
              </div>

              {/* Novios Names */}
              <div>
                <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-amber-300/70 mb-2">
                  Tenemos el honor de invitar a
                </p>

                <div className="my-4 py-2 border-y border-amber-400/30 max-w-lg mx-auto">
                  <h3 className="font-cinzel text-2xl md:text-4xl font-bold text-white tracking-wide">
                    {guestName}
                  </h3>
                </div>

                <p className="font-garamond italic text-base md:text-lg text-slate-200 leading-relaxed max-w-md mx-auto">
                  a ser testigo de la unión matrimonial y acompañarnos en la celebración de
                </p>
              </div>

              {/* The Couple */}
              <div>
                <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black gold-gradient-text tracking-widest uppercase">
                  Jose & Odlan
                </h1>
                <p className="font-script text-3xl md:text-4xl text-amber-200/80 mt-1">
                  y celebrar juntos el comienzo de nuestra nueva vida
                </p>
              </div>

              {/* Event Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-400/20 text-xs font-montserrat max-w-xl mx-auto">
                <div className="p-3 rounded-xl bg-[#091433]/60 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1">Fecha</div>
                  <div className="text-white font-medium text-sm">24 Octubre 2026</div>
                </div>
                <div className="p-3 rounded-xl bg-[#091433]/60 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1">Hora</div>
                  <div className="text-white font-medium text-sm">17:30 Horas</div>
                </div>
                <div className="p-3 rounded-xl bg-[#091433]/60 border border-amber-400/15">
                  <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-1">Lugar</div>
                  <div className="text-white font-medium text-sm">Casona San José</div>
                </div>
              </div>

              {/* Wax Seal at the Bottom */}
              <div className="pt-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                  <div className="w-full h-full rounded-full bg-[#060c24] flex items-center justify-center border border-amber-200/40">
                    <span className="font-cinzel text-amber-300 font-bold text-sm tracking-widest">
                      J&O
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HoloTiltCard>
      </div>

      {/* Guest Name Customizer */}
      <div className="mt-8 max-w-xl mx-auto cosmic-glass rounded-2xl p-4 border border-amber-400/25 text-center">
        <label className="block text-xs font-montserrat text-amber-300 uppercase tracking-widest mb-2">
          ¿Deseas personalizar el nombre en esta invitación?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ej. Familia Rodríguez o Nombre Invitado"
            className="flex-1 bg-[#05091e] border border-amber-400/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-300 transition-colors"
          />
          <button
            onClick={handleCopyCustomLink}
            className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-montserrat tracking-wider uppercase hover:bg-amber-400 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                Copiar Enlace
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-amber-200/60 mt-1.5 font-garamond italic">
          Copia el link personalizado y envíaselo a tus invitados para que vean su propio nombre al abrir la invitación.
        </p>
      </div>

      {/* Calendar Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md font-medium"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          Añadir a Google Calendar
        </a>

        <button
          onClick={downloadIcs}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md cursor-pointer font-medium"
        >
          <Download className="w-4 h-4 text-amber-400" />
          Descargar Recordatorio (.ICS / Apple)
        </button>
      </div>
    </section>
  );
}
