import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Music, Heart, Utensils, MessageSquare, Sparkles, User, Users } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function RSVPSection() {
  const [formData, setFormData] = useState(() => {
    let initialName = '';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('invitado') || params.get('to') || params.get('guest');
      if (guestParam) initialName = guestParam.replace(/\+/g, ' ');
    }
    return {
      name: initialName,
      attendance: 'yes', // 'yes' | 'no'
      companions: '1',
      companionNames: '',
      dietary: 'traditional',
      dietaryNotes: '',
      songRequest: '',
      message: '',
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const triggerGoldConfetti = () => {
    // Elegant metallic gold confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#fae084', '#d4af37', '#ffffff', '#ffd700', '#f39c12'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    cosmicAudio.playSparkleSuccess();
    triggerGoldConfetti();
    setIsSubmitted(true);
  };

  // Generate WhatsApp message URL
  const generateWhatsAppUrl = () => {
    const phone = '56912345678'; // Demo Chilean phone number
    const text = `✨ *CONFIRMACIÓN DE ASISTENCIA — MATRIMONIO JOSE & ODLAN* ✨\n\n` +
      `👤 *Nombre:* ${formData.name}\n` +
      `💫 *Asistencia:* ${formData.attendance === 'yes' ? '¡Sí, asistiré con todo el entusiasmo! 🎉' : 'No podré asistir 😢'}\n` +
      (formData.attendance === 'yes' ? `👥 *Cupos:* ${formData.companions} persona(s) ${formData.companionNames ? `(${formData.companionNames})` : ''}\n` : '') +
      (formData.attendance === 'yes' ? `🍽️ *Preferencia Menú:* ${formData.dietary} ${formData.dietaryNotes ? `(Detalle: ${formData.dietaryNotes})` : ''}\n` : '') +
      (formData.songRequest ? `🎵 *Canción para la pista:* ${formData.songRequest}\n` : '') +
      (formData.message ? `💌 *Mensaje:* "${formData.message}"\n` : '');

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          R.S.V.P.
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Confirma Tu Asistencia
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/80 leading-relaxed">
          Agradecemos confirmar antes del <strong>15 de Septiembre de 2026</strong> para coordinar cada detalle de tu experiencia.
        </p>
      </div>

      <div className="cosmic-glass rounded-3xl p-6 md:p-12 border border-amber-400/30 relative overflow-hidden shadow-2xl">
        {isSubmitted ? (
          /* Confirmation Success View */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
              {formData.attendance === 'yes'
                ? '¡Tu Lugar Está Reservado en el Cosmos!'
                : 'Mensaje Recibido'}
            </h3>

            <p className="font-garamond italic text-lg text-amber-200/80 max-w-md mx-auto">
              {formData.attendance === 'yes'
                ? `Gracias ${formData.name}. Estamos contando los días para celebrar y brindar juntos bajo las estrellas.`
                : `Gracias por avisarnos ${formData.name}. Te llevaremos en el corazón durante esta gran noche.`}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cosmicAudio.playChime(1.4)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-montserrat text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                Enviar confirmación a WhatsApp de los Novios
              </a>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-200 font-montserrat text-xs tracking-widest uppercase border border-amber-400/30 transition-colors"
              >
                Modificar Respuesta
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Josefa Pérez o Familia Morales"
                className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
              />
            </div>

            {/* Field 2: Attendance Toggle */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-3 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                ¿Nos Acompañarás en Nuestra Noche? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    cosmicAudio.playChime(1.1);
                    setFormData({ ...formData, attendance: 'yes' });
                  }}
                  className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all cursor-pointer ${
                    formData.attendance === 'yes'
                      ? 'bg-amber-500/25 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] text-white'
                      : 'bg-[#060b20] border-slate-700/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-cinzel font-semibold tracking-wider text-sm">
                    ¡SÍ, CUENTA CONMIGO! 🎉
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
                      ? 'bg-rose-950/40 border-rose-500 text-white'
                      : 'bg-[#060b20] border-slate-700/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="font-cinzel font-semibold tracking-wider text-sm">
                    NO PODRÉ ASISTIR 💫
                  </span>
                </button>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <>
                {/* Companions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Cupos Confirmados
                    </label>
                    <select
                      value={formData.companions}
                      onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
                      className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
                    >
                      <option value="1">1 Persona (Solo yo)</option>
                      <option value="2">2 Personas (Con acompañante)</option>
                      <option value="3">3 Personas (Familia)</option>
                      <option value="4+">4 o más personas</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2">
                      Nombre(s) de Acompañante(s)
                    </label>
                    <input
                      type="text"
                      value={formData.companionNames}
                      onChange={(e) => setFormData({ ...formData, companionNames: e.target.value })}
                      placeholder="Ej. Carlos Silva"
                      className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
                    />
                  </div>
                </div>

                {/* Dietary preference */}
                <div>
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    Menú & Restricciones Alimentarias
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {[
                      { id: 'traditional', label: 'Tradicional' },
                      { id: 'vegetarian', label: 'Vegetariano' },
                      { id: 'vegan', label: 'Vegano' },
                      { id: 'celiac', label: 'Sin Gluten' },
                    ].map((diet) => (
                      <button
                        key={diet.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, dietary: diet.id })}
                        className={`py-2 px-3 rounded-lg border text-xs font-montserrat transition-all cursor-pointer ${
                          formData.dietary === diet.id
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                            : 'bg-[#060b20] border-slate-700/60 text-slate-400'
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
                    placeholder="¿Alergias específicas (mariscos, frutos secos, lactosa)?"
                    className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-xs"
                  />
                </div>

                {/* Song for party */}
                <div>
                  <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    Canción Infaltable en la Pista de Baile
                  </label>
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="Canción y Artista que te hace saltar a la pista"
                    className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm"
                  />
                </div>
              </>
            )}

            {/* Dedication message */}
            <div>
              <label className="block text-xs font-montserrat tracking-widest uppercase text-amber-300 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                Un Mensaje Cósmico para Jose & Odlan
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Dedícales unas palabras, anécdota o bendiciones..."
                className="w-full bg-[#060b20] border border-amber-400/30 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors font-montserrat text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  ENVIAR MI CONFIRMACIÓN
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
