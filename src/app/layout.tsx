import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MusicAppProvider } from "@/context/MusicAppContext";
import { StudioNavbar } from "@/components/layout/StudioNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Sonara — Ruang Belajar Musik & Katalog Chord",
  description:
    "Platform belajar musik, katalog chord terkurasi, transpose nada dasar, diagram Gitar/Bass/Piano, metronome, tuner, dan latihan loop audio.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sonara",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#d97706",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100 transition-colors pb-16 lg:pb-0">
        <MusicAppProvider>
          <StudioNavbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-300 dark:border-zinc-800 bg-[#efede8] dark:bg-[#111114] py-6 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2.5">
                <img
                  src="/icon-sonara.png"
                  alt="Sonara"
                  className="w-5 h-5 rounded-xs object-cover border border-zinc-700"
                />
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Sonara
                </span>
                <span>— Ruang Latihan & Repertoar Musik</span>
              </div>
              <div>
                <span>Katalog berlisensi & alat latihan web interaktif</span>
              </div>
            </div>
          </footer>
          <MobileBottomNav />
        </MusicAppProvider>
      </body>
    </html>
  );
}
