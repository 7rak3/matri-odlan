import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Clock, Share2, Check, Download, QrCode, Sparkles, UserCheck } from 'lucide-react';
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
    return 'Nuestros Queridos Amigos & Familia';
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

  // Copy personalized link
  const handleCopyCustomLink = () => {
    cosmicAudio.playChime(1.4);
    const cleanUrl = window.location.origin + window.location.pathname;
    const personalizedUrl = `${cleanUrl}?invitado=${encodeURIComponent(guestName)}`;

    navigator.clipboard.writeText(personalizedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Matrimonio Jose & Odlan 💫'
  )}&dates=20261024T203000Z/20261025T070000Z&details=${encodeURIComponent(
    '¡Celebración del matrimonio de Jose & Odlan! Una noche mágica bajo las estrellas.'
  )}&location=${encodeURIComponent('Casona San José de Chicureo, Santiago, Chile')}`;

  // Download .ics file
  const downloadIcs = () => {
    cosmicAudio.playChime(1.5);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jose y Odlan//Boda Cosmica//ES',
      'BEGIN:VEVENT',
      'UID:boda-jose-odlan-2026',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261024T203000Z',
      'DTEND:20261025T070000Z',
      'SUMMARY:Matrimonio Jose & Odlan 💫',
      'DESCRIPTION:Celebración de matrimonio de Jose y Odlan en Chicureo. Te esperamos.',
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
    <section id="invitacion" className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Ticket className="w-3.5 h-3.5 text-amber-300" />
          Pase de Abordaje Galáctico
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Tu Invitación Exclusiva
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Un boleto forjado en polvo de estrellas. Tu presencia es la pieza que completa nuestra constelación.
        </p>
      </div>

      {/* Astronomical Countdown */}
      <div className="mb-14">
        <div className="cosmic-glass rounded-2xl p-6 md:p-8 max-w-3xl mx-auto text-center border border-amber-400/30">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-montserrat uppercase tracking-[0.2em] text-amber-300 mb-6">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Tiempo Restante para el Gran Día</span>
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
                className="flex flex-col items-center justify-center p-3 md:p-5 rounded-xl bg-gradient-to-b from-[#0e1635]/80 to-[#060a1d]/90 border border-amber-400/20 shadow-inner"
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
            Sábado 24 de Octubre de 2026 • 17:30 Horas • Chicureo, Chile
          </p>
        </div>
      </div>

      {/* Holographic VIP Ticket */}
      <div className="max-w-3xl mx-auto">
        <HoloTiltCard className="w-full">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#070e24] via-[#0d183d] to-[#080f27] border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Top Foil Banner */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-6 py-2 flex items-center justify-between text-[#030611] font-cinzel text-xs tracking-widest uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                ROYAL CELESTIAL PASS
              </span>
              <span className="font-montserrat">NO. 2026-JO-001</span>
              <span>ACCESO VIP</span>
            </div>

            {/* Ticket Body with Cutouts */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center relative">
              {/* Left Circular Ticket Cutout */}
              <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#030611] border-r-2 border-amber-400/50 shadow-inner" />
              {/* Right Circular Ticket Cutout */}
              <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#030611] border-l-2 border-amber-400/50 shadow-inner" />

              {/* Main Ticket Information */}
              <div className="flex-1 text-left space-y-5">
                <div>
                  <div className="text-[11px] font-montserrat tracking-[0.25em] text-amber-400/90 uppercase mb-1">
                    Boleto Reservado Especialmente Para:
                  </div>
                  <div className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-wide border-b border-amber-400/30 pb-2">
                    {guestName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-montserrat">
                  <div>
                    <div className="text-amber-300/60 uppercase tracking-widest text-[10px]">Unión Eterna</div>
                    <div className="text-amber-100 font-medium text-sm font-cinzel">Jose & Odlan</div>
                  </div>
                  <div>
                    <div className="text-amber-300/60 uppercase tracking-widest text-[10px]">Fecha Terrestre</div>
                    <div className="text-amber-100 font-medium text-sm">24 Octubre 2026</div>
                  </div>
                  <div>
                    <div className="text-amber-300/60 uppercase tracking-widest text-[10px]">Lugar Sagrado</div>
                    <div className="text-amber-100 font-medium text-sm">Casona San José</div>
                  </div>
                  <div>
                    <div className="text-amber-300/60 uppercase tracking-widest text-[10px]">Estatus de Entrada</div>
                    <div className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Confirmado VIP
                    </div>
                  </div>
                </div>

                <div className="font-garamond italic text-amber-200/80 text-sm">
                  "El viaje más hermoso del cosmos no tiene fin cuando viajamos juntos."
                </div>
              </div>

              {/* Ticket Stub / Perforated divider */}
              <div className="w-full md:w-auto flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-dashed border-amber-400/40 pt-6 md:pt-0 md:pl-8 text-center">
                <div className="p-3 bg-white rounded-xl shadow-lg border border-amber-300">
                  {/* Decorative QR code */}
                  <QrCode className="w-24 h-24 md:w-28 md:h-28 text-slate-950" />
                </div>
                <div className="text-[10px] tracking-widest text-amber-300/70 uppercase font-montserrat mt-2">
                  ESCANEAR EN EL ACCESO
                </div>
              </div>
            </div>
          </div>
        </HoloTiltCard>
      </div>

      {/* Guest Name Customizer & Link Generator */}
      <div className="mt-8 max-w-xl mx-auto cosmic-glass rounded-xl p-4 border border-amber-400/20 text-center">
        <label className="block text-xs font-montserrat text-amber-300 uppercase tracking-widest mb-2">
          ¿Deseas personalizar el nombre en este boleto?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ej. Familia Rodríguez o Nombre Invitado"
            className="flex-1 bg-[#05091a] border border-amber-400/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-300 transition-colors"
          />
          <button
            onClick={handleCopyCustomLink}
            className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-montserrat tracking-wider uppercase hover:bg-amber-400 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
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
        <p className="text-[11px] text-amber-200/50 mt-1.5 font-garamond italic">
          Copia el link personalizado y envíaselo a tus invitados para que vean su propio nombre al abrirlo.
        </p>
      </div>

      {/* Calendar Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-widest uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all duration-300 shadow-md"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
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
