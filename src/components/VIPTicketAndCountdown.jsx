import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Clock, Share2, Check, Download, QrCode, Sparkles, UserCheck, ShieldCheck, Zap } from 'lucide-react';
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

  // Countdown timer
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
    'Matrimonio Jose & Odlan 💫 (Astral Odyssey)'
  )}&dates=20261024T203000Z/20261025T070000Z&details=${encodeURIComponent(
    'Boda y Festival Cósmico Jose & Odlan. Melodic House, amor y fiesta infinita.'
  )}&location=${encodeURIComponent('Casona San José de Chicureo, Santiago, Chile')}`;

  const downloadIcs = () => {
    cosmicAudio.playChime(1.5);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jose y Odlan//Astral Odyssey Wedding//ES',
      'BEGIN:VEVENT',
      'UID:boda-jose-odlan-2026-v2',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261024T203000Z',
      'DTEND:20261025T070000Z',
      'SUMMARY:Matrimonio Jose & Odlan 💫 (Astral Odyssey)',
      'DESCRIPTION:Celebración de boda y festival cósmico de Jose y Odlan en Chicureo. Te esperamos.',
      'LOCATION:Casona San José de Chicureo, Santiago, Chile',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Boda-Jose-y-Odlan-Astral-Odyssey.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="invitacion" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/15 to-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <Ticket className="w-3.5 h-3.5 text-amber-300" />
          VIP ALL-ACCESS FESTIVAL PASS
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Tu Acreditación Cósmica
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Un pase forjado con polvo de estrellas. Tu energía y tus pasos son indispensables para encender esta odisea.
        </p>
      </div>

      {/* Astronomical Countdown */}
      <div className="mb-16">
        <div className="cosmic-glass rounded-2xl p-6 md:p-8 max-w-3xl mx-auto text-center border border-cyan-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-montserrat uppercase tracking-[0.2em] text-cyan-300 mb-6">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Cuenta Regresiva para la Bajada de Bandera</span>
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
                className="flex flex-col items-center justify-center p-3 md:p-5 rounded-xl bg-gradient-to-b from-[#0a122e]/90 to-[#040717]/95 border border-cyan-400/25 shadow-inner"
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

          <p className="font-garamond italic text-sm md:text-base text-amber-200/60 mt-6">
            Sábado 24 de Octubre de 2026 • 17:30 CLT • Casona San José, Chicureo
          </p>
        </div>
      </div>

      {/* Holographic VIP All-Access Festival Pass with Lanyard */}
      <div className="max-w-2xl mx-auto relative">
        {/* Lanyard Cord Visual */}
        <div className="w-16 h-12 mx-auto relative mb-[-6px] z-20 pointer-events-none flex flex-col items-center">
          {/* Lanyard strap */}
          <div className="w-8 h-8 rounded-t-lg bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 border-t border-amber-200 shadow-md flex items-center justify-center">
            <span className="text-[7px] font-cinzel font-bold text-slate-950 uppercase tracking-tighter">
              ASTRAL
            </span>
          </div>
          {/* Metal Clip */}
          <div className="w-5 h-4 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-sm border border-slate-500 shadow-lg" />
        </div>

        <HoloTiltCard className="w-full">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b1333] via-[#060b20] to-[#040614] border-2 border-cyan-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.2)]">
            {/* Top Festival Ribbon */}
            <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 px-6 py-2.5 flex items-center justify-between text-white font-cinzel text-xs tracking-widest uppercase font-bold shadow-md">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                ASTRAL ODYSSEY 2026
              </span>
              <span className="font-montserrat text-[10px] tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-white/20">
                PASS #JO-2410
              </span>
              <span className="text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ALL ACCESS
              </span>
            </div>

            {/* Badge Body */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center relative">
              {/* Ticket details */}
              <div className="flex-1 text-left space-y-5">
                <div>
                  <div className="text-[11px] font-montserrat tracking-[0.25em] text-cyan-300/90 uppercase mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Titular Invitado de Honor:
                  </div>
                  <div className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-wide border-b border-cyan-400/30 pb-2">
                    {guestName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-montserrat">
                  <div>
                    <div className="text-cyan-300/60 uppercase tracking-widest text-[10px]">Headliners</div>
                    <div className="text-amber-300 font-bold text-sm font-cinzel">Jose & Odlan (B2B)</div>
                  </div>
                  <div>
                    <div className="text-cyan-300/60 uppercase tracking-widest text-[10px]">Fecha del Evento</div>
                    <div className="text-white font-medium text-sm">24 Octubre 2026</div>
                  </div>
                  <div>
                    <div className="text-cyan-300/60 uppercase tracking-widest text-[10px]">Main Sanctuary</div>
                    <div className="text-white font-medium text-sm">Casona San José</div>
                  </div>
                  <div>
                    <div className="text-cyan-300/60 uppercase tracking-widest text-[10px]">Zona de Acceso</div>
                    <div className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Backstage & Pista VIP
                    </div>
                  </div>
                </div>

                <div className="font-garamond italic text-amber-200/90 text-sm">
                  "El viaje más hermoso del cosmos tiene banda sonora y dura para siempre."
                </div>
              </div>

              {/* QR Hologram Perforated Stub */}
              <div className="w-full md:w-auto flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-dashed border-cyan-400/40 pt-6 md:pt-0 md:pl-8 text-center">
                <div className="p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-cyan-300">
                  <QrCode className="w-24 h-24 md:w-28 md:h-28 text-slate-950" />
                </div>
                <div className="text-[10px] tracking-widest text-cyan-300/80 uppercase font-montserrat mt-2 font-semibold">
                  SCAN FOR ENTRY
                </div>
              </div>
            </div>
          </div>
        </HoloTiltCard>
      </div>

      {/* Guest Name Customizer & Link Generator */}
      <div className="mt-8 max-w-xl mx-auto cosmic-glass rounded-xl p-4 border border-cyan-400/20 text-center">
        <label className="block text-xs font-montserrat text-cyan-300 uppercase tracking-widest mb-2">
          ¿Deseas personalizar el nombre en este pase?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ej. Camila & Rodrigo o Familia Morales"
            className="flex-1 bg-[#05091a] border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-300 transition-colors"
          />
          <button
            onClick={handleCopyCustomLink}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-montserrat tracking-wider uppercase hover:bg-cyan-400 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
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
        <p className="text-[11px] text-cyan-200/50 mt-1.5 font-garamond italic">
          Envía el link a tus amigos para que abran su invitación con su nombre en el pase VIP.
        </p>
      </div>

      {/* Calendar Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/80 border border-cyan-400/40 text-cyan-200 text-xs font-montserrat tracking-widest uppercase hover:bg-cyan-500/20 hover:border-cyan-300 transition-all duration-300 shadow-md"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          Añadir a Google Calendar
        </a>

        <button
          onClick={downloadIcs}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-400" />
          Descargar Recordatorio (.ICS / Apple)
        </button>
      </div>
    </section>
  );
}
