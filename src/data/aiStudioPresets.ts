export interface SongSectionMarker {
  id: string;
  name: string;
  label: "Intro" | "Bait" | "Reff" | "Bridge" | "Ending";
  startSec: number;
  endSec: number;
  color: string; // Tailwind color class / hex
}

export interface ChordTiming {
  chord: string;
  timeSec: number;
  durationSec: number;
  bassNote?: string;
}

export interface StudioTrackPreset {
  id: string;
  title: string;
  artist: string;
  genre: "Worship" | "Praise" | "Hymn";
  key: string;
  originalKey: string;
  bpm: number;
  timeSignature: "4/4" | "3/4" | "6/8";
  durationSec: number;
  description: string;
  sections: SongSectionMarker[];
  chords: ChordTiming[];
  /** Relative energy/presence profile per stem (0.0 to 1.0) */
  stemProfiles: {
    vocals: number[];
    drums: number[];
    bass: number[];
    instruments: number[];
  };
}

export const STUDIO_DEMO_PRESETS: StudioTrackPreset[] = [
  {
    id: "sentuh-hatiku",
    title: "Sentuh Hatiku",
    artist: "Symphony Worship / Jason Irwanto",
    genre: "Worship",
    key: "G",
    originalKey: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 84,
    description: "Lagu penyembahan lambat paling populer. Sangat ideal untuk melatih isolasi vokal dan petikan piano/gitar.",
    sections: [
      { id: "sec-1", name: "Intro Piano & Strings", label: "Intro", startSec: 0, endSec: 14, color: "bg-zinc-600" },
      { id: "sec-2", name: "Bait 1: Betapa Ku Mencintai", label: "Bait", startSec: 14, endSec: 35, color: "bg-sky-600" },
      { id: "sec-3", name: "Reff: Sentuh Hatiku", label: "Reff", startSec: 35, endSec: 56, color: "bg-amber-600" },
      { id: "sec-4", name: "Bridge: Ku Mau Sembah", label: "Bridge", startSec: 56, endSec: 72, color: "bg-purple-600" },
      { id: "sec-5", name: "Outro / Ending", label: "Ending", startSec: 72, endSec: 84, color: "bg-emerald-600" },
    ],
    chords: [
      { chord: "G", timeSec: 0, durationSec: 3.5 },
      { chord: "D/F#", timeSec: 3.5, durationSec: 3.5, bassNote: "F#" },
      { chord: "Em7", timeSec: 7, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 10.5, durationSec: 3.5 },
      { chord: "G", timeSec: 14, durationSec: 3.5 },
      { chord: "D/F#", timeSec: 17.5, durationSec: 3.5, bassNote: "F#" },
      { chord: "Em7", timeSec: 21, durationSec: 3.5 },
      { chord: "Bm7", timeSec: 24.5, durationSec: 3.5 },
      { chord: "C", timeSec: 28, durationSec: 3.5 },
      { chord: "G/B", timeSec: 31.5, durationSec: 3.5, bassNote: "B" },
      { chord: "Am7", timeSec: 35, durationSec: 3.5 },
      { chord: "Dsus4", timeSec: 38.5, durationSec: 3.5 },
      { chord: "G", timeSec: 42, durationSec: 3.5 },
      { chord: "D/F#", timeSec: 45.5, durationSec: 3.5, bassNote: "F#" },
      { chord: "Em7", timeSec: 49, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 52.5, durationSec: 3.5 },
      { chord: "G/B", timeSec: 56, durationSec: 3.5, bassNote: "B" },
      { chord: "Am7", timeSec: 59.5, durationSec: 3.5 },
      { chord: "Dsus4", timeSec: 63, durationSec: 3.5 },
      { chord: "Em7", timeSec: 66.5, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 70, durationSec: 3.5 },
      { chord: "Dsus4", timeSec: 73.5, durationSec: 3.5 },
      { chord: "G", timeSec: 77, durationSec: 7 },
    ],
    stemProfiles: {
      vocals: [0, 0, 0, 0, 0.65, 0.75, 0.8, 0.82, 0.78, 0.7, 0.9, 0.95, 0.92, 0.85, 0.88, 0.92, 0.8, 0.85, 0.75, 0.6, 0.4, 0, 0],
      drums: [0, 0, 0.15, 0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.85, 0.9, 0.88, 0.85, 0.88, 0.9, 0.85, 0.8, 0.75, 0.6, 0.3, 0.1, 0],
      bass: [0.1, 0.2, 0.3, 0.35, 0.5, 0.55, 0.6, 0.6, 0.65, 0.7, 0.9, 0.92, 0.9, 0.88, 0.9, 0.92, 0.88, 0.85, 0.8, 0.65, 0.4, 0.1, 0],
      instruments: [0.8, 0.85, 0.88, 0.9, 0.75, 0.78, 0.8, 0.82, 0.8, 0.85, 0.95, 0.98, 0.95, 0.92, 0.95, 0.98, 0.9, 0.88, 0.85, 0.8, 0.7, 0.5, 0.3],
    },
  },
  {
    id: "bersuka-dalam-tuhan",
    title: "Bersuka Dalam Tuhan",
    artist: "True Worshippers / JPCC Worship",
    genre: "Praise",
    key: "G",
    originalKey: "G",
    bpm: 122,
    timeSignature: "4/4",
    durationSec: 72,
    description: "Lagu pujian up-tempo penuh semangat. Sangat cocok untuk mengisolasi ketukan drum cepat dan bass berjalan.",
    sections: [
      { id: "sec-1", name: "Intro Drum & Bass Riff", label: "Intro", startSec: 0, endSec: 12, color: "bg-zinc-600" },
      { id: "sec-2", name: "Bait: Hari Ini Hari yang Telah Dijadikan", label: "Bait", startSec: 12, endSec: 32, color: "bg-sky-600" },
      { id: "sec-3", name: "Reff: Bersuka Dalam Tuhan", label: "Reff", startSec: 32, endSec: 52, color: "bg-amber-600" },
      { id: "sec-4", name: "Bridge: Rayakan Hari Kemenangan-Nya", label: "Bridge", startSec: 52, endSec: 64, color: "bg-purple-600" },
      { id: "sec-5", name: "Ending Shout", label: "Ending", startSec: 64, endSec: 72, color: "bg-emerald-600" },
    ],
    chords: [
      { chord: "G", timeSec: 0, durationSec: 3.9 },
      { chord: "C", timeSec: 3.9, durationSec: 3.9 },
      { chord: "Em", timeSec: 7.8, durationSec: 3.9 },
      { chord: "D", timeSec: 11.7, durationSec: 3.9 },
      { chord: "G", timeSec: 15.6, durationSec: 3.9 },
      { chord: "C", timeSec: 19.5, durationSec: 3.9 },
      { chord: "Em", timeSec: 23.4, durationSec: 3.9 },
      { chord: "D", timeSec: 27.3, durationSec: 3.9 },
      { chord: "C", timeSec: 31.2, durationSec: 3.9 },
      { chord: "G/B", timeSec: 35.1, durationSec: 3.9, bassNote: "B" },
      { chord: "Am7", timeSec: 39.0, durationSec: 3.9 },
      { chord: "D", timeSec: 42.9, durationSec: 3.9 },
      { chord: "G", timeSec: 46.8, durationSec: 3.9 },
      { chord: "C", timeSec: 50.7, durationSec: 3.9 },
      { chord: "Em", timeSec: 54.6, durationSec: 3.9 },
      { chord: "D", timeSec: 58.5, durationSec: 3.9 },
      { chord: "G", timeSec: 62.4, durationSec: 9.6 },
    ],
    stemProfiles: {
      vocals: [0, 0, 0, 0.75, 0.82, 0.85, 0.8, 0.88, 0.95, 0.98, 0.92, 0.95, 0.9, 0.92, 0.88, 0.8, 0],
      drums: [0.85, 0.9, 0.92, 0.9, 0.92, 0.95, 0.9, 0.95, 0.98, 1.0, 0.95, 0.98, 0.95, 0.92, 0.9, 0.85, 0.3],
      bass: [0.8, 0.88, 0.9, 0.88, 0.9, 0.92, 0.88, 0.92, 0.96, 0.98, 0.94, 0.96, 0.92, 0.9, 0.88, 0.8, 0.2],
      instruments: [0.75, 0.8, 0.85, 0.82, 0.85, 0.88, 0.85, 0.88, 0.92, 0.95, 0.92, 0.95, 0.9, 0.88, 0.85, 0.75, 0.2],
    },
  },
  {
    id: "amazing-grace",
    title: "Amazing Grace (Ajaib Benar Anugerah)",
    artist: "John Newton / Traditional Hymn",
    genre: "Hymn",
    key: "F",
    originalKey: "F",
    bpm: 84,
    timeSignature: "3/4",
    durationSec: 66,
    description: "Hymn berbirama 3/4 (Waltz). Sangat berguna untuk melatih pola ritmis ayunan 3 ketuk dan harmoni vokal.",
    sections: [
      { id: "sec-1", name: "Intro Organ / Piano", label: "Intro", startSec: 0, endSec: 11, color: "bg-zinc-600" },
      { id: "sec-2", name: "Bait 1: Ajaib Benar Anugerah", label: "Bait", startSec: 11, endSec: 33, color: "bg-sky-600" },
      { id: "sec-3", name: "Bait 2: 'Ku Yang Dulu Tersesat", label: "Bait", startSec: 33, endSec: 55, color: "bg-amber-600" },
      { id: "sec-4", name: "Penutup Retardando", label: "Ending", startSec: 55, endSec: 66, color: "bg-emerald-600" },
    ],
    chords: [
      { chord: "F", timeSec: 0, durationSec: 4.3 },
      { chord: "F/A", timeSec: 4.3, durationSec: 4.3, bassNote: "A" },
      { chord: "Bb", timeSec: 8.6, durationSec: 4.3 },
      { chord: "F", timeSec: 12.9, durationSec: 4.3 },
      { chord: "C", timeSec: 17.2, durationSec: 4.3 },
      { chord: "F", timeSec: 21.5, durationSec: 4.3 },
      { chord: "Bb", timeSec: 25.8, durationSec: 4.3 },
      { chord: "F", timeSec: 30.1, durationSec: 4.3 },
      { chord: "C7", timeSec: 34.4, durationSec: 4.3 },
      { chord: "F", timeSec: 38.7, durationSec: 4.3 },
      { chord: "F/A", timeSec: 43.0, durationSec: 4.3, bassNote: "A" },
      { chord: "Bb", timeSec: 47.3, durationSec: 4.3 },
      { chord: "F", timeSec: 51.6, durationSec: 4.3 },
      { chord: "C", timeSec: 55.9, durationSec: 4.3 },
      { chord: "F", timeSec: 60.2, durationSec: 5.8 },
    ],
    stemProfiles: {
      vocals: [0, 0, 0.65, 0.75, 0.78, 0.82, 0.8, 0.85, 0.88, 0.9, 0.85, 0.82, 0.8, 0.65, 0],
      drums: [0, 0.2, 0.35, 0.4, 0.45, 0.5, 0.48, 0.55, 0.58, 0.6, 0.55, 0.5, 0.45, 0.3, 0],
      bass: [0.2, 0.3, 0.45, 0.5, 0.55, 0.6, 0.58, 0.65, 0.68, 0.7, 0.65, 0.6, 0.55, 0.4, 0],
      instruments: [0.75, 0.8, 0.85, 0.88, 0.9, 0.92, 0.9, 0.92, 0.95, 0.95, 0.92, 0.9, 0.85, 0.7, 0.4],
    },
  },
  {
    id: "kebaikan-tuhan",
    title: "Kebaikan Tuhan (Goodness of God)",
    artist: "Bethel Music / Jenn Johnson",
    genre: "Worship",
    key: "G",
    originalKey: "G",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 88,
    description: "Lagu pujian modern yang memiliki dinamika build-up dari akustik lembut menuju full band megah.",
    sections: [
      { id: "sec-1", name: "Intro Gitar Akustik", label: "Intro", startSec: 0, endSec: 14, color: "bg-zinc-600" },
      { id: "sec-2", name: "Bait: Ku Mengasihi-Mu", label: "Bait", startSec: 14, endSec: 36, color: "bg-sky-600" },
      { id: "sec-3", name: "Reff: Sepanjang Hidupku Kau Setia", label: "Reff", startSec: 36, endSec: 58, color: "bg-amber-600" },
      { id: "sec-4", name: "Bridge: Kasih-Mu Mengejarku", label: "Bridge", startSec: 58, endSec: 76, color: "bg-purple-600" },
      { id: "sec-5", name: "Ending", label: "Ending", startSec: 76, endSec: 88, color: "bg-emerald-600" },
    ],
    chords: [
      { chord: "G", timeSec: 0, durationSec: 3.5 },
      { chord: "C", timeSec: 3.5, durationSec: 3.5 },
      { chord: "G", timeSec: 7, durationSec: 3.5 },
      { chord: "D", timeSec: 10.5, durationSec: 3.5 },
      { chord: "G", timeSec: 14, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 17.5, durationSec: 3.5 },
      { chord: "G", timeSec: 21, durationSec: 3.5 },
      { chord: "D/F#", timeSec: 24.5, durationSec: 3.5, bassNote: "F#" },
      { chord: "Em7", timeSec: 28, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 31.5, durationSec: 3.5 },
      { chord: "D", timeSec: 35, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 38.5, durationSec: 3.5 },
      { chord: "G", timeSec: 42, durationSec: 3.5 },
      { chord: "D/F#", timeSec: 45.5, durationSec: 3.5, bassNote: "F#" },
      { chord: "Em7", timeSec: 49, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 52.5, durationSec: 3.5 },
      { chord: "D", timeSec: 56, durationSec: 3.5 },
      { chord: "G", timeSec: 59.5, durationSec: 3.5 },
      { chord: "G/B", timeSec: 63, durationSec: 3.5, bassNote: "B" },
      { chord: "Cadd9", timeSec: 66.5, durationSec: 3.5 },
      { chord: "D", timeSec: 70, durationSec: 3.5 },
      { chord: "Em7", timeSec: 73.5, durationSec: 3.5 },
      { chord: "Cadd9", timeSec: 77, durationSec: 3.5 },
      { chord: "D", timeSec: 80.5, durationSec: 3.5 },
      { chord: "G", timeSec: 84, durationSec: 4 },
    ],
    stemProfiles: {
      vocals: [0, 0, 0, 0.6, 0.7, 0.75, 0.78, 0.8, 0.85, 0.9, 0.95, 0.95, 0.98, 0.98, 0.95, 0.92, 0.88, 0.9, 0.92, 0.95, 0.9, 0.8, 0.7, 0.4, 0],
      drums: [0, 0, 0.1, 0.2, 0.35, 0.4, 0.45, 0.5, 0.65, 0.75, 0.85, 0.88, 0.92, 0.95, 0.92, 0.9, 0.88, 0.9, 0.92, 0.95, 0.9, 0.8, 0.6, 0.2, 0],
      bass: [0, 0.1, 0.25, 0.35, 0.5, 0.55, 0.6, 0.65, 0.75, 0.8, 0.9, 0.92, 0.95, 0.96, 0.94, 0.9, 0.88, 0.92, 0.94, 0.96, 0.9, 0.75, 0.5, 0.2, 0],
      instruments: [0.8, 0.82, 0.85, 0.8, 0.82, 0.85, 0.85, 0.88, 0.9, 0.92, 0.95, 0.96, 0.98, 0.98, 0.95, 0.92, 0.9, 0.94, 0.96, 0.98, 0.92, 0.85, 0.75, 0.5, 0.2],
    },
  },
];
