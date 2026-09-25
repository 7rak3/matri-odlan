// Emotional Wedding Audio Engine - Piano, Romantic Strings & Organic Melodic Love

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.mode = 'ceremony'; // 'ceremony' (Emotional Piano & Strings) | 'fiesta' (Organic Melodic House)

    // Audio Buses
    this.masterGain = null;
    this.pianoGain = null;
    this.stringsGain = null;
    this.drumsGain = null;
    this.bassGain = null;
    this.sfxGain = null;

    // Clock
    this.bpm = 118;
    this.step = 0;
    this.timerId = null;
    this.listeners = new Set();
    this.beatListeners = new Set();

    // Emotional Wedding Chord Progression (D Major / Romantic Harmony)
    // Dmaj7 -> F#m7 -> Bm9 -> Gmaj7
    this.chords = [
      {
        name: 'Dmaj7',
        root: 73.42, // D2
        piano: [293.66, 369.99, 440.0, 554.37, 739.99], // D4, F#4, A4, C#5, F#5
        pad: [146.83, 220.0, 277.18, 369.99],
      },
      {
        name: 'F#m7',
        root: 92.5, // F#2
        piano: [277.18, 329.63, 369.99, 440.0, 659.25], // C#4, E4, F#4, A4, E5
        pad: [185.0, 220.0, 277.18, 329.63],
      },
      {
        name: 'Bm9',
        root: 61.74, // B1
        piano: [246.94, 293.66, 369.99, 440.0, 587.33], // B3, D4, F#4, A4, D5
        pad: [123.47, 185.0, 220.0, 293.66],
      },
      {
        name: 'Gmaj7',
        root: 98.0, // G2
        piano: [293.66, 369.99, 392.0, 440.0, 739.99], // D4, F#4, G4, A4, F#5
        pad: [196.0, 246.94, 293.66, 369.99],
      },
    ];
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
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Piano Channel
    this.pianoGain = this.ctx.createGain();
    this.pianoGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.pianoGain.connect(this.masterGain);

    // Warm Strings / Pad Channel
    this.stringsGain = this.ctx.createGain();
    this.stringsGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.stringsGain.connect(this.masterGain);

    // Drums Channel (for Fiesta mode)
    this.drumsGain = this.ctx.createGain();
    this.drumsGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.drumsGain.connect(this.masterGain);

    // Bass Channel
    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.bassGain.connect(this.masterGain);

    // SFX Channel
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
      })
    );
  }

  notifyBeat(beatNumber, isKick) {
    this.beatListeners.forEach((fn) => fn({ beatNumber, isKick }));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  setMode(newMode) {
    this.mode = newMode;
    if (this.drumsGain && this.ctx) {
      this.drumsGain.gain.setTargetAtTime(newMode === 'fiesta' ? 0.5 : 0, this.ctx.currentTime, 0.3);
    }
    this.notify();
  }

  // --- Acoustic Romantic Piano Synthesis ---
  playPianoNote(freq, time, velocity = 0.5, duration = 1.2) {
    if (!this.ctx || this.isMuted) return;

    // Harmonic multi-oscillator piano simulation
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 2, time); // 2nd harmonic sparkle

    // Dynamic touch filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, time + duration);

    // Natural piano attack & exponential decay
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(velocity * 0.35, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(velocity * 0.12, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.pianoGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  // --- Warm Romantic Cello & Strings Pad ---
  playRomanticPad(frequencies, time, duration = 4.2) {
    if (!this.ctx || this.isMuted) return;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscDetune = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      oscDetune.type = 'triangle';

      osc.frequency.setValueAtTime(freq, time);
      oscDetune.frequency.setValueAtTime(freq * 1.002, time); // warm chorus

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), time + 0.9);
      gain.gain.setValueAtTime(0.05 / (idx + 1), time + duration - 0.9);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      oscDetune.connect(gain);
      gain.connect(this.stringsGain);

      osc.start(time);
      oscDetune.start(time);
      osc.stop(time + duration + 0.1);
      oscDetune.stop(time + duration + 0.1);
    });
  }

  // --- Soft Organic House Beat (Fiesta Mode) ---
  playWarmKick(time) {
    if (!this.ctx || this.isMuted || this.mode !== 'fiesta') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.08);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.drumsGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  playSoftShaker(time) {
    if (!this.ctx || this.isMuted || this.mode !== 'fiesta') return;

    const duration = 0.05;
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
    filter.frequency.setValueAtTime(6500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);
    noise.start(time);
    noise.stop(time + duration);
  }

  // --- The Romantic Sequencer Loop ---
  startMusicLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    const beatInterval = 60 / this.bpm; // ~0.508s
    const stepInterval = beatInterval / 2; // 8th note ~0.254s

    const scheduleStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const t = this.ctx.currentTime;
      const current8th = this.step % 16;
      const currentBar = Math.floor(this.step / 16);
      const chordIdx = currentBar % this.chords.length;
      const chord = this.chords[chordIdx];

      // Pad chord on bar start
      if (current8th === 0) {
        this.playRomanticPad(chord.pad, t, stepInterval * 16 * 0.95);
      }

      // Emotional Piano Arpeggio (melodic, gentle, touching)
      const pianoPattern = [0, 1, 2, 3, 2, 4, 3, 1, 0, 2, 3, 4, 3, 2, 1, 2];
      const noteIdx = pianoPattern[current8th] % chord.piano.length;
      const noteFreq = chord.piano[noteIdx];
      const velocity = current8th % 4 === 0 ? 0.7 : 0.45;
      this.playPianoNote(noteFreq, t, velocity, stepInterval * 2.2);

      // Quarter-note pulse
      if (current8th % 2 === 0) {
        const beatNum = current8th / 2;
        this.notifyBeat(beatNum, beatNum === 0);

        if (this.mode === 'fiesta') {
          this.playWarmKick(t);
        }
      }

      if (this.mode === 'fiesta' && current8th % 2 === 1) {
        this.playSoftShaker(t);
      }

      this.step++;
      this.timerId = setTimeout(scheduleStep, stepInterval * 1000);
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

  // --- Emotional Wedding Portal Opening Sound ---
  playWeddingPortalOpen() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. Warm sub-bass swell
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(55, t);
    sub.frequency.exponentialRampToValueAtTime(110, t + 1.2);
    sub.frequency.exponentialRampToValueAtTime(45, t + 3.0);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.6, t + 0.9);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 3.2);

    sub.connect(subGain);
    subGain.connect(this.sfxGain);
    sub.start(t);
    sub.stop(t + 3.3);

    // 2. Angelic Piano Arpeggio Cascade (D, F#, A, C#, E, F#)
    const notes = [293.66, 369.99, 440.0, 554.37, 659.25, 739.99, 880.0, 1108.73];
    notes.forEach((freq, idx) => {
      this.playPianoNote(freq, t + idx * 0.12, 0.7, 2.5);
    });

    // 3. Golden Bell Chime
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1760, t + 1.1); // A6

    bellGain.gain.setValueAtTime(0.2, t + 1.1);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);

    bellOsc.connect(bellGain);
    bellGain.connect(this.sfxGain);
    bellOsc.start(t + 1.1);
    bellOsc.stop(t + 3.6);
  }

  // Soft romantic chime
  playChime(multiplier = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;
    this.playPianoNote(587.33 * multiplier, this.ctx.currentTime, 0.5, 1.2);
  }

  // Romantic Harp Arpeggio for success / confirm
  playSparkleSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [440.0, 554.37, 659.25, 739.99, 880.0, 1108.73];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        this.playPianoNote(freq, this.ctx.currentTime, 0.6, 1.4);
      }, i * 80);
    });
  }
}

export const cosmicAudio = new CosmicAudioEngine();
