// Authentic Multi-Track Cosmic Audio Engine for Jose & Odlan's Wedding
// 4 Distinct High-End Musical Themes:
// 1. Melodic Deep House (122 BPM) - Inspired by Rüfüs Du Sol & Afterlife
// 2. Romance Eterno (76 BPM) - Cinematic Piano & Celestial Strings Ballad
// 3. Cosmic Sunset (90 BPM) - Chillwave & Warm Rhodes Lo-Fi
// 4. Starlight Disco (116 BPM) - Chic Nu-Disco & Funky Golden Groove

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.currentTrackIndex = 0;

    // Audio Buses
    this.masterGain = null;
    this.drumsGain = null;
    this.bassGain = null;
    this.synthGain = null;
    this.sfxGain = null;
    this.mainFilter = null;

    // Clock
    this.step = 0;
    this.timerId = null;
    this.listeners = new Set();
    this.beatListeners = new Set();

    // 4 Tracks Definitions
    this.tracks = [
      {
        id: 'melodic-house',
        title: 'Melodic Deep House',
        genre: 'Deep House Atmospheric',
        bpm: 122,
        chords: [
          {
            root: 87.31, // F2
            bassNotes: [87.31, 87.31, 103.83, 87.31], // F2, F2, Ab2, F2
            padFreqs: [174.61, 207.65, 261.63, 311.13, 392.0], // Fm9 (F3, Ab3, C4, Eb4, G4)
          },
          {
            root: 69.3, // Db2
            bassNotes: [69.3, 69.3, 82.41, 69.3], // Db2, Db2, E2, Db2
            padFreqs: [138.59, 174.61, 207.65, 261.63, 329.63], // Dbmaj7
          },
          {
            root: 103.83, // Ab2
            bassNotes: [103.83, 103.83, 116.54, 103.83], // Ab2, Ab2, Bb2, Ab2
            padFreqs: [207.65, 261.63, 311.13, 392.0, 466.16], // Abmaj9
          },
          {
            root: 77.78, // Eb2
            bassNotes: [77.78, 77.78, 92.5, 77.78], // Eb2, Eb2, F#2, Eb2
            padFreqs: [155.56, 196.0, 233.08, 311.13, 392.0], // Eb
          },
        ],
        bassPattern: [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
      },
      {
        id: 'romance-eterno',
        title: 'Romance Eterno',
        genre: 'Piano & Cuerdas Celestiales',
        bpm: 76,
        chords: [
          {
            root: 65.41, // C2
            bassNotes: [65.41, 130.81, 98.0, 130.81],
            padFreqs: [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
            arpeggio: [130.81, 196.0, 246.94, 293.66, 329.63, 293.66, 246.94, 196.0],
          },
          {
            root: 55.0, // A1
            bassNotes: [55.0, 110.0, 82.41, 110.0],
            padFreqs: [110.0, 164.81, 196.0, 261.63, 329.63], // Am9
            arpeggio: [110.0, 164.81, 220.0, 261.63, 329.63, 261.63, 220.0, 164.81],
          },
          {
            root: 43.65, // F1
            bassNotes: [43.65, 87.31, 65.41, 87.31],
            padFreqs: [87.31, 130.81, 174.61, 220.0, 261.63], // Fmaj7
            arpeggio: [87.31, 130.81, 174.61, 220.0, 261.63, 220.0, 174.61, 130.81],
          },
          {
            root: 49.0, // G1
            bassNotes: [49.0, 98.0, 73.42, 98.0],
            padFreqs: [98.0, 146.83, 196.0, 246.94, 293.66], // Gsus4 / G
            arpeggio: [98.0, 146.83, 196.0, 246.94, 293.66, 246.94, 196.0, 146.83],
          },
        ],
        bassPattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      },
      {
        id: 'cosmic-sunset',
        title: 'Cosmic Sunset',
        genre: 'Chillwave & Lo-Fi Lounge',
        bpm: 90,
        chords: [
          {
            root: 73.42, // D2
            bassNotes: [73.42, 73.42, 110.0, 73.42],
            padFreqs: [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
          },
          {
            root: 49.0, // G1
            bassNotes: [49.0, 98.0, 73.42, 98.0],
            padFreqs: [98.0, 174.61, 246.94, 329.63, 440.0], // G13
          },
          {
            root: 65.41, // C2
            bassNotes: [65.41, 65.41, 98.0, 65.41],
            padFreqs: [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
          },
          {
            root: 55.0, // A1
            bassNotes: [55.0, 110.0, 82.41, 110.0],
            padFreqs: [110.0, 174.61, 220.0, 277.18, 329.63], // A7alt
          },
        ],
        bassPattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      },
      {
        id: 'starlight-disco',
        title: 'Starlight Disco',
        genre: 'Nu-Disco & Golden Chic',
        bpm: 116,
        chords: [
          {
            root: 61.74, // B1
            bassNotes: [61.74, 123.47, 61.74, 123.47], // octave funk
            padFreqs: [123.47, 146.83, 185.0, 220.0, 277.18], // Bm7
          },
          {
            root: 82.41, // E2
            bassNotes: [82.41, 164.81, 82.41, 164.81],
            padFreqs: [164.81, 207.65, 246.94, 293.66, 329.63], // E7/9
          },
          {
            root: 55.0, // A1
            bassNotes: [55.0, 110.0, 55.0, 110.0],
            padFreqs: [110.0, 138.59, 164.81, 207.65, 277.18], // Amaj7
          },
          {
            root: 46.25, // F#1
            bassNotes: [46.25, 92.5, 46.25, 92.5],
            padFreqs: [92.5, 110.0, 138.59, 164.81, 220.0], // F#m7
          },
        ],
        bassPattern: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
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

    // Warm Lowpass Filter for atmospheric synth sweep
    this.mainFilter = this.ctx.createBiquadFilter();
    this.mainFilter.type = 'lowpass';
    this.mainFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
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
    this.synthGain.gain.setValueAtTime(0.42, this.ctx.currentTime);
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
    this.playChime(1.4);
    this.notify();

    if (this.isPlaying) {
      // Re-trigger loop with the new track parameters smoothly
      if (this.timerId) clearTimeout(this.timerId);
      this.timerId = null;
      this.isPlaying = false;
      this.startMusicLoop();
    }
  }

  nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  prevTrack() {
    this.setTrack(this.currentTrackIndex - 1);
  }

  // --- Sound Generation Instruments ---

  // Kick Drum (House punch / Ballad soft pulse / Disco thump)
  playKick(time, style = 'house') {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    if (style === 'ballad') {
      // Soft ambient heartbeat pulse
      osc.frequency.setValueAtTime(80, time);
      osc.frequency.exponentialRampToValueAtTime(32, time + 0.35);
      gain.gain.setValueAtTime(0.55, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);
      osc.connect(gain);
      gain.connect(this.drumsGain);
      osc.start(time);
      osc.stop(time + 0.4);
      return;
    }

    if (style === 'disco') {
      // Tight 70s/80s disco kick
      osc.frequency.setValueAtTime(155, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.06);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.22);
      gain.gain.setValueAtTime(0.9, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
      osc.connect(gain);
      gain.connect(this.drumsGain);
      osc.start(time);
      osc.stop(time + 0.25);
      return;
    }

    // Default: Punchy 808 Deep House / Chillwave Kick
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(48, time + 0.07);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.28);
    gain.gain.setValueAtTime(0.95, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);
    osc.connect(gain);
    gain.connect(this.drumsGain);
    osc.start(time);
    osc.stop(time + 0.33);

    // Subtle click for definition
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(300, time);
    click.frequency.exponentialRampToValueAtTime(60, time + 0.02);
    clickGain.gain.setValueAtTime(0.3, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);
    click.connect(clickGain);
    clickGain.connect(this.drumsGain);
    click.start(time);
    click.stop(time + 0.03);
  }

  // Snare or Clap
  playSnareOrClap(time, style = 'clap') {
    if (!this.ctx || this.isMuted) return;

    if (style === 'ballad-chime') {
      // Gentle sparkling shimmer
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, time);
      chimeOsc.frequency.exponentialRampToValueAtTime(1320, time + 0.4);
      chimeGain.gain.setValueAtTime(0.12, time);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.drumsGain);
      chimeOsc.start(time);
      chimeOsc.stop(time + 0.55);
      return;
    }

    const duration = style === 'disco' ? 0.18 : 0.22;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(style === 'disco' ? 1400 : 1100, time);
    filter.Q.setValueAtTime(2.2, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.28, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  // Hi-Hat / Shaker
  playHiHat(time, open = false, volume = 0.22) {
    if (!this.ctx || this.isMuted) return;

    const duration = open ? 0.16 : 0.05;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
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
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + duration);
  }

  // Bass Synthesizer
  playBassNote(freq, time, duration = 0.16, style = 'saw') {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    if (style === 'sub-sine') {
      // Warm round sub bass for ballad
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(this.bassGain);
      osc.start(time);
      osc.stop(time + duration + 0.05);
      return;
    }

    // Sawtooth / Funky Bass
    osc.type = style === 'funky' ? 'square' : 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'funky' ? 650 : 320, time);
    filter.frequency.exponentialRampToValueAtTime(110, time + duration);
    filter.Q.setValueAtTime(3.0, time);

    gain.gain.setValueAtTime(0.38, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bassGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  // Lush Atmospheric Pad
  playAtmosphericPad(frequencies, time, duration = 3.6, style = 'lush') {
    if (!this.ctx || this.isMuted) return;

    if (this.mainFilter) {
      this.mainFilter.frequency.setValueAtTime(style === 'strings' ? 1200 : 700, time);
      this.mainFilter.frequency.exponentialRampToValueAtTime(style === 'strings' ? 1600 : 1350, time + duration * 0.5);
      this.mainFilter.frequency.exponentialRampToValueAtTime(800, time + duration);
    }

    frequencies.forEach((freq, idx) => {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = style === 'strings' ? 'triangle' : 'sawtooth';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(freq * 0.998, time);
      osc2.frequency.setValueAtTime(freq * 1.002, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.05 / (idx + 1), time + 0.4);
      gain.gain.setValueAtTime(0.05 / (idx + 1), time + duration - 0.6);
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

  // Acoustic/Electric Piano Arpeggio note
  playPianoNote(freq, time, duration = 0.5) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    harmonic.connect(gain);
    gain.connect(this.synthGain);

    osc.start(time);
    harmonic.start(time);
    osc.stop(time + duration + 0.05);
    harmonic.stop(time + duration + 0.05);
  }

  // --- Sequencer Core Loop ---
  startMusicLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    const scheduleStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const track = this.currentTrack;
      const bpm = track.bpm;
      const stepDuration = 60 / bpm / 4; // 16th note in seconds
      const t = this.ctx.currentTime;
      const current16th = this.step % 16;
      const currentBar = Math.floor(this.step / 16);
      const chordIdx = currentBar % track.chords.length;
      const chord = track.chords[chordIdx];

      switch (this.currentTrackIndex) {
        // Track 0: Melodic Deep House (122 BPM)
        case 0: {
          if (current16th % 4 === 0) {
            this.playKick(t, 'house');
            this.notifyBeat(current16th / 4, true);
          }
          if (current16th % 4 === 2) {
            this.playHiHat(t, true, 0.22);
          }
          if (current16th === 4 || current16th === 12) {
            this.playSnareOrClap(t, 'clap');
          }
          if (track.bassPattern[current16th]) {
            const bassNote = chord.bassNotes[Math.floor(current16th / 4)] || chord.root;
            this.playBassNote(bassNote, t, stepDuration * 1.6, 'saw');
          }
          if (current16th === 0) {
            this.playAtmosphericPad(chord.padFreqs, t, stepDuration * 16 * 0.95, 'lush');
          }
          break;
        }

        // Track 1: Romance Eterno (76 BPM Ballad)
        case 1: {
          if (current16th === 0 || current16th === 8) {
            this.playKick(t, 'ballad');
            this.notifyBeat(current16th / 4, true);
          }
          if (current16th === 12) {
            this.playSnareOrClap(t, 'ballad-chime');
          }
          // Gentle cascading piano arpeggios
          if (chord.arpeggio && current16th % 2 === 0) {
            const noteIdx = (current16th / 2) % chord.arpeggio.length;
            this.playPianoNote(chord.arpeggio[noteIdx], t, stepDuration * 3.5);
          }
          if (track.bassPattern[current16th]) {
            this.playBassNote(chord.root, t, stepDuration * 4.0, 'sub-sine');
          }
          if (current16th === 0) {
            this.playAtmosphericPad(chord.padFreqs, t, stepDuration * 16 * 0.95, 'strings');
          }
          break;
        }

        // Track 2: Cosmic Sunset (90 BPM Chillwave)
        case 2: {
          if (current16th === 0 || current16th === 7 || current16th === 10) {
            this.playKick(t, 'house');
            this.notifyBeat(current16th / 4, current16th === 0);
          }
          if (current16th === 4 || current16th === 12) {
            this.playSnareOrClap(t, 'clap');
          }
          // Swung chill hi-hat
          if (current16th % 2 === 1) {
            this.playHiHat(t, false, 0.16);
          }
          if (track.bassPattern[current16th]) {
            const bNote = chord.bassNotes[Math.floor(current16th / 4)] || chord.root;
            this.playBassNote(bNote, t, stepDuration * 2.2, 'saw');
          }
          if (current16th === 0 || current16th === 8) {
            this.playAtmosphericPad(chord.padFreqs, t, stepDuration * 8 * 0.92, 'lush');
          }
          break;
        }

        // Track 3: Starlight Disco (116 BPM)
        case 3: {
          if (current16th % 4 === 0) {
            this.playKick(t, 'disco');
            this.notifyBeat(current16th / 4, true);
          }
          if (current16th === 4 || current16th === 12) {
            this.playSnareOrClap(t, 'disco');
          }
          if (current16th % 4 === 2) {
            this.playHiHat(t, true, 0.25);
          } else if (current16th % 2 === 0) {
            this.playHiHat(t, false, 0.14);
          }
          if (track.bassPattern[current16th]) {
            const bIdx = current16th % chord.bassNotes.length;
            this.playBassNote(chord.bassNotes[bIdx], t, stepDuration * 1.1, 'funky');
          }
          if (current16th === 0 || current16th === 6) {
            this.playAtmosphericPad(chord.padFreqs, t, stepDuration * 6 * 0.9, 'lush');
          }
          break;
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
    this.notify();
  }

  // --- Sound Effects ---

  // Electronic Riser & Sub-Drop on Portal Open
  playPortalElectronicDrop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const duration = 2.4;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
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

    // Sub Drop on the open
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
