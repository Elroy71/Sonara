"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Play,
  Square,
  Volume2,
  Sparkles,
  Search,
  Drum,
  Music,
  CheckCircle2,
} from "lucide-react";
import { CourseInstrumentId } from "@/data/coursesData";
import {
  COURSE_EXTRAS_DATA,
  BonusSkillModule,
  CajonBeatStep,
  InstrumentRhythmPattern,
} from "@/data/courseExtrasData";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";
import {
  playCajonHit,
  playChordPreview,
  playInstrumentNote,
} from "@/lib/audioSynth";

function triggerCajonBeat(hit: CajonBeatStep["hit"]) {
  if (hit === "-") return;
  if (hit === "T") {
    playCajonHit("S");
    return;
  }
  playCajonHit(hit);
}

interface CourseBonusSkillsProps {
  instrumentId: CourseInstrumentId;
  activeSkillIndex?: number;
  onSelectSkillIndex?: (idx: number) => void;
}

export function CourseBonusSkillsSection({
  instrumentId,
  activeSkillIndex = 0,
  onSelectSkillIndex,
}: CourseBonusSkillsProps) {
  const extras = COURSE_EXTRAS_DATA[instrumentId];
  const [internalSkillIdx, setInternalSkillIdx] = useState<number>(activeSkillIndex);

  useEffect(() => {
    setInternalSkillIdx(activeSkillIndex);
  }, [activeSkillIndex]);

  const currentIdx =
    onSelectSkillIndex !== undefined ? activeSkillIndex : internalSkillIdx;
  const setSkillIdx = (idx: number) => {
    setInternalSkillIdx(idx);
    onSelectSkillIndex?.(idx);
  };

  const activeSkill: BonusSkillModule =
    extras.bonusSkills[currentIdx] || extras.bonusSkills[0];

  // State for playing Cajon fill-in or Bass lick sequence
  const [playingDemo, setPlayingDemo] = useState<boolean>(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setPlayingDemo(false);
    setActiveStepIdx(-1);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [currentIdx, instrumentId]);

  useEffect(() => {
    if (!playingDemo) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setActiveStepIdx(-1);
      return;
    }

    if (instrumentId === "cajon" && activeSkill.demoCajonSteps?.length) {
      const steps = activeSkill.demoCajonSteps;
      const ms = (60 / activeSkill.targetBpm / 2) * 1000;
      let idx = 0;
      setActiveStepIdx(0);
      triggerCajonBeat(steps[0].hit);

      timerRef.current = window.setInterval(() => {
        idx = (idx + 1) % steps.length;
        setActiveStepIdx(idx);
        triggerCajonBeat(steps[idx].hit);
      }, ms);
    } else if (
      instrumentId === "bass" &&
      activeSkill.demoBassMidiNotes?.length
    ) {
      const notes = activeSkill.demoBassMidiNotes;
      const ms = (60 / activeSkill.targetBpm) * 1000;
      let idx = 0;
      setActiveStepIdx(0);
      playInstrumentNote(notes[0].midi, "bass");

      timerRef.current = window.setInterval(() => {
        idx = (idx + 1) % notes.length;
        setActiveStepIdx(idx);
        playInstrumentNote(notes[idx].midi, "bass");
      }, ms);
    } else if (activeSkill.demoChords?.length) {
      const chords = activeSkill.demoChords;
      const ms = (60 / activeSkill.targetBpm) * 2 * 1000;
      let idx = 0;
      setActiveStepIdx(0);
      playChordPreview(
        chords[0],
        instrumentId === "cajon" ? "guitar" : instrumentId
      );

      timerRef.current = window.setInterval(() => {
        idx = (idx + 1) % chords.length;
        setActiveStepIdx(idx);
        playChordPreview(
          chords[idx],
          instrumentId === "cajon" ? "guitar" : instrumentId
        );
      }, ms);
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playingDemo, activeSkill, instrumentId]);

  const instrumentLabel =
    instrumentId === "guitar"
      ? "Gitar"
      : instrumentId === "bass"
      ? "Bass"
      : instrumentId === "piano"
      ? "Piano / Keyboard"
      : "Cajon";

  return (
    <section
      id="section-skill-tambahan"
      className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5 scroll-mt-28"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modul Lanjutan Pasca Pertemuan 10 · Khusus {instrumentLabel}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Belajar Skill Tambahan: Fill-In, Transisi & Improvisasi {instrumentLabel}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Kumpulan teknik praktis untuk memperindah permainan saat mengiringi ibadah tanpa mengganggu vokal utama.
          </p>
        </div>

        <span className="self-start sm:self-end px-2.5 py-1 rounded-xs bg-amber-500/15 border border-amber-500/40 font-mono text-xs font-bold text-amber-700 dark:text-amber-300 shrink-0">
          {extras.bonusSkills.length} Skill Tambahan
        </span>
      </div>

      {/* Responsive Skill Selector Pills (Scrollable on Mobile, Grid/Wrap on Web) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {extras.bonusSkills.map((sk, idx) => {
          const active = idx === currentIdx;
          return (
            <button
              key={sk.id}
              type="button"
              onClick={() => setSkillIdx(idx)}
              className={`p-3 rounded-md border text-left transition-all flex flex-col justify-between gap-1.5 ${
                active
                  ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                  : "border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] hover:border-zinc-400 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs ${
                    active
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  SKILL #{sk.skillNumber}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {sk.targetBpm} BPM
                </span>
              </div>
              <div
                className={`text-xs font-bold line-clamp-2 leading-snug ${
                  active
                    ? "text-amber-700 dark:text-amber-300"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {sk.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Skill Detail Card */}
      <div className="p-4 sm:p-5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3.5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-xs bg-amber-500 text-zinc-950 font-mono text-[11px] font-bold">
                {activeSkill.badge}
              </span>
              <span className="px-2 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                Tempo Latihan: {activeSkill.targetBpm} BPM · Birama {activeSkill.timeSignature}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 pt-1">
              {activeSkill.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {activeSkill.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPlayingDemo((p) => !p)}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold shrink-0 transition-colors ${
              playingDemo
                ? "bg-red-600 text-white"
                : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
            }`}
          >
            {playingDemo ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Hentikan Simulasi</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Putar Simulasi Skill</span>
              </>
            )}
          </button>
        </div>

        {/* When to Use Box */}
        <div className="p-3.5 rounded-md border border-amber-500/40 bg-amber-500/10 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 block mb-0.5">
            Kapan Digunakan Saat Ibadah?
          </span>
          <span>{activeSkill.whenToUse}</span>
        </div>

        {/* Visual Pattern / Formula Lines */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            {activeSkill.visualPatternTitle}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {activeSkill.visualPatternLines.map((line, i) => (
              <div
                key={i}
                className="p-3 rounded-sm bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed"
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instrument-Specific Demo Area */}
        {instrumentId === "cajon" && activeSkill.demoCajonSteps && (
          <div className="space-y-2.5 pt-1">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Ketukan Interaktif (Klik kotak ketukan untuk mendengar warna suara Cajon):
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {activeSkill.demoCajonSteps.map((step, sIdx) => {
                const isCurr = playingDemo && activeStepIdx === sIdx;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => triggerCajonBeat(step.hit)}
                    className={`p-2.5 rounded-md border text-center transition-all ${
                      isCurr
                        ? "border-amber-500 bg-amber-500 text-zinc-950 scale-105"
                        : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-amber-500"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      Hit {step.beatLabel}
                    </div>
                    <div className="text-base font-mono font-bold my-0.5">
                      {step.hit}
                    </div>
                    <div className="text-[10px] font-mono opacity-75">
                      Tangan {step.hand}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {instrumentId === "bass" && activeSkill.demoBassMidiNotes && (
          <div className="space-y-2.5 pt-1">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Urutan Nada Bass (Klik tiap tombol untuk mendengar bunyi petikan Bass):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {activeSkill.demoBassMidiNotes.map((item, nIdx) => {
                const isCurr = playingDemo && activeStepIdx === nIdx;
                return (
                  <button
                    key={nIdx}
                    type="button"
                    onClick={() => playInstrumentNote(item.midi, "bass")}
                    className={`p-3 rounded-md border text-left transition-all flex items-center justify-between gap-2 ${
                      isCurr
                        ? "border-amber-500 bg-amber-500 text-zinc-950 font-bold"
                        : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] text-zinc-900 dark:text-zinc-100 hover:border-amber-500"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono opacity-70">
                        Langkah {nIdx + 1}
                      </div>
                      <div className="text-xs font-mono font-bold">
                        {item.label}
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 shrink-0 text-amber-500" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {instrumentId !== "cajon" && activeSkill.demoChords && (
          <div className="space-y-3 pt-1">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Diagram & Suara Chord Latihan ({instrumentLabel}):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeSkill.demoChords.slice(0, 6).map((ch, cIdx) => (
                <ChordDiagramCard
                  key={`${ch}-${cIdx}`}
                  chordSymbol={ch}
                  instrument={instrumentId}
                  isSelected={playingDemo && activeStepIdx === cIdx}
                  onSelect={() => playChordPreview(ch, instrumentId)}
                  compact
                />
              ))}
            </div>
          </div>
        )}

        {/* 3 Practice Steps */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Langkah Latihan Cepat (3 Menit):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {activeSkill.practiceSteps.map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-3 rounded-sm bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CourseInstrumentDictionaryProps {
  instrumentId: CourseInstrumentId;
  isModal?: boolean;
}

export function CourseInstrumentDictionary({
  instrumentId,
  isModal = false,
}: CourseInstrumentDictionaryProps) {
  const extras = COURSE_EXTRAS_DATA[instrumentId];

  // Active tab: either one of the chordCategories ids or "rhythm-patterns"
  const [activeTabId, setActiveTabId] = useState<string>(
    instrumentId === "cajon"
      ? "rhythm-patterns"
      : extras.chordCategories[0]?.id || "rhythm-patterns"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rhythmCategoryFilter, setRhythmCategoryFilter] = useState<string>("all");

  // Reset default tab when switching instruments
  useEffect(() => {
    setActiveTabId(
      instrumentId === "cajon"
        ? "rhythm-patterns"
        : COURSE_EXTRAS_DATA[instrumentId].chordCategories[0]?.id ||
            "rhythm-patterns"
    );
    setSearchQuery("");
    setRhythmCategoryFilter("all");
  }, [instrumentId]);

  // Rhythm audio player state
  const [playingRhythmId, setPlayingRhythmId] = useState<string | null>(null);
  const [rhythmStepIdx, setRhythmStepIdx] = useState<number>(0);
  const rhythmTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playingRhythmId) {
      if (rhythmTimerRef.current) {
        window.clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
      setRhythmStepIdx(0);
      return;
    }

    const pattern: InstrumentRhythmPattern | undefined =
      extras.rhythmPatterns.find((p) => p.id === playingRhythmId);
    if (!pattern) return;

    if (instrumentId === "cajon" && pattern.cajonSteps?.length) {
      const steps: CajonBeatStep[] = pattern.cajonSteps;
      const ms = (60 / pattern.bpm / 2) * 1000;
      let idx = 0;
      setRhythmStepIdx(0);
      triggerCajonBeat(steps[0].hit);

      rhythmTimerRef.current = window.setInterval(() => {
        idx = (idx + 1) % steps.length;
        setRhythmStepIdx(idx);
        triggerCajonBeat(steps[idx].hit);
      }, ms);
    } else if (pattern.sampleChords?.length && instrumentId !== "cajon") {
      const chords = pattern.sampleChords;
      const ms = (60 / pattern.bpm) * 2 * 1000;
      let idx = 0;
      setRhythmStepIdx(0);
      playChordPreview(chords[0], instrumentId);

      rhythmTimerRef.current = window.setInterval(() => {
        idx = (idx + 1) % chords.length;
        setRhythmStepIdx(idx);
        playChordPreview(chords[idx], instrumentId);
      }, ms);
    }

    return () => {
      if (rhythmTimerRef.current) {
        window.clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
    };
  }, [playingRhythmId, extras.rhythmPatterns, instrumentId]);

  const instrumentLabel =
    instrumentId === "guitar"
      ? "Gitar"
      : instrumentId === "bass"
      ? "Bass"
      : instrumentId === "piano"
      ? "Piano / Keyboard"
      : "Cajon";

  const activeChordCategory = extras.chordCategories.find(
    (c) => c.id === activeTabId
  );

  // Filter chords across all categories if user types in searchQuery
  const trimmedSearch = searchQuery.trim();
  const searchedChords = React.useMemo(() => {
    if (!trimmedSearch || instrumentId === "cajon") return [];
    const q = trimmedSearch.toLowerCase();
    const allChords = extras.chordCategories.flatMap((cat) => cat.chords);
    const matches = allChords.filter(
      (c) =>
        c.symbol.toLowerCase().includes(q) ||
        c.usageNote.toLowerCase().includes(q)
    );
    // If user typed a valid chord symbol like "Bb", "Eb", "Ab", "F#m7", "C#m" not in preset list, allow direct lookup!
    const validChordRegex = /^[A-G][#b]?(m|maj7|m7|7|sus4|sus2|add9|dim)?(\/[A-G][#b]?)?$/i;
    if (matches.length === 0 && validChordRegex.test(trimmedSearch)) {
      const formatted =
        trimmedSearch.charAt(0).toUpperCase() + trimmedSearch.slice(1);
      return [
        {
          symbol: formatted,
          usageNote: `Diagram posisi jari ${instrumentLabel} otomatis untuk akor ${formatted}.`,
        },
      ];
    }
    return matches;
  }, [trimmedSearch, extras.chordCategories, instrumentId, instrumentLabel]);

  const filteredRhythms = extras.rhythmPatterns.filter(
    (r) =>
      rhythmCategoryFilter === "all" || r.category === rhythmCategoryFilter
  );

  return (
    <section
      id="section-kamus-instrumen"
      className={`${
        isModal
          ? "space-y-5"
          : "p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5 scroll-mt-28"
      }`}
    >
      {/* Header */}
      {!isModal && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Referensi Khusus {instrumentLabel} (Tidak Dicampur)</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {extras.dictionaryTitle}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {extras.dictionarySubtitle}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Tabs + Quick Chord Search (For Guitar/Bass/Piano) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {extras.chordCategories.map((cat) => {
            const isTabActive =
              activeTabId === cat.id && trimmedSearch.length === 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTabId(cat.id);
                  setSearchQuery("");
                }}
                className={`px-3 py-2 rounded-md text-xs font-bold border transition-colors ${
                  isTabActive
                    ? "bg-amber-500 text-zinc-950 border-amber-500"
                    : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                }`}
              >
                {cat.title.replace(/^\d+\.\s*/, "")}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setActiveTabId("rhythm-patterns");
              setSearchQuery("");
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold border transition-colors ${
              activeTabId === "rhythm-patterns" && trimmedSearch.length === 0
                ? "bg-amber-500 text-zinc-950 border-amber-500"
                : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
            }`}
          >
            <Drum className="w-3.5 h-3.5" />
            <span>
              {instrumentId === "cajon"
                ? `Semua Pola Ketukan Cajon (${extras.rhythmPatterns.length})`
                : `Pola Ketukan / Irama ${instrumentLabel} (${extras.rhythmPatterns.length})`}
            </span>
          </button>
        </div>

        {/* Search Input for Chords (Guitar, Bass, Piano) */}
        {instrumentId !== "cajon" && (
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari chord ${instrumentLabel} (mis. G/B, D/F#, Bb, F#m)...`}
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}
      </div>

      {/* View 1: Search Results for Chords */}
      {instrumentId !== "cajon" && trimmedSearch.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>
              Hasil pencarian chord <strong>&ldquo;{trimmedSearch}&rdquo;</strong> khusus{" "}
              <strong>{instrumentLabel}</strong>:
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              Bersihkan Pencarian
            </button>
          </div>

          {searchedChords.length === 0 ? (
            <div className="p-6 rounded-md border border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
              Chord tidak ditemukan. Coba ketik simbol standar seperti{" "}
              <code className="font-mono font-bold">C</code>,{" "}
              <code className="font-mono font-bold">G/B</code>,{" "}
              <code className="font-mono font-bold">D/F#</code>,{" "}
              <code className="font-mono font-bold">F#m</code>, atau{" "}
              <code className="font-mono font-bold">Bb</code>.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchedChords.map((item, idx) => (
                <div
                  key={`${item.symbol}-${idx}`}
                  className="flex flex-col justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] p-3 space-y-2.5"
                >
                  <ChordDiagramCard
                    chordSymbol={item.symbol}
                    instrument={instrumentId}
                  />
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 px-1 leading-snug">
                    <strong className="text-amber-700 dark:text-amber-400">
                      Tips {instrumentLabel}:{" "}
                    </strong>
                    {item.usageNote}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Selected Chord Category (Strictly Single Instrument!) */}
      {instrumentId !== "cajon" &&
        trimmedSearch.length === 0 &&
        activeChordCategory && (
          <div className="space-y-4">
            {/* Category Playing Tip Banner */}
            <div className="p-3.5 rounded-md border border-amber-500/40 bg-amber-500/10 space-y-1">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {activeChordCategory.title} — {activeChordCategory.subtitle}
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong className="text-amber-700 dark:text-amber-300">
                  Kunci Praktis {instrumentLabel}:{" "}
                </strong>
                {activeChordCategory.playingTip}
              </p>
            </div>

            {/* Grid of Single-Instrument Chord Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeChordCategory.chords.map((ch) => (
                <div
                  key={ch.symbol}
                  className="flex flex-col justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] p-3 space-y-2.5"
                >
                  <ChordDiagramCard
                    chordSymbol={ch.symbol}
                    instrument={instrumentId}
                  />
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 px-1 leading-snug">
                    <strong className="text-amber-700 dark:text-amber-400">
                      Fungsi:{" "}
                    </strong>
                    {ch.usageNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* View 3: Rhythm / Strumming / Groove Patterns for this Instrument */}
      {trimmedSearch.length === 0 && activeTabId === "rhythm-patterns" && (
        <div className="space-y-4">
          {/* Sub-filter by Worship / Praise / Hymn / Build-Up */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "all", label: "Semua Irama" },
                  { id: "Worship", label: "Worship (Lambat)" },
                  { id: "Praise", label: "Praise (Cepat)" },
                  { id: "Hymn & 3/4", label: "Hymn 3/4 & 6/8" },
                  { id: "Build-Up & Fill", label: "Build-Up & Transisi" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setRhythmCategoryFilter(f.id)}
                  className={`px-2.5 py-1 rounded-xs font-mono text-xs font-semibold border transition-colors ${
                    rhythmCategoryFilter === f.id
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100"
                      : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {instrumentId === "cajon" && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span>Legenda:</span>
                <span className="px-1.5 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  B = Bass Tengah
                </span>
                <span className="px-1.5 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  S = Snare Atas
                </span>
                <span className="px-1.5 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  T = Open Tone
                </span>
                <span className="px-1.5 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  t = Ghost Ujung Jari
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRhythms.map((pat) => {
              const isPlayingThis = playingRhythmId === pat.id;
              return (
                <div
                  key={pat.id}
                  className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold">
                            {pat.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
                            Birama {pat.timeSignature} · {pat.bpm} BPM
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-1.5">
                          {pat.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setPlayingRhythmId((prev) =>
                            prev === pat.id ? null : pat.id
                          )
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold shrink-0 transition-colors ${
                          isPlayingThis
                            ? "bg-red-600 text-white"
                            : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
                        }`}
                      >
                        {isPlayingThis ? (
                          <>
                            <Square className="w-3 h-3 fill-current" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>Dengarkan</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Visual Pattern Box */}
                    <div className="p-3 rounded-sm bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 font-mono text-xs space-y-1 overflow-x-auto">
                      <div className="text-amber-600 dark:text-amber-400 font-bold whitespace-pre">
                        {pat.patternVisual}
                      </div>
                      <div className="text-zinc-500 text-[11px] whitespace-pre">
                        Hitungan: {pat.countGuide}
                      </div>
                    </div>

                    {/* Cajon Interactive Beat Boxes */}
                    {instrumentId === "cajon" && pat.cajonSteps && (
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
                        {pat.cajonSteps.map((st, sIdx) => {
                          const isBeatActive =
                            isPlayingThis && rhythmStepIdx === sIdx;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => triggerCajonBeat(st.hit)}
                              className={`py-1.5 px-1 rounded-xs border text-center font-mono transition-colors ${
                                isBeatActive
                                  ? "bg-amber-500 text-zinc-950 border-amber-500 font-bold"
                                  : "bg-white dark:bg-[#141417] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                              }`}
                            >
                              <div className="text-[9px] opacity-70">
                                {st.beatLabel}
                              </div>
                              <div className="text-xs font-bold">{st.hit}</div>
                              <div className="text-[9px] opacity-70">
                                {st.hand}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Sample Chords for Guitar / Bass / Piano */}
                    {instrumentId !== "cajon" && pat.sampleChords && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1">
                          <Music className="w-3 h-3 text-amber-500" />
                          <span>Contoh Progresi:</span>
                        </span>
                        {pat.sampleChords.map((ch, cIdx) => {
                          const isChordActive =
                            isPlayingThis && rhythmStepIdx === cIdx;
                          return (
                            <button
                              key={`${ch}-${cIdx}`}
                              type="button"
                              onClick={() =>
                                playChordPreview(ch, instrumentId)
                              }
                              className={`px-2 py-0.5 rounded-xs font-mono text-xs font-bold border transition-colors ${
                                isChordActive
                                  ? "bg-amber-500 text-zinc-950 border-amber-500"
                                  : "bg-white dark:bg-[#141417] border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-amber-500"
                              }`}
                            >
                              {ch}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                    <p className="text-zinc-700 dark:text-zinc-300">
                      <strong>Pemakaian:</strong> {pat.usage}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      <strong className="text-amber-600 dark:text-amber-400">
                        Tips Teknik:{" "}
                      </strong>
                      {pat.techniqueTip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
