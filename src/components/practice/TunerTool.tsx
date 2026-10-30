"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Mic, MicOff, Volume2, AlertTriangle, CheckCircle2, Radio } from "lucide-react";
import { PitchDetector } from "pitchy";
import { getAudioContext } from "@/lib/audioSynth";
import { CHROMATIC_SHARP } from "@/lib/transpose";

interface TargetString {
  label: string;
  note: string;
  octave: number;
  freq: number;
}

const GUITAR_STRINGS: TargetString[] = [
  { label: "Senar 6", note: "E", octave: 2, freq: 82.41 },
  { label: "Senar 5", note: "A", octave: 2, freq: 110.0 },
  { label: "Senar 4", note: "D", octave: 3, freq: 146.83 },
  { label: "Senar 3", note: "G", octave: 3, freq: 196.0 },
  { label: "Senar 2", note: "B", octave: 3, freq: 246.94 },
  { label: "Senar 1", note: "E", octave: 4, freq: 329.63 },
];

const BASS_STRINGS: TargetString[] = [
  { label: "Senar 4", note: "E", octave: 1, freq: 41.2 },
  { label: "Senar 3", note: "A", octave: 1, freq: 55.0 },
  { label: "Senar 2", note: "D", octave: 2, freq: 73.42 },
  { label: "Senar 1", note: "G", octave: 2, freq: 98.0 },
];

function frequencyToNoteData(freq: number) {
  const midiFloat = 12 * Math.log2(freq / 440) + 69;
  const nearestMidi = Math.round(midiFloat);
  const cents = Math.round((midiFloat - nearestMidi) * 100);
  const noteName = CHROMATIC_SHARP[((nearestMidi % 12) + 12) % 12];
  const octave = Math.floor(nearestMidi / 12) - 1;
  return { noteName, octave, cents, frequency: freq };
}

export function TunerTool() {
  const [mode, setMode] = useState<"guitar" | "bass" | "chromatic">("guitar");
  const [micState, setMicState] = useState<"idle" | "listening" | "denied" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [detected, setDetected] = useState<{
    noteName: string;
    octave: number;
    cents: number;
    frequency: number;
    clarity: number;
  } | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const stopMicrophone = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMicState("idle");
  }, []);

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stopMicrophone]);

  const startMicrophone = async () => {
    setErrorMessage("");
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicState("error");
      setErrorMessage(
        "Browser Anda tidak mendukung akses mikrofon Web Audio API. Gunakan tombol Nada Referensi di bawah untuk menyetem secara manual."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });

      streamRef.current = stream;
      const ctx = getAudioContext();
      if (!ctx) return;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      const inputBuffer = new Float32Array(detector.inputLength);

      setMicState("listening");

      const updatePitch = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(inputBuffer);
        const [pitch, clarity] = detector.findPitch(inputBuffer, ctx.sampleRate);

        if (clarity > 0.85 && pitch >= 32 && pitch <= 1200) {
          const data = frequencyToNoteData(pitch);
          setDetected({
            ...data,
            clarity: Math.round(clarity * 100),
          });
        }
        rafRef.current = requestAnimationFrame(updatePitch);
      };

      rafRef.current = requestAnimationFrame(updatePitch);
    } catch (err: unknown) {
      const domErr = err as { name?: string };
      if (domErr?.name === "NotAllowedError" || domErr?.name === "PermissionDeniedError") {
        setMicState("denied");
        setErrorMessage(
          "Akses mikrofon ditolak. Silakan izinkan akses mikrofon pada ikon gembok di bilah alamat browser Anda, atau gunakan tombol Simulasi & Nada Referensi di bawah."
        );
      } else {
        setMicState("error");
        setErrorMessage(
          "Tidak ditemukan perangkat mikrofon aktif atau perangkat sedang digunakan aplikasi lain. Anda tetap dapat menggunakan Nada Referensi di bawah."
        );
      }
    }
  };

  const playReferenceString = (target: TargetString, simulateOffsetCents = 0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const actualFreq = target.freq * Math.pow(2, simulateOffsetCents / 1200);
    osc.type = mode === "bass" ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(actualFreq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(mode === "bass" ? 500 : 1800, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.85);

    // Also update visual gauge so user can see how the tuner responds
    const data = frequencyToNoteData(actualFreq);
    setDetected({
      ...data,
      clarity: 98,
    });
  };

  const targetStrings = mode === "bass" ? BASS_STRINGS : GUITAR_STRINGS;
  const isInTune = detected ? Math.abs(detected.cents) <= 5 : false;
  const clampedCents = detected ? Math.max(-50, Math.min(50, detected.cents)) : 0;

  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
            Web Audio API + Pitchy Real-Time
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tuner Instrumen Presisi
          </h2>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {(
            [
              { id: "guitar", label: "🎸 Gitar (6)" },
              { id: "bass", label: "🎸 Bass (4)" },
              { id: "chromatic", label: "🎵 Kromatik" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === m.id
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Microphone Permission & Error Alert */}
      {(micState === "denied" || micState === "error") && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Status Input Mikrofon</p>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Visual Pitch & Cents Meter */}
      <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 text-center space-y-5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Radio
              className={`w-3.5 h-3.5 ${
                micState === "listening"
                  ? "text-emerald-500 animate-pulse"
                  : "text-slate-400"
              }`}
            />
            {micState === "listening"
              ? "Mikrofon Aktif Mendengarkan..."
              : "Siap Menerima Sinyal"}
          </span>
          <span className="font-mono">
            {detected ? `${detected.frequency.toFixed(1)} Hz` : "---.- Hz"}
          </span>
        </div>

        {/* Detected Note Display */}
        <div className="space-y-1">
          <div
            className={`text-6xl font-extrabold font-mono tracking-tight transition-colors ${
              !detected
                ? "text-slate-400 dark:text-slate-600"
                : isInTune
                ? "text-emerald-500"
                : "text-amber-500"
            }`}
          >
            {detected ? `${detected.noteName}${detected.octave}` : "--"}
          </div>
          <div className="text-xs font-bold">
            {!detected ? (
              <span className="text-slate-400">
                Petik senar atau klik tombol Nada Referensi di bawah
              </span>
            ) : isInTune ? (
              <span className="inline-flex items-center gap-1 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                Nada Tepat! ({detected.cents > 0 ? `+${detected.cents}` : detected.cents} cents)
              </span>
            ) : detected.cents < 0 ? (
              <span className="text-amber-500">
                Terlalu Rendah / Flat ({detected.cents} cents) — Kencangkan sedikit
              </span>
            ) : (
              <span className="text-rose-500">
                Terlalu Tinggi / Sharp (+{detected.cents} cents) — Kendurkan sedikit
              </span>
            )}
          </div>
        </div>

        {/* Horizontal Cents Bar (-50 to +50) */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
            <span>-50c (Flat ♭)</span>
            <span className="text-emerald-500 font-bold">0c (Tepat)</span>
            <span>+50c (Sharp ♯)</span>
          </div>
          <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700">
            {/* Center target zone */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 bg-emerald-500/25 border-x border-emerald-500/50" />
            {/* Needle indicator */}
            {detected && (
              <div
                style={{ left: `${50 + clampedCents}%` }}
                className={`absolute top-0 bottom-0 w-2.5 -translate-x-1/2 rounded-full transition-all duration-150 ${
                  isInTune ? "bg-emerald-500 shadow-lg shadow-emerald-500" : "bg-amber-400"
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reference Strings & Quick Simulation */}
      {mode !== "chromatic" && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Nada Referensi Senar ({mode === "guitar" ? "Gitar Standar" : "Bass 4-Senar"}):
            </span>
            <span className="text-slate-400 text-[11px]">
              Klik senar untuk mendengar nada acuan
            </span>
          </div>

          <div
            className={`grid gap-2 ${
              mode === "guitar" ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
            {targetStrings.map((str) => {
              const isMatched =
                detected &&
                detected.noteName === str.note &&
                detected.octave === str.octave;
              return (
                <button
                  key={`${str.label}-${str.note}${str.octave}`}
                  type="button"
                  onClick={() => playReferenceString(str, 0)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isMatched
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-500"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-emerald-500/50"
                  }`}
                >
                  <div className="text-[10px] text-slate-400">{str.label}</div>
                  <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                    {str.note}
                    {str.octave}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                    <Volume2 className="w-3 h-3 text-emerald-500" />
                    {str.freq}Hz
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Microphone Start/Stop Button + Test Simulation Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {micState === "listening" ? (
          <button
            type="button"
            onClick={stopMicrophone}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all"
          >
            <MicOff className="w-4 h-4" />
            <span>Matikan Mikrofon</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={startMicrophone}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>Aktifkan Mikrofon (Izin Browser)</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => playReferenceString(targetStrings[0], -18)}
          title="Simulasikan senar yang sedikit Flat (-18 cents) untuk menguji indikator"
          className="py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
        >
          Uji Sinyal Flat (-18c)
        </button>
      </div>
    </div>
  );
}
