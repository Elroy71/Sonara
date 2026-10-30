"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Minus,
  Plus,
  RotateCcw,
  Volume2,
  Sliders,
  CheckCircle2,
  Music,
  Eye,
  Play,
  Pause,
  Smartphone,
  X,
  ChevronLeft,
  ChevronRight,
  Type,
  SunMedium,
} from "lucide-react";
import { DUMMY_SONGS } from "@/data/dummySongs";
import { useMusicApp } from "@/context/MusicAppContext";
import {
  CHROMATIC_SHARP,
  extractUniqueChords,
  getNoteIndex,
  transposeChord,
} from "@/lib/transpose";
import { InstrumentType } from "@/types/music";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";
import { playChordPreview } from "@/lib/audioSynth";

export default function SongDetailPage() {
  const params = useParams<{ id: string }>();
  const songIdOrSlug = params?.id || "";

  const song = useMemo(
    () => DUMMY_SONGS.find((s) => s.id === songIdOrSlug || s.slug === songIdOrSlug),
    [songIdOrSlug]
  );

  const {
    isFavoriteSong,
    toggleFavoriteSong,
    preferredInstrument,
    setPreferredInstrument,
    addPracticeSession,
  } = useMusicApp();

  const [selectedArrangementIdx, setSelectedArrangementIdx] = useState(0);
  const [transposeSemitones, setTransposeSemitones] = useState(0);
  const [activeChord, setActiveChord] = useState<string | null>(null);
  const [mobileChordSheetOpen, setMobileChordSheetOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<"lyrics-and-chords" | "chords-only">(
    "lyrics-and-chords"
  );
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<1 | 2 | 3>(1);
  const [fontScale, setFontScale] = useState<"sm" | "md" | "lg">("md");
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);
  const [sessionSavedToast, setSessionSavedToast] = useState(false);

  // Auto-scroll effect with adjustable speed for mobile reading
  useEffect(() => {
    if (!autoScroll) return;
    const msMap = { 1: 55, 2: 32, 3: 18 };
    const interval = setInterval(() => {
      window.scrollBy({ top: 1, behavior: "auto" });
    }, msMap[scrollSpeed]);
    return () => clearInterval(interval);
  }, [autoScroll, scrollSpeed]);

  // Screen Wake Lock API for mobile phones so screen doesn't turn off while playing guitar/bass
  useEffect(() => {
    let wakeLockSentinel: { release: () => Promise<void> } | null = null;

    async function requestWakeLock() {
      if (
        keepScreenAwake &&
        typeof navigator !== "undefined" &&
        "wakeLock" in navigator
      ) {
        try {
          wakeLockSentinel = await (
            navigator as unknown as {
              wakeLock: { request: (type: "screen") => Promise<{ release: () => Promise<void> }> };
            }
          ).wakeLock.request("screen");
        } catch {
          // Ignore if browser/OS declines wakeLock
        }
      }
    }

    requestWakeLock();

    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release().catch(() => {});
      }
    };
  }, [keepScreenAwake]);

  if (!song) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Lagu Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Maaf, lagu yang Anda cari tidak tersedia di dalam katalog.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>
      </div>
    );
  }

  const arrangement =
    song.arrangements[selectedArrangementIdx] || song.arrangements[0];

  const currentKey = transposeChord(song.key, transposeSemitones);
  const uniqueChords = extractUniqueChords(
    arrangement,
    transposeSemitones,
    currentKey
  );
  const highlightedChord = activeChord || uniqueChords[0] || currentKey;
  const fav = isFavoriteSong(song.id);

  // Compute semitone jump if user picks a key directly from dropdown
  const handleSelectTargetKey = (targetRoot: string) => {
    const isMinorSong = song.key.endsWith("m");
    const baseRoot = isMinorSong ? song.key.slice(0, -1) : song.key;
    const origIdx = getNoteIndex(baseRoot);
    const targetIdx = getNoteIndex(targetRoot);
    if (origIdx === -1 || targetIdx === -1) return;
    let diff = targetIdx - origIdx;
    if (diff > 6) diff -= 12;
    if (diff < -6) diff += 12;
    setTransposeSemitones(diff);
    setActiveChord(null);
  };

  const handleMarkPracticeComplete = () => {
    addPracticeSession({
      songId: song.id,
      songTitle: song.title,
      instrument: preferredInstrument,
      durationMinutes: Math.max(5, Math.round(song.durationSec / 60)),
      bpmUsed: song.bpm,
    });
    setSessionSavedToast(true);
    setTimeout(() => setSessionSavedToast(false), 3500);
  };

  const handleChordTap = (chordName: string) => {
    setActiveChord(chordName);
    playChordPreview(chordName, preferredInstrument);
    // On mobile viewports (<1024px), open the interactive chord bottom sheet drawer
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileChordSheetOpen(true);
    }
  };

  const currentChordIdx = Math.max(0, uniqueChords.indexOf(highlightedChord));
  const stepChord = (dir: -1 | 1) => {
    if (uniqueChords.length === 0) return;
    const nextIdx = (currentChordIdx + dir + uniqueChords.length) % uniqueChords.length;
    const nextChord = uniqueChords[nextIdx];
    setActiveChord(nextChord);
    playChordPreview(nextChord, preferredInstrument);
  };

  const lyricFontSizeClass =
    fontScale === "sm"
      ? "text-xs sm:text-sm"
      : fontScale === "lg"
      ? "text-base sm:text-lg"
      : "text-sm sm:text-base";

  const chordBadgeSizeClass =
    fontScale === "sm"
      ? "text-[11px] px-1.5 py-0.5"
      : fontScale === "lg"
      ? "text-sm px-2.5 py-1"
      : "text-xs px-2 py-0.5";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
      {/* Top Breadcrumb & Context-Preserving Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/practice?song=${song.slug}&bpm=${song.bpm}&ts=${encodeURIComponent(
              song.timeSignature
            )}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio Latihan ({song.bpm} BPM)</span>
          </Link>

          <button
            type="button"
            onClick={handleMarkPracticeComplete}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-emerald-500 hover:text-slate-950 transition-colors active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Selesai Latihan</span>
          </button>
        </div>
      </div>

      {sessionSavedToast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-xs font-medium flex items-center justify-between">
          <span>
            Sesi latihan untuk <strong>{song.title}</strong> ({preferredInstrument.toUpperCase()}) berhasil dicatat ke riwayat progres Anda!
          </span>
        </div>
      )}

      {/* Song Header Card */}
      <section
        className={`rounded-3xl bg-gradient-to-r ${song.coverGradient} p-5 sm:p-8 text-white shadow-xl`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-950/50 backdrop-blur-sm">
                {song.genre}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/50 backdrop-blur-sm">
                Level: {song.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-slate-950/50 text-emerald-300 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {song.rightsStatus}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {song.title}
            </h1>
            <p className="text-white/85 text-xs sm:text-base font-medium">
              Oleh <span className="underline decoration-white/40">{song.artist}</span>
            </p>
          </div>

          {/* Key, BPM, Time Signature Metrics (Grid on Mobile) */}
          <div className="grid grid-cols-4 sm:flex items-center gap-2 sm:gap-3">
            <div className="px-3 py-2.5 rounded-2xl bg-slate-950/55 backdrop-blur-md border border-white/10 text-center">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/70">
                Key
              </div>
              <div className="text-base sm:text-xl font-extrabold font-mono text-emerald-300">
                {currentKey}
              </div>
            </div>

            <div className="px-3 py-2.5 rounded-2xl bg-slate-950/55 backdrop-blur-md border border-white/10 text-center">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/70">
                Tempo
              </div>
              <div className="text-base sm:text-xl font-extrabold font-mono">{song.bpm}</div>
            </div>

            <div className="px-3 py-2.5 rounded-2xl bg-slate-950/55 backdrop-blur-md border border-white/10 text-center">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/70">
                Birama
              </div>
              <div className="text-base sm:text-xl font-extrabold font-mono">
                {song.timeSignature}
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavoriteSong(song.id)}
              className={`px-3 py-2.5 rounded-2xl border backdrop-blur-md flex flex-col items-center justify-center transition-colors active:scale-95 ${
                fav
                  ? "bg-rose-500 text-white border-rose-400"
                  : "bg-slate-950/55 text-white border-white/10"
              }`}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${fav ? "fill-white" : ""}`} />
              <span className="text-[9px] sm:text-[10px] font-semibold mt-0.5">
                {fav ? "Tersimpan" : "Favorit"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Studio Control Toolbar: Transpose, Instrument, Font Zoom, Wake Lock & Auto-Scroll */}
      <section className="p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Transpose Controls (Touch Friendly) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 px-2">
                Transpose:
              </span>
              <button
                type="button"
                onClick={() => {
                  setTransposeSemitones((s) => Math.max(-6, s - 1));
                  setActiveChord(null);
                }}
                aria-label="Turunkan Setengah Nada"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs font-bold px-2.5 min-w-[48px] text-center text-slate-900 dark:text-white">
                {transposeSemitones > 0 ? `+${transposeSemitones}` : transposeSemitones}
              </span>
              <button
                type="button"
                onClick={() => {
                  setTransposeSemitones((s) => Math.min(6, s + 1));
                  setActiveChord(null);
                }}
                aria-label="Naikkan Setengah Nada"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>

              {transposeSemitones !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setTransposeSemitones(0);
                    setActiveChord(null);
                  }}
                  title="Kembalikan ke Nada Dasar Asli"
                  className="p-2 rounded-lg text-xs text-slate-500 hover:text-emerald-500"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Direct Key Picker */}
            <select
              aria-label="Pilih Nada Dasar"
              value={currentKey.replace(/m$/, "")}
              onChange={(e) => handleSelectTargetKey(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
            >
              {CHROMATIC_SHARP.map((note) => (
                <option key={note} value={note}>
                  Key: {song.key.endsWith("m") ? `${note}m` : note}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile & Ergonomic Reading Controls: Font Size, WakeLock, AutoScroll */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Font Size Zoom for Mobile Stand */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <Type className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              {(["sm", "md", "lg"] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontScale(sz)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors ${
                    fontScale === sz
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {sz === "sm" ? "A-" : sz === "md" ? "A" : "A+"}
                </button>
              ))}
            </div>

            {/* Keep Screen Awake (Mobile Screen Wake Lock) */}
            <button
              type="button"
              onClick={() => setKeepScreenAwake((w) => !w)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors active:scale-95 ${
                keepScreenAwake
                  ? "border-amber-400 bg-amber-400/15 text-amber-500"
                  : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300"
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>{keepScreenAwake ? "Layar Menyala: ON" : "Layar Tetap Menyala"}</span>
            </button>

            {/* Auto Scroll + Speed */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setAutoScroll((a) => !a)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  autoScroll
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Scroll</span>
              </button>
              {([1, 2, 3] as const).map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setScrollSpeed(sp)}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold ${
                    scrollSpeed === sp
                      ? "bg-slate-800 text-emerald-400"
                      : "text-slate-500"
                  }`}
                >
                  {sp}x
                </button>
              ))}
            </div>

            {/* Display Mode Toggle */}
            <button
              type="button"
              onClick={() =>
                setDisplayMode((m) =>
                  m === "lyrics-and-chords" ? "chords-only" : "lyrics-and-chords"
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {displayMode === "lyrics-and-chords" ? "Lirik+Chord" : "Chord Saja"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE-ONLY: Swipeable Horizontal Chord Bar (Tap any chord to open Diagram Drawer) */}
      <section className="lg:hidden p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5" />
            Daftar Chord di Lagu Ini ({preferredInstrument.toUpperCase()}):
          </span>
          <button
            type="button"
            onClick={() => setMobileChordSheetOpen(true)}
            className="text-[11px] font-bold underline text-emerald-500"
          >
            Buka Panel Diagram
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {uniqueChords.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => handleChordTap(ch)}
              className={`shrink-0 px-3.5 py-2 rounded-xl font-mono text-xs font-extrabold transition-all active:scale-95 ${
                highlightedChord === ch
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </section>

      {/* Main Two-Column Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Interactive Chord & Lyric Sheet */}
        <div className="lg:col-span-7 space-y-4">
          {/* Strumming & Arrangement Selector Banner */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400">Strumming:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                {song.strummingPattern}
              </span>
            </div>

            {song.arrangements.length > 1 ? (
              <select
                aria-label="Pilih Versi Aransemen"
                value={selectedArrangementIdx}
                onChange={(e) => setSelectedArrangementIdx(Number(e.target.value))}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-semibold"
              >
                {song.arrangements.map((arr, idx) => (
                  <option key={arr.id} value={idx}>
                    {arr.arrangementName}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                Tuning: <strong className="text-slate-800 dark:text-slate-200">{arrangement.tuning}</strong>
              </span>
            )}
          </div>

          {/* Song Sections */}
          <div className="space-y-4">
            {arrangement.sections.map((section) => (
              <div
                key={section.id}
                className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/75 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    {section.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Tap chord untuk diagram & bunyi
                  </span>
                </div>

                <div className="space-y-4">
                  {section.lines.map((line, lineIdx) => (
                    <div
                      key={`${section.id}-line-${lineIdx}`}
                      className="flex flex-wrap items-end gap-x-3 gap-y-2.5 leading-relaxed"
                    >
                      {line.map((token, tokenIdx) => {
                        const transposed = transposeChord(
                          token.chord,
                          transposeSemitones,
                          currentKey
                        );
                        const isTokenSelected = highlightedChord === transposed;

                        return (
                          <div
                            key={`${section.id}-l${lineIdx}-t${tokenIdx}`}
                            className="inline-flex flex-col items-start"
                          >
                            {transposed ? (
                              <button
                                type="button"
                                onClick={() => handleChordTap(transposed)}
                                className={`mb-1 rounded-lg font-mono font-bold transition-all cursor-pointer active:scale-95 ${chordBadgeSizeClass} ${
                                  isTokenSelected
                                    ? "bg-emerald-500 text-slate-950 shadow-sm scale-105"
                                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30"
                                }`}
                              >
                                {transposed}
                              </button>
                            ) : (
                              <span className="mb-1 h-5" />
                            )}

                            {displayMode === "lyrics-and-chords" && (
                              <span
                                className={`${lyricFontSizeClass} text-slate-800 dark:text-slate-200 font-medium whitespace-pre-wrap`}
                              >
                                {token.lyrics}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Active Chord Inspector & All Song Chords Diagram Grid */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Active Chord Multi-Instrument Inspector */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                  Inspektur Diagram Aktif
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Chord {highlightedChord} (
                  {preferredInstrument === "guitar"
                    ? "Gitar"
                    : preferredInstrument === "bass"
                    ? "Bass"
                    : "Piano"}
                  )
                </h2>
              </div>
              <button
                type="button"
                onClick={() => playChordPreview(highlightedChord, preferredInstrument)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 active:scale-95 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Bunyikan</span>
              </button>
            </div>

            <ChordDiagramCard
              chordSymbol={highlightedChord}
              instrument={preferredInstrument}
              isSelected
            />
          </div>

          {/* All Unique Chords in Current Transposed Key */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Semua Chord di Lagu Ini ({uniqueChords.length} Chord)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nada Dasar: <strong className="text-emerald-500">{currentKey}</strong> · Instrumen:{" "}
                  <strong className="capitalize">{preferredInstrument}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {uniqueChords.map((chordName) => (
                <ChordDiagramCard
                  key={chordName}
                  chordSymbol={chordName}
                  instrument={preferredInstrument}
                  isSelected={highlightedChord === chordName}
                  onSelect={(ch) => {
                    setActiveChord(ch);
                    playChordPreview(ch, preferredInstrument);
                  }}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE INTERACTIVE BOTTOM SHEET: Appears when tapping any chord on mobile phone */}
      {mobileChordSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/65 backdrop-blur-xs">
          <div className="rounded-t-3xl border-t border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-2xl">
            {/* Sheet Header + Prev/Next Chord Stepper */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepChord(-1)}
                  aria-label="Chord Sebelumnya"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-500 block">
                    Chord {currentChordIdx + 1} dari {uniqueChords.length}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Diagram Chord {highlightedChord}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => stepChord(1)}
                  aria-label="Chord Berikutnya"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileChordSheetOpen(false)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1-Tap Instrument Switcher Inside Mobile Sheet */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
              {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => {
                    setPreferredInstrument(inst);
                    playChordPreview(highlightedChord, inst);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                    preferredInstrument === inst
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {inst === "guitar"
                    ? "🎸 Gitar"
                    : inst === "bass"
                    ? "🎸 Bass"
                    : "🎹 Piano"}
                </button>
              ))}
            </div>

            {/* Interactive SVG Card */}
            <ChordDiagramCard
              chordSymbol={highlightedChord}
              instrument={preferredInstrument}
              isSelected
            />

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => playChordPreview(highlightedChord, preferredInstrument)}
                className="py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-2 active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bunyikan {highlightedChord}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileChordSheetOpen(false)}
                className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs active:scale-95"
              >
                Kembali ke Lirik
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
