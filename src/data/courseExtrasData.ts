import { CourseInstrumentId } from "./coursesData";

export interface CajonBeatStep {
  beatLabel: string;
  hit: "B" | "S" | "T" | "t" | "-";
  hand: string;
}

export interface ChordCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  playingTip: string;
  chords: {
    symbol: string;
    usageNote: string;
  }[];
}

export interface InstrumentRhythmPattern {
  id: string;
  name: string;
  category: "Worship" | "Praise" | "Hymn & 3/4" | "Build-Up & Fill";
  timeSignature: "4/4" | "3/4" | "6/8";
  bpm: number;
  patternVisual: string;
  countGuide: string;
  usage: string;
  techniqueTip: string;
  /** Khusus Cajon: urutan pukulan interaktif */
  cajonSteps?: CajonBeatStep[];
  /** Khusus Gitar/Bass/Piano: akor contoh untuk disimulasikan mengikuti ketukan */
  sampleChords?: string[];
}

export interface BonusSkillModule {
  id: string;
  skillNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  targetBpm: number;
  timeSignature: "4/4" | "3/4" | "6/8";
  whenToUse: string;
  visualPatternTitle: string;
  visualPatternLines: string[];
  practiceSteps: string[];
  /** Untuk Gitar/Piano/Bass: akor atau urutan akor yang bisa diputar langsung */
  demoChords?: string[];
  /** Khusus Bass: rangkaian nada MIDI untuk mendemonstrasikan lick/fill-in */
  demoBassMidiNotes?: { label: string; midi: number }[];
  /** Khusus Cajon: pola fill-in yang bisa diputar langsung */
  demoCajonSteps?: CajonBeatStep[];
}

export interface InstrumentExtrasBundle {
  instrumentId: CourseInstrumentId;
  dictionaryTitle: string;
  dictionarySubtitle: string;
  chordCategories: ChordCategoryGroup[];
  rhythmPatterns: InstrumentRhythmPattern[];
  bonusSkills: BonusSkillModule[];
}

export const COURSE_EXTRAS_DATA: Record<CourseInstrumentId, InstrumentExtrasBundle> = {
  guitar: {
    instrumentId: "guitar",
    dictionaryTitle: "Kamus Chord Gitar, Slash Chord & Pola Genjrengan Inti",
    dictionarySubtitle:
      "Khusus Gitar 6-Senar: Seluruh posisi jari akor dasar, akor gantung (barre), akor worship open-string, slash chord jembatan, serta pola strumming yang paling sering dipakai.",
    chordCategories: [
      {
        id: "guitar-core",
        title: "1. Chord Inti Mayor & Minor (Wajib Hafal)",
        subtitle: "Akor fondasi utama pada gitar 6-senar untuk mengiringi 90% lagu gereja.",
        playingTip:
          "Pastikan ujung jari menekan tegak lurus tepat di belakang besi fret, dan perhatikan tanda silang (X) agar senar bass yang tidak dipakai tidak ikut terpetik.",
        chords: [
          { symbol: "C", usageNote: "Nada dasar favorit; senar 6 (E rendah) jangan ikut digenjreng." },
          { symbol: "D", usageNote: "Genjreng mulai dari senar 4 (D) ke bawah agar suara jernih." },
          { symbol: "E", usageNote: "Semua 6 senar dibunyikan penuh; sangat gagah untuk lagu Praise." },
          { symbol: "F", usageNote: "Bisa memakai F-maj7 open atau telunjuk menekan senar 1 & 2." },
          { symbol: "G", usageNote: "Gunakan jari manis & kelingking di fret 3 senar 1-2 agar stabil." },
          { symbol: "A", usageNote: "Bunyikan mulai dari senar 5 (A) terbuka ke bawah." },
          { symbol: "B", usageNote: "Akor palang (barre) di fret 2; kunci penting di nada dasar E & F#." },
          { symbol: "Am", usageNote: "Akor minor VI dari C; transisi sangat dekat dari akor C." },
          { symbol: "Dm", usageNote: "Akor minor II dari C; genjreng dari senar 4 ke bawah." },
          { symbol: "Em", usageNote: "Akor paling mudah (2 jari); jembatan utama di nada dasar G." },
          { symbol: "F#m", usageNote: "Akor palang fret 2; wajib dikuasai untuk lagu di nada dasar D & A." },
          { symbol: "Bm", usageNote: "Akor palang fret 2 (mulai senar 5); pasangan tetap nada dasar D & G." },
          { symbol: "Cm", usageNote: "Akor palang fret 3; sering muncul sebagai jembatan minor IV." },
          { symbol: "Fm", usageNote: "Sering dipakai sebagai akor jembatan sendu sebelum kembali ke C." },
          { symbol: "Gm", usageNote: "Akor minor utama pada lagu bernada dasar F atau Bb." },
        ],
      },
      {
        id: "guitar-slash",
        title: "2. Slash Chord / Akor Jembatan Gitar",
        subtitle:
          "Akor dengan nada bass khusus di senar paling atas yang dipetik untuk menciptakan perpindahan melodi bass yang mulus.",
        playingTip:
          "Huruf di sebelah kiri garis miring adalah akornya, sedangkan huruf di sebelah kanan (mis. /B atau /F#) adalah senar paling rendah yang WAJIB Anda petik pertama kali.",
        chords: [
          { symbol: "G/B", usageNote: "Jembatan wajib dari C ke Am. Petik mulai senar 5 fret 2 (nada B)." },
          { symbol: "D/F#", usageNote: "Jembatan wajib dari G ke Em. Tekan senar 6 fret 2 dengan jempol/telunjuk." },
          { symbol: "C/E", usageNote: "Jembatan dari Dm ke F. Bunyikan senar 6 terbuka (E) bersama akor C." },
          { symbol: "F/A", usageNote: "Bentuk F tetapi senar 5 terbuka (A) menjadi nada paling rendah." },
          { symbol: "A/C#", usageNote: "Jembatan dari D ke Bm. Tekan senar 5 fret 4 dengan jari manis/kelingking." },
          { symbol: "E/G#", usageNote: "Jembatan dari A ke F#m. Tekan senar 6 fret 4 untuk bass G#." },
          { symbol: "Am/G", usageNote: "Turunan bass dari Am menuju F; kelingking menekan senar 6 fret 3." },
          { symbol: "C/G", usageNote: "Akor C dengan tambahan senar 6 fret 3 (G) agar terdengar lebih tebal." },
          { symbol: "G/D", usageNote: "Akor G yang ditahan di atas bass D (senar 4 terbuka) untuk intro." },
          { symbol: "D/A", usageNote: "Akor D dengan senar 5 terbuka (A) ikut dibunyikan." },
        ],
      },
      {
        id: "guitar-worship",
        title: "3. Chord Worship Open, Sus & 7th (Suara Modern)",
        subtitle:
          "Voicing khas gitaris gereja modern yang membuat bunyi gitar akustik terdengar luas, hangat, dan menyatu.",
        playingTip:
          "Pada akor G, Cadd9, Em7, dan Dsus4 di nada dasar G, tahan jari manis (senar 2 fret 3) dan kelingking (senar 1 fret 3) sebagai jari jangkar yang tidak perlu diangkat!",
        chords: [
          { symbol: "Cadd9", usageNote: "Pengganti C di lagu Worship; jari manis & kelingking tetap di fret 3." },
          { symbol: "Dsus4", usageNote: "Tambahkan kelingking di senar 1 fret 3 dari akor D untuk efek gantung." },
          { symbol: "Gsus4", usageNote: "Tambahkan telunjuk di senar 2 fret 1 sebelum kembali ke G." },
          { symbol: "Asus4", usageNote: "Sangat indah untuk intro lagu di nada dasar A atau E." },
          { symbol: "Esus4", usageNote: "Tahan sebelum turun ke E mayor pada akhir Reff." },
          { symbol: "Cmaj7", usageNote: "Lepas telunjuk dari akor C biasa; nuansa teduh untuk saat doa." },
          { symbol: "Fmaj7", usageNote: "Bentuk F ramah pemula yang justru terdengar sangat manis di Worship." },
          { symbol: "Gmaj7", usageNote: "Warna jazz/modern lembut untuk awal bait pertama." },
          { symbol: "Am7", usageNote: "Lepas jari manis dari Am biasa; bunyi lebih ringan & terbuka." },
          { symbol: "Em7", usageNote: "Gunakan 4 jari (tahan senar 1 & 2 di fret 3) agar menyatu dengan G." },
          { symbol: "Dm7", usageNote: "Lebih lembut dari Dm biasa untuk transisi ke G7 -> C." },
          { symbol: "Bm7", usageNote: "Versi lebih lembut dari Bm untuk lagu Ballad." },
          { symbol: "G7", usageNote: "Akor pengantar kuat untuk kembali ke nada dasar C." },
          { symbol: "D7", usageNote: "Akor pengantar kuat untuk kembali ke nada dasar G." },
          { symbol: "E7", usageNote: "Akor pengantar emosional sebelum masuk ke Am atau A." },
        ],
      },
    ],
    rhythmPatterns: [
      {
        id: "gtr-rhythm-1",
        name: "Folk Ballad 4/4 (Pola Sejuta Lagu)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 72,
        patternVisual: "D   -   D   U   -   U   D   U",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Dipakai di 80% lagu Worship dan Pop Rohani tempo sedang (68–80 BPM), terutama saat masuk Reff.",
        techniqueTip:
          "Kunci utamanya ada di hitungan ke-3: tangan kanan tetap mengayun ke bawah melewati senar TANPA menyentuh senar (ayunan kosong), lalu langsung menyapu ke atas (Up) pada hitungan '&'.",
        sampleChords: ["G", "D/F#", "Em7", "Cadd9"],
      },
      {
        id: "gtr-rhythm-2",
        name: "Slow Worship 8-Beat (Lembut & Mengalir)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 65,
        patternVisual: "B   -   D   -   D   U   D   U",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Cocok untuk Bait 1 & Bait 2 lagu penyembahan lambat agar tidak terdengar terlalu ramai.",
        techniqueTip:
          "Pada ketukan 1 ('B'), petik hanya senar Bass akornya saja, baru genjreng tipis senar bawah pada ketukan 2, 3, dan 4.",
        sampleChords: ["C", "G/B", "Am7", "Fmaj7"],
      },
      {
        id: "gtr-rhythm-3",
        name: "Praise 16-Beat Percussive (Cepat & Berenergi)",
        category: "Praise",
        timeSignature: "4/4",
        bpm: 116,
        patternVisual: "D   -   D   U   X   U   D   U",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Digunakan untuk lagu Praise cepat seperti 'Bersuka Dalam Tuhan' atau 'Hari Ini Kurasa Bahagia'.",
        techniqueTip:
          "Tanda 'X' pada ketukan ke-3 berarti 'Chuck / Slap': genjreng ke bawah sambil meredam senar dengan sisi telapak tangan kanan sehingga berbunyi 'cek' seperti snare drum.",
        sampleChords: ["G", "C", "Em", "D"],
      },
      {
        id: "gtr-rhythm-4",
        name: "Waltz Hymn 3/4 (Ayunan Tiga Ketuk)",
        category: "Hymn & 3/4",
        timeSignature: "3/4",
        bpm: 84,
        patternVisual: "B   -   D   U   D   U",
        countGuide: "1   &   2   &   3   &",
        usage: "Wajib untuk lagu Hymn berbirama 3/4 seperti 'Amazing Grace' atau 'How Great Thou Art'.",
        techniqueTip:
          "Ketukan 1 selalu memetik senar Bass tunggal ('Tung'), lalu ketukan 2 dan 3 menyapu senar bawah secara ringan ('Jreng-jreng').",
        sampleChords: ["G", "C", "G", "D"],
      },
      {
        id: "gtr-rhythm-5",
        name: "Anthem Worship 6/8 (Gagah & Mengayun)",
        category: "Hymn & 3/4",
        timeSignature: "6/8",
        bpm: 56,
        patternVisual: "D   -   D   D   U   D",
        countGuide: "1   2   3   4   5   6",
        usage: "Untuk lagu anthem 6/8 seperti 'reckless/ballad 6/8' dan lagu penyembahan megah.",
        techniqueTip:
          "Beri tekanan tegas (aksen) pada hitungan ke-1 dan hitungan ke-4, sementara hitungan lainnya digenjreng tipis.",
        sampleChords: ["C", "Am", "F", "G"],
      },
      {
        id: "gtr-rhythm-6",
        name: "Bridge Crescendo 8-Downstroke (Build-Up)",
        category: "Build-Up & Fill",
        timeSignature: "4/4",
        bpm: 76,
        patternVisual: "d   d   d   d   D   D   D   D!",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Dipakai saat mengulang Bridge menuju puncak Reff terakhir.",
        techniqueTip:
          "Semua 8 genjrengan mengarah ke bawah (Downstroke). Mulai dengan Palm Mute tipis (d kecil) lalu buka telapak tangan perlahan hingga berbunyi lantang (D!).",
        sampleChords: ["Fmaj7", "G", "Am7", "C/E"],
      },
    ],
    bonusSkills: [
      {
        id: "gtr-skill-1",
        skillNumber: 1,
        badge: "SKILL FILL-IN #1",
        title: "Fill-In Hammer-On & Sus4 di Ujung Bar (Hitungan ke-4)",
        subtitle:
          "Menambahkan hiasan melodi manis pada ketukan ke-4 tanpa merusak tempo genjrengan.",
        targetBpm: 70,
        timeSignature: "4/4",
        whenToUse:
          "Gunakan saat penyanyi berhenti bernyanyi di ujung kalimat (hitungan 3-4) sebelum berpindah ke akor berikutnya.",
        visualPatternTitle: "Rumus Jari: Chord Biasa -> Sus4 -> Chord Biasa",
        visualPatternLines: [
          "1. Pada akor D: Genjreng D biasa (Hitungan 1-2-3), lalu jatuhkan kelingking ke senar 1 fret 3 (Dsus4) pada hitungan '4' dan angkat lagi pada '&'.",
          "2. Pada akor C: Genjreng C biasa, lalu ketuk (Hammer-on) jari tengah pada senar 4 fret 2 di sela genjrengan.",
          "3. Pada akor A / Am: Gunakan kelingking/jari manis di senar 2 fret 3 (Asus4) sesaat sebelum pindah akor.",
        ],
        practiceSteps: [
          "Mainkan akor D selama 1 bar penuh dengan tempo 70 BPM.",
          "Tepat pada hitungan ke-4, tambahkan jari kelingking ke Dsus4 lalu lepaskan kembali ke D.",
          "Ulangi pola yang sama pada pasangan C -> Cadd9 -> C dan G -> Gsus4 -> G.",
        ],
        demoChords: ["D", "Dsus4", "C", "Cadd9", "A", "Asus4"],
      },
      {
        id: "gtr-skill-2",
        skillNumber: 2,
        badge: "SKILL TRANSISI #2",
        title: "Walking Bass Line Gitar (Jembatan G -> D/F# -> Em7)",
        subtitle:
          "Membuat gitar akustik terdengar seperti dimainkan oleh dua orang (gitar + bass berjalan).",
        targetBpm: 68,
        timeSignature: "4/4",
        whenToUse:
          "Sangat efektif dipakai saat transisi dari Reff kembali ke Bait atau saat mengiringi lagu hanya dengan 1 gitar akustik.",
        visualPatternTitle: "Urutan Petikan Bass Penghubung di Senar 6 & 5",
        visualPatternLines: [
          "G menuju Em: Petik senar 6 fret 3 (G) -> petik senar 6 fret 2 (D/F#) pada hitungan ke-4 -> masuk ke senar 6 terbuka (Em) pada hitungan 1 bar berikutnya.",
          "C menuju Am: Petik senar 5 fret 3 (C) -> petik senar 5 fret 2 (G/B) pada hitungan ke-4 -> masuk ke senar 5 terbuka (Am).",
        ],
        practiceSteps: [
          "Latih perpindahan G -> D/F# -> Em7 dengan memetik senar 6 terlebih dahulu di setiap ketukan 1.",
          "Latih perpindahan C -> G/B -> Am7 dengan memetik senar 5 terlebih dahulu.",
          "Gabungkan menjadi progresi utuh: G - D/F# - Em7 - Cadd9 - G/B - Am7 - Dsus4 - D.",
        ],
        demoChords: ["G", "D/F#", "Em7", "C", "G/B", "Am7"],
      },
      {
        id: "gtr-skill-3",
        skillNumber: 3,
        badge: "SKILL DINAMIKA #3",
        title: "Petikan Arpeggio 4-Jari untuk Intro & Saat Doa (Altar Call)",
        subtitle:
          "Mengubah genjrengan menjadi petikan harpa yang teduh ketika pemimpin pujian mulai berdoa.",
        targetBpm: 64,
        timeSignature: "4/4",
        whenToUse:
          "Begitu lagu memasuki momen teduh, doa syafaat, atau Bait 1 yang hanya diiringi gitar dan vokal.",
        visualPatternTitle: "Rumus Petikan P - i - m - a - m - i (Jempol-Telunjuk-Tengah-Manis)",
        visualPatternLines: [
          "Hitungan 1   : Jempol (P) memetik senar Bass utama (Senar 6/5/4 sesuai akor)",
          "Hitungan 1&  : Telunjuk (i) memetik senar 3",
          "Hitungan 2   : Jari Tengah (m) memetik senar 2",
          "Hitungan 2&  : Jari Manis (a) memetik senar 1",
          "Hitungan 3-4 : Kembali turun memetik senar 2 (m) -> senar 3 (i) -> senar 2 (m)",
        ],
        practiceSteps: [
          "Posisikan jempol di senar atas, telunjuk di senar 3, jari tengah di senar 2, dan jari manis di senar 1.",
          "Mainkan progresi Cmaj7 - Am7 - Fmaj7 - Gsus4 tanpa mengangkat pergelangan tangan kanan.",
          "Pastikan semua senar tetap berbunyi panjang (let ring) hingga bar selesai.",
        ],
        demoChords: ["Cmaj7", "Am7", "Fmaj7", "Gsus4"],
      },
      {
        id: "gtr-skill-4",
        skillNumber: 4,
        badge: "SKILL PANGGUNG #4",
        title: "Rumus Cepat Capo & Transposisi Tanpa Pusing",
        subtitle:
          "Tetap bermain menggunakan bentuk chord G atau C yang mudah meskipun penyanyi meminta nada dasar A, Bb, atau Eb.",
        targetBpm: 72,
        timeSignature: "4/4",
        whenToUse:
          "Ketika penyanyi wanita/pria meminta naik nada dasar ke kunci yang penuh akor palang (seperti Bb, Eb, Ab, atau B).",
        visualPatternTitle: "Tabel Cepat Posisi Capo Gitar Gereja",
        visualPatternLines: [
          "Lagu Nada Dasar A  -> Pasang Capo di Fret 2, mainkan bentuk chord G (G-D-Em-C)!",
          "Lagu Nada Dasar Bb -> Pasang Capo di Fret 3, mainkan bentuk chord G (G-D-Em-C)!",
          "Lagu Nada Dasar Eb -> Pasang Capo di Fret 3, mainkan bentuk chord C (C-G-Am-F)!",
          "Lagu Nada Dasar E  -> Pasang Capo di Fret 4, mainkan bentuk chord C (C-G-Am-F)!",
          "Lagu Nada Dasar F  -> Pasang Capo di Fret 5, mainkan bentuk chord C (C-G-Am-F)!",
        ],
        practiceSteps: [
          "Hafalkan 2 keluarga bentuk chord paling terbuka: Keluarga G (G-D-Em-C) dan Keluarga C (C-G-Am-F).",
          "Setiap naik 1 fret Capo = nada dasar naik setengah nada (1 semitone).",
          "Cobalah memainkan bentuk G-D/F#-Em7-Cadd9 sambil membayangkan Capo terpasang di fret 2 (menghasilkan bunyi A-E/G#-F#m7-Dadd9).",
        ],
        demoChords: ["G", "D/F#", "Em7", "Cadd9"],
      },
      {
        id: "gtr-skill-5",
        skillNumber: 5,
        badge: "SKILL ENDING #5",
        title: "Ending Retardando & Harmoni Penutup Lagu (Turnaround)",
        subtitle:
          "Cara mengakhiri lagu dengan rapi, melambat bersama tim, dan menutup dengan akor maj7/add9 yang elegan.",
        targetBpm: 62,
        timeSignature: "4/4",
        whenToUse:
          "Pada 2 bar terakhir lagu ketika Worship Leader memberi aba-aba melambat (Retardando) untuk menutup pujian.",
        visualPatternTitle: "Rumus Penutup 2 Bar Terakhir (di Kunci C & Kunci G)",
        visualPatternLines: [
          "Di Kunci C: Mainkan Dm7 (2 ketuk) -> Fm (2 ketuk, melambat) -> sapu perlahan Cmaj7 dari senar 5 ke senar 1.",
          "Di Kunci G: Mainkan Am7 (2 ketuk) -> Cm (2 ketuk, melambat) -> sapu perlahan Gadd9/Gmaj7 dari senar 6 ke senar 1.",
        ],
        practiceSteps: [
          "Dengarkan perubahan suasana dari akor IV biasa (F) ke IV minor (Fm) sebelum jatuh ke C.",
          "Pada akor terakhir, jangan digenjreng cepat; sapukan ibu jari dari senar atas ke bawah secara perlahan (arpeggio sweep).",
        ],
        demoChords: ["Dm7", "Fm", "Cmaj7", "Am7", "Cm", "Gmaj7"],
      },
    ],
  },

  bass: {
    instrumentId: "bass",
    dictionaryTitle: "Kamus Posisi Fretboard Bass, Slash Bass & Pola Groove Inti",
    dictionarySubtitle:
      "Khusus Bass 4-Senar (E–A–D–G): Peta titik nada Root, Oktaf, 5th, serta posisi wajib saat membaca Slash Chord dan pola groove gereja.",
    chordCategories: [
      {
        id: "bass-core",
        title: "1. Posisi Nada Root & Oktaf Inti (Senar E & Senar A)",
        subtitle:
          "Peta titik nada fondasi pada bass 4-senar. Titik pertama adalah Root (nada dasar), titik kedua adalah Oktaf/5th.",
        playingTip:
          "Sebagai pemain bass, fokus pertama Anda adalah titik Root di senar 4 (E) atau senar 3 (A) tepat bersamaan dengan injakan Kick Drum pada ketukan ke-1.",
        chords: [
          { symbol: "C", usageNote: "Root C berada di Senar 3 (A) Fret 3. Oktafnya di Senar 1 (G) Fret 5." },
          { symbol: "D", usageNote: "Root D berada di Senar 3 (A) Fret 5 (atau Senar 2 terbuka)." },
          { symbol: "E", usageNote: "Root E paling rendah di Senar 4 (E) Terbuka (Fret 0) atau Senar 3 Fret 7." },
          { symbol: "F", usageNote: "Root F berada di Senar 4 (E) Fret 1. Sangat mantap dan rendah." },
          { symbol: "G", usageNote: "Root G berada di Senar 4 (E) Fret 3. Posisi kunci untuk lagu kunci G & C." },
          { symbol: "A", usageNote: "Root A di Senar 4 (E) Fret 5 atau Senar 3 (A) Terbuka (Fret 0)." },
          { symbol: "B", usageNote: "Root B di Senar 3 (A) Fret 2 atau Senar 4 (E) Fret 7." },
          { symbol: "Am", usageNote: "Untuk akor minor, nada Root Bass tetap A (Senar 3 Fret 0 / Senar 4 Fret 5)." },
          { symbol: "Dm", usageNote: "Root D di Senar 3 (A) Fret 5; gunakan minor 3rd (F) saat membuat fill-in." },
          { symbol: "Em", usageNote: "Root E di Senar 4 (E) Fret 0; nada paling dalam pada bass 4-senar." },
          { symbol: "F#m", usageNote: "Root F# di Senar 4 (E) Fret 2; wajib dihafal untuk lagu di kunci D & A." },
          { symbol: "Bm", usageNote: "Root Bm di Senar 3 (A) Fret 2; pasangan utama di kunci D dan G." },
        ],
      },
      {
        id: "bass-slash",
        title: "2. Kamus Slash Chord Khusus Pemain Bass (Wajib!)",
        subtitle:
          "Saat melihat akor garis miring (mis. G/B atau D/F#), tugas pemain bass adalah memainkan huruf DI SEBELAH KANAN garis miring!",
        playingTip:
          "Jangan pernah memainkan nada G saat tertulis G/B! Gitaris/Pianis sudah memainkan akor G, dan tugas mutlak Anda adalah menekan nada B sebagai pijakan bass.",
        chords: [
          { symbol: "G/B", usageNote: "MAINKAN NADA B (Senar 3 Fret 2), bukan G! Jembatan dari C ke Am." },
          { symbol: "D/F#", usageNote: "MAINKAN NADA F# (Senar 4 Fret 2), bukan D! Jembatan dari G ke Em." },
          { symbol: "C/E", usageNote: "MAINKAN NADA E (Senar 4 Fret 0 atau Senar 2 Fret 2), bukan C!" },
          { symbol: "F/A", usageNote: "MAINKAN NADA A (Senar 3 Fret 0 atau Senar 4 Fret 5), bukan F!" },
          { symbol: "A/C#", usageNote: "MAINKAN NADA C# (Senar 3 Fret 4), jembatan dari D menuju Bm." },
          { symbol: "E/G#", usageNote: "MAINKAN NADA G# (Senar 4 Fret 4), jembatan dari A menuju F#m." },
          { symbol: "Am/G", usageNote: "MAINKAN NADA G (Senar 4 Fret 3) sebagai jembatan turun dari Am ke F." },
          { symbol: "C/G", usageNote: "MAINKAN NADA G (Senar 4 Fret 3) untuk menahan ketegangan sebelum ke G." },
          { symbol: "Bb/D", usageNote: "MAINKAN NADA D (Senar 3 Fret 5) saat lagu berada di kunci F." },
          { symbol: "G/D", usageNote: "MAINKAN NADA D (Senar 3 Fret 5) sebagai pedal bass di bagian Intro." },
        ],
      },
      {
        id: "bass-shapes",
        title: "3. Bentuk Segitiga Root–5th–Octave & 7th pada Bass",
        subtitle:
          "Pola bentuk jari (shapes) yang bentuknya selalu sama di fret mana pun Anda menggeser tangan kiri.",
        playingTip:
          "Dari nada Root mana pun di senar 4 atau 3: turun 1 senar + geser kanan 2 fret = nada 5th (Dominan). Turun 2 senar + geser kanan 2 fret = nada Oktaf!",
        chords: [
          { symbol: "Cmaj7", usageNote: "Root C (Senar 3 Fret 3) + 5th G (Senar 2 Fret 5) untuk groove lembut." },
          { symbol: "Fmaj7", usageNote: "Root F (Senar 4 Fret 1) + 5th C (Senar 3 Fret 3) + Oktaf F (Senar 2 Fret 3)." },
          { symbol: "G7", usageNote: "Root G (Senar 4 Fret 3) + nada 7th F (Senar 2 Fret 3) untuk transisi ke C." },
          { symbol: "Am7", usageNote: "Root A (Senar 4 Fret 5) + Oktaf A (Senar 2 Fret 7) untuk fill-in." },
          { symbol: "Dm7", usageNote: "Root D (Senar 3 Fret 5) + 5th A (Senar 2 Fret 7)." },
          { symbol: "Em7", usageNote: "Root E (Senar 4 Fret 0) + Oktaf E (Senar 2 Fret 2)." },
        ],
      },
    ],
    rhythmPatterns: [
      {
        id: "bass-rhythm-1",
        name: "Worship Sustain Diamond (Bait Teduh)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 68,
        patternVisual: "ROOT (Tahan)  -   -   -   |  ROOT (3)  -   -   -",
        countGuide: "1     &       2   &   3   &   4   &",
        usage: "Dipakai saat Bait 1 atau masuk Bait 2 agar suara bass menjadi bantalan hangat di bawah piano.",
        techniqueTip:
          "Petik lembut dengan telunjuk di dekat leher bass (neck pickup) agar suaranya bulat, lalu tahan nada hingga bar selesai.",
        sampleChords: ["C", "G/B", "Am", "F"],
      },
      {
        id: "bass-rhythm-2",
        name: "8th-Note Worship Pulse (Build-Up Bridge)",
        category: "Build-Up & Fill",
        timeSignature: "4/4",
        bpm: 74,
        patternVisual: "R   r   R   r   R   r   R   r",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Wajib dipakai saat lagu mulai naik di bagian Bridge atau menuju Reff puncak.",
        techniqueTip:
          "Gunakan petikan bergantian Telunjuk-Tengah (i-m-i-m) secara konsisten 8 kali per bar. Beri aksen sedikit lebih kuat pada hitungan 1 dan 3.",
        sampleChords: ["F", "G", "Am", "C/E"],
      },
      {
        id: "bass-rhythm-3",
        name: "Pop-Worship Dotted Groove (1 - &2 - 3)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 80,
        patternVisual: "Root  -   -   Root  5th   -   Root  -",
        countGuide: "1     &   2   &     3     &   4     &",
        usage: "Groove paling populer untuk bagian Reff lagu Worship karena mengunci langsung dengan Kick Drum.",
        techniqueTip:
          "Dengarkan pukulan Kick Drum atau Bass Cajon: mainkan Root pada ketukan 1, petik lagi pada hitungan '&' setelah 2, lalu jatuh di ketukan 3.",
        sampleChords: ["G", "D/F#", "Em", "C"],
      },
      {
        id: "bass-rhythm-4",
        name: "Praise Octave Bounce (Cepat & Menari)",
        category: "Praise",
        timeSignature: "4/4",
        bpm: 118,
        patternVisual: "Root  Oct  -   Root  Oct  -   5th  Oct",
        countGuide: "1     &    2   &     3    &   4    &",
        usage: "Untuk lagu Praise cepat seperti 'Bersuka Dalam Tuhan' dan 'Kebaikan Tuhan'.",
        techniqueTip:
          "Telunjuk tangan kiri menahan Root (mis. C di senar 3 fret 3) sementara kelingking memantul di nada Oktaf (senar 1 fret 5).",
        sampleChords: ["C", "F", "Am", "G"],
      },
      {
        id: "bass-rhythm-5",
        name: "Waltz Hymn 3/4 (Root - 5th - Passing)",
        category: "Hymn & 3/4",
        timeSignature: "3/4",
        bpm: 84,
        patternVisual: "Root   -   5th   -   Jembatan",
        countGuide: "1      &   2     &   3      &",
        usage: "Untuk lagu Hymn 3/4 seperti 'Amazing Grace' atau 'How Great Thou Art'.",
        techniqueTip:
          "Ketukan 1 tegas di Root, ketukan 2 ringan di nada 5th, dan ketukan 3 mengambil nada jembatan menuju akor bar berikutnya.",
        sampleChords: ["G", "G/B", "C", "D"],
      },
    ],
    bonusSkills: [
      {
        id: "bass-skill-1",
        skillNumber: 1,
        badge: "SKILL FILL-IN #1",
        title: "Fill-In Segitiga Box (Root – 5th – Octave) di Hitungan ke-4",
        subtitle:
          "Rumus fill-in paling aman dan profesional untuk mengisi ujung bar sebelum berganti akor.",
        targetBpm: 76,
        timeSignature: "4/4",
        whenToUse:
          "Gunakan di bar ke-4 atau bar ke-8 (akhir kalimat vokal) untuk mengantar masuk ke bagian Reff.",
        visualPatternTitle: "Rumus Posisi Jari (Contoh di Akor C - Senar 3 Fret 3)",
        visualPatternLines: [
          "Ketukan 1 - 2 - 3 : Tahan atau petik nada Root C (Senar 3 Fret 3) dengan telunjuk.",
          "Ketukan 4         : Petik nada 5th G (Senar 2 Fret 5) dengan jari manis.",
          "Ketukan 4&        : Petik nada Oktaf C tinggi (Senar 1 Fret 5) dengan kelingking, lalu mendarat di akor baru pada ketukan 1!",
        ],
        practiceSteps: [
          "Tempatkan telunjuk di C (Senar 3 Fret 3), jari manis di G (Senar 2 Fret 5), dan kelingking di C oktaf (Senar 1 Fret 5).",
          "Mainkan: C (1-2-3) -> G (4) -> C tinggi (4&) -> pindah ke F (Senar 4 Fret 1).",
          "Bentuk segitiga ini bisa digeser ke fret mana saja dengan posisi jari yang persis sama!",
        ],
        demoBassMidiNotes: [
          { label: "Root C (Fret 3)", midi: 36 },
          { label: "5th G (Fret 5)", midi: 43 },
          { label: "Oktaf C (Fret 5)", midi: 48 },
          { label: "Target F (Fret 1)", midi: 29 },
        ],
      },
      {
        id: "bass-skill-2",
        skillNumber: 2,
        badge: "SKILL TRANSISI #2",
        title: "Chromatic & Diatonic Walk-Up (Tangga Jembatan Bass)",
        subtitle:
          "Merangkai 3 nada bertangga untuk mengantar perpindahan akor dengan mulus seperti bassist rekaman.",
        targetBpm: 72,
        timeSignature: "4/4",
        whenToUse:
          "Saat berpindah dari akor I ke IV (mis. C ke F) atau dari akor IV ke V (mis. F ke G).",
        visualPatternTitle: "2 Jalur Tangga Bass Paling Sering Dipakai di Gereja",
        visualPatternLines: [
          "Jalur Naik C menuju F: Mainkan C (Senar 3 Fret 3) -> D (Fret 5) -> E (Senar 2 Fret 2) -> mendarat di F (Senar 2 Fret 3).",
          "Jalur Turun C menuju Am: Mainkan C (Senar 3 Fret 3) -> B (Senar 3 Fret 2) -> mendarat di A (Senar 3 Fret 0).",
          "Jalur Kromatis F menuju G: Mainkan F (Senar 4 Fret 1) -> F# (Senar 4 Fret 2) pada hitungan 4& -> mendarat di G (Senar 4 Fret 3).",
        ],
        practiceSteps: [
          "Pastikan nada jembatan dimainkan HANYA pada ketukan ke-4 (atau 3 dan 4), jangan mengubah nada ketukan 1.",
          "Klik tombol simulasi nada di bawah untuk mendengar alur naik C -> D -> E -> F.",
        ],
        demoBassMidiNotes: [
          { label: "1: C (Fret 3)", midi: 36 },
          { label: "3: D (Fret 5)", midi: 38 },
          { label: "4: E (Senar 2 Fret 2)", midi: 40 },
          { label: "1: Target F (Fret 3)", midi: 41 },
        ],
      },
      {
        id: "bass-skill-3",
        skillNumber: 3,
        badge: "SKILL WORSHIP #3",
        title: "Interval 10th (Sweet Chord Bass) untuk Intro & Doa",
        subtitle:
          "Memetik dua senar sekaligus (Root + Nada ke-3 tinggi) yang menghasilkan bunyi hangat seperti gitar cello.",
        targetBpm: 64,
        timeSignature: "4/4",
        whenToUse:
          "Saat momen teduh, pembacaan firman, atau akhir lagu ketika instrumen lain bermain sangat pelan.",
        visualPatternTitle: "Posisi Interval 10th di Senar 4 (E) dan Senar 1 (G)",
        visualPatternLines: [
          "Akor G (Mayor) : Senar 4 Fret 3 (G) + Senar 1 Fret 4 (B) dipetik bersamaan.",
          "Akor Am (Minor): Senar 4 Fret 5 (A) + Senar 1 Fret 5 (C) dipetik bersamaan.",
          "Akor F (Mayor) : Senar 4 Fret 1 (F) + Senar 1 Fret 2 (A) atau naik 1 oktaf di Fret 13 & 14.",
        ],
        practiceSteps: [
          "Gunakan jempol untuk memetik senar 4 (E) dan jari tengah untuk memetik senar 1 (G).",
          "Biarkan senar 3 dan senar 2 di tengah tidak ikut terpetik.",
        ],
        demoChords: ["G", "Am", "F", "C"],
      },
      {
        id: "bass-skill-4",
        skillNumber: 4,
        badge: "SKILL GROOVE #4",
        title: "Teknik Slide Masuk (Grace-Note Slide) & Ghost Note",
        subtitle:
          "Memberi nyawa dan ayunan profesional pada garis bass agar tidak terdengar kaku seperti robot.",
        targetBpm: 88,
        timeSignature: "4/4",
        whenToUse:
          "Saat masuk ketukan ke-1 di bagian Reff atau saat memainkan lagu Praise bertempo sedang-cepat.",
        visualPatternTitle: "Cara Melakukan Slide 2-Fret & Ghost Note Perkusi",
        visualPatternLines: [
          "Slide Masuk : Petik 2 fret di bawah nada tujuan (mis. Fret 3 senar A) lalu langsung seret jari tanpa diangkat ke Fret 5 (nada D) tepat pada ketukan 1.",
          "Ghost Note  : Tempelkan jari tangan kiri di atas senar tanpa ditekan sampai menyentuh besi fret, lalu petik dengan tangan kanan untuk menghasilkan bunyi perkusi 'duk' sebelum nada utama.",
        ],
        practiceSteps: [
          "Latih seretan jari (slide) dari Fret 1 ke Fret 3 di senar A (menuju nada C) tanpa suara terputus.",
          "Pastikan jari tiba di fret tujuan tepat bersamaan dengan bunyi klik metronome.",
        ],
        demoBassMidiNotes: [
          { label: "Awal Slide (Bb Fret 1)", midi: 34 },
          { label: "Target Slide C (Fret 3)", midi: 36 },
          { label: "Slide ke D (Fret 5)", midi: 38 },
          { label: "Slide ke G (Senar 2 Fret 5)", midi: 43 },
        ],
      },
      {
        id: "bass-skill-5",
        skillNumber: 5,
        badge: "SKILL TELINGA #5",
        title: "Cara Cepat Menebak Nada Dasar Lagu (Ear Training Bass)",
        subtitle:
          "Menemukan kunci lagu dalam waktu 5 detik ketika pemimpin pujian tiba-tiba menyanyikan lagu spontan.",
        targetBpm: 70,
        timeSignature: "4/4",
        whenToUse:
          "Saat Worship Leader menyanyikan lagu baru di luar daftar latihan (spontanitas) saat ibadah berlangsung.",
        visualPatternTitle: "3 Langkah Menemukan Nada Dasar tanpa Menabrak Fals",
        visualPatternLines: [
          "1. Kecilkan volume bass Anda sedikit, lalu dengarkan nada penutup kalimat penyanyi (biasanya itu adalah akor I / Nada Dasar).",
          "2. Uji dengan menyentuh pelan senar 3 (A) dari Fret 3 (C) -> Fret 5 (D) -> Fret 7 (E) atau senar 4 Fret 3 (G).",
          "3. Begitu ketemu 1 nada yang pas sebagai 'rumah' (misalnya G di Senar 4 Fret 3), maka akor IV pasti tepat 1 senar di bawahnya (C di Senar 3 Fret 3) dan akor V pasti 2 fret di kanannya (D di Senar 3 Fret 5)!",
        ],
        practiceSteps: [
          "Hafalkan 'Peta Tetangga L': Jika nada dasar (I) ada di Senar 4 Fret 3 (G), maka akor IV (C) persis di bawahnya (Senar 3 Fret 3), dan akor V (D) ada di Senar 3 Fret 5.",
          "Hafalkan letak akor minor VI (Em): selalu 3 fret di kiri nada dasar Mayor (atau di Senar 3 Fret 7).",
        ],
        demoBassMidiNotes: [
          { label: "I: Nada Dasar G", midi: 31 },
          { label: "IV: Tepat di bawahnya (C)", midi: 36 },
          { label: "V: Geser 2 fret kanan (D)", midi: 38 },
          { label: "VI: Minor relatif (E)", midi: 40 },
        ],
      },
    ],
  },

  piano: {
    instrumentId: "piano",
    dictionaryTitle: "Kamus Chord Piano/Keyboard, Slash Chord & Pola Iringan Inti",
    dictionarySubtitle:
      "Khusus Piano & Keyboard: Diagram tuts akor dasar, inversi, voicing worship modern (Sus4/Add9/Maj7), slash chord dua tangan, serta pola iringan kiri-kanan.",
    chordCategories: [
      {
        id: "piano-core",
        title: "1. Chord Inti Mayor & Minor Piano (Triad Dasar)",
        subtitle:
          "15 akor utama yang wajib dikuasai tangan kanan (1–3–5) bersama bas oktaf di tangan kiri.",
        playingTip:
          "Gunakan Jempol (1), Jari Tengah (3), dan Kelingking (5) pada tangan kanan. Tangan kiri cukup menekan 1 nada dasar (atau oktaf 1–8) di sisi kiri keyboard.",
        chords: [
          { symbol: "C", usageNote: "C – E – G (Semua tuts putih; titik awal belajar keyboard)." },
          { symbol: "D", usageNote: "D – F# – A (Jari tengah naik ke tuts hitam F#)." },
          { symbol: "E", usageNote: "E – G# – B (Jari tengah naik ke tuts hitam G#)." },
          { symbol: "F", usageNote: "F – A – C (Semua tuts putih; akor IV dari kunci C)." },
          { symbol: "G", usageNote: "G – B – D (Semua tuts putih; akor V dari kunci C)." },
          { symbol: "A", usageNote: "A – C# – E (Jari tengah naik ke tuts hitam C#)." },
          { symbol: "B", usageNote: "B – D# – F# (Jempol di tuts putih B, jari 3 & 5 di tuts hitam)." },
          { symbol: "Am", usageNote: "A – C – E (Semua tuts putih; akor minor VI dari C)." },
          { symbol: "Dm", usageNote: "D – F – A (Semua tuts putih; akor minor II dari C)." },
          { symbol: "Em", usageNote: "E – G – B (Semua tuts putih; akor minor III dari C)." },
          { symbol: "F#m", usageNote: "F# – A – C# (Tuts hitam di pinggir, tuts putih A di tengah)." },
          { symbol: "Bm", usageNote: "B – D – F# (Jempol & tengah di putih, kelingking di hitam F#)." },
          { symbol: "Cm", usageNote: "C – Eb – G (Jari tengah di tuts hitam Eb; jembatan sendu ke C)." },
          { symbol: "Fm", usageNote: "F – Ab – C (Jari tengah di tuts hitam Ab; minor IV di kunci C)." },
          { symbol: "Gm", usageNote: "G – Bb – D (Jari tengah di tuts hitam Bb; kunci F & Bb)." },
        ],
      },
      {
        id: "piano-slash",
        title: "2. Slash Chord Piano (Rumus Tangan Kanan vs Tangan Kiri)",
        subtitle:
          "Rahasia permainan piano gereja yang halus: Tangan Kanan memainkan huruf KIRI, Tangan Kiri menekan nada bass huruf KANAN!",
        playingTip:
          "Saat membaca C/E: Tangan kanan Anda tetap menekan akor C (atau G–C–E), sedangkan Tangan Kiri menekan tuts E di oktaf bawah. Jangan menekan C di tangan kiri!",
        chords: [
          { symbol: "G/B", usageNote: "Kiri: Bass B | Kanan: Chord G (G–B–D). Jembatan mulus C menuju Am." },
          { symbol: "D/F#", usageNote: "Kiri: Bass F# (tuts hitam) | Kanan: Chord D (D–A–D / D–F#–A)." },
          { symbol: "C/E", usageNote: "Kiri: Bass E | Kanan: Chord C (G–C–E). Pengantar manis menuju F." },
          { symbol: "F/A", usageNote: "Kiri: Bass A | Kanan: Chord F (F–A–C). Suara langsung terasa terangkat." },
          { symbol: "A/C#", usageNote: "Kiri: Bass C# (tuts hitam) | Kanan: Chord A. Jembatan D menuju Bm." },
          { symbol: "E/G#", usageNote: "Kiri: Bass G# (tuts hitam) | Kanan: Chord E. Jembatan A menuju F#m." },
          { symbol: "Am/G", usageNote: "Kiri: Bass G | Kanan: Chord Am (A–C–E). Turunan bass menuju F." },
          { symbol: "C/G", usageNote: "Kiri: Bass G | Kanan: Chord C. Sangat megah dipakai sebelum jatuh ke G." },
          { symbol: "F/G", usageNote: "Kiri: Bass G | Kanan: Chord F (F–A–C). Voicing G9sus4 khas Gospel!" },
          { symbol: "G/A", usageNote: "Kiri: Bass A | Kanan: Chord G (G–B–D). Voicing A9sus4 di kunci D!" },
        ],
      },
      {
        id: "piano-worship",
        title: "3. Voicing Worship Modern (Add9, Sus4 & Maj7)",
        subtitle:
          "Akor dengan tambahan nada ke-2 (add9), ke-4 (sus4), dan ke-7 (maj7) agar bunyi piano tidak terdengar kaku seperti lagu anak-anak.",
        playingTip:
          "Biasakan menambahkan jari telunjuk pada nada ke-2 dari akor mayor (misalnya menekan C–D–E–G pada akor Cadd9) untuk mendapatkan karakter piano worship modern.",
        chords: [
          { symbol: "Cadd9", usageNote: "C – D – E – G (Tambahkan tuts D di tengah akor C untuk suara bening)." },
          { symbol: "Dsus4", usageNote: "D – G – A (Tahan tuts G sebelum turun ke F# pada akor D)." },
          { symbol: "Gsus4", usageNote: "G – C – D (Tahan tuts C sebelum turun ke B pada akor G)." },
          { symbol: "Asus4", usageNote: "A – D – E (Sangat indah untuk intro dan penutup di kunci A/D)." },
          { symbol: "Esus4", usageNote: "E – A – B (Penahan megah sebelum kembali ke E mayor)." },
          { symbol: "Cmaj7", usageNote: "C – E – G – B (Nuansa teduh dan hangat untuk saat teduh/doa)." },
          { symbol: "Fmaj7", usageNote: "F – A – C – E (Akor IV paling indah di lagu Worship kunci C)." },
          { symbol: "Gmaj7", usageNote: "G – B – D – F# (Akor I lembut untuk pembuka lagu di kunci G)." },
          { symbol: "Am7", usageNote: "A – C – E – G (Tangan kiri di A, tangan kanan cukup menekan akor C!)." },
          { symbol: "Dm7", usageNote: "D – F – A – C (Tangan kiri di D, tangan kanan cukup menekan akor F!)." },
          { symbol: "Em7", usageNote: "E – G – B – D (Tangan kiri di E, tangan kanan cukup menekan akor G!)." },
          { symbol: "Bm7", usageNote: "B – D – F# – A (Tangan kiri di B, tangan kanan cukup menekan akor D!)." },
        ],
      },
    ],
    rhythmPatterns: [
      {
        id: "pno-rhythm-1",
        name: "Pop Ballad Quarter-Pulse (Denyut 4 Ketuk Stabil)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 70,
        patternVisual: "Kanan: [Chord]  [Chord]  [Chord]  [Chord]\nKiri : [Bass ]  -        -        [Bass ]",
        countGuide: "1       2        3        4",
        usage: "Fondasi utama iringan piano di Bait dan Reff lagu Worship.",
        techniqueTip:
          "Tangan kanan mengayun menekan akor penuh di setiap ketukan 1-2-3-4, sedangkan tangan kiri menahan oktaf bass di ketukan 1 dan memberi sedikit dorongan lagi di ketukan 4& sebelum ganti bar.",
        sampleChords: ["C", "G/B", "Am7", "Fmaj7"],
      },
      {
        id: "pno-rhythm-2",
        name: "Arpeggio 1–5–8–10 Mengalir (Saat Doa & Bait 1)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 66,
        patternVisual: "Kiri: 1  -  5  -  8  -  5  - | Kanan: 1  -  2  -  3  -  5  -",
        countGuide: "1  &  2  &  3  &  4  &",
        usage: "Digunakan saat suasana teduh, intro lagu, atau mengiringi doa syafaat.",
        techniqueTip:
          "Tangan kiri mengurai Root (kelingking) -> 5th (telunjuk) -> Oktaf (jempol) secara berurutan, lalu disambung jari tangan kanan yang memetik nada 1-2-3-5 satu per satu.",
        sampleChords: ["Cmaj7", "Am7", "Dm7", "Gsus4"],
      },
      {
        id: "pno-rhythm-3",
        name: "Syncopated Gospel/Pop Comping (Reff Hidup)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 84,
        patternVisual: "Kanan: [Chord]  -   -   [Chord]  -   [Chord]  [Chord]  -\nKiri : [Bass ]  -   -   [Bass ]  -   -        [Bass ]  -",
        countGuide: "1       &   2   &        3   &        4        &",
        usage: "Membuat bagian Reff terdengar hidup karena aksen jatuh pada hitungan '&' setelah ketukan 2.",
        techniqueTip:
          "Rasakan aksen 'Satu - dua-DAN - tiga-DAN - Empat'. Jangan menekan semua ketukan dengan kekuatan yang sama.",
        sampleChords: ["G", "D/F#", "Em7", "Cadd9"],
      },
      {
        id: "pno-rhythm-4",
        name: "Praise Alternating Bounce (Kanan–Kiri Bergantian)",
        category: "Praise",
        timeSignature: "4/4",
        bpm: 118,
        patternVisual: "Kanan: [Chd]  -     [Chd]  -     [Chd]  -     [Chd]  -\nKiri : -      [Bas] -      [Bas] -      [Bas] -      [Bas]",
        countGuide: "1      &     2      &     3      &     4      &",
        usage: "Untuk lagu Praise cepat seperti 'Hari Ini Kurasa Bahagia' atau 'Kebaikan Tuhan'.",
        techniqueTip:
          "Jangan menahan pedal sustain terlalu lama! Mainkan pendek dan tegas (staccato ringan): Tangan kanan di angka (1, 2, 3, 4), ibu jari tangan kiri memantul di sela '&'.",
        sampleChords: ["C", "F", "Am", "G"],
      },
      {
        id: "pno-rhythm-5",
        name: "Waltz Hymn 3/4 (Bass – Chord – Chord)",
        category: "Hymn & 3/4",
        timeSignature: "3/4",
        bpm: 84,
        patternVisual: "Kanan: -       [Chord]  [Chord]\nKiri : [Bass]  -        -",
        countGuide: "1       2        3",
        usage: "Untuk lagu Hymn 3/4 seperti 'Amazing Grace' atau 'Kudus, Kudus, Kuduslah'.",
        techniqueTip:
          "Ketukan 1 dimainkan oleh bas oktaf tangan kiri yang dalam ('Tung'), disusul ketukan 2 dan 3 oleh akor tangan kanan ('Ting - Ting').",
        sampleChords: ["F", "Bb", "F", "C"],
      },
    ],
    bonusSkills: [
      {
        id: "pno-skill-1",
        skillNumber: 1,
        badge: "SKILL FILL-IN #1",
        title: "Grace-Note Slip (Meluncur dari Nada ke-2 ke Nada ke-3)",
        subtitle:
          "Sentuhan khas pianis gereja profesional yang membuat akor terdengar bernyanyi hanya dengan 1 jari.",
        targetBpm: 68,
        timeSignature: "4/4",
        whenToUse:
          "Setiap kali Anda mendarat di akor Mayor pada ketukan ke-1 di bagian Intro, Bait, maupun akhir kalimat.",
        visualPatternTitle: "Cara Melakukan Slip Jari (Contoh di Akor C dan Akor F)",
        visualPatternLines: [
          "Pada Akor C : Tekan tuts C, D, dan G bersamaan, lalu sepersekian detik kemudian gelincirkan jari dari D ke E (sehingga menjadi C–E–G).",
          "Pada Akor F : Tekan tuts F, G, dan C bersamaan, lalu gelincirkan jari dari G ke A (sehingga menjadi F–A–C).",
          "Pada Akor G : Tekan tuts G, A, dan D bersamaan, lalu gelincirkan jari dari A ke B (sehingga menjadi G–B–D).",
        ],
        practiceSteps: [
          "Latih gerakan cepat telunjuk -> jari tengah (D -> E) sambil menahan jempol di C dan kelingking di G.",
          "Dengarkan perbandingan antara Cadd9 dan C biasa menggunakan tombol di bawah.",
        ],
        demoChords: ["Cadd9", "C", "F", "Gsus4", "G"],
      },
      {
        id: "pno-skill-2",
        skillNumber: 2,
        badge: "SKILL FILL-IN #2",
        title: "Fill-In Melodi Oktaf Kanan di Ujung Kalimat (Hitungan 3–4)",
        subtitle:
          "Mengisi jeda kosong ketika penyanyi menarik napas di ujung bar dengan 3 nada melodi manis di oktaf atas.",
        targetBpm: 70,
        timeSignature: "4/4",
        whenToUse:
          "HANYA ketika penyanyi sedang berhenti bernyanyi di hitungan 3 dan 4 (jangan dimainkan saat vokal sedang padat).",
        visualPatternTitle: "Rumus 3 Nada Aman (5 – 2 – 3 atau 5 – 4 – 3) di Oktaf Kanan",
        visualPatternLines: [
          "Saat di Akor C : Setelah menekan akor C di hitungan 1-2, petik tuts G -> D -> E di oktaf atas pada hitungan 3 - 4 - 4&.",
          "Saat di Akor Am: Petik tuts E -> D -> C di oktaf atas sebelum masuk ke akor F.",
          "Saat di Akor F : Petik tuts C -> D -> E sebelum naik ke akor G.",
        ],
        practiceSteps: [
          "Tahan pedal sustain saat menekan akor di hitungan 1 dan 2.",
          "Pada hitungan 3 dan 4, mainkan 3 nada tunggal di oktaf kanan atas dengan lembut seperti lonceng.",
        ],
        demoChords: ["C", "Am7", "Fmaj7", "Gsus4"],
      },
      {
        id: "pno-skill-3",
        skillNumber: 3,
        badge: "SKILL TRANSISI #3",
        title: "Gospel Turnaround Chord (F/G dan G/A Pengganti Akor V)",
        subtitle:
          "Mengubah akor G atau A biasa menjadi akor pengantar Gospel yang langsung mengangkat suasana Reff.",
        targetBpm: 72,
        timeSignature: "4/4",
        whenToUse:
          "Pada 2 ketukan terakhir sebelum masuk ke bagian Reff atau saat mengulang Reff sekali lagi.",
        visualPatternTitle: "Rumus Rahasia: Tangan Kiri di Nada V, Tangan Kanan Menekan Akor IV!",
        visualPatternLines: [
          "Di Kunci C (Pengganti G) : Tangan Kiri menekan Bass G, Tangan Kanan menekan Chord F (F–A–C) atau Dm7 (D–F–A–C) -> menghasilkan F/G (G9sus4)!",
          "Di Kunci G (Pengganti D) : Tangan Kiri menekan Bass D, Tangan Kanan menekan Chord C (C–E–G) -> menghasilkan C/D (D9sus4)!",
          "Di Kunci D (Pengganti A) : Tangan Kiri menekan Bass A, Tangan Kanan menekan Chord G (G–B–D) -> menghasilkan G/A (A9sus4)!",
        ],
        practiceSteps: [
          "Mainkan Dm7 (2 ketuk) -> lalu tahan tangan kanan di F–A–C sambil memindahkan tangan kiri ke Bass G (2 ketuk) -> selesaikan ke C!",
          "Rasakan betapa mewahnya transisi tersebut dibandingkan memainkan akor G biasa.",
        ],
        demoChords: ["Dm7", "Gsus4", "C", "Am7", "Dsus4", "G"],
      },
      {
        id: "pno-skill-4",
        skillNumber: 4,
        badge: "SKILL DOA #4",
        title: "Improvisasi Pentatonik untuk Musik Doa & Altar Call",
        subtitle:
          "Bermain bebas selama 5–10 menit saat sesi doa tanpa pernah takut salah pencet nada.",
        targetBpm: 62,
        timeSignature: "4/4",
        whenToUse:
          "Saat pendeta atau pemimpin pujian memimpin doa penutup, pembacaan Mazmur, atau panggilan mezbah (Altar Call).",
        visualPatternTitle: "5 Nada Anti-Fals (Tangga Nada Pentatonik: 1 – 2 – 3 – 5 – 6)",
        visualPatternLines: [
          "Di Kunci C : Gunakan HANYA 5 tuts putih ini untuk melodi tangan kanan: C – D – E – G – A (Hindari tuts F dan B agar tidak pernah bentrok!).",
          "Di Kunci G : Gunakan HANYA 5 tuts ini: G – A – B – D – E.",
          "Progresi Putaran Doa Paling Aman: Fmaj7 (1 bar) -> G6/Gsus4 (1 bar) -> Em7 (1 bar) -> Am7 (1 bar), diulang terus dengan tenang.",
        ],
        practiceSteps: [
          "Tangan kiri dan tengah menahan putaran Fmaj7 -> G -> Em7 -> Am7 secara lembut.",
          "Tangan kanan sesekali memainkan 2 atau 3 nada dari C–D–E–G–A dengan memberi banyak ruang hening (napas).",
        ],
        demoChords: ["Fmaj7", "Gsus4", "Em7", "Am7"],
      },
      {
        id: "pno-skill-5",
        skillNumber: 5,
        badge: "SKILL SOUND #5",
        title: "Layering Piano + Warm Pad & Disiplin Pedal Sustain",
        subtitle:
          "Mengatur karakter suara keyboard gereja dan waktu injakan kaki agar suara megah namun tidak keruh.",
        targetBpm: 68,
        timeSignature: "4/4",
        whenToUse:
          "Sepanjang ibadah, terutama ketika band tidak memiliki pemain synthesizer/string kedua.",
        visualPatternTitle: "Rumus Kaki: 'Tekan Tuts Dulu -> Baru Angkat-Injak Pedal'",
        visualPatternLines: [
          "1. Setting Volume Layer: Suara Acoustic Grand Piano di 100%, digabung (Dual/Layer) dengan Warm Pad / Soft Strings di volume 25%–35%.",
          "2. Hindari Oktaf Bawah saat Pad Aktif: Jika memakai layer Pad, jangan memainkan akor penuh di bawah tuts Middle C agar suara tidak menggulung keruh.",
          "3. Teknik Pedal: Saat berganti akor, tekan tuts akor baru dulu, baru angkat dan injak kembali pedal kaki dengan cepat agar tidak ada jeda kosong.",
        ],
        practiceSteps: [
          "Latih koordinasi tangan dan kaki pada perpindahan C -> G/B -> Am7 -> Fmaj7.",
          "Pastikan suara akor sebelumnya benar-benar bersih saat akor baru berbunyi.",
        ],
        demoChords: ["C", "G/B", "Am7", "Fmaj7"],
      },
    ],
  },

  cajon: {
    instrumentId: "cajon",
    dictionaryTitle: "Kamus Pola Ketukan Cajon, Groove Gereja & Variasi Irama Inti",
    dictionarySubtitle:
      "Khusus Cajon & Perkusi Akustik: Kumpulan lengkap pola ketukan Bass (B), Snare/Slap (S), Open Tone (T), dan Ghost Note (t) yang siap diputar dan dilatih.",
    chordCategories: [],
    rhythmPatterns: [
      {
        id: "caj-rhythm-1",
        name: "1. Basic Pop-Worship 4/4 (Fondasi Utama)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 72,
        patternVisual: "B   t   S   t   B   B   S   t",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Pola utama untuk 80% lagu Worship dan Pop akustik di gereja.",
        techniqueTip:
          "Bass (B) di tengah-atas papan, Snare (S) di tepi atas papan pada ketukan 2 dan 4, sedangkan Ghost note (t) hanya sentuhan ujung jari yang sangat pelan.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "4", hit: "S", hand: "L" },
          { beatLabel: "&", hit: "t", hand: "R" },
        ],
      },
      {
        id: "caj-rhythm-2",
        name: "2. Minimalist Acoustic Ballad (Bait Teduh)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 66,
        patternVisual: "B   -   T   -   B   -   S   -",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Dipakai saat Bait 1 ketika instrumen masih tipis agar tidak menutupi suara penyanyi.",
        techniqueTip:
          "Ketukan ke-2 menggunakan Open Tone (T) yang hangat, baru ketukan ke-4 menggunakan Snare (S) ringan.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "2", hit: "T", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "4", hit: "S", hand: "L" },
        ],
      },
      {
        id: "caj-rhythm-3",
        name: "3. Syncopated Modern Worship (Groove Reff)",
        category: "Worship",
        timeSignature: "4/4",
        bpm: 78,
        patternVisual: "B   t   S   B   t   B   S   t",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Memberikan dorongan modern pada bagian Reff karena ada Bass di hitungan '2&'.",
        techniqueTip:
          "Kunci keindahannya ada pada pukulan Bass tepat setelah Snare ketukan 2 ('2&'), mengunci sempurna dengan petikan bass gitar.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "L" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "3", hit: "t", hand: "L" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "4", hit: "S", hand: "L" },
          { beatLabel: "&", hit: "t", hand: "R" },
        ],
      },
      {
        id: "caj-rhythm-4",
        name: "4. Praise Up-Tempo Driving Beat (Cepat &Ceria)",
        category: "Praise",
        timeSignature: "4/4",
        bpm: 118,
        patternVisual: "B   t   S   t   B   t   S   t",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Untuk lagu Praise cepat seperti 'Bersuka Dalam Tuhan', 'Hari Ini Kurasa Bahagia', dan 'Kebaikan Tuhan'.",
        techniqueTip:
          "Jaga pergelangan tangan tetap rileks! Jangan memukul dari bahu agar tidak cepat pegal pada tempo 115–125 BPM.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
        ],
      },
      {
        id: "caj-rhythm-5",
        name: "5. Gospel / Country Praise Train Beat",
        category: "Praise",
        timeSignature: "4/4",
        bpm: 112,
        patternVisual: "B   t   S   S   B   t   S   S",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Cocok untuk lagu Praise bergaya Gospel/Country atau medley lagu sukacita.",
        techniqueTip:
          "Ketukan '2&' dan '4&' menggunakan pantulan Snare ringan dari tangan kiri seperti suara kereta api.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
        ],
      },
      {
        id: "caj-rhythm-6",
        name: "6. Waltz Hymn 3/4 (Ayunan Tiga Ketuk)",
        category: "Hymn & 3/4",
        timeSignature: "3/4",
        bpm: 86,
        patternVisual: "B   t   S   t   S   t",
        countGuide: "1   &   2   &   3   &",
        usage: "Wajib untuk lagu Hymn 3/4 seperti 'Amazing Grace' atau 'How Great Thou Art'.",
        techniqueTip:
          "Rasakan ayunan 'Boom - Tek - Tek' (1 - 2 - 3). Snare ketukan ke-2 dibuat lebih lembut daripada ketukan ke-3.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "2", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "S", hand: "R" },
        ],
      },
      {
        id: "caj-rhythm-7",
        name: "7. Slow Worship Anthem 6/8 (Enam Ketuk Megah)",
        category: "Hymn & 3/4",
        timeSignature: "6/8",
        bpm: 56,
        patternVisual: "B   t   t   S   t   B",
        countGuide: "1   2   3   4   5   6",
        usage: "Untuk lagu penyembahan 6/8 yang megah dan mengalir.",
        techniqueTip:
          "Hitungan 1 adalah Bass utama, hitungan 4 adalah Snare tegas, dan hitungan 6 diberi sedikit dorongan Bass untuk mengantar kembali ke hitungan 1.",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "2", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "t", hand: "R" },
          { beatLabel: "4", hit: "S", hand: "L" },
          { beatLabel: "5", hit: "t", hand: "R" },
          { beatLabel: "6", hit: "B", hand: "R" },
        ],
      },
      {
        id: "caj-rhythm-8",
        name: "8. Bridge Build-Up (Tribal Tom/Bass Crescendo)",
        category: "Build-Up & Fill",
        timeSignature: "4/4",
        bpm: 76,
        patternVisual: "B   B   B   B   B   B   S   S",
        countGuide: "1   &   2   &   3   &   4   &",
        usage: "Digunakan saat Bridge lagu naik perlahan menuju puncak Reff.",
        techniqueTip:
          "Mainkan pukulan Bass beruntun dengan tangan Kanan-Kiri bergantian dari pelan (piano) makin lama makin keras (crescendo), lalu tutup dengan 2 Snare tegas di hitungan 4 & 4&!",
        cajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "B", hand: "L" },
          { beatLabel: "2", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "B", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "B", hand: "L" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
        ],
      },
    ],
    bonusSkills: [
      {
        id: "caj-skill-1",
        skillNumber: 1,
        badge: "SKILL FILL-IN #1",
        title: "Fill-In 4 Ketukan Terakhir (Transisi Bait ke Reff)",
        subtitle:
          "Mengantar seluruh tim musik masuk ke bagian Reff dengan fill-in yang rapi tanpa membuat tempo lari (ngebut).",
        targetBpm: 76,
        timeSignature: "4/4",
        whenToUse:
          "Pada bar ke-4 atau bar ke-8 tepat sebelum penyanyi masuk ke kalimat pertama Reff.",
        visualPatternTitle: "Rumus Emas: Groove Normal (Hitungan 1–2) + Fill-In (Hitungan 3–4)",
        visualPatternLines: [
          "Hitungan 1 - 2 : Tetap jaga groove normal (B - t - S - t) agar band tidak kehilangan pegangan tempo!",
          "Hitungan 3 - 4 : Mainkan kombinasi Bass–Tone–Snare–Snare (B - T - S - S) dengan tangan Kanan–Kiri–Kanan–Kiri.",
          "Hitungan 1 Baru: Mendarat kembali dengan Bass (B) yang mantap tepat di awal Reff.",
        ],
        practiceSteps: [
          "Jangan pernah memulai fill-in dari hitungan ke-1 karena akan membuat pemain lain bingung.",
          "Klik tombol 'Putar Simulasi Fill-In' di bawah untuk mendengar dan menirukan ayunannya.",
        ],
        demoCajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "T", hand: "L" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
        ],
      },
      {
        id: "caj-skill-2",
        skillNumber: 2,
        badge: "SKILL FILL-IN #2",
        title: "Teknik Flam & Paradiddle Roll (R – L – R – R / L – R – L – L)",
        subtitle:
          "Membuat suara fill-in cajon terdengar penuh dan bergulung seperti tom drum asli.",
        targetBpm: 80,
        timeSignature: "4/4",
        whenToUse:
          "Pada puncak lagu atau akhir Bridge sebelum masuk ke Reff terakhir yang paling megah.",
        visualPatternTitle: "Pola Tangan Paradiddle Cajon (Kanan=R, Kiri=L)",
        visualPatternLines: [
          "Teknik Flam : Kedua tangan jatuh hampir bersamaan (tangan kiri menyentuh sepersekian detik sebelum tangan kanan menghantam Snare -> bunyi 'Trak!').",
          "Pola Paradiddle: R (Bass) – L (Snare) – R (Ghost) – R (Ghost) | L (Snare) – R (Bass) – L (Ghost) – L (Snare).",
        ],
        practiceSteps: [
          "Latih pola R–L–R–R dan L–R–L–L di atas paha terlebih dahulu dengan tempo lambat.",
          "Pindahkan tangan kanan ke posisi Bass (tengah) dan tangan kiri ke posisi Snare (sudut atas).",
        ],
        demoCajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
          { beatLabel: "2", hit: "t", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "R" },
          { beatLabel: "3", hit: "S", hand: "L" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "4", hit: "t", hand: "L" },
          { beatLabel: "&", hit: "S", hand: "L" },
        ],
      },
      {
        id: "caj-skill-3",
        skillNumber: 3,
        badge: "SKILL GROOVE #3",
        title: "Linear Ghost-Note Groove (Rahasia Cajon Terdengar 'Hidup')",
        subtitle:
          "Mengisi sela-sela ketukan kosong dengan sentuhan ujung jari kiri sehingga groove mengalir tanpa henti.",
        targetBpm: 74,
        timeSignature: "4/4",
        whenToUse:
          "Saat mengiringi lagu Worship modern atau akustik di mana tidak ada drum set lengkap.",
        visualPatternTitle: "Perbandingan Volume: Bass/Snare (80%) vs Ghost Note (15%)",
        visualPatternLines: [
          "Kesalahan pemula: Memukul Ghost Note (t) sama kerasnya dengan Snare (S) sehingga terdengar berisik seperti ketukan meja.",
          "Cara profesional: Tangan kiri hanya menempel di sudut paling atas papan, dan keempat ujung jari mengetuk sangat lembut như suara shaker/hi-hat.",
        ],
        practiceSteps: [
          "Mainkan tangan kiri konstan mengetuk pelan di setiap hitungan '&'.",
          "Biarkan tangan kanan yang bertugas mengambil Bass (tengah) dan Snare utama (atas).",
        ],
        demoCajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "t", hand: "L" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
        ],
      },
      {
        id: "caj-skill-4",
        skillNumber: 4,
        badge: "SKILL PANGGUNG #4",
        title: "Stop-Time Accent (Kompak Berhenti Bersama Band)",
        subtitle:
          "Menangkap kode tangan Worship Leader untuk berhenti serentak (Cut/Stop) dan masuk kembali dengan tepat.",
        targetBpm: 92,
        timeSignature: "4/4",
        whenToUse:
          "Pada bagian Intro, interlude, atau sebelum masuk Reff ketika seluruh band berhenti sejenak selama 2 ketukan.",
        visualPatternTitle: "Pola Hitungan Stop-Time: 'Pukul di 1 -> Diam di 2 & 3 -> Fill di 4'",
        visualPatternLines: [
          "Hitungan 1 : Pukul Bass (B) dengan tegas lalu tahan telapak tangan di papan agar suara langsung mati (dry).",
          "Hitungan 2 - 3 : Hening total (tetap menghitung 2 - 3 di dalam hati!).",
          "Hitungan 4 - 4&: Berikan 2 pukulan Snare (S - S) sebagai aba-aba bagi seluruh tim untuk masuk kembali di ketukan 1.",
        ],
        practiceSteps: [
          "Putar simulasi di bawah dan perhatikan jeda hening pada ketukan 2 dan 3.",
          "Latih disiplin menghitung di dalam kepala saat tidak ada suara yang berbunyi.",
        ],
        demoCajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "-", hand: "-" },
          { beatLabel: "2", hit: "-", hand: "-" },
          { beatLabel: "&", hit: "-", hand: "-" },
          { beatLabel: "3", hit: "-", hand: "-" },
          { beatLabel: "&", hit: "-", hand: "-" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "S", hand: "L" },
        ],
      },
      {
        id: "caj-skill-5",
        skillNumber: 5,
        badge: "SKILL KOMBINASI #5",
        title: "Kombinasi Tangan Kanan Cajon + Tangan Kiri Shaker / Tamborin",
        subtitle:
          "Teknik tingkat lanjut memainkan Cajon dengan satu tangan sambil tangan lainnya mengayun shaker.",
        targetBpm: 84,
        timeSignature: "4/4",
        whenToUse:
          "Saat ibadah komsel, persekutuan doa, atau ibadah akustik agar suara perkusi terdengar lengkap (ada Kick, Snare, dan Hi-hat shaker).",
        visualPatternTitle: "Pembagian Tugas Dua Tangan",
        visualPatternLines: [
          "Tangan Kiri (Pegang Shaker) : Mengayun maju-mundur konstan di setiap hitungan 1 - & - 2 - & - 3 - & - 4 - &.",
          "Tangan Kanan (Di Papan Cajon): Berpindah cepat antara Bass (tengah papan di hitungan 1 & 3) dan Snare (tepi atas papan di hitungan 2 & 4).",
        ],
        practiceSteps: [
          "Ayunkan tangan kiri memegang benda kecil (atau imajinasi shaker) tanpa berhenti.",
          "Gunakan tangan kanan saja untuk memukul Bass (1) -> Snare (2) -> Bass (3) -> Snare (4).",
        ],
        demoCajonSteps: [
          { beatLabel: "1", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "2", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
          { beatLabel: "3", hit: "B", hand: "R" },
          { beatLabel: "&", hit: "B", hand: "R" },
          { beatLabel: "4", hit: "S", hand: "R" },
          { beatLabel: "&", hit: "t", hand: "L" },
        ],
      },
    ],
  },
};
