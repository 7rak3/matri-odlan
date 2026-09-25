// Cosmic Melodic House & Organic Audio Engine (122 BPM)
// High-grade Web Audio API synthesizer inspired by Rüfüs Du Sol, Ben Böhmer, and Afterlife

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.mode = 'festival'; // 'festival' (122 BPM Beat + Bass) | 'sunset' (Ambient Lush Pad)

    // Gains & Filters
    this.masterGain = null;
    this.drumsGain = null;
    this.bassGain = null;
    this.synthGain = null;
    this.sfxGain = null;
    this.filterNode = null;

    // Sequencer Clock
    this.bpm = 122;
    this.step = 0;
    this.timerId = null;
    this.listeners = new Set();
    this.beatListeners = new Set();

    // Harmonic Chord Progression (D minor / Celestial Melodic House)
    // Dm9 -> Bbmaj7 -> Fmaj9 -> C/E
    this.chords = [
      { root: 73.42, notes: [293.66, 349.23, 440.0, 523.25, 659.25] }, // Dm9 (D4, F4, A4, C5, E5)
      { root: 58.27, notes: [233.08, 293.66, 349.23, 440.0, 587.33] }, // Bbmaj7 (Bb3, D4, F4, A4, D5)
      { root: 87.31, notes: [349.23, 440.0, 523.25, 659.25, 783.99] }, // Fmaj9 (F4, A4, C5, E5, G5)
      { root: 82.41, notes: [261.63, 329.63, 392.0, 523.25, 659.25] },  // C/E (C4, E4, G4, C5, E5)
    ];

    // Bassline 16-step rhythmic pattern (1 = note on, 0 = rest)
    this.bassPattern = [1, 0, 1, 0,  0, 1, 0, 1,  1, 0, 0, 1,  0, 1, 0, 0];
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
    this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Global Filter for live sweeps
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(2200, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);
    this.filterNode.connect(this.masterGain);

    // Channel Gains
    this.drumsGain = this.ctx.createGain();
    this.drumsGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
    this.drumsGain.connect(this.masterGain);

    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
    this.bassGain.connect(this.filterNode);

    this.synthGain = this.ctx.createGain();
    this.synthGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.synthGain.connect(this.filterNode);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
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
    this.listeners.forEach((fn) =>
      fn({
        isMuted: this.isMuted,
        isPlaying: this.isPlaying,
        mode: this.mode,
        bpm: this.bpm,
      })
    );
  }

  notifyBeat(beatNumber, isKick) {
    this.beatListeners.forEach((fn) => fn({ beatNumber, isKick }));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.75, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  setMode(newMode) {
    this.mode = newMode;
    if (this.drumsGain && this.ctx) {
      this.drumsGain.gain.setTargetAtTime(newMode === 'festival' ? 0.65 : 0, this.ctx.currentTime, 0.2);
    }
    if (this.bassGain && this.ctx) {
      this.bassGain.gain.setTargetAtTime(newMode === 'festival' ? 0.55 : 0.25, this.ctx.currentTime, 0.2);
    }
    this.notify();
  }

  // --- Melodic House Synthesizer Drums ---

  playKick(time) {
    if (!this.ctx || this.isMuted || this.mode !== 'festival') return;

    // Deep Analog 808/House Kick
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(145, time);
    osc.frequency.exponentialRampToValueAtTime(46, time + 0.075);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.28);

    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

    osc.connect(gain);
    gain.connect(this.drumsGain);

    osc.start(time);
    osc.stop(time + 0.33);

    // Subtle punch transient
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(380, time);
    clickOsc.frequency.exponentialRampToValueAtTime(70, time + 0.02);

    clickGain.gain.setValueAtTime(0.4, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

    clickOsc.connect(clickGain);
    clickGain.connect(this.drumsGain);
    clickOsc.start(time);
    clickOsc.stop(time + 0.03);
  }

  playClap(time) {
    if (!this.ctx || this.isMuted || this.mode !== 'festival') return;

    const duration = 0.24;
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
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.setValueAtTime(2.2, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    // 3 mini-flams for realistic organic clap
    gain.gain.linearRampToValueAtTime(0.28, time + 0.015);
    gain.gain.linearRampToValueAtTime(0.05, time + 0.025);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  playHiHat(time, open = false) {
    if (!this.ctx || this.isMuted || this.mode !== 'festival') return;

    const duration = open ? 0.2 : 0.06;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(open ? 0.2 : 0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  // --- Melodic House Bass ---
  playBassNote(freq, time, duration = 0.2) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    subOsc.type = 'sine';

    osc.frequency.setValueAtTime(freq, time);
    subOsc.frequency.setValueAtTime(freq * 0.5, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    subOsc.connect(gain);
    filter.connect(gain);
    gain.connect(this.bassGain);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + duration + 0.05);
    subOsc.stop(time + duration + 0.05);
  }

  // --- Melodic House Pad & Pluck Chords ---
  playPadChord(chordNotes, time, duration = 1.9) {
    if (!this.ctx || this.isMuted) return;

    chordNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq * 1.003, time); // detune chorus

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.045 / (idx + 1), time + 0.35);
      gain.gain.setValueAtTime(0.045 / (idx + 1), time + duration - 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.synthGain);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + duration + 0.1);
      osc2.stop(time + duration + 0.1);
    });
  }

  // --- The 16th-note 122 BPM Sequencer Loop ---
  startMusicLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    const stepDuration = 60 / this.bpm / 4; // 16th note in seconds (~0.123s)

    const scheduleStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const t = this.ctx.currentTime;
      const current16th = this.step % 16;
      const currentBar = Math.floor(this.step / 16);
      const chordIdx = currentBar % this.chords.length;
      const chord = this.chords[chordIdx];

      // 1. KICK on every quarter note (step 0, 4, 8, 12)
      if (current16th % 4 === 0) {
        this.playKick(t);
        this.notifyBeat(current16th / 4, true);
      }

      // 2. CLAP on 2 and 4 (step 4, 12)
      if (current16th === 4 || current16th === 12) {
        this.playClap(t);
      }

      // 3. OFFBEAT HI-HAT on the "&" (step 2, 6, 10, 14)
      if (current16th % 4 === 2) {
        this.playHiHat(t, true);
      } else if (current16th % 2 === 0) {
        this.playHiHat(t, false);
      }

      // 4. BASSLINE
      if (this.bassPattern[current16th]) {
        this.playBassNote(chord.root, t, stepDuration * 1.5);
      }

      // 5. CHORDS PAD on bar start
      if (current16th === 0) {
        this.playPadChord(chord.notes, t, stepDuration * 16 * 0.95);
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
    this.notify();
  }

  // --- Dramatic Festival Drop Transition for Portal Opening ---
  playPortalElectronicDrop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. High-energy White Noise Riser
    const duration = 2.4;
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
    filter.frequency.setValueAtTime(200, t);
    filter.frequency.exponentialRampToValueAtTime(6000, t + duration * 0.85);
    filter.Q.value = 4.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.45, t + duration * 0.85);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + duration);

    // 2. Sub-drop boom on the drop
    const dropTime = t + 1.8;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, dropTime);
    subOsc.frequency.exponentialRampToValueAtTime(36, dropTime + 0.6);

    subGain.gain.setValueAtTime(0.8, dropTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 1.4);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(dropTime);
    subOsc.stop(dropTime + 1.5);

    // 3. Cosmic chords chime fanfare
    const freqs = [293.66, 369.99, 440.0, 554.37, 659.25, 880.0];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const chGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, dropTime + idx * 0.08);

      chGain.gain.setValueAtTime(0.18 / (idx + 1), dropTime + idx * 0.08);
      chGain.gain.exponentialRampToValueAtTime(0.0001, dropTime + idx * 0.08 + 2.5);

      osc.connect(chGain);
      chGain.connect(this.sfxGain);
      osc.start(dropTime + idx * 0.08);
      osc.stop(dropTime + idx * 0.08 + 2.6);
    });
  }

  // Soft romantic click / chime
  playChime(multiplier = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33 * multiplier, t); // D5

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.75);
  }

  // Sparkling success fanfare
  playSparkleSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.85);
      }, i * 75);
    });
  }
}

export const cosmicAudio = new CosmicAudioEngine();
