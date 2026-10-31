"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Bookmark, User } from "lucide-react";
import { useMusicApp } from "@/context/MusicAppContext";
import { InstrumentType } from "@/types/music";

const NAV_ITEMS = [
  { href: "/", label: "Katalog & Chord" },
  { href: "/practice", label: "Alat Latihan" },
  { href: "/courses", label: "Kursus" },
  { href: "/ai-studio", label: "Studio Audio" },
  { href: "/community", label: "Komunitas" },
];

export function StudioNavbar() {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    favoriteSongIds,
    preferredInstrument,
    setPreferredInstrument,
    setCatalogFilter,
    activeRole,
  } = useMusicApp();

  const roleBadgeLabel =
    activeRole === "super_admin"
      ? "Super Admin"
      : activeRole === "contributor"
      ? "Contributor"
      : "User";

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2]/95 dark:bg-[#0d0d0f]/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-md overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
              <img
                src="/icon-sonara.png"
                alt="Sonara"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
              Sonara
            </span>
          </Link>

          {/* Desktop Navigation: Clean text only, no icons, no P0/P1/P2 badges */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname.startsWith("/songs")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-5 text-sm transition-colors ${
                    isActive
                      ? "text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Active Instrument, Saved Songs, Profile Role, Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Instrument Selector */}
          <div className="hidden sm:flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
            {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setPreferredInstrument(inst)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors border-r last:border-r-0 border-zinc-200 dark:border-zinc-800 ${
                  preferredInstrument === inst
                    ? "bg-amber-500 text-zinc-950 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {inst === "guitar" ? "Gitar" : inst === "bass" ? "Bass" : "Piano"}
              </button>
            ))}
          </div>

          {/* Saved Songs / Bookmark */}
          <Link
            href="/"
            onClick={() =>
              setCatalogFilter((prev) => ({
                ...prev,
                onlyFavorites: !prev.onlyFavorites,
              }))
            }
            title="Lagu Tersimpan"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-mono font-semibold">
              {favoriteSongIds.length}
            </span>
          </Link>

          {/* Profile & Active Role Button */}
          <Link
            href="/profile"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
              pathname.startsWith("/profile")
                ? "border-amber-500 bg-amber-500 text-zinc-950 font-bold"
                : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-amber-500"
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="hidden md:inline">Profil ·</span>
            <span className="font-mono text-[11px]">{roleBadgeLabel}</span>
          </Link>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ubah Tema Tampilan"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
            className="p-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
