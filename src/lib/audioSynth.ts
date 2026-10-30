import { InstrumentType } from "@/types/music";
import { getChordDiagram } from "@/data/chordDiagrams";
import { getNoteIndex } from "@/lib/transpose";

let sharedAudioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
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

/**
 * Plays a synthesized preview of a chord for Guitar, Bass, or Piano.
 */
export function playChordPreview(chordSymbol: string, instrument: InstrumentType = "guitar") {
  const ctx = getAudioContext();
  if (!ctx) return;

  const diagram = getChordDiagram(chordSymbol);
  const notes = diagram.piano.notes;
  const now = ctx.currentTime;

  notes.forEach((noteStr, idx) => {
    let freq = noteToFrequency(noteStr);
    if (instrument === "bass") {
      // Lower octave for bass
      freq = freq / 2;
      // On bass, emphasize root and fifth
      if (idx > 2) return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (instrument === "guitar") {
      osc.type = "triangle";
    } else if (instrument === "bass") {
      osc.type = "sawtooth";
    } else {
      osc.type = "sine";
    }

    const startTime = now + (instrument === "guitar" ? idx * 0.045 : instrument === "bass" ? idx * 0.08 : 0.01);
    const duration = instrument === "bass" ? 1.1 : 1.4;

    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(instrument === "bass" ? 0.18 : 0.16, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Gentle lowpass filter for warmer tone
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(instrument === "bass" ? 650 : 2200, startTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  });
}
