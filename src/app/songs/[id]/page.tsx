"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Minus,
  Plus,
  RotateCcw,
  Volume2,
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
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
import { SongAccompanimentPlayer } from "@/components/music/SongAccompanimentPlayer";
import { AccompanimentChordStep } from "@/lib/songAccompanimentEngine";
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
    catalogFilter,
    addPracticeSession,
  } = useMusicApp();

  // Default to Mahir if user selected Mahir in catalog filter, otherwise Pemula (index 0)
  const [selectedArrangementIdx, setSelectedArrangementIdx] = useState(() =>
    catalogFilter.difficultyFilter === "Mahir" ? 1 : 0
  );
  const [transposeSemitones, setTransposeSemitones] = useState(0);
  const [activeChord, setActiveChord] = useState<string | null>(null);
  const [liveAccompanimentStep, setLiveAccompanimentStep] = useState<AccompanimentChordStep | null>(null);
  const [mobileChordSheetOpen, setMobileChordSheetOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<"lyrics-and-chords" | "chords-only">(
    "lyrics-and-chords"
  );
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<1 | 2 | 3>(1);
  const [fontScale, setFontScale] = useState<"sm" | "md" | "lg">("md");
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);
  const [sessionSavedToast, setSessionSavedToast] = useState(false);
  const [autoFollowLyrics, setAutoFollowLyrics] = useState(true);

  // Auto-scroll follow currently active lyrics line during playback
  useEffect(() => {
    if (!autoFollowLyrics || !liveAccompanimentStep) return;
    const lineId = `song-line-${liveAccompanimentStep.sectionId}-${liveAccompanimentStep.lineIndex}`;
    const el = document.getElementById(lineId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [liveAccompanimentStep, autoFollowLyrics]);

  useEffect(() => {
    if (!autoScroll) return;
    const msMap = { 1: 55, 2: 32, 3: 18 };
    const interval = setInterval(() => {
      window.scrollBy({ top: 1, behavior: "auto" });
    }, msMap[scrollSpeed]);
    return () => clearInterval(interval);
  }, [autoScroll, scrollSpeed]);

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
          // ignore
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
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          Lagu Tidak Ditemukan
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Maaf, lagu yang Anda cari tidak tersedia di dalam katalog.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-zinc-950 font-semibold text-xs"
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
  const highlightedChord = liveAccompanimentStep
    ? liveAccompanimentStep.transposedChord
    : activeChord || uniqueChords[0] || currentKey;
  const fav = isFavoriteSong(song.id);

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
      ? "text-sm px-2.5 py-0.5"
      : "text-xs px-2 py-0.5";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/practice?song=${song.slug}&bpm=${song.bpm}&ts=${encodeURIComponent(
              song.timeSignature
            )}`}
            className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-amber-500 transition-colors"
          >
            Buka Alat Latihan ({song.bpm} BPM)
          </Link>

          <button
            type="button"
            onClick={handleMarkPracticeComplete}
            className="px-3 py-1.5 rounded-md bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
          >
            Catat Sesi Latihan
          </button>
        </div>
      </div>

      {sessionSavedToast && (
        <div className="p-3 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium">
          Sesi latihan untuk <strong>{song.title}</strong> ({preferredInstrument.toUpperCase()}) telah dicatat.
        </div>
      )}

      {/* Editorial Song Header */}
      <section className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span>{song.genre}</span>
              <span>·</span>
              <span>{song.source}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {song.title}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {song.artist}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl pt-1">
              {song.description}
            </p>
          </div>

          {/* Technical Specs Box */}
          <div className="grid grid-cols-4 sm:flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-center min-w-[76px]">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Nada Dasar
              </div>
              <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
                {currentKey}
              </div>
            </div>

            <div className="px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-center min-w-[76px]">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Tempo
              </div>
              <div className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {song.bpm}
              </div>
            </div>

            <div className="px-3.5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-center min-w-[76px]">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Birama
              </div>
              <div className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {song.timeSignature}
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavoriteSong(song.id)}
              className={`px-3.5 py-2.5 rounded-md border flex flex-col items-center justify-center min-w-[76px] transition-colors ${
                fav
                  ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${fav ? "fill-amber-500 text-amber-500" : ""}`} />
              <span className="text-[10px] font-medium mt-1">
                {fav ? "Tersimpan" : "Simpan"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Dedicated Section Switcher: PEMULA vs MAHIR */}
      <section className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Pilih Mode Aransemen Chord
            </span>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {arrangement.difficulty === "Pemula" ? "Mode Pemula" : "Mode Mahir"}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:flex items-center border border-zinc-300 dark:border-zinc-700 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
            {song.arrangements.map((arr, idx) => {
              const isSelected = selectedArrangementIdx === idx;
              return (
                <button
                  key={arr.id}
                  type="button"
                  onClick={() => {
                    setSelectedArrangementIdx(idx);
                    setActiveChord(null);
                  }}
                  className={`px-4 py-2 text-xs font-semibold transition-colors border-r last:border-r-0 border-zinc-300 dark:border-zinc-700 ${
                    isSelected
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {arr.difficulty === "Pemula" ? "Mode Pemula" : "Mode Mahir"}
                </button>
              );
            })}
          </div>
        </div>

        {arrangement.notesSummary && (
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <p>{arrangement.notesSummary}</p>
            {arrangement.difficulty === "Mahir" && (
              <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600" />
                  Chord Utama
                </span>
                <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500/15 border border-dashed border-amber-500" />
                  Jembatan Chord (Passing)
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Interactive Song Accompaniment Player (Piano, Gitar & Bass) */}
      <SongAccompanimentPlayer
        song={song}
        arrangement={arrangement}
        transposeSemitones={transposeSemitones}
        currentKey={currentKey}
        onActiveChordStep={(step) => {
          setLiveAccompanimentStep(step);
          if (step) {
            setActiveChord(step.transposedChord);
          }
        }}
      />

      {/* Toolbar: Transpose, Font Size, Auto-Scroll, Display Mode */}
      <section className="p-3.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Transpose & Target Key */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-2.5">
              Transpose
            </span>
            <button
              type="button"
              onClick={() => {
                setTransposeSemitones((s) => Math.max(-6, s - 1));
                setActiveChord(null);
              }}
              aria-label="Turunkan Setengah Nada"
              className="p-2 border-l border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold px-2.5 min-w-[44px] text-center border-x border-zinc-300 dark:border-zinc-800">
              {transposeSemitones > 0 ? `+${transposeSemitones}` : transposeSemitones}
            </span>
            <button
              type="button"
              onClick={() => {
                setTransposeSemitones((s) => Math.min(6, s + 1));
                setActiveChord(null);
              }}
              aria-label="Naikkan Setengah Nada"
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setTransposeSemitones(0);
                setActiveChord(null);
              }}
              disabled={transposeSemitones === 0}
              title="Reset Nada Dasar"
              className={`p-2 border-l border-zinc-300 dark:border-zinc-800 transition-colors ${
                transposeSemitones !== 0
                  ? "text-zinc-600 dark:text-zinc-300 hover:text-amber-500 cursor-pointer"
                  : "text-zinc-400 dark:text-zinc-600 opacity-40 cursor-default"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <select
            aria-label="Pilih Nada Dasar"
            value={currentKey.replace(/m$/, "")}
            onChange={(e) => handleSelectTargetKey(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {CHROMATIC_SHARP.map((note) => (
              <option key={note} value={note}>
                Nada Dasar: {song.key.endsWith("m") ? `${note}m` : note}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Font Scale, Screen Awake, Auto-Scroll, View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Font Size */}
          <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setFontScale(sz)}
                className={`px-2.5 py-1.5 text-xs font-mono border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 ${
                  fontScale === sz
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {sz === "sm" ? "A-" : sz === "md" ? "A" : "A+"}
              </button>
            ))}
          </div>

          {/* Auto Scroll */}
          <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
            <button
              type="button"
              onClick={() => setAutoScroll((a) => !a)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-r border-zinc-300 dark:border-zinc-800 ${
                autoScroll
                  ? "bg-amber-500 text-zinc-950 font-semibold"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>Gulir Otomatis</span>
            </button>
            {([1, 2, 3] as const).map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setScrollSpeed(sp)}
                className={`px-2 py-1.5 font-mono text-xs border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 ${
                  scrollSpeed === sp
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                    : "text-zinc-500"
                }`}
              >
                {sp}x
              </button>
            ))}
          </div>

          {/* Screen Awake */}
          <button
            type="button"
            onClick={() => setKeepScreenAwake((w) => !w)}
            className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
              keepScreenAwake
                ? "border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {keepScreenAwake ? "Layar Menyala: Aktif" : "Tahan Layar"}
          </button>

          {/* Auto-Follow Lyrics */}
          <button
            type="button"
            onClick={() => setAutoFollowLyrics((f) => !f)}
            className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
              autoFollowLyrics
                ? "border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {autoFollowLyrics ? "Ikuti Lirik: Aktif" : "Ikuti Lirik: Nonaktif"}
          </button>

          {/* Lyrics / Chords-only mode */}
          <button
            type="button"
            onClick={() =>
              setDisplayMode((m) =>
                m === "lyrics-and-chords" ? "chords-only" : "lyrics-and-chords"
              )
            }
            className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-medium text-zinc-700 dark:text-zinc-300"
          >
            {displayMode === "lyrics-and-chords" ? "Tampilan: Lirik + Chord" : "Tampilan: Chord Saja"}
          </button>
        </div>
      </section>

      {/* Mobile Chord Strip */}
      <section className="lg:hidden p-3.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            Daftar Chord ({arrangement.difficulty} · {preferredInstrument === "guitar" ? "Gitar" : preferredInstrument === "bass" ? "Bass" : "Piano"}):
          </span>
          <button
            type="button"
            onClick={() => setMobileChordSheetOpen(true)}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 underline"
          >
            Buka Diagram
          </button>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {uniqueChords.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => handleChordTap(ch)}
              className={`shrink-0 px-3 py-1.5 rounded-sm font-mono text-xs font-semibold border transition-colors ${
                highlightedChord === ch
                  ? "bg-amber-500 text-zinc-950 border-amber-500"
                  : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </section>

      {/* Two-Column Sheet & Diagrams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Song Sheet */}
        <div className="lg:col-span-7 space-y-4">
          {/* Strumming & Tuning Bar */}
          <div className="p-3.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 dark:text-zinc-400">Pola Iringan:</span>
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 bg-[#f6f5f2] dark:bg-[#0d0d0f] px-2 py-0.5 rounded-xs border border-zinc-200 dark:border-zinc-800">
                {song.strummingPattern}
              </span>
            </div>

            <span className="text-zinc-500 dark:text-zinc-400">
              Mode Aktif: <strong className="text-amber-600 dark:text-amber-400">{arrangement.difficulty}</strong>
            </span>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {arrangement.sections.map((section) => (
              <div
                key={section.id}
                className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    [{section.name}]
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Klik chord untuk melihat posisi jari
                  </span>
                </div>

                <div className="space-y-4">
                  {section.lines.map((line, lineIdx) => {
                    const isLineActive = Boolean(
                      liveAccompanimentStep &&
                      liveAccompanimentStep.sectionId === section.id &&
                      liveAccompanimentStep.lineIndex === lineIdx
                    );

                    return (
                      <div
                        key={`${section.id}-line-${lineIdx}`}
                        id={`song-line-${section.id}-${lineIdx}`}
                        className={`transition-all duration-200 rounded-lg p-2.5 sm:p-3 relative scroll-mt-28 ${
                          isLineActive
                            ? "bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-500 ring-1 ring-amber-500/30 shadow-xs"
                            : "border-l-4 border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40"
                        }`}
                      >
                        {/* Active Line Status Tracker Pill */}
                        {isLineActive && (
                          <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            <span className="uppercase tracking-wider">Sedang Dimainkan:</span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-end gap-x-2.5 gap-y-3 leading-relaxed">
                          {line.map((token, tokenIdx) => {
                            const transposed = transposeChord(
                              token.chord,
                              transposeSemitones,
                              currentKey
                            );
                            const isPlayingStep = Boolean(
                              liveAccompanimentStep &&
                              liveAccompanimentStep.sectionId === section.id &&
                              liveAccompanimentStep.lineIndex === lineIdx &&
                              liveAccompanimentStep.tokenIndex === tokenIdx
                            );
                            const isUserTapped = Boolean(activeChord && activeChord === transposed);
                            const isBridgeChord = Boolean(token.isBridge);

                            return (
                              <div
                                key={`${section.id}-l${lineIdx}-t${tokenIdx}`}
                                className={`relative inline-flex flex-col items-start transition-all duration-150 ${
                                  isPlayingStep ? "scale-105 z-10" : ""
                                }`}
                              >
                                {/* Floating Active Word Pointer */}
                                {isPlayingStep && (
                                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 animate-bounce">
                                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[9px] font-black uppercase tracking-wider shadow-md whitespace-nowrap border border-amber-300">
                                      Kini
                                    </span>
                                    <span className="w-0 h-0 border-x-[3px] border-x-transparent border-t-[4px] border-t-amber-500 -mt-0.5" />
                                  </div>
                                )}

                                {transposed ? (
                                  <button
                                    type="button"
                                    onClick={() => handleChordTap(transposed)}
                                    title={
                                      isBridgeChord
                                        ? `Jembatan Chord (Passing): ${transposed}`
                                        : `Chord Utama: ${transposed}`
                                    }
                                    className={`mb-1 rounded-xs font-mono font-bold transition-all cursor-pointer ${chordBadgeSizeClass} ${
                                      isPlayingStep
                                        ? "bg-amber-500 text-zinc-950 border-2 border-amber-300 ring-4 ring-amber-500/40 shadow-md font-black scale-110"
                                        : isUserTapped
                                        ? "bg-amber-500 text-zinc-950 border border-amber-500 shadow-xs"
                                        : isBridgeChord
                                        ? "bg-amber-500/10 border border-dashed border-amber-500/80 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                                        : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:border-amber-500"
                                    }`}
                                  >
                                    {transposed}
                                  </button>
                                ) : (
                                  <span className="mb-1 h-5" />
                                )}

                                {displayMode === "lyrics-and-chords" && (
                                  <span
                                    className={`${lyricFontSizeClass} transition-all duration-150 whitespace-pre-wrap ${
                                      isPlayingStep
                                        ? "text-amber-800 dark:text-amber-200 font-extrabold bg-amber-500/25 dark:bg-amber-500/35 px-1.5 py-0.5 rounded-md ring-2 ring-amber-500/60 shadow-xs"
                                        : isLineActive
                                        ? "text-zinc-950 dark:text-zinc-50 font-medium"
                                        : "text-zinc-800 dark:text-zinc-300"
                                    }`}
                                  >
                                    {token.lyrics}
                                    {isPlayingStep && (
                                      <span className="inline-flex items-center gap-0.5 ml-1 align-middle">
                                        <span className="w-1 h-2.5 bg-amber-500 animate-pulse rounded-full" />
                                        <span className="w-1 h-3.5 bg-amber-500 animate-pulse rounded-full delay-100" />
                                      </span>
                                    )}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chord Inspector & All Song Chords */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  Diagram Posisi Jari
                </span>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Chord {highlightedChord} —{" "}
                  {preferredInstrument === "guitar"
                    ? "Gitar"
                    : preferredInstrument === "bass"
                    ? "Bass"
                    : "Piano"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => playChordPreview(highlightedChord, preferredInstrument)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
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

          <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Chord Mode {arrangement.difficulty} ({uniqueChords.length} Chord)
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                Key: {currentKey}
              </span>
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

      {/* Mobile Bottom Drawer for Chord Diagram */}
      {mobileChordSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/65">
          <div className="border-t border-zinc-700 bg-[#f6f5f2] dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepChord(-1)}
                  aria-label="Chord Sebelumnya"
                  className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                    Chord {currentChordIdx + 1} / {uniqueChords.length} ({arrangement.difficulty})
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Diagram Chord {highlightedChord}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => stepChord(1)}
                  aria-label="Chord Berikutnya"
                  className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileChordSheetOpen(false)}
                className="p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => {
                    setPreferredInstrument(inst);
                    playChordPreview(highlightedChord, inst);
                  }}
                  className={`py-2 rounded-md text-xs font-semibold border transition-colors ${
                    preferredInstrument === inst
                      ? "bg-amber-500 text-zinc-950 border-amber-500"
                      : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {inst === "guitar" ? "Gitar" : inst === "bass" ? "Bass" : "Piano"}
                </button>
              ))}
            </div>

            <ChordDiagramCard
              chordSymbol={highlightedChord}
              instrument={preferredInstrument}
              isSelected
            />

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => playChordPreview(highlightedChord, preferredInstrument)}
                className="py-2.5 rounded-md bg-amber-500 text-zinc-950 font-semibold text-xs inline-flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bunyikan {highlightedChord}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileChordSheetOpen(false)}
                className="py-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-semibold text-xs"
              >
                Tutup Diagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
