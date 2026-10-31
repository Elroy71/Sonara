import { InstrumentDiagramData } from "@/types/music";
import { CHROMATIC_SHARP, getNoteIndex, normalizeChordForLookup } from "@/lib/transpose";

/**
 * Curated open & barre chord shapes for Guitar (6 strings: E A D G B E),
 * Bass (4 strings: E A D G - Root + 5th/3rd patterns),
 * and Piano (notes in C4-B5 two-octave span).
 */
export const CURATED_CHORD_DIAGRAMS: Record<string, InstrumentDiagramData> = {
  // === MAJOR CHORDS ===
  C: {
    chordName: "C",
    intervals: "1 - 3 - 5 (C - E - G)",
    guitar: { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
    bass: { frets: [-1, 3, 2, 0], fingers: [0, 3, 2, 0], baseFret: 1 },
    piano: { notes: ["C4", "E4", "G4"], fingers: [1, 3, 5] },
  },
  "C#": {
    chordName: "C#",
    aliases: ["Db"],
    intervals: "1 - 3 - 5 (C# - F - G#)",
    guitar: { frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], baseFret: 4, barres: [4] },
    bass: { frets: [-1, 4, 3, 1], fingers: [0, 4, 3, 1], baseFret: 1 },
    piano: { notes: ["C#4", "F4", "G#4"], fingers: [1, 3, 5] },
  },
  D: {
    chordName: "D",
    intervals: "1 - 3 - 5 (D - F# - A)",
    guitar: { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
    bass: { frets: [-1, 5, 4, 2], fingers: [0, 4, 3, 1], baseFret: 2 },
    piano: { notes: ["D4", "F#4", "A4"], fingers: [1, 3, 5] },
  },
  "D#": {
    chordName: "D#",
    aliases: ["Eb"],
    intervals: "1 - 3 - 5 (Eb - G - Bb)",
    guitar: { frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 2, 3, 4, 1], baseFret: 6, barres: [6] },
    bass: { frets: [-1, 6, 5, 3], fingers: [0, 4, 3, 1], baseFret: 3 },
    piano: { notes: ["D#4", "G4", "A#4"], fingers: [1, 3, 5] },
  },
  E: {
    chordName: "E",
    intervals: "1 - 3 - 5 (E - G# - B)",
    guitar: { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 1 },
    bass: { frets: [0, 2, 2, 1], fingers: [0, 2, 3, 1], baseFret: 1 },
    piano: { notes: ["E4", "G#4", "B4"], fingers: [1, 3, 5] },
  },
  F: {
    chordName: "F",
    intervals: "1 - 3 - 5 (F - A - C)",
    guitar: { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], baseFret: 1, barres: [1] },
    bass: { frets: [1, 3, 3, -1], fingers: [1, 3, 4, 0], baseFret: 1 },
    piano: { notes: ["F4", "A4", "C5"], fingers: [1, 3, 5] },
  },
  "F#": {
    chordName: "F#",
    aliases: ["Gb"],
    intervals: "1 - 3 - 5 (F# - A# - C#)",
    guitar: { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], baseFret: 2, barres: [2] },
    bass: { frets: [2, 4, 4, -1], fingers: [1, 3, 4, 0], baseFret: 2 },
    piano: { notes: ["F#4", "A#4", "C#5"], fingers: [1, 3, 5] },
  },
  G: {
    chordName: "G",
    intervals: "1 - 3 - 5 (G - B - D)",
    guitar: { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1 },
    bass: { frets: [3, 2, 0, 0], fingers: [2, 1, 0, 0], baseFret: 1 },
    piano: { notes: ["G4", "B4", "D5"], fingers: [1, 3, 5] },
  },
  "G#": {
    chordName: "G#",
    aliases: ["Ab"],
    intervals: "1 - 3 - 5 (Ab - C - Eb)",
    guitar: { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], baseFret: 4, barres: [4] },
    bass: { frets: [4, 3, 1, -1], fingers: [4, 3, 1, 0], baseFret: 1 },
    piano: { notes: ["G#4", "C5", "D#5"], fingers: [1, 3, 5] },
  },
  A: {
    chordName: "A",
    intervals: "1 - 3 - 5 (A - C# - E)",
    guitar: { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
    bass: { frets: [-1, 0, 2, 2], fingers: [0, 0, 1, 2], baseFret: 1 },
    piano: { notes: ["A4", "C#5", "E5"], fingers: [1, 3, 5] },
  },
  "A#": {
    chordName: "A#",
    aliases: ["Bb"],
    intervals: "1 - 3 - 5 (Bb - D - F)",
    guitar: { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [1] },
    bass: { frets: [-1, 1, 3, 3], fingers: [0, 1, 3, 4], baseFret: 1 },
    piano: { notes: ["A#4", "D5", "F5"], fingers: [1, 3, 5] },
  },
  B: {
    chordName: "B",
    intervals: "1 - 3 - 5 (B - D# - F#)",
    guitar: { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], baseFret: 2, barres: [2] },
    bass: { frets: [-1, 2, 4, 4], fingers: [0, 1, 3, 4], baseFret: 2 },
    piano: { notes: ["B4", "D#5", "F#5"], fingers: [1, 3, 5] },
  },

  // === MINOR CHORDS ===
  Cm: {
    chordName: "Cm",
    intervals: "1 - b3 - 5 (C - Eb - G)",
    guitar: { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 3, barres: [3] },
    bass: { frets: [-1, 3, 1, 0], fingers: [0, 3, 1, 0], baseFret: 1 },
    piano: { notes: ["C4", "D#4", "G4"], fingers: [1, 3, 5] },
  },
  "C#m": {
    chordName: "C#m",
    intervals: "1 - b3 - 5 (C# - E - G#)",
    guitar: { frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4, barres: [4] },
    bass: { frets: [-1, 4, 2, 1], fingers: [0, 4, 2, 1], baseFret: 1 },
    piano: { notes: ["C#4", "E4", "G#4"], fingers: [1, 3, 5] },
  },
  Dm: {
    chordName: "Dm",
    intervals: "1 - b3 - 5 (D - F - A)",
    guitar: { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
    bass: { frets: [-1, 5, 3, 2], fingers: [0, 4, 2, 1], baseFret: 2 },
    piano: { notes: ["D4", "F4", "A4"], fingers: [1, 3, 5] },
  },
  "D#m": {
    chordName: "D#m",
    aliases: ["Ebm"],
    intervals: "1 - b3 - 5 (Eb - Gb - Bb)",
    guitar: { frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], baseFret: 6, barres: [6] },
    bass: { frets: [-1, 6, 4, 3], fingers: [0, 4, 2, 1], baseFret: 3 },
    piano: { notes: ["D#4", "F#4", "A#4"], fingers: [1, 3, 5] },
  },
  Em: {
    chordName: "Em",
    intervals: "1 - b3 - 5 (E - G - B)",
    guitar: { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
    bass: { frets: [0, 2, 2, 0], fingers: [0, 2, 3, 0], baseFret: 1 },
    piano: { notes: ["E4", "G4", "B4"], fingers: [1, 3, 5] },
  },
  Fm: {
    chordName: "Fm",
    intervals: "1 - b3 - 5 (F - Ab - C)",
    guitar: { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [1] },
    bass: { frets: [1, 3, 3, -1], fingers: [1, 3, 4, 0], baseFret: 1 },
    piano: { notes: ["F4", "G#4", "C5"], fingers: [1, 3, 5] },
  },
  "F#m": {
    chordName: "F#m",
    intervals: "1 - b3 - 5 (F# - A - C#)",
    guitar: { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], baseFret: 2, barres: [2] },
    bass: { frets: [2, 4, 4, 2], fingers: [1, 3, 4, 1], baseFret: 2 },
    piano: { notes: ["F#4", "A4", "C#5"], fingers: [1, 3, 5] },
  },
  Gm: {
    chordName: "Gm",
    intervals: "1 - b3 - 5 (G - Bb - D)",
    guitar: { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 3, barres: [3] },
    bass: { frets: [3, 1, 0, 0], fingers: [3, 1, 0, 0], baseFret: 1 },
    piano: { notes: ["G4", "A#4", "D5"], fingers: [1, 3, 5] },
  },
  "G#m": {
    chordName: "G#m",
    aliases: ["Abm"],
    intervals: "1 - b3 - 5 (G# - B - D#)",
    guitar: { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], baseFret: 4, barres: [4] },
    bass: { frets: [4, 2, 1, -1], fingers: [4, 2, 1, 0], baseFret: 1 },
    piano: { notes: ["G#4", "B4", "D#5"], fingers: [1, 3, 5] },
  },
  Am: {
    chordName: "Am",
    intervals: "1 - b3 - 5 (A - C - E)",
    guitar: { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
    bass: { frets: [-1, 0, 2, 2], fingers: [0, 0, 2, 3], baseFret: 1 },
    piano: { notes: ["A4", "C5", "E5"], fingers: [1, 3, 5] },
  },
  "A#m": {
    chordName: "A#m",
    aliases: ["Bbm"],
    intervals: "1 - b3 - 5 (Bb - Db - F)",
    guitar: { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [1] },
    bass: { frets: [-1, 1, 3, 3], fingers: [0, 1, 3, 4], baseFret: 1 },
    piano: { notes: ["A#4", "C#5", "F5"], fingers: [1, 3, 5] },
  },
  Bm: {
    chordName: "Bm",
    intervals: "1 - b3 - 5 (B - D - F#)",
    guitar: { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 2, barres: [2] },
    bass: { frets: [-1, 2, 0, 4], fingers: [0, 1, 0, 4], baseFret: 1 },
    piano: { notes: ["B4", "D5", "F#5"], fingers: [1, 3, 5] },
  },

  // === SEVENTH & EXTENDED CHORDS ===
  C7: {
    chordName: "C7",
    intervals: "1 - 3 - 5 - b7 (C - E - G - Bb)",
    guitar: { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
    bass: { frets: [-1, 3, 2, 3], fingers: [0, 2, 1, 3], baseFret: 1 },
    piano: { notes: ["C4", "E4", "G4", "A#4"], fingers: [1, 2, 3, 5] },
  },
  Cmaj7: {
    chordName: "Cmaj7",
    intervals: "1 - 3 - 5 - 7 (C - E - G - B)",
    guitar: { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], baseFret: 1 },
    bass: { frets: [-1, 3, 2, 4], fingers: [0, 2, 1, 4], baseFret: 1 },
    piano: { notes: ["C4", "E4", "G4", "B4"], fingers: [1, 2, 3, 5] },
  },
  D7: {
    chordName: "D7",
    intervals: "1 - 3 - 5 - b7 (D - F# - A - C)",
    guitar: { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1 },
    bass: { frets: [-1, 5, 4, 5], fingers: [0, 2, 1, 3], baseFret: 4 },
    piano: { notes: ["D4", "F#4", "A4", "C5"], fingers: [1, 2, 3, 5] },
  },
  Dm7: {
    chordName: "Dm7",
    intervals: "1 - b3 - 5 - b7 (D - F - A - C)",
    guitar: { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], baseFret: 1 },
    bass: { frets: [-1, 5, 3, 5], fingers: [0, 3, 1, 4], baseFret: 3 },
    piano: { notes: ["D4", "F4", "A4", "C5"], fingers: [1, 2, 3, 5] },
  },
  E7: {
    chordName: "E7",
    intervals: "1 - 3 - 5 - b7 (E - G# - B - D)",
    guitar: { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1 },
    bass: { frets: [0, 2, 0, 1], fingers: [0, 2, 0, 1], baseFret: 1 },
    piano: { notes: ["E4", "G#4", "B4", "D5"], fingers: [1, 2, 3, 5] },
  },
  Em7: {
    chordName: "Em7",
    intervals: "1 - b3 - 5 - b7 (E - G - B - D)",
    guitar: { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], baseFret: 1 },
    bass: { frets: [0, 2, 0, 0], fingers: [0, 2, 0, 0], baseFret: 1 },
    piano: { notes: ["E4", "G4", "B4", "D5"], fingers: [1, 2, 3, 5] },
  },
  Fmaj7: {
    chordName: "Fmaj7",
    intervals: "1 - 3 - 5 - 7 (F - A - C - E)",
    guitar: { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 1 },
    bass: { frets: [1, 3, 2, -1], fingers: [1, 3, 2, 0], baseFret: 1 },
    piano: { notes: ["F4", "A4", "C5", "E5"], fingers: [1, 2, 3, 5] },
  },
  G7: {
    chordName: "G7",
    intervals: "1 - 3 - 5 - b7 (G - B - D - F)",
    guitar: { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
    bass: { frets: [3, 2, 3, 0], fingers: [2, 1, 3, 0], baseFret: 1 },
    piano: { notes: ["G4", "B4", "D5", "F5"], fingers: [1, 2, 3, 5] },
  },
  A7: {
    chordName: "A7",
    intervals: "1 - 3 - 5 - b7 (A - C# - E - G)",
    guitar: { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0], baseFret: 1 },
    bass: { frets: [-1, 0, 2, 0], fingers: [0, 0, 2, 0], baseFret: 1 },
    piano: { notes: ["A4", "C#5", "E5", "G5"], fingers: [1, 2, 3, 5] },
  },
  Am7: {
    chordName: "Am7",
    intervals: "1 - b3 - 5 - b7 (A - C - E - G)",
    guitar: { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], baseFret: 1 },
    bass: { frets: [-1, 0, 2, 0], fingers: [0, 0, 2, 0], baseFret: 1 },
    piano: { notes: ["A4", "C5", "E5", "G5"], fingers: [1, 2, 3, 5] },
  },
  B7: {
    chordName: "B7",
    intervals: "1 - 3 - 5 - b7 (B - D# - F# - A)",
    guitar: { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1 },
    bass: { frets: [-1, 2, 1, 2], fingers: [0, 2, 1, 3], baseFret: 1 },
    piano: { notes: ["B4", "D#5", "F#5", "A5"], fingers: [1, 2, 3, 5] },
  },
  Bm7: {
    chordName: "Bm7",
    intervals: "1 - b3 - 5 - b7 (B - D - F# - A)",
    guitar: { frets: [-1, 2, 4, 2, 3, 2], fingers: [0, 1, 3, 1, 2, 1], baseFret: 2, barres: [2] },
    bass: { frets: [-1, 2, 0, 2], fingers: [0, 1, 0, 2], baseFret: 1 },
    piano: { notes: ["B4", "D5", "F#5", "A5"], fingers: [1, 2, 3, 5] },
  },
  "G/B": {
    chordName: "G/B",
    intervals: "3 - 5 - 1 (Bass B -> D - G)",
    guitar: { frets: [-1, 2, 0, 0, 3, 3], fingers: [0, 1, 0, 0, 3, 4], baseFret: 1 },
    bass: { frets: [-1, 2, 0, 0], fingers: [0, 2, 0, 0], baseFret: 1 },
    piano: { notes: ["B4", "D5", "G5"], fingers: [1, 2, 5] },
  },
  "C/E": {
    chordName: "C/E",
    intervals: "3 - 5 - 1 (Bass E -> G - C)",
    guitar: { frets: [0, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
    bass: { frets: [0, 3, 2, 0], fingers: [0, 3, 2, 0], baseFret: 1 },
    piano: { notes: ["E4", "G4", "C5"], fingers: [1, 2, 5] },
  },
  "C/G": {
    chordName: "C/G",
    intervals: "5 - 1 - 3 (Bass G -> C - E)",
    guitar: { frets: [3, 3, 2, 0, 1, 0], fingers: [3, 4, 2, 0, 1, 0], baseFret: 1 },
    bass: { frets: [3, 3, 2, 0], fingers: [3, 4, 2, 0], baseFret: 1 },
    piano: { notes: ["G4", "C5", "E5"], fingers: [1, 3, 5] },
  },
  "Am/G": {
    chordName: "Am/G",
    intervals: "b7 - 1 - b3 - 5 (Bass G -> A - C - E)",
    guitar: { frets: [3, 0, 2, 2, 1, 0], fingers: [3, 0, 2, 4, 1, 0], baseFret: 1 },
    bass: { frets: [3, 0, 2, 2], fingers: [3, 0, 1, 2], baseFret: 1 },
    piano: { notes: ["G4", "A4", "C5", "E5"], fingers: [1, 2, 3, 5] },
  },
  "F/A": {
    chordName: "F/A",
    intervals: "3 - 5 - 1 (Bass A -> C - F)",
    guitar: { frets: [-1, 0, 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1], baseFret: 1 },
    bass: { frets: [-1, 0, 3, 2], fingers: [0, 0, 3, 2], baseFret: 1 },
    piano: { notes: ["A4", "C5", "F5"], fingers: [1, 2, 5] },
  },
  "E7/G#": {
    chordName: "E7/G#",
    intervals: "3 - b7 - 1 - 5 (Bass G# -> D - E - B)",
    guitar: { frets: [4, 2, 0, 1, 0, 0], fingers: [4, 2, 0, 1, 0, 0], baseFret: 1 },
    bass: { frets: [4, 2, 2, 1], fingers: [4, 2, 3, 1], baseFret: 1 },
    piano: { notes: ["G#4", "B4", "D5", "E5"], fingers: [1, 2, 4, 5] },
  },
  Gsus4: {
    chordName: "Gsus4",
    intervals: "1 - 4 - 5 (G - C - D)",
    guitar: { frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4], baseFret: 1 },
    bass: { frets: [3, 3, 0, 0], fingers: [2, 3, 0, 0], baseFret: 1 },
    piano: { notes: ["G4", "C5", "D5"], fingers: [1, 4, 5] },
  },
  Asus4: {
    chordName: "Asus4",
    intervals: "1 - 4 - 5 (A - D - E)",
    guitar: { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
    bass: { frets: [-1, 0, 2, 2], fingers: [0, 0, 1, 2], baseFret: 1 },
    piano: { notes: ["A4", "D5", "E5"], fingers: [1, 4, 5] },
  },
  Esus4: {
    chordName: "Esus4",
    intervals: "1 - 4 - 5 (E - A - B)",
    guitar: { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0], baseFret: 1 },
    bass: { frets: [0, 2, 2, 2], fingers: [0, 2, 3, 4], baseFret: 1 },
    piano: { notes: ["E4", "A4", "B4"], fingers: [1, 4, 5] },
  },
  "A/C#": {
    chordName: "A/C#",
    intervals: "3 - 5 - 1 (Bass C# -> E - A)",
    guitar: { frets: [-1, 4, 2, 2, 2, 0], fingers: [0, 4, 1, 2, 3, 0], baseFret: 1 },
    bass: { frets: [-1, 4, 2, 2], fingers: [0, 4, 1, 2], baseFret: 1 },
    piano: { notes: ["C#4", "E4", "A4"], fingers: [1, 2, 5] },
  },
  "E/G#": {
    chordName: "E/G#",
    intervals: "3 - 5 - 1 (Bass G# -> B - E)",
    guitar: { frets: [4, 2, 2, 1, 0, 0], fingers: [4, 2, 3, 1, 0, 0], baseFret: 1 },
    bass: { frets: [4, 2, 2, 1], fingers: [4, 2, 3, 1], baseFret: 1 },
    piano: { notes: ["G#4", "B4", "E5"], fingers: [1, 2, 5] },
  },
  "G/D": {
    chordName: "G/D",
    intervals: "5 - 1 - 3 (Bass D -> G - B)",
    guitar: { frets: [-1, -1, 0, 0, 0, 3], fingers: [0, 0, 0, 0, 0, 3], baseFret: 1 },
    bass: { frets: [-1, 5, 5, 4], fingers: [0, 2, 3, 1], baseFret: 4 },
    piano: { notes: ["D4", "G4", "B4"], fingers: [1, 3, 5] },
  },
  "D/A": {
    chordName: "D/A",
    intervals: "5 - 1 - 3 (Bass A -> D - F#)",
    guitar: { frets: [-1, 0, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
    bass: { frets: [-1, 0, 0, 2], fingers: [0, 0, 0, 2], baseFret: 1 },
    piano: { notes: ["A4", "D5", "F#5"], fingers: [1, 3, 5] },
  },
  "F/C": {
    chordName: "F/C",
    intervals: "5 - 1 - 3 (Bass C -> F - A)",
    guitar: { frets: [-1, 3, 3, 2, 1, 1], fingers: [0, 3, 4, 2, 1, 1], baseFret: 1 },
    bass: { frets: [-1, 3, 3, 2], fingers: [0, 3, 4, 2], baseFret: 1 },
    piano: { notes: ["C4", "F4", "A4"], fingers: [1, 3, 5] },
  },
  "Bb/D": {
    chordName: "Bb/D",
    intervals: "3 - 5 - 1 (Bass D -> F - Bb)",
    guitar: { frets: [-1, 5, 3, 3, 3, -1], fingers: [0, 3, 1, 1, 1, 0], baseFret: 3 },
    bass: { frets: [-1, 5, 3, 3], fingers: [0, 3, 1, 1], baseFret: 3 },
    piano: { notes: ["D4", "F4", "A#4"], fingers: [1, 2, 5] },
  },
  "D/F#": {
    chordName: "D/F#",
    intervals: "3 - 5 - 1 (Bass F# -> A - D)",
    guitar: { frets: [2, 0, 0, 2, 3, 2], fingers: [1, 0, 0, 2, 4, 3], baseFret: 1 },
    bass: { frets: [2, 0, 0, 2], fingers: [1, 0, 0, 2], baseFret: 1 },
    piano: { notes: ["F#4", "A4", "D5"], fingers: [1, 2, 5] },
  },
  Cadd9: {
    chordName: "Cadd9",
    intervals: "1 - 3 - 5 - 9 (C - E - G - D)",
    guitar: { frets: [-1, 3, 2, 0, 3, 3], fingers: [0, 2, 1, 0, 3, 4], baseFret: 1 },
    bass: { frets: [-1, 3, 2, 0], fingers: [0, 3, 2, 0], baseFret: 1 },
    piano: { notes: ["C4", "D4", "E4", "G4"], fingers: [1, 2, 3, 5] },
  },
  Dsus4: {
    chordName: "Dsus4",
    intervals: "1 - 4 - 5 (D - G - A)",
    guitar: { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
    bass: { frets: [-1, 5, 5, 2], fingers: [0, 3, 4, 1], baseFret: 2 },
    piano: { notes: ["D4", "G4", "A4"], fingers: [1, 4, 5] },
  },
  // Voicing "anchor" worship modern (Jari 3 & 4 mengunci Fret 3 senar 1 & 2) untuk kursus Gitar Pertemuan 6
  "G (anchor)": {
    chordName: "G (anchor)",
    intervals: "1 - 3 - 5 (G - B - D) · Jari 3 & 4 di Fret 3",
    guitar: { frets: [3, 2, 0, 0, 3, 3], fingers: [2, 1, 0, 0, 3, 4], baseFret: 1 },
    bass: { frets: [3, 2, 0, 0], fingers: [2, 1, 0, 0], baseFret: 1 },
    piano: { notes: ["G4", "B4", "D5"], fingers: [1, 3, 5] },
  },
  "Em7 (anchor)": {
    chordName: "Em7 (anchor)",
    intervals: "1 - b3 - 5 - b7 (E - G - B - D) · Jari 3 & 4 di Fret 3",
    guitar: { frets: [0, 2, 2, 0, 3, 3], fingers: [0, 1, 2, 0, 3, 4], baseFret: 1 },
    bass: { frets: [0, 2, 0, 0], fingers: [0, 2, 0, 0], baseFret: 1 },
    piano: { notes: ["E4", "G4", "B4", "D5"], fingers: [1, 2, 3, 5] },
  },
};


// ============================================================================
// GENERATOR CHORD UNIVERSAL (untuk chord hasil transpose yang tidak ada di kamus)
// Gitar: bentuk barre E-shape / A-shape, Bass: root-5th-oktaf, Piano: teori interval.
// ============================================================================
const QUALITY_INTERVALS: Record<string, number[]> = {
  "": [0, 4, 7],
  m: [0, 3, 7],
  "7": [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  sus4: [0, 5, 7],
  sus2: [0, 2, 7],
  add9: [0, 4, 7, 14],
  "7sus4": [0, 5, 7, 10],
  dim: [0, 3, 6],
};

const QUALITY_LABEL: Record<string, string> = {
  "": "1 - 3 - 5",
  m: "1 - b3 - 5",
  "7": "1 - 3 - 5 - b7",
  m7: "1 - b3 - 5 - b7",
  maj7: "1 - 3 - 5 - 7",
  sus4: "1 - 4 - 5",
  sus2: "1 - 2 - 5",
  add9: "1 - 3 - 5 - 9",
  "7sus4": "1 - 4 - 5 - b7",
  dim: "1 - b3 - b5",
};

// Offset fret relatif terhadap fret barre (-1 = senar tidak dimainkan). Urutan senar 6 -> 1.
const E_SHAPES: Record<string, number[]> = {
  "": [0, 2, 2, 1, 0, 0],
  m: [0, 2, 2, 0, 0, 0],
  "7": [0, 2, 0, 1, 0, 0],
  m7: [0, 2, 0, 0, 0, 0],
  maj7: [0, 2, 1, 1, 0, 0],
  sus4: [0, 2, 2, 2, 0, 0],
  "7sus4": [0, 2, 0, 2, 0, 0],
};
const A_SHAPES: Record<string, number[]> = {
  "": [-1, 0, 2, 2, 2, 0],
  m: [-1, 0, 2, 2, 1, 0],
  "7": [-1, 0, 2, 0, 2, 0],
  m7: [-1, 0, 2, 0, 1, 0],
  maj7: [-1, 0, 2, 1, 2, 0],
  sus4: [-1, 0, 2, 2, 3, 0],
  sus2: [-1, 0, 2, 2, 0, 0],
  add9: [-1, 0, 2, 4, 2, 0],
  "7sus4": [-1, 0, 2, 0, 3, 0],
  dim: [-1, 0, 1, 2, 1, -1],
};

export interface ParsedChord {
  rootIdx: number;
  bassIdx: number | null;
  quality: string;
  intervals: number[];
}

/** Menguraikan simbol chord (mis. "F#m7", "D/F#", "Cadd9") menjadi akar, kualitas, dan nada bass. */
export function parseChordSymbol(chordSymbol: string): ParsedChord {
  const [main, bassPart] = chordSymbol.split("/");
  const match = main.match(/^([A-G][#b]?)(.*)$/);
  const rootIdx = Math.max(0, getNoteIndex(match ? match[1] : "C"));
  let quality = match ? match[2] : "";
  if (quality === "M7") quality = "maj7";
  if (!(quality in QUALITY_INTERVALS)) {
    if (quality.includes("maj7")) quality = "maj7";
    else if (quality.startsWith("m") && quality.includes("7")) quality = "m7";
    else if (quality.startsWith("m")) quality = "m";
    else if (quality.includes("sus4")) quality = quality.includes("7") ? "7sus4" : "sus4";
    else if (quality.includes("sus2")) quality = "sus2";
    else if (quality.includes("7")) quality = "7";
    else quality = "";
  }
  const bassIdx = bassPart ? getNoteIndex(bassPart) : -1;
  return {
    rootIdx,
    bassIdx: bassIdx >= 0 ? bassIdx : null,
    quality,
    intervals: QUALITY_INTERVALS[quality],
  };
}

function noteNameFromC4(semitone: number): string {
  const octave = 4 + Math.floor(semitone / 12);
  return `${CHROMATIC_SHARP[((semitone % 12) + 12) % 12]}${octave}`;
}

function guessFingers(frets: number[], barreFret: number): number[] {
  const seen: Record<number, number> = {};
  return frets.map((fr) => {
    if (fr < 0) return 0;
    if (fr === 0) return 0;
    const offset = fr - barreFret;
    if (barreFret > 0 && offset === 0) return 1;
    const base = offset <= 0 ? 1 : Math.min(4, offset + 1);
    seen[offset] = (seen[offset] || 0) + 1;
    return Math.min(4, base + (offset >= 2 ? seen[offset] - 1 : 0) + (offset === 1 ? 0 : 0));
  });
}

function makeGuitarShape(rootIdx: number, quality: string) {
  const fe = (rootIdx - 4 + 12) % 12; // fret akar di senar 6
  const fa = (rootIdx - 9 + 12) % 12; // fret akar di senar 5
  const eShape = E_SHAPES[quality];
  const aShape = A_SHAPES[quality];
  let useE = Boolean(eShape);
  if (eShape && aShape) useE = fe <= fa;
  else if (!eShape) useE = false;
  const shape = useE ? eShape : aShape || E_SHAPES[""];
  const f = useE ? fe : fa;
  const frets = shape.map((o) => (o < 0 ? -1 : o + f));
  const positive = frets.filter((x) => x > 0);
  const baseFret = f > 0 ? f : positive.length ? Math.min(...positive) : 1;
  return {
    frets,
    fingers: guessFingers(frets, f),
    baseFret,
    ...(f > 0 && shape.filter((o) => o === 0).length >= 2 ? { barres: [f] } : {}),
  };
}

function makeBassShape(noteIdx: number, withFifth = true) {
  const fe = (noteIdx - 4 + 12) % 12;
  if (fe <= 7) {
    return {
      frets: [fe, withFifth ? fe + 2 : -1, fe + 2, -1],
      fingers: [fe === 0 ? 0 : 1, withFifth ? 3 : 0, 4, 0],
      baseFret: fe > 0 ? fe : 1,
    };
  }
  const fa = (noteIdx - 9 + 12) % 12;
  return {
    frets: [-1, fa, withFifth ? fa + 2 : -1, fa + 2],
    fingers: [0, fa === 0 ? 0 : 1, withFifth ? 3 : 0, 4],
    baseFret: fa > 0 ? fa : 1,
  };
}

function makePianoNotes(parsed: ParsedChord): string[] {
  const tones = parsed.intervals.map((i) => parsed.rootIdx + i);
  if (parsed.bassIdx === null) return tones.map(noteNameFromC4);
  const out = [parsed.bassIdx];
  let prev = parsed.bassIdx;
  for (const tone of tones) {
    if (((tone % 12) + 12) % 12 === parsed.bassIdx) continue;
    let t = tone;
    while (t <= prev) t += 12;
    out.push(t);
    prev = t;
  }
  return out.map(noteNameFromC4);
}

/** Pasang nada bass slash pada senar rendah gitar (E/A/D) dan matikan senar di bawahnya. */
function applySlashToGuitar(
  guitar: { frets: number[]; fingers: number[]; baseFret?: number; barres?: number[] },
  bassIdx: number
) {
  const open = [4, 9, 2];
  const base = guitar.baseFret || 1;
  let best = { s: 0, fr: ((bassIdx - open[0]) % 12 + 12) % 12 };
  for (let s = 1; s < 3; s++) {
    const fr = ((bassIdx - open[s]) % 12 + 12) % 12;
    if (Math.abs(fr - base) < Math.abs(best.fr - base)) best = { s, fr };
  }
  const frets = [...guitar.frets];
  const fingers = [...guitar.fingers];
  for (let j = 0; j < best.s; j++) {
    frets[j] = -1;
    fingers[j] = 0;
  }
  frets[best.s] = best.fr;
  fingers[best.s] = best.fr === 0 ? 0 : 4;
  const positive = frets.filter((x) => x > 0);
  return {
    ...guitar,
    frets,
    fingers,
    baseFret: positive.length ? Math.min(...positive) : 1,
  };
}

/**
 * Pencarian bentuk chord: kamus kurasi -> normalisasi akar -> generator teori
 * (slash chord otomatis memakai nada bass yang benar di gitar, bass, dan piano).
 */
export function getChordDiagram(chordSymbol: string): InstrumentDiagramData {
  if (!chordSymbol) {
    return CURATED_CHORD_DIAGRAMS["C"];
  }

  if (CURATED_CHORD_DIAGRAMS[chordSymbol]) {
    return { ...CURATED_CHORD_DIAGRAMS[chordSymbol], chordName: chordSymbol };
  }

  const normalized = normalizeChordForLookup(chordSymbol);
  if (CURATED_CHORD_DIAGRAMS[normalized]) {
    return { ...CURATED_CHORD_DIAGRAMS[normalized], chordName: chordSymbol };
  }

  const parsed = parseChordSymbol(chordSymbol);

  if (chordSymbol.includes("/") && parsed.bassIdx !== null) {
    const mainDiagram = getChordDiagram(chordSymbol.split("/")[0]);
    const pianoNotes = makePianoNotes(parsed);
    return {
      chordName: chordSymbol,
      intervals: `Bass ${CHROMATIC_SHARP[parsed.bassIdx]} di bawah akord ${chordSymbol.split("/")[0]}`,
      guitar: applySlashToGuitar(mainDiagram.guitar, parsed.bassIdx),
      bass: makeBassShape(parsed.bassIdx, false),
      piano: {
        notes: pianoNotes,
        fingers: pianoNotes.length >= 4 ? [1, 2, 3, 5] : [1, 2, 5],
      },
    };
  }

  const pianoNotes = makePianoNotes(parsed);
  return {
    chordName: chordSymbol,
    intervals: QUALITY_LABEL[parsed.quality] || "1 - 3 - 5",
    guitar: makeGuitarShape(parsed.rootIdx, parsed.quality),
    bass: makeBassShape(parsed.rootIdx),
    piano: {
      notes: pianoNotes,
      fingers: pianoNotes.length >= 4 ? [1, 2, 3, 5] : [1, 3, 5],
    },
  };
}
