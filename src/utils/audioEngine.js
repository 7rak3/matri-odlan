// Authentic Melodic Deep House Audio Engine (122 BPM)
// Pure electronic elegance inspired by Rüfüs Du Sol, Tale of Us, Afterlife, and Ben Böhmer
// 0% Piano, 0% Video Game Chiptune - 100% Sophisticated Deep House & Atmospheric Club Sound

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;

    // Buses
    this.masterGain = null;
    this.drumsGain = null;
    this.bassGain = null;
    this.synthGain = null;
    this.sfxGain = null;
    this.mainFilter = null;

    // 122 BPM Clock
    this.bpm = 122;
    this.step = 0;
    this.timerId = null;
    this.listeners = new Set();
    this.beatListeners = new Set();

    // Emotional Melodic House Progression (F minor / Afterlife & Rüfüs harmonic scale)
    // Fm9 -> Dbmaj7 -> Abmaj7 -> Eb
    this.chords = [
      {
        root: 87.31, // F2
        bassNotes: [87.31, 87.31, 103.83, 87.31], // F2, F2, Ab2, F2
        padFreqs: [174.61, 207.65, 261.63, 311.13, 392.0], // F3, Ab3, C4, Eb4, G4 (Fm9)
      },
      {
        root: 69.3, // Db2
        bassNotes: [69.3, 69.3, 82.41, 69.3], // Db2, Db2, E2, Db2
        padFreqs: [138.59, 174.61, 207.65, 261.63, 329.63], // Db3, F3, Ab3, C4, E4 (Dbmaj7)
      },
      {
        root: 103.83, // Ab2
        bassNotes: [103.83, 103.83, 116.54, 103.83], // Ab2, Ab2, Bb2, Ab2
        padFreqs: [207.65, 261.63, 311.13, 392.0, 466.16], // Ab3, C4, Eb4, G4, Bb4 (Abmaj9)
      },
      {
        root: 77.78, // Eb2
        bassNotes: [77.78, 77.78, 92.5, 77.78], // Eb2, Eb2, F#2, Eb2
        padFreqs: [155.56, 196.0, 233.08, 311.13, 392.0], // Eb3, G3, Bb3, Eb4, G4 (Eb)
      },
    ];

    // Rhythmic 16th-note rolling bass pattern (1 = note, 0 = rest)
    this.bassPattern = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0];
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

    // Warm Lowpass Filter for atmospheric synth sweep
    this.mainFilter = this.ctx.createBiquadFilter();
    this.mainFilter.type = 'lowpass';
    this.mainFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
    this.mainFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);
    this.mainFilter.connect(this.masterGain);

    // Channels
    this.drumsGain = this.ctx.createGain();
    this.drumsGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.drumsGain.connect(this.masterGain);

    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
    this.bassGain.connect(this.masterGain);

    this.synthGain = this.ctx.createGain();
    this.synthGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.synthGain.connect(this.mainFilter);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
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
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  // --- Analog 808/House Kick ---
  playHouseKick(time) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Deep punch pitch sweep
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(48, time + 0.07);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.28);

    gain.gain.setValueAtTime(0.95, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

    osc.connect(gain);
    gain.connect(this.drumsGain);
    osc.start(time);
    osc.stop(time + 0.33);

    // Subtle transient punch click
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(320, time);
    click.frequency.exponentialRampToValueAtTime(60, time + 0.02);

    clickGain.gain.setValueAtTime(0.35, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

    click.connect(clickGain);
    clickGain.connect(this.drumsGain);
    click.start(time);
    click.stop(time + 0.03);
  }

  // --- Offbeat Open Hi-Hat (The classic house groove) ---
  playOpenHiHat(time) {
    if (!this.ctx || this.isMuted) return;

    const duration = 0.16;
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
    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  // --- Organic Clap with Reverb Flam ---
  playHouseClap(time) {
    if (!this.ctx || this.isMuted) return;

    const duration = 0.22;
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
    filter.frequency.setValueAtTime(1100, time);
    filter.Q.setValueAtTime(2.0, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.25, time + 0.012);
    gain.gain.linearRampToValueAtTime(0.04, time + 0.02);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  // --- Rolling Moog-Style Sawtooth Bassline ---
  playRollingBass(freq, time, duration = 0.16) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    subOsc.type = 'sine';

    osc.frequency.setValueAtTime(freq, time);
    subOsc.frequency.setValueAtTime(freq * 0.5, time); // sub octave

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);
    filter.frequency.exponentialRampToValueAtTime(110, time + duration);
    filter.Q.setValueAtTime(3.0, time);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    subOsc.connect(gain);
    filter.connect(gain);
    gain.connect(this.bassGain);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + duration + 0.04);
    subOsc.stop(time + duration + 0.04);
  }

  // --- Lush Supersaw Atmosphere Chords (Afterlife / Rüfüs Du Sol style) ---
  playAtmosphericChords(frequencies, time, duration = 3.8) {
    if (!this.ctx || this.isMuted) return;

    // Filter sweep across the chord
    if (this.mainFilter) {
      this.mainFilter.frequency.setValueAtTime(650, time);
      this.mainFilter.frequency.exponentialRampToValueAtTime(1400, time + duration * 0.6);
      this.mainFilter.frequency.exponentialRampToValueAtTime(750, time + duration);
    }

    frequencies.forEach((freq, idx) => {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      // Subtle detune for lush supersaw stereo feel
      osc1.frequency.setValueAtTime(freq * 0.997, time);
      osc2.frequency.setValueAtTime(freq * 1.003, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.045 / (idx + 1), time + 0.45);
      gain.gain.setValueAtTime(0.045 / (idx + 1), time + duration - 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.synthGain);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration + 0.1);
      osc2.stop(time + duration + 0.1);
    });
  }

  // --- The 122 BPM Melodic House Sequencer Loop ---
  startMusicLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    const stepDuration = 60 / this.bpm / 4; // 16th note ~0.123s

    const scheduleStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const t = this.ctx.currentTime;
      const current16th = this.step % 16;
      const currentBar = Math.floor(this.step / 16);
      const chordIdx = currentBar % this.chords.length;
      const chord = this.chords[chordIdx];

      // 1. Kick on every quarter note (step 0, 4, 8, 12)
      if (current16th % 4 === 0) {
        this.playHouseKick(t);
        this.notifyBeat(current16th / 4, true);
      }

      // 2. Offbeat Open Hi-Hat on the "&" (step 2, 6, 10, 14)
      if (current16th % 4 === 2) {
        this.playOpenHiHat(t);
      }

      // 3. Clap on 2 and 4 (step 4, 12)
      if (current16th === 4 || current16th === 12) {
        this.playHouseClap(t);
      }

      // 4. Rolling Bassline
      if (this.bassPattern[current16th]) {
        const bassNote = chord.bassNotes[Math.floor(current16th / 4)] || chord.root;
        this.playRollingBass(bassNote, t, stepDuration * 1.6);
      }

      // 5. Atmospheric Supersaw Chords on bar start
      if (current16th === 0) {
        this.playAtmosphericChords(chord.padFreqs, t, stepDuration * 16 * 0.95);
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

  // --- Electronic Riser & Sub-Drop on Portal Open ---
  playPortalElectronicDrop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. Resonant Filter Noise Riser
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
    filter.frequency.setValueAtTime(250, t);
    filter.frequency.exponentialRampToValueAtTime(7000, t + duration * 0.85);
    filter.Q.value = 4.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + duration * 0.85);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + duration);

    // 2. Sub Drop on the open
    const dropTime = t + 1.8;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, dropTime);
    subOsc.frequency.exponentialRampToValueAtTime(38, dropTime + 0.5);

    subGain.gain.setValueAtTime(0.85, dropTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 1.5);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(dropTime);
    subOsc.stop(dropTime + 1.6);
  }

  // Subtle button sound
  playChime(multiplier = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440 * multiplier, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, t);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Success fanfare on RSVP submit
  playSparkleSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [349.23, 440.0, 523.25, 659.25, 783.99]; // F Major chord sweep
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
      }, i * 85);
    });
  }
}

export const cosmicAudio = new CosmicAudioEngine();
