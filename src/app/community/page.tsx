import React from "react";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";

export default function CommunityPreviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
        <Users className="w-7 h-7" />
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
        Tahap Berikutnya (P2 — F-06 & FR-08: Komunitas, Cari Band & Moderasi)
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Ruang Komunitas, Pencarian Anggota Band & Panel Admin
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
        Modul ini akan dibangun pada <strong>Tahap 5 (P2)</strong> setelah modul P0 dan P1 selesai.
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
