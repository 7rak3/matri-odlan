// Authentic Forest & Woodland Acoustic Audio Engine for Odlan & María Jose's Wedding
// Atmospheric Forest Soundscapes:
// 1. Bosque Encantado (Brisa en las hojas, canto de aves, arpa celta y campanillas de madera)
// 2. Atardecer en los Nogales (Viento sereno, trinos suaves y arpegios acústicos de madera)
// 3. Brisa & Bambú Zen (Naturaleza pura, susurro del bosque y campanillas de bambú)
// 4. Piano & Canto de Bosque (Melodía romántica en piano sobre el cantar de la naturaleza)

class ForestAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.currentTrackIndex = 0;

    // Audio Buses
    this.masterGain = null;
    this.ambientGain = null;
    this.birdsGain = null;
    this.melodyGain = null;
    this.chimesGain = null;
    this.sfxGain = null;

    // Continuous wind / rustle noise source & filters
    this.windSource = null;
    this.windGain = null;
    this.windFilter = null;
    this.windLfo = null;

    // Clock
    this.step = 0;
    this.timerId = null;
    this.birdsTimerId = null;
    this.listeners = new Set();
    this.beatListeners = new Set();

    // 4 Organic Forest Themes
    this.tracks = [
      {
        id: 'bosque-encantado',
        title: 'Bosque Encantado & Aves',
        genre: 'Brisa, Canto de Aves & Arpa',
        bpm: 60,
        scale: [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99], // D Major / Pentatonic (D, E, F#, A, B, d, e, f#)
        chords: [
          [146.83, 220.0, 293.66, 369.99, 440.0], // Dmaj9
          [196.0, 246.94, 293.66, 369.99, 440.0],  // Gmaj9
          [164.81, 246.94, 329.63, 392.0, 493.88],  // Em9
          [220.0, 277.18, 329.63, 440.0, 554.37],   // A9
        ],
      },
      {
        id: 'atardecer-nogales',
        title: 'Atardecer en los Nogales',
        genre: 'Acústico de Madera & Bosque',
        bpm: 54,
        scale: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25], // C / G Major Pentatonic
        chords: [
          [130.81, 196.0, 261.63, 329.63, 392.0], // Cmaj9
          [174.61, 220.0, 261.63, 329.63, 440.0], // Fmaj9
          [146.83, 220.0, 293.66, 349.23, 440.0], // Dm9
          [196.0, 246.94, 293.66, 392.0, 493.88],  // G
        ],
      },
      {
        id: 'brisa-bambu',
        title: 'Brisa & Campanillas de Bambú',
        genre: 'Naturaleza Pura & Viento',
        bpm: 48,
        scale: [329.63, 392.0, 440.0, 493.88, 587.33, 659.25, 783.99], // E minor pentatonic / Nature
        chords: [
          [164.81, 246.94, 329.63, 392.0],
          [196.0, 293.66, 392.0, 440.0],
          [220.0, 261.63, 329.63, 440.0],
          [146.83, 220.0, 293.66, 369.99],
        ],
      },
      {
        id: 'piano-bosque',
        title: 'Piano & Canto de Bosque',
        genre: 'Piano Romántico & Trinos',
        bpm: 58,
        scale: [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 659.25],
        chords: [
          [110.0, 164.81, 220.0, 261.63, 329.63], // Am9
          [87.31, 130.81, 174.61, 220.0, 261.63],  // Fmaj7
          [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
          [98.0, 146.83, 196.0, 246.94, 293.66],   // G
        ],
      },
    ];
  }

  get currentTrack() {
    return this.tracks[this.currentTrackIndex] || this.tracks[0];
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    // Master Bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Channel Busses
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
    this.ambientGain.connect(this.masterGain);

    this.birdsGain = this.ctx.createGain();
    this.birdsGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
    this.birdsGain.connect(this.masterGain);

    this.melodyGain = this.ctx.createGain();
    this.melodyGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.melodyGain.connect(this.masterGain);

    this.chimesGain = this.ctx.createGain();
    this.chimesGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.chimesGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.startForestAmbience();
  }

  // Continuous Gentle Wind & Rustling Forest Leaves
  startForestAmbience() {
    if (!this.ctx || this.windSource) return;

    try {
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise generator for gentle wind texture
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      this.windSource = this.ctx.createBufferSource();
      this.windSource.buffer = buffer;
      this.windSource.loop = true;

      // Filter to simulate tree foliage & gentle breeze
      this.windFilter = this.ctx.createBiquadFilter();
      this.windFilter.type = 'bandpass';
      this.windFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.windFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      // Slow LFO to swell the wind naturally
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8s swell
      lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.windFilter.frequency);
      lfo.start();
      this.windLfo = lfo;

      this.windSource.connect(this.windFilter);
      this.windFilter.connect(this.windGain);
      this.windGain.connect(this.ambientGain);

      this.windSource.start();
    } catch {
      // ignore audio context restrictions
    }
  }

  // --- Real Natural Birdsong Generator ---
  playBirdChirp() {
    if (!this.ctx || this.isMuted || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';

    // Different bird phrases
    const birdType = Math.floor(Math.random() * 4);
    const baseFreq = 2200 + Math.random() * 1200;

    if (birdType === 0) {
      // Double sweet chirp
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.08);
      osc.frequency.setValueAtTime(baseFreq * 0.9, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, t + 0.22);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.birdsGain);
      osc.start(t);
      osc.stop(t + 0.26);
    } else if (birdType === 1) {
      // Trill / Warble
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(28, t);
      vibratoGain.gain.setValueAtTime(140, t);
      vibrato.connect(osc.frequency);
      vibrato.start(t);
      vibrato.stop(t + 0.35);

      osc.frequency.setValueAtTime(baseFreq * 1.1, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.85, t + 0.32);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);

      osc.connect(gain);
      gain.connect(this.birdsGain);
      osc.start(t);
      osc.stop(t + 0.35);
    } else if (birdType === 2) {
      // High delicate whistle
      osc.frequency.setValueAtTime(baseFreq * 1.3, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, t + 0.15);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, t + 0.3);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);

      osc.connect(gain);
      gain.connect(this.birdsGain);
      osc.start(t);
      osc.stop(t + 0.33);
    } else {
      // Gentle nightingale drop
      osc.frequency.setValueAtTime(baseFreq * 1.4, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, t + 0.18);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.birdsGain);
      osc.start(t);
      osc.stop(t + 0.22);
    }
  }

  // --- Organic Bamboo / Wood Chime ---
  playBambooChime(freq, time) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.76, time); // Inharmonic wooden bell ratio

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.15, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(this.chimesGain);

    osc.start(time);
    overtone.start(time);
    osc.stop(time + 1.7);
    overtone.stop(time + 1.7);
  }

  // --- Celtic Forest Harp / Kalimba Note ---
  playHarpNote(freq, time, duration = 2.4) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const body = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    body.type = 'sine';
    body.frequency.setValueAtTime(freq * 0.5, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.25, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    body.connect(filter);
    filter.connect(gain);
    gain.connect(this.melodyGain);

    osc.start(time);
    body.start(time);
    osc.stop(time + duration + 0.05);
    body.stop(time + duration + 0.05);
  }

  // --- Warm Woodland Pad / Atmosphere ---
  playForestPad(freqs, time, duration) {
    if (!this.ctx || this.isMuted) return;

    freqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);

      // Very soft slow swell
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 1.5);
      gain.gain.setValueAtTime(0.06, time + duration - 1.2);
      gain.gain.linearRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc.start(time);
      osc.stop(time + duration + 0.1);
    });
  }

  // --- Sequencer Core Loop for Nature & Forest Melody ---
  startMusicLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    // Random bird songs every 2.5 to 5.5 seconds
    const scheduleNextBird = () => {
      if (!this.isPlaying) return;
      this.playBirdChirp();
      const nextDelay = 2200 + Math.random() * 3400;
      this.birdsTimerId = setTimeout(scheduleNextBird, nextDelay);
    };
    scheduleNextBird();

    const scheduleStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const track = this.currentTrack;
      const bpm = track.bpm;
      const stepDuration = 60 / bpm / 2; // 8th note duration
      const t = this.ctx.currentTime;
      const currentStep = this.step % 16;
      const currentBar = Math.floor(this.step / 16);
      const chord = track.chords[currentBar % track.chords.length];

      // 1. Warm pad harmony at start of each bar (every 16 steps)
      if (currentStep === 0) {
        this.playForestPad(chord, t, stepDuration * 16 * 0.98);
      }

      // 2. Gentle harp / kalimba arpeggio notes
      if (currentStep % 2 === 0) {
        const scaleIdx = (currentStep / 2) % track.scale.length;
        const note = track.scale[scaleIdx];
        this.playHarpNote(note, t, stepDuration * 3.5);
      }

      // 3. Occasional bamboo chime ping on breeze
      if (currentStep === 6 || currentStep === 14) {
        if (Math.random() < 0.75) {
          const chimeFreq = track.scale[Math.floor(Math.random() * track.scale.length)] * 2;
          this.playBambooChime(chimeFreq, t);
        }
      }

      this.step++;
      this.timerId = setTimeout(scheduleStep, stepDuration * 1000);
    };

    scheduleStep();
  }

  stopMusicLoop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.birdsTimerId) {
      clearTimeout(this.birdsTimerId);
      this.birdsTimerId = null;
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  subscribeBeat(listener) {
    this.beatListeners.add(listener);
    return () => this.beatListeners.delete(listener);
  }

  notify() {
    const track = this.currentTrack;
    this.listeners.forEach((fn) =>
      fn({
        isMuted: this.isMuted,
        isPlaying: this.isPlaying,
        currentTrackIndex: this.currentTrackIndex,
        totalTracks: this.tracks.length,
        title: track.title,
        genre: track.genre,
        bpm: track.bpm,
      })
    );
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  togglePlayPause() {
    this.init();
    if (this.isPlaying) {
      this.stopMusicLoop();
    } else {
      this.startMusicLoop();
    }
  }

  setTrack(index) {
    const total = this.tracks.length;
    this.currentTrackIndex = ((index % total) + total) % total;
    this.step = 0;
    this.playChime(1.2);
    this.notify();

    if (this.isPlaying) {
      this.stopMusicLoop();
      this.startMusicLoop();
    }
  }

  nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  prevTrack() {
    this.setTrack(this.currentTrackIndex - 1);
  }

  // Subtle button sound
  playChime(multiplier = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33 * multiplier, t); // D5

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Success fanfare on RSVP submit (Woodland chime sweep)
  playSparkleSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [440.0, 554.37, 659.25, 880.0, 1108.73]; // A Major chime arpeggio
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const t = this.ctx.currentTime;
        this.playBambooChime(freq, t);
      }, i * 90);
    });
  }
}

export const cosmicAudio = new ForestAudioEngine();
