"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Mic, MicOff, Volume2, CheckCircle2 } from "lucide-react";
import { PitchDetector } from "pitchy";
import { getAudioContext, playTunerTone } from "@/lib/audioSynth";
import { CHROMATIC_SHARP } from "@/lib/transpose";

interface TargetString {
  label: string;
  desc: string;
  note: string;
  octave: number;
  freq: number;
}

const GUITAR_STRINGS: TargetString[] = [
  { label: "Senar 6", desc: "Paling Tebal (Atas)", note: "E", octave: 2, freq: 82.41 },
  { label: "Senar 5", desc: "Senar A", note: "A", octave: 2, freq: 110.0 },
  { label: "Senar 4", desc: "Senar D", note: "D", octave: 3, freq: 146.83 },
  { label: "Senar 3", desc: "Senar G", note: "G", octave: 3, freq: 196.0 },
  { label: "Senar 2", desc: "Senar B", note: "B", octave: 3, freq: 246.94 },
  { label: "Senar 1", desc: "Paling Tipis (Bawah)", note: "E", octave: 4, freq: 329.63 },
];

const BASS_STRINGS: TargetString[] = [
  { label: "Senar 4", desc: "Paling Tebal (Atas)", note: "E", octave: 1, freq: 41.2 },
  { label: "Senar 3", desc: "Senar A", note: "A", octave: 1, freq: 55.0 },
  { label: "Senar 2", desc: "Senar D", note: "D", octave: 2, freq: 73.42 },
  { label: "Senar 1", desc: "Paling Tipis (Bawah)", note: "G", octave: 2, freq: 98.0 },
];

const PIANO_REF_NOTES: TargetString[] = [
  { label: "Nada C", desc: "Middle C", note: "C", octave: 4, freq: 261.63 },
  { label: "Nada D", desc: "Oktaf 4", note: "D", octave: 4, freq: 293.66 },
  { label: "Nada E", desc: "Oktaf 4", note: "E", octave: 4, freq: 329.63 },
  { label: "Nada F", desc: "Oktaf 4", note: "F", octave: 4, freq: 349.23 },
  { label: "Nada G", desc: "Oktaf 4", note: "G", octave: 4, freq: 392.0 },
  { label: "Nada A", desc: "Konser 440Hz", note: "A", octave: 4, freq: 440.0 },
];

function frequencyToNoteData(freq: number, lockedTarget?: TargetString | null) {
  if (lockedTarget) {
    const cents = Math.round(1200 * Math.log2(freq / lockedTarget.freq));
    return {
      noteName: lockedTarget.note,
      octave: lockedTarget.octave,
      cents,
      frequency: freq,
      targetLabel: `${lockedTarget.label} (${lockedTarget.note}${lockedTarget.octave})`,
    };
  }

  const midiFloat = 12 * Math.log2(freq / 440) + 69;
  const nearestMidi = Math.round(midiFloat);
  const cents = Math.round((midiFloat - nearestMidi) * 100);
  const noteName = CHROMATIC_SHARP[((nearestMidi % 12) + 12) % 12];
  const octave = Math.floor(nearestMidi / 12) - 1;
  return { noteName, octave, cents, frequency: freq, targetLabel: null };
}

export function TunerTool() {
  const [mode, setMode] = useState<"guitar" | "bass" | "piano">("guitar");
  const [lockedStringIdx, setLockedStringIdx] = useState<number | null>(null);
  const [micState, setMicState] = useState<"idle" | "listening" | "denied" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [detected, setDetected] = useState<{
    noteName: string;
    octave: number;
    cents: number;
    frequency: number;
    clarity: number;
    targetLabel?: string | null;
  } | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const targetStrings =
    mode === "bass"
      ? BASS_STRINGS
      : mode === "piano"
      ? PIANO_REF_NOTES
      : GUITAR_STRINGS;

  const lockedTarget =
    lockedStringIdx !== null ? targetStrings[lockedStringIdx] ?? null : null;
  const lockedTargetRef = useRef<TargetString | null>(lockedTarget);

  useEffect(() => {
    lockedTargetRef.current = lockedTarget;
  }, [lockedTarget]);

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
        "Browser tidak mendukung akses mikrofon. Gunakan tombol nada referensi di bawah untuk menyetem dengan telinga."
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

        if (clarity > 0.84 && pitch >= 32 && pitch <= 1200) {
          const data = frequencyToNoteData(pitch, lockedTargetRef.current);
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
          "Akses mikrofon ditolak. Izinkan mikrofon di browser Anda, atau klik tombol senar di bawah untuk menyetem manual."
        );
      } else {
        setMicState("error");
        setErrorMessage(
          "Mikrofon tidak terdeteksi. Anda tetap dapat mengklik tombol senar di bawah untuk mendengar bunyi nada standar."
        );
      }
    }
  };

  const playReferenceString = (target: TargetString, idx: number, simulateOffsetCents = 0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const actualFreq = target.freq * Math.pow(2, simulateOffsetCents / 1200);
    playTunerTone(actualFreq, mode, 2.4);

    const data = frequencyToNoteData(actualFreq, target);
    setDetected({
      ...data,
      clarity: 99,
    });
    if (simulateOffsetCents === 0) {
      setLockedStringIdx(idx);
    }
  };

  const isInTune = detected ? Math.abs(detected.cents) <= 5 : false;
  const clampedCents = detected ? Math.max(-50, Math.min(50, detected.cents)) : 0;

  return (
    <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500">
            2 · Penyetem Senar & Nada Standar
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Tuner Instrumen
          </h2>
        </div>

        <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
          {(
            [
              { id: "guitar", label: "Gitar (6 Senar)" },
              { id: "bass", label: "Bass (4 Senar)" },
              { id: "piano", label: "Nada Piano" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setLockedStringIdx(null);
              }}
              className={`px-2.5 py-1 text-xs font-medium border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 transition-colors ${
                mode === m.id
                  ? "bg-amber-500 text-zinc-950 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Microphone Status Notice */}
      {(micState === "denied" || micState === "error") && (
        <div className="p-3 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs space-y-1">
          <p className="font-semibold">Info Mikrofon</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Pitch Display & Clear Tuning Guidance */}
      <div className="p-4 sm:p-5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 text-center space-y-3.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>
            {micState === "listening"
              ? "● Mikrofon Mendengarkan..."
              : lockedTarget
              ? `Target: ${lockedTarget.label} (${lockedTarget.note}${lockedTarget.octave})`
              : "Mode: Deteksi Otomatis"}
          </span>
          <span>
            {detected ? `${detected.frequency.toFixed(1)} Hz` : "---.- Hz"}
          </span>
        </div>

        <div className="space-y-1.5">
          <div
            className={`text-5xl font-bold font-mono tracking-tight transition-colors ${
              !detected
                ? "text-zinc-400 dark:text-zinc-600"
                : isInTune
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {detected ? `${detected.noteName}${detected.octave}` : "--"}
          </div>

          {/* Human-friendly tuning instruction */}
          <div className="text-xs font-medium">
            {!detected ? (
              <span className="text-zinc-500">
                Aktifkan mikrofon lalu petik senar, atau klik tombol senar di bawah untuk mendengar nada standar
              </span>
            ) : isInTune ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Nada Sudah Pas! ({detected.cents > 0 ? `+${detected.cents}` : detected.cents} cents)
              </span>
            ) : detected.cents < 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold">
                Nada Kerendahan ({detected.cents}c) · Kencangkan Putaran Senar Sedikit ↗
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold">
                Nada Ketinggian (+{detected.cents}c) · Kendurkan Putaran Senar Sedikit ↘
              </span>
            )}
          </div>
        </div>

        {/* Visual Cents Meter */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>Kerendahan (Flat -50c)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">PAS (0c)</span>
            <span>Ketinggian (Sharp +50c)</span>
          </div>
          <div className="relative h-3.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-7 bg-emerald-500/20 border-x border-emerald-500/50" />
            {detected && (
              <div
                style={{ left: `${50 + clampedCents}%` }}
                className={`absolute top-0 bottom-0 w-2.5 -translate-x-1/2 transition-all duration-150 ${
                  isInTune ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reference Strings / Notes Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            Pilih Senar / Nada Referensi (Klik untuk bunyikan & kunci target):
          </span>
          {lockedStringIdx !== null && (
            <button
              type="button"
              onClick={() => setLockedStringIdx(null)}
              className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Reset ke Deteksi Otomatis
            </button>
          )}
        </div>

        <div
          className={`grid gap-2 ${
            mode === "bass" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-6"
          }`}
        >
          {targetStrings.map((str, idx) => {
            const isLocked = lockedStringIdx === idx;
            const isMatched =
              detected &&
              detected.noteName === str.note &&
              detected.octave === str.octave;

            return (
              <button
                key={`${str.label}-${str.note}${str.octave}`}
                type="button"
                onClick={() => playReferenceString(str, idx, 0)}
                className={`p-2.5 rounded-md border text-center transition-colors ${
                  isLocked || isMatched
                    ? "border-amber-500 bg-amber-500/15"
                    : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] hover:border-amber-500/60"
                }`}
              >
                <div className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
                  {str.label}
                </div>
                <div className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100 my-0.5">
                  {str.note}
                  {str.octave}
                </div>
                <div className="text-[9px] text-zinc-500 truncate">{str.desc}</div>
                <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Bunyikan</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Microphone Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        {micState === "listening" ? (
          <button
            type="button"
            onClick={stopMicrophone}
            className="flex-1 py-3 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
          >
            <MicOff className="w-3.5 h-3.5" />
            <span>Matikan Mikrofon</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={startMicrophone}
            className="flex-1 py-3 px-4 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Aktifkan Mikrofon untuk Setem Senar</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => playReferenceString(targetStrings[0], 0, -18)}
          title="Coba lihat bagaimana tampilan tuner saat senar masih kendor (-18 cents)"
          className="py-3 px-3.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-amber-500 transition-colors"
        >
          Contoh Senar Kendor
        </button>
      </div>
    </div>
  );
}
