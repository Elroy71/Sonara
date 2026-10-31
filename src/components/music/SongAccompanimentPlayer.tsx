"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  Sliders,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronDown,
  Activity,
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
    if (isPlaying) {
      engine.pause();
    } else {
      engine.play();
    }
  };

  const handleReset = () => {
    engine.stop();
    setActiveStep(null);
    setCurrentBar(1);
    setCurrentBeat(1);
    onActiveChordStep?.(null);
  };

  const totalSteps = engine.getChordSteps().length;
  const progressPct = totalSteps > 0 ? (activeStepIndex / totalSteps) * 100 : 0;

  return (
    <div className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] p-4 sm:p-5 space-y-4 shadow-xs transition-colors">
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
            Putar untuk mendengarkan bagaimana lagu ini dimainkan dengan iringan nyata mengikuti chord di bawah.
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
              {Array.from({ length: song.timeSignature === "3/4" ? 3 : song.timeSignature === "6/8" ? 6 : 4 }).map((_, i) => {
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

      {/* Main Console: Play Button, Progress, Instrument Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Play/Pause & Scrub Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Jeda Musik Pengiring" : "Putar Musik Pengiring"}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-transform active:scale-95 shadow-md bg-amber-500 text-zinc-950 hover:bg-amber-400 shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Kembali ke awal lagu"
            className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-amber-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="space-y-1 min-w-[140px]">
            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {isPlaying ? "Sedang Memainkan Iringan..." : "Tekan Play untuk Mendengarkan"}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              {activeStep ? `[${activeStep.sectionName}] ${activeStep.lyrics || ""}` : `${song.title} · ${currentBpm} BPM`}
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

      {/* Visual Song Progress Bar */}
      <div className="w-full h-1.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div
          style={{ width: `${progressPct}%` }}
          className="h-full bg-amber-500 transition-all duration-300"
        />
      </div>
    </div>
  );
}
