"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Award,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  Bookmark,
  ArrowUpRight,
  Edit3,
  Save,
} from "lucide-react";
import { useMusicApp } from "@/context/MusicAppContext";
import { DUMMY_SONGS } from "@/data/dummySongs";
import { COURSES_DATA, CourseInstrumentId } from "@/data/coursesData";
import { UserRole } from "@/types/music";

type ProgressMap = Record<string, boolean>;

export default function ProfilePage() {
  const {
    activeRole,
    setActiveRole,
    userProfile,
    updateUserProfile,
    favoriteSongIds,
    practiceSessions,
    contributions,
    submitContribution,
    moderateContribution,
    directoryUsers,
    changeDirectoryUserRole,
  } = useMusicApp();

  const [courseProgress, setCourseProgress] = useState<ProgressMap>({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editChurch, setEditChurch] = useState(userProfile.churchOrCommunity);
  const [editCity, setEditCity] = useState(userProfile.city);
  const [editInstrument, setEditInstrument] = useState<
    "guitar" | "bass" | "piano" | "cajon"
  >(userProfile.primaryInstrument);
  const [editBio, setEditBio] = useState(userProfile.bio);

  // Contributor New Chord Submission Form State
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newCategory, setNewCategory] = useState<
    "Hymn" | "Worship (Lambat)" | "Praise (Cepat)"
  >("Worship (Lambat)");
  const [newKey, setNewKey] = useState("G");
  const [newBpm, setNewBpm] = useState(70);
  const [newTs, setNewTs] = useState<"4/4" | "3/4" | "6/8">("4/4");
  const [newPemulaChords, setNewPemulaChords] = useState("G - D - Em - C");
  const [newMahirChords, setNewMahirChords] = useState(
    "G - D/F# - Em7 - G/B - Cmaj7 - Dsus4"
  );
  const [submitToast, setSubmitToast] = useState<string | null>(null);

  useEffect(() => {
    setEditName(userProfile.name);
    setEditChurch(userProfile.churchOrCommunity);
    setEditCity(userProfile.city);
    setEditInstrument(userProfile.primaryInstrument);
    setEditBio(userProfile.bio);
    setIsEditingProfile(false);
  }, [userProfile]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sonara_course_progress");
      if (saved) {
        setCourseProgress(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName.trim() || userProfile.name,
      churchOrCommunity: editChurch.trim() || userProfile.churchOrCommunity,
      city: editCity.trim() || userProfile.city,
      primaryInstrument: editInstrument,
      bio: editBio.trim() || userProfile.bio,
    });
    setIsEditingProfile(false);
  };

  const handleCreateContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    submitContribution({
      title: newTitle.trim(),
      artist: newArtist.trim(),
      category: newCategory,
      key: newKey,
      bpm: Number(newBpm) || 72,
      timeSignature: newTs,
      pemulaChordsSummary: newPemulaChords.trim(),
      mahirBridgeChordsSummary: newMahirChords.trim(),
    });

    setSubmitToast(
      activeRole === "super_admin"
        ? `Lagu "${newTitle.trim()}" berhasil ditambahkan & langsung disetujui oleh Super Admin.`
        : `Lagu "${newTitle.trim()}" berhasil dikirim dan masuk ke antrean review Super Admin.`
    );
    setNewTitle("");
    setNewArtist("");
    window.setTimeout(() => setSubmitToast(null), 5000);
  };

  const savedSongsList = useMemo(
    () => DUMMY_SONGS.filter((s) => favoriteSongIds.includes(s.id)),
    [favoriteSongIds]
  );

  const totalPracticeMinutes = useMemo(
    () => practiceSessions.reduce((acc, s) => acc + s.durationMinutes, 0),
    [practiceSessions]
  );

  const getInstrumentDoneCount = (instId: CourseInstrumentId) => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      if (courseProgress[`${instId}-${i}`]) count++;
    }
    return count;
  };

  const pendingContributionsCount = contributions.filter(
    (c) => c.status === "pending"
  ).length;
  const approvedContributionsCount = contributions.filter(
    (c) => c.status === "approved"
  ).length;

  const roleCards: {
    role: UserRole;
    title: string;
    subtitle: string;
    badge: string;
  }[] = [
    {
      role: "super_admin",
      title: "Super Admin",
      subtitle: "Kelola katalog lagu, setujui kontribusi chord, & atur role user",
      badge: "Akses Penuh",
    },
    {
      role: "contributor",
      title: "User Aktif Contributor",
      subtitle: "Susun & kirim aransemen chord Mode Pemula & jembatan Mode Mahir",
      badge: "Kontributor",
    },
    {
      role: "user",
      title: "User Biasa",
      subtitle: "Pelajari kursus 4 instrumen, simpan lagu favorit, & catat latihan",
      badge: "Pembelajar",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Header & Role Switcher Banner */}
      <section className="border-b border-zinc-300 dark:border-zinc-800 pb-6 space-y-4">
        <div className="space-y-1.5 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
            Profil Pengguna & Hak Akses Role
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Profil & Ruang Kerja ({roleCards.find((r) => r.role === activeRole)?.title})
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pilih salah satu dari <strong>3 Role Pengguna</strong> di bawah untuk melihat dan mencoba perbedaan tampilan profil serta fitur untuk{" "}
            <strong>Super Admin</strong>, <strong>User Aktif Contributor</strong>, dan{" "}
            <strong>User Biasa</strong>.
          </p>
        </div>

        {/* 3 Role Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {roleCards.map((rc) => {
            const isSelected = activeRole === rc.role;
            return (
              <button
                key={rc.role}
                type="button"
                onClick={() => setActiveRole(rc.role)}
                className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                    : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {rc.role === "super_admin" ? (
                      <Shield className="w-4 h-4 text-amber-500" />
                    ) : rc.role === "contributor" ? (
                      <Award className="w-4 h-4 text-amber-500" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-amber-500" />
                    )}
                    <span
                      className={`text-sm font-bold ${
                        isSelected
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {rc.title}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-xs font-mono text-[10px] font-bold ${
                      isSelected
                        ? "bg-amber-500 text-zinc-950"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {isSelected ? "Aktif" : rc.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {rc.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Profile Grid: Left Identity Card (4 cols) + Right Role Workspace (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 cols: User Profile Identity & Learning Summary */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Identity Card */}
          <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-amber-500 text-zinc-950 font-mono font-bold text-lg flex items-center justify-center shrink-0">
                  {userProfile.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-xs bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold uppercase">
                    {activeRole === "super_admin"
                      ? "Super Admin"
                      : activeRole === "contributor"
                      ? "Contributor Aktif"
                      : "User Biasa"}
                  </span>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {userProfile.name}
                  </h2>
                  <p className="text-xs font-mono text-zinc-500">
                    {userProfile.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingProfile((e) => !e)}
                className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-amber-500"
                title="Ubah Profil"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {!isEditingProfile ? (
              <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {userProfile.bio}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  <div className="p-2.5 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] text-zinc-500">Instrumen Utama</div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {userProfile.primaryInstrument === "guitar"
                        ? "Gitar 6 Senar"
                        : userProfile.primaryInstrument === "bass"
                        ? "Bass 4 Senar"
                        : userProfile.primaryInstrument === "piano"
                        ? "Keyboard / Piano"
                        : "Cajon"}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] text-zinc-500">Poin Reputasi</div>
                    <div className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      {userProfile.reputationPoints} Poin
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 pt-1">
                  <div>
                    <strong>Komunitas / Gereja:</strong>{" "}
                    {userProfile.churchOrCommunity}
                  </div>
                  <div>
                    <strong>Lokasi:</strong> {userProfile.city} · Bergabung{" "}
                    {userProfile.joinedAt}
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSaveProfile}
                className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs"
              >
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                      Instrumen Utama
                    </label>
                    <select
                      value={editInstrument}
                      onChange={(e) =>
                        setEditInstrument(
                          e.target.value as "guitar" | "bass" | "piano" | "cajon"
                        )
                      }
                      className="w-full px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="guitar">Gitar 6 Senar</option>
                      <option value="bass">Bass 4 Senar</option>
                      <option value="piano">Keyboard / Piano</option>
                      <option value="cajon">Cajon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                      Kota
                    </label>
                    <input
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                    Gereja / Komunitas Musik
                  </label>
                  <input
                    type="text"
                    value={editChurch}
                    onChange={(e) => setEditChurch(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1">
                    Bio Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-amber-500 text-zinc-950 font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Profil</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Course Progress Summary Card (All Roles) */}
          <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Progres Kelas Kursus Saya
              </h3>
              <Link
                href="/courses"
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Buka Kelas →
              </Link>
            </div>

            <div className="space-y-2.5">
              {COURSES_DATA.map((c) => {
                const done = getInstrumentDoneCount(c.id);
                const pct = done * 10;
                return (
                  <Link
                    key={c.id}
                    href={`/courses/${c.id}`}
                    className="block p-3 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {c.name}
                      </span>
                      <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                        {done}/10 ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-amber-500"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right 8 cols: Role-Specific Workspace */}
        <main className="lg:col-span-8 space-y-6">
          {/* ============================================================== */}
          {/* ROLE 1: SUPER ADMIN WORKSPACE                                  */}
          {/* ============================================================== */}
          {activeRole === "super_admin" && (
            <>
              {/* Platform Statistics Overview */}
              <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                      Panel Kendali Super Admin
                    </span>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      Ringkasan Ekosistem & Moderasi Konten Sonara
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-xs bg-amber-500 text-zinc-950 font-mono text-xs font-bold">
                    Hak Akses: Penuh
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] uppercase text-zinc-500">
                      Total Lagu Katalog
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {DUMMY_SONGS.length}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      33 Hymn · 10 Worship · 10 Praise
                    </div>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] uppercase text-zinc-500">
                      Modul Kursus
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      40 Sesi
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Gitar · Bass · Piano · Cajon
                    </div>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] uppercase text-zinc-500">
                      Menunggu Review
                    </div>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                      {pendingContributionsCount}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Kiriman Contributor
                    </div>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] uppercase text-zinc-500">
                      Pengguna Aktif
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {directoryUsers.length}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      3 Role Terdaftar
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderation Queue for Contributor Chord Submissions */}
              <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                    Moderasi Konten
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Antrean Persetujuan Lagu & Aransemen Chord dari Contributor
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Periksa kelengkapan chord Mode Pemula dan jembatan chord Mode Mahir sebelum diterbitkan ke katalog publik.
                  </p>
                </div>

                <div className="space-y-3">
                  {contributions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                              {sub.title}
                            </span>
                            <span className="px-2 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700 font-mono text-[10px] font-semibold">
                              {sub.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-xs bg-white dark:bg-zinc-900 font-mono text-[10px]">
                              Nada {sub.key} · {sub.bpm} BPM ({sub.timeSignature})
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            {sub.artist} · Dikirim oleh{" "}
                            <strong className="text-zinc-700 dark:text-zinc-300">
                              {sub.submittedBy}
                            </strong>{" "}
                            ({sub.submittedAt})
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-xs font-mono text-[11px] font-bold ${
                            sub.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40"
                              : sub.status === "revision"
                              ? "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/40"
                              : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {sub.status === "approved"
                            ? "✓ Disetujui"
                            : sub.status === "revision"
                            ? "Perlu Revisi"
                            : "Menunggu Review"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-sm bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block">
                            Mode Pemula:
                          </span>
                          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                            {sub.pemulaChordsSummary}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-sm bg-white dark:bg-[#141417] border border-amber-500/30">
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 block">
                            Mode Mahir (+ Jembatan Chord):
                          </span>
                          <span className="text-amber-700 dark:text-amber-300 font-semibold">
                            {sub.mahirBridgeChordsSummary}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] text-zinc-500">
                          {sub.reviewNote
                            ? `Catatan Admin: "${sub.reviewNote}"`
                            : "Belum ada catatan review"}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              moderateContribution(
                                sub.id,
                                "approved",
                                "Disetujui oleh Super Admin dan siap tayang di katalog."
                              )
                            }
                            disabled={sub.status === "approved"}
                            className="px-3 py-1.5 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs disabled:opacity-40 transition-colors"
                          >
                            Setujui & Terbitkan
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              moderateContribution(
                                sub.id,
                                "revision",
                                "Mohon lengkapi jembatan slash chord pada bagian Chorus."
                              )
                            }
                            disabled={sub.status === "revision"}
                            className="px-3 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-red-500 disabled:opacity-40 transition-colors"
                          >
                            Minta Revisi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Role Management Table */}
              <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-4">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                    Manajemen Hak Akses
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Kelola Role Pengguna Terdaftar
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Super Admin dapat mengangkat User Biasa menjadi Contributor Aktif atau mengatur hak akses pengurus.
                  </p>
                </div>

                <div className="space-y-2">
                  {directoryUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {u.name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          {u.email} · {u.churchOrCommunity} ({u.city})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="text-[11px] font-mono text-zinc-500">
                          Role:
                        </span>
                        <select
                          aria-label={`Ubah role ${u.name}`}
                          value={u.role}
                          onChange={(e) =>
                            changeDirectoryUserRole(
                              u.id,
                              e.target.value as UserRole
                            )
                          }
                          className="px-2.5 py-1.5 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200"
                        >
                          <option value="user">User Biasa</option>
                          <option value="contributor">Contributor Aktif</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* ROLE 2: CONTRIBUTOR AKTIF WORKSPACE                            */}
          {/* ============================================================== */}
          {(activeRole === "contributor" || activeRole === "super_admin") && (
            <div className="p-5 sm:p-6 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-500">
                    Studio Kontributor Lagu & Aransemen
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Kirim Lagu & Aransemen Chord Baru (Mode Pemula & Mode Mahir)
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Sebagai Contributor Aktif, Anda dapat menyumbangkan aransemen chord lagu Hymn, Worship, maupun Praise.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                    Disetujui: {approvedContributionsCount}
                  </span>
                  <span className="px-2.5 py-1 rounded-xs bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold">
                    Pending: {pendingContributionsCount}
                  </span>
                </div>
              </div>

              {submitToast && (
                <div className="p-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  {submitToast}
                </div>
              )}

              <form onSubmit={handleCreateContribution} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Judul Lagu Rohani
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Contoh: Still / Give Thanks / Above All"
                      className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Penyanyi / Pencipta Lagu
                    </label>
                    <input
                      type="text"
                      required
                      value={newArtist}
                      onChange={(e) => setNewArtist(e.target.value)}
                      placeholder="Contoh: Reuben Morgan / Don Moen"
                      className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Kategori Lagu
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) =>
                        setNewCategory(
                          e.target.value as
                            | "Hymn"
                            | "Worship (Lambat)"
                            | "Praise (Cepat)"
                        )
                      }
                      className="w-full px-2.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="Hymn">Hymn</option>
                      <option value="Worship (Lambat)">Worship (Lambat)</option>
                      <option value="Praise (Cepat)">Praise (Cepat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Nada Dasar
                    </label>
                    <select
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100"
                    >
                      {["C", "D", "E", "F", "G", "A", "Bb"].map((k) => (
                        <option key={k} value={k}>
                          Nada {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Tempo (BPM)
                    </label>
                    <input
                      type="number"
                      min={45}
                      max={180}
                      value={newBpm}
                      onChange={(e) => setNewBpm(Number(e.target.value))}
                      className="w-full px-2.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Birama
                    </label>
                    <select
                      value={newTs}
                      onChange={(e) =>
                        setNewTs(e.target.value as "4/4" | "3/4" | "6/8")
                      }
                      className="w-full px-2.5 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="4/4">4/4</option>
                      <option value="3/4">3/4</option>
                      <option value="6/8">6/8</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Urutan Chord Mode Pemula (Chord Dasar)
                    </label>
                    <input
                      type="text"
                      required
                      value={newPemulaChords}
                      onChange={(e) => setNewPemulaChords(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                      Urutan Chord Mode Mahir (+ Jembatan Slash Chord)
                    </label>
                    <input
                      type="text"
                      required
                      value={newMahirChords}
                      onChange={(e) => setNewMahirChords(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-amber-500/40 bg-[#f6f5f2] dark:bg-[#0d0d0f] text-xs font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Kirim Kontribusi Aransemen Lagu</span>
                </button>
              </form>

              {/* Contributor's Own Submission History (shown when activeRole === contributor) */}
              {activeRole === "contributor" && (
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Riwayat Kiriman Kontribusi Saya
                  </h3>

                  <div className="space-y-2.5">
                    {contributions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-[#f6f5f2] dark:bg-[#0d0d0f] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                              {sub.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-zinc-300 dark:border-zinc-700">
                              {sub.category} · {sub.key}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500">
                            Pemula: {sub.pemulaChordsSummary} | Mahir:{" "}
                            {sub.mahirBridgeChordsSummary}
                          </div>
                          {sub.reviewNote && (
                            <div className="text-[11px] text-amber-600 dark:text-amber-400">
                              Catatan Admin: {sub.reviewNote}
                            </div>
                          )}
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-xs font-mono text-[11px] font-bold shrink-0 self-start sm:self-center inline-flex items-center gap-1 ${
                            sub.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : sub.status === "revision"
                              ? "bg-red-500/20 text-red-700 dark:text-red-300"
                              : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          }`}
                        >
                          {sub.status === "approved" ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Disetujui</span>
                            </>
                          ) : sub.status === "revision" ? (
                            <>
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Perlu Revisi</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              <span>Menunggu Review</span>
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* ROLE 3: USER BIASA & SHARED LEARNING ACTIVITY                  */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Saved Songs Card */}
            <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3.5">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Lagu Tersimpan ({savedSongsList.length})
                  </h3>
                </div>
                <Link
                  href="/"
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Cari Lagu →
                </Link>
              </div>

              {savedSongsList.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4 text-center">
                  Belum ada lagu yang disimpan. Klik ikon Bookmark pada katalog lagu untuk menyimpannya di sini.
                </p>
              ) : (
                <div className="space-y-2">
                  {savedSongsList.map((s) => (
                    <Link
                      key={s.id}
                      href={`/songs/${s.slug}`}
                      className="p-3 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 flex items-center justify-between gap-2 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {s.title}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          {s.genre} · Nada {s.key} · {s.bpm} BPM
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Practice Sessions History Card */}
            <div className="p-5 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-3.5">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Riwayat Sesi Latihan
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-xs bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-bold">
                  Total {totalPracticeMinutes} Menit
                </span>
              </div>

              <div className="space-y-2">
                {practiceSessions.slice(0, 5).map((ps) => (
                  <div
                    key={ps.id}
                    className="p-3 rounded-sm bg-[#f6f5f2] dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {ps.songTitle}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Instrumen:{" "}
                        {ps.instrument === "guitar"
                          ? "Gitar"
                          : ps.instrument === "bass"
                          ? "Bass"
                          : "Piano"}{" "}
                        · {ps.bpmUsed} BPM
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      {ps.durationMinutes} mnt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upgrade to Contributor Banner (Shown only when activeRole === 'user') */}
          {activeRole === "user" && (
            <div className="p-5 rounded-md border border-amber-500/40 bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Ingin Ikut Menyusun Chord Lagu Rohani?
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Sebagai <strong>User Biasa</strong>, Anda dapat beralih ke role{" "}
                  <strong>Contributor Aktif</strong> untuk mengirimkan aransemen chord Mode Pemula dan jembatan Mode Mahir.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRole("contributor")}
                className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shrink-0 transition-colors"
              >
                Coba Mode Contributor Aktif
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
