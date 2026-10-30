export type InstrumentType = "guitar" | "bass" | "piano";

export type DifficultyLevel = "Pemula" | "Menengah" | "Mahir";

export type RightsStatus = "Licensed" | "Public Domain" | "Original Platform" | "Verified Partner";

export interface ChordToken {
  chord: string;
  lyrics: string;
}

export interface SongSection {
  id: string;
  name: "Intro" | "Verse 1" | "Verse 2" | "Pre-Chorus" | "Chorus" | "Bridge" | "Interlude" | "Outro";
  lines: ChordToken[][];
}

export interface ChordChartArrangement {
  id: string;
  songId: string;
  instrument: InstrumentType;
  arrangementName: string; // e.g., "Strumming Dasar (Pemula)", "Fingerstyle / Voicing Asli", "Bassline Root & Fifth"
  difficulty: DifficultyLevel;
  capo?: number;
  tuning: string;
  sections: SongSection[];
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  artist: string;
  genre: string;
  key: string;
  bpm: number;
  timeSignature: "4/4" | "3/4" | "6/8";
  durationSec: number;
  difficulty: DifficultyLevel;
  instruments: InstrumentType[];
  source: string;
  rightsStatus: RightsStatus;
  coverGradient: string;
  description: string;
  strummingPattern: string;
  arrangements: ChordChartArrangement[];
}

export interface GuitarBassDiagram {
  /**
   * Array of fret numbers from lowest-pitched string to highest-pitched string.
   * Gitar: 6 senar [E2, A2, D3, G3, B3, E4]
   * Bass: 4 senar [E1, A1, D2, G2]
   * -1 = muted (X), 0 = open string (O), >=1 = fret number
   */
  frets: number[];
  /**
   * Finger numbers (0 = open/muted, 1 = telunjuk, 2 = tengah, 3 = manis, 4 = kelingking)
   */
  fingers: number[];
  baseFret?: number;
  barres?: number[];
}

export interface PianoDiagram {
  /**
   * Notes in octave-agnostic or specific representation e.g. ["C4", "E4", "G4"]
   */
  notes: string[];
  /**
   * Finger hints e.g. [1, 3, 5]
   */
  fingers?: number[];
}

export interface InstrumentDiagramData {
  chordName: string;
  aliases?: string[];
  intervals: string;
  guitar: GuitarBassDiagram;
  bass: GuitarBassDiagram;
  piano: PianoDiagram;
}

export interface PracticeSession {
  id: string;
  songId: string;
  songTitle: string;
  instrument: InstrumentType;
  durationMinutes: number;
  bpmUsed: number;
  completedAt: string;
}
