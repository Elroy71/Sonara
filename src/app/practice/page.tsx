"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sliders, Music2, ArrowLeft } from "lucide-react";
import { MetronomeTool } from "@/components/practice/MetronomeTool";
import { TunerTool } from "@/components/practice/TunerTool";
import { AudioLoopTempoPlayer } from "@/components/practice/AudioLoopTempoPlayer";
import { DUMMY_SONGS } from "@/data/dummySongs";

function PracticeStudioContent() {
  const searchParams = useSearchParams();
  const songSlug = searchParams.get("song");
  const bpmParam = Number(searchParams.get("bpm")) || 100;
  const tsParam = (searchParams.get("ts") as "4/4" | "3/4" | "6/8") || "4/4";

  const linkedSong = songSlug
    ? DUMMY_SONGS.find((s) => s.slug === songSlug || s.id === songSlug)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500">
            <Sliders className="w-3.5 h-3.5" />
            <span>Modul P0 (F-02) — Alat Latihan Harian di Browser</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Studio Alat Latihan Interaktif
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Metronome berjadwalkan Web Audio API, Tuner mikrofon real-time (Pitchy), serta Pemutar Loop A–B & Pengaturan Tempo.
          </p>
        </div>

        {linkedSong ? (
          <Link
            href={`/songs/${linkedSong.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Lagu: {linkedSong.title}</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 self-start"
          >
            <Music2 className="w-4 h-4 text-emerald-500" />
            <span>Pilih Lagu dari Katalog</span>
          </Link>
        )}
      </div>

      {/* Top Grid: Metronome & Tuner side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <MetronomeTool
          key={`${bpmParam}-${tsParam}`}
          initialBpm={bpmParam}
          initialTimeSignature={tsParam}
        />
        <TunerTool />
      </div>

      {/* Bottom Full-Width: Audio Loop A-B & Tempo Player */}
      <AudioLoopTempoPlayer />
    </div>
  );
}

export default function PracticeStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-slate-500">
          Memuat Studio Alat Latihan...
        </div>
      }
    >
      <PracticeStudioContent />
    </Suspense>
  );
}
