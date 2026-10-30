"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  Music,
  Clock,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Sliders,
  BookOpen,
  Filter,
} from "lucide-react";
import { DUMMY_SONGS } from "@/data/dummySongs";
import { useMusicApp } from "@/context/MusicAppContext";
import { DifficultyLevel, InstrumentType } from "@/types/music";
import { ChordDiagramCard } from "@/components/music/ChordDiagramCard";

const QUICK_CHORDS = ["C", "G", "Am", "F", "Dm", "Em", "D", "A", "E", "Bm", "Fmaj7", "Cmaj7"];

export default function CatalogHomePage() {
  const {
    catalogFilter,
    setCatalogFilter,
    favoriteSongIds,
    toggleFavoriteSong,
    isFavoriteSong,
    preferredInstrument,
    setPreferredInstrument,
  } = useMusicApp();

  const [selectedQuickChord, setSelectedQuickChord] = useState<string>("C");

  const filteredSongs = useMemo(() => {
    const q = catalogFilter.searchQuery.toLowerCase().trim();
    return DUMMY_SONGS.filter((song) => {
      const matchesQuery =
        !q ||
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.genre.toLowerCase().includes(q) ||
        song.key.toLowerCase() === q;

      const matchesInstrument =
        catalogFilter.instrumentFilter === "all" ||
        song.instruments.includes(catalogFilter.instrumentFilter);

      const matchesDifficulty =
        catalogFilter.difficultyFilter === "all" ||
        song.difficulty === catalogFilter.difficultyFilter;

      const matchesFav =
        !catalogFilter.onlyFavorites || favoriteSongIds.includes(song.id);

      return matchesQuery && matchesInstrument && matchesDifficulty && matchesFav;
    });
  }, [catalogFilter, favoriteSongIds]);

  const resetFilters = () => {
    setCatalogFilter({
      searchQuery: "",
      instrumentFilter: "all",
      difficultyFilter: "all",
      onlyFavorites: false,
    });
  };

  const hasActiveFilters =
    catalogFilter.searchQuery !== "" ||
    catalogFilter.instrumentFilter !== "all" ||
    catalogFilter.difficultyFilter !== "all" ||
    catalogFilter.onlyFavorites;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Studio Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tahap 1 (P0 MVP) — Katalog Lagu, Transpose & Diagram Instrumen</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Cari Lagu, Pahami Chord, dan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              Mulai Latihan Tanpa Pindah Aplikasi.
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Dilengkapi algoritma transpose deterministik, visualisasi diagram jari tervalidasi untuk{" "}
            <strong className="text-white">Gitar (6-senar)</strong>,{" "}
            <strong className="text-white">Bass (4-senar)</strong>, dan{" "}
            <strong className="text-white">Piano/Keyboard</strong>, serta sumber konten berizin.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#katalog-lagu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Music className="w-4 h-4" />
              <span>Jelajahi Katalog Lagu</span>
            </a>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-colors"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Buka Metronome & Tuner</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter Control Bar (F-01) */}
      <section id="katalog-lagu" className="space-y-6">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={catalogFilter.searchQuery}
                onChange={(e) =>
                  setCatalogFilter((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                placeholder="Cari berdasarkan judul lagu, nama artis, genre, atau nada dasar (mis. C, G, Am)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Instrument Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
                {(
                  [
                    { value: "all", label: "Semua Instrumen" },
                    { value: "guitar", label: "Gitar" },
                    { value: "bass", label: "Bass" },
                    { value: "piano", label: "Piano" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setCatalogFilter((prev) => ({
                        ...prev,
                        instrumentFilter: opt.value,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      catalogFilter.instrumentFilter === opt.value
                        ? "bg-emerald-500 text-slate-950 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <select
                aria-label="Filter Tingkat Kesulitan"
                value={catalogFilter.difficultyFilter}
                onChange={(e) =>
                  setCatalogFilter((prev) => ({
                    ...prev,
                    difficultyFilter: e.target.value as "all" | DifficultyLevel,
                  }))
                }
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Semua Level Kesulitan</option>
                <option value="Pemula">Level: Pemula</option>
                <option value="Menengah">Level: Menengah</option>
                <option value="Mahir">Level: Mahir</option>
              </select>

              {/* Favorites Filter Toggle */}
              <button
                type="button"
                onClick={() =>
                  setCatalogFilter((prev) => ({
                    ...prev,
                    onlyFavorites: !prev.onlyFavorites,
                  }))
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors ${
                  catalogFilter.onlyFavorites
                    ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400"
                    : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    catalogFilter.onlyFavorites ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                <span>Favorit ({favoriteSongIds.length})</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-emerald-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>
              Menampilkan <strong className="text-slate-900 dark:text-white">{filteredSongs.length}</strong> dari{" "}
              {DUMMY_SONGS.length} lagu berizin
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Provenance & Hak Distribusi Terverifikasi (BR-03)
            </span>
          </div>
        </div>

        {/* Empty State when no songs match (Acceptance Criterion 1) */}
        {filteredSongs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center space-y-4 bg-white/50 dark:bg-slate-900/30">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Tidak Ditemukan Lagu yang Sesuai
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pencarian untuk &ldquo;{catalogFilter.searchQuery}&rdquo; dengan filter saat ini belum menemukan hasil. Coba kata kunci lain atau reset filter pencarian.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tampilkan Semua Lagu</span>
            </button>
          </div>
        ) : (
          /* Song Catalog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSongs.map((song) => {
              const fav = isFavoriteSong(song.id);
              return (
                <div
                  key={song.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 overflow-hidden hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                >
                  {/* Top Gradient Accent */}
                  <div>
                    <div
                      className={`h-24 bg-gradient-to-r ${song.coverGradient} p-4 flex items-start justify-between`}
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-950/60 text-white backdrop-blur-sm">
                          Key: {song.key}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-950/60 text-emerald-300 backdrop-blur-sm">
                          {song.bpm} BPM · {song.timeSignature}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavoriteSong(song.id)}
                        aria-label={fav ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                        className="p-2 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            fav ? "fill-rose-500 text-rose-500" : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Song Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          {song.genre}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            song.difficulty === "Pemula"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : song.difficulty === "Menengah"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {song.difficulty}
                        </span>
                      </div>

                      <div>
                        <Link
                          href={`/songs/${song.slug}`}
                          className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1"
                        >
                          {song.title}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {song.artist}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {song.description}
                      </p>

                      {/* Supported Instruments */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {song.instruments.map((inst) => (
                          <span
                            key={inst}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize"
                          >
                            {inst === "guitar"
                              ? "🎸 Gitar"
                              : inst === "bass"
                              ? "🎸 Bass"
                              : "🎹 Piano"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate max-w-[160px]" title={song.source}>
                        {song.rightsStatus}
                      </span>
                    </div>

                    <Link
                      href={`/songs/${song.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500"
                    >
                      <span>Pelajari Lagu</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Chord Diagram Dictionary Section (Gitar, Bass, Piano) */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>Kamus Diagram Chord Interaktif (F-01)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Eksplorasi Posisi Jari Gitar, Bass & Piano
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Klik salah satu chord atau ikon speaker untuk mendengarkan bunyi akor secara langsung menggunakan Web Audio Synthesizer.
            </p>
          </div>

          {/* Instrument Selector for Dictionary */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
            {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setPreferredInstrument(inst)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  preferredInstrument === inst
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {inst === "guitar" ? "🎸 Gitar (6 Senar)" : inst === "bass" ? "🎸 Bass (4 Senar)" : "🎹 Piano (Tuts)"}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Chord Pill Bar */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_CHORDS.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setSelectedQuickChord(ch)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                selectedQuickChord === ch
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Selected Chord Comparison Across All 3 Instruments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <ChordDiagramCard
            chordSymbol={selectedQuickChord}
            instrument="guitar"
            isSelected={preferredInstrument === "guitar"}
            onSelect={() => setPreferredInstrument("guitar")}
          />
          <ChordDiagramCard
            chordSymbol={selectedQuickChord}
            instrument="bass"
            isSelected={preferredInstrument === "bass"}
            onSelect={() => setPreferredInstrument("bass")}
          />
          <ChordDiagramCard
            chordSymbol={selectedQuickChord}
            instrument="piano"
            isSelected={preferredInstrument === "piano"}
            onSelect={() => setPreferredInstrument("piano")}
          />
        </div>
      </section>
    </div>
  );
}
