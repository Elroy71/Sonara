"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Repeat,
  Volume2,
  VolumeX,
  Upload,
  RotateCcw,
  Gauge,
  AlertCircle,
  Music,
} from "lucide-react";
import { noteToFrequency } from "@/lib/audioSynth";

interface BackingTrackPreset {
  id: string;
  name: string;
  key: string;
  bpm: number;
  chords: { name: string; notes: string[]; startSec: number; endSec: number }[];
}

const BACKING_PRESETS: BackingTrackPreset[] = [
  {
    id: "preset-pop-c",
    name: "Backing Track: Pop Akustik C Mayor (C - G - Am - F)",
    key: "C",
    bpm: 96,
    chords: [
      { name: "C (Intro/Verse)", notes: ["C3", "E4", "G4", "C5"], startSec: 0, endSec: 6 },
      { name: "G (Verse)", notes: ["G2", "B3", "D4", "G4"], startSec: 6, endSec: 12 },
      { name: "Am (Chorus)", notes: ["A2", "C4", "E4", "A4"], startSec: 12, endSec: 18 },
      { name: "F (Outro/Turnaround)", notes: ["F2", "A3", "C4", "F4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "preset-jazz-g",
    name: "Backing Track: Indie Groove G Mayor (G - Em7 - Am7 - D7)",
    key: "G",
    bpm: 84,
    chords: [
      { name: "Gmaj7", notes: ["G2", "B3", "D4", "F#4"], startSec: 0, endSec: 6 },
      { name: "Em7", notes: ["E2", "G3", "B3", "D4"], startSec: 6, endSec: 12 },
      { name: "Am7", notes: ["A2", "C4", "E4", "G4"], startSec: 12, endSec: 18 },
      { name: "D7", notes: ["D3", "F#3", "C4", "A4"], startSec: 18, endSec: 24 },
    ],
  },
  {
    id: "preset-funk-am",
    name: "Backing Track: Funk Pocket A Minor (Am7 - Dm7 - G7 - E7)",
    key: "Am",
    bpm: 108,
    chords: [
      { name: "Am7", notes: ["A2", "G3", "C4", "E4"], startSec: 0, endSec: 6 },
      { name: "Dm7", notes: ["D3", "A3", "C4", "F4"], startSec: 6, endSec: 12 },
      { name: "G7", notes: ["G2", "B3", "D4", "F4"], startSec: 12, endSec: 18 },
      { name: "E7", notes: ["E2", "G#3", "D4", "B4"], startSec: 18, endSec: 24 },
    ],
  },
];

/**
 * Generates an in-memory 16-bit PCM WAV Blob URL from a backing track preset
 * so HTMLAudioElement supports native seek, loop A-B, and preservesPitch tempo changes.
 */
function createSynthesizedBackingWavUrl(preset: BackingTrackPreset): string {
  const sampleRate = 22050;
  const durationSec = 24;
  const numSamples = sampleRate * durationSec;
  const samples = new Float32Array(numSamples);

  const beatDuration = 60 / preset.bpm;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const activeChord =
      preset.chords.find((c) => t >= c.startSec && t < c.endSec) || preset.chords[0];

    const localBeatPos = (t % beatDuration) / beatDuration;
    const envelope = Math.exp(-localBeatPos * 3.2);

    let sampleVal = 0;
    activeChord.notes.forEach((n, idx) => {
      const freq = noteToFrequency(n);
      const weight = idx === 0 ? 0.35 : 0.18;
      sampleVal += Math.sin(2 * Math.PI * freq * t) * weight * envelope;
    });

    // Subtle hi-hat / metronome pulse on every beat
    if (localBeatPos < 0.04) {
      sampleVal += Math.sin(2 * Math.PI * 880 * t) * 0.12 * (1 - localBeatPos / 0.04);
    }

    samples[i] = Math.max(-0.95, Math.min(0.95, sampleVal));
  }

  // Encode Float32Array into 16-bit mono WAV buffer
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
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
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

const TEMPO_RATES = [0.5, 0.75, 0.9, 1.0, 1.15, 1.25, 1.5];

export function AudioLoopTempoPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(24);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Loop A-B state
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState<number>(0);
  const [loopEnd, setLoopEnd] = useState<number>(12);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const activePreset = BACKING_PRESETS[selectedPresetIdx] || BACKING_PRESETS[0];

  // Generate backing track WAV on preset change
  useEffect(() => {
    if (customFileName) return;
    const url = createSynthesizedBackingWavUrl(activePreset);
    setAudioUrl(url);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(24);
    setLoopStart(0);
    setLoopEnd(12);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [activePreset, customFileName]);

  // Apply playbackRate & preservesPitch
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = playbackRate;
    if ("preservesPitch" in el) {
      el.preservesPitch = true;
    }
  }, [playbackRate, audioUrl]);

  // Apply volume & mute
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

  const handleSetLoopA = () => {
    const nextA = Math.min(currentTime, loopEnd - 1);
    setLoopStart(Math.max(0, Number(nextA.toFixed(1))));
    setLoopEnabled(true);
  };

  const handleSetLoopB = () => {
    if (currentTime <= loopStart + 0.5) {
      setUploadError("Titik Akhir Loop (B) harus berada setelah Titik Awal (A).");
      return;
    }
    setUploadError(null);
    setLoopEnd(Number(currentTime.toFixed(1)));
    setLoopEnabled(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/x-m4a", "audio/flac"];
    const hasValidExt = /\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name);

    if (!validTypes.includes(file.type) && !hasValidExt) {
      setUploadError(
        `Format berkas "${file.name}" tidak didukung. Gunakan format audio MP3, WAV, OGG, atau M4A.`
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

  const currentChordSegment = !customFileName
    ? activePreset.chords.find((c) => currentTime >= c.startSec && currentTime < c.endSec)
    : null;

  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-6">
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) {
            setDuration(d);
            setLoopStart(0);
            setLoopEnd(Math.min(12, Number(d.toFixed(1))));
          }
        }}
        onEnded={() => {
          if (loopEnabled && audioRef.current) {
            audioRef.current.currentTime = loopStart;
            audioRef.current.play().catch(() => {});
          } else {
            setIsPlaying(false);
          }
        }}
      />

      {/* Top Header & Source Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
            Loop Segmen A–B & Kontrol Tempo (Preserves Pitch)
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Pemutar Latihan Audio & Backing Track
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Pilih Backing Track Bawaan"
            value={customFileName ? "custom" : selectedPresetIdx}
            onChange={(e) => {
              if (e.target.value === "custom") return;
              setCustomFileName(null);
              setUploadError(null);
              setSelectedPresetIdx(Number(e.target.value));
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {BACKING_PRESETS.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.name}
              </option>
            ))}
            {customFileName && (
              <option value="custom">Berkas Lokal: {customFileName}</option>
            )}
          </select>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Muat File Audio Lokal</span>
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.ogg,.m4a"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Format / Validation Error Notice */}
      {uploadError && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-xs font-bold underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Visual Timeline, Chord Regions & Loop A-B Highlight */}
      <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {customFileName ? customFileName : activePreset.name}
            </span>
          </div>

          {currentChordSegment && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              Bagian Aktif: {currentChordSegment.name}
            </span>
          )}

          <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Chord Section Bar for Built-in Backing Tracks */}
        {!customFileName && (
          <div className="grid grid-cols-4 gap-1.5">
            {activePreset.chords.map((seg) => {
              const isSegActive =
                currentTime >= seg.startSec && currentTime < seg.endSec;
              const isInLoop =
                loopEnabled &&
                seg.startSec >= loopStart &&
                seg.endSec <= loopEnd;
              return (
                <button
                  key={seg.name}
                  type="button"
                  onClick={() => {
                    setLoopStart(seg.startSec);
                    setLoopEnd(seg.endSec);
                    setLoopEnabled(true);
                    handleSeek(seg.startSec);
                  }}
                  title="Klik untuk melakukan Loop pada bagian chord ini"
                  className={`p-2 rounded-xl border text-left transition-all ${
                    isSegActive
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold"
                      : isInLoop
                      ? "border-amber-500/50 bg-amber-500/10 text-slate-700 dark:text-slate-300"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500"
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-75">
                    {seg.startSec}s – {seg.endSec}s
                  </div>
                  <div className="text-xs font-bold truncate">{seg.name}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Interactive Progress & Loop Region Bar */}
        <div className="space-y-1.5">
          <div className="relative h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            {/* Highlighted Loop Region [A .. B] */}
            {loopEnabled && duration > 0 && (
              <div
                style={{
                  left: `${(loopStart / duration) * 100}%`,
                  width: `${Math.max(2, ((loopEnd - loopStart) / duration) * 100)}%`,
                }}
                className="absolute top-0 bottom-0 bg-amber-400/35 border-x-2 border-amber-400"
              />
            )}
            {/* Playback Progress Fill */}
            <div
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              }}
              className="h-full bg-emerald-500 transition-all duration-75"
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
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls Row: Play/Pause, Loop A-B Controls, Tempo Multiplier, Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Play / Pause & Restart */}
        <div className="lg:col-span-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={togglePlay}
            className={`flex-1 py-3 px-5 rounded-2xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Jeda (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Putar Audio</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSeek(loopEnabled ? loopStart : 0)}
            title="Ulang dari Titik Awal"
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Loop A - B Controls */}
        <div className="lg:col-span-5 flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setLoopEnabled((l) => !l)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
              loopEnabled
                ? "bg-amber-400 text-slate-950"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Loop: {loopEnabled ? "AKTIF" : "MATI"}</span>
          </button>

          <button
            type="button"
            onClick={handleSetLoopA}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold hover:border-amber-400"
          >
            Set [A]: {formatTime(loopStart)}
          </button>

          <button
            type="button"
            onClick={handleSetLoopB}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold hover:border-amber-400"
          >
            Set [B]: {formatTime(loopEnd)}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="lg:col-span-3 flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setIsMuted((m) => !m)}
            aria-label="Mute Volume"
            className="text-slate-500 hover:text-emerald-500"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-500" />
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
            aria-label="Volume Pemutar"
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Tempo / Playback Rate Selector without Pitch Shift */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <Gauge className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Kecepatan Tempo Latihan (Tanpa Ubah Pitch):
          </span>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
            Perlambat hingga 0.5x untuk melatih bagian lagu yang sulit
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {TEMPO_RATES.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setPlaybackRate(rate)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                playbackRate === rate
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500/40"
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
