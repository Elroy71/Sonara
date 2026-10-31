"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Square,
  Volume2,
  Minus,
  Plus,
  RotateCcw,
  Clock,
} from "lucide-react";
import { CourseInstrumentId, CourseMeeting } from "@/data/coursesData";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";
import {
  getAudioContext,
  noteToMidi,
  playCajonHit,
  playChordPreview,
  playInstrumentNote,
} from "@/lib/audioSynth";

const BASS_OPEN_MIDI: Record<number, number> = { 4: 28, 3: 33, 2: 38, 1: 43 }; // E1 A1 D2 G2
const GUITAR_OPEN_MIDI: Record<number, number> = { 6: 40, 5: 45, 4: 50, 3: 55, 2: 59, 1: 64 };

interface CourseVisualAidProps {
  instrumentId: CourseInstrumentId;
  meeting: CourseMeeting;
}

export function CourseVisualAid({ instrumentId, meeting }: CourseVisualAidProps) {
  // Metronome state initialized from API / meeting config
  const [bpm, setBpm] = useState<number>(meeting.targetBpm);
  const [timeSignature, setTimeSignature] = useState<"4/4" | "3/4" | "6/8">(
    meeting.timeSignature
  );
  const [metroPlaying, setMetroPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<number>(-1);
  const [apiSynced, setApiSynced] = useState(false);
  // Fitur latihan profesional: hitungan masuk 1 bar & tangga tempo (mulai pelan, naik bertahap)
  const [countInOn, setCountInOn] = useState(true);
  const [ladderOn, setLadderOn] = useState(false);
  const [liveBpm, setLiveBpm] = useState<number>(meeting.targetBpm);
  const [inCountIn, setInCountIn] = useState(false);
  const bpmRef = useRef<number>(meeting.targetBpm);

  useEffect(() => {
    bpmRef.current = bpm;
    if (!metroPlaying) setLiveBpm(bpm);
  }, [bpm, metroPlaying]);

  // Cajon pattern player state
  const [cajonPlaying, setCajonPlaying] = useState(false);
  const [activeCajonStep, setActiveCajonStep] = useState<number>(-1);

  // Practice Timer (counts down from meeting.practiceMinutes)
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    meeting.practiceMinutes * 60
  );

  const metroIntervalRef = useRef<number | null>(null);
  const cajonIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Fetch metronome & meeting config from /api/courses when meeting changes
  useEffect(() => {
    setMetroPlaying(false);
    setCajonPlaying(false);
    setTimerRunning(false);
    setBpm(meeting.targetBpm);
    setTimeSignature(meeting.timeSignature);
    setRemainingSeconds(meeting.practiceMinutes * 60);
    setApiSynced(false);

    let cancelled = false;
    fetch(
      `/api/courses?instrument=${encodeURIComponent(
        instrumentId
      )}&meeting=${encodeURIComponent(meeting.meetingNumber)}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.metronomeConfig) return;
        setBpm(data.metronomeConfig.bpm);
        setTimeSignature(data.metronomeConfig.timeSignature);
        setApiSynced(true);
      })
      .catch(() => {
        // Fallback to local meeting props if offline
      });

    return () => {
      cancelled = true;
    };
  }, [instrumentId, meeting]);

  // Embedded Metronome Engine: penjadwalan presisi berbasis AudioContext (lookahead),
  // sehingga tempo stabil seperti metronome profesional, lengkap hitungan masuk & tangga tempo.
  useEffect(() => {
    if (!metroPlaying) {
      setCurrentBeat(-1);
      setInCountIn(false);
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    const stepsPerBar =
      timeSignature === "3/4" ? 3 : timeSignature === "6/8" ? 6 : 4;
    // 6/8: BPM = denyut besar (dotted quarter) -> 3 klik per denyut
    const stepSeconds = (tempo: number) =>
      timeSignature === "6/8" ? 60 / tempo / 3 : 60 / tempo;

    const scheduleClick = (stepInBar: number, when: number, countIn: boolean) => {
      const isDownbeat = stepInBar === 0;
      const isSubAccent = timeSignature === "6/8" && stepInBar === 3;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(
        isDownbeat ? (countIn ? 1500 : 1100) : isSubAccent ? 930 : 780,
        when
      );
      const peak = isDownbeat ? 0.34 : isSubAccent ? 0.26 : timeSignature === "6/8" ? 0.12 : 0.2;
      gain.gain.setValueAtTime(0.001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(when);
      osc.stop(when + 0.055);
    };

    const target = () => bpmRef.current;
    const ladderStart = () => Math.max(40, Math.round(target() * 0.6));
    const ladderStep = () => Math.max(2, Math.round(target() * 0.05));

    let currentTempo = ladderOn ? ladderStart() : target();
    setLiveBpm(currentTempo);
    let barsAtTempo = 0;
    let countInStepsLeft = countInOn ? stepsPerBar : 0;
    let stepInBar = 0;
    let nextTime = ctx.currentTime + 0.1;
    const uiTimers: number[] = [];

    const scheduler = window.setInterval(() => {
      while (nextTime < ctx.currentTime + 0.15) {
        const countIn = countInStepsLeft > 0;
        scheduleClick(stepInBar, nextTime, countIn);
        const beatToShow = stepInBar;
        const delay = Math.max(0, (nextTime - ctx.currentTime) * 1000);
        uiTimers.push(
          window.setTimeout(() => {
            setCurrentBeat(beatToShow);
            setInCountIn(countIn);
          }, delay)
        );

        nextTime += stepSeconds(currentTempo);
        if (countIn) countInStepsLeft -= 1;
        stepInBar += 1;
        if (stepInBar >= stepsPerBar) {
          stepInBar = 0;
          if (!countIn) {
            barsAtTempo += 1;
            if (ladderOn) {
              if (barsAtTempo >= 4 && currentTempo < target()) {
                currentTempo = Math.min(target(), currentTempo + ladderStep());
                barsAtTempo = 0;
                setLiveBpm(currentTempo);
              }
            } else if (currentTempo !== target()) {
              currentTempo = target();
              setLiveBpm(currentTempo);
            }
          }
        }
      }
    }, 25);

    return () => {
      window.clearInterval(scheduler);
      uiTimers.forEach((t) => window.clearTimeout(t));
    };
  }, [metroPlaying, timeSignature, ladderOn, countInOn]);

  // Cajon Pattern Loop Engine
  useEffect(() => {
    if (!cajonPlaying || !meeting.cajonPattern) {
      if (cajonIntervalRef.current) {
        window.clearInterval(cajonIntervalRef.current);
        cajonIntervalRef.current = null;
      }
      setActiveCajonStep(-1);
      return;
    }

    const pattern = meeting.cajonPattern;
    let idx = 0;
    setActiveCajonStep(0);
    if (pattern[0].hit !== "-") {
      playCajonHit(pattern[0].hit);
    }

    // 4/4: 8 langkah = not perdelapan · 3/4: 3 langkah = not perempat · 6/8: 6 langkah = not perdelapan
    const stepMs =
      meeting.timeSignature === "3/4"
        ? (60 / bpm) * 1000
        : meeting.timeSignature === "6/8"
        ? (60 / bpm / 3) * 1000
        : (60 / bpm / 2) * 1000;
    cajonIntervalRef.current = window.setInterval(() => {
      idx = (idx + 1) % pattern.length;
      setActiveCajonStep(idx);
      const hit = pattern[idx].hit;
      if (hit !== "-") {
        playCajonHit(hit);
      }
    }, stepMs);

    return () => {
      if (cajonIntervalRef.current) {
        window.clearInterval(cajonIntervalRef.current);
        cajonIntervalRef.current = null;
      }
    };
  }, [cajonPlaying, bpm, meeting.cajonPattern, meeting.timeSignature]);

  // Practice Countdown Timer
  useEffect(() => {
    if (!timerRunning) {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [timerRunning]);

  const playBassFret = (stringNum: number, fret: number) => {
    const open = BASS_OPEN_MIDI[stringNum];
    if (open === undefined) return;
    playInstrumentNote(open + fret, "bass");
  };

  const bassFretCount = Math.max(
    5,
    ...(meeting.bassNotes?.map((b) => b.fret) ?? [5])
  );
  const bassFretW = 390 / bassFretCount;

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const beatsPerBar =
    timeSignature === "3/4" ? 3 : timeSignature === "6/8" ? 6 : 4;

  return (
    <div className="space-y-6">
      {/* 1. VISUAL DIAGRAM / GAMBAR ILUSTRASI */}
      <div className="p-4 sm:p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
              Ilustrasi Visual & Posisi Jari
            </span>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {meeting.visualCaption}
            </h4>
          </div>
          {instrumentId !== "cajon" && meeting.chordsToPractice && (
            <span className="text-[11px] font-mono text-zinc-500">
              Klik kartu diagram untuk dengar bunyi
            </span>
          )}
          {meeting.visualType === "guitar-anatomy" && (
            <span className="text-[11px] font-mono text-zinc-500">
              Klik senar untuk dengar nada setem
            </span>
          )}
        </div>

        {/* --- GUITAR ANATOMY SVG --- */}
        {meeting.visualType === "guitar-anatomy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800">
              <svg
                viewBox="0 0 420 195"
                className="w-full h-auto"
                role="img"
                aria-label="Diagram 6 Senar Gitar"
              >
                {/* Fretboard Background */}
                <rect
                  x="65"
                  y="18"
                  width="335"
                  height="155"
                  rx="4"
                  className="fill-zinc-100 dark:fill-zinc-900 stroke-zinc-400 dark:stroke-zinc-700"
                  strokeWidth="1.5"
                />
                {/* Nut */}
                <line
                  x1="65"
                  y1="18"
                  x2="65"
                  y2="173"
                  className="stroke-amber-500"
                  strokeWidth="5"
                />
                {/* Frets 1-4 */}
                {[145, 225, 305, 385].map((x, idx) => (
                  <g key={x}>
                    <line
                      x1={x}
                      y1="18"
                      x2={x}
                      y2="173"
                      className="stroke-zinc-300 dark:stroke-zinc-700"
                      strokeWidth="2"
                    />
                    <text
                      x={x - 40}
                      y="12"
                      textAnchor="middle"
                      className="fill-zinc-500 text-[10px] font-mono"
                    >
                      Fret {idx + 1}
                    </text>
                  </g>
                ))}
                {/* 6 Strings */}
                {[
                  { num: 6, note: "E2 (Tebal)", y: 32, w: 3.4 },
                  { num: 5, note: "A2", y: 58, w: 2.8 },
                  { num: 4, note: "D3", y: 84, w: 2.3 },
                  { num: 3, note: "G3", y: 110, w: 1.9 },
                  { num: 2, note: "B3", y: 136, w: 1.5 },
                  { num: 1, note: "E4 (Tipis)", y: 162, w: 1.1 },
                ].map((s) => (
                  <g
                    key={s.num}
                    onClick={() => playInstrumentNote(GUITAR_OPEN_MIDI[s.num], "guitar")}
                    className="cursor-pointer"
                  >
                    <rect x="0" y={s.y - 12} width="400" height="24" fill="transparent" />
                    <text
                      x="8"
                      y={s.y + 4}
                      className="fill-zinc-800 dark:fill-zinc-200 text-[10px] font-mono font-bold"
                    >
                      #{s.num} {s.note}
                    </text>
                    <line
                      x1="65"
                      y1={s.y}
                      x2="400"
                      y2={s.y}
                      className="stroke-amber-600 dark:stroke-amber-400"
                      strokeWidth={s.w}
                    />
                  </g>
                ))}
              </svg>
            </div>

            <div className="lg:col-span-5 p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs">
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                Kode Angka Jari Tangan Kiri:
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2 rounded-xs bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                  <strong className="text-amber-500">Jari 1</strong> = Telunjuk
                </div>
                <div className="p-2 rounded-xs bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                  <strong className="text-amber-500">Jari 2</strong> = Tengah
                </div>
                <div className="p-2 rounded-xs bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                  <strong className="text-amber-500">Jari 3</strong> = Manis
                </div>
                <div className="p-2 rounded-xs bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                  <strong className="text-amber-500">Jari 4</strong> = Kelingking
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Pastikan kuku tangan kiri pendek agar ujung jari dapat menekan senar secara tegak lurus.
              </p>
            </div>
          </div>
        )}

        {/* --- GUITAR STRUMMING ARROWS --- */}
        {meeting.visualType === "guitar-strumming" && meeting.strummingArrows && (
          <div className="p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Arah Ayunan Genjrengan Tangan Kanan (D = Bawah ↓, U = Atas ↑):
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {meeting.strummingArrows.map((arr, idx) => {
                const countLabel =
                  idx % 2 === 0 ? String(Math.floor(idx / 2) + 1) : "&";
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-md border text-center font-mono ${
                      arr === "-"
                        ? "border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-400"
                        : arr === "D"
                        ? "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                        : "border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-800 dark:text-zinc-200 font-bold"
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500">{countLabel}</div>
                    <div className="text-base mt-0.5">
                      {arr === "D" ? "↓ D" : arr === "U" ? "↑ U" : "·"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- BASS 4-STRING FRETBOARD SVG --- */}
        {(meeting.visualType === "bass-fretboard" ||
          meeting.visualType === "bass-groove") && (
          <div className="p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Peta Fretboard Bass 4 Senar (Klik bulatan nada untuk dengar bunyi Bass):
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                Senar 4 (Atas/Tebal) → Senar 1 (Bawah/Tipis)
              </span>
            </div>

            <svg
              viewBox="0 0 480 175"
              className="w-full h-auto"
              role="img"
              aria-label="Peta Fretboard Bass 4 Senar"
            >
              <rect
                x="70"
                y="22"
                width="390"
                height="130"
                rx="4"
                className="fill-zinc-100 dark:fill-zinc-900 stroke-zinc-400 dark:stroke-zinc-700"
                strokeWidth="1.5"
              />
              {/* Nut */}
              <line
                x1="70"
                y1="22"
                x2="70"
                y2="152"
                className="stroke-amber-500"
                strokeWidth="6"
              />
              {/* Frets (menyesuaikan jumlah fret yang dipakai materi) */}
              {Array.from({ length: bassFretCount }).map((_, i) => {
                const x = 70 + (i + 1) * bassFretW;
                return (
                  <g key={x}>
                    <line
                      x1={x}
                      y1="22"
                      x2={x}
                      y2="152"
                      className="stroke-zinc-300 dark:stroke-zinc-700"
                      strokeWidth="2"
                    />
                    <text
                      x={x - bassFretW / 2}
                      y="15"
                      textAnchor="middle"
                      className="fill-zinc-500 text-[10px] font-mono"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
              {/* Inlay dots (fret 3, 5, 7, 9, 12) */}
              {[3, 5, 7, 9, 12]
                .filter((f) => f <= bassFretCount)
                .map((f) => (
                  <circle
                    key={f}
                    cx={70 + (f - 0.5) * bassFretW}
                    cy="88"
                    r="5"
                    className="fill-zinc-300 dark:fill-zinc-800"
                  />
                ))}

              {/* 4 Bass Strings */}
              {[
                { num: 4, label: "Senar 4 (E)", y: 40, w: 4.2 },
                { num: 3, label: "Senar 3 (A)", y: 72, w: 3.4 },
                { num: 2, label: "Senar 2 (D)", y: 104, w: 2.6 },
                { num: 1, label: "Senar 1 (G)", y: 136, w: 2.0 },
              ].map((s) => (
                <g key={s.num}>
                  <text
                    x="6"
                    y={s.y + 4}
                    className="fill-zinc-800 dark:fill-zinc-200 text-[10px] font-mono font-bold"
                  >
                    {s.label}
                  </text>
                  <line
                    x1="70"
                    y1={s.y}
                    x2="460"
                    y2={s.y}
                    className="stroke-zinc-500 dark:stroke-zinc-400"
                    strokeWidth={s.w}
                  />
                </g>
              ))}

              {/* Highlighted Bass Notes */}
              {(
                meeting.bassNotes || [
                  { stringNum: 4, fret: 3, note: "G", role: "Root G" },
                  { stringNum: 4, fret: 2, note: "F#", role: "D/F#" },
                  { stringNum: 3, fret: 3, note: "C", role: "Root C" },
                  { stringNum: 3, fret: 5, note: "D", role: "Root D" },
                ]
              ).map((bn, idx) => {
                const yMap: Record<number, number> = {
                  4: 40,
                  3: 72,
                  2: 104,
                  1: 136,
                };
                const cx = bn.fret === 0 ? 58 : 70 + (bn.fret - 0.5) * bassFretW;
                const cy = yMap[bn.stringNum] || 40;
                return (
                  <g
                    key={idx}
                    onClick={() => playBassFret(bn.stringNum, bn.fret)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r="13"
                      className="fill-amber-500 stroke-zinc-950 stroke-2"
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      className="fill-zinc-950 text-[10px] font-mono font-bold select-none"
                    >
                      {bn.note}
                    </text>
                  </g>
                );
              })}
            </svg>

            {meeting.bassNotes && (
              <div className="flex flex-wrap gap-2 pt-1">
                {meeting.bassNotes.map((bn, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => playBassFret(bn.stringNum, bn.fret)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono hover:border-amber-500"
                  >
                    <Volume2 className="w-3 h-3 text-amber-500" />
                    <strong>{bn.note}</strong>
                    <span className="text-zinc-500">
                      (Senar {bn.stringNum} · Fret {bn.fret} · {bn.role})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PIANO KEYBOARD OVERVIEW SVG --- */}
        {meeting.visualType === "piano-keys" && (
          <div className="p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Peta Tuts Keyboard / Piano (Tangan Kiri: Bass Oktaf · Tangan Kanan: Chord Triad):
              </span>
              <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400">
                Patokan: C di kiri 2 tuts hitam · F di kiri 3 tuts hitam
              </span>
            </div>

            <svg
              viewBox="0 0 420 135"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram Tuts Piano 2 Oktaf"
            >
              {/* 14 White Keys (C3 to B4) */}
              {[
                "C3",
                "D3",
                "E3",
                "F3",
                "G3",
                "A3",
                "B3",
                "C4",
                "D4",
                "E4",
                "F4",
                "G4",
                "A4",
                "B4",
              ].map((note, idx) => {
                const x = 14 + idx * 28;
                const isHighlight =
                  note === "C3" ||
                  note === "G3" ||
                  note === "C4" ||
                  note === "E4" ||
                  note === "G4";
                return (
                  <g
                    key={note}
                    onClick={() => playInstrumentNote(noteToMidi(note), "piano")}
                    className="cursor-pointer"
                  >
                    <rect
                      x={x}
                      y="18"
                      width="26"
                      height="98"
                      rx="2"
                      className={
                        isHighlight
                          ? "fill-amber-500/25 stroke-amber-500"
                          : "fill-white dark:fill-zinc-200 stroke-zinc-400"
                      }
                      strokeWidth="1.2"
                    />
                    <text
                      x={x + 13}
                      y="106"
                      textAnchor="middle"
                      className="fill-zinc-800 text-[9px] font-mono font-bold select-none"
                    >
                      {note}
                    </text>
                  </g>
                );
              })}

              {/* Black Keys across 2 octaves (klik untuk dengar nada) */}
              {[
                { whiteIdx: 0, note: "C#3" },
                { whiteIdx: 1, note: "D#3" },
                { whiteIdx: 3, note: "F#3" },
                { whiteIdx: 4, note: "G#3" },
                { whiteIdx: 5, note: "A#3" },
                { whiteIdx: 7, note: "C#4" },
                { whiteIdx: 8, note: "D#4" },
                { whiteIdx: 10, note: "F#4" },
                { whiteIdx: 11, note: "G#4" },
                { whiteIdx: 12, note: "A#4" },
              ].map(({ whiteIdx, note }) => {
                const x = 14 + whiteIdx * 28 + 19;
                return (
                  <rect
                    key={whiteIdx}
                    x={x}
                    y="18"
                    width="16"
                    height="60"
                    rx="2"
                    onClick={() => playInstrumentNote(noteToMidi(note), "piano")}
                    className="fill-zinc-900 stroke-zinc-700 cursor-pointer hover:fill-zinc-700"
                  />
                );
              })}

              {/* Labels for Left Hand & Right Hand */}
              <text
                x="110"
                y="12"
                textAnchor="middle"
                className="fill-amber-600 dark:fill-amber-400 text-[10px] font-mono font-bold"
              >
                ← Wilayah Tangan Kiri (Bass)
              </text>
              <text
                x="305"
                y="12"
                textAnchor="middle"
                className="fill-amber-600 dark:fill-amber-400 text-[10px] font-mono font-bold"
              >
                Wilayah Tangan Kanan (Chord) →
              </text>
            </svg>
          </div>
        )}

        {/* --- CAJON ZONES & RHYTHM GRID --- */}
        {instrumentId === "cajon" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Interactive Cajon Box Front Plate SVG */}
            <div className="lg:col-span-5 p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center space-y-2">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 text-center">
                Gambar Zona Pukul Cajon (Klik Zona untuk Dengar Bunyi)
              </div>

              <svg
                viewBox="0 0 220 260"
                className="w-48 sm:w-52 h-auto"
                role="img"
                aria-label="Diagram Zona Pukul Cajon"
              >
                {/* Cajon Wooden Body */}
                <rect
                  x="25"
                  y="15"
                  width="170"
                  height="230"
                  rx="8"
                  className="fill-stone-200 dark:fill-stone-900 stroke-zinc-500 dark:stroke-zinc-600"
                  strokeWidth="3"
                />

                {/* Top Slap / Snare Zone */}
                <g
                  onClick={() => playCajonHit("S")}
                  className="cursor-pointer group"
                >
                  <rect
                    x="35"
                    y="24"
                    width="150"
                    height="46"
                    rx="4"
                    className="fill-amber-500/20 hover:fill-amber-500/35 stroke-amber-500 transition-colors"
                    strokeWidth="2"
                  />
                  <text
                    x="110"
                    y="45"
                    textAnchor="middle"
                    className="fill-amber-700 dark:fill-amber-300 text-[11px] font-mono font-bold select-none"
                  >
                    ZONA SLAP / SNARE (S)
                  </text>
                  <text
                    x="110"
                    y="60"
                    textAnchor="middle"
                    className="fill-zinc-600 dark:fill-zinc-400 text-[9px] font-mono select-none"
                  >
                    Tepi Atas · Bunyi &ldquo;TAK&rdquo;
                  </text>
                </g>

                {/* Middle Ghost / Touch Zone */}
                <g
                  onClick={() => playCajonHit("t")}
                  className="cursor-pointer"
                >
                  <rect
                    x="45"
                    y="76"
                    width="130"
                    height="32"
                    rx="4"
                    className="fill-zinc-300/50 dark:fill-zinc-800/70 hover:fill-zinc-300 stroke-zinc-400 dark:stroke-zinc-700 stroke-dashed transition-colors"
                    strokeWidth="1.5"
                  />
                  <text
                    x="110"
                    y="96"
                    textAnchor="middle"
                    className="fill-zinc-700 dark:fill-zinc-300 text-[10px] font-mono font-semibold select-none"
                  >
                    ZONA GHOST NOTE (t) · &ldquo;tik&rdquo;
                  </text>
                </g>

                {/* Center Bass Zone */}
                <g
                  onClick={() => playCajonHit("B")}
                  className="cursor-pointer"
                >
                  <circle
                    cx="110"
                    cy="158"
                    r="42"
                    className="fill-amber-500/25 hover:fill-amber-500/40 stroke-amber-500 transition-colors"
                    strokeWidth="2.5"
                  />
                  <text
                    x="110"
                    y="154"
                    textAnchor="middle"
                    className="fill-amber-700 dark:fill-amber-300 text-[11px] font-mono font-bold select-none"
                  >
                    ZONA BASS (B)
                  </text>
                  <text
                    x="110"
                    y="169"
                    textAnchor="middle"
                    className="fill-zinc-600 dark:fill-zinc-400 text-[9px] font-mono select-none"
                  >
                    Tengah · Bunyi &ldquo;DUUM&rdquo;
                  </text>
                </g>

                {/* Rubber Feet */}
                <rect x="38" y="245" width="22" height="6" rx="2" className="fill-zinc-700" />
                <rect x="160" y="245" width="22" height="6" rx="2" className="fill-zinc-700" />
              </svg>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => playCajonHit("B")}
                  className="px-2.5 py-1 rounded-xs border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-bold"
                >
                  Coba Bass (B)
                </button>
                <button
                  type="button"
                  onClick={() => playCajonHit("S")}
                  className="px-2.5 py-1 rounded-xs border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-800 dark:text-zinc-200 font-mono text-[11px] font-bold"
                >
                  Coba Slap (S)
                </button>
                <button
                  type="button"
                  onClick={() => playCajonHit("t")}
                  className="px-2.5 py-1 rounded-xs border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-600 dark:text-zinc-400 font-mono text-[11px]"
                >
                  Ghost (t)
                </button>
              </div>
            </div>

            {/* Interactive Cajon Rhythm Grid */}
            <div className="lg:col-span-7 p-4 rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                    Pola Ketukan Cajon Pertemuan #{meeting.meetingNumber}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    B = Bass (Tengah), S = Slap (Atas), t = Ghost Note (Ujung Jari Halus)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCajonPlaying((p) => !p)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold transition-colors ${
                    cajonPlaying
                      ? "bg-red-600 text-white"
                      : "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                  }`}
                >
                  {cajonPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Hentikan Contoh</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bunyikan Pola Cajon ({bpm} BPM)</span>
                    </>
                  )}
                </button>
              </div>

              {meeting.cajonPattern && (
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {meeting.cajonPattern.map((step, idx) => {
                    const isActive = cajonPlaying && activeCajonStep === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (step.hit !== "-") playCajonHit(step.hit);
                        }}
                        className={`p-3 rounded-md border text-center font-mono transition-all ${
                          isActive
                            ? "border-amber-500 bg-amber-500 text-zinc-950 scale-105 font-bold"
                            : step.hit === "B"
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold"
                            : step.hit === "S"
                            ? "border-zinc-400 dark:border-zinc-600 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100 font-bold"
                            : step.hit === "t"
                            ? "border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500"
                            : "border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <div className="text-[10px] opacity-75">{step.label}</div>
                        <div className="text-lg mt-0.5">{step.hit}</div>
                        <div className="text-[9px] uppercase mt-0.5">
                          {step.hit === "B"
                            ? "Duum"
                            : step.hit === "S"
                            ? "Tak"
                            : step.hit === "t"
                            ? "tik"
                            : "—"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- INTERACTIVE CHORD DIAGRAMS FOR GUITAR / BASS / PIANO --- */}
        {instrumentId !== "cajon" &&
          meeting.chordsToPractice &&
          meeting.chordsToPractice.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {meeting.chordsToPractice.slice(0, 4).map((chord) => (
                <ChordDiagramCard
                  key={chord}
                  chordSymbol={chord}
                  instrument={instrumentId}
                />
              ))}
            </div>
          )}
      </div>

      {/* 2. EMBEDDED METRONOME & TIMER LATIHAN (POWERED BY /api/courses) */}
      <div className="p-4 sm:p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left 7 cols: Metronome Tool */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                Alat Bantu Metronome Modul {apiSynced ? "· API Tersinkron" : ""}
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Target Tempo Pertemuan #{meeting.meetingNumber}: {bpm} BPM · Birama{" "}
                {timeSignature}
              </h4>
            </div>

            {/* Visual Beat Indicator Pills */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: beatsPerBar }).map((_, bIdx) => (
                <div
                  key={bIdx}
                  className={`w-7 h-7 rounded-sm font-mono text-xs font-bold flex items-center justify-center border transition-colors ${
                    metroPlaying && currentBeat === bIdx
                      ? "bg-amber-500 text-zinc-950 border-amber-500"
                      : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-500"
                  }`}
                >
                  {bIdx + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMetroPlaying((p) => !p)}
              className={`px-4 py-2 rounded-md text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                metroPlaying
                  ? "bg-red-600 text-white"
                  : "bg-amber-500 text-zinc-950 hover:bg-amber-400"
              }`}
            >
              {metroPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Metronome</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nyalakan Metronome ({bpm} BPM)</span>
                </>
              )}
            </button>

            <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
              <button
                type="button"
                onClick={() => setBpm((b) => Math.max(40, b - 4))}
                aria-label="Kurangi Tempo"
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {bpm} BPM
              </span>
              <button
                type="button"
                onClick={() => setBpm((b) => Math.min(200, b + 4))}
                aria-label="Tambah Tempo"
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setBpm(meeting.targetBpm);
                setTimeSignature(meeting.timeSignature);
              }}
              disabled={
                bpm === meeting.targetBpm &&
                timeSignature === meeting.timeSignature
              }
              className="px-2.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 disabled:opacity-40"
            >
              Reset ({meeting.targetBpm})
            </button>
          </div>

          {/* Fitur latihan profesional */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setCountInOn((v) => !v)}
              className={`px-2.5 py-1.5 rounded-md border font-mono transition-colors ${
                countInOn
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold"
                  : "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
              title="Satu bar hitungan sebelum Anda mulai bermain"
            >
              Hitungan Masuk 1 Bar: {countInOn ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setLadderOn((v) => !v)}
              className={`px-2.5 py-1.5 rounded-md border font-mono transition-colors ${
                ladderOn
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold"
                  : "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
              title="Mulai di 60% tempo target, naik bertahap tiap 4 bar sampai target"
            >
              Tangga Tempo: {ladderOn ? "ON" : "OFF"}
            </button>
            {metroPlaying && (
              <span className="font-mono text-zinc-500">
                {inCountIn ? "Hitungan masuk… siap-siap" : `Sekarang ${liveBpm} / target ${bpm} BPM`}
              </span>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Cara pakai: mulai pelan hingga bersih tanpa salah, baru naikkan tempo. Nyalakan{" "}
            <strong>Tangga Tempo</strong> agar tempo naik otomatis dari 60% menuju target.
            {timeSignature === "6/8" && " Untuk 6/8, angka BPM = denyut besar (1 denyut = 3 hitungan)."}
          </p>
        </div>

        {/* Right 5 cols: Practice Session Timer (45-75 mins) */}
        <div className="lg:col-span-5 p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>Timer Sesi Practice ({meeting.practiceMinutes} Menit)</span>
            </span>
            <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {formatTimer(remainingSeconds)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTimerRunning((r) => !r)}
              className={`px-3 py-2 rounded-md text-xs font-bold transition-colors ${
                timerRunning
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950"
              }`}
            >
              {timerRunning ? "Jeda" : "Mulai Timer"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setRemainingSeconds(meeting.practiceMinutes * 60);
              }}
              title="Reset Timer"
              className="p-2 rounded-md border border-zinc-300 dark:border-zinc-800 text-zinc-500 hover:text-amber-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
