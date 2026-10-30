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
    intervals: "3 - 5 - 1 (B - D - G)",
    guitar: { frets: [-1, 2, 0, 0, 3, 3], fingers: [0, 1, 0, 0, 3, 4], baseFret: 1 },
    bass: { frets: [-1, 2, 0, 0], fingers: [0, 2, 0, 0], baseFret: 1 },
    piano: { notes: ["B4", "D5", "G5"], fingers: [1, 2, 5] },
  },
  "D/F#": {
    chordName: "D/F#",
    intervals: "3 - 5 - 1 (F# - A - D)",
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
};

/**
 * Deterministic lookup + algorithmic generator if a chord was transposed into a variant
 * not explicitly listed in CURATED_CHORD_DIAGRAMS (e.g., F#m7, Bbmaj7, Eb7, etc.).
 */
export function getChordDiagram(chordSymbol: string): InstrumentDiagramData {
  if (!chordSymbol) {
    return CURATED_CHORD_DIAGRAMS["C"];
  }

  // 1. Direct match
  if (CURATED_CHORD_DIAGRAMS[chordSymbol]) {
    return { ...CURATED_CHORD_DIAGRAMS[chordSymbol], chordName: chordSymbol };
  }

  // 2. Normalized root match (e.g. Bb -> A#, Eb -> D#)
  const normalized = normalizeChordForLookup(chordSymbol);
  if (CURATED_CHORD_DIAGRAMS[normalized]) {
    return { ...CURATED_CHORD_DIAGRAMS[normalized], chordName: chordSymbol };
  }

  // 3. Strip slash bass if slash chord isn't explicitly curated
  if (chordSymbol.includes("/")) {
    const [mainChord] = chordSymbol.split("/");
    const mainNorm = normalizeChordForLookup(mainChord);
    if (CURATED_CHORD_DIAGRAMS[mainNorm]) {
      return {
        ...CURATED_CHORD_DIAGRAMS[mainNorm],
        chordName: chordSymbol,
      };
    }
  }

  // 4. Algorithmic generator based on root & quality (m, 7, m7, maj7, sus4)
  const match = chordSymbol.match(/^([A-G][#b]?)(.*)$/);
  const rootStr = match ? match[1] : "C";
  const suffix = match ? match[2] : "";
  const rootIdx = Math.max(0, getNoteIndex(rootStr));

  const isMinor = suffix.startsWith("m") && !suffix.startsWith("maj");
  const isSeventh = suffix.includes("7");
  const isMaj7 = suffix.includes("maj7") || suffix.includes("M7");

  // Compute Piano notes in C4..B5
  const thirdOffset = isMinor ? 3 : 4;
  const fifthOffset = 7;
  const seventhOffset = isMaj7 ? 11 : 10;

  const noteNameAt = (semitoneFromC4: number) => {
    const octave = 4 + Math.floor(semitoneFromC4 / 12);
    const note = CHROMATIC_SHARP[((semitoneFromC4 % 12) + 12) % 12];
    return `${note}${octave}`;
  };

  const pianoNotes = [
    noteNameAt(rootIdx),
    noteNameAt(rootIdx + thirdOffset),
    noteNameAt(rootIdx + fifthOffset),
  ];
  if (isSeventh) {
    pianoNotes.push(noteNameAt(rootIdx + seventhOffset));
  }

  // Use base Major or Minor shape from curated dictionary for Guitar & Bass
  const baseKey = `${CHROMATIC_SHARP[rootIdx]}${isMinor ? "m" : ""}`;
  const baseDiagram = CURATED_CHORD_DIAGRAMS[baseKey] || CURATED_CHORD_DIAGRAMS["C"];

  return {
    chordName: chordSymbol,
    intervals: isMinor ? "1 - b3 - 5" : "1 - 3 - 5",
    guitar: baseDiagram.guitar,
    bass: baseDiagram.bass,
    piano: {
      notes: pianoNotes,
      fingers: isSeventh ? [1, 2, 3, 5] : [1, 3, 5],
    },
  };
}
