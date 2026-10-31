"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ChordContributionSubmission,
  InstrumentType,
  PracticeSession,
  UserProfile,
  UserRole,
} from "@/types/music";

export type SongCategoryFilter = "all" | "Hymn" | "Worship" | "Praise";

interface CatalogFilterState {
  searchQuery: string;
  categoryFilter: SongCategoryFilter;
  instrumentFilter: "all" | InstrumentType;
  difficultyFilter: "all" | "Pemula" | "Mahir";
  onlyFavorites: boolean;
}

const ROLE_PRESET_PROFILES: Record<UserRole, UserProfile> = {
  super_admin: {
    id: "usr-admin-01",
    name: "Elia Roysandi (Super Admin)",
    email: "admin@sonara.music",
    role: "super_admin",
    primaryInstrument: "guitar",
    churchOrCommunity: "Tim Inti Sonara & Musik Gereja",
    city: "Indonesia",
    bio: "Pengelola utama repertoar lagu rohani (Hymn, Worship, Praise), kurator kurikulum 4 instrumen, dan moderator kontribusi chord.",
    joinedAt: "Januari 2026",
    reputationPoints: 1450,
  },
  contributor: {
    id: "usr-contrib-01",
    name: "Daniel Pratama (Contributor Aktif)",
    email: "daniel.contributor@sonara.music",
    role: "contributor",
    primaryInstrument: "piano",
    churchOrCommunity: "Pelayanan Musik Ibadah Raya",
    city: "Jakarta",
    bio: "Penyusun aransemen chord Mode Pemula & jembatan slash chord Mode Mahir untuk lagu-lagu Hymn, Worship, dan Praise.",
    joinedAt: "Maret 2026",
    reputationPoints: 620,
  },
  user: {
    id: "usr-member-01",
    name: "Yohanes Saputra (User Biasa)",
    email: "yohanes@sonara.music",
    role: "user",
    primaryInstrument: "guitar",
    churchOrCommunity: "Komunitas Pemuda & Musik",
    city: "Surabaya",
    bio: "Sedang belajar dasar Gitar 6 Senar dan Cajon untuk persiapan pelayanan persekutuan.",
    joinedAt: "Agustus 2026",
    reputationPoints: 110,
  },
};

const INITIAL_CONTRIBUTIONS: ChordContributionSubmission[] = [
  {
    id: "sub-01",
    title: "How Great Thou Art",
    artist: "Carl Boberg / Stuart K. Hine",
    category: "Hymn",
    key: "G",
    bpm: 72,
    timeSignature: "4/4",
    pemulaChordsSummary: "G - C - G - D - Em - C - D - G",
    mahirBridgeChordsSummary: "G - G/B - Cmaj7 - D/F# - Em7 - Am7 - D7sus4 - G",
    submittedBy: "Daniel Pratama (Contributor Aktif)",
    submittedAt: "29 Okt 2026",
    status: "pending",
  },
  {
    id: "sub-02",
    title: "Cornerstone",
    artist: "Hillsong Worship",
    category: "Worship (Lambat)",
    key: "C",
    bpm: 71,
    timeSignature: "4/4",
    pemulaChordsSummary: "C - Am - F - G",
    mahirBridgeChordsSummary: "C - C/E - Fmaj7 - G/B - Am7 - Am/G - F - Gsus4 - C",
    submittedBy: "Daniel Pratama (Contributor Aktif)",
    submittedAt: "28 Okt 2026",
    status: "approved",
    reviewNote: "Aransemen Mode Pemula & Jembatan Mode Mahir sangat rapi dan akurat.",
  },
  {
    id: "sub-03",
    title: "Hosanna (Praise Is Rising)",
    artist: "Paul Baloche",
    category: "Praise (Cepat)",
    key: "G",
    bpm: 116,
    timeSignature: "4/4",
    pemulaChordsSummary: "G - Em - C - D",
    mahirBridgeChordsSummary: "G - D/F# - Em7 - G/B - Cmaj7 - Dsus4 - D",
    submittedBy: "kevin.musik (Contributor Aktif)",
    submittedAt: "27 Okt 2026",
    status: "pending",
  },
];

const INITIAL_DIRECTORY_USERS: UserProfile[] = [
  ROLE_PRESET_PROFILES.super_admin,
  ROLE_PRESET_PROFILES.contributor,
  ROLE_PRESET_PROFILES.user,
  {
    id: "usr-contrib-02",
    name: "Kevin Wijaya",
    email: "kevin.musik@sonara.music",
    role: "contributor",
    primaryInstrument: "bass",
    churchOrCommunity: "Tim Musik Pemuda",
    city: "Bandung",
    bio: "Bassist 4 senar yang aktif menyusun jalur walkdown bass lagu Worship.",
    joinedAt: "Mei 2026",
    reputationPoints: 410,
  },
  {
    id: "usr-member-02",
    name: "Maria Natalia",
    email: "maria.natalia@sonara.music",
    role: "user",
    primaryInstrument: "cajon",
    churchOrCommunity: "Komunitas Akustik Gereja",
    city: "Medan",
    bio: "Belajar pola ketukan Cajon untuk persekutuan doa.",
    joinedAt: "September 2026",
    reputationPoints: 85,
  },
];

const INITIAL_SESSIONS: PracticeSession[] = [
  {
    id: "ps-1",
    songId: "hymn-01",
    songTitle: "It Is Well with My Soul",
    instrument: "guitar",
    durationMinutes: 15,
    bpmUsed: 72,
    completedAt: "2026-10-29T19:30:00",
  },
  {
    id: "ps-2",
    songId: "hymn-07",
    songTitle: "Amazing Grace",
    instrument: "piano",
    durationMinutes: 20,
    bpmUsed: 68,
    completedAt: "2026-10-30T10:15:00",
  },
];

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

  // User Role & Profile System
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  userProfile: UserProfile;
  updateUserProfile: (patch: Partial<UserProfile>) => void;
  contributions: ChordContributionSubmission[];
  submitContribution: (
    item: Omit<
      ChordContributionSubmission,
      "id" | "submittedBy" | "submittedAt" | "status"
    >
  ) => void;
  moderateContribution: (
    id: string,
    status: "approved" | "revision",
    reviewNote?: string
  ) => void;
  directoryUsers: UserProfile[];
  changeDirectoryUserRole: (userId: string, newRole: UserRole) => void;
}

const MusicAppContext = createContext<MusicAppContextType | undefined>(undefined);

export function MusicAppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [favoriteSongIds, setFavoriteSongIds] = useState<string[]>(["hymn-01", "hymn-07"]);
  const [preferredInstrument, setPreferredInstrument] = useState<InstrumentType>("guitar");
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(INITIAL_SESSIONS);
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilterState>({
    searchQuery: "",
    categoryFilter: "all",
    instrumentFilter: "all",
    difficultyFilter: "all",
    onlyFavorites: false,
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>("super_admin");
  const [profilesByRole, setProfilesByRole] =
    useState<Record<UserRole, UserProfile>>(ROLE_PRESET_PROFILES);
  const [contributions, setContributions] =
    useState<ChordContributionSubmission[]>(INITIAL_CONTRIBUTIONS);
  const [directoryUsers, setDirectoryUsers] =
    useState<UserProfile[]>(INITIAL_DIRECTORY_USERS);

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
      const savedRole = localStorage.getItem("sonara_active_role") as UserRole | null;
      if (
        savedRole === "super_admin" ||
        savedRole === "contributor" ||
        savedRole === "user"
      ) {
        setActiveRoleState(savedRole);
      }
      const savedContribs = localStorage.getItem("sonara_contributions");
      if (savedContribs) {
        setContributions(JSON.parse(savedContribs));
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

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    try {
      localStorage.setItem("sonara_active_role", role);
    } catch {
      // ignore
    }
  };

  const userProfile = profilesByRole[activeRole];

  const updateUserProfile = (patch: Partial<UserProfile>) => {
    setProfilesByRole((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        ...patch,
      },
    }));
  };

  const submitContribution = (
    item: Omit<
      ChordContributionSubmission,
      "id" | "submittedBy" | "submittedAt" | "status"
    >
  ) => {
    const newItem: ChordContributionSubmission = {
      ...item,
      id: `sub-${Date.now()}`,
      submittedBy: userProfile.name,
      submittedAt: "Baru saja",
      status: activeRole === "super_admin" ? "approved" : "pending",
    };
    setContributions((prev) => {
      const next = [newItem, ...prev];
      try {
        localStorage.setItem("sonara_contributions", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const moderateContribution = (
    id: string,
    status: "approved" | "revision",
    reviewNote?: string
  ) => {
    setContributions((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, status, reviewNote } : c
      );
      try {
        localStorage.setItem("sonara_contributions", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const changeDirectoryUserRole = (userId: string, newRole: UserRole) => {
    setDirectoryUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
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
        activeRole,
        setActiveRole,
        userProfile,
        updateUserProfile,
        contributions,
        submitContribution,
        moderateContribution,
        directoryUsers,
        changeDirectoryUserRole,
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
