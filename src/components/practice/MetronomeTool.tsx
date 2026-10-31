"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Square, Minus, Plus, TrendingUp } from "lucide-react";
import { getAudioContext, playMetronomeClick } from "@/lib/audioSynth";

interface MetronomeToolProps {
  initialBpm?: number;
  initialTimeSignature?: "4/4" | "3/4" | "6/8";
  songTitle?: string;
}

type BeatLevel = 2 | 1 | 0; // 2 = Accent, 1 = Normal, 0 = Mute
type ClickSoundType = "woodblock" | "stick" | "digital";

const GENRE_TEMPO_PRESETS = [
  { label: "Worship Lambat", bpm: 68, ts: "4/4" as const },
  { label: "Hymn Klasik", bpm: 84, ts: "4/4" as const },
  { label: "Waltz / Kidung", bpm: 96, ts: "3/4" as const },
  { label: "Praise Cepat", bpm: 124, ts: "4/4" as const },
];

export function MetronomeTool({
  initialBpm = 100,
  initialTimeSignature = "4/4",
  songTitle,
}: MetronomeToolProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [timeSignature, setTimeSignature] = useState<"4/4" | "3/4" | "6/8">(
    initialTimeSignature
  );
  const [subdivision, setSubdivision] = useState<1 | 2 | 3>(1);
  const [soundType, setSoundType] = useState<ClickSoundType>("woodblock");
  const [currentBeat, setCurrentBeat] = useState<number>(-1);
  const [barCount, setBarCount] = useState<number>(0);

  // Speed Trainer: gradually increase BPM every 4 bars
  const [speedTrainerEnabled, setSpeedTrainerEnabled] = useState(false);

  const beatsPerMeasure =
    timeSignature === "3/4" ? 3 : timeSignature === "6/8" ? 6 : 4;

  // Per-beat accent pattern (click any beat box to toggle Accent -> Normal -> Mute)
  const [beatLevels, setBeatLevels] = useState<BeatLevel[]>([2, 1, 1, 1, 1, 1]);

  const tapTimesRef = useRef<number[]>([]);
  const timerIdRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const stepIndexRef = useRef<number>(0);

  const bpmRef = useRef(bpm);
  const beatsRef = useRef(beatsPerMeasure);
  const subdivRef = useRef(subdivision);
  const beatLevelsRef = useRef(beatLevels);
  const soundTypeRef = useRef(soundType);
  const speedTrainerRef = useRef(speedTrainerEnabled);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);
  useEffect(() => {
    beatsRef.current = beatsPerMeasure;
  }, [beatsPerMeasure]);
  useEffect(() => {
    subdivRef.current = subdivision;
  }, [subdivision]);
  useEffect(() => {
    beatLevelsRef.current = beatLevels;
  }, [beatLevels]);
  useEffect(() => {
    soundTypeRef.current = soundType;
  }, [soundType]);
  useEffect(() => {
    speedTrainerRef.current = speedTrainerEnabled;
  }, [speedTrainerEnabled]);

  const toggleBeatLevel = (idx: number) => {
    setBeatLevels((prev) => {
      const next = [...prev];
      const current = next[idx] ?? 1;
      // Cycle: 2 (Aksen) -> 1 (Ketuk) -> 0 (Senyap) -> 2
      next[idx] = current === 2 ? 1 : current === 1 ? 0 : 2;
      return next;
    });
  };

  const scheduleClick = useCallback(
    (time: number, beatNumber: number, subIndex: number, measureNumber: number) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const isMainBeat = subIndex === 0;
      const level: BeatLevel = isMainBeat
        ? beatLevelsRef.current[beatNumber] ?? 1
        : 1;

      if (isMainBeat) {
        const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
        window.setTimeout(() => {
          setCurrentBeat(beatNumber);
          if (beatNumber === 0) {
            setBarCount(measureNumber + 1);
            if (
              speedTrainerRef.current &&
              measureNumber > 0 &&
              measureNumber % 4 === 0
            ) {
              setBpm((prev) => Math.min(220, prev + 2));
            }
          }
        }, delayMs);
      }

      // If user muted this beat, skip sound on the main beat
      if (isMainBeat && level === 0) {
        return;
      }

      const sType = soundTypeRef.current;
      playMetronomeClick(time, sType, level === 2);
    },
    []
  );

  useEffect(() => {
    if (!isPlaying) {
      if (timerIdRef.current) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
      setCurrentBeat(-1);
      setBarCount(0);
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    stepIndexRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;

    const lookaheadMs = 25;
    const scheduleAheadSec = 0.1;

    timerIdRef.current = window.setInterval(() => {
      const audioCtx = getAudioContext();
      if (!audioCtx) return;

      while (nextNoteTimeRef.current < audioCtx.currentTime + scheduleAheadSec) {
        const totalSubSteps = beatsRef.current * subdivRef.current;
        const step = stepIndexRef.current % totalSubSteps;
        const measureNum = Math.floor(stepIndexRef.current / totalSubSteps);
        const beatNum = Math.floor(step / subdivRef.current);
        const subNum = step % subdivRef.current;

        scheduleClick(nextNoteTimeRef.current, beatNum, subNum, measureNum);

        const secondsPerBeat = 60.0 / bpmRef.current;
        const secondsPerSub = secondsPerBeat / subdivRef.current;
        nextNoteTimeRef.current += secondsPerSub;
        stepIndexRef.current++;
      }
    }, lookaheadMs);

    return () => {
      if (timerIdRef.current) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [isPlaying, scheduleClick]);

  const handleTapTempo = () => {
    const now = performance.now();
    const recent = tapTimesRef.current.filter((t) => now - t < 3000);
    recent.push(now);
    tapTimesRef.current = recent;

    if (recent.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < recent.length; i++) {
        intervals.push(recent[i] - recent[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgMs);
      setBpm(Math.max(40, Math.min(220, calculatedBpm)));
    }
  };

  const tempoLabel =
    bpm < 66
      ? "Largo · Sangat Lambat"
      : bpm < 78
      ? "Adagio · Worship Lambat"
      : bpm < 105
      ? "Andante · Hymn Sedang"
      : bpm < 120
      ? "Moderato · Tempo Sedang"
      : bpm < 156
      ? "Allegro · Praise Cepat"
      : "Presto · Sangat Cepat";

  return (
    <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500">
            1 · Pengatur Ketukan & Tempo
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Metronome Studio
          </h2>
          {songTitle && (
            <p className="text-xs text-zinc-500 mt-0.5">
              Tersinkronisasi dengan lagu: <strong className="text-zinc-800 dark:text-zinc-200">{songTitle}</strong>
            </p>
          )}
        </div>

        {/* Sound Selector */}
        <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
          {(
            [
              { id: "woodblock", label: "Kayu" },
              { id: "stick", label: "Stik" },
              { id: "digital", label: "Digital" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSoundType(s.id)}
              className={`px-2.5 py-1 text-xs font-medium border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 transition-colors ${
                soundType === s.id
                  ? "bg-amber-500 text-zinc-950 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Beat Boxes (Click to toggle Accent / Normal / Mute) */}
      <div className="p-4 bg-[#f6f5f2] dark:bg-[#0d0d0f] rounded-md border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>Ketuk kotak angka di bawah untuk mengubah aksen/senyap:</span>
          {isPlaying && (
            <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">
              Bar #{barCount}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1">
          {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
            const isCurrent = isPlaying && currentBeat === idx;
            const level = beatLevels[idx] ?? 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleBeatLevel(idx)}
                className="flex flex-col items-center gap-1.5 group focus:outline-none"
                title="Klik untuk ubah: Aksen Tinggi / Ketuk Biasa / Senyap"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-md flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isCurrent
                      ? "bg-amber-500 text-zinc-950 border-amber-500 scale-105 shadow-sm"
                      : level === 2
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/50"
                      : level === 0
                      ? "bg-zinc-100 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 border-dashed border-zinc-300 dark:border-zinc-800"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 group-hover:border-amber-500"
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  {level === 2 ? "Aksen" : level === 0 ? "Senyap" : "Ketuk"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Genre Tempo Presets */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-medium text-zinc-500">
          Preset Tempo Cepat (1-Klik):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {GENRE_TEMPO_PRESETS.map((preset) => {
            const active = bpm === preset.bpm && timeSignature === preset.ts;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setBpm(preset.bpm);
                  setTimeSignature(preset.ts);
                }}
                className={`px-2.5 py-2 rounded-sm border text-left transition-colors ${
                  active
                    ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold"
                    : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-700 dark:text-zinc-300 hover:border-amber-500/60"
                }`}
              >
                <div className="text-[11px] font-semibold truncate">{preset.label}</div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {preset.bpm} BPM · {preset.ts}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BPM Readout & Slider */}
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {bpm}
            </span>
            <span className="text-xs font-mono text-zinc-500 ml-1.5">BPM</span>
          </div>
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
            {tempoLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(40, b - 5))}
            className="px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 text-xs font-mono hover:border-amber-500"
          >
            -5
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(40, b - 1))}
            aria-label="Kurangi 1 BPM"
            className="p-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 hover:border-amber-500"
          >
            <Minus className="w-4 h-4" />
          </button>

          <input
            type="range"
            min={40}
            max={220}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            aria-label="Pengatur Tempo BPM"
            className="flex-1 accent-amber-500 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(220, b + 1))}
            aria-label="Tambah 1 BPM"
            className="p-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 hover:border-amber-500"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(220, b + 5))}
            className="px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 text-xs font-mono hover:border-amber-500"
          >
            +5
          </button>
        </div>
      </div>

      {/* Time Signature & Subdivision */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-1.5">
          <span className="text-[11px] font-medium text-zinc-500">Birama Lagu</span>
          <div className="grid grid-cols-3 gap-1.5">
            {(["4/4", "3/4", "6/8"] as const).map((ts) => (
              <button
                key={ts}
                type="button"
                onClick={() => setTimeSignature(ts)}
                className={`py-1.5 rounded-xs font-mono text-xs font-semibold border transition-colors ${
                  timeSignature === ts
                    ? "bg-amber-500 text-zinc-950 border-amber-500"
                    : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-1.5">
          <span className="text-[11px] font-medium text-zinc-500">Rapat Ketukan (Subdivisi)</span>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { val: 1, label: "1x (Biasa)" },
                { val: 2, label: "2x (Rapat)" },
                { val: 3, label: "3x (Triplet)" },
              ] as const
            ).map((sub) => (
              <button
                key={sub.val}
                type="button"
                onClick={() => setSubdivision(sub.val)}
                className={`py-1.5 rounded-xs font-mono text-[11px] font-semibold border transition-colors ${
                  subdivision === sub.val
                    ? "bg-amber-500 text-zinc-950 border-amber-500"
                    : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Speed Trainer Toggle */}
      <div className="flex items-center justify-between p-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Pelatih Kecepatan Bertahap (+2 BPM tiap 4 Bar)
            </div>
            <div className="text-[11px] text-zinc-500">
              Cocok untuk melatih perpindahan chord dari lambat menjadi cepat secara otomatis
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSpeedTrainerEnabled((s) => !s)}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold border shrink-0 transition-colors ${
            speedTrainerEnabled
              ? "bg-amber-500 text-zinc-950 border-amber-500"
              : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {speedTrainerEnabled ? "Aktif" : "Mati"}
        </button>
      </div>

      {/* Start / Stop & Tap Tempo */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className={`flex-1 py-3 px-4 rounded-md font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Hentikan Metronome</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mulai Metronome</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleTapTempo}
          title="Ketuk berulang kali sesuai irama lagu untuk mencari tahu BPM"
          className="py-3 px-4 rounded-md font-semibold text-xs border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-amber-500 transition-colors"
        >
          Ketuk Irama (Tap)
        </button>
      </div>
    </div>
  );
}
