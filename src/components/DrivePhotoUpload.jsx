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
import { getLocalSettings, saveDashboardSettings } from '../utils/rsvpService';
import HoloTiltCard from './HoloTiltCard';

export default function DrivePhotoUpload() {
  const [driveUrl, setDriveUrl] = useState(
    () => getLocalSettings().driveUrl || 'https://drive.google.com/drive/folders/matrimonio-odlan-y-mariajose-2027'
  );
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
        dark: '#464428',
        light: '#FAE7C9',
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
      const nextUrl = tempUrl.trim();
      cosmicAudio.playChime(1.4);
      setDriveUrl(nextUrl);
      saveDashboardSettings({ driveUrl: nextUrl });
      setIsEditingUrl(false);
    }
  };

  return (
    <section id="fotos-drive" className="relative py-20 px-4 md:px-8 max-w-5xl mx-auto z-10 scroll-mt-24">
      {/* Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B0926A]/35 border border-[#FAE7C9]/45 text-[#FAE7C9] text-xs tracking-[0.25em] uppercase mb-4 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-[#E1C78F]" />
          <span>ÁLBUM COMPARTIDO • RECUERDOS</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-3">
          Sube Tus Fotos al Drive
        </h2>

        <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1C78F] to-transparent mb-4" />

        <p className="font-garamond italic text-lg md:text-xl text-[#FAE7C9]/95 leading-relaxed">
          Queremos revivir cada sonrisa, brindis y momento inolvidable desde tu propia mirada.
        </p>
      </div>

      {/* Main Luxury Botanical QR Card */}
      <HoloTiltCard className="w-full">
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-[#575432]/90 border border-[#FAE7C9]/45 relative overflow-hidden shadow-[0_20px_60px_rgba(45,42,20,0.5)] backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: The QR Code */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#FAE7C9]/20 via-[#B0926A]/25 to-transparent border-2 border-[#FAE7C9]/55 shadow-[0_0_35px_rgba(225,199,143,0.25)]">
                {/* Glowing Aura behind QR */}
                <div className="absolute inset-0 rounded-3xl bg-[#FAE7C9]/15 blur-xl group-hover:bg-[#FAE7C9]/25 transition-all pointer-events-none" />

                {/* QR Display */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FAE7C9] p-3 shadow-inner">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Código QR para Google Drive de Odlan & María Jose"
                      className="w-56 h-56 sm:w-60 sm:h-60 object-contain transition-transform duration-500 group-hover:scale-102"
                    />
                  ) : (
                    <div className="w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center text-[#3a3820] font-montserrat text-xs">
                      Cargando Código QR...
                    </div>
                  )}

                  {/* Center Badge on the QR */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#464428] border-2 border-[#E1C78F] flex items-center justify-center shadow-lg">
                    <Camera className="w-5 h-5 text-[#FAE7C9]" />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-[#FAE7C9] font-medium">
                  <QrCode className="w-3.5 h-3.5 text-[#E1C78F]" />
                  <span>Escanea con tu celular</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Simple Steps */}
            <div className="md:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#484529] border border-[#E1C78F]/40 text-[#E1C78F] text-xs font-montserrat uppercase tracking-wider">
                  <FolderHeart className="w-3.5 h-3.5 text-[#FAE7C9]" />
                  <span>Google Drive Oficial • Odlan & María Jose</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FAE7C9] tracking-wide">
                  Comparte Tus Recuerdos
                </h3>

                <p className="font-montserrat text-sm text-[#FAE7C9]/90 leading-relaxed font-light">
                  Preparamos una carpeta abierta en Google Drive para que todos los invitados puedan subir las fotos de los preparativos, recuerdos con los novios y cada instante vivido durante nuestro matrimonio.
                </p>
              </div>

              {/* 3 Simple Steps */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#484529]/90 border border-[#FAE7C9]/25">
                  <div className="w-7 h-7 rounded-full bg-[#B0926A]/45 border border-[#FAE7C9]/50 text-[#FAE7C9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-[#FAE7C9]">
                      Escanea el código QR
                    </h4>
                    <p className="text-xs text-[#E1C78F]/90 font-light mt-0.5">
                      Abre la cámara de tu teléfono y apunta al código QR en pantalla o en las mesas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#484529]/90 border border-[#FAE7C9]/25">
                  <div className="w-7 h-7 rounded-full bg-[#B0926A]/45 border border-[#FAE7C9]/50 text-[#FAE7C9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-[#FAE7C9]">
                      Entra a la carpeta de Google Drive
                    </h4>
                    <p className="text-xs text-[#E1C78F]/90 font-light mt-0.5">
                      No necesitas instalar ninguna aplicación extra si ya tienes cuenta de Google.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#484529]/90 border border-[#FAE7C9]/25">
                  <div className="w-7 h-7 rounded-full bg-[#B0926A]/45 border border-[#FAE7C9]/50 text-[#FAE7C9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-xs sm:text-sm text-[#FAE7C9]">
                      ¡Sube todas las fotos que quieras!
                    </h4>
                    <p className="text-xs text-[#E1C78F]/90 font-light mt-0.5">
                      Tus recuerdos quedarán guardados en alta resolución para toda la vida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cosmicAudio.playChime(1.4)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_25px_rgba(250,231,201,0.65)] transition-all flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Subir Fotos a Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleCopy}
                  className="px-5 py-3.5 rounded-full bg-[#484529] border border-[#FAE7C9]/45 text-[#FAE7C9] text-xs font-montserrat tracking-wider uppercase hover:bg-[#B0926A]/45 hover:border-[#FAE7C9] transition-all flex items-center gap-2 cursor-pointer font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-200">¡Enlace Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#E1C78F]" />
                      <span>Copiar Enlace</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    cosmicAudio.playChime(1.1);
                    setIsEditingUrl(!isEditingUrl);
                  }}
                  className="p-2.5 rounded-full bg-[#484529] border border-[#FAE7C9]/35 text-[#E1C78F] hover:text-[#FAE7C9] hover:border-[#FAE7C9] transition-colors cursor-pointer"
                  title="Configurar enlace de la carpeta de Drive"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Editable URL Form for Novios */}
              {isEditingUrl && (
                <form onSubmit={handleSaveCustomUrl} className="pt-3 space-y-2 text-xs font-montserrat">
                  <label className="block text-[#FAE7C9] uppercase tracking-widest text-[11px]">
                    Personalizar enlace de la carpeta de Drive:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="flex-1 bg-[#3e3c23] border border-[#FAE7C9]/45 rounded-xl px-3.5 py-2 text-xs text-[#FAE7C9] focus:outline-none focus:border-[#FAE7C9] font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#FAE7C9] text-[#3a3820] font-bold uppercase tracking-wider text-[11px] hover:bg-[#E1C78F] transition-colors cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                  <p className="text-[10px] text-[#E1C78F] font-light">
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
