import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CommunityPreviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
      <div className="p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
          Forum & Kolaborasi
        </p>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Komunitas Pemusik & Pencarian Rekan Band
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Bagian ini disiapkan untuk ruang diskusi antar pemusik, berbagi materi latihan, dan mencari rekan band berdasarkan instrumen serta domisili.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Lagu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
