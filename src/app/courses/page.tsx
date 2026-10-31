"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { COURSES_DATA, CourseInstrumentId } from "@/data/coursesData";

type ProgressMap = Record<string, boolean>;

function InstrumentCoverSvg({ id }: { id: CourseInstrumentId }) {
  if (id === "guitar") {
    return (
      <svg viewBox="0 0 280 96" className="w-full h-24" aria-hidden="true">
        <rect width="280" height="96" className="fill-zinc-900" />
        <line x1="36" y1="14" x2="36" y2="82" className="stroke-amber-500" strokeWidth="4" />
        {[92, 148, 204, 260].map((x) => (
          <line
            key={x}
            x1={x}
            y1="14"
            x2={x}
            y2="82"
            className="stroke-zinc-700"
            strokeWidth="1.5"
          />
        ))}
        {[20, 31, 42, 53, 64, 75].map((y, idx) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="270"
            y2={y}
            className="stroke-amber-500/80"
            strokeWidth={2.4 - idx * 0.25}
          />
        ))}
        <circle cx="64" cy="64" r="6" className="fill-amber-400" />
        <circle cx="120" cy="42" r="6" className="fill-amber-400" />
        <circle cx="176" cy="31" r="6" className="fill-amber-400" />
      </svg>
    );
  }

  if (id === "bass") {
    return (
      <svg viewBox="0 0 280 96" className="w-full h-24" aria-hidden="true">
        <rect width="280" height="96" className="fill-zinc-900" />
        <line x1="36" y1="18" x2="36" y2="78" className="stroke-amber-500" strokeWidth="5" />
        {[96, 156, 216, 268].map((x) => (
          <line
            key={x}
            x1={x}
            y1="18"
            x2={x}
            y2="78"
            className="stroke-zinc-700"
            strokeWidth="2"
          />
        ))}
        {[25, 40, 55, 70].map((y, idx) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="270"
            y2={y}
            className="stroke-zinc-400"
            strokeWidth={3.6 - idx * 0.5}
          />
        ))}
        <circle cx="186" cy="25" r="7" className="fill-amber-500" />
        <circle cx="126" cy="25" r="7" className="fill-amber-500/70" />
        <circle cx="186" cy="40" r="7" className="fill-amber-500" />
      </svg>
    );
  }

  if (id === "piano") {
    return (
      <svg viewBox="0 0 280 96" className="w-full h-24" aria-hidden="true">
        <rect width="280" height="96" className="fill-zinc-900" />
        {Array.from({ length: 10 }).map((_, idx) => {
          const x = 20 + idx * 24;
          const active = idx === 0 || idx === 2 || idx === 4 || idx === 7;
          return (
            <rect
              key={idx}
              x={x}
              y="14"
              width="22"
              height="68"
              rx="2"
              className={
                active
                  ? "fill-amber-500/30 stroke-amber-500"
                  : "fill-zinc-200 stroke-zinc-600"
              }
              strokeWidth="1.2"
            />
          );
        })}
        {[0, 1, 3, 4, 5, 7, 8].map((wIdx) => (
          <rect
            key={wIdx}
            x={20 + wIdx * 24 + 15}
            y="14"
            width="14"
            height="42"
            rx="1.5"
            className="fill-zinc-950 stroke-zinc-700"
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 96" className="w-full h-24" aria-hidden="true">
      <rect width="280" height="96" className="fill-zinc-900" />
      <rect
        x="106"
        y="10"
        width="68"
        height="76"
        rx="4"
        className="fill-stone-800 stroke-amber-500/80"
        strokeWidth="2"
      />
      <rect
        x="114"
        y="16"
        width="52"
        height="16"
        rx="2"
        className="fill-amber-500/25 stroke-amber-500"
        strokeWidth="1.2"
      />
      <circle
        cx="140"
        cy="56"
        r="16"
        className="fill-amber-500/20 stroke-amber-500"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function CoursesCatalogPage() {
  const [completedMap, setCompletedMap] = useState<ProgressMap>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sonara_course_progress");
      if (saved) {
        setCompletedMap(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const getCompletedCount = (instId: CourseInstrumentId) => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      if (completedMap[`${instId}-${i}`]) count++;
    }
    return count;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section className="border-b border-zinc-300 dark:border-zinc-800 pb-6 space-y-2 max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
          Akademi Musik Sonara
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Pilih Kelas Kursus Instrumen
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Pilih salah satu kelas instrumen di bawah untuk masuk ke ruang belajar. Setiap kelas terdiri dari{" "}
          <strong>10 modul terarah: 5 Pertemuan Fondasi Padat + 5 Pertemuan Masterclass Musik Gereja & Pelayanan Ibadah (durasi 1–2 jam per pertemuan termasuk practice)</strong>.
        </p>
      </section>

      {/* Dicoding-Style Course Cards Grid (Only Course Cards Shown Initially) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES_DATA.map((course) => {
          const doneCount = getCompletedCount(course.id);
          const pct = doneCount * 10;
          const totalMinutes = course.meetings.reduce(
            (acc, m) => acc + m.durationMinutes,
            0
          );
          const totalHours = (totalMinutes / 60).toFixed(1);

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-amber-500 dark:hover:border-amber-500 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Top Illustration Banner */}
                <div className="relative border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <InstrumentCoverSvg id={course.id} />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-xs bg-amber-500 text-zinc-950 font-mono text-[11px] font-bold">
                      Level {course.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-xs bg-zinc-950/85 text-zinc-200 border border-zinc-700 font-mono text-[11px]">
                      {course.totalMeetings} Pertemuan
                    </span>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Belajar Dasar {course.name}
                    </h2>
                    <p className="text-xs font-mono text-zinc-500">
                      {course.specs}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {course.overview}
                  </p>

                  {/* Metadata Specs Row (Dicoding Style) */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>10 Modul + 5 Skill Tambahan</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Total ~{totalHours} Jam ({course.durationPerMeeting})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Progress & CTA */}
              <div className="px-5 sm:px-6 py-4 border-t border-zinc-200 dark:border-zinc-800/80 bg-[#faf9f6] dark:bg-[#101013] space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">
                      {doneCount === 0
                        ? "Belum dimulai"
                        : doneCount === 10
                        ? "Seluruh modul selesai!"
                        : `${doneCount} dari 10 pertemuan selesai`}
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-amber-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <span className="text-xs text-zinc-500 truncate">
                    {course.id === "cajon"
                      ? "Lengkap dengan Kamus Ketukan Cajon & Fill-In"
                      : `Lengkap dengan Kamus Chord ${course.shortName} & Fill-In`}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-amber-500 group-hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors">
                    {doneCount === 10 ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ulangi Kelas</span>
                      </>
                    ) : doneCount > 0 ? (
                      <>
                        <span>Lanjutkan Belajar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Mulai Belajar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
