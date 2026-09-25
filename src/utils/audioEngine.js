// Cosmic Web Audio Engine - Generative Celestial Soundscapes & SFX

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientRunning = false;
    this.ambientInterval = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.listeners = new Set();
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

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Music Gain
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    // SFX Gain
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn({ isMuted: this.isMuted, isPlaying: this.ambientRunning }));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  // Play cinematic portal opening sound
  playPortalOpenSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. Sub-bass dimensional rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(60, t);
    subOsc.frequency.exponentialRampToValueAtTime(140, t + 1.2);
    subOsc.frequency.exponentialRampToValueAtTime(45, t + 3.0);

    subGain.gain.setValueAtTime(0.01, t);
    subGain.gain.linearRampToValueAtTime(0.6, t + 0.8);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 3.5);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(t);
    subOsc.stop(t + 3.6);

    // 2. Crystalline golden chime chord (Fmaj9 / A minor celestial notes: F, A, C, E, G)
    const freqs = [349.23, 440.0, 523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.12);

      gain.gain.setValueAtTime(0.001, t + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), t + idx * 0.12 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.12 + 2.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + idx * 0.12);
      osc.stop(t + idx * 0.12 + 2.9);
    });

    // 3. Shimmer noise whoosh
    this.playNoiseWhoosh(t, 2.5);
  }

  playNoiseWhoosh(startTime, duration) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, startTime);
    filter.frequency.exponentialRampToValueAtTime(2400, startTime + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);
    filter.Q.value = 3.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, startTime);
    noiseGain.gain.linearRampToValueAtTime(0.2, startTime + duration * 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(startTime);
    noise.stop(startTime + duration);
  }

  // Soft romantic chime for button clicks or interactions
  playChime(pitchMultiplier = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const baseFreq = 523.25 * pitchMultiplier; // C5

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, t);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  // Success sparkle when RSVP is submitted or account copied
  playSparkleSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.75);
      }, i * 90);
    });
  }

  // Generative Romantic Ambient Pad (Warm, ethereal, non-intrusive)
  startAmbientMusic() {
    this.init();
    if (this.ambientRunning) return;
    this.ambientRunning = true;
    this.notify();

    // Pentatonic romantic celestial chord sets (Root, 3rd, 5th, 7th/9th)
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [196.0, 246.94, 293.66, 349.23], // G7
      [130.81, 196.0, 261.63, 329.63], // Cmaj7
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.ambientRunning || !this.ctx) return;

      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      const t = this.ctx.currentTime;
      const duration = 6.5;

      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc2.type = 'triangle';

        // Subtle detuning for lush celestial chorusing
        osc.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq * 1.002, t);

        // Soft envelope: slow fade in, majestic sustain, gentle fade out
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), t + 2.0);
        gain.gain.setValueAtTime(0.05 / (idx + 1), t + duration - 2.0);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc2.start(t);
        osc.stop(t + duration + 0.1);
        osc2.stop(t + duration + 0.1);
      });
    };

    // First chord immediately
    playChordStep();
    // Subsequent chords every 5.5s with smooth crossfades
    this.ambientInterval = setInterval(playChordStep, 5500);
  }

  stopAmbientMusic() {
    this.ambientRunning = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.notify();
  }
}

export const cosmicAudio = new CosmicAudioEngine();
