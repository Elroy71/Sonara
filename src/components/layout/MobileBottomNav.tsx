"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Music2,
  Sliders,
  GraduationCap,
  Sparkles,
  Users,
  Play,
  Square,
  Minus,
  Plus,
  X,
  Volume2,
  Smartphone,
} from "lucide-react";
import { useMusicApp } from "@/context/MusicAppContext";
import { InstrumentType } from "@/types/music";
import { getAudioContext, playChordPreview } from "@/lib/audioSynth";

const BOTTOM_TABS = [
  { href: "/", label: "Katalog", icon: Music2 },
  { href: "/practice", label: "Latihan", icon: Sliders },
  { href: "/courses", label: "Kursus", icon: GraduationCap },
  { href: "/ai-studio", label: "AI Studio", icon: Sparkles },
  { href: "/community", label: "Komunitas", icon: Users },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { preferredInstrument, setPreferredInstrument } = useMusicApp();

  // Quick Pocket Metronome & Instrument Drawer for Mobile
  const [quickDrawerOpen, setQuickDrawerOpen] = useState(false);
  const [quickBpm, setQuickBpm] = useState(100);
  const [quickPlaying, setQuickPlaying] = useState(false);
  const [quickBeat, setQuickBeat] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!quickPlaying) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setQuickBeat(0);
      return;
    }

    const playTick = (beatIdx: number) => {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(beatIdx === 0 ? 1100 : 780, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(beatIdx === 0 ? 0.3 : 0.18, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    };

    let step = 0;
    playTick(0);
    const ms = (60 / quickBpm) * 1000;
    intervalRef.current = window.setInterval(() => {
      step = (step + 1) % 4;
      setQuickBeat(step);
      playTick(step);
    }, ms);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [quickPlaying, quickBpm]);

  return (
    <>
      {/* Floating Quick Tool Button (Mobile Only) */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          type="button"
          onClick={() => setQuickDrawerOpen((o) => !o)}
          aria-label="Buka Alat Cepat Mobile"
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-bold text-xs shadow-xl transition-all active:scale-95 ${
            quickPlaying
              ? "bg-amber-400 text-slate-950 animate-pulse shadow-amber-500/30"
              : "bg-emerald-500 text-slate-950 shadow-emerald-500/30"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{quickPlaying ? `${quickBpm} BPM` : "Alat Cepat"}</span>
        </button>
      </div>

      {/* Quick Mobile Practice Drawer (Bottom Sheet) */}
      {quickDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/60 backdrop-blur-xs">
          <div className="rounded-t-3xl border-t border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Kontrol Cepat Mobile (Sambil Bermain)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuickDrawerOpen(false)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Instrument Switcher */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Instrumen Aktif (Diagram & Bunyi Chord):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setPreferredInstrument(inst)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize transition-all active:scale-95 ${
                      preferredInstrument === inst
                        ? "bg-emerald-500 text-slate-950 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {inst === "guitar"
                      ? "🎸 Gitar"
                      : inst === "bass"
                      ? "🎸 Bass"
                      : "🎹 Piano"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Pocket Metronome */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Metronome Saku (4/4)
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={`w-2.5 h-2.5 rounded-full transition-transform ${
                        quickPlaying && quickBeat === b
                          ? b === 0
                            ? "bg-amber-400 scale-125"
                            : "bg-emerald-500 scale-125"
                          : "bg-slate-300 dark:bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setQuickBpm((b) => Math.max(40, b - 5))}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {quickBpm}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">BPM</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickBpm((b) => Math.min(220, b + 5))}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setQuickPlaying((p) => !p)}
                  className={`px-5 py-3 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 active:scale-95 ${
                    quickPlaying
                      ? "bg-rose-500 text-white"
                      : "bg-emerald-500 text-slate-950"
                  }`}
                >
                  {quickPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Mulai</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Chord Sound Pad for Ear Reference */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                Tap Cepat Bunyi Chord Dasar:
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {["C", "D", "Em", "F", "G", "Am"].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => playChordPreview(ch, preferredInstrument)}
                    className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 font-mono text-xs font-bold active:scale-95 transition-all"
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar for Mobile Phones */}
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-2 py-1.5"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {BOTTOM_TABS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/songs")
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? "text-emerald-500 font-bold"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    isActive ? "bg-emerald-500/15" : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
