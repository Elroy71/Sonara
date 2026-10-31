export type InstrumentType = "guitar" | "bass" | "piano" | "cajon";

export type DifficultyLevel = "Pemula" | "Mahir";

export type RightsStatus = "Licensed" | "Public Domain" | "Original Platform" | "Verified Partner";

export interface ChordToken {
  chord: string;
  lyrics: string;
  /**
   * Exact beat count for this chord token in automated accompaniment.
   * If omitted, the engine computes musically balanced bar phrases.
   */
  beats?: number;
  /**
   * MIDI melody pitch sequence (one per beat) for realistic hymn melody accompaniment.
   * E.g. [67, 67, 65, 64] for G4-G4-F4-E4.
   */
  melody?: number[];
  /**
   * Marks passing / bridge chords in Mahir mode so musicians can distinguish
   * main structural chords from bridge/passing harmonies.
   */
  isBridge?: boolean;
}

export interface SongSection {
  id: string;
  name:
    | "Intro"
    | "Verse"
    | "Verse 1"
    | "Verse 2"
    | "Verse 3"
    | "Verse 4"
    | "Bait 1"
    | "Bait 2"
    | "Bait 3"
    | "Refrain / Chorus"
    | "Chorus / Refrain"
    | "Chorus"
    | "Refrain"
    | "Bridge"
    | "Interlude"
    | "Outro";
  lines: ChordToken[][];
}

export interface ChordChartArrangement {
  id: string;
  songId: string;
  instrument: InstrumentType;
  arrangementName: string;
  difficulty: DifficultyLevel;
  capo?: number;
  tuning: string;
  notesSummary?: string;
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
  frets: number[];
  fingers: number[];
  baseFret?: number;
  barres?: number[];
}

export interface PianoDiagram {
  notes: string[];
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

export type UserRole = "super_admin" | "contributor" | "user";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  primaryInstrument: "guitar" | "bass" | "piano" | "cajon";
  churchOrCommunity: string;
  city: string;
  bio: string;
  joinedAt: string;
  reputationPoints: number;
}

export interface ChordContributionSubmission {
  id: string;
  title: string;
  artist: string;
  category: "Hymn" | "Worship (Lambat)" | "Praise (Cepat)";
  key: string;
  bpm: number;
  timeSignature: "4/4" | "3/4" | "6/8";
  pemulaChordsSummary: string;
  mahirBridgeChordsSummary: string;
  submittedBy: string;
  submittedAt: string;
  status: "approved" | "pending" | "revision";
  reviewNote?: string;
}

