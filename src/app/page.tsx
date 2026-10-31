"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Bookmark,
  RotateCcw,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Play,
} from "lucide-react";
import { DUMMY_SONGS } from "@/data/dummySongs";
import { SongCategoryFilter, useMusicApp } from "@/context/MusicAppContext";

export default function CatalogHomePage() {
  const {
    catalogFilter,
    setCatalogFilter,
    favoriteSongIds,
    toggleFavoriteSong,
    isFavoriteSong,
  } = useMusicApp();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  // Category counts across the entire repertoire
  const categoryCounts = useMemo(() => {
    let hymn = 0;
    let worship = 0;
    let praise = 0;
    for (const s of DUMMY_SONGS) {
      if (s.genre.toLowerCase().includes("hymn")) hymn++;
      else if (s.genre.toLowerCase().includes("worship")) worship++;
      else if (s.genre.toLowerCase().includes("praise")) praise++;
    }
    return {
      all: DUMMY_SONGS.length,
      Hymn: hymn,
      Worship: worship,
      Praise: praise,
    };
  }, []);

  const filteredSongs = useMemo(() => {
    const q = catalogFilter.searchQuery.toLowerCase().trim();
    return DUMMY_SONGS.filter((song) => {
      const matchesQuery =
        !q ||
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.genre.toLowerCase().includes(q) ||
        song.key.toLowerCase() === q;

      const matchesCategory =
        catalogFilter.categoryFilter === "all" ||
        (catalogFilter.categoryFilter === "Hymn" &&
          song.genre.toLowerCase().includes("hymn")) ||
        (catalogFilter.categoryFilter === "Worship" &&
          song.genre.toLowerCase().includes("worship")) ||
        (catalogFilter.categoryFilter === "Praise" &&
          song.genre.toLowerCase().includes("praise"));

      const matchesInstrument =
        catalogFilter.instrumentFilter === "all" ||
        song.instruments.includes(catalogFilter.instrumentFilter);

      const matchesDifficulty =
        catalogFilter.difficultyFilter === "all" ||
        song.arrangements.some((a) => a.difficulty === catalogFilter.difficultyFilter);

      const matchesFav =
        !catalogFilter.onlyFavorites || favoriteSongIds.includes(song.id);

      return (
        matchesQuery &&
        matchesCategory &&
        matchesInstrument &&
        matchesDifficulty &&
        matchesFav
      );
    });
  }, [catalogFilter, favoriteSongIds]);

  // Reset to page 1 whenever filters or pageSize change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    catalogFilter.searchQuery,
    catalogFilter.categoryFilter,
    catalogFilter.instrumentFilter,
    catalogFilter.difficultyFilter,
    catalogFilter.onlyFavorites,
    pageSize,
  ]);

  const totalItems = filteredSongs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedSongs = useMemo(
    () => filteredSongs.slice(startIndex, endIndex),
    [filteredSongs, startIndex, endIndex]
  );

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, newPage));
    setCurrentPage(clamped);
    if (typeof window !== "undefined") {
      const el = document.getElementById("katalog-lagu");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const resetFilters = () => {
    setCatalogFilter({
      searchQuery: "",
      categoryFilter: "all",
      instrumentFilter: "all",
      difficultyFilter: "all",
      onlyFavorites: false,
    });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    catalogFilter.searchQuery !== "" ||
    catalogFilter.categoryFilter !== "all" ||
    catalogFilter.instrumentFilter !== "all" ||
    catalogFilter.difficultyFilter !== "all" ||
    catalogFilter.onlyFavorites;

  const categoryTabs: {
    value: SongCategoryFilter;
    label: string;
    sublabel: string;
    count: number;
  }[] = [
    {
      value: "all",
      label: "Semua Lagu",
      sublabel: "Seluruh Koleksi",
      count: categoryCounts.all,
    },
    {
      value: "Hymn",
      label: "Hymn",
      sublabel: "Klasik & Kidung",
      count: categoryCounts.Hymn,
    },
    {
      value: "Worship",
      label: "Worship",
      sublabel: "Tempo Lambat",
      count: categoryCounts.Worship,
    },
    {
      value: "Praise",
      label: "Praise",
      sublabel: "Tempo Cepat",
      count: categoryCounts.Praise,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
      {/* Editorial Header */}
      <section className="border-b border-zinc-300 dark:border-zinc-800 pb-6 sm:pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
            Repertoar & Lembar Chord
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Katalog Lagu Rohani: Hymn, Worship & Praise
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Koleksi lengkap lagu <strong>Hymn</strong>, <strong>Worship (Lambat)</strong>, dan{" "}
            <strong>Praise (Cepat)</strong> dengan dua pilihan aransemen: <strong>Pemula</strong>{" "}
            (chord dasar utama) dan <strong>Mahir</strong> (lengkap dengan jembatan slash chord &
            detail harmoni).
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end">
          <Link
            href="/practice"
            className="px-4 py-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-amber-500 transition-colors"
          >
            Buka Metronome & Tuner
          </Link>
        </div>
      </section>

      {/* Search, Category Tabs & Filter Controls */}
      <section id="katalog-lagu" className="space-y-5 scroll-mt-20">
        {/* Category Filter Tabs (Responsive 2x2 Grid on Mobile, 4 Columns on Web) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {categoryTabs.map((tab) => {
            const active = catalogFilter.categoryFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() =>
                  setCatalogFilter((prev) => ({
                    ...prev,
                    categoryFilter: tab.value,
                  }))
                }
                className={`text-left p-3 sm:p-4 rounded-md border transition-colors flex items-center justify-between gap-2 ${
                  active
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                    : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                <div className="min-w-0">
                  <div
                    className={`text-xs sm:text-sm font-bold truncate ${
                      active
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {tab.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {tab.sublabel}
                  </div>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 rounded-xs font-mono text-xs font-bold ${
                    active
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Secondary Filters Box */}
        <div className="p-3.5 sm:p-4 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3.5">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={catalogFilter.searchQuery}
                onChange={(e) =>
                  setCatalogFilter((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                placeholder="Cari judul lagu, penyanyi, kategori, atau nada dasar (mis. G, C, D)..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Secondary Filters: Instrument, Mode Pemula/Mahir, Saved */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Instrument Filter */}
              <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f] w-full sm:w-auto">
                {(
                  [
                    { value: "all", label: "Semua" },
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
                    className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-medium transition-colors border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 ${
                      catalogFilter.instrumentFilter === opt.value
                        ? "bg-amber-500 text-zinc-950 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Difficulty Filter: Pemula & Mahir */}
              <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f] w-full sm:w-auto">
                {(
                  [
                    { value: "all", label: "Semua Mode" },
                    { value: "Pemula", label: "Mode Pemula" },
                    { value: "Mahir", label: "Mode Mahir" },
                  ] as const
                ).map((lvl) => (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() =>
                      setCatalogFilter((prev) => ({
                        ...prev,
                        difficultyFilter: lvl.value,
                      }))
                    }
                    className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-medium transition-colors border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 ${
                      catalogFilter.difficultyFilter === lvl.value
                        ? "bg-amber-500 text-zinc-950 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* Saved Filter & Reset */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() =>
                    setCatalogFilter((prev) => ({
                      ...prev,
                      onlyFavorites: !prev.onlyFavorites,
                    }))
                  }
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border text-xs font-medium transition-colors flex-1 sm:flex-initial ${
                    catalogFilter.onlyFavorites
                      ? "border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                      : "border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      catalogFilter.onlyFavorites ? "fill-amber-500 text-amber-500" : ""
                    }`}
                  />
                  <span>Tersimpan ({favoriteSongIds.length})</span>
                </button>

                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className={`inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium transition-colors ${
                    hasActiveFilters
                      ? "text-zinc-600 dark:text-zinc-300 hover:text-amber-500 cursor-pointer"
                      : "text-zinc-400 dark:text-zinc-600 opacity-50 cursor-default"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Summary & Page Size Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
            <div>
              {totalItems > 0 ? (
                <span>
                  Menampilkan{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {startIndex + 1}–{endIndex}
                  </strong>{" "}
                  dari{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">{totalItems}</strong> lagu
                  {catalogFilter.categoryFilter !== "all" && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-xs bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono text-[11px]">
                      Kategori: {catalogFilter.categoryFilter}
                    </span>
                  )}
                </span>
              ) : (
                <span>Tidak ada lagu yang cocok dengan filter saat ini</span>
              )}
            </div>

            {/* Items per page selector */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-[11px] font-mono text-zinc-500">Lagu per halaman:</span>
              <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-sm overflow-hidden bg-[#f6f5f2] dark:bg-[#0d0d0f]">
                {[9, 12, 18, 60].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPageSize(size)}
                    className={`px-2 py-1 text-[11px] font-mono border-r last:border-r-0 border-zinc-300 dark:border-zinc-800 transition-colors ${
                      pageSize === size
                        ? "bg-amber-500 text-zinc-950 font-bold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {size === 60 ? "Semua" : size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredSongs.length === 0 ? (
          <div className="rounded-md border border-zinc-300 dark:border-zinc-800 p-10 text-center space-y-3 bg-white dark:bg-[#141417]">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Lagu tidak ditemukan
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Tidak ada lagu yang cocok dengan kata kunci atau filter kategori yang dipilih.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tampilkan Semua Lagu</span>
            </button>
          </div>
        ) : (
          <>
            {/* Tactile Song Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedSongs.map((song, idx) => {
                const fav = isFavoriteSong(song.id);
                const globalIndex = startIndex + idx + 1;
                const trackNum = String(globalIndex).padStart(2, "0");

                const isWorship = song.genre.toLowerCase().includes("worship");
                const isPraise = song.genre.toLowerCase().includes("praise");

                return (
                  <div
                    key={song.id}
                    className="group flex flex-col justify-between rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-500 dark:hover:border-zinc-600 transition-colors"
                  >
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Top Row: Index Number, Category Pill, Key/BPM Specs, Bookmark */}
                      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                            {trackNum}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-xs border truncate ${
                              isWorship
                                ? "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300"
                                : isPraise
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            {song.genre}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-2 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                            {song.key}
                          </span>
                          <span className="px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-900 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                            {song.bpm} BPM
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleFavoriteSong(song.id)}
                            aria-label={fav ? "Hapus dari Tersimpan" : "Simpan Lagu"}
                            className="p-1 text-zinc-400 hover:text-amber-500 transition-colors"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                fav ? "fill-amber-500 text-amber-500" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Title & Artist */}
                      <div>
                        <Link
                          href={`/songs/${song.slug}`}
                          className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors block"
                        >
                          {song.title}
                        </Link>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {song.artist}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {song.description}
                      </p>

                      {/* Studio Accompaniment Engine Indicator */}
                      <div className="flex items-center justify-between text-[11px] font-mono px-2.5 py-1.5 rounded-sm bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                          <Headphones className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Play Musik:</span>
                        </div>
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                          Piano · Gitar · Bass
                        </span>
                      </div>

                      {/* Instruments & Difficulty */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap items-center gap-1">
                          {song.instruments.map((inst) => (
                            <span
                              key={inst}
                              className="text-[11px] px-2 py-0.5 rounded-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                            >
                              {inst === "guitar"
                                ? "Gitar"
                                : inst === "bass"
                                ? "Bass"
                                : "Piano"}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                            Pemula
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            Mahir
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 sm:px-5 py-3 border-t border-zinc-200 dark:border-zinc-800/80 bg-[#faf9f6] dark:bg-[#101013] flex items-center justify-between">
                      <span
                        className="text-[11px] text-zinc-500 truncate max-w-[180px]"
                        title={song.source}
                      >
                        {song.timeSignature} · {song.source}
                      </span>

                      <Link
                        href={`/songs/${song.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                      >
                        <Play className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>Buka & Putar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Responsive Pagination Controls (Mobile & Web) */}
            {totalPages > 1 && (
              <nav
                aria-label="Navigasi halaman lagu"
                className="p-3.5 sm:p-4 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] flex flex-col sm:flex-row items-center justify-between gap-3.5"
              >
                {/* Left Info (Desktop & Mobile) */}
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center sm:text-left">
                  Halaman{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">{safePage}</strong> dari{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">{totalPages}</strong>{" "}
                  <span className="hidden md:inline">
                    · ({startIndex + 1}–{endIndex} dari {totalItems} lagu)
                  </span>
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-1.5 w-full sm:w-auto">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage <= 1}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200 disabled:opacity-40 disabled:pointer-events-none hover:border-amber-500 transition-colors min-h-[38px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  {/* Page Numbers (Scrollable / Flex on Mobile & Desktop) */}
                  <div className="flex items-center gap-1 overflow-x-auto max-w-[190px] sm:max-w-none px-1 py-0.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isCurrent = pageNum === safePage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`min-w-[36px] h-[38px] px-2.5 rounded-md font-mono text-xs font-bold border transition-colors shrink-0 ${
                            isCurrent
                              ? "bg-amber-500 text-zinc-950 border-amber-500"
                              : "bg-[#f6f5f2] dark:bg-[#0d0d0f] border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage >= totalPages}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-800 dark:text-zinc-200 disabled:opacity-40 disabled:pointer-events-none hover:border-amber-500 transition-colors min-h-[38px]"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}
