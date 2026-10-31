"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Square, Minus, Plus, X, Volume2, Sliders } from "lucide-react";
import { useMusicApp } from "@/context/MusicAppContext";
import { InstrumentType } from "@/types/music";
import { getAudioContext, playChordPreview } from "@/lib/audioSynth";

const BOTTOM_TABS = [
  { href: "/", label: "Katalog" },
  { href: "/practice", label: "Latihan" },
  { href: "/courses", label: "Kursus" },
  { href: "/ai-studio", label: "Studio" },
  { href: "/community", label: "Komunitas" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { preferredInstrument, setPreferredInstrument } = useMusicApp();

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
      <div className="lg:hidden fixed bottom-16 right-4 z-40">
        <button
          type="button"
          onClick={() => setQuickDrawerOpen((o) => !o)}
          aria-label="Buka Alat Cepat"
          className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-semibold text-xs border transition-colors ${
            quickPlaying
              ? "bg-amber-500 text-zinc-950 border-amber-400"
              : "bg-zinc-900 text-zinc-100 border-zinc-700"
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>{quickPlaying ? `${quickBpm} BPM` : "Tempo Cepat"}</span>
        </button>
      </div>

      {/* Quick Mobile Practice Drawer */}
      {quickDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60">
          <div className="border-t border-zinc-700 bg-[#f6f5f2] dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Pengaturan Cepat
              </h3>
              <button
                type="button"
                onClick={() => setQuickDrawerOpen(false)}
                className="p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Instrument Switcher */}
            <div className="space-y-1.5">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Instrumen:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["guitar", "bass", "piano"] as InstrumentType[]).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setPreferredInstrument(inst)}
                    className={`py-2 rounded-md text-xs font-semibold border transition-colors ${
                      preferredInstrument === inst
                        ? "bg-amber-500 text-zinc-950 border-amber-500"
                        : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {inst === "guitar" ? "Gitar" : inst === "bass" ? "Bass" : "Piano"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metronome */}
            <div className="p-3.5 rounded-md bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Metronome (4/4)
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={`w-2 h-2 rounded-xs ${
                        quickPlaying && quickBeat === b
                          ? "bg-amber-500"
                          : "bg-zinc-300 dark:bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setQuickBpm((b) => Math.max(40, b - 5))}
                  className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center font-mono">
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">
                    {quickBpm}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">BPM</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickBpm((b) => Math.min(220, b + 5))}
                  className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-800"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setQuickPlaying((p) => !p)}
                  className={`px-4 py-2.5 rounded-md font-semibold text-xs inline-flex items-center gap-1.5 ${
                    quickPlaying
                      ? "bg-red-600 text-white"
                      : "bg-amber-500 text-zinc-950"
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

            {/* Quick Chord Pad */}
            <div className="space-y-1.5">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                Nada Referensi Chord:
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {["C", "D", "Em", "F", "G", "Am"].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => playChordPreview(ch, preferredInstrument)}
                    className="py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-xs font-semibold"
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar (Clean text tabs, no icons) */}
      <nav
        aria-label="Navigasi Bawah"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] px-2"
      >
        <div className="grid grid-cols-5 max-w-md mx-auto">
          {BOTTOM_TABS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/songs")
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-3.5 text-center text-xs transition-colors ${
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-2 right-2 h-0.5 bg-amber-500" />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
