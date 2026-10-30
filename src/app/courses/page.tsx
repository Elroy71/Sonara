import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function CoursesPreviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
        <GraduationCap className="w-7 h-7" />
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
        Tahap Berikutnya (P1 — F-03: Kursus & Progress Tracker)
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Modul Kursus Terstruktur & Progress Tracker
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
        Modul ini akan dibangun pada <strong>Tahap 3 (P1)</strong> setelah Anda memvalidasi fondasi latihan <strong>P0 (Katalog Lagu, Transpose, Diagram Chord, Metronome, Tuner & Loop/Tempo)</strong>.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Lagu (P0)</span>
        </Link>
      </div>
    </div>
  );
}
