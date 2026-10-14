import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, Utensils, MessageSquare, Sparkles, User, Users, Music, AlertCircle } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

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
      name: initialName,
      attendance: 'yes',
      hasCompanion: initialHasCompanion,
      companionName: '',
      companionDietary: 'traditional',
      companionDietaryNotes: '',
      dietary: 'traditional',
      dietaryNotes: '',
      songRequest: '',
      message: '',
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const triggerGoldConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#e6ca65', '#d4af37', '#7c9a63', '#fdfbf5', '#ffffff'],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    cosmicAudio.playSparkleSuccess();
    triggerGoldConfetti();
    setIsSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const phone = '56912345678';
    const text = `💍 *CONFIRMACIÓN DE ASISTENCIA — MATRIMONIO ODLAN & MARÍA JOSE* 💍\n\n` +
      `👤 *Invitado:* ${formData.name}\n` +
      `💫 *Asistencia:* ${formData.attendance === 'yes' ? '¡Sí, asistiré con todo el cariño! 🥂🎉' : 'Lamentablemente no podré asistir 💌'}\n` +
      (formData.attendance === 'yes' && formData.hasCompanion && formData.companionName
        ? `👥 *Acompañante asignado:* ${formData.companionName} (${formData.companionDietary}${formData.companionDietaryNotes ? ` - Alergias: ${formData.companionDietaryNotes}` : ''})\n`
        : `👥 *Invitación individual:* 1 persona\n`) +
      (formData.attendance === 'yes' ? `🍽️ *Preferencia Menú:* ${formData.dietary} ${formData.dietaryNotes ? `(Alergias: ${formData.dietaryNotes})` : ''}\n` : '') +
      (formData.songRequest ? `🎵 *Canción sugerida:* "${formData.songRequest}"\n` : '') +
      (formData.message ? `💌 *Mensaje para Odlan & María Jose:* "${formData.message}"\n` : '');

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp" className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#46573c]/50 border border-amber-300/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40" />
          <span>R.S.V.P. • CONFIRMACIÓN</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-3">
          Confirma Tu Asistencia
        </h2>

        <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-300/70 to-transparent mb-4" />

        <p className="font-garamond italic text-lg md:text-xl text-cream-100/90 leading-relaxed">
          Por favor confírmanos tu presencia para preparar cada detalle de este día inolvidable junto a ti.
        </p>
      </div>

      <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-[#2b3724]/90 border border-amber-300/35 relative overflow-hidden shadow-[0_20px_60px_rgba(8,12,6,0.85)] backdrop-blur-xl">
        {/* Anti-Confusion Notice (As requested in Word & Audio 2) */}
        <div className="mb-8 p-4 rounded-2xl bg-[#1b2317]/90 border border-amber-300/30 text-xs text-cream-100 flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-200 block uppercase tracking-wider text-[11px]">
              Esta invitación es personal e individual (1 cupo)
            </span>
            <p className="text-cream-200/80 text-xs leading-relaxed font-light">
              Nuestros invitados son única y exclusivamente las personas que forman parte especial de nuestras vidas.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          /* Confirmation Success Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-300" />
            </div>

            <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-cream-50 uppercase tracking-wider">
              {formData.attendance === 'yes'
                ? '¡Tu Asistencia Ha Sido Confirmada!'
                : 'Mensaje Recibido con Cariño'}
            </h3>

            <p className="font-garamond italic text-lg text-cream-200/90 max-w-md mx-auto">
              {formData.attendance === 'yes'
                ? `¡Gracias ${formData.name}! Nos llena de emoción saber que celebrarás junto a nosotros en Casona Los Nogales.`
                : `Gracias por avisarnos, ${formData.name}. Estarás presente en nuestros corazones en este día tan especial.`}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.4)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-montserrat text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Enviar confirmación a WhatsApp de los Novios</span>
              </a>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1b2317] hover:bg-[#25321f] text-amber-200 font-montserrat text-xs tracking-widest uppercase border border-amber-300/30 transition-colors"
              >
                Modificar Respuesta
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-7 text-left">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Nombre Completo del Invitado *</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Francisca Silva"
                className="w-full bg-[#1b2317] border border-amber-300/30 rounded-xl px-4 py-3.5 text-cream-50 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
              />
            </div>

            {/* Field 2: Attendance Toggle */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-3 flex items-center gap-1.5 font-medium">
                <Heart className="w-3.5 h-3.5 text-amber-300" />
                <span>¿Nos Acompañarás en Nuestro Matrimonio? *</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      ? 'bg-[#3b2326] border-rose-400 text-white'
                      : 'bg-[#1b2317] border-amber-300/20 text-cream-300/60 hover:border-amber-300/40'
                  }`}
                >
                  <span className="font-cinzel font-semibold tracking-wider text-sm">
                    NO PODRÉ ASISTIR 💌
                  </span>
                </button>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <>
                {/* Optional Companion Toggle (Audio 2: Only if invitation included a plus-one) */}
                <div className="p-4 rounded-2xl bg-[#1b2317]/60 border border-amber-300/20 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-montserrat uppercase tracking-wider text-cream-100 font-medium">
                        ¿Tu invitación incluía un acompañante asignado?
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasCompanion: !formData.hasCompanion })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        formData.hasCompanion ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-slate-950 transition-transform ${
                          formData.hasCompanion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {formData.hasCompanion && (
                    <div className="pt-3 border-t border-amber-300/20 space-y-4">
                      <p className="text-[11px] text-amber-200/80 font-montserrat">
                        Ingresa los datos de tu acompañante asignado en la tarjeta de invitación:
                      </p>

                      <div>
                        <label className="block text-[11px] font-montserrat tracking-widest uppercase text-amber-300/90 mb-1.5">
                          Nombre Completo del Acompañante *
                        </label>
                        <input
                          type="text"
                          required={formData.hasCompanion}
                          value={formData.companionName}
                          onChange={(e) => setFormData({ ...formData, companionName: e.target.value })}
                          placeholder="Ej. Carlos González"
                          className="w-full bg-[#141b11] border border-amber-300/30 rounded-xl px-3.5 py-2.5 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 text-xs font-montserrat"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-montserrat tracking-widest uppercase text-amber-300/90 mb-1.5">
                          Preferencia de Menú del Acompañante
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                          {[
                            { id: 'traditional', label: 'Tradicional' },
                            { id: 'vegetarian', label: 'Vegetariano' },
                            { id: 'vegan', label: 'Vegano' },
                            { id: 'celiac', label: 'Sin Gluten' },
                          ].map((diet) => (
                            <button
                              key={diet.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, companionDietary: diet.id })}
                              className={`py-2 px-2.5 rounded-lg border text-[11px] font-montserrat transition-all cursor-pointer ${
                                formData.companionDietary === diet.id
                                  ? 'bg-amber-400/25 border-amber-300 text-cream-50 font-semibold'
                                  : 'bg-[#141b11] border-amber-300/20 text-cream-300/60'
                              }`}
                            >
                              {diet.label}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={formData.companionDietaryNotes}
                          onChange={(e) => setFormData({ ...formData, companionDietaryNotes: e.target.value })}
                          placeholder="Alergias o requerimientos especiales del acompañante"
                          className="w-full bg-[#141b11] border border-amber-300/25 rounded-xl px-3.5 py-2 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 text-xs font-montserrat"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Dietary preference for primary guest */}
                <div>
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                    <Utensils className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tu Preferencia de Menú & Alergias</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {[
                      { id: 'traditional', label: 'Tradicional Gala' },
                      { id: 'vegetarian', label: 'Vegetariano' },
                      { id: 'vegan', label: 'Vegano' },
                      { id: 'celiac', label: 'Sin Gluten' },
                    ].map((diet) => (
                      <button
                        key={diet.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, dietary: diet.id })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-montserrat transition-all cursor-pointer ${
                          formData.dietary === diet.id
                            ? 'bg-amber-400/25 border-amber-300 text-cream-50 font-semibold shadow-sm'
                            : 'bg-[#1b2317] border-amber-300/20 text-cream-300/60'
                        }`}
                      >
                        {diet.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    placeholder="¿Alergias específicas o intolerancias alimentarias?"
                    className="w-full bg-[#1b2317] border border-amber-300/30 rounded-xl px-4 py-2.5 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-xs"
                  />
                </div>

                {/* Song for party */}
                <div>
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                    <Music className="w-3.5 h-3.5 text-amber-300" />
                    <span>¿Qué canción te gustaría bailar con los novios en la fiesta?</span>
                  </label>
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="Canción y artista infaltable para celebrar juntos"
                    className="w-full bg-[#1b2317] border border-amber-300/30 rounded-xl px-4 py-3 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
                  />
                </div>
              </>
            )}

            {/* Dedication message */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-200 mb-2 flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                <span>Un Mensaje para Odlan & María Jose ❤️</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escribe unas palabras de cariño, alegría o tus mejores deseos para su nueva vida juntos..."
                className="w-full bg-[#1b2317] border border-amber-300/30 rounded-xl p-4 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-cinzel text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(250,224,132,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  CONFIRMAR ASISTENCIA
                  <Send className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
