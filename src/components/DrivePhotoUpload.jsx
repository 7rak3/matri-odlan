import React, { useState, useEffect } from 'react';
import {
  QrCode,
  UploadCloud,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Camera,
  FolderHeart,
  Edit3
} from 'lucide-react';
import QRCode from 'qrcode';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

export default function DrivePhotoUpload() {
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/drive/folders/matrimonio-jose-y-odlan-2027');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(driveUrl);

  // Generate QR code automatically whenever driveUrl updates
  useEffect(() => {
    QRCode.toDataURL(driveUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#050a1f',
        light: '#fdf3d1',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [driveUrl]);

  const handleCopy = () => {
    cosmicAudio.playChime(1.3);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(driveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveCustomUrl = (e) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      cosmicAudio.playChime(1.4);
      setDriveUrl(tempUrl.trim());
      setIsEditingUrl(false);
    }
  };

  return (
    <section id="fotos-drive" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>ÁLBUM COMPARTIDO • RECUERDOS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Sube Tus Fotos al Drive
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed">
          Queremos revivir cada sonrisa y momento inolvidable desde tu propia mirada.
        </p>
      </div>

      {/* Main Luxury Cosmic QR Card */}
      <HoloTiltCard className="w-full">
        <div className="cosmic-glass rounded-3xl p-6 sm:p-10 md:p-14 border border-amber-400/35 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: The QR Code */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-amber-200/20 via-amber-500/10 to-transparent border-2 border-amber-300/60 shadow-[0_0_40px_rgba(250,224,132,0.3)]">
                {/* Glowing Aura behind QR */}
                <div className="absolute inset-0 rounded-3xl bg-amber-400/10 blur-xl group-hover:bg-amber-400/20 transition-all pointer-events-none" />

                {/* QR Display */}
                <div className="relative rounded-2xl overflow-hidden bg-[#fdf3d1] p-3 shadow-inner">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Código QR para Google Drive"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain transition-transform duration-500 group-hover:scale-102"
                    />
                  ) : (
                    <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center text-slate-800 font-montserrat text-xs">
                      Cargando Código QR...
                    </div>
                  )}

                  {/* Center Badge on the QR */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#050a1f] border-2 border-amber-300 flex items-center justify-center shadow-lg">
                    <Camera className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-amber-200 font-medium">
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Escanea con tu celular</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Simple Steps */}
            <div className="md:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#091433] border border-amber-400/20 text-amber-300 text-xs font-montserrat uppercase tracking-wider">
                  <FolderHeart className="w-3.5 h-3.5" />
                  <span>Google Drive Oficial de Jose & Odlan</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Comparte Tus Fotos & Videos
                </h3>

                <p className="font-montserrat text-sm text-slate-200 leading-relaxed font-light">
                  Preparamos una carpeta abierta en Google Drive para que todos los invitados puedan subir las fotos de los preparativos, recuerdos con los novios y las fotos que tomes durante la celebración del matrimonio.
                </p>
              </div>

              {/* 3 Simple Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#050a22]/80 border border-amber-400/15">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-white">
                      Escanea el código QR
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      Abre la cámara de tu smartphone y enfoca el código QR en pantalla.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#050a22]/80 border border-amber-400/15">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-white">
                      Entra a la carpeta de Google Drive
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      No necesitas instalar ninguna aplicación extra si ya tienes cuenta de Google.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#050a22]/80 border border-amber-400/15">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-white">
                      ¡Sube todas las fotos que quieras!
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      Tus recuerdos quedarán guardados en alta resolución para toda la vida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cosmicAudio.playChime(1.4)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_25px_rgba(250,224,132,0.6)] transition-all flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Subir Fotos a Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleCopy}
                  className="px-5 py-3.5 rounded-full bg-slate-900/90 border border-amber-400/35 text-amber-200 text-xs font-montserrat tracking-wider uppercase hover:bg-amber-500/20 hover:border-amber-300 transition-all flex items-center gap-2 cursor-pointer font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>¡Enlace Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copiar Enlace</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    cosmicAudio.playChime(1.1);
                    setIsEditingUrl(!isEditingUrl);
                  }}
                  className="p-2.5 rounded-full bg-white/5 border border-amber-400/20 text-slate-400 hover:text-amber-300 hover:border-amber-400 transition-colors"
                  title="Configurar enlace de la carpeta de Drive"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Editable URL Form for Novios */}
              {isEditingUrl && (
                <form onSubmit={handleSaveCustomUrl} className="pt-3 space-y-2 text-xs font-montserrat">
                  <label className="block text-amber-300/80 uppercase tracking-widest text-[11px]">
                    Personalizar enlace de la carpeta de Drive:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="flex-1 bg-[#05091e] border border-amber-400/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-300 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-[11px] hover:bg-amber-400 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-light">
                    Pega el enlace de tu carpeta compartida de Google Drive para actualizar el código QR en tiempo real.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </HoloTiltCard>
    </section>
  );
}
