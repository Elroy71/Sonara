"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Upload,
  Download,
  Repeat,
  Sliders,
  Mic,
  Disc,
  Music,
  CheckCircle2,
  X,
  Clock,
  Layers,
  ChevronDown,
  Activity,
  ArrowUpRight,
  Info,
  Radio,
} from "lucide-react";
import {
  STUDIO_DEMO_PRESETS,
  StudioTrackPreset,
  SongSectionMarker,
  ChordTiming,
} from "@/data/aiStudioPresets";
import {
  StemAudioEngine,
  StemId,
  StemChannelState,
} from "@/lib/stemAudioEngine";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";
import { useMusicApp } from "@/context/MusicAppContext";

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function formatBarsBeats(sec: number, bpm: number, beatsPerBar = 4): string {
  const beatDuration = 60 / bpm;
  const totalBeats = Math.floor(sec / beatDuration);
  const bar = Math.floor(totalBeats / beatsPerBar) + 1;
  const beat = (totalBeats % beatsPerBar) + 1;
  return `Bar ${String(bar).padStart(2, "0")} · Ketuk ${beat}`;
}

const SPEED_OPTIONS = [
  { rate: 0.5, label: "0.5x" },
  { rate: 0.75, label: "0.75x" },
  { rate: 0.85, label: "0.85x" },
  { rate: 1.0, label: "1.0x" },
  { rate: 1.15, label: "1.15x" },
  { rate: 1.25, label: "1.25x" },
];

export default function AiStudioPage() {
  const { preferredInstrument } = useMusicApp();

  const [engine] = useState<StemAudioEngine>(() => new StemAudioEngine());
  const [selectedPreset, setSelectedPreset] = useState<StudioTrackPreset>(
    STUDIO_DEMO_PRESETS[0]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(STUDIO_DEMO_PRESETS[0].durationSec);

  // Live Peak Meters (0-100) per stem
  const [peakLevels, setPeakLevels] = useState<Record<StemId, number>>({
    vocals: 0,
    drums: 0,
    bass: 0,
    instruments: 0,
  });

  // Stem state mirror for reactivity
  const [stemStates, setStemStates] = useState<Record<StemId, StemChannelState>>(
    engine.states
  );

  // Speed & Transpose Pitch
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [pitchSemitones, setPitchSemitones] = useState<number>(0);

  // Smart Metronome Click Track
  const [clickActive, setClickActive] = useState<boolean>(false);

  // Loop A-B state
  const [loopState, setLoopState] = useState<{ enabled: boolean; a: number; b: number }>({
    enabled: false,
    a: 0,
    b: 0,
  });

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);
  const [uploadProcessStep, setUploadProcessStep] = useState<string>("");
  const [uploadProgressPct, setUploadProgressPct] = useState<number>(0);

  // Export modal state
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  // Active Chord Modal state
  const [chordModalOpen, setChordModalOpen] = useState<boolean>(false);
  const [modalChordSymbol, setModalChordSymbol] = useState<string>("G");

  // Load preset on mount or when switching preset
  useEffect(() => {
    let active = true;
    engine.loadPreset(selectedPreset).then(() => {
      if (active) {
        setDuration(selectedPreset.durationSec);
        setLoopState({ enabled: false, a: 0, b: selectedPreset.durationSec });
        setStemStates({ ...engine.states });
        setCurrentTime(0);
        setIsPlaying(false);
      }
    });

    const listener = {
      onTimeUpdate: (cur: number, tot: number) => {
        setCurrentTime(cur);
        setDuration(tot);
      },
      onMeterUpdate: (levels: Record<StemId, number>) => {
        setPeakLevels({ ...levels });
      },
      onStateChange: (playing: boolean) => {
        setIsPlaying(playing);
      },
    };

    engine.addListener(listener);

    return () => {
      active = false;
      engine.removeListener(listener);
      engine.stop();
    };
  }, [selectedPreset, engine]);

  // Keyboard shortcut: Spacebar to toggle Play/Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        if (engine.getIsPlaying()) {
          engine.pause();
        } else {
          engine.play();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [engine]);

  // Current detected chord matching playback second
  const activeChordTiming = useMemo<ChordTiming | null>(() => {
    if (!selectedPreset.chords?.length) return null;
    return (
      selectedPreset.chords.find(
        (c) =>
          currentTime >= c.timeSec &&
          currentTime < c.timeSec + c.durationSec
      ) || selectedPreset.chords[0]
    );
  }, [selectedPreset.chords, currentTime]);

  // Upcoming chord preview
  const nextChordTiming = useMemo<ChordTiming | null>(() => {
    if (!selectedPreset.chords?.length || !activeChordTiming) return null;
    const idx = selectedPreset.chords.indexOf(activeChordTiming);
    return selectedPreset.chords[idx + 1] || null;
  }, [selectedPreset.chords, activeChordTiming]);

  // Transpose displayed chord if user adjusts pitch
  const displayedChord = useMemo(() => {
    if (!activeChordTiming) return "G";
    return activeChordTiming.chord;
  }, [activeChordTiming]);

  // Active section marker
  const activeSection = useMemo<SongSectionMarker | null>(() => {
    return (
      selectedPreset.sections.find(
        (s) => currentTime >= s.startSec && currentTime < s.endSec
      ) || selectedPreset.sections[0]
    );
  }, [selectedPreset.sections, currentTime]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      engine.pause();
    } else {
      engine.play();
    }
  };

  const handleSeek = (newSec: number) => {
    engine.seek(newSec);
    setCurrentTime(newSec);
  };

  const handleSetVolume = (id: StemId, val: number) => {
    engine.setStemVolume(id, val);
    setStemStates({ ...engine.states });
  };

  const handleToggleMute = (id: StemId) => {
    engine.toggleStemMute(id);
    setStemStates({ ...engine.states });
  };

  const handleToggleSolo = (id: StemId) => {
    engine.toggleStemSolo(id);
    setStemStates({ ...engine.states });
  };

  const handleSetPan = (id: StemId, panVal: number) => {
    engine.setStemPan(id, panVal);
    setStemStates({ ...engine.states });
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackSpeed(rate);
    engine.setPlaybackRate(rate);
  };

  const handlePitchChange = (delta: number) => {
    const next = Math.max(-5, Math.min(5, pitchSemitones + delta));
    setPitchSemitones(next);
    engine.setPitchSemitones(next);
  };

  const handleResetPitch = () => {
    setPitchSemitones(0);
    engine.setPitchSemitones(0);
  };

  const handleToggleClick = () => {
    const next = !clickActive;
    setClickActive(next);
    engine.toggleClickTrack(next);
  };

  const handleSetLoopPointA = () => {
    engine.setLoopA(currentTime);
    engine.toggleLoop(true);
    setLoopState(engine.getLoopState());
  };

  const handleSetLoopPointB = () => {
    engine.setLoopB(currentTime);
    engine.toggleLoop(true);
    setLoopState(engine.getLoopState());
  };

  const handleToggleLoop = () => {
    const next = !loopState.enabled;
    engine.toggleLoop(next);
    setLoopState(engine.getLoopState());
  };

  // Upload Audio Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    setUploadProgressPct(15);
    setUploadProcessStep("Memeriksa format & decoding spektrogram audio...");

    setTimeout(() => {
      setUploadProgressPct(45);
      setUploadProcessStep("Memisahkan spektrum vokal (Center Mid-Side)...");
    }, 600);

    setTimeout(() => {
      setUploadProgressPct(75);
      setUploadProcessStep("Mengekstraksi ketukan drum & frekuensi sub-bass...");
    }, 1200);

    setTimeout(() => {
      setUploadProgressPct(95);
      setUploadProcessStep("Sinkronisasi grid tempo & deteksi akor...");
    }, 1800);

    setTimeout(async () => {
      const res = await engine.loadUserAudioFile(file);
      setUploadProgressPct(100);
      setUploadProcessStep("Trek audio berhasil dipisahkan!");

      setTimeout(() => {
        setIsProcessingUpload(false);
        setUploadModalOpen(false);
        setUploadProgressPct(0);
        setSelectedPreset({
          id: "custom-upload",
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: "File Audio Lokal",
          genre: "Worship",
          key: res.key,
          originalKey: res.key,
          bpm: res.bpm,
          timeSignature: "4/4",
          durationSec: Math.round(engine.getTotalDuration()),
          description: "Audio lokal diproses langsung di peramban secara aman dan tanpa batasan durasi.",
          sections: [
            { id: "c-1", name: "Intro", label: "Intro", startSec: 0, endSec: Math.round(engine.getTotalDuration() * 0.22), color: "bg-zinc-600" },
            { id: "c-2", name: "Bait Utama", label: "Bait", startSec: Math.round(engine.getTotalDuration() * 0.22), endSec: Math.round(engine.getTotalDuration() * 0.6), color: "bg-sky-600" },
            { id: "c-3", name: "Reff", label: "Reff", startSec: Math.round(engine.getTotalDuration() * 0.6), endSec: Math.round(engine.getTotalDuration() * 0.88), color: "bg-amber-600" },
            { id: "c-4", name: "Ending", label: "Ending", startSec: Math.round(engine.getTotalDuration() * 0.88), endSec: Math.round(engine.getTotalDuration()), color: "bg-emerald-600" },
          ],
          chords: [
            { chord: "G", timeSec: 0, durationSec: 4 },
            { chord: "C", timeSec: 4, durationSec: 4 },
            { chord: "Em", timeSec: 8, durationSec: 4 },
            { chord: "D", timeSec: 12, durationSec: 4 },
          ],
          stemProfiles: { vocals: [], drums: [], bass: [], instruments: [] },
        });
      }, 500);
    }, 2400);
  };

  const handleExportTrack = (type: "minus-one" | "acapella" | "rhythm") => {
    const url = engine.exportWav(type);
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    const safeName = selectedPreset.title.toLowerCase().replace(/\s+/g, "-");
    a.download = `sonara-${safeName}-${type}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setExportModalOpen(false);
  };

  const anySoloed = Object.values(stemStates).some((s) => s.soloed);

  return (
    <div className="min-h-screen bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100 flex flex-col pb-36 transition-colors">
      {/* 1. Hardware Console Top Bar */}
      <header className="border-b border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-[#141417]/95 backdrop-blur-xs px-4 sm:px-6 py-3 sticky top-16 z-30 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Track Info & Preset Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-amber-600 dark:text-amber-500 shadow-xs">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {selectedPreset.title}
                  </h1>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                    4-Track Console
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {selectedPreset.artist} · {selectedPreset.genre}
                </p>
              </div>
            </div>

            {/* Song Preset Selector Dropdown */}
            <div className="relative inline-block text-left ml-0 sm:ml-2">
              <select
                aria-label="Pilih lagu demo studio"
                value={selectedPreset.id}
                onChange={(e) => {
                  const found = STUDIO_DEMO_PRESETS.find(
                    (p) => p.id === e.target.value
                  );
                  if (found) setSelectedPreset(found);
                }}
                className="bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold rounded-md px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer pr-7"
              >
                {STUDIO_DEMO_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    Repertoar: {p.title} ({p.bpm} BPM)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Console Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {/* Song Specs */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900/80 px-3 py-1.5 rounded-md">
              <span>Nada Dasar: <strong className="text-zinc-900 dark:text-zinc-200">{selectedPreset.key}</strong></span>
              <span>·</span>
              <span>Tempo: <strong className="text-zinc-900 dark:text-zinc-200">{selectedPreset.bpm} BPM</strong></span>
              <span>·</span>
              <span>Birama: <strong className="text-zinc-900 dark:text-zinc-200">{selectedPreset.timeSignature}</strong></span>
            </div>

            {/* Upload Custom Audio */}
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-amber-500 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
              <span>Buka File Audio</span>
            </button>

            {/* Export Minus-One / Stems */}
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Trek</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Studio Console Work Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Hardware Status Strip */}
        <div className="p-3.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs transition-colors">
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300">
              <strong>Studio Isolasi Jalur Audio:</strong> Setiap saluran dapat di-mute untuk latihan minus-one vokal atau di-solo untuk menyimak detail permainan instrumen secara terpisah.
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Web Audio Engine Aktif</span>
          </div>
        </div>

        {/* 3. Section Timeline & Live Chord Tracking Deck */}
        <section className="p-4 sm:p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4 shadow-xs transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Peta Bagian Lagu
              </span>
              {activeSection && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-xs bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  {activeSection.name}
                </span>
              )}
            </div>

            {/* Chord Tracker Pill */}
            <div className="flex items-center gap-2.5 self-start sm:self-center">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Akor Aktif:</span>
              <button
                type="button"
                onClick={() => {
                  setModalChordSymbol(displayedChord);
                  setChordModalOpen(true);
                }}
                className="px-3.5 py-1 rounded-md bg-amber-500 text-zinc-950 font-mono text-sm font-bold shadow-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                title="Buka diagram penempatan jari akor ini"
              >
                <span>{displayedChord}</span>
                <span className="text-[10px] font-sans font-normal opacity-80 underline">Diagram</span>
              </button>

              {nextChordTiming && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Berikutnya: <strong className="text-zinc-800 dark:text-zinc-200">{nextChordTiming.chord}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Section Marker Blocks along Timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 w-full h-8 rounded-sm overflow-hidden bg-[#f6f5f2] dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-0.5">
              {selectedPreset.sections.map((sec) => {
                const widthPct = ((sec.endSec - sec.startSec) / duration) * 100;
                const isActive = currentTime >= sec.startSec && currentTime < sec.endSec;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSeek(sec.startSec)}
                    style={{ width: `${widthPct}%` }}
                    className={`h-full text-[10px] sm:text-xs font-bold px-2 truncate text-left rounded-xs transition-all flex items-center ${
                      isActive
                        ? "bg-amber-500 text-zinc-950 shadow-xs"
                        : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                    title={`${sec.name} (${formatTime(sec.startSec)} - ${formatTime(sec.endSec)})`}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>

            {/* Draggable Scrubber Timeline */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 w-12 text-right">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 60}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  aria-label="Posisi detik pemutaran lagu"
                  className="w-full h-2 rounded-xs bg-zinc-200 dark:bg-zinc-800 accent-amber-500 cursor-pointer"
                />

                {/* Loop A & B visual indicators */}
                {loopState.enabled && (
                  <>
                    <div
                      style={{ left: `${(loopState.a / duration) * 100}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-sky-500 pointer-events-none"
                    />
                    <div
                      style={{ left: `${(loopState.b / duration) * 100}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-sky-500 pointer-events-none"
                    />
                  </>
                )}
              </div>

              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 w-12">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </section>

        {/* 4. Multi-Track Console Channel Strips */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase font-mono tracking-wider flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
              <span>Channel Strips (4 Jalur Terpisah)</span>
            </h2>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Spasi: Play/Pause · M: Mute · S: Solo
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {(
              [
                {
                  id: "vocals" as StemId,
                  icon: Mic,
                  colorClass: "text-sky-600 dark:text-sky-400 border-sky-500/40 bg-sky-500/10",
                  label: "Vokal Utama & Harmoni",
                  hint: "Jalur vokal penyanyi. Mute untuk instrumen pengiring ibadah, atau Solo untuk mendengar vokal.",
                },
                {
                  id: "drums" as StemId,
                  icon: Disc,
                  colorClass: "text-orange-600 dark:text-orange-400 border-orange-500/40 bg-orange-500/10",
                  label: "Drum & Perkusi",
                  hint: "Ketukan kick drum, snare, hi-hat, dan irama perkusi untuk melatih ketukan stabil.",
                },
                {
                  id: "bass" as StemId,
                  icon: Layers,
                  colorClass: "text-purple-600 dark:text-purple-400 border-purple-500/40 bg-purple-500/10",
                  label: "Bass Gitar",
                  hint: "Garis nada dasar (root) dan nada jembatan slash chord pada rentang frekuensi rendah.",
                },
                {
                  id: "instruments" as StemId,
                  icon: Music,
                  colorClass: "text-amber-600 dark:text-amber-400 border-amber-500/40 bg-amber-500/10",
                  label: "Gitar & Piano / Harmoni",
                  hint: "Harmoni petikan gitar, grand piano, dan bantalan pad pengisi suasana ibadah.",
                },
              ] as const
            ).map((track) => {
              const state = stemStates[track.id];
              const peak = peakLevels[track.id] || 0;
              const isDimmed = anySoloed && !state.soloed;
              const Icon = track.icon;

              return (
                <div
                  key={track.id}
                  className={`p-3.5 sm:p-4 rounded-md border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-xs ${
                    state.soloed
                      ? "border-amber-500 bg-amber-500/5 dark:bg-[#1a191f] shadow-amber-500/5"
                      : state.muted || isDimmed
                      ? "border-zinc-200 dark:border-zinc-800/60 bg-zinc-100/60 dark:bg-[#0c0c0e] opacity-50"
                      : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-400 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Left: Stem Icon, Name, Subtitle */}
                  <div className="flex items-center gap-3 min-w-[210px]">
                    <div
                      className={`w-9 h-9 rounded-md border flex items-center justify-center shrink-0 ${track.colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {state.name}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-snug">
                        {track.hint}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Professional Hardware LED Meter & Waveform Bar */}
                  <div className="flex-1 flex items-center gap-3 max-w-md">
                    {/* 8-Segment Peak Meter (Green-Yellow-Red) */}
                    <div className="flex items-end gap-0.5 h-6 w-16 bg-[#f6f5f2] dark:bg-zinc-950 p-1 rounded-xs border border-zinc-300 dark:border-zinc-800 shrink-0">
                      {Array.from({ length: 8 }).map((_, segIdx) => {
                        const threshold = (segIdx + 1) * 12.5;
                        const isLit = isPlaying && !state.muted && !isDimmed && peak >= threshold;
                        const isRed = segIdx >= 6;
                        const isAmber = segIdx >= 4;

                        return (
                          <div
                            key={segIdx}
                            style={{ height: `${(segIdx + 1) * 12.5}%` }}
                            className={`flex-1 rounded-xs transition-colors ${
                              isLit
                                ? isRed
                                  ? "bg-rose-500"
                                  : isAmber
                                  ? "bg-amber-400"
                                  : "bg-emerald-500"
                                : "bg-zinc-300 dark:bg-zinc-800"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Stem Waveform Amplitude Contour */}
                    <div className="flex-1 h-7 rounded-xs bg-[#f6f5f2] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 flex items-center gap-0.5 px-2 overflow-hidden">
                      {Array.from({ length: 28 }).map((_, barIdx) => {
                        const waveHeightPct = Math.max(
                          18,
                          Math.min(
                            94,
                            Math.sin(barIdx * 0.42 + (track.id.length * 1.8)) * 34 + 52
                          )
                        );
                        const isPlayed = (barIdx / 28) <= (currentTime / duration);

                        return (
                          <div
                            key={barIdx}
                            style={{ height: `${waveHeightPct}%` }}
                            className={`flex-1 rounded-xs transition-colors ${
                              isPlayed
                                ? "bg-amber-500"
                                : "bg-zinc-300 dark:bg-zinc-800"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Mute, Solo, Volume Fader, Panpot */}
                  <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
                    {/* Mute & Solo Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleMute(track.id)}
                        className={`w-7 h-7 rounded-xs font-mono text-xs font-bold border transition-colors ${
                          state.muted
                            ? "bg-rose-600 border-rose-500 text-white"
                            : "bg-[#f6f5f2] dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400"
                        }`}
                        title={state.muted ? "Bunyikan kembali track ini" : "Bisukan track ini (Mute)"}
                      >
                        M
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleSolo(track.id)}
                        className={`w-7 h-7 rounded-xs font-mono text-xs font-bold border transition-colors ${
                          state.soloed
                            ? "bg-amber-500 border-amber-400 text-zinc-950 shadow-xs"
                            : "bg-[#f6f5f2] dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400"
                        }`}
                        title={state.soloed ? "Matikan Solo" : "Isolasikan hanya track ini (Solo)"}
                      >
                        S
                      </button>
                    </div>

                    {/* Volume Slider */}
                    <div className="flex items-center gap-2 w-28 sm:w-32">
                      <Volume2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={state.muted ? 0 : state.volume}
                        onChange={(e) => handleSetVolume(track.id, parseFloat(e.target.value))}
                        aria-label={`Volume ${state.name}`}
                        className="w-full h-1.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 accent-amber-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 w-7 text-right">
                        {state.muted ? "0%" : `${Math.round(state.volume * 100)}%`}
                      </span>
                    </div>

                    {/* Panpot Slider */}
                    <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 w-20">
                      <span>L</span>
                      <input
                        type="range"
                        min={-1}
                        max={1}
                        step={0.1}
                        value={state.pan}
                        onChange={(e) => handleSetPan(track.id, parseFloat(e.target.value))}
                        title={`Pan Stereo: ${state.pan === 0 ? "Tengah (Center)" : state.pan < 0 ? `Kiri ${Math.round(Math.abs(state.pan) * 100)}%` : `Kanan ${Math.round(state.pan * 100)}%`}`}
                        className="w-full h-1 rounded-xs bg-zinc-200 dark:bg-zinc-800 accent-zinc-500 cursor-pointer"
                      />
                      <span>R</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 5. Sticky Bottom Master Transport Deck (Dark/Light Synchronized) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md border-t border-zinc-300 dark:border-zinc-800 p-3 sm:p-4 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Play/Pause, Return to Zero, Timecode */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-transform active:scale-95 shadow-md bg-amber-500 text-zinc-950 hover:bg-amber-400"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSeek(0)}
              title="Kembali ke awal lagu"
              className="p-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-amber-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="hidden sm:block">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">
                {selectedPreset.title}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                {formatTime(currentTime)} / {formatTime(duration)} · {formatBarsBeats(currentTime, selectedPreset.bpm)}
              </div>
            </div>
          </div>

          {/* Middle: Speed Selector & Key Transposer */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md p-0.5">
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt.rate}
                  type="button"
                  onClick={() => handleSpeedChange(opt.rate)}
                  className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                    playbackSpeed === opt.rate
                      ? "bg-amber-500 text-zinc-950"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Transpose Key Shifter */}
            <div className="flex items-center gap-1.5 bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md px-2.5 py-1 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-mono">Kunci:</span>
              <button
                type="button"
                onClick={() => handlePitchChange(-1)}
                className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold flex items-center justify-center hover:border-amber-500"
              >
                -
              </button>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400 w-6 text-center">
                {pitchSemitones > 0 ? `+${pitchSemitones}` : pitchSemitones}
              </span>
              <button
                type="button"
                onClick={() => handlePitchChange(1)}
                className="w-5 h-5 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold flex items-center justify-center hover:border-amber-500"
              >
                +
              </button>
              {pitchSemitones !== 0 && (
                <button
                  type="button"
                  onClick={handleResetPitch}
                  className="text-[10px] text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 ml-0.5"
                  title="Kembali ke nada dasar rekaman asli"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Right: Loop A-B & Synchronized Click */}
          <div className="flex items-center gap-2">
            {/* Loop A-B */}
            <div className="flex items-center gap-1 bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={handleSetLoopPointA}
                className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                title="Tetapkan titik A (Awal Pengulangan)"
              >
                Set [A]
              </button>
              <button
                type="button"
                onClick={handleSetLoopPointB}
                className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                title="Tetapkan titik B (Akhir Pengulangan)"
              >
                Set [B]
              </button>
              <button
                type="button"
                onClick={handleToggleLoop}
                className={`p-1 rounded transition-colors ${
                  loopState.enabled
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
                title="Aktifkan / Nonaktifkan Loop A-B"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Smart Click Track */}
            <button
              type="button"
              onClick={handleToggleClick}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${
                clickActive
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-amber-500"
              }`}
              title="Aktifkan panduan ketukan metronome yang sinkron dengan lagu"
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Klik Metronom</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Open Custom Audio File */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#141417] border border-zinc-300 dark:border-zinc-800 rounded-md p-6 space-y-5 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Buka File Audio Lokal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => !isProcessingUpload && setUploadModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isProcessingUpload ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-amber-500 rounded-md p-8 text-center space-y-3 bg-[#f6f5f2] dark:bg-zinc-900/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                      Pilih atau Seret File Audio ke Sini
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Mendukung MP3, WAV, M4A, FLAC, AAC
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold cursor-pointer transition-colors shadow-xs">
                    <span>Pilih File dari Perangkat</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="p-3 rounded-md bg-[#f6f5f2] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                  <strong className="text-zinc-900 dark:text-zinc-200">Keamanan & Pemrosesan Lokal:</strong>
                  <p>
                    Audio dipisahkan langsung di peramban web Anda tanpa dikirim ke server luar. File Anda tetap tersimpan di perangkat Anda.
                  </p>
                </div>
              </div>
            ) : (
              /* Processing Progress */
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-3 border-amber-500 border-t-transparent animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Memproses Pemisahan Jalur Audio...
                  </h4>
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400">
                    {uploadProcessStep}
                  </p>
                </div>

                <div className="w-full h-2 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${uploadProgressPct}%` }}
                    className="h-full bg-amber-500 transition-all duration-300"
                  />
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  {uploadProgressPct}%
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Export Track Stems */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#141417] border border-zinc-300 dark:border-zinc-800 rounded-md p-6 space-y-5 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Ekspor Trek Hasil Pemisahan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pilih format trek yang ingin Anda unduh untuk keperluan latihan atau pelayanan musik ibadah:
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleExportTrack("minus-one")}
                className="w-full p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 bg-[#f6f5f2] dark:bg-zinc-900 text-left flex items-start gap-3 transition-colors"
              >
                <div className="p-2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Minus-One / Karaoke (Tanpa Vokal)
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Instrumen pengiring lengkap (Drum, Bass, Gitar/Piano) tanpa vokal penyanyi.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleExportTrack("rhythm")}
                className="w-full p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 bg-[#f6f5f2] dark:bg-zinc-900 text-left flex items-start gap-3 transition-colors"
              >
                <div className="p-2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 mt-0.5">
                  <Disc className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Rhythm Section (Drum + Bass Saja)
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Fondasi ritmis drum dan bass untuk melatih stabilitas genjrengan gitar atau tuts piano.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleExportTrack("acapella")}
                className="w-full p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 bg-[#f6f5f2] dark:bg-zinc-900 text-left flex items-start gap-3 transition-colors"
              >
                <div className="p-2 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 mt-0.5">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Isolasi Vokal Saja (Akapela)
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Jalur vokal bersih untuk menyimak teknik vokal, vibrato, dan lirik lagu.
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Chord Diagram Detail */}
      {chordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#141417] border border-zinc-300 dark:border-zinc-800 rounded-md p-5 space-y-4 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500 font-bold">
                Diagram Posisi Jari
              </span>
              <button
                type="button"
                onClick={() => setChordModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ChordDiagramCard
              chordSymbol={modalChordSymbol}
              instrument={
                preferredInstrument === "cajon" ? "guitar" : preferredInstrument
              }
            />

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setChordModalOpen(false)}
                className="px-4 py-2 rounded-md bg-[#f6f5f2] dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:border-amber-500 border border-zinc-300 dark:border-zinc-700"
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
