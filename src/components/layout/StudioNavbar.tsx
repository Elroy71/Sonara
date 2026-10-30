"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Music2,
  Sliders,
  GraduationCap,
  Sparkles,
  Users,
  Sun,
  Moon,
  Heart,
  Guitar,
} from "lucide-react";
import { useMusicApp } from "@/context/MusicAppContext";
import { InstrumentType } from "@/types/music";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Katalog & Chord",
    badge: "P0",
    icon: Music2,
  },
  {
    href: "/practice",
    label: "Alat Latihan",
    badge: "P0",
    icon: Sliders,
  },
  {
    href: "/courses",
    label: "Kursus & Progres",
    badge: "P1",
    icon: GraduationCap,
  },
  {
    href: "/ai-studio",
    label: "AI Audio Studio",
    badge: "P1",
    icon: Sparkles,
  },
  {
    href: "/community",
    label: "Komunitas & Band",
    badge: "P2",
    icon: Users,
  },
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
  } = useMusicApp();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-500/30 group-hover:scale-105 transition-transform">
            <img
              src="/icon-sonara.png"
              alt="Sonara Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                Son<span className="text-amber-400">ara</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                v0.2 MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Music Learning, Practice Tools & AI Analysis
            </p>
          </div>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/70 dark:border-slate-800">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/songs")
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-semibold shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                <span
                  className={`text-[9px] font-mono px-1 rounded ${
                    isActive
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Active Instrument, Favorites, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Preferred Instrument Switcher (Visible on Mobile & Desktop) */}
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <Guitar className="w-3.5 h-3.5 text-emerald-500 mx-1 hidden sm:inline" />
            {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setPreferredInstrument(inst)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors active:scale-95 ${
                  preferredInstrument === inst
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {inst === "guitar" ? "Gitar" : inst === "bass" ? "Bass" : "Piano"}
              </button>
            ))}
          </div>

          {/* Favorites Shortcut */}
          <Link
            href="/"
            onClick={() =>
              setCatalogFilter((prev) => ({
                ...prev,
                onlyFavorites: !prev.onlyFavorites,
              }))
            }
            title="Daftar Lagu Favorit Saya"
            className="relative flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-rose-500/50 transition-colors active:scale-95"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-xs font-mono font-bold">{favoriteSongIds.length}</span>
          </Link>

          {/* Dark / Light Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ubah Tema Tampilan"
            title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode Studio"}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-colors active:scale-95"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
