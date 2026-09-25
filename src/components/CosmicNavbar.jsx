import React, { useState } from 'react';
import { Sparkles, Menu, X, RotateCcw } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CosmicNavbar({ onReopenPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Nuestra Historia', href: '#historia' },
    { label: 'Invitación VIP', href: '#invitacion' },
    { label: 'Itinerario & Lugar', href: '#itinerario' },
    { label: 'Confirmar Asistencia', href: '#rsvp' },
    { label: 'Regalos', href: '#regalos' },
  ];

  const handleNavClick = () => {
    cosmicAudio.playChime(1.1);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030611]/80 backdrop-blur-md border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center group-hover:border-amber-300 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="font-cinzel text-amber-300 font-bold text-xs tracking-widest">
              J&O
            </span>
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] font-semibold text-white group-hover:text-amber-200 transition-colors block">
              JOSE & ODLAN
            </span>
            <span className="font-garamond italic text-[11px] text-amber-200/70 tracking-widest block">
              24 • 10 • 2026
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="text-xs font-montserrat tracking-[0.18em] uppercase text-slate-300 hover:text-amber-300 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Button: Re-open portal & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cosmicAudio.playChime(1.4);
              onReopenPortal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 text-[11px] font-montserrat tracking-widest uppercase transition-all cursor-pointer"
            title="Ver nuevamente la animación de la puerta cósmica"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Portal</span>
          </button>

          <a
            href="#rsvp"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/25 to-amber-400/25 border border-amber-400/50 text-amber-200 hover:text-white text-xs font-montserrat tracking-widest uppercase font-medium hover:scale-105 transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            RSVP
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030611]/95 backdrop-blur-xl border-b border-amber-400/20 px-6 py-6 space-y-4 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="block text-sm font-montserrat tracking-widest uppercase text-slate-200 hover:text-amber-300 py-2 border-b border-slate-800/60"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReopenPortal();
              }}
              className="w-full py-2.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-montserrat tracking-widest uppercase"
            >
              Reabrir Portal Cósmico
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
