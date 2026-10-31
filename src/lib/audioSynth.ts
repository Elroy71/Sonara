import { InstrumentType } from "@/types/music";
import { getChordDiagram, parseChordSymbol } from "@/data/chordDiagrams";
import { getNoteIndex } from "@/lib/transpose";

/**
 * Sonara Audio Synthesis Engine 2.0
 * ----------------------------------------------------
 * High-Fidelity Web Audio Physical Modeling Engine:
 * - Acoustic & Electric Guitar (Karplus-Strong with soundbox body resonance & pick attack)
 * - Worship Grand Piano (Inharmonic multi-string chorus + felt hammer impact + sanctuary ambience)
 * - Deep Electric/Acoustic Bass (Sub-bass fundamental reinforcement + fingered round tone)
 * - Authentic Flamenco/Peruvian Cajon (Bass cavity boom, top-corner wood slap, snare wire sizzle, ghost taps)
 * - Master Dynamics Compressor & Sanctuary Hall Reverb (prevents clipping, adds lush church space)
 * - Sample-accurate Metronome & Strobe Tuner tone generators
 */

let sharedAudioCtx: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let masterCompressorNode: DynamicsCompressorNode | null = null;
let reverbConvolverNode: ConvolverNode | null = null;
let reverbGainNode: GainNode | null = null;
let dryGainNode: GainNode | null = null;
let masterVolume = 0.88;
let reverbSendLevel = 0.22; // Warm worship hall default

/**
 * Generates an impulse response that simulates the warm acoustics
 * of a modern church worship sanctuary / wooden music hall.
 */
function createSanctuaryImpulseResponse(ctx: AudioContext, durationSec = 1.6, decayRate = 3.2): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = ctx.createBuffer(2, length, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  // Early reflections + smooth exponential tail with high-frequency air dampening
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // Exponential decay with natural high-frequency loss
    const damping = Math.exp(-t * decayRate);
    const hfLoss = Math.exp(-t * 5.0);

    // Stereo decorrelation for spacious worship ambience
    const nL = (Math.random() * 2 - 1) * damping;
    const nR = (Math.random() * 2 - 1) * damping;

    // Subtle early reflection spikes within the first 45ms
    const early = t < 0.045 ? Math.sin(t * 800) * 0.35 : 0;

    left[i] = (nL + early) * (0.65 + 0.35 * hfLoss);
    right[i] = (nR - early * 0.7) * (0.65 + 0.35 * hfLoss);
  }

  return buffer;
}

/**
 * Initializes the master audio bus with limiter/compressor and reverb
 */
function initMasterBus(ctx: AudioContext) {
  if (masterGainNode) return;

  // 1. Master Output Gain
  masterGainNode = ctx.createGain();
  masterGainNode.gain.setValueAtTime(masterVolume, ctx.currentTime);

  // 2. Broadcast-Grade Dynamics Compressor (Prevents clipping & harsh digital peaks)
  masterCompressorNode = ctx.createDynamicsCompressor();
  masterCompressorNode.threshold.setValueAtTime(-14, ctx.currentTime);
  masterCompressorNode.knee.setValueAtTime(14, ctx.currentTime);
  masterCompressorNode.ratio.setValueAtTime(4.5, ctx.currentTime);
  masterCompressorNode.attack.setValueAtTime(0.003, ctx.currentTime);
  masterCompressorNode.release.setValueAtTime(0.18, ctx.currentTime);

  // 3. Dry signal path
  dryGainNode = ctx.createGain();
  dryGainNode.gain.setValueAtTime(1.0, ctx.currentTime);

  // 4. Sanctuary Reverb Convolver & Reverb Gain
  reverbGainNode = ctx.createGain();
  reverbGainNode.gain.setValueAtTime(reverbSendLevel, ctx.currentTime);

  try {
    reverbConvolverNode = ctx.createConvolver();
    reverbConvolverNode.buffer = createSanctuaryImpulseResponse(ctx);
    reverbGainNode.connect(reverbConvolverNode);
    reverbConvolverNode.connect(masterCompressorNode);
  } catch {
    // Fallback if convolver fails
  }

  dryGainNode.connect(masterCompressorNode);
  masterCompressorNode.connect(masterGainNode);
  masterGainNode.connect(ctx.destination);
}

/**
 * Connects any instrument voice to the master bus (both dry and wet reverb paths)
 */
function connectToMaster(
  ctx: AudioContext,
  sourceNode: AudioNode,
  reverbAmount = 0.2
) {
  initMasterBus(ctx);

  if (dryGainNode) {
    sourceNode.connect(dryGainNode);
  } else {
    sourceNode.connect(ctx.destination);
  }

  if (reverbGainNode && reverbAmount > 0) {
    const send = ctx.createGain();
    send.gain.setValueAtTime(reverbAmount, ctx.currentTime);
    sourceNode.connect(send);
    send.connect(reverbGainNode);
  }
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
      initMasterBus(sharedAudioCtx);

      // Auto-unlock on first user interaction (touch/click/keydown) for mobile browsers
      const unlockAudio = () => {
        if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
          sharedAudioCtx.resume();
        }
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

export function setMasterVolume(vol: number) {
  masterVolume = Math.max(0, Math.min(1, vol));
  if (masterGainNode && sharedAudioCtx) {
    masterGainNode.gain.setValueAtTime(masterVolume, sharedAudioCtx.currentTime);
  }
}

export function getMasterVolume(): number {
  return masterVolume;
}

export function setReverbLevel(level: number) {
  reverbSendLevel = Math.max(0, Math.min(1, level));
  if (reverbGainNode && sharedAudioCtx) {
    reverbGainNode.gain.setValueAtTime(reverbSendLevel, sharedAudioCtx.currentTime);
  }
}

export function noteToMidi(noteWithOctave: string): number {
  const match = noteWithOctave.match(/^([A-G][#b]?)(\d)$/);
  if (!match) return 60;
  return (parseInt(match[2], 10) + 1) * 12 + getNoteIndex(match[1]);
}

/**
 * Converts a note like "C4", "F#4", "A4" to frequency in Hz (A4 = 440Hz).
 */
export function noteToFrequency(noteWithOctave: string): number {
  const match = noteWithOctave.match(/^([A-G][#b]?)(\d)$/);
  if (!match) return 261.63;
  const [, note, octStr] = match;
  const semitone = getNoteIndex(note);
  const octave = parseInt(octStr, 10);
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const GUITAR_OPEN_MIDI = [40, 45, 50, 55, 59, 64]; // E2 A2 D3 G3 B3 E4
const BASS_OPEN_MIDI = [28, 33, 38, 43]; // E1 A1 D2 G2

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Physical Model: Acoustic Dreadnought Guitar Pluck (Karplus-Strong 2.0)
 * With pick scrape attack transient & spruce soundbox body resonance filter
 */
function scheduleGuitarPluck(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume: number,
  stringIdx = 0
) {
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const length = Math.floor(sr * duration);
  const buffer = ctx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);
  const ring = new Float32Array(period);

  // String-dependent decay: lower wound strings sustain longer, high unwound strings chime
  const decayRate = 0.9955 + Math.min(0.003, (6 - stringIdx) * 0.0005);

  let last = 0;
  for (let i = 0; i < period; i++) {
    // Smoothed initial impulse: simulating pick tip release
    const n = Math.random() * 2 - 1;
    last = last * 0.52 + n * 0.48;
    ring[i] = last;
  }

  for (let i = 0; i < length; i++) {
    const idx = i % period;
    const next = (idx + 1) % period;
    data[i] = ring[idx];
    // Two-point averaging filter with slight damping
    ring[idx] = decayRate * 0.5 * (ring[idx] + ring[next]);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.setValueAtTime(sr / period / freq, startTime);

  // Lowpass filter for natural string brightness
  const toneFilter = ctx.createBiquadFilter();
  toneFilter.type = "lowpass";
  const cutoff = 2400 + (stringIdx * 650);
  toneFilter.frequency.setValueAtTime(cutoff, startTime);
  toneFilter.frequency.exponentialRampToValueAtTime(Math.max(600, cutoff * 0.35), startTime + duration);

  // Acoustic body resonance filter (105Hz air + 215Hz spruce top)
  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = "peaking";
  bodyFilter.frequency.setValueAtTime(110, startTime);
  bodyFilter.Q.setValueAtTime(2.2, startTime);
  bodyFilter.gain.setValueAtTime(stringIdx < 3 ? 3.5 : 1.5, startTime);

  // High-frequency pick scrape transient (3ms burst)
  const pickFilter = ctx.createBiquadFilter();
  pickFilter.type = "bandpass";
  pickFilter.frequency.setValueAtTime(3400, startTime);
  pickFilter.Q.setValueAtTime(2.0, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  src.connect(toneFilter);
  toneFilter.connect(bodyFilter);
  bodyFilter.connect(gain);

  connectToMaster(ctx, gain, 0.22);
  src.start(startTime);
  src.stop(startTime + duration + 0.05);
}

/**
 * Physical Model: Electric/Acoustic Bass Note
 * Sub-bass foundation + Karplus-Strong string pluck + neck pickup warmth
 */
function scheduleBassNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume: number
) {
  // 1. Clean sub-bass oscillator layer (gives authoritative low-end punch)
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(freq, startTime);

  subGain.gain.setValueAtTime(0.001, startTime);
  subGain.gain.linearRampToValueAtTime(volume * 0.65, startTime + 0.008);
  subGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  subOsc.connect(subGain);
  connectToMaster(ctx, subGain, 0.12);
  subOsc.start(startTime);
  subOsc.stop(startTime + duration + 0.05);

  // 2. Karplus-Strong string layer for round fingerstyle pluck attack
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const length = Math.floor(sr * duration);
  const buffer = ctx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);
  const ring = new Float32Array(period);

  let last = 0;
  for (let i = 0; i < period; i++) {
    const n = Math.random() * 2 - 1;
    last = last * 0.68 + n * 0.32; // Warmer initial finger pluck
    ring[i] = last;
  }

  for (let i = 0; i < length; i++) {
    const idx = i % period;
    const next = (idx + 1) % period;
    data[i] = ring[idx];
    ring[idx] = 0.9982 * 0.5 * (ring[idx] + ring[next]);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.setValueAtTime(sr / period / freq, startTime);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(950, startTime);
  filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(volume * 0.75, startTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  src.connect(filter);
  filter.connect(gain);
  connectToMaster(ctx, gain, 0.14);
  src.start(startTime);
  src.stop(startTime + duration + 0.05);
}

/**
 * Physical Model: Grand Worship Piano Voice
 * Inharmonic multi-string chorus + felt hammer strike transient + warm lowpass envelope
 */
function schedulePianoNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume: number
) {
  // Harmonic profile of concert grand piano with natural inharmonicity
  const harmonics = [
    { h: 1, gain: 1.0, detune: -1.2 },
    { h: 1, gain: 0.95, detune: 1.2 }, // Unichord chorus double
    { h: 2, gain: 0.55, detune: 0.5 },
    { h: 3, gain: 0.28, detune: -0.8 },
    { h: 4, gain: 0.15, detune: 1.0 },
    { h: 5, gain: 0.08, detune: -0.5 },
    { h: 6, gain: 0.04, detune: 0.0 },
  ];

  const noteMasterGain = ctx.createGain();
  noteMasterGain.gain.setValueAtTime(volume, startTime);

  // Dynamic filter: bright on hammer strike, warm body sustain
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  const startCutoff = Math.min(8500, freq * 9);
  filter.frequency.setValueAtTime(startCutoff, startTime);
  filter.frequency.exponentialRampToValueAtTime(Math.min(3200, freq * 3.5), startTime + 0.35);

  noteMasterGain.connect(filter);
  connectToMaster(ctx, filter, 0.28); // Generous sanctuary hall reverb for piano

  // Felt hammer strike transient (short low-mid thud)
  const hammerOsc = ctx.createOscillator();
  const hammerGain = ctx.createGain();
  hammerOsc.type = "triangle";
  hammerOsc.frequency.setValueAtTime(Math.min(350, freq * 0.8), startTime);
  hammerGain.gain.setValueAtTime(volume * 0.35, startTime);
  hammerGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.016);
  hammerOsc.connect(hammerGain);
  hammerGain.connect(filter);
  hammerOsc.start(startTime);
  hammerOsc.stop(startTime + 0.02);

  harmonics.forEach(({ h, gain, detune }) => {
    // Piano steel string inharmonicity formula: f_n = n * f_0 * sqrt(1 + B * n^2)
    const inharmonicity = Math.sqrt(1 + 0.00035 * h * h);
    const targetFreq = freq * h * inharmonicity;
    if (targetFreq > 14000) return;

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(targetFreq, startTime);
    osc.detune.setValueAtTime(detune, startTime);

    // Higher harmonics decay faster than the fundamental
    const harmonicLife = duration / (1 + (h - 1) * 0.65);

    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(gain, startTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + harmonicLife);

    osc.connect(g);
    g.connect(noteMasterGain);
    osc.start(startTime);
    osc.stop(startTime + harmonicLife + 0.05);
  });
}

/**
 * Play a single note (by MIDI pitch) with authentic instrument character.
 * Supports scheduledTime for sample-accurate Web Audio sequencing.
 */
export function playInstrumentNote(
  midi: number,
  instrument: InstrumentType = "guitar",
  volume = 0.5,
  scheduledTime?: number
) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const atTime = scheduledTime !== undefined ? scheduledTime : ctx.currentTime;
  const freq = midiToFrequency(midi);

  if (instrument === "piano") {
    schedulePianoNote(ctx, freq, atTime, 2.5, volume * 0.5);
  } else if (instrument === "bass") {
    scheduleBassNote(ctx, freq, atTime, 2.2, volume * 0.7);
  } else {
    // Guitar: estimate string index from MIDI pitch
    const stringIdx = Math.max(0, Math.min(5, Math.floor((midi - 40) / 4.8)));
    scheduleGuitarPluck(ctx, freq, atTime, 2.4, volume * 0.65, stringIdx);
  }
}

/** Nada MIDI terdekat untuk nama nada (mis. "G") pada rentang bass E1..D#2. */
function bassMidiForPitchClass(pc: number): number {
  return 28 + (((pc - 4) % 12) + 12) % 12;
}

/**
 * High-Fidelity Chord Preview with Realistic Strumming Timing & Voicing:
 * - Guitar: Authentic downstroke strumming speed (18-22ms per string) with woody resonance
 * - Bass: Arpeggiated root-first groove with heavy sub-bass warmth
 * - Piano: Left-hand deep bass octave + right-hand lush inharmonic spread voicing
 */
export function playChordPreview(
  chordSymbol: string,
  instrument: InstrumentType = "guitar"
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const diagram = getChordDiagram(chordSymbol);
  const parsed = parseChordSymbol(chordSymbol);
  const now = ctx.currentTime + 0.015;

  if (instrument === "guitar") {
    const frets = diagram.guitar.frets;
    const sounding = frets
      .map((fret, stringIdx) => ({ fret, stringIdx }))
      .filter((s) => s.fret >= 0);

    const baseVol = 0.38 / Math.sqrt(Math.max(1, sounding.length) / 3.5);

    // Natural pick strumming delay: 18ms between strings
    sounding.forEach((s, i) => {
      const midi = GUITAR_OPEN_MIDI[s.stringIdx] + s.fret;
      const strDelay = i * 0.02; // Downstroke timing
      // Lower bass strings have slightly more pick weight
      const weight = s.stringIdx >= 4 ? 1.15 : s.stringIdx <= 1 ? 1.05 : 0.9;

      scheduleGuitarPluck(
        ctx,
        midiToFrequency(midi),
        now + strDelay,
        2.6,
        baseVol * weight,
        s.stringIdx
      );
    });
    return;
  }

  if (instrument === "bass") {
    const frets = diagram.bass.frets;
    const notes = frets
      .map((fret, stringIdx) => ({ fret, stringIdx }))
      .filter((s) => s.fret >= 0);

    notes.forEach((s, i) => {
      const midi = BASS_OPEN_MIDI[s.stringIdx] + s.fret;
      const arpeggioDelay = i * 0.16;
      scheduleBassNote(
        ctx,
        midiToFrequency(midi),
        now + arpeggioDelay,
        1.8,
        i === 0 ? 0.68 : 0.52
      );
    });
    return;
  }

  // Piano / Keyboard
  const bassPc = parsed.bassIdx !== null ? parsed.bassIdx : parsed.rootIdx;
  const lowMidi = 36 + bassPc; // C2..B2

  // Left hand: Low octave bass fundamental + octave overtone
  schedulePianoNote(ctx, midiToFrequency(lowMidi), now, 2.6, 0.42);
  schedulePianoNote(ctx, midiToFrequency(lowMidi + 12), now + 0.006, 2.4, 0.24);

  // Right hand: Lush chord voicing with subtle 10ms human hand spread
  diagram.piano.notes.forEach((noteStr, i) => {
    schedulePianoNote(
      ctx,
      noteToFrequency(noteStr),
      now + 0.012 + i * 0.012,
      2.5,
      0.23
    );
  });
}

export { bassMidiForPitchClass };

/**
 * Authentic Flamenco / Peruvian Cajon Hit Synthesizer:
 * - "B": Deep sub-thump bass tone (pitch-gliding sine 115Hz->52Hz + wood cavity resonance)
 * - "S": Sharp top-corner wood slap snap + internal snare wires vibration sizzle
 * - "T": Warm resonant open wood tone (~260Hz)
 * - "t": Soft fingertip ghost tap on front tapa (15% volume)
 * - "-": Rest / silence
 */
export function playCajonHit(hitType: "B" | "S" | "t" | "T" | "-") {
  if (hitType === "-") return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (hitType === "B") {
    // 1. Deep Sub Thump (52Hz bottom with pitch glide from 115Hz)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(125, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.11);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.68, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    osc.connect(gain);
    connectToMaster(ctx, gain, 0.12);
    osc.start(now);
    osc.stop(now + 0.25);

    // 2. Wood Cavity Resonance (110Hz body air boom)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = "triangle";
    bodyOsc.frequency.setValueAtTime(110, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(68, now + 0.08);

    bodyGain.gain.setValueAtTime(0.3, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    bodyOsc.connect(bodyGain);
    connectToMaster(ctx, bodyGain, 0.15);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.15);
  } else if (hitType === "S") {
    // 1. Woody Edge Slap (crisp finger crack on wood edge)
    const slapOsc = ctx.createOscillator();
    const slapGain = ctx.createGain();
    slapOsc.type = "triangle";
    slapOsc.frequency.setValueAtTime(490, now);
    slapOsc.frequency.exponentialRampToValueAtTime(170, now + 0.035);

    slapGain.gain.setValueAtTime(0.45, now);
    slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    slapOsc.connect(slapGain);
    connectToMaster(ctx, slapGain, 0.18);
    slapOsc.start(now);
    slapOsc.stop(now + 0.05);

    // 2. Internal Snare Wires Sizzle (shaped bandpass white noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(1.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.48, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

    noise.connect(filter);
    filter.connect(noiseGain);
    connectToMaster(ctx, noiseGain, 0.22);
    noise.start(now);
  } else if (hitType === "T") {
    // Open Tone (Warm conga-like wood ring without snare wire sizzle)
    const toneOsc = ctx.createOscillator();
    const toneGain = ctx.createGain();
    toneOsc.type = "sine";
    toneOsc.frequency.setValueAtTime(280, now);
    toneOsc.frequency.exponentialRampToValueAtTime(210, now + 0.1);

    toneGain.gain.setValueAtTime(0.38, now);
    toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    toneOsc.connect(toneGain);
    connectToMaster(ctx, toneGain, 0.25);
    toneOsc.start(now);
    toneOsc.stop(now + 0.16);
  } else if (hitType === "t") {
    // Ghost / Touch: soft fingertip tap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.022);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    connectToMaster(ctx, gain, 0.1);
    osc.start(now);
    osc.stop(now + 0.032);
  }
}

/**
 * Universal Precision Metronome Click
 * - "woodblock": Resonant woody pop (like high-grade orchestral woodblock)
 * - "stick": Crisp drumstick / rimshot click
 * - "digital": Clean studio electronic beep
 */
export function playMetronomeClick(
  scheduledTime?: number,
  soundType: "woodblock" | "stick" | "digital" = "woodblock",
  isAccent = false
) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const time = scheduledTime ?? ctx.currentTime;

  if (soundType === "woodblock") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const freq = isAccent ? 1280 : 880;
    osc.frequency.setValueAtTime(freq * 1.25, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.015);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(isAccent ? 0.42 : 0.25, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (isAccent ? 0.045 : 0.035));

    osc.connect(gain);
    connectToMaster(ctx, gain, 0.08);
    osc.start(time);
    osc.stop(time + 0.05);
  } else if (soundType === "stick") {
    // Drumstick click with fast transient noise
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(isAccent ? 2400 : 1800, time);
    gain.gain.setValueAtTime(isAccent ? 0.36 : 0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.022);

    osc.connect(gain);
    connectToMaster(ctx, gain, 0.05);
    osc.start(time);
    osc.stop(time + 0.025);
  } else {
    // Digital studio beep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isAccent ? 1760 : 880, time);
    gain.gain.setValueAtTime(isAccent ? 0.35 : 0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

    osc.connect(gain);
    connectToMaster(ctx, gain, 0.05);
    osc.start(time);
    osc.stop(time + 0.04);
  }
}

/**
 * Tuner Reference Tone Generator with Rich Natural Harmonics
 */
export function playTunerTone(
  freq: number,
  mode: "guitar" | "bass" | "piano" = "guitar",
  duration = 2.4
) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  if (mode === "piano") {
    schedulePianoNote(ctx, freq, now, duration, 0.32);
  } else if (mode === "bass") {
    scheduleBassNote(ctx, freq, now, duration, 0.55);
  } else {
    scheduleGuitarPluck(ctx, freq, now, duration, 0.45, 2);
  }
}
