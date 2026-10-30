"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { InstrumentType, PracticeSession } from "@/types/music";

interface CatalogFilterState {
  searchQuery: string;
  instrumentFilter: "all" | InstrumentType;
  difficultyFilter: "all" | "Pemula" | "Menengah" | "Mahir";
  onlyFavorites: boolean;
}

interface MusicAppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  favoriteSongIds: string[];
  toggleFavoriteSong: (songId: string) => void;
  isFavoriteSong: (songId: string) => boolean;
  preferredInstrument: InstrumentType;
  setPreferredInstrument: (inst: InstrumentType) => void;
  catalogFilter: CatalogFilterState;
  setCatalogFilter: React.Dispatch<React.SetStateAction<CatalogFilterState>>;
  practiceSessions: PracticeSession[];
  addPracticeSession: (session: Omit<PracticeSession, "id" | "completedAt">) => void;
}

const MusicAppContext = createContext<MusicAppContextType | undefined>(undefined);

const INITIAL_SESSIONS: PracticeSession[] = [
  {
    id: "ps-1",
    songId: "song-1",
    songTitle: "Langkah Pagi Cerah",
    instrument: "guitar",
    durationMinutes: 15,
    bpmUsed: 96,
    completedAt: "2026-10-29T19:30:00",
  },
  {
    id: "ps-2",
    songId: "song-2",
    songTitle: "Senja di Kota Tua",
    instrument: "bass",
    durationMinutes: 20,
    bpmUsed: 80,
    completedAt: "2026-10-30T10:15:00",
  },
];

export function MusicAppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [favoriteSongIds, setFavoriteSongIds] = useState<string[]>(["song-1"]);
  const [preferredInstrument, setPreferredInstrument] = useState<InstrumentType>("guitar");
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(INITIAL_SESSIONS);
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilterState>({
    searchQuery: "",
    instrumentFilter: "all",
    difficultyFilter: "all",
    onlyFavorites: false,
  });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("mlp_theme") as "dark" | "light" | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
      const savedFavs = localStorage.getItem("mlp_favorites");
      if (savedFavs) {
        setFavoriteSongIds(JSON.parse(savedFavs));
      }
      const savedInst = localStorage.getItem("mlp_instrument") as InstrumentType | null;
      if (savedInst === "guitar" || savedInst === "bass" || savedInst === "piano") {
        setPreferredInstrument(savedInst);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("mlp_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleFavoriteSong = (songId: string) => {
    setFavoriteSongIds((prev) => {
      const next = prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId];
      try {
        localStorage.setItem("mlp_favorites", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isFavoriteSong = (songId: string) => favoriteSongIds.includes(songId);

  const handleSetPreferredInstrument = (inst: InstrumentType) => {
    setPreferredInstrument(inst);
    try {
      localStorage.setItem("mlp_instrument", inst);
    } catch {
      // ignore
    }
  };

  const addPracticeSession = (session: Omit<PracticeSession, "id" | "completedAt">) => {
    const newSession: PracticeSession = {
      ...session,
      id: `ps-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    setPracticeSessions((prev) => [newSession, ...prev]);
  };

  return (
    <MusicAppContext.Provider
      value={{
        theme,
        toggleTheme,
        favoriteSongIds,
        toggleFavoriteSong,
        isFavoriteSong,
        preferredInstrument,
        setPreferredInstrument: handleSetPreferredInstrument,
        catalogFilter,
        setCatalogFilter,
        practiceSessions,
        addPracticeSession,
      }}
    >
      {children}
    </MusicAppContext.Provider>
  );
}

export function useMusicApp() {
  const ctx = useContext(MusicAppContext);
  if (!ctx) {
    throw new Error("useMusicApp harus digunakan di dalam MusicAppProvider");
  }
  return ctx;
}
