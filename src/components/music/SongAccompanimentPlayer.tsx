"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Sliders,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronDown,
  Activity,
  Keyboard,
} from "lucide-react";
import {
  SongAccompanimentEngine,
  AccompanimentChordStep,
  AccompanimentPreset,
} from "@/lib/songAccompanimentEngine";
import { Song, ChordChartArrangement } from "@/types/music";

interface SongAccompanimentPlayerProps {
  song: Song;
  arrangement: ChordChartArrangement;
  transposeSemitones: number;
  currentKey: string;
  onActiveChordStep?: (step: AccompanimentChordStep | null) => void;
}

export function SongAccompanimentPlayer({
  song,
  arrangement,
  transposeSemitones,
  currentKey,
  onActiveChordStep,
}: SongAccompanimentPlayerProps) {
  const [engine] = useState<SongAccompanimentEngine>(() => new SongAccompanimentEngine());

  const topConsoleRef = useRef<HTMLDivElement>(null);
  const [isScrolledPastTop, setIsScrolledPastTop] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<AccompanimentChordStep | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [currentBar, setCurrentBar] = useState<number>(1);
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [currentBpm, setCurrentBpm] = useState<number>(song.bpm || 76);

  // Mixer config state
  const [pianoOn, setPianoOn] = useState<boolean>(true);
  const [guitarOn, setGuitarOn] = useState<boolean>(true);
  const [bassOn, setBassOn] = useState<boolean>(true);
  const [masterVol, setMasterVol] = useState<number>(0.88);
  const [activePreset, setActivePreset] = useState<AccompanimentPreset>("trio");

  // Track scroll position to show floating mobile/desktop player
  useEffect(() => {
    const el = topConsoleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledPastTop(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load song into engine on mount or when arrangement changes
  useEffect(() => {
    engine.loadSongArrangement(
      arrangement,
      song.bpm,
      song.timeSignature as "4/4" | "3/4" | "6/8",
      transposeSemitones,
      currentKey
    );
    setCurrentBpm(song.bpm);

    const handleStep = (step: AccompanimentChordStep, idx: number) => {
      setActiveStep(step);
      setActiveStepIndex(idx);
      onActiveChordStep?.(step);
    };

    const handleBeat = (bar: number, beat: number) => {
      setCurrentBar(bar);
      setCurrentBeat(beat);
    };

    const handleState = (playing: boolean) => {
      setIsPlaying(playing);
      if (!playing) {
        onActiveChordStep?.(null);
      }
    };

    engine.onStepChange(handleStep);
    engine.onBeat(handleBeat);
    engine.onStateChange(handleState);

    return () => {
      engine.stop();
    };
  }, [song, arrangement, engine]);

  // Keep transpose synchronized with parent page
  useEffect(() => {
    engine.setTranspose(transposeSemitones, currentKey);
  }, [transposeSemitones, currentKey, engine]);

  // Sync mixer
  const handleTogglePiano = () => {
    const next = !pianoOn;
    setPianoOn(next);
    engine.setMixerConfig({ pianoEnabled: next });
  };

  const handleToggleGuitar = () => {
    const next = !guitarOn;
    setGuitarOn(next);
    engine.setMixerConfig({ guitarEnabled: next });
  };

  const handleToggleBass = () => {
    const next = !bassOn;
    setBassOn(next);
    engine.setMixerConfig({ bassEnabled: next });
  };

  const handleSelectPreset = (p: AccompanimentPreset) => {
    setActivePreset(p);
    engine.applyPreset(p);
    const cfg = engine.getMixerConfig();
    setPianoOn(cfg.pianoEnabled);
    setGuitarOn(cfg.guitarEnabled);
    setBassOn(cfg.bassEnabled);
  };

  const handleBpmChange = (newBpm: number) => {
    setCurrentBpm(newBpm);
    engine.setBpm(newBpm);
  };

  const handleTogglePlay = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(18);
    }
    if (isPlaying) {
      engine.pause();
    } else {
      engine.play();
    }
  };

  const handleRewind = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
    engine.rewind(1);
  };

  const handleForward = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
    engine.forward(1);
  };

  const handleReset = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
    engine.stop();
    setActiveStep(null);
    setCurrentBar(1);
    setCurrentBeat(1);
    onActiveChordStep?.(null);
  };

  // Keyboard Shortcuts: Space = Play/Pause, ArrowLeft = Rewind, ArrowRight = Forward, R = Reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleRewind();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleForward();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, engine]);

  const totalSteps = engine.getChordSteps().length;
  const progressPct = totalSteps > 0 ? (activeStepIndex / totalSteps) * 100 : 0;

  return (
    <>
      {/* Top Main Console Card */}
      <div
        ref={topConsoleRef}
        className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] p-4 sm:p-5 space-y-4 shadow-xs transition-colors"
      >
        {/* Top Strip: Header & Live Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500 font-bold">
                Musik Pengiring Otomatis
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Audio Referensi Pengiring: Piano, Gitar & Bass
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Iringan realistis dengan melodi vokal asli pada instrumen dan ketukan bass yang mengunci kick drum.
            </p>
          </div>

          {/* Live Active Chord & Beat Badge */}
          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <div className="px-3 py-1 rounded-md bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-center min-w-[70px]">
              <div className="text-[10px] font-mono uppercase text-zinc-500">
                Akor Aktif
              </div>
              <div className="text-base font-mono font-bold text-amber-600 dark:text-amber-400">
                {activeStep ? activeStep.transposedChord : currentKey}
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-md bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-center min-w-[95px]">
              <div className="text-[10px] font-mono uppercase text-zinc-500">
                Birama & Ketuk
              </div>
              <div className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                Bar {String(currentBar).padStart(2, "0")} · Ketuk {currentBeat}
              </div>
              {/* Visual Beat Indicator Dots */}
              <div className="flex items-center justify-center gap-1 mt-1">
                {Array.from({
                  length: song.timeSignature === "3/4" ? 3 : song.timeSignature === "6/8" ? 6 : 4,
                }).map((_, i) => {
                  const isCurrent = currentBeat === i + 1;
                  const isDownbeat = i === 0;
                  return (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-75 ${
                        isCurrent
                          ? isDownbeat
                            ? "w-4 bg-amber-500 shadow-xs"
                            : "w-3 bg-amber-400"
                          : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Console: Play, Rewind, Forward, Reset, Progress, Instrument Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Play/Pause & Seek Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Rewind Button (Mundurin 1 Bagian) */}
            <button
              type="button"
              onClick={handleRewind}
              title="Mundurin 1 Akor / Birama (Shortcut: ←)"
              aria-label="Mundurin Lagu"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95 transition-all shadow-xs"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play / Pause Main Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Jeda Musik Pengiring (Spasi)" : "Putar Musik Pengiring (Spasi)"}
              title={isPlaying ? "Jeda (Spasi)" : "Putar (Spasi)"}
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold transition-all active:scale-95 shadow-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 shrink-0 ring-4 ring-amber-500/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward Button (Maju 1 Bagian) */}
            <button
              type="button"
              onClick={handleForward}
              title="Maju 1 Akor / Birama (Shortcut: →)"
              aria-label="Maju Lagu"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95 transition-all shadow-xs"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Reset to Start */}
            <button
              type="button"
              onClick={handleReset}
              title="Kembali ke awal lagu (Shortcut: R)"
              aria-label="Kembali ke Awal"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 active:scale-95 transition-all ml-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="space-y-0.5 ml-1.5 min-w-[130px]">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>{isPlaying ? "Iringan Aktif" : "Iringan Siap"}</span>
                {isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[170px]">
                {activeStep
                  ? `[${activeStep.sectionName}] ${activeStep.lyrics || activeStep.transposedChord}`
                  : `${song.title} · ${currentBpm} BPM`}
              </div>
            </div>
          </div>

          {/* 3-Instrument Toggles (Piano, Gitar, Bass) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 mr-1">Instrumen:</span>

            {/* Piano Toggle */}
            <button
              type="button"
              onClick={handleTogglePiano}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${
                pianoOn
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-400 opacity-60"
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Piano</span>
            </button>

            {/* Guitar Toggle */}
            <button
              type="button"
              onClick={handleToggleGuitar}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${
                guitarOn
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-400 opacity-60"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Gitar</span>
            </button>

            {/* Bass Toggle */}
            <button
              type="button"
              onClick={handleToggleBass}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${
                bassOn
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-400 opacity-60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bass</span>
            </button>
          </div>

          {/* Quick Style Presets & Tempo Adjuster */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Presets */}
            <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-zinc-900 text-xs font-medium">
              {(
                [
                  { id: "trio", label: "Trio Lengkap" },
                  { id: "piano-only", label: "Solo Piano" },
                  { id: "guitar-only", label: "Solo Gitar" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`px-2.5 py-1.5 border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 transition-colors ${
                    activePreset === p.id
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Tempo BPM Adjuster */}
            <div className="flex items-center gap-1 bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md px-2 py-1 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-mono">BPM:</span>
              <button
                type="button"
                onClick={() => handleBpmChange(Math.max(45, currentBpm - 4))}
                className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold flex items-center justify-center hover:border-amber-500"
              >
                -
              </button>
              <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 w-7 text-center">
                {currentBpm}
              </span>
              <button
                type="button"
                onClick={() => handleBpmChange(Math.min(180, currentBpm + 4))}
                className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold flex items-center justify-center hover:border-amber-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint Pill (Visible on Desktop / Tablets) */}
        <div className="hidden sm:flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 px-3 py-1.5 rounded-md bg-[#f6f5f2] dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Shortcut Keyboard:</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold">
                Spasi
              </kbd>{" "}
              Jeda / Putar
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold">
                ←
              </kbd>{" "}
              Mundurin
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold">
                →
              </kbd>{" "}
              Maju
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold">
                R
              </kbd>{" "}
              Ulang
            </span>
          </div>
        </div>

        {/* Visual Song Progress Bar */}
        <div className="w-full h-1.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            style={{ width: `${progressPct}%` }}
            className="h-full bg-amber-500 transition-all duration-300"
          />
        </div>
      </div>

      {/* Floating Ergonomic Mobile & Desktop Bottom Controller */}
      <div
        className={`fixed z-40 transition-all duration-300 ${
          isScrolledPastTop || isPlaying
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-14 opacity-0 pointer-events-none md:hidden"
        } bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-[420px]`}
      >
        <div className="backdrop-blur-xl bg-white/95 dark:bg-[#121217]/95 border-2 border-amber-500/40 dark:border-amber-500/50 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-2.5 ring-1 ring-black/10 dark:ring-white/10">
          {/* Active Chord & Bar Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-zinc-950 flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="text-[9px] font-mono font-bold leading-none uppercase opacity-80">
                Akor
              </span>
              <span className="text-base font-mono font-black leading-none mt-0.5">
                {activeStep ? activeStep.transposedChord : currentKey}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5">
                <span>
                  Bar {String(currentBar).padStart(2, "0")} · Ketuk {currentBeat}
                </span>
                {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[110px] sm:max-w-[150px]">
                {activeStep?.lyrics || song.title}
              </div>
            </div>
          </div>

          {/* Big Thumb-Friendly Tactile Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Rewind */}
            <button
              type="button"
              onClick={handleRewind}
              title="Mundurin Lagu (←)"
              aria-label="Mundurin Lagu"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0eee9] dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-100 hover:text-amber-500 active:scale-90 transition-transform shadow-xs"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={handleTogglePlay}
              title={isPlaying ? "Jeda (Spasi)" : "Putar (Spasi)"}
              aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500 text-zinc-950 font-bold active:scale-90 transition-transform shadow-lg hover:bg-amber-400"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward */}
            <button
              type="button"
              onClick={handleForward}
              title="Maju Lagu (→)"
              aria-label="Maju Lagu"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0eee9] dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-100 hover:text-amber-500 active:scale-90 transition-transform shadow-xs"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              title="Ulang Dari Awal (R)"
              aria-label="Ulang Dari Awal"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 active:scale-90 transition-transform"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
