import { ChordChartArrangement } from "@/types/music";

export const CHROMATIC_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
export const CHROMATIC_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] as const;

const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"]);

const NOTE_TO_INDEX: Record<string, number> = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  "E#": 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

export function getNoteIndex(note: string): number {
  return NOTE_TO_INDEX[note] ?? -1;
}

export function transposeNote(note: string, semitones: number, preferFlats = false): string {
  const idx = getNoteIndex(note);
  if (idx === -1) return note;
  const shifted = ((idx + semitones) % 12 + 12) % 12;
  return preferFlats ? CHROMATIC_FLAT[shifted] : CHROMATIC_SHARP[shifted];
}

/**
 * Transposes a chord symbol (e.g. "Am7", "F#m", "G/B", "BbMaj7", "Dsus4") by N semitones.
 */
export function transposeChord(chord: string, semitones: number, targetKeyHint?: string): string {
  if (!chord || chord.trim() === "" || chord === "-" || chord === "N.C.") {
    return chord;
  }

  const preferFlats = targetKeyHint ? FLAT_KEYS.has(targetKeyHint) : false;

  // Handle slash chords like G/B or D/F#
  if (chord.includes("/")) {
    const [mainPart, bassPart] = chord.split("/");
    return `${transposeSingleChord(mainPart, semitones, preferFlats)}/${transposeSingleChord(
      bassPart,
      semitones,
      preferFlats
    )}`;
  }

  return transposeSingleChord(chord, semitones, preferFlats);
}

function transposeSingleChord(chord: string, semitones: number, preferFlats: boolean): string {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;
  const [, root, suffix] = match;
  const newRoot = transposeNote(root, semitones, preferFlats);
  return `${newRoot}${suffix}`;
}

/**
 * Normalize chord name to lookup key in our chord diagram dictionary.
 */
export function normalizeChordForLookup(chord: string): string {
  if (!chord) return "";
  // Strip slash bass for fallback if exact slash chord isn't in dictionary
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;
  const [, root, rest] = match;
  const idx = getNoteIndex(root);
  if (idx === -1) return chord;
  const canonicalRoot = CHROMATIC_SHARP[idx];
  return `${canonicalRoot}${rest}`;
}

/**
 * Extracts all unique chords in appearance order from an arrangement, after applying transposition.
 */
export function extractUniqueChords(arrangement: ChordChartArrangement, semitones: number, targetKey?: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const section of arrangement.sections) {
    for (const line of section.lines) {
      for (const token of line) {
        if (token.chord && token.chord.trim() !== "") {
          const transposed = transposeChord(token.chord.trim(), semitones, targetKey);
          if (!seen.has(transposed)) {
            seen.add(transposed);
            result.push(transposed);
          }
        }
      }
    }
  }

  return result;
}
