"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Square, Minus, Plus, Hand, Volume2 } from "lucide-react";
import { getAudioContext } from "@/lib/audioSynth";

interface MetronomeToolProps {
  initialBpm?: number;
  initialTimeSignature?: "4/4" | "3/4" | "6/8";
}

export function MetronomeTool({
  initialBpm = 100,
  initialTimeSignature = "4/4",
}: MetronomeToolProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [timeSignature, setTimeSignature] = useState<"4/4" | "3/4" | "6/8">(
    initialTimeSignature
  );
  const [subdivision, setSubdivision] = useState<1 | 2 | 3>(1); // 1 = quarter, 2 = eighth, 3 = triplet
  const [accentFirstBeat, setAccentFirstBeat] = useState(true);
  const [currentBeat, setCurrentBeat] = useState<number>(-1);

  const tapTimesRef = useRef<number[]>([]);
  const timerIdRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const stepIndexRef = useRef<number>(0);

  const beatsPerMeasure =
    timeSignature === "3/4" ? 3 : timeSignature === "6/8" ? 6 : 4;

  // Sync Refs for Web Audio lookahead scheduler
  const bpmRef = useRef(bpm);
  const beatsRef = useRef(beatsPerMeasure);
  const subdivRef = useRef(subdivision);
  const accentRef = useRef(accentFirstBeat);

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
    accentRef.current = accentFirstBeat;
  }, [accentFirstBeat]);

  const scheduleClick = useCallback(
    (time: number, beatNumber: number, subIndex: number) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const isDownbeat = beatNumber === 0 && subIndex === 0;
      const isMainBeat = subIndex === 0;

      if (isDownbeat && accentRef.current) {
        osc.frequency.setValueAtTime(1150, time);
      } else if (isMainBeat) {
        osc.frequency.setValueAtTime(820, time);
      } else {
        osc.frequency.setValueAtTime(560, time);
      }

      osc.type = "triangle";

      const peakGain = isDownbeat ? 0.35 : isMainBeat ? 0.22 : 0.1;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(peakGain, time + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.06);

      if (isMainBeat) {
        const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
        window.setTimeout(() => {
          setCurrentBeat(beatNumber);
        }, delayMs);
      }
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
        const beatNum = Math.floor(step / subdivRef.current);
        const subNum = step % subdivRef.current;

        scheduleClick(nextNoteTimeRef.current, beatNum, subNum);

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
      ? "Largo (Sangat Lambat)"
      : bpm < 76
      ? "Adagio (Lambat)"
      : bpm < 108
      ? "Andante (Sedang)"
      : bpm < 120
      ? "Moderato"
      : bpm < 156
      ? "Allegro (Cepat)"
      : "Presto (Sangat Cepat)";

  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
            Web Audio Scheduler Presisi Tinggi
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Metronome Studio
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setAccentFirstBeat((a) => !a)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
            accentFirstBeat
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              : "border-slate-200 dark:border-slate-800 text-slate-500"
          }`}
        >
          <Volume2 className="w-3.5 h-3.5 inline mr-1" />
          Aksen Ketukan 1: {accentFirstBeat ? "Aktif" : "Nonaktif"}
        </button>
      </div>

      {/* Visual Beat Pulsers */}
      <div className="flex items-center justify-center gap-3 py-4 bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl border border-slate-200/70 dark:border-slate-800">
        {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
          const isCurrent = isPlaying && currentBeat === idx;
          const isFirst = idx === 0 && accentFirstBeat;
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-extrabold text-sm transition-all duration-100 ${
                  isCurrent
                    ? isFirst
                      ? "bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/40"
                      : "bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/40"
                    : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {idx + 1}
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {idx === 0 && accentFirstBeat ? "AKSEN" : `KETUK`}
              </span>
            </div>
          );
        })}
      </div>

      {/* BPM Readout & Controls */}
      <div className="text-center space-y-2">
        <div className="text-5xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
          {bpm}{" "}
          <span className="text-lg font-normal text-slate-400">BPM</span>
        </div>
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {tempoLabel}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(40, b - 5))}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            -5
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(40, b - 1))}
            aria-label="Kurangi 1 BPM"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
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
            className="flex-1 accent-emerald-500 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(220, b + 1))}
            aria-label="Tambah 1 BPM"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(220, b + 5))}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            +5
          </button>
        </div>
      </div>

      {/* Time Signature & Subdivision Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Birama (Time Signature)
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {(["4/4", "3/4", "6/8"] as const).map((ts) => (
              <button
                key={ts}
                type="button"
                onClick={() => setTimeSignature(ts)}
                className={`py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                  timeSignature === ts
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Subdivisi Ketukan
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { val: 1, label: "1/4 Dasar" },
                { val: 2, label: "1/8 Ketuk" },
                { val: 3, label: "Triplet" },
              ] as const
            ).map((sub) => (
              <button
                key={sub.val}
                type="button"
                onClick={() => setSubdivision(sub.val)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  subdivision === sub.val
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start/Stop & Tap Tempo Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-lg ${
            isPlaying
              ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>Hentikan Metronome</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Mulai Metronome</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleTapTempo}
          className="py-3.5 px-5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500 transition-colors"
        >
          <Hand className="w-4 h-4 text-emerald-500" />
          <span>Tap Tempo</span>
        </button>
      </div>
    </div>
  );
}
