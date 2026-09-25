import React, { useState, useEffect, useCallback } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Camera,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioEngine';
import HoloTiltCard from './HoloTiltCard';

const COUPLE_PHOTOS = [
  {
    id: 1,
    src: '/photos/foto-03.jpg',
    category: 'inicios',
    tag: 'Foto 1 • Unos bbys 🥺❤️',
    title: 'Cuando éramos unos bbys',
    subtitle: 'Nuestros inicios en la playa',
    description: 'La primera foto de nuestra historia. Risas inocentes, miradas cómplices y el comienzo de más de siete años inolvidables.',
  },
  {
    id: 2,
    src: '/photos/foto-01.jpg',
    category: 'momentos',
    tag: 'Amor Diario',
    title: 'Mi partner, mi 🤎 de melón',
    subtitle: 'Abrazo de todos los días',
    description: 'En cada abrazo y en cada sonrisa cotidiana encontramos nuestro lugar favorito en el mundo.',
  },
  {
    id: 3,
    src: '/photos/foto-07.jpg',
    category: 'momentos',
    tag: 'Bajo el Corazón 🫶',
    title: 'Mi odlajo y nuestro amor',
    subtitle: 'Noches mágicas',
    description: 'Bajo las manos que forman un corazón, celebrando la complicidad que nos hace únicos.',
  },
  {
    id: 4,
    src: '/photos/foto-10.jpg',
    category: 'viajes',
    tag: 'A 35,000 Pies ✈️',
    title: 'Volando juntos en cabina',
    subtitle: 'Con mi piloto favorito',
    description: 'En las alturas, cruzando cielos y compartiendo la cabina del avión con el amor de mi vida.',
  },
  {
    id: 5,
    src: '/photos/foto-06.jpg',
    category: 'gala',
    tag: 'Elegancia & Gala 🥂',
    title: 'Hacia el gran altar',
    subtitle: 'Complicidad de gala',
    description: 'Vestidos de gala, mirándonos con el mismo brillo en los ojos que el primer día.',
  },
  {
    id: 6,
    src: '/photos/foto-02.jpg',
    category: 'viajes',
    tag: 'Noche de Paraguas ☂️',
    title: 'Calles mágicas de viaje',
    subtitle: 'Guatapé & colores',
    description: 'Bajo un cielo de paraguas coloridos, celebrando la libertad de descubrir el mundo juntos.',
  },
  {
    id: 7,
    src: '/photos/foto-08.jpg',
    category: 'viajes',
    tag: 'En Altamar 🛳️',
    title: 'De blanco en el crucero',
    subtitle: 'Noche de gala en altamar',
    description: 'Navegando juntos por nuevos mares, sonriendo vestidos de blanco con el corazón lleno.',
  },
  {
    id: 8,
    src: '/photos/foto-09.jpg',
    category: 'viajes',
    tag: 'Cartagena Linda 🇨🇴',
    title: 'Colores del Caribe',
    subtitle: 'Getsemaní & calles coloniales',
    description: 'Calles coloridas, brisa cálida y las manos siempre entrelazadas en cada esquina.',
  },
  {
    id: 9,
    src: '/photos/foto-05.jpg',
    category: 'inicios',
    tag: 'Beso al Sol ☀️',
    title: 'Besos de verano',
    subtitle: 'Amor frente al mar',
    description: 'Sol dorado, sombrero de paja y el calor de un amor que no se apaga nunca.',
  },
  {
    id: 10,
    src: '/photos/foto-04.jpg',
    category: 'inicios',
    tag: 'Brisa Marina 🌊',
    title: 'Olas y sonrisas',
    subtitle: 'Tardes de playa',
    description: 'La arena en los pies y el mar de fondo, donde el tiempo se detiene cuando estamos juntos.',
  },
  {
    id: 11,
    src: '/photos/foto-11.jpg',
    category: 'momentos',
    tag: 'Risas del Faro 👰🤵',
    title: 'Practicando para el gran día',
    subtitle: 'Riendo siempre juntos',
    description: 'Un ensayo de novios muy divertido en el faro. Porque la risa es la base de nuestro amor.',
  },
  {
    id: 12,
    src: '/photos/foto-12.jpg',
    category: 'familia',
    tag: 'Nuestro Regalón 🐾',
    title: 'Familia de cuatro patitas',
    subtitle: 'Nuestro fiel compañero',
    description: 'El integrante más peludo, tierno y consentido que llena nuestra casa de alegría y amor.',
  },
];

const CATEGORIES = [
  { id: 'todas', label: 'Todas las fotos (12)' },
  { id: 'inicios', label: 'Inicios & Playa 🌊' },
  { id: 'viajes', label: 'Vuelos & Viajes ✈️' },
  { id: 'momentos', label: 'Cómplices 🫶' },
  { id: 'gala', label: 'Gala 🥂' },
  { id: 'familia', label: 'Familia 🐾' },
];

export default function LoveStoryGallery() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('todas');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(110);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);

  const handleLightboxNav = useCallback((direction) => {
    if (!lightboxPhoto) return;
    cosmicAudio.playChime(1.15);
    const currentIdx = COUPLE_PHOTOS.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIdx = (currentIdx + direction + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length;
    setLightboxPhoto(COUPLE_PHOTOS[nextIdx]);
  }, [lightboxPhoto]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') setLightboxPhoto(null);
      if (e.key === 'ArrowRight') handleLightboxNav(1);
      if (e.key === 'ArrowLeft') handleLightboxNav(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, handleLightboxNav]);

  const handleLike = () => {
    cosmicAudio.playChime(1.4);
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fae084', '#f43f5e', '#fb7185', '#d4af37'],
      });
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleDoubleTapPhoto = () => {
    setShowHeartPop(true);
    if (!isLiked) {
      handleLike();
    } else {
      cosmicAudio.playChime(1.3);
    }
    setTimeout(() => setShowHeartPop(false), 900);
  };

  const handlePrevCarousel = () => {
    cosmicAudio.playChime(1.1);
    setCarouselIdx((prev) => (prev - 1 + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length);
  };

  const handleNextCarousel = () => {
    cosmicAudio.playChime(1.2);
    setCarouselIdx((prev) => (prev + 1) % COUPLE_PHOTOS.length);
  };

  const handleShare = () => {
    cosmicAudio.playChime(1.3);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#galeria');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredPhotos =
    selectedFilter === 'todas'
      ? COUPLE_PHOTOS
      : COUPLE_PHOTOS.filter((p) => p.category === selectedFilter);

  const currentCarouselPhoto = COUPLE_PHOTOS[carouselIdx];

  return (
    <section id="galeria" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto z-10">
      {/* Eyebrow Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>RECUERDOS DE MÁS DE 7 AÑOS • NUESTRO FEED</span>
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
          Momentos Inolvidables
        </h2>

        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

        <p className="font-garamond italic text-lg md:text-xl text-amber-100/90 leading-relaxed max-w-2xl mx-auto">
          "Mi 🤎 de melón, mi odlajo, mi partner. Más de siete años a tu lado y pareciera que fue ayer que nos conocimos."
        </p>
      </div>

      {/* Featured Instagram Cosmic Luxury Card */}
      <div className="max-w-2xl mx-auto mb-20">
        <HoloTiltCard className="w-full">
          <div className="cosmic-glass rounded-3xl border border-amber-400/35 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            {/* Post Header: Profile & Handle */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-amber-400/20 bg-[#060c24]/80">
              <div className="flex items-center gap-3">
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-200 shadow-[0_0_12px_rgba(250,224,132,0.4)]">
                  <img
                    src="/photos/foto-01.jpg"
                    alt="mjo.queglas"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#060c24]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center border border-[#060c24]">
                    <Heart className="w-2 h-2 text-slate-950 fill-slate-950" />
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-montserrat font-bold text-sm text-white tracking-wide">
                      mjo.queglas
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <span className="text-[11px] font-montserrat text-amber-200/70 block">
                    Santiago & Por el Mundo ✈️ • Con o_fer_her
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] font-montserrat uppercase tracking-widest text-amber-300 font-medium">
                {carouselIdx + 1} / {COUPLE_PHOTOS.length}
              </div>
            </div>

            {/* Photo Viewport with Carousel and Double-tap Like */}
            <div
              className="relative aspect-[4/5] sm:aspect-[1/1] w-full bg-black/70 overflow-hidden group select-none cursor-pointer"
              onDoubleClick={handleDoubleTapPhoto}
            >
              <img
                src={currentCarouselPhoto.src}
                alt={currentCarouselPhoto.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Heart Pop Animation on Double Click */}
              {showHeartPop && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-ping opacity-90 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
                </div>
              )}

              {/* Top-Right Tag Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#04081c]/80 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-montserrat tracking-wider shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{currentCarouselPhoto.tag}</span>
              </div>

              {/* Prev / Next Carousel Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevCarousel();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500/30 text-white hover:text-amber-300 border border-white/20 hover:border-amber-400/60 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                title="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextCarousel();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500/30 text-white hover:text-amber-300 border border-white/20 hover:border-amber-400/60 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                title="Siguiente foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cosmicAudio.playChime(1.3);
                  setLightboxPhoto(currentCarouselPhoto);
                }}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-amber-500/30 text-white hover:text-amber-300 border border-white/20 hover:border-amber-400 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                title="Ver en pantalla completa"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Post Actions Bar */}
            <div className="p-4 sm:p-5 border-t border-amber-400/20 bg-[#060c24]/90 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className="p-1 text-white hover:scale-115 transition-transform cursor-pointer flex items-center gap-1.5 group"
                    title="Dar Me Gusta"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        isLiked
                          ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.7)]'
                          : 'text-slate-200 group-hover:text-rose-400'
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      cosmicAudio.playChime(1.2);
                    }}
                    className="p-1 text-slate-200 hover:text-amber-300 hover:scale-115 transition-transform cursor-pointer"
                    title="Ver comentarios"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-1 text-slate-200 hover:text-amber-300 hover:scale-115 transition-transform cursor-pointer relative"
                    title="Compartir enlace de la galería"
                  >
                    {copiedLink ? (
                      <Check className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Share2 className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => {
                    cosmicAudio.playChime(1.25);
                    setIsSaved(!isSaved);
                  }}
                  className="p-1 text-slate-200 hover:text-amber-300 hover:scale-115 transition-transform cursor-pointer"
                  title="Guardar recuerdo"
                >
                  <Bookmark
                    className={`w-6 h-6 ${
                      isSaved ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                </button>
              </div>

              {/* Likes Counter & Social Endorsement */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-montserrat">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img
                    src="/photos/foto-06.jpg"
                    alt="o_fer_her"
                    className="inline-block w-5 h-5 rounded-full ring-2 ring-[#060c24] object-cover"
                  />
                  <img
                    src="/photos/foto-01.jpg"
                    alt="mjo.queglas"
                    className="inline-block w-5 h-5 rounded-full ring-2 ring-[#060c24] object-cover"
                  />
                </div>
                <p className="text-slate-200">
                  Les gusta a <strong className="font-semibold text-white">o_fer_her</strong> y{' '}
                  <strong className="font-semibold text-amber-300">{likeCount} personas más</strong>
                </p>
              </div>

              {/* Main Caption (Exact Words from Screenshot) */}
              <div className="space-y-2 text-left text-xs sm:text-sm font-montserrat border-t border-slate-800/80 pt-3">
                <div className="space-y-1">
                  <p className="leading-relaxed">
                    <span className="font-bold text-white mr-2">mjo.queglas</span>
                    <span className="text-slate-200">Mi 🤎 de melón, mi odlajo, mi partner. 🫶</span>
                  </p>
                  <p className="text-amber-200 font-garamond italic text-sm sm:text-base leading-relaxed pl-6 border-l-2 border-amber-400/40 my-1">
                    "La primera foto, éramos unos bbys 🥺❤️"
                  </p>
                </div>

                {/* Romantic Pinned Response from Odlan */}
                <div className="bg-[#0b1333]/90 rounded-2xl p-3.5 border border-amber-400/20 mt-3 shadow-inner">
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/photos/foto-06.jpg"
                      alt="o_fer_her"
                      className="w-7 h-7 rounded-full object-cover border border-amber-400/40 shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-300">o_fer_her</span>
                        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed mt-0.5">
                        😍😍😍😍😍 q lindas fotos, ya más de 7 años a tu lado y pareciera que fue ayer que nos conocimos. Te amo infinito bb ❤️
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 uppercase tracking-widest">
                  <span>20 de septiembre de 2025 • Santiago de Chile</span>
                  <span className="text-amber-300 font-semibold">✨ 20.02.2027 ✨</span>
                </div>
              </div>
            </div>
          </div>
        </HoloTiltCard>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              cosmicAudio.playChime(1.15);
              setSelectedFilter(cat.id);
            }}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-montserrat tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer ${
              selectedFilter === cat.id
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(250,224,132,0.5)] scale-105'
                : 'cosmic-glass text-slate-300 hover:text-white hover:border-amber-400/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 12 Photos Luxury Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              cosmicAudio.playChime(1.3);
              setLightboxPhoto(photo);
            }}
            className="group relative rounded-2xl overflow-hidden border border-amber-400/25 bg-[#050a22]/80 hover:border-amber-300/70 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(250,224,132,0.2)] cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-[#020514]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-amber-200 text-[10px] font-montserrat uppercase tracking-wider flex items-center gap-1 shadow">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>{photo.tag}</span>
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-amber-300 shadow">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left space-y-1">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                  {photo.title}
                </h4>
                <p className="font-montserrat text-[11px] text-amber-100/80 line-clamp-2 font-light">
                  {photo.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => {
              cosmicAudio.playChime(1.0);
              setLightboxPhoto(null);
            }}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-rose-500/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous / Next buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav(-1);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500/40 text-white hover:text-amber-200 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            title="Foto anterior"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav(1);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500/40 text-white hover:text-amber-200 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            title="Siguiente foto"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Lightbox Content Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row rounded-3xl overflow-hidden cosmic-glass border border-amber-400/40 shadow-[0_0_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative md:w-3/5 bg-black/90 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-h-[65vh] md:max-h-[85vh] w-auto max-w-full object-contain p-2"
              />
            </div>

            {/* Info Sidebar Section */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#060c24]/95 border-t md:border-t-0 md:border-l border-amber-400/20 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-montserrat uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lightboxPhoto.tag}</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white tracking-wide">
                  {lightboxPhoto.title}
                </h3>

                <p className="font-montserrat text-sm text-slate-200 leading-relaxed font-light">
                  {lightboxPhoto.description}
                </p>

                <div className="p-4 rounded-2xl bg-[#091333] border border-amber-400/20 text-xs font-montserrat space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Historia:</span>
                    <span className="text-amber-200 font-medium">Más de 7 años juntos</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Pareja:</span>
                    <span className="text-amber-200 font-medium">Jose (Tripulante) & Odlan (Piloto)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Fecha de Boda:</span>
                    <span className="text-amber-200 font-medium">20 de Febrero de 2027</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-amber-200/80 font-montserrat">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Amor infinito</span>
                </div>

                <span className="text-xs font-montserrat text-slate-400">
                  {COUPLE_PHOTOS.findIndex((p) => p.id === lightboxPhoto.id) + 1} de {COUPLE_PHOTOS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
