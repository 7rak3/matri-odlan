import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Heart,
  Utensils,
  MessageSquare,
  Sparkles,
  User,
  Users,
  Music,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CalendarCheck,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

const DIETARY_CHOICES = [
  { id: 'traditional', label: 'Tradicional Gala', desc: 'Menú principal de banquetería' },
  { id: 'vegetarian', label: 'Vegetariano', desc: 'Opciones libres de carnes' },
  { id: 'vegan', label: 'Vegano', desc: '100% de origen vegetal' },
  { id: 'celiac', label: 'Sin Gluten', desc: 'Preparación para celíacos' },
];

export default function RSVPSection() {
  const [formData, setFormData] = useState(() => {
    let initialName = '';
    let initialHasCompanion = false;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('invitado') || params.get('to') || params.get('guest');
      if (guestParam) initialName = guestParam.replace(/\+/g, ' ');
      if (params.get('pases') === '2' || params.get('acompanante') === 'true') {
        initialHasCompanion = true;
      }
    }
    return {
      hasCompanion: initialHasCompanion,
      attendance: 'yes', // 'yes' | 'no'
      name: initialName,
      companionName: '',
      dietary: 'traditional',
      dietaryNotes: '',
      companionDietary: 'traditional',
      companionDietaryNotes: '',
      songRequest: '',
      message: '',
    };
  });

  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute steps dynamically depending on whether they attend
  const isAttending = formData.attendance === 'yes';

  // Step definitions:
  // 1: Tipo de Pase (¿Tu invitación incluye acompañante?)
  // 2: Asistencia & Nombre del Invitado
  // 3: Menú & Preferencias (Solo si asiste)
  // 4: Música & Dedicatoria (o solo Dedicatoria si no asiste)
  // 5: Resumen & Confirmación
  const totalSteps = isAttending ? 5 : 4;

  const getStepNumber = (canonicalStep) => {
    if (canonicalStep === 1) return 1;
    if (canonicalStep === 2) return 2;
    if (isAttending) {
      if (canonicalStep === 3) return 3;
      if (canonicalStep === 4) return 4;
      if (canonicalStep === 5) return 5;
    } else {
      // If not attending, canonical step 4 is step 3, canonical step 5 is step 4
      if (canonicalStep === 4) return 3;
      if (canonicalStep === 5) return 4;
    }
    return canonicalStep;
  };

  const getStepTitle = (current) => {
    if (current === 1) return 'Tipo de Pase';
    if (current === 2) return 'Tu Asistencia';
    if (isAttending) {
      if (current === 3) return 'Menú';
      if (current === 4) return 'Fiesta & Mensaje';
      if (current === 5) return 'Confirmación';
    } else {
      if (current === 4) return 'Mensaje con Cariño';
      if (current === 5) return 'Confirmación';
    }
    return '';
  };

  const triggerGoldConfetti = () => {
    const count = 220;
    const defaults = {
      origin: { y: 0.68 },
      colors: ['#e6ca65', '#d4af37', '#7c9a63', '#fdfbf5', '#fae084'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.85 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 130, startVelocity: 50 });
  };

  const handleNext = () => {
    setValidationError('');

    // Validation for Step 2
    if (step === 2) {
      if (!formData.name.trim()) {
        setValidationError('Por favor ingresa tu nombre y apellido para continuar.');
        return;
      }
      cosmicAudio.playChime(1.2);
      if (!isAttending) {
        // Skip dietary step if not attending -> jump to step 4 (Dedication)
        setStep(4);
        return;
      }
    }

    // Validation for Step 3
    if (step === 3 && isAttending && formData.hasCompanion) {
      if (!formData.companionName.trim()) {
        setValidationError('Por favor ingresa el nombre completo de tu acompañante asignado.');
        return;
      }
    }

    cosmicAudio.playChime(1.2);
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setValidationError('');
    cosmicAudio.playChime(0.95);
    if (step === 4 && !isAttending) {
      // Came from step 2 directly
      setStep(2);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStep(2);
      setValidationError('Por favor ingresa tu nombre completo.');
      return;
    }

    cosmicAudio.playSparkleSuccess();
    triggerGoldConfetti();
    setIsSubmitted(true);
  };

  const getDietLabel = (id) => {
    const item = DIETARY_CHOICES.find((d) => d.id === id);
    return item ? item.label : 'Tradicional Gala';
  };

  const generateWhatsAppUrl = () => {
    const phone = '56912345678';
    let text = `💍 *CONFIRMACIÓN DE ASISTENCIA — MATRIMONIO ODLAN & MARÍA JOSE* 💍\n\n`;
    text += `👤 *Invitado(a) Titular:* ${formData.name}\n`;
    text += `💫 *Asistencia:* ${formData.attendance === 'yes' ? '¡Sí, asistiré con todo el cariño! 🥂🎉' : 'Lamentablemente no podré asistir 💌'}\n`;
    text += `🎟️ *Tipo de Invitación:* ${formData.hasCompanion ? 'Pase con Acompañante (2 personas)' : 'Pase Individual (1 persona)'}\n`;

    if (formData.attendance === 'yes') {
      if (formData.hasCompanion && formData.companionName) {
        text += `👥 *Acompañante Asignado:* ${formData.companionName}\n`;
        text += `   🍽️ *Menú Acompañante:* ${getDietLabel(formData.companionDietary)}${formData.companionDietaryNotes ? ` (Alergias: ${formData.companionDietaryNotes})` : ''}\n`;
      }
      text += `🍽️ *Menú Titular:* ${getDietLabel(formData.dietary)}${formData.dietaryNotes ? ` (Alergias: ${formData.dietaryNotes})` : ''}\n`;
      if (formData.songRequest) {
        text += `🎵 *Canción para bailar en la fiesta:* "${formData.songRequest}"\n`;
      }
    }

    if (formData.message) {
      text += `💌 *Mensaje para Odlan & María Jose:* "${formData.message}"\n`;
    }

    text += `\n✨ *Fecha:* Sábado 20 de Febrero de 2027\n📍 *Lugar:* Casona Los Nogales, Santiago de Chile`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp" className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10 scroll-mt-24">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#46573c]/50 border border-amber-300/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40" />
          <span>R.S.V.P. • CONFIRMACIÓN PASO A PASO</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-3">
          Confirma Tu Asistencia
        </h2>

        <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-300/70 to-transparent mb-4" />

        <p className="font-garamond italic text-lg md:text-xl text-cream-100/90 leading-relaxed">
          Queremos preparar cada detalle con dedicación. Por favor guíanos a través de estos breves pasos para registrar tu respuesta.
        </p>
      </div>

      <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-[#2b3724]/90 border border-amber-300/35 relative overflow-hidden shadow-[0_20px_60px_rgba(8,12,6,0.85)] backdrop-blur-xl">
        {/* Glow decoration */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {isSubmitted ? (
          /* ==========================================
             CONFIRMATION SUCCESS SCREEN
             ========================================== */
          <div className="text-center py-6 space-y-7 relative z-10">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(52,211,153,0.4)] animate-bounce-short">
              <CheckCircle2 className="w-10 h-10 text-emerald-300" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-montserrat tracking-[0.25em] text-amber-300 uppercase font-semibold">
                ¡Paso a Paso Completado con Éxito!
              </span>
              <h3 className="font-cinzel text-2xl md:text-4xl font-bold text-cream-50 uppercase tracking-wider">
                {formData.attendance === 'yes'
                  ? '¡Tu Asistencia Ha Sido Registrada!'
                  : 'Mensaje Recibido con Cariño'}
              </h3>
            </div>

            <p className="font-garamond italic text-lg md:text-xl text-cream-200/90 max-w-lg mx-auto leading-relaxed">
              {formData.attendance === 'yes'
                ? `¡Gracias, ${formData.name}! Nos llena de inmensa felicidad saber que celebraremos juntos en Casona Los Nogales este 20 de febrero de 2027.`
                : `Gracias por avisarnos, ${formData.name}. Estarás muy presente en nuestros corazones y pensamientos en este día tan significativo.`}
            </p>

            {/* Ticket Preview in Success */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#171e13]/90 border border-amber-300/30 text-left space-y-2 text-xs font-montserrat text-cream-200">
              <div className="flex items-center justify-between border-b border-amber-300/20 pb-2">
                <span className="text-amber-200 font-semibold uppercase tracking-wider">Pase Registrado</span>
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {formData.attendance === 'yes' ? 'Confirmado' : 'No asistirá'}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-cream-300/60 block text-[11px]">Titular:</span>
                <span className="text-cream-50 font-medium">{formData.name}</span>
              </div>
              {formData.attendance === 'yes' && formData.hasCompanion && formData.companionName && (
                <div>
                  <span className="text-cream-300/60 block text-[11px]">Acompañante:</span>
                  <span className="text-cream-50 font-medium">{formData.companionName}</span>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.4)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-montserrat text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Enviar confirmación a WhatsApp de los Novios</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#1b2317] hover:bg-[#25321f] text-amber-200 font-montserrat text-xs tracking-widest uppercase border border-amber-300/30 transition-colors"
              >
                Modificar Respuesta
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================
             STEPPER FORM
             ========================================== */
          <div className="space-y-8 relative z-10 text-left">
            {/* Stepper Progress Bar & Step Badges */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-montserrat">
                <span className="text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Paso {getStepNumber(step)} de {totalSteps}: {getStepTitle(step)}
                </span>
                <span className="text-cream-300/60 tracking-wider">
                  {Math.round((getStepNumber(step) / totalSteps) * 100)}% Completado
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-[#171e13] rounded-full overflow-hidden border border-amber-300/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-500 ease-out"
                  style={{ width: `${(getStepNumber(step) / totalSteps) * 100}%` }}
                />
              </div>

              {/* Step indicator breadcrumbs */}
              <div className="flex items-center justify-between pt-1">
                {(isAttending ? [1, 2, 3, 4, 5] : [1, 2, 4, 5]).map((s) => {
                  const num = getStepNumber(s);
                  const isCurrent = step === s;
                  const isCompleted = step > s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        if (isCompleted) {
                          cosmicAudio.playChime(1.1);
                          setStep(s);
                        }
                      }}
                      className={`flex items-center gap-1.5 text-[11px] font-montserrat uppercase tracking-wider transition-all ${
                        isCurrent
                          ? 'text-amber-200 font-bold scale-105'
                          : isCompleted
                          ? 'text-cream-200/80 hover:text-amber-300 cursor-pointer'
                          : 'text-cream-300/40 cursor-default'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-cinzel font-bold border ${
                          isCurrent
                            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                            : isCompleted
                            ? 'bg-emerald-950/70 border-emerald-400/60 text-emerald-300'
                            : 'bg-[#171e13] border-amber-300/20 text-cream-300/40'
                        }`}
                      >
                        {isCompleted ? '✓' : num}
                      </span>
                      <span className="hidden sm:inline">{getStepTitle(s)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validation Message Display */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-200 text-xs font-montserrat flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* =========================================================
                STEP 1: ¿TU INVITACIÓN INCLUYE ACOMPAÑANTE? (TIPO DE PASE)
                ========================================================= */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-montserrat tracking-widest uppercase font-semibold">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Inicio de la Confirmación</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-cream-50">
                    ¿Tu invitación incluye un acompañante?
                  </h3>
                  <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 leading-relaxed">
                    Para preparar cada mesa y detalle con dedicación, indícanos cómo fue extendida tu invitación por Odlan & María Jose.
                  </p>
                </div>

                {/* Subtle Loving Etiquette Reminder */}
                <div className="p-4 rounded-2xl bg-[#1b2317]/90 border border-amber-300/30 text-xs text-cream-100 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-amber-200 block uppercase tracking-wider text-[11px]">
                      Nota con Cariño sobre los Cupos
                    </span>
                    <p className="text-cream-200/80 text-xs leading-relaxed font-light">
                      Nuestros cupos fueron asignados de manera nominativa en cada tarjeta de invitación. Por favor selecciona la opción correspondiente a tu invitación.
                    </p>
                  </div>
                </div>

                {/* Interactive Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Option 1: Individual */}
                  <button
                    type="button"
                    onClick={() => {
                      cosmicAudio.playChime(1.1);
                      setFormData({ ...formData, hasCompanion: false });
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative group ${
                      !formData.hasCompanion
                        ? 'bg-gradient-to-br from-amber-500/25 via-[#2f3d27] to-[#1c2417] border-amber-300 shadow-[0_0_30px_rgba(212,175,55,0.25)] ring-1 ring-amber-300/60'
                        : 'bg-[#1b2317]/90 border-amber-300/20 hover:border-amber-300/50 hover:bg-[#232c1e]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-300/40 flex items-center justify-center text-amber-300">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-montserrat tracking-widest uppercase font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30">
                        1 Cupo
                      </span>
                    </div>

                    <h4 className="font-cinzel text-lg sm:text-xl font-bold text-cream-50 mb-1">
                      Invitación Individual
                    </h4>
                    <p className="font-garamond italic text-sm text-cream-200/80 leading-relaxed mb-3">
                      "Pase personal y exclusivo para ti."
                    </p>
                    <p className="font-montserrat text-xs text-cream-300/70 font-light">
                      Selecciona esta opción si tu tarjeta fue extendida para una sola persona.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-montserrat tracking-wider uppercase font-semibold text-amber-300">
                      <span>{!formData.hasCompanion ? 'Seleccionado ✓' : 'Elegir esta opción'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Option 2: Con Acompañante */}
                  <button
                    type="button"
                    onClick={() => {
                      cosmicAudio.playChime(1.2);
                      setFormData({ ...formData, hasCompanion: true });
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative group ${
                      formData.hasCompanion
                        ? 'bg-gradient-to-br from-amber-500/25 via-[#2f3d27] to-[#1c2417] border-amber-300 shadow-[0_0_30px_rgba(212,175,55,0.25)] ring-1 ring-amber-300/60'
                        : 'bg-[#1b2317]/90 border-amber-300/20 hover:border-amber-300/50 hover:bg-[#232c1e]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-300/40 flex items-center justify-center text-amber-300">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-montserrat tracking-widest uppercase font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30">
                        2 Cupos
                      </span>
                    </div>

                    <h4 className="font-cinzel text-lg sm:text-xl font-bold text-cream-50 mb-1">
                      Con Acompañante
                    </h4>
                    <p className="font-garamond italic text-sm text-cream-200/80 leading-relaxed mb-3">
                      "Pase doble para ti y tu acompañante asignado."
                    </p>
                    <p className="font-montserrat text-xs text-cream-300/70 font-light">
                      Selecciona esta opción si tu invitación indicaba expresamente un cupo para tu pareja o acompañante.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-montserrat tracking-wider uppercase font-semibold text-amber-300">
                      <span>{formData.hasCompanion ? 'Seleccionado ✓' : 'Elegir esta opción'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================
                STEP 2: ASISTENCIA & NOMBRE DEL INVITADO TITULAR
                ========================================================= */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-montserrat tracking-widest uppercase font-semibold">
                    <CalendarCheck className="w-4 h-4 text-amber-300" />
                    <span>Confirmación de Presencia</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-cream-50">
                    ¿Celebrarás junto a nosotros este gran día?
                  </h3>
                  <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 leading-relaxed">
                    Sábado 20 de Febrero de 2027 • Casona Los Nogales, Santiago de Chile.
                  </p>
                </div>

                {/* Attendance Toggle Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      cosmicAudio.playChime(1.1);
                      setFormData({ ...formData, attendance: 'yes' });
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      formData.attendance === 'yes'
                        ? 'bg-gradient-to-r from-amber-500/25 via-amber-400/35 to-amber-500/25 border-amber-300 text-cream-50 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                        : 'bg-[#1b2317] border-amber-300/20 text-cream-300/60 hover:border-amber-300/40'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="font-cinzel font-bold tracking-wider text-sm">
                      ¡SÍ, ASISTIRÉ CON AMOR! 🥂
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      cosmicAudio.playChime(0.9);
                      setFormData({ ...formData, attendance: 'no' });
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      formData.attendance === 'no'
                        ? 'bg-[#3b2326] border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                        : 'bg-[#1b2317] border-amber-300/20 text-cream-300/60 hover:border-amber-300/40'
                    }`}
                  >
                    <span className="font-cinzel font-semibold tracking-wider text-sm">
                      NO PODRÉ ASISTIR 💌
                    </span>
                  </button>
                </div>

                {/* Guest Full Name Field */}
                <div className="pt-3">
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tu Nombre y Apellido Completo *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setValidationError('');
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="Ej. Francisca Silva"
                    className="w-full bg-[#1b2317] border border-amber-300/35 rounded-xl px-4 py-3.5 text-cream-50 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm shadow-inner"
                  />
                  <p className="text-[11px] text-cream-300/60 mt-1.5 font-light">
                    Ingresa tu nombre tal como figura en tu tarjeta de invitación para registrar tu cupo.
                  </p>
                </div>
              </div>
            )}

            {/* =========================================================
                STEP 3: EXPERIENCIA GASTRONÓMICA & MENÚ (TITULAR + ACOMPAÑANTE)
                ========================================================= */}
            {step === 3 && isAttending && (
              <div className="space-y-7 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-montserrat tracking-widest uppercase font-semibold">
                    <Utensils className="w-4 h-4 text-amber-300" />
                    <span>Experiencia Gastronómica</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-cream-50">
                    Menú & Preferencias Alimentarias
                  </h3>
                  <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 leading-relaxed">
                    Queremos que disfrutes al máximo de la cena de celebración en Casona Los Nogales.
                  </p>
                </div>

                {/* Sub-card: Titular Menu */}
                <div className="p-5 rounded-2xl bg-[#1b2317]/80 border border-amber-300/25 space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-montserrat uppercase tracking-wider text-amber-200 font-semibold">
                      Tu Menú ({formData.name || 'Invitado Titular'})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {DIETARY_CHOICES.map((diet) => (
                      <button
                        key={diet.id}
                        type="button"
                        onClick={() => {
                          cosmicAudio.playChime(1.15);
                          setFormData({ ...formData, dietary: diet.id });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.dietary === diet.id
                            ? 'bg-amber-400/25 border-amber-300 text-cream-50 font-semibold shadow-sm'
                            : 'bg-[#141b11] border-amber-300/20 text-cream-300/70 hover:border-amber-300/40'
                        }`}
                      >
                        <span className="block text-xs font-montserrat font-medium mb-0.5">
                          {diet.label}
                        </span>
                        <span className="block text-[10px] text-cream-300/60 font-light">
                          {diet.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-montserrat tracking-widest uppercase text-cream-200/80 mb-1.5 font-light">
                      ¿Alergias o requerimientos específicos? (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      placeholder="Ej. Alergia a mariscos, frutos secos o intolerancia a la lactosa"
                      className="w-full bg-[#141b11] border border-amber-300/25 rounded-xl px-3.5 py-2.5 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 text-xs font-montserrat"
                    />
                  </div>
                </div>

                {/* Sub-card: Companion Data & Menu (Only if Pase Doble) */}
                {formData.hasCompanion && (
                  <div className="p-5 rounded-2xl bg-[#1b2317]/80 border border-amber-300/25 space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-montserrat uppercase tracking-wider text-amber-200 font-semibold">
                        Datos & Menú de tu Acompañante Asignado
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-montserrat tracking-widest uppercase text-amber-300/90 mb-1.5 font-medium">
                        Nombre Completo de tu Acompañante *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companionName}
                        onChange={(e) => {
                          setValidationError('');
                          setFormData({ ...formData, companionName: e.target.value });
                        }}
                        placeholder="Ej. Carlos González"
                        className="w-full bg-[#141b11] border border-amber-300/35 rounded-xl px-3.5 py-3 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 text-xs font-montserrat"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-montserrat tracking-widest uppercase text-cream-200/80 mb-1.5 font-light">
                        Preferencia de Menú del Acompañante
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {DIETARY_CHOICES.map((diet) => (
                          <button
                            key={diet.id}
                            type="button"
                            onClick={() => {
                              cosmicAudio.playChime(1.15);
                              setFormData({ ...formData, companionDietary: diet.id });
                            }}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              formData.companionDietary === diet.id
                                ? 'bg-amber-400/25 border-amber-300 text-cream-50 font-semibold shadow-sm'
                                : 'bg-[#141b11] border-amber-300/20 text-cream-300/70 hover:border-amber-300/40'
                            }`}
                          >
                            <span className="block text-xs font-montserrat font-medium mb-0.5">
                              {diet.label}
                            </span>
                            <span className="block text-[10px] text-cream-300/60 font-light">
                              {diet.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-montserrat tracking-widest uppercase text-cream-200/80 mb-1.5 font-light">
                        Alergias o requerimientos del acompañante (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.companionDietaryNotes}
                        onChange={(e) => setFormData({ ...formData, companionDietaryNotes: e.target.value })}
                        placeholder="Ej. Vegano estricto, celíaco, etc."
                        className="w-full bg-[#141b11] border border-amber-300/25 rounded-xl px-3.5 py-2.5 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 text-xs font-montserrat"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================
                STEP 4: MÚSICA & MENSAJE DE CARIÑO (DEDICATORIA)
                ========================================================= */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-montserrat tracking-widest uppercase font-semibold">
                    <Music className="w-4 h-4 text-amber-300" />
                    <span>{isAttending ? 'Fiesta & Mensaje de Amor' : 'Mensaje con Cariño'}</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-cream-50">
                    {isAttending ? '¡A Celebrar en Grande!' : 'Tus Palabras para los Novios'}
                  </h3>
                  <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 leading-relaxed">
                    {isAttending
                      ? 'Dinos qué tema encenderá la pista de baile y déjanos tus palabras de bendición y cariño.'
                      : 'Aunque no puedas asistir, tus palabras y buenos deseos acompañarán a Odlan & María Jose en su gran día.'}
                  </p>
                </div>

                {/* Song field (Only if attending) */}
                {isAttending && (
                  <div>
                    <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                      <Music className="w-3.5 h-3.5 text-amber-300" />
                      <span>¿Qué canción no puede faltar para bailar con los novios? (Opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.songRequest}
                      onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                      placeholder="Canción y artista infaltable en la pista"
                      className="w-full bg-[#1b2317] border border-amber-300/35 rounded-xl px-4 py-3.5 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
                    />
                  </div>
                )}

                {/* Dedication message */}
                <div>
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                    <span>Un Mensaje para Odlan & María Jose ❤️ (Opcional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe tus bendiciones, deseos o recuerdos con todo tu cariño..."
                    className="w-full bg-[#1b2317] border border-amber-300/35 rounded-xl p-4 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {/* =========================================================
                STEP 5: RESUMEN VIP & CONFIRMACIÓN FINAL
                ========================================================= */}
            {step === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-montserrat tracking-widest uppercase font-semibold">
                    <FileCheck2 className="w-4 h-4 text-amber-300" />
                    <span>Revisión Final</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-cream-50">
                    Resumen de tu Pase de Invitado
                  </h3>
                  <p className="font-garamond italic text-base sm:text-lg text-cream-200/90 leading-relaxed">
                    Verifica que tus datos estén correctos antes de enviar la confirmación a los novios.
                  </p>
                </div>

                {/* VIP Botanical Pass Ticket */}
                <div className="rounded-2xl p-6 bg-[#182114] border border-amber-300/40 relative overflow-hidden shadow-xl space-y-4">
                  {/* Decorative gold ribbon bar */}
                  <div className="flex items-center justify-between border-b border-amber-300/25 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span className="font-cinzel text-sm sm:text-base font-bold gold-gradient-text tracking-wider uppercase">
                        Matrimonio Odlan & María Jose
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-montserrat tracking-widest uppercase font-semibold border ${
                        formData.attendance === 'yes'
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-rose-950/80 border-rose-400 text-rose-300'
                      }`}
                    >
                      {formData.attendance === 'yes' ? 'Asistencia Confirmada' : 'No asistirá'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-montserrat">
                    <div>
                      <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-0.5">
                        Modalidad de Pase:
                      </span>
                      <span className="text-amber-200 font-semibold text-sm">
                        {formData.hasCompanion ? 'Pase con Acompañante (2 Personas)' : 'Pase Individual (1 Persona)'}
                      </span>
                    </div>

                    <div>
                      <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-0.5">
                        Invitado Titular:
                      </span>
                      <span className="text-cream-50 font-semibold text-sm">
                        {formData.name || '—'}
                      </span>
                    </div>

                    {isAttending && (
                      <div>
                        <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-0.5">
                          Menú Titular:
                        </span>
                        <span className="text-cream-200">
                          {getDietLabel(formData.dietary)}
                          {formData.dietaryNotes ? ` (${formData.dietaryNotes})` : ''}
                        </span>
                      </div>
                    )}

                    {isAttending && formData.hasCompanion && (
                      <div>
                        <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-0.5">
                          Acompañante Asignado:
                        </span>
                        <span className="text-cream-50 font-semibold">
                          {formData.companionName || '—'}
                        </span>
                        <span className="text-cream-300/80 block text-[11px] mt-0.5">
                          Menú: {getDietLabel(formData.companionDietary)}
                          {formData.companionDietaryNotes ? ` (${formData.companionDietaryNotes})` : ''}
                        </span>
                      </div>
                    )}

                    {isAttending && formData.songRequest && (
                      <div className="sm:col-span-2">
                        <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-0.5">
                          Canción para la Fiesta:
                        </span>
                        <span className="text-amber-200 italic font-garamond text-base">
                          "{formData.songRequest}"
                        </span>
                      </div>
                    )}

                    {formData.message && (
                      <div className="sm:col-span-2 pt-2 border-t border-amber-300/20">
                        <span className="text-cream-300/60 block text-[11px] uppercase tracking-wider mb-1">
                          Mensaje para los Novios:
                        </span>
                        <p className="text-cream-100/90 italic font-garamond text-sm leading-relaxed">
                          "{formData.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 border-t border-amber-300/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1b2317] hover:bg-[#25321f] text-amber-200 font-montserrat text-xs tracking-widest uppercase border border-amber-300/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(250,224,132,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer ml-auto"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:shadow-[0_0_55px_rgba(250,224,132,0.8)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer ml-auto"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CONFIRMAR ASISTENCIA</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
