import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, Plane, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function GiftRegistry() {
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    titular: 'Josefa Valenzuela & Odlan Morales',
    rut: '18.765.432-1',
    banco: 'Banco Santander Chile',
    tipo: 'Cuenta Corriente',
    numero: '00-07281946-03',
    email: 'boda.jose.odlan@gmail.com',
  };

  const handleCopy = () => {
    cosmicAudio.playChime(1.5);
    const textToCopy = `DATOS DE TRANSFERENCIA — BODA JOSE & ODLAN\n` +
      `Titulares: ${bankDetails.titular}\n` +
      `RUT: ${bankDetails.rut}\n` +
      `Banco: ${bankDetails.banco}\n` +
      `Tipo: ${bankDetails.tipo}\n` +
      `N° Cuenta: ${bankDetails.numero}\n` +
      `Email: ${bankDetails.email}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="regalos" className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          Lluvia de Deseos
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Mesa de Regalos
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Tu presencia y tu abrazo son nuestro mejor regalo. Si además deseas hacernos un presente para despegar en nuestra nueva vida y Luna de Miel:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Transfer Card */}
        <div className="cosmic-glass rounded-3xl p-6 md:p-8 border border-amber-400/30 text-left flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">Transferencia Bancaria</h3>
                <span className="text-[11px] font-montserrat text-amber-300/70 tracking-wider uppercase">
                  Fondo Luna de Miel & Nuevo Hogar
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-montserrat bg-[#060a1d]/80 rounded-xl p-4 border border-amber-400/20 mb-6">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Titulares:</span>
                <span className="text-amber-100 font-medium">{bankDetails.titular}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">RUT:</span>
                <span className="text-amber-100 font-medium">{bankDetails.rut}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Banco:</span>
                <span className="text-amber-100 font-medium">{bankDetails.banco}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Tipo de Cuenta:</span>
                <span className="text-amber-100 font-medium">{bankDetails.tipo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">N° de Cuenta:</span>
                <span className="text-amber-300 font-bold tracking-wider">{bankDetails.numero}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-400">Email:</span>
                <span className="text-amber-100 font-medium">{bankDetails.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-white font-montserrat text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">¡Datos Copiados al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Datos Bancarios</span>
              </>
            )}
          </button>
        </div>

        {/* Honeymoon & Novios Paris / Falabella Card */}
        <div className="cosmic-glass rounded-3xl p-6 md:p-8 border border-amber-400/30 text-left flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">Luna de Miel en Japón</h3>
                <span className="text-[11px] font-montserrat text-amber-300/70 tracking-wider uppercase">
                  Aventura por el Sol Naciente
                </span>
              </div>
            </div>

            <p className="font-montserrat text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-6">
              Nuestro gran sueño tras la boda es recorrer los templos milenarios de Kioto, cruzar el cielo de Tokio y ver el Monte Fuji bajo los cerezos en flor.
            </p>

            <div className="rounded-2xl overflow-hidden mb-6 border border-amber-400/30 h-32 relative group">
              <img
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80"
                alt="Japón Luna de Miel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a1d] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-3 text-xs font-cinzel text-amber-200">
                Nuestra próxima parada en el mapa
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                cosmicAudio.playChime(1.3);
                handleCopy();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b1638] border border-amber-400/30 hover:border-amber-400 text-amber-200 font-montserrat text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Aportar a la Luna de Miel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
