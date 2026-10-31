"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ListChecks,
  RotateCcw,
  X,
  AlertTriangle,
  Play,
  Square,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  COURSES_DATA,
  CourseInstrumentId,
  InstrumentCourse,
  getMeetingPedagogy,
} from "@/data/coursesData";
import { CourseVisualAid } from "@/components/courses/CourseVisualAid";
import {
  CourseBonusSkillsSection,
  CourseInstrumentDictionary,
} from "@/components/courses/CourseExtrasSection";
import { COURSE_EXTRAS_DATA } from "@/data/courseExtrasData";
import {
  getAudioContext,
  playCajonHit,
  playChordPreview,
  playInstrumentNote,
} from "@/lib/audioSynth";
import { getNoteIndex } from "@/lib/transpose";
import { MEETING_GOALS, DAILY_ROUTINES } from "@/data/meetingGoals";

type ProgressMap = Record<string, boolean>;

export default function CourseClassroomPage() {
  const params = useParams<{ instrument: string }>();
  const instrumentParam = (params?.instrument || "guitar") as CourseInstrumentId;

  const course: InstrumentCourse | undefined = useMemo(
    () => COURSES_DATA.find((c) => c.id === instrumentParam),
    [instrumentParam]
  );

  const [selectedMeetingNum, setSelectedMeetingNum] = useState<number>(1);
  const [completedMap, setCompletedMap] = useState<ProgressMap>({});
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState<boolean>(false);
  const [activeBonusSkillIdx, setActiveBonusSkillIdx] = useState<number>(0);
  const [dictionaryModalOpen, setDictionaryModalOpen] = useState<boolean>(false);

  // Self-evaluation criteria checklist state per meeting
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});

  // 4-Bar Count-Along Drill Player state
  const [drillPlaying, setDrillPlaying] = useState<boolean>(false);
  const [drillBarIdx, setDrillBarIdx] = useState<number>(0);
  const [drillBeatIdx, setDrillBeatIdx] = useState<number>(0);
  const drillTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sonara_course_progress");
      if (saved) {
        const parsed: ProgressMap = JSON.parse(saved);
        setCompletedMap(parsed);

        if (course) {
          const firstIncomplete = course.meetings.find(
            (m) => !parsed[`${course.id}-${m.meetingNumber}`]
          );
          if (firstIncomplete) {
            setSelectedMeetingNum(firstIncomplete.meetingNumber);
          }
        }
      }
    } catch {
      // ignore storage errors
    }
  }, [course]);

  const activeMeeting = useMemo(() => {
    if (!course) return null;
    return (
      course.meetings.find((m) => m.meetingNumber === selectedMeetingNum) ||
      course.meetings[0]
    );
  }, [course, selectedMeetingNum]);

  const pedagogy = useMemo(() => {
    if (!course || !activeMeeting) return null;
    return getMeetingPedagogy(course.id, activeMeeting);
  }, [course, activeMeeting]);

  // Stop 4-Bar Drill when switching meetings
  useEffect(() => {
    setDrillPlaying(false);
    setDrillBarIdx(0);
    setDrillBeatIdx(0);
  }, [selectedMeetingNum, instrumentParam]);

  // 4-Bar Count-Along Drill Audio & Visual Loop
  useEffect(() => {
    if (!drillPlaying || !activeMeeting || !pedagogy || !course) {
      if (drillTimerRef.current) {
        window.clearInterval(drillTimerRef.current);
        drillTimerRef.current = null;
      }
      return;
    }

    const beatsPerBar =
      activeMeeting.timeSignature === "3/4"
        ? 3
        : activeMeeting.timeSignature === "6/8"
        ? 6
        : 4;

    // Chord / nada yang dibunyikan tiap bar diambil dari data pertemuan (bukan dari teks label)
    const chordForBar = (barIndex: number): string => {
      if (course.id === "bass") {
        const notes = activeMeeting.bassNotes ?? [];
        const raw = notes.length ? notes[barIndex % notes.length].note : "C";
        const paren = raw.match(/\(([A-G][#b]?)\)/);
        const lead = raw.match(/^[A-G][#b]?/);
        return paren ? paren[1] : lead ? lead[0] : "C";
      }
      const chords = activeMeeting.chordsToPractice ?? [];
      return chords.length ? chords[barIndex % chords.length] : "C";
    };

    const triggerBarBeatSound = (barIndex: number, beatIndex: number) => {
      const ctx = getAudioContext();
      if (ctx) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(beatIndex === 0 ? 1120 : 780, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(
          beatIndex === 0 ? 0.28 : 0.15,
          now + 0.004
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }

      if (course.id === "cajon") {
        const pattern = activeMeeting.cajonPattern;
        const hit =
          pattern && pattern.length === beatsPerBar
            ? pattern[beatIndex].hit
            : beatIndex === 0
            ? "B"
            : beatIndex % 2 === 1
            ? "S"
            : "t";
        if (hit !== "-") playCajonHit(hit);
      } else if (beatIndex === 0) {
        const target = chordForBar(barIndex);
        if (course.id === "bass") {
          playInstrumentNote(28 + (((getNoteIndex(target) - 4) % 12) + 12) % 12, "bass");
        } else {
          playChordPreview(target, course.id);
        }
      }
    };

    let step = 0;
    setDrillBarIdx(0);
    setDrillBeatIdx(0);
    triggerBarBeatSound(0, 0);

    // 6/8: BPM = denyut besar -> 3 hitungan per denyut
    const ms =
      activeMeeting.timeSignature === "6/8"
        ? (60 / activeMeeting.targetBpm / 3) * 1000
        : (60 / activeMeeting.targetBpm) * 1000;
    drillTimerRef.current = window.setInterval(() => {
      step = (step + 1) % (4 * beatsPerBar);
      const nextBar = Math.floor(step / beatsPerBar);
      const nextBeat = step % beatsPerBar;
      setDrillBarIdx(nextBar);
      setDrillBeatIdx(nextBeat);
      triggerBarBeatSound(nextBar, nextBeat);
    }, ms);

    return () => {
      if (drillTimerRef.current) {
        window.clearInterval(drillTimerRef.current);
        drillTimerRef.current = null;
      }
    };
  }, [drillPlaying, activeMeeting, pedagogy, course]);

  if (!course || !activeMeeting || !pedagogy) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Kelas kursus tidak ditemukan
        </h1>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-zinc-950 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Kursus</span>
        </Link>
      </div>
    );
  }

  const completedCount = course.meetings.filter(
    (m) => completedMap[`${course.id}-${m.meetingNumber}`]
  ).length;
  const progressPct = completedCount * 10;

  const isCurrentDone = Boolean(
    completedMap[`${course.id}-${activeMeeting.meetingNumber}`]
  );

  const markMeetingStatus = (meetingNum: number, done: boolean) => {
    const key = `${course.id}-${meetingNum}`;
    setCompletedMap((prev) => {
      const next = { ...prev, [key]: done };
      try {
        localStorage.setItem("sonara_course_progress", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSelectMeeting = (num: number) => {
    const clamped = Math.max(1, Math.min(10, num));
    setSelectedMeetingNum(clamped);
    setMobileSyllabusOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCompleteAndContinue = () => {
    markMeetingStatus(activeMeeting.meetingNumber, true);
    if (activeMeeting.meetingNumber < 10) {
      handleSelectMeeting(activeMeeting.meetingNumber + 1);
    }
  };

  const handleResetCourseProgress = () => {
    setCompletedMap((prev) => {
      const next = { ...prev };
      for (let i = 1; i <= 10; i++) {
        delete next[`${course.id}-${i}`];
      }
      try {
        localStorage.setItem("sonara_course_progress", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleCriterion = (idx: number) => {
    const cKey = `${course.id}-${activeMeeting.meetingNumber}-crit-${idx}`;
    setCheckedCriteria((prev) => ({ ...prev, [cKey]: !prev[cKey] }));
  };

  const extras = COURSE_EXTRAS_DATA[course.id];

  const handleJumpToBonusSkill = (skillIdx: number) => {
    setActiveBonusSkillIdx(skillIdx);
    setMobileSyllabusOpen(false);
    if (typeof window !== "undefined") {
      const el = document.getElementById("section-skill-tambahan");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleScrollToDictionary = () => {
    setMobileSyllabusOpen(false);
    if (typeof window !== "undefined") {
      const el = document.getElementById("section-kamus-instrumen");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dicoding-Style Top Classroom Bar */}
      <div className="sticky top-16 z-30 border-b border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-[#141417]/95 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back to Course List + Course Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-amber-500 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Daftar Kursus</span>
            </Link>

            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                Kelas Pemula: {course.name}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 truncate">
                Pertemuan {activeMeeting.meetingNumber} dari 10 ·{" "}
                {activeMeeting.title}
              </div>
            </div>
          </div>

          {/* Right: Quick Dictionary Button + Progress Indicator + Mobile Syllabus Button */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              type="button"
              onClick={() => setDictionaryModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-500/60 bg-amber-500/10 hover:bg-amber-500 hover:text-zinc-950 text-amber-700 dark:text-amber-300 text-xs font-bold transition-colors"
              title="Buka Kamus Chord & Pola Ketukan khusus kelas ini tanpa meninggalkan materi"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {course.id === "cajon"
                  ? "Kamus Ketukan"
                  : `Kamus Chord ${course.shortName}`}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-zinc-800 dark:text-zinc-200">
                  {completedCount}/10 Modul ({progressPct}%)
                </div>
              </div>
              <div className="w-24 h-2 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
                <div
                  style={{ width: `${progressPct}%` }}
                  className="h-full bg-amber-500 transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileSyllabusOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              <ListChecks className="w-3.5 h-3.5 text-amber-500" />
              <span>Modul ({completedCount}/10)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dicoding Classroom Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
        {/* Left 8 cols: Active Module Content */}
        <main className="lg:col-span-8 space-y-6">
          {/* 1. Module Header, Theory & Glossary */}
          <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-xs bg-amber-500 text-zinc-950 font-mono text-xs font-bold">
                    MODUL PERTEMUAN {String(activeMeeting.meetingNumber).padStart(2, "0")}
                  </span>
                  {activeMeeting.meetingNumber <= 5 ? (
                    <span className="px-2 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px] font-semibold border border-zinc-300 dark:border-zinc-700">
                      Fase 1: Fondasi Inti
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-semibold border border-amber-500/40">
                      Fase 2: Masterclass Musik Gereja
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>
                      Durasi {activeMeeting.durationMinutes} Menit ({activeMeeting.theoryMinutes}m Materi +{" "}
                      {activeMeeting.practiceMinutes}m Practice)
                    </span>
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 pt-1">
                  {activeMeeting.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  {activeMeeting.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  markMeetingStatus(
                    activeMeeting.meetingNumber,
                    !isCurrentDone
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold border shrink-0 transition-colors self-start ${
                  isCurrentDone
                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-800 dark:text-zinc-200 hover:border-amber-500"
                }`}
              >
                {isCurrentDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Sudah Selesai</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-zinc-400" />
                    <span>Tandai Selesai</span>
                  </>
                )}
              </button>
            </div>

            {/* Concise Theory & Key Points */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500">
                1 · Materi & Teknik Dasar ({activeMeeting.theoryMinutes} Menit)
              </h2>

              {MEETING_GOALS[`${course.id}-${activeMeeting.meetingNumber}`] && (
                <div className="p-3.5 rounded-md border border-amber-500/50 bg-amber-500/10 text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                    Target pertemuan ini
                  </span>
                  <strong>{MEETING_GOALS[`${course.id}-${activeMeeting.meetingNumber}`]}</strong>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2 pt-1">
                {activeMeeting.keyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-xs bg-amber-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <details className="group rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417]">
                <summary className="cursor-pointer select-none px-3.5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400">
                  Baca penjelasan lengkap (opsional)
                </summary>
                <p className="px-3.5 pb-3.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {activeMeeting.summary}
                </p>
              </details>

              {DAILY_ROUTINES[course.id] && (
                <div className="p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] space-y-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                    {DAILY_ROUTINES[course.id].title}
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed list-disc pl-4">
                    {DAILY_ROUTINES[course.id].steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Plain-Indonesian Glossary Box */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Kamus Istilah (Bahasa Sehari-hari):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {pedagogy.glossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 text-xs"
                  >
                    <div className="font-bold text-amber-700 dark:text-amber-400">
                      {g.term}
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 leading-snug">
                      {g.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Visual Illustration + API Metronome & Timer */}
          <CourseVisualAid
            instrumentId={course.id}
            meeting={activeMeeting}
          />

          {/* 3. Interactive 4-Bar Count-Along Drill (Latihan Hitungan 1-2-3-4) */}
          <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                  Latihan Hitungan Terpandu (Count-Along Drill)
                </span>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Simulasi Hitungan 4 Bar ({activeMeeting.targetBpm} BPM · Birama{" "}
                  {activeMeeting.timeSignature})
                </h2>
                <p className="text-xs text-zinc-500">
                  Tekan tombol di kanan lalu ikuti sorotan ketukan 1-2-3-4 untuk melatih ketepatan waktu pindah tangan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDrillPlaying((p) => !p)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                  drillPlaying
                    ? "bg-red-600 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
                }`}
              >
                {drillPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Hentikan Simulasi</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar Simulasi 4 Bar</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {pedagogy.barDrill.map((bar, bIdx) => {
                const isBarActive = drillPlaying && drillBarIdx === bIdx;
                return (
                  <div
                    key={bar.barNumber}
                    className={`p-3.5 rounded-md border transition-all space-y-2.5 ${
                      isBarActive
                        ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                        : "border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">
                        BAR {bar.barNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold">
                        {bar.targetLabel}
                      </span>
                    </div>

                    {/* Beat Pills inside Bar */}
                    <div className="grid grid-cols-4 gap-1">
                      {bar.counts.map((cnt, cIdx) => {
                        const isBeatActive =
                          isBarActive && drillBeatIdx === cIdx;
                        return (
                          <div
                            key={cIdx}
                            className={`py-1.5 rounded-xs text-center font-mono text-xs font-bold border ${
                              isBeatActive
                                ? "bg-amber-500 text-zinc-950 border-amber-500"
                                : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            }`}
                          >
                            {cnt}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                      {bar.cue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Common Beginner Mistakes & Fixes (Troubleshooting) */}
          <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Kendala Umum Pemula & Cara Mengatasinya
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pedagogy.commonMistakes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs"
                >
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">
                    Kendala: &ldquo;{item.problem}&rdquo;
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong className="text-amber-600 dark:text-amber-400">
                      Solusi:{" "}
                    </strong>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Structured Practice Session + Self-Evaluation Checklist */}
          <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                  2 · Latihan Praktik Terarah ({activeMeeting.practiceMinutes} Menit)
                </span>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Panduan Practice Mandiri Pertemuan #{activeMeeting.meetingNumber}
                </h2>
              </div>

              <Link
                href={`/songs/${activeMeeting.recommendedSongSlug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500 hover:text-zinc-950 transition-colors"
              >
                <span>Buka Lagu Latihan: {activeMeeting.recommendedSongTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeMeeting.practiceSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
                      Tahap {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 font-mono text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {step.minutes} Menit
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {step.phase}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Self-Evaluation Checklist before advancing */}
            <div className="p-4 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Checklist Evaluasi Mandiri (Centang bila Anda sudah berhasil melakukannya):
              </div>
              <div className="space-y-1.5">
                {pedagogy.graduationCriteria.map((crit, idx) => {
                  const cKey = `${course.id}-${activeMeeting.meetingNumber}-crit-${idx}`;
                  const checked = Boolean(checkedCriteria[cKey]) || isCurrentDone;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleCriterion(idx)}
                      className="w-full text-left p-2.5 rounded-sm bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs hover:border-amber-500/60 transition-colors"
                    >
                      {checked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          checked
                            ? "text-zinc-900 dark:text-zinc-100 font-medium"
                            : "text-zinc-600 dark:text-zinc-400"
                        }
                      >
                        {crit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dicoding-Style Bottom Module Navigation */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  handleSelectMeeting(activeMeeting.meetingNumber - 1)
                }
                disabled={activeMeeting.meetingNumber <= 1}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200 disabled:opacity-40 disabled:pointer-events-none hover:border-amber-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Pertemuan Sebelumnya</span>
              </button>

              {activeMeeting.meetingNumber < 10 ? (
                <button
                  type="button"
                  onClick={handleCompleteAndContinue}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Selesaikan & Lanjut ke Pertemuan #
                    {activeMeeting.meetingNumber + 1}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => markMeetingStatus(10, true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan Evaluasi Akhir Kelas</span>
                </button>
              )}
            </div>
          </div>

          {/* 6. Section Baru di Bawah Latihan ke-10: Belajar Skill Tambahan (Fill-In, Transisi & Improvisasi) */}
          <CourseBonusSkillsSection
            instrumentId={course.id}
            activeSkillIndex={activeBonusSkillIdx}
            onSelectSkillIndex={setActiveBonusSkillIdx}
          />

          {/* 7. Kamus Diagram Chord, Slash Chord & Pola Ketukan Khusus Instrumen Ini */}
          <CourseInstrumentDictionary instrumentId={course.id} />
        </main>

        {/* Right 4 cols (Desktop): Dicoding-Style Sticky Syllabus Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-32 space-y-3">
          <div className="p-4 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Daftar Modul ({course.shortName})
                </h3>
                <p className="text-[11px] font-mono text-zinc-500">
                  {completedCount} dari 10 pertemuan selesai
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetCourseProgress}
                disabled={completedCount === 0}
                title="Reset Progres Kelas Ini"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-xs border text-[11px] font-mono transition-colors ${
                  completedCount > 0
                    ? "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-amber-500 cursor-pointer"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 opacity-40 cursor-default"
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-[72vh] overflow-y-auto pr-1">
              {course.meetings.map((m) => {
                const isCurrent =
                  m.meetingNumber === activeMeeting.meetingNumber;
                const isDone = Boolean(
                  completedMap[`${course.id}-${m.meetingNumber}`]
                );

                return (
                  <button
                    key={m.meetingNumber}
                    type="button"
                    onClick={() => handleSelectMeeting(m.meetingNumber)}
                    className={`w-full p-2.5 rounded-md border text-left transition-colors flex items-start gap-2.5 ${
                      isCurrent
                        ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                        : "border-zinc-200 dark:border-zinc-800/90 bg-[#f6f5f2] dark:bg-[#0d0d0f] hover:border-zinc-400 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-xs font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? "bg-amber-500 text-zinc-950"
                          : isDone
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                          : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-300 dark:border-zinc-800"
                      }`}
                    >
                      {isDone ? "✓" : String(m.meetingNumber).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-xs font-bold leading-snug ${
                          isCurrent
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {m.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs ${
                            m.meetingNumber <= 5
                              ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                              : "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                          }`}
                        >
                          {m.meetingNumber <= 5 ? "Fondasi" : "Skill Gereja"}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {m.durationMinutes}m · {m.targetBpm} BPM
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Section Baru di Bawah Latihan ke-10 dalam Sidebar: Belajar Skill Tambahan */}
              <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="px-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Skill Tambahan (Pasca Modul 10)</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {extras.bonusSkills.length} Materi
                  </span>
                </div>

                {extras.bonusSkills.map((sk, idx) => (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => handleJumpToBonusSkill(idx)}
                    className={`w-full p-2 rounded-md border text-left transition-colors flex items-start gap-2 ${
                      activeBonusSkillIdx === idx
                        ? "border-amber-500/70 bg-amber-500/10"
                        : "border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] hover:border-amber-500/50"
                    }`}
                  >
                    <span className="mt-0.5 px-1.5 py-0.5 rounded-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold shrink-0">
                      +{sk.skillNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1">
                        {sk.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {sk.badge} · {sk.targetBpm} BPM
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pintasan Kamus Chord & Ketukan di Sidebar */}
              <div className="pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="px-1 text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-500">
                  Referensi Cepat ({course.shortName})
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDictionaryModalOpen(true)}
                    className="p-2 rounded-md border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500 hover:text-zinc-950 text-amber-700 dark:text-amber-300 text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>Popup Kamus</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleScrollToDictionary}
                    className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] hover:border-amber-500 text-zinc-800 dark:text-zinc-200 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Ke Bagian Kamus</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Slide-Over Syllabus Drawer */}
      {mobileSyllabusOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-sm bg-white dark:bg-[#141417] h-full p-5 flex flex-col justify-between border-l border-zinc-300 dark:border-zinc-800">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Daftar 10 Modul & Ekstra ({course.shortName})
                  </h3>
                  <p className="text-xs font-mono text-zinc-500">
                    Progres: {completedCount}/10 Selesai ({progressPct}%)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSyllabusOpen(false)}
                  className="p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {course.meetings.map((m) => {
                  const isCurrent =
                    m.meetingNumber === activeMeeting.meetingNumber;
                  const isDone = Boolean(
                    completedMap[`${course.id}-${m.meetingNumber}`]
                  );

                  return (
                    <button
                      key={m.meetingNumber}
                      type="button"
                      onClick={() => handleSelectMeeting(m.meetingNumber)}
                      className={`w-full p-3 rounded-md border text-left transition-colors flex items-start gap-2.5 ${
                        isCurrent
                          ? "border-amber-500 bg-amber-500/15"
                          : "border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f]"
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-6 h-6 rounded-xs font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-amber-500 text-zinc-950"
                            : isDone
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                            : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-300 dark:border-zinc-800"
                        }`}
                      >
                        {isDone ? "✓" : String(m.meetingNumber).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {m.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs ${
                              m.meetingNumber <= 5
                                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                            }`}
                          >
                            {m.meetingNumber <= 5 ? "Fondasi" : "Skill Gereja"}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {m.durationMinutes}m · {m.targetBpm} BPM
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Drawer: Skill Tambahan di bawah Pertemuan 10 */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Skill Tambahan (Di Bawah Latihan 10)</span>
                </div>
                {extras.bonusSkills.map((sk, idx) => (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => handleJumpToBonusSkill(idx)}
                    className="w-full p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-left flex items-start gap-2"
                  >
                    <span className="px-1.5 py-0.5 rounded-xs bg-amber-500 text-zinc-950 font-mono text-[10px] font-bold shrink-0">
                      +{sk.skillNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {sk.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {sk.badge} · {sk.targetBpm} BPM
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Drawer: Pintasan Kamus */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileSyllabusOpen(false);
                    setDictionaryModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-md bg-amber-500 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    Buka {course.id === "cajon" ? "Kamus Ketukan Cajon" : `Kamus Chord & Ketukan ${course.shortName}`}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetCourseProgress}
                disabled={completedCount === 0}
                className="text-xs font-mono text-zinc-500 disabled:opacity-40"
              >
                Reset Progres
              </button>
              <button
                type="button"
                onClick={() => setMobileSyllabusOpen(false)}
                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick-Access Instrument Dictionary Modal / Drawer (Mobile & Desktop) */}
      {dictionaryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-5xl max-h-[90vh] sm:max-h-[86vh] bg-white dark:bg-[#141417] border-t sm:border border-zinc-300 dark:border-zinc-800 rounded-t-xl sm:rounded-md flex flex-col overflow-hidden shadow-2xl">
            <div className="px-4 sm:px-6 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 bg-[#f6f5f2] dark:bg-[#0d0d0f]">
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Referensi Cepat Tanpa Meninggalkan Pertemuan #{activeMeeting.meetingNumber}
                </div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {extras.dictionaryTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setDictionaryModalOpen(false)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:border-amber-500 shrink-0"
              >
                <X className="w-4 h-4" />
                <span>Tutup Kamus</span>
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <CourseInstrumentDictionary instrumentId={course.id} isModal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
