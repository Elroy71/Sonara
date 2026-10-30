import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MusicAppProvider } from "@/context/MusicAppContext";
import { StudioNavbar } from "@/components/layout/StudioNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Sonara — Music Learning Platform, Chord & AI Practice Studio",
  description:
    "Platform belajar musik terpadu: katalog lagu & chord berizin, transpose deterministik, diagram Gitar/Bass/Piano, metronome, tuner, loop latihan, dan analisis AI.",
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
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20 lg:pb-0">
        <MusicAppProvider>
          <StudioNavbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200/80 dark:border-slate-900 bg-white/60 dark:bg-slate-950/80 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <img
                  src="/icon-sonara.png"
                  alt="Sonara"
                  className="w-6 h-6 rounded-md object-cover border border-amber-500/30"
                />
                <span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Sonara Music Learning Platform
                  </span>{" "}
                  — Spesifikasi v0.2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span>Seluruh konten katalog berstatus lisensi terverifikasi (Data Dummy MVP)</span>
              </div>
            </div>
          </footer>
          <MobileBottomNav />
        </MusicAppProvider>
      </body>
    </html>
  );
}
