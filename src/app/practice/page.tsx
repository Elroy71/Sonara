"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MetronomeTool } from "@/components/practice/MetronomeTool";
import { TunerTool } from "@/components/practice/TunerTool";
import { DUMMY_SONGS } from "@/data/dummySongs";

function PracticeStudioContent() {
  const searchParams = useSearchParams();
  const songSlugParam = searchParams.get("song") || "";
  const bpmParam = Number(searchParams.get("bpm")) || 0;
  const tsParam = (searchParams.get("ts") as "4/4" | "3/4" | "6/8") || "";

  const [selectedSongId, setSelectedSongId] = useState<string>(() => {
    if (songSlugParam) {
      const found = DUMMY_SONGS.find(
        (s) => s.slug === songSlugParam || s.id === songSlugParam
      );
      if (found) return found.id;
    }
    return "";
  });

  useEffect(() => {
    if (songSlugParam) {
      const found = DUMMY_SONGS.find(
        (s) => s.slug === songSlugParam || s.id === songSlugParam
      );
      if (found) setSelectedSongId(found.id);
    }
  }, [songSlugParam]);

  const linkedSong = selectedSongId
    ? DUMMY_SONGS.find((s) => s.id === selectedSongId || s.slug === selectedSongId) ||
      null
    : null;

  const activeBpm = linkedSong ? linkedSong.bpm : bpmParam || 100;
  const activeTs = linkedSong
    ? linkedSong.timeSignature
    : tsParam || "4/4";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-300 dark:border-zinc-800 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
            Ruang Latihan Instrumen
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Alat Latihan: Metronome & Tuner
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pilih lagu yang ingin Anda latih agar tempo dan birama Metronome otomatis menyesuaikan, atau gunakan Tuner untuk menyetem senar instrumen Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-amber-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog Lagu</span>
          </Link>

          {linkedSong && (
            <Link
              href={`/songs/${linkedSong.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400 transition-colors"
            >
              <span>Buka Lembar Chord: {linkedSong.title}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Quick Song Target Selector Bar */}
      <section className="p-4 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500">
            Sinkronisasi Tempo Lagu
          </span>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {linkedSong
              ? `Sedang Melatih: ${linkedSong.title} (${linkedSong.genre})`
              : "Pilih Lagu dari Katalog (Opsional)"}
          </h2>
          <p className="text-xs text-zinc-500">
            Memilih lagu akan mengatur BPM dan birama Metronome secara otomatis sesuai lagu tersebut.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Pilih Lagu untuk Dilatih"
            value={selectedSongId}
            onChange={(e) => setSelectedSongId(e.target.value)}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-900 dark:text-zinc-100 min-w-[240px] max-w-full"
          >
            <option value="">— Mode Bebas (Tanpa Lagu Tertentu) —</option>
            <optgroup label="Worship (Lambat)">
              {DUMMY_SONGS.filter((s) => s.genre.includes("Worship")).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.key} · {s.bpm} BPM)
                </option>
              ))}
            </optgroup>
            <optgroup label="Praise (Cepat)">
              {DUMMY_SONGS.filter((s) => s.genre.includes("Praise")).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.key} · {s.bpm} BPM)
                </option>
              ))}
            </optgroup>
            <optgroup label="Hymn">
              {DUMMY_SONGS.filter((s) => s.genre.includes("Hymn")).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.key} · {s.bpm} BPM)
                </option>
              ))}
            </optgroup>
          </select>

          {linkedSong && (
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] font-bold text-amber-600 dark:text-amber-400">
                Nada: {linkedSong.key}
              </span>
              <span className="px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-700 dark:text-zinc-300">
                {linkedSong.bpm} BPM · {linkedSong.timeSignature}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Grid: Metronome & Tuner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <MetronomeTool
          key={`${activeBpm}-${activeTs}-${linkedSong?.id || "free"}`}
          initialBpm={activeBpm}
          initialTimeSignature={activeTs}
          songTitle={linkedSong?.title}
        />
        <TunerTool />
      </div>
    </div>
  );
}

export default function PracticeStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-zinc-500">
          Memuat ruang latihan...
        </div>
      }
    >
      <PracticeStudioContent />
    </Suspense>
  );
}
