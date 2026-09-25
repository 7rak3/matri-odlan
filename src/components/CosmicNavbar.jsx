import React, { useState } from 'react';
import { Sparkles, Menu, X, RotateCcw, Heart } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function CosmicNavbar({ onReopenPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean, concise, luxury links without redundancy
  const navLinks = [
    { label: 'Historia', href: '#historia' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Invitación', href: '#invitacion' },
    { label: 'Itinerario', href: '#itinerario' },
    { label: 'Regalos', href: '#regalos' },
  ];

  const handleNavClick = () => {
    cosmicAudio.playChime(1.1);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#02040b]/85 backdrop-blur-xl border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#"
          onClick={() => cosmicAudio.playChime(1.3)}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center group-hover:border-amber-300 transition-colors shadow-[0_0_15px_rgba(250,224,132,0.2)]">
            <span className="font-cinzel text-amber-300 font-bold text-xs tracking-widest">
              J&O
            </span>
          </div>
          <div>
            <span className="font-cinzel text-base tracking-[0.2em] font-bold text-white group-hover:text-amber-200 transition-colors block">
              JOSE & ODLAN
            </span>
            <span className="font-montserrat text-[10px] text-amber-200/90 tracking-widest block uppercase font-medium">
              20 • FEBRERO • 2027
            </span>
          </div>
        </a>

        {/* Desktop Links with Generous Spacing */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="text-xs font-montserrat tracking-[0.22em] uppercase text-slate-300 hover:text-amber-300 transition-colors py-1 relative group font-medium"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Buttons: Portal Reopen & RSVP */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              cosmicAudio.playChime(1.4);
              onReopenPortal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 text-[11px] font-montserrat tracking-widest uppercase transition-all cursor-pointer font-medium"
            title="Ver nuevamente la animación de apertura 3D"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Portal</span>
          </button>

          <a
            href="#rsvp"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-500/30 border border-amber-300/80 text-white hover:border-amber-200 text-xs font-montserrat tracking-widest uppercase font-semibold hover:scale-105 transition-all shadow-[0_0_18px_rgba(250,224,132,0.3)]"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>RSVP</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-amber-300 hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#02040b]/98 backdrop-blur-2xl border-b border-amber-400/20 px-6 py-6 space-y-4 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="block text-sm font-montserrat tracking-widest uppercase text-slate-200 hover:text-amber-300 py-2.5 border-b border-slate-800/60 font-medium"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="#rsvp"
              onClick={handleNavClick}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              CONFIRMAR ASISTENCIA (RSVP)
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReopenPortal();
              }}
              className="w-full py-2.5 rounded-full bg-white/5 border border-amber-400/40 text-amber-300 text-xs font-montserrat tracking-widest uppercase"
            >
              Reabrir Portal 3D
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
