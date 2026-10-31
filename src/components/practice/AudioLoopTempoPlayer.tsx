"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  Repeat,
  Volume2,
  VolumeX,
  Upload,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { noteToFrequency } from "@/lib/audioSynth";
import { getChordDiagram } from "@/data/chordDiagrams";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";
import { useMusicApp } from "@/context/MusicAppContext";
import { InstrumentType, Song } from "@/types/music";

interface ChordStep {
  name: string;
  notes: string[];
  startSec: number;
  endSec: number;
  isBridge?: boolean;
}

interface BackingTrackPreset {
  id: string;
  name: string;
  category: string;
  modeLabel: "Mode Pemula" | "Mode Mahir";
  key: string;
  bpm: number;
  tip: string;
  chords: ChordStep[];
}

const BUILTIN_PRESETS: BackingTrackPreset[] = [
  {
    id: "worship-pemula-g",
    name: "Latihan Worship Lambat · Progresi C - G - D - Em",
    category: "Worship (Lambat)",
    modeLabel: "Mode Pemula",
    key: "G",
    bpm: 72,
    tip: "Progresi paling populer untuk lagu seperti 10,000 Reasons & Way Maker. Latih perpindahan jari dari G ke D ke Em.",
    chords: [
      { name: "C", notes: ["C3", "G3", "C4", "E4"], startSec: 0, endSec: 6 },
      { name: "G", notes: ["G2", "D3", "B3", "G4"], startSec: 6, endSec: 12 },
      { name: "D", notes: ["D3", "A3", "D4", "F#4"], startSec: 12, endSec: 18 },
      { name: "Em", notes: ["E2", "B3", "E4", "G4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "worship-mahir-g",
    name: "Latihan Jembatan Worship · Cmaj7 - G/B - D/F# - Em7",
    category: "Worship (Lambat)",
    modeLabel: "Mode Mahir",
    key: "G",
    bpm: 70,
    tip: "Melatih jembatan slash chord G/B dan D/F# agar perpindahan bass terdengar mengalir lembut.",
    chords: [
      { name: "Cmaj7", notes: ["C3", "G3", "B3", "E4"], startSec: 0, endSec: 6 },
      {
        name: "G/B",
        notes: ["B2", "D3", "G3", "D4"],
        startSec: 6,
        endSec: 12,
        isBridge: true,
      },
      {
        name: "D/F#",
        notes: ["F#2", "D3", "A3", "D4"],
        startSec: 12,
        endSec: 18,
        isBridge: true,
      },
      { name: "Em7", notes: ["E2", "B2", "D4", "G4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "hymn-pemula-c",
    name: "Latihan Hymn Klasik · Progresi C - F - G - C",
    category: "Hymn",
    modeLabel: "Mode Pemula",
    key: "C",
    bpm: 78,
    tip: "Fondasi utama puluhan lagu Hymn seperti It Is Well with My Soul & Amazing Grace.",
    chords: [
      { name: "C", notes: ["C3", "E3", "G3", "C4"], startSec: 0, endSec: 6 },
      { name: "F", notes: ["F2", "C3", "A3", "F4"], startSec: 6, endSec: 12 },
      { name: "G", notes: ["G2", "D3", "B3", "G4"], startSec: 12, endSec: 18 },
      { name: "C", notes: ["C3", "E3", "G3", "C4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "hymn-mahir-c",
    name: "Latihan Jembatan Hymn · C - C/E - F - G/B - Am7 - G",
    category: "Hymn",
    modeLabel: "Mode Mahir",
    key: "C",
    bpm: 76,
    tip: "Melatih jembatan C/E menuju F dan G/B menuju Am7 yang sering dipakai organis/pianis gereja.",
    chords: [
      { name: "C", notes: ["C3", "G3", "C4", "E4"], startSec: 0, endSec: 4 },
      {
        name: "C/E",
        notes: ["E2", "G3", "C4", "E4"],
        startSec: 4,
        endSec: 8,
        isBridge: true,
      },
      { name: "Fmaj7", notes: ["F2", "C3", "A3", "E4"], startSec: 8, endSec: 12 },
      {
        name: "G/B",
        notes: ["B2", "D3", "G3", "D4"],
        startSec: 12,
        endSec: 16,
        isBridge: true,
      },
      { name: "Am7", notes: ["A2", "E3", "G3", "C4"], startSec: 16, endSec: 20 },
      { name: "G", notes: ["G2", "D3", "B3", "G4"], startSec: 20, endSec: 24 },
    ],
  },
  {
    id: "praise-pemula-g",
    name: "Latihan Praise Cepat · Progresi G - C - Em - D",
    category: "Praise (Cepat)",
    modeLabel: "Mode Pemula",
    key: "G",
    bpm: 120,
    tip: "Ketukan cepat untuk lagu pujian seperti This Is Amazing Grace & Trading My Sorrows. Gunakan kecepatan 0.75x bila masih terlalu cepat.",
    chords: [
      { name: "G", notes: ["G2", "D3", "B3", "G4"], startSec: 0, endSec: 6 },
      { name: "C", notes: ["C3", "G3", "C4", "E4"], startSec: 6, endSec: 12 },
      { name: "Em", notes: ["E2", "B2", "E4", "G4"], startSec: 12, endSec: 18 },
      { name: "D", notes: ["D3", "A3", "D4", "F#4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "praise-mahir-d",
    name: "Latihan Jembatan Praise · D - A/C# - Bm7 - G",
    category: "Praise (Cepat)",
    modeLabel: "Mode Mahir",
    key: "D",
    bpm: 122,
    tip: "Melatih perpindahan cepat D -> A/C# -> Bm7 untuk lagu Friend of God & Everyday.",
    chords: [
      { name: "D", notes: ["D3", "A3", "D4", "F#4"], startSec: 0, endSec: 6 },
      {
        name: "A/C#",
        notes: ["C#3", "A3", "E4", "A4"],
        startSec: 6,
        endSec: 12,
        isBridge: true,
      },
      { name: "Bm7", notes: ["B2", "F#3", "A3", "D4"], startSec: 12, endSec: 18 },
      { name: "G", notes: ["G2", "D3", "B3", "G4"], startSec: 18, endSec: 24 },
    ],
  },
];

function buildSongPresets(song: Song): BackingTrackPreset[] {
  return song.arrangements.map((arr) => {
    const extracted: { name: string; isBridge?: boolean }[] = [];
    for (const sec of arr.sections) {
      for (const line of sec.lines) {
        for (const tok of line) {
          const clean = tok.chord.trim();
          if (!clean) continue;
          if (extracted.length === 0 || extracted[extracted.length - 1].name !== clean) {
            extracted.push({ name: clean, isBridge: tok.isBridge });
          }
          if (extracted.length >= 6) break;
        }
        if (extracted.length >= 6) break;
      }
      if (extracted.length >= 6) break;
    }

    const fallback = extracted.length > 0 ? extracted : [{ name: song.key }];
    const stepDur = 4;
    const chords: ChordStep[] = fallback.map((c, i) => {
      const diag = getChordDiagram(c.name);
      return {
        name: c.name,
        notes: diag.piano.notes.length > 0 ? diag.piano.notes : ["C3", "E4", "G4"],
        startSec: i * stepDur,
        endSec: (i + 1) * stepDur,
        isBridge: c.isBridge,
      };
    });

    return {
      id: `song-${song.id}-${arr.difficulty}`,
      name: `Lagu: ${song.title} (${arr.difficulty === "Pemula" ? "Mode Pemula" : "Mode Mahir"})`,
      category: song.genre,
      modeLabel: arr.difficulty === "Pemula" ? "Mode Pemula" : "Mode Mahir",
      key: song.key,
      bpm: song.bpm,
      tip:
        arr.notesSummary ||
        `Latih perpindahan akor lagu ${song.title}. Klik salah satu pasangan akor di bawah untuk mengulang bagian yang sulit.`,
      chords,
    };
  });
}

function createSynthesizedBackingWavUrl(preset: BackingTrackPreset): string {
  const sampleRate = 22050;
  const totalDurationSec =
    preset.chords.length > 0
      ? preset.chords[preset.chords.length - 1].endSec
      : 24;
  const numSamples = Math.floor(sampleRate * totalDurationSec);
  const samples = new Float32Array(numSamples);

  const beatDuration = 60 / preset.bpm;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const activeChord =
      preset.chords.find((c) => t >= c.startSec && t < c.endSec) || preset.chords[0];

    const localBeatPos = (t % beatDuration) / beatDuration;
    const beatIndexInChord = Math.floor((t - activeChord.startSec) / beatDuration);
    const isDownbeat = beatIndexInChord % 4 === 0;

    const envelope = Math.exp(-localBeatPos * 2.8);

    let sampleVal = 0;
    activeChord.notes.forEach((n, idx) => {
      const freq = noteToFrequency(n);
      const weight = idx === 0 ? 0.36 : 0.17;
      // Warm electric piano / acoustic pad blend (fundamental + soft 2nd harmonic)
      sampleVal +=
        (Math.sin(2 * Math.PI * freq * t) +
          0.25 * Math.sin(2 * Math.PI * freq * 2 * t)) *
        weight *
        envelope;
    });

    // Subtle rhythm click so musician stays locked to beat
    if (localBeatPos < 0.035) {
      const clickFreq = isDownbeat ? 1040 : 720;
      const clickAmp = isDownbeat ? 0.16 : 0.09;
      sampleVal +=
        Math.sin(2 * Math.PI * clickFreq * t) *
        clickAmp *
        (1 - localBeatPos / 0.035);
    }

    samples[i] = Math.max(-0.95, Math.min(0.95, sampleVal));
  }

  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEED_OPTIONS = [
  { rate: 0.5, label: "0.5x · Sangat Lambat" },
  { rate: 0.75, label: "0.75x · Lambat (Belajar)" },
  { rate: 0.9, label: "0.9x · Sedikit Lambat" },
  { rate: 1.0, label: "1.0x · Tempo Normal" },
  { rate: 1.25, label: "1.25x · Lebih Cepat" },
];

interface AudioLoopTempoPlayerProps {
  linkedSong?: Song | null;
}

export function AudioLoopTempoPlayer({ linkedSong }: AudioLoopTempoPlayerProps) {
  const { preferredInstrument, setPreferredInstrument } = useMusicApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const allPresets = useMemo(() => {
    if (linkedSong) {
      return [...buildSongPresets(linkedSong), ...BUILTIN_PRESETS];
    }
    return BUILTIN_PRESETS;
  }, [linkedSong]);

  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(24);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState<number>(0);
  const [loopEnd, setLoopEnd] = useState<number>(12);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Reset to index 0 when linkedSong changes so song's own progression is loaded first
  useEffect(() => {
    setSelectedPresetIdx(0);
    setCustomFileName(null);
  }, [linkedSong?.id]);

  const activePreset = allPresets[selectedPresetIdx] || allPresets[0];

  useEffect(() => {
    if (customFileName) return;
    const url = createSynthesizedBackingWavUrl(activePreset);
    const totalDur =
      activePreset.chords.length > 0
        ? activePreset.chords[activePreset.chords.length - 1].endSec
        : 24;

    setAudioUrl(url);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(totalDur);
    setLoopEnabled(false);
    setLoopStart(0);
    setLoopEnd(totalDur);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [activePreset, customFileName]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = playbackRate;
    if ("preservesPitch" in el) {
      el.preservesPitch = true;
    }
  }, [playbackRate, audioUrl]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;

    if (loopEnabled && loopEnd > loopStart && el.currentTime >= loopEnd) {
      el.currentTime = loopStart;
      if (el.paused) {
        el.play().catch(() => {});
      }
    }
    setCurrentTime(el.currentTime);
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      if (loopEnabled && (el.currentTime < loopStart || el.currentTime >= loopEnd)) {
        el.currentTime = loopStart;
      }
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (newTime: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLoopPair = (startSec: number, endSec: number) => {
    setLoopStart(startSec);
    setLoopEnd(endSec);
    setLoopEnabled(true);
    handleSeek(startSec);
    const el = audioRef.current;
    if (el && el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleLoopAll = () => {
    setLoopStart(0);
    setLoopEnd(duration);
    setLoopEnabled(false);
  };

  const handleSetLoopA = () => {
    const nextA = Math.min(currentTime, Math.max(0, loopEnd - 1));
    setLoopStart(Math.max(0, Number(nextA.toFixed(1))));
    setLoopEnabled(true);
  };

  const handleSetLoopB = () => {
    if (currentTime <= loopStart + 0.5) {
      setUploadError("Titik Akhir (B) harus berada setelah Titik Awal (A).");
      return;
    }
    setUploadError(null);
    setLoopEnd(Number(currentTime.toFixed(1)));
    setLoopEnabled(true);
  };

  const handleLoopLastSeconds = (seconds: number) => {
    const end = Math.max(seconds, currentTime);
    const start = Math.max(0, end - seconds);
    setLoopStart(Number(start.toFixed(1)));
    setLoopEnd(Number(Math.min(duration, end).toFixed(1)));
    setLoopEnabled(true);
    handleSeek(start);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/mp4",
      "audio/x-m4a",
      "audio/flac",
    ];
    const hasValidExt = /\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name);

    if (!validTypes.includes(file.type) && !hasValidExt) {
      setUploadError(
        `Format berkas "${file.name}" tidak didukung. Gunakan file MP3, WAV, OGG, atau M4A.`
      );
      return;
    }

    setUploadError(null);
    const objectUrl = URL.createObjectURL(file);
    setCustomFileName(file.name);
    setAudioUrl(objectUrl);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Determine active & next chord when using synthesized backing preset
  const activeChordIndex = useMemo(() => {
    if (customFileName) return -1;
    const idx = activePreset.chords.findIndex(
      (c) => currentTime >= c.startSec && currentTime < c.endSec
    );
    return idx >= 0 ? idx : 0;
  }, [activePreset, currentTime, customFileName]);

  const currentChordStep =
    !customFileName && activePreset.chords[activeChordIndex]
      ? activePreset.chords[activeChordIndex]
      : null;

  const nextChordStep =
    !customFileName && activePreset.chords.length > 0
      ? activePreset.chords[(activeChordIndex + 1) % activePreset.chords.length]
      : null;

  return (
    <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-6">
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) {
            setDuration(d);
            setLoopStart(0);
            setLoopEnd(Number(d.toFixed(1)));
          }
        }}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = loopEnabled ? loopStart : 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      />

      {/* Clear Header + What Is This Tool For */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="space-y-1 max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500">
            3 · Latihan Pindah Chord & Ulang Bagian Sulit
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Pelatih Perpindahan Chord & Pengulang Lagu (Loop A–B)
            </h2>
            <button
              type="button"
              onClick={() => setShowGuide((g) => !g)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGuide ? "Tutup Cara Pakai" : "Apa Fungsi Alat Ini?"}</span>
            </button>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Alat ini membantu Anda <strong>melatih perpindahan jari antar-chord dengan musik iringan</strong>,{" "}
            <strong>mengulang terus-menerus 2 chord yang masih terasa sulit (Loop A–B)</strong>, serta{" "}
            <strong>memperlambat kecepatan lagu (0.5x / 0.75x)</strong> tanpa mengubah nada dasar.
          </p>
        </div>

        {/* Select Preset or Upload MP3 */}
        <div className="flex flex-wrap items-center gap-2 self-start">
          <select
            aria-label="Pilih Materi Latihan"
            value={customFileName ? "custom" : selectedPresetIdx}
            onChange={(e) => {
              if (e.target.value === "custom") return;
              setCustomFileName(null);
              setUploadError(null);
              setSelectedPresetIdx(Number(e.target.value));
            }}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200 max-w-full sm:max-w-[340px]"
          >
            {allPresets.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.name}
              </option>
            ))}
            {customFileName && (
              <option value="custom">File MP3 Anda: {customFileName}</option>
            )}
          </select>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-amber-500 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors">
            <Upload className="w-3.5 h-3.5 text-amber-500" />
            <span>Unggah MP3 Sendiri</span>
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.ogg,.m4a"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Collapsible Plain-Language Explanation */}
      {showGuide && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-md border border-amber-500/30 bg-amber-500/5 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-amber-700 dark:text-amber-400">
              1. Latih Pindah Jari (Iringan Chord)
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pilih progresi lagu di atas lalu tekan <strong>Putar Latihan</strong>. Layar akan menampilkan diagram chord yang sedang berbunyi dan chord berikutnya supaya Anda siap memindahkan jari tepat waktu.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-700 dark:text-amber-400">
              2. Ulang Bagian Sulit (Loop A–B)
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Misalnya Anda sering telat pindah dari <code>G/B</code> ke <code>D/F#</code>. Cukup klik tombol <strong>&ldquo;Ulang G/B ↔ D/F#&rdquo;</strong>, maka musik hanya akan mengulang 2 chord itu terus-menerus sampai jari Anda hafal!
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-700 dark:text-amber-400">
              3. Perlambat Tempo Tanpa Ubah Nada
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Saat berlatih lagu Praise yang cepat atau mengulik rekaman MP3 gereja, pilih kecepatan <strong>0.75x (Lambat)</strong>. Lagu menjadi lebih pelan namun nadanya tidak berubah sumbang.
            </p>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="p-3 rounded-md border border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300 text-xs flex items-center justify-between">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-xs font-semibold underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Interactive Area: Chord Progression Trainer + Live Diagram */}
      {!customFileName ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 cols: Progression Steps & 1-Click Pair Looping */}
          <div className="lg:col-span-7 p-4 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {activePreset.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    {activePreset.modeLabel}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">{activePreset.tip}</p>
              </div>
              <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Live Active Chord vs Next Chord Banner */}
            {currentChordStep && nextChordStep && (
              <div className="grid grid-cols-2 gap-3 p-3 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500">
                    Bunyi Sekarang
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-600 dark:text-amber-400">
                      {currentChordStep.name}
                    </span>
                    {currentChordStep.isBridge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-dashed border-amber-500 text-amber-600 dark:text-amber-400">
                        Jembatan
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-l border-zinc-200 dark:border-zinc-800 pl-3">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
                    <span>Bersiap Pindah Ke</span>
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {nextChordStep.name}
                  </div>
                </div>
              </div>
            )}

            {/* Sequence of Chord Boxes (Click any chord to loop just that chord) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Urutan Chord (Klik kartu chord untuk fokus mengulang):</span>
                {loopEnabled && (
                  <button
                    type="button"
                    onClick={handleLoopAll}
                    className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                  >
                    Matikan Loop (Putar Semua)
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activePreset.chords.map((seg, idx) => {
                  const isSegActive = idx === activeChordIndex;
                  const isInLoopRange =
                    loopEnabled && seg.startSec >= loopStart && seg.endSec <= loopEnd;

                  return (
                    <button
                      key={`${seg.name}-${idx}`}
                      type="button"
                      onClick={() => handleLoopPair(seg.startSec, seg.endSec)}
                      className={`p-2.5 rounded-md border text-left transition-all ${
                        isSegActive
                          ? "border-amber-500 bg-amber-500/20 text-zinc-900 dark:text-white shadow-xs"
                          : isInLoopRange
                          ? "border-amber-500/60 bg-amber-500/5 text-zinc-800 dark:text-zinc-200"
                          : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-amber-500/50"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>Chord #{idx + 1}</span>
                        {seg.isBridge && (
                          <span className="text-amber-600 dark:text-amber-400">Jembatan</span>
                        )}
                      </div>
                      <div className="text-base font-mono font-bold mt-0.5">{seg.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1-Click Transition Loop Buttons (Super practical for practicing chord switches!) */}
            {activePreset.chords.length >= 2 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-medium text-zinc-500">
                  Latih Perpindahan 2 Chord Sulit (Loop A–B Otomatis):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={handleLoopAll}
                    className={`px-2.5 py-1.5 rounded-sm text-xs font-semibold border transition-colors ${
                      !loopEnabled
                        ? "bg-amber-500 text-zinc-950 border-amber-500"
                        : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    Putar Semua Urutan
                  </button>

                  {activePreset.chords.slice(0, -1).map((c, idx) => {
                    const nextC = activePreset.chords[idx + 1];
                    const isPairActive =
                      loopEnabled &&
                      loopStart === c.startSec &&
                      loopEnd === nextC.endSec;

                    return (
                      <button
                        key={`pair-${idx}`}
                        type="button"
                        onClick={() => handleLoopPair(c.startSec, nextC.endSec)}
                        className={`px-2.5 py-1.5 rounded-sm font-mono text-xs font-semibold border transition-colors ${
                          isPairActive
                            ? "bg-amber-500 text-zinc-950 border-amber-500"
                            : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                        }`}
                      >
                        Ulang {c.name} ↔ {nextC.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Progress Timeline */}
            <div className="space-y-1 pt-1">
              <div className="relative h-2.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                {loopEnabled && duration > 0 && (
                  <div
                    style={{
                      left: `${(loopStart / duration) * 100}%`,
                      width: `${Math.max(2, ((loopEnd - loopStart) / duration) * 100)}%`,
                    }}
                    className="absolute top-0 bottom-0 bg-amber-500/30 border-x-2 border-amber-500"
                  />
                )}
                <div
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                  className="h-full bg-amber-500 transition-all duration-75"
                />
              </div>

              <input
                type="range"
                min={0}
                max={duration || 24}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label="Posisi Waktu Audio"
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right 5 cols: Live Chord Diagram for Active Chord */}
          <div className="lg:col-span-5 p-4 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Posisi Jari Saat Ini: {currentChordStep?.name || "C"}
              </span>
              <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-sm overflow-hidden bg-white dark:bg-zinc-900">
                {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setPreferredInstrument(inst)}
                    className={`px-2 py-1 text-[11px] font-medium border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 ${
                      preferredInstrument === inst
                        ? "bg-amber-500 text-zinc-950 font-bold"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {inst === "guitar" ? "Gitar" : inst === "bass" ? "Bass" : "Piano"}
                  </button>
                ))}
              </div>
            </div>

            <ChordDiagramCard
              chordSymbol={currentChordStep?.name || "C"}
              instrument={preferredInstrument}
              isSelected={true}
            />
          </div>
        </div>
      ) : (
        /* Custom Uploaded MP3 View */
        <div className="p-4 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              File Audio: {customFileName}
            </span>
            <span className="font-mono text-zinc-600 dark:text-zinc-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="relative h-3 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              {loopEnabled && duration > 0 && (
                <div
                  style={{
                    left: `${(loopStart / duration) * 100}%`,
                    width: `${Math.max(2, ((loopEnd - loopStart) / duration) * 100)}%`,
                  }}
                  className="absolute top-0 bottom-0 bg-amber-500/30 border-x-2 border-amber-500"
                />
              )}
              <div
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
                className="h-full bg-amber-500 transition-all duration-75"
              />
            </div>

            <input
              type="range"
              min={0}
              max={duration || 24}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              aria-label="Posisi Waktu Audio"
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleLoopLastSeconds(5)}
              className="px-3 py-1.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold hover:border-amber-500"
            >
              Ulang 5 Detik Terakhir
            </button>
            <button
              type="button"
              onClick={() => handleLoopLastSeconds(10)}
              className="px-3 py-1.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold hover:border-amber-500"
            >
              Ulang 10 Detik Terakhir
            </button>
          </div>
        </div>
      )}

      {/* Playback, Loop A-B & Volume Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-4 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex-1 py-3 px-4 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda Latihan</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Putar Iringan Latihan</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSeek(loopEnabled ? loopStart : 0)}
            title="Ulang dari Awal"
            className="p-3 rounded-md border border-zinc-300 dark:border-zinc-800 hover:border-amber-500"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Manual Loop A-B Controls */}
        <div className="lg:col-span-5 flex flex-wrap items-center gap-2 p-2.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setLoopEnabled((l) => !l)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors ${
              loopEnabled
                ? "bg-amber-500 text-zinc-950 border-amber-500"
                : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Ulang A–B: {loopEnabled ? "Aktif" : "Mati"}</span>
          </button>

          <button
            type="button"
            onClick={handleSetLoopA}
            title="Klik untuk menandai batas awal pengulangan pada detik saat ini"
            className="px-2.5 py-1.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono hover:border-amber-500"
          >
            Mulai (A): {formatTime(loopStart)}
          </button>

          <button
            type="button"
            onClick={handleSetLoopB}
            title="Klik untuk menandai batas akhir pengulangan pada detik saat ini"
            className="px-2.5 py-1.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono hover:border-amber-500"
          >
            Akhir (B): {formatTime(loopEnd)}
          </button>
        </div>

        {/* Volume */}
        <div className="lg:col-span-3 flex items-center gap-2 p-2.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setIsMuted((m) => !m)}
            aria-label="Bisu"
            className="text-zinc-500"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-500" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setIsMuted(false);
              setVolume(Number(e.target.value));
            }}
            aria-label="Volume"
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Speed / Tempo Multiplier Bar */}
      <div className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
            Kecepatan Latihan (Perlambat / Percepat Tanpa Ubah Nada):
          </span>
          <span className="text-[11px] text-zinc-500">
            Pilih <strong>0.75x</strong> jika perpindahan chord terasa terlalu cepat, lalu naikkan ke <strong>1.0x</strong> saat jari sudah lancar.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {SPEED_OPTIONS.map((opt) => (
            <button
              key={opt.rate}
              type="button"
              onClick={() => setPlaybackRate(opt.rate)}
              className={`px-2.5 py-1.5 rounded-sm font-mono text-xs font-semibold border transition-colors ${
                playbackRate === opt.rate
                  ? "bg-amber-500 text-zinc-950 border-amber-500"
                  : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-amber-500"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
