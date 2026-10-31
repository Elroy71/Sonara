export type CourseInstrumentId = "guitar" | "bass" | "piano" | "cajon";

export interface CajonStep {
  label: string; // e.g. "1", "&", "2", "&", "3", "&", "4", "&"
  hit: "B" | "S" | "t" | "-"; // B = Bass (Tengah), S = Slap/Snare (Atas), t = Ghost/Touch, - = Diam
}

export interface CourseMeeting {
  meetingNumber: number;
  title: string;
  subtitle: string;
  durationMinutes: number; // 60 - 120 mins (1 - 2 hours)
  theoryMinutes: number;
  practiceMinutes: number;
  targetBpm: number;
  timeSignature: "4/4" | "3/4" | "6/8";
  summary: string;
  keyPoints: string[];
  practiceSteps: {
    phase: string;
    minutes: number;
    instruction: string;
  }[];
  visualType:
    | "guitar-anatomy"
    | "guitar-chords"
    | "guitar-strumming"
    | "bass-fretboard"
    | "bass-groove"
    | "piano-keys"
    | "piano-voicing"
    | "cajon-zones"
    | "cajon-pattern";
  visualCaption: string;
  chordsToPractice?: string[];
  strummingArrows?: ("D" | "U" | "-")[];
  bassNotes?: { stringNum: 1 | 2 | 3 | 4; fret: number; note: string; role: string }[];
  cajonPattern?: CajonStep[];
  recommendedSongSlug: string;
  recommendedSongTitle: string;
}

export interface InstrumentCourse {
  id: CourseInstrumentId;
  name: string;
  shortName: string;
  specs: string;
  totalMeetings: number;
  durationPerMeeting: string;
  level: "Pemula" | "Pemula ke Pelayanan Gereja";
  overview: string;
  meetings: CourseMeeting[];
}

export const COURSES_DATA: InstrumentCourse[] = [
  // ============================================================================
  // 1. GITAR 6 SENAR (10 PERTEMUAN: 5 FONDASI PADAT + 5 MASTERCLASS GEREJA)
  // ============================================================================
  {
    id: "guitar",
    name: "Gitar 6 Senar",
    shortName: "Gitar 6 Senar",
    specs: "Tuning Standar (E - A - D - G - B - E) · Akustik & Elektrik",
    totalMeetings: 10,
    durationPerMeeting: "75 – 100 Menit / Pertemuan",
    level: "Pemula ke Pelayanan Gereja",
    overview:
      "Kurikulum terstruktur 10 pertemuan: 5 Pertemuan Fondasi Padat (Tuning, akord C & G, transisi pivot, irama 3/4 & 4/4, slash chord) disusul 5 Pertemuan Masterclass Musik Gereja (Open voicings worship modern, ambient swells, delay dotted 8th, percussive praise up-tempo 120+ BPM, lead melodic fills, serta modulasi & dinamika worship team live).",
    meetings: [
      {
        meetingNumber: 1,
        title: "Fondasi Setem, Postur Ergonomis & Akord Utama C - G - Am - F",
        subtitle: "Penguasaan 6 senar, penomoran jari (1-4), dan pembentukan akord utama tanpa sengau",
        durationMinutes: 80,
        theoryMinutes: 20,
        practiceMinutes: 60,
        targetBpm: 66,
        timeSignature: "4/4",
        summary:
          "Memahami urutan 6 senar gitar (E2-A2-D3-G3-B3-E4), penomoran jari tangan kiri (1 Telunjuk, 2 Tengah, 3 Manis, 4 Kelingking), posisi ibu jari di belakang leher gitar, serta pembentukan 4 akord utama keluarga C (C, G, Am, Fmaj7) dengan tekanan tepat di dekat besi fret agar nada berdering jernih.",
        keyPoints: [
          "Urutan 6 senar dari atas ke bawah: 6 (E Rendah) - 5 (A) - 4 (D) - 3 (G) - 2 (B) - 1 (E Tinggi).",
          "Tekan senar tepat di belakang kawat fret menggunakan ujung jari yang tegak lurus (kuku tangan kiri harus pendek).",
          "Kuasai bentuk akord C, G, Am, dan F alternatif (Fmaj7 / F 4-senar) dengan membunyikan tiap senar satu per satu untuk memastikan tidak ada suara teredam.",
        ],
        practiceSteps: [
          { phase: "Tuning & Pengenalan Senar", minutes: 15, instruction: "Setem 6 senar dengan Tuner di menu Latihan hingga berjarum hijau tepat di tengah." },
          { phase: "Senam Jari Kromatik 1-2-3-4", minutes: 20, instruction: "Nyalakan Metronom di 66 BPM, petik fret 1-2-3-4 di tiap senar dengan teknik petikan bergantian (Down-Up)." },
          { phase: "Bentuk Akord C, G, Am, F", minutes: 25, instruction: "Genjreng masing-masing akord 4 ketukan sekali, pastikan semua senar berdering tanpa sengau. Untuk F gunakan versi mudah Fmaj7 (senar 4-3-2-1); F barre dipelajari nanti." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Akord Fondasi C - G - Am - Fmaj7 (Fmaj7 = versi F yang mudah, tanpa barre)",
        chordsToPractice: ["C", "G", "Am", "Fmaj7"],
        recommendedSongSlug: "amazing-grace",
        recommendedSongTitle: "Amazing Grace",
      },
      {
        meetingNumber: 2,
        title: "Kelancaran Pivot Pindah Akord & Strumming Hymn / Ballad 4/4",
        subtitle: "Teknik anchor finger, ayunan konstan tangan kanan, dan aksen ketukan 1 & 3",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Menguasai teknik jari poros (pivot/anchor fingers) untuk berpindah antar-akord secara mulus tanpa menghentikan ayunan tangan kanan. Dipadukan dengan pola genjrengan pop ballad gereja D - D - U - U - D - U di mana pergelangan tangan kanan tetap berayun santai seperti pendulum jam dinding.",
        keyPoints: [
          "Tangan kanan harus terus berayun naik-turun secara teratur meski jari tangan kiri sedang berpindah bentuk akord.",
          "Gunakan Jari 1 atau Jari 2 sebagai poros jangkar saat berpindah antara C ke Am atau G ke Em.",
          "Beri aksen petikan sedikit lebih kuat di ketukan 1 (nada bass) dan genjrengan lembut di sela ketukan.",
        ],
        practiceSteps: [
          { phase: "Pola Ayunan Pendulum", minutes: 20, instruction: "Mute senar dengan telapak kiri, latih ayunan tangan kanan D - D - U - U - D - U di 70 BPM tanpa putus." },
          { phase: "Pindah Akord C - Am - F - G", minutes: 25, instruction: "Terapkan pola genjrengan pada progresi C - Am - F - G, ganti akord tepat di ketukan 1 tiap bar." },
          { phase: "Aplikasi Lagu Lengkap", minutes: 20, instruction: "Iringi lagu 'Kuingin Selalu Dekat Pada-Mu' dari bait pertama hingga selesai." },
        ],
        visualType: "guitar-strumming",
        visualCaption: "Pola Genjrengan Ballad / Hymn 4/4: D - [ ] - D - U - [ ] - U - D - U",
        strummingArrows: ["D", "-", "D", "U", "-", "U", "D", "U"],
        recommendedSongSlug: "kuingin-selalu-dekat-padamu",
        recommendedSongTitle: "Kuingin Selalu Dekat Pada-Mu",
      },
      {
        meetingNumber: 3,
        title: "Irama Waltz 3/4 & Akord Terbuka Keluarga G (G, Em, C, D)",
        subtitle: "Mengiringi lagu sukat 3 ketukan (Petik Bass - Genjreng - Genjreng) dan akord D & Em",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 76,
        timeSignature: "3/4",
        summary:
          "Banyak lagu Hymn agung gereja yang diciptakan dalam sukat 3/4 (Waltz). Mempelajari teknik memetik senar bass di ketukan 1, lalu 2 kali genjrengan lembut di ketukan 2 dan 3, dipadukan dengan pembentukan akord keluarga G (G, Em, C, D).",
        keyPoints: [
          "Sukat 3/4 hanya memiliki 3 ketukan per bar: Ketukan 1 (Kuat/Bass), Ketukan 2 & 3 (Lembut/Harmoni).",
          "Pada akord D mayor, petik senar bass mulai dari Senar 4 (D terbuka), jangan bunyikan Senar 6 dan 5.",
          "Transisi Em ke C: jari 3 turun ke Fret 3 Senar 5, jari 2 ke Fret 2 Senar 4, lalu tambahkan jari 1 di Fret 1 Senar 2. Ketiganya bergerak bersamaan sebagai satu bentuk.",
        ],
        practiceSteps: [
          { phase: "Pola Petik Waltz 3/4", minutes: 20, instruction: "Mainkan pola Bass (senar 6/5/4) lalu Down-Down di senar 1-3 pada tempo 76 BPM." },
          { phase: "Loop Progresi G - Em - C - D", minutes: 25, instruction: "Mainkan 1 bar (3 ketukan) untuk masing-masing akord secara berputar terus-menerus." },
          { phase: "Mengiringi How Great Thou Art", minutes: 20, instruction: "Mainkan lagu agung 'How Great Thou Art' dengan ritme 3/4 yang khidmat." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Keluarga Akord Terbuka G Mayor: G - Em - C - D",
        chordsToPractice: ["G", "Em", "C", "D"],
        recommendedSongSlug: "how-great-thou-art",
        recommendedSongTitle: "How Great Thou Art",
      },
      {
        meetingNumber: 4,
        title: "Kontrol Sinkopasi, Palm Mute & Mengunci Tempo Metronom",
        subtitle: "Teknik peredaman telapak tangan kanan (Palm Mute) & aksen dinamis bait menuju reff",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Memadukan teknik Palm Muting (menempelkan tepi bantalan daging telapak tangan kanan tepat di atas saddle bridge gitar) untuk menghasilkan petikan redup 'chug-chug' saat mengiringi bait (verse) lagu yang tenang, dan melepaskan mute menjadi genjrengan terbuka penuh saat memasuki refrain/chorus.",
        keyPoints: [
          "Bantalan telapak tangan kanan menempel sangat ringan di bridge saddle: jangan terlalu maju ke tengah bodi gitar agar senar tidak mati total.",
          "Latih perubahan dinamika: Bait = Lembut & Palm Mute (p), Refrain = Terbuka & Genjrengan Luas (f).",
          "Kunci telinga pada klik metronom 72 BPM agar tempo tidak bergeser saat dinamika naik membesar.",
        ],
        practiceSteps: [
          { phase: "Eksplorasi Posisi Palm Mute", minutes: 20, instruction: "Petik senar 6 & 5 secara downstroke berulang sambil mencari titik manis suara bass yang empuk dan padat." },
          { phase: "Latihan Transisi Verse ke Chorus", minutes: 25, instruction: "Mainkan 4 bar Palm Mute (Verse) lalu langsung beralih ke 4 bar Open Strumming (Chorus) di tempo 72 BPM." },
          { phase: "Aplikasi Lagu Sentuh Hatiku", minutes: 25, instruction: "Iringi lagu 'Sentuh Hatiku' dengan dinamika bertingkat dari Verse ke Chorus." },
        ],
        visualType: "guitar-strumming",
        visualCaption: "Pola 8th-Note Palm Mute: D - D - D - D - D - U - D - U",
        strummingArrows: ["D", "D", "D", "D", "D", "U", "D", "U"],
        recommendedSongSlug: "sentuh-hatiku",
        recommendedSongTitle: "Sentuh Hatiku",
      },
      {
        meetingNumber: 5,
        title: "Jembatan Slash Chord (C/E, G/B, D/F#) & Evaluasi 1 Lagu Utuh",
        subtitle: "Membuat bassline melangkah anggun dan pengiringan lagu utuh tanpa terputus",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Mempelajari slash chord esensial musik rohani seperti C/E, G/B, dan D/F# (menggunakan ibu jari tangan kiri mengait di atas leher fret 2 senar 6 atau telunjuk fret 2 senar 6). Slash chord mengubah perpindahan chord kaku menjadi pergerakan bassline menurun yang anggun (G -> D/F# -> Em -> C/E), dilengkapi evaluasi 1 lagu lengkap.",
        keyPoints: [
          "Pada chord D/F#, nada bass terendah adalah F# (Fret 2 Senar 6), bukan D terbuka.",
          "Pada G/B, petik mulai dari Senar 5 Fret 2 (B), dan senar 6 dimatikan/di-mute dengan sentuhan ringan jari 1.",
          "Gunakan slash chord sebagai jembatan perpindahan harmoni yang mulus antar-bagian lagu.",
        ],
        practiceSteps: [
          { phase: "Bentuk D/F# dan G/B", minutes: 25, instruction: "Latih jari membentuk D/F# (kaitkan jempol atau pakai telunjuk) dan G/B secara bergantian." },
          { phase: "Progresi Turun G - D/F# - Em - C/E", minutes: 25, instruction: "Mainkan progresi bassline turun 2 ketukan per chord bersama metronom 70 BPM." },
          { phase: "Evaluasi Lagu Kudus Kudus Kuduslah", minutes: 20, instruction: "Mainkan lagu 'Kudus, Kudus, Kuduslah' dari awal sampai selesai dengan slash chord terpasang sempurna." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Bentuk Slash Chord Jembatan: G - D/F# - Em - C/E",
        chordsToPractice: ["G", "D/F#", "Em", "C/E"],
        recommendedSongSlug: "holy-holy-holy",
        recommendedSongTitle: "Kudus, Kudus, Kuduslah",
      },
      // --- MASTERCLASS MUSIK GEREJA & WORSHIP TEAM READY (PERTEMUAN 6 - 10) ---
      {
        meetingNumber: 6,
        title: "Modern Worship Open Voicings & Capo Mastery (Big G Family)",
        subtitle: "Bentuk akord open-string khas Hillsong/Bethel (G - Cadd9 - Em7 - Dsus4) & transposisi kilat dengan Capo",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Mempelajari standar emas gitar akustik worship modern yang diajarkan Worship Tutorials dan Nigel Hendroff: Jari 3 (Manis) dan Jari 4 (Kelingking) DIKUNCI PERMANEN di Fret 3 Senar 1 & 2. Anda hanya memindahkan Jari 1 dan 2 untuk membentuk G, Cadd9, Em7, dan Dsus4. Dilengkapi rumus posisi Capo untuk langsung transposisi nada saat Worship Leader minta ganti nada dasar mendadak tanpa perlu belajar chord baru.",
        keyPoints: [
          "Dua senar paling bawah (Senar 1 & 2 Fret 3 = nada G dan D) berfungsi sebagai pedal-drone yang menghasilkan resonansi surgawi dan suara mewah khas modern worship.",
          "Transisi G ke Cadd9 sangat instan: geser Jari 1 & 2 satu senar ke arah senar tipis secara bersamaan (senar 6 tidak dibunyikan di Cadd9).",
          "Rumus Capo kilat: Mainkan bentuk G di Capo Fret 2 = Nada Dasar A; Capo Fret 3 = Bb; Capo Fret 5 = C.",
        ],
        practiceSteps: [
          { phase: "Kunci 2 Jari Bawah (Anchor Lock)", minutes: 20, instruction: "Tahan Jari 3 & 4 di Fret 3 senar 1-2, latih pindah G -> Cadd9 -> Em7 -> Dsus4 tanpa mengangkat kedua jari tersebut." },
          { phase: "Simulasi Ganti Kunci via Capo", minutes: 25, instruction: "Pasang Capo di Fret 2 (Nada A), mainkan pola yang sama. Rasakan kemudahan transposisi instan di panggung." },
          { phase: "Aplikasi Lagu Sampai Akhir Hidupku", minutes: 30, instruction: "Mainkan 'Sampai Akhir Hidupku' dengan open voicings Cadd9 - G/B - Em7 - Dsus4." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Modern Worship Voicings: G - Cadd9 - Em7 - Dsus4 (Jari 3 & 4 Tetap Mengunci Fret 3)",
        chordsToPractice: ["G (anchor)", "Cadd9", "Em7 (anchor)", "Dsus4"],
        recommendedSongSlug: "sampai-akhir-hidupku",
        recommendedSongTitle: "Sampai Akhir Hidupku",
      },
      {
        meetingNumber: 7,
        title: "Ambient Swells, Dotted 8th Delay & Reverb Shimmer Layering",
        subtitle: "Menciptakan soundscape megah pengantar doa/altar call dan arpeggio delay sinkron",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Mempelajari seni menciptakan atmosfer doa dalam pelayanan gereja: Menguasai teknik Volume Swell (memetik senar saat knob volume di posisi 0 lalu memutarnya perlahan ke 10 atau menggunakan Volume Pedal agar serangan pick tidak terdengar), digabung dengan Shimmer Reverb panjang untuk mengiringi saat pembacaan Firman atau Altar Call. Ditambah perhitungan Delay Dotted Eighth (3/16 note = tempo BPM disinkronkan) untuk arpeggio ritmis Hillsong.",
        keyPoints: [
          "Volume Swell menghilangkan 'transient pick attack', mengubah gitar menjadi pad orkestra cello yang menyejukkan.",
          "Delay Dotted-Eighth: Petik not 1/8 biasa, delay akan memantulkan pantulan syncopated di antara ketukan sehingga terdengar seperti dua gitaris bermain bersama.",
          "Etika pengiring doa: Mainkan nada tunggal arpeggio lembut di register tengah-tinggi, jangan menabrak frekuensi vokal pendeta.",
        ],
        practiceSteps: [
          { phase: "Latihan Swell Jari Kelingking / Pedal", minutes: 25, instruction: "Petik akord Cadd9 dalam keadaan mute, putar knob volume secara halus membesar selama 2 detik lalu tutup kembali." },
          { phase: "Arpeggio Dotted 8th Synchronized", minutes: 25, instruction: "Mainkan not tunggal pada senar 3, 2, 1 secara berurutan mengikuti metronom 68 BPM." },
          { phase: "Simulasi Pengiring Altar Call", minutes: 25, instruction: "Iringi lagu 'Walau Ku Tak Dapat Melihat' dengan format ambient swell yang khidmat dan teduh." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Akord Ambient Worship: Cadd9 - G/B - Em7 - Dsus4",
        chordsToPractice: ["Cadd9", "G/B", "Em7", "Dsus4"],
        recommendedSongSlug: "walau-ku-tak-dapat-melihat",
        recommendedSongTitle: "Walau Ku Tak Dapat Melihat",
      },
      {
        meetingNumber: 8,
        title: "Percussive 16th-Note Strumming & Drive Praise Up-Tempo (120+ BPM)",
        subtitle: "Pola genjrengan 16-ketuk bertenaga, aksen snare ketukan 2 & 4, dan tone overdrive renyah",
        durationMinutes: 100,
        theoryMinutes: 20,
        practiceMinutes: 80,
        targetBpm: 126,
        timeSignature: "4/4",
        summary:
          "Mengembangkan ketahanan pergelangan tangan untuk lagu-lagu Praise bertempo cepat (120-130 BPM gaya Planetshakers dan JPCC Worship). Menggunakan teknik percussive strum (meredam senar sesaat dengan telapak kiri di ketukan 2 dan 4 untuk mensimulasikan suara snare drum), sapuan pick tipis fleksibel (0.60–0.73mm), dan tone overdrive renyah yang memberi tenaga tanpa memekakkan telinga jemaat.",
        keyPoints: [
          "Gunakan pergelangan tangan yang rileks, bukan mengayun dari siku, agar tidak kram di tempo 126 BPM.",
          "Kunci percussive strum: Kendurkan sedikit jari tangan kiri tepat di ketukan 2 & 4 sehingga genjrengan menghasilkan suara 'chak' renyah seperti snare drum.",
          "Jaga konsistensi dinamika: jangan mempercepat tempo (rushing) saat jemaat mulai bertepuk tangan.",
        ],
        practiceSteps: [
          { phase: "Pemanasan Ritme 16th Note 100 BPM", minutes: 20, instruction: "Mute senar, genjreng Down-Up cepat 1-e-&-a 2-e-&-a secara stabil selama 2 menit penuh." },
          { phase: "Naikkan Tempo ke 126 BPM + Aksen 'Chak'", minutes: 30, instruction: "Beri aksen hentakan 'chak' di ketukan 2 dan 4 bersama metronom 126 BPM pada akord G dan C." },
          { phase: "Lagu Praise Bersuka Dalam Tuhan", minutes: 30, instruction: "Mainkan lagu 'Bersuka Dalam Tuhan' dari awal hingga bait terakhir dengan energi penuh." },
        ],
        visualType: "guitar-strumming",
        visualCaption: "Pola 16th-Note Drive: D - U - D - U - D(Chak) - U - D - U (Aksen di Ketukan 2 & 4)",
        strummingArrows: ["D", "U", "D", "U", "D", "U", "D", "U"],
        recommendedSongSlug: "bersuka-dalam-tuhan",
        recommendedSongTitle: "Bersuka Dalam Tuhan",
      },
      {
        meetingNumber: 9,
        title: "Lead Guitar Worship: Melodic Hooks, Double Stops & Call-and-Response",
        subtitle: "Membuat intro melodi penggerak jemaat, harmoni 2 senar (Double Stops), dan mengisi celah vokal",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 74,
        timeSignature: "4/4",
        summary:
          "Teknik gitaris melodi gereja profesional: Menciptakan hook melodi intro 2-4 bar yang langsung dikenali jemaat, memainkan teknik double stops (memetik 2 senar secara bersamaan pada interval nada ke-3 atau ke-6), teknik slide dan vibrato lembut, serta etika panggung 'Call-and-Response' — mengisi celah melodi hanya saat penyanyi selesai satu baris lirik, dan menahan diri saat Worship Leader bernyanyi.",
        keyPoints: [
          "Hook intro harus simpel, bernyanyi (singable), dan mudah diingat jemaat sebelum lirik dimulai.",
          "Double Stops di senar 1 & 2 atau senar 2 & 3 memberikan suara melodi tebal dan hangat khas lagu gospel.",
          "Jangan bermain solo egois: gitaris worship bertugas menopang lirik lagu dan mengarahkan fokus ibadah kepada Tuhan.",
        ],
        practiceSteps: [
          { phase: "Latihan Melodi Pentatonik & Double Stops", minutes: 25, instruction: "Petik nada G-A-B-D-E pada senar 1 & 2 dengan teknik slide dan double stops di fret 3 & 5." },
          { phase: "Teknik Call and Response", minutes: 25, instruction: "Putar lagu backtrack, tahan diri saat vokal bernyanyi, lalu mainkan fills 2 ketukan di akhir tiap baris lirik." },
          { phase: "Lagu Kebaikan Tuhan (Goodness of God)", minutes: 25, instruction: "Mainkan melodi intro dan fills pengisi pada lagu 'Kebaikan Tuhan (Goodness of God)'." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Akord Pengiring Lead Guitar: G - D - Em - C",
        chordsToPractice: ["G", "D", "Em", "C"],
        recommendedSongSlug: "kebaikan-tuhan-goodness-of-god",
        recommendedSongTitle: "Kebaikan Tuhan (Goodness of God)",
      },
      {
        meetingNumber: 10,
        title: "Live Worship Team Simulation: Dinamika Rohani, Modulasi & Spontaneous Flow",
        subtitle: "Manajemen energi lagu (Verse bisik ke Bridge megah), modulasi naik 1 nada & membaca kode panggung",
        durationMinutes: 110,
        theoryMinutes: 30,
        practiceMinutes: 80,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Simulasi panggung pelayanan ibadah sesungguhnya: Membangun aransemen dinamis 4 tingkat (Tingkat 1: Ambient pad/swell saat Verse 1 -> Tingkat 2: Strumming ringan di Chorus 1 -> Tingkat 3: Full strumming & lead di Chorus 2/Bridge -> Tingkat 4: Ending teduh turun ke piano). Membaca kode tangan Worship Leader / Music Director (kepalan tangan = cut/stop, angka jari = nomor bait/reff, telapak mengarah ke atas = build-up), dan teknik modulasi naik 1 nada secara mulus via akord V sus.",
        keyPoints: [
          "Dinamika ibadah adalah kunci: jangan memainkan volume dan energi maksimal sejak awal lagu.",
          "Teknik modulasi dari G ke A: selipkan akord E7sus4 atau E7 di akhir bar sebelum masuk ke nada dasar baru A.",
          "Perhatikan kode tangan Music Director (MD) dan selalu siap mengulang bagian reff secara spontan saat ada dorongan doa.",
        ],
        practiceSteps: [
          { phase: "Simulasi 4 Tingkat Dinamika", minutes: 30, instruction: "Latih peralihan dari Verse 1 (swell lembut) -> Chorus (strumming medium) -> Bridge (full drive) -> Altar Call." },
          { phase: "Latihan Modulasi Kunci (G ke A)", minutes: 25, instruction: "Mainkan progresi G-C-D lalu transisi lewat E7sus4 menuju kunci A mayor." },
          { phase: "Simulasi Ibadah Penuh Kaulah Segalanya", minutes: 25, instruction: "Mainkan lagu 'Kaulah Segalanya' secara utuh dengan penghayatan dinamika pelayanan." },
        ],
        visualType: "guitar-chords",
        visualCaption: "Akord Dinamika Worship: G - Cadd9 - D - Em7",
        chordsToPractice: ["G", "Cadd9", "D", "Em7"],
        recommendedSongSlug: "kaulah-segalanya",
        recommendedSongTitle: "Kaulah Segalanya",
      },
    ],
  },

  // ============================================================================
  // 2. BASS 4 SENAR (10 PERTEMUAN: 5 FONDASI PADAT + 5 MASTERCLASS GEREJA)
  // ============================================================================
  {
    id: "bass",
    name: "Bass 4 Senar",
    shortName: "Bass 4 Senar",
    specs: "Tuning Standar (E - A - D - G) · 4 Senar Elektrik",
    totalMeetings: 10,
    durationPerMeeting: "75 – 100 Menit / Pertemuan",
    level: "Pemula ke Pelayanan Gereja",
    overview:
      "Kurikulum bass komprehensif 10 pertemuan: 5 Pertemuan Fondasi Padat (Petikan 2 jari alternating, root notes senar E & A, tangga nada mayor, irama 3/4 & 4/4 legato, dan slash chord bassline) disusul 5 Pertemuan Masterclass Bassist Gereja (Walking bass & chromatic passing notes lagu hymn/gospel, locking-in dengan kick drum pada praise 120+ BPM, harmoni 10th intervals & sustained sub-bass, Nashville Number System untuk transposisi kilat, serta seni tacet dan mengawal frekuensi low-end di ibadah live).",
    meetings: [
      {
        meetingNumber: 1,
        title: "Anatomi Bass, Petikan 2 Jari (I-M) & Root Notes Senar E & A",
        subtitle: "Teknik Floating Thumb, postur pergelangan rileks, dan letak nada fret 0-5",
        durationMinutes: 80,
        theoryMinutes: 20,
        practiceMinutes: 60,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Memahami postur bermain bass yang ergonomis, teknik meletakkan ibu jari tangan kanan di atas pickup atau senar 4 (Floating Thumb), serta teknik petikan bergantian Jari Telunjuk (Index - I) dan Jari Tengah (Middle - M) dengan resting stroke (jari mendarat santai di senar atasnya). Menghafal posisi nada penting di Senar 4 (E, F, G) dan Senar 3 (A, B, C, D).",
        keyPoints: [
          "Gunakan teknik 'Rest Stroke': setelah memetik senar, biarkan ujung jari bersandar pada senar di atasnya untuk mematikan dengungan.",
          "Petikan harus selalu bergantian I - M - I - M seperti dua kaki yang sedang berjalan teratur.",
          "Hafal nada dasar: Fret 3 Senar 4 = G, Fret 3 Senar 3 = C, Fret 5 Senar 3 = D.",
        ],
        practiceSteps: [
          { phase: "Latihan Petikan Rest Stroke I-M", minutes: 20, instruction: "Petik senar 4 terbuka (E) bergantian jari I dan M di tempo 68 BPM hingga volume dan nada seragam." },
          { phase: "Navigasi Nada Fret 0-5 Senar E & A", minutes: 20, instruction: "Petik nada E-F-G (Senar 4) lalu pindah ke A-B-C-D (Senar 3) dengan durasi 4 ketukan per nada." },
          { phase: "Aplikasi Root Note Amazing Grace", minutes: 20, instruction: "Mainkan root notes nada dasar pada lagu 'Amazing Grace' secara bulat dan teratur." },
        ],
        visualType: "bass-fretboard",
        visualCaption: "Peta Fretboard Bass 4 Senar: Posisi Nada Root Senar 4 (E) dan Senar 3 (A)",
        bassNotes: [
          { stringNum: 4, fret: 0, note: "E", role: "Root Senar 4" },
          { stringNum: 4, fret: 3, note: "G", role: "Root Nada G" },
          { stringNum: 3, fret: 0, note: "A", role: "Root Senar 3" },
          { stringNum: 3, fret: 3, note: "C", role: "Root Nada C" },
        ],
        recommendedSongSlug: "amazing-grace",
        recommendedSongTitle: "Amazing Grace",
      },
      {
        meetingNumber: 2,
        title: "Senar D & G, Tangga Nada Mayor 1 Oktaf & Kebersihan Muting",
        subtitle: "Menjelajahi senar 2 dan 1, rumus 1-2-3-4-5-6-7-8, dan mematikan dengungan senar liar",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Menghubungkan nada pada Senar 2 (D) dan Senar 1 (G), memainkan tangga nada Mayor 1 oktaf (C mayor & G mayor) dengan posisi jari 'One Finger Per Fret', serta menerapkan teknik muting telapak tangan kiri agar senar tebal yang tidak dimainkan tidak menghasilkan dengungan keruh di sound system.",
        keyPoints: [
          "Posisi tangan kiri: Jari 1 = Fret 2, Jari 2 = Fret 3, Jari 4 = Fret 5. Jangan biarkan jari melayang terlalu tinggi dari fret.",
          "Muting tangan kiri: tempelkan sisa jari secara datar di atas senar-senar yang tidak dipetik.",
          "Rumus tangga nada mayor: 1 (Do) - 2 (Re) - 3 (Mi) - 4 (Fa) - 5 (Sol) - 6 (La) - 7 (Si) - 8 (Do tinggi).",
        ],
        practiceSteps: [
          { phase: "Tangga Nada C Mayor 1 Oktaf", minutes: 20, instruction: "Mainkan C (Senar 3 Fret 3) sampai C Oktaf (Senar 1 Fret 5) naik dan turun bersama metronom 70 BPM." },
          { phase: "Latihan Kebersihan Muting", minutes: 25, instruction: "Petik senar 1 & 2 bergantian sambil memastikan senar 4 dan 3 benar-benar sunyi tanpa dengungan." },
          { phase: "Aplikasi Progresi Kuingin Selalu Dekat Pada-Mu", minutes: 20, instruction: "Mainkan progresi C - Am - F - G dengan nada bulat penuh." },
        ],
        visualType: "bass-fretboard",
        visualCaption: "Bentuk Tangga Nada Mayor 1 Oktaf pada Bass 4 Senar",
        bassNotes: [
          { stringNum: 3, fret: 3, note: "C", role: "Root (1)" },
          { stringNum: 2, fret: 2, note: "E", role: "3rd (Mi)" },
          { stringNum: 2, fret: 5, note: "G", role: "5th (Sol)" },
          { stringNum: 1, fret: 5, note: "C", role: "Oktaf (8)" },
        ],
        recommendedSongSlug: "kuingin-selalu-dekat-padamu",
        recommendedSongTitle: "Kuingin Selalu Dekat Pada-Mu",
      },
      {
        meetingNumber: 3,
        title: "Irama Hymn 3/4 & Ketukan Ballad Lambat 4/4 (Karakter Legato)",
        subtitle: "Mempertahankan nada panjang bulat penuh (Sustain) & ayunan sukat ganjil",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 76,
        timeSignature: "3/4",
        summary:
          "Menjaga nada bass tetap bernafas panjang (legato) pada sukat 3/4 lagu-lagu Hymn dan sukat 4/4 Ballad. Bassist bertugas menjadi jangkar pondasi nada terendah: memetik tepat di ketukan 1 dengan tone hangat dan membiarkan nada berbunyi penuh menyambung ke bar berikutnya tanpa terputus-putus.",
        keyPoints: [
          "Legato artinya nada dimainkan bersambung halus, jangan dilepas terburu-buru sebelum ketukan berikutnya tiba.",
          "Pada sukat 3/4, fokuskan ketukan 1 sebagai nada utama (nilai whole/dotted-half note).",
          "Gunakan petikan daging jari tangan kanan dekat pangkal leher (neck) untuk tone bass yang lebih hangat dan bulat.",
        ],
        practiceSteps: [
          { phase: "Latihan Nilai Not Utuh 3 Ketukan", minutes: 20, instruction: "Petik nada G, tahan bergetar selama 3 ketukan penuh lalu pindah ke nada C tepat di ketukan 1 bar berikutnya." },
          { phase: "Progresi Hymn 3/4 G - C - D", minutes: 25, instruction: "Latih transisi 3/4 pada progresi lagu How Great Thou Art di tempo 76 BPM." },
          { phase: "Aplikasi Lagu How Great Thou Art", minutes: 20, instruction: "Iringi lagu 'How Great Thou Art' dengan kehangatan suara bass yang mengayun stabil." },
        ],
        visualType: "bass-groove",
        visualCaption: "Pola Legato Bass 3/4: Petik Kuat di Ketukan 1, Tahan Penuh hingga Ketukan 3",
        bassNotes: [
          { stringNum: 4, fret: 3, note: "G", role: "Bar 1 (Ketukan 1-3)" },
          { stringNum: 3, fret: 3, note: "C", role: "Bar 2 (Ketukan 1-3)" },
          { stringNum: 3, fret: 5, note: "D", role: "Bar 3 (Ketukan 1-3)" },
          { stringNum: 4, fret: 3, note: "G", role: "Bar 4 (Resolusi)" },
        ],
        recommendedSongSlug: "how-great-thou-art",
        recommendedSongTitle: "How Great Thou Art",
      },
      {
        meetingNumber: 4,
        title: "Metronom Pocket, Sinkopasi Aksen & Peredaman Rapat (Tight Muting)",
        subtitle: "Mengunci ketukan tepat di 'Pocket' metronom dan kontrol dinamika bait ke chorus",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Membangun groove 'in the pocket' di mana petikan bass jatuh persis di tengah ketukan metronom (tidak terburu-buru/rushing dan tidak tertinggal/dragging). Melatih variasi nilai not perempat dan not perdelapan sinkopasi, serta teknik meredam senar secara instan untuk menciptakan dinamika ruang bernafas bagi vokal worship.",
        keyPoints: [
          "Bermain 'In the Pocket' berarti suara klik metronom seolah hilang tertutup oleh ketukan petikan bass Anda.",
          "Latih ketukan sinkopasi di ketukan '&' (upbeat) untuk memberi dorongan groove yang mengalir.",
          "Gunakan telapak tangan kanan untuk mematikan senar saat lagu meminta tacet/jeda hening.",
        ],
        practiceSteps: [
          { phase: "Latihan 'Burying the Click'", minutes: 25, instruction: "Nyalakan metronom 72 BPM, petik nada G tiap ketukan sampai petikan Anda menutupi bunyi klik metronom." },
          { phase: "Sinkopasi Not Perdelapan", minutes: 25, instruction: "Mainkan pola ketukan 1 - [ ] - & - 3 - [ ] - & pada progresi G - Em - C - D." },
          { phase: "Aplikasi Lagu Sentuh Hatiku", minutes: 20, instruction: "Mainkan lagu 'Sentuh Hatiku' dengan groove pocket yang stabil dan dinamis." },
        ],
        visualType: "bass-groove",
        visualCaption: "Groove Pocket 4/4: Petikan Ketukan 1 & 3 dengan Aksen Sinkopasi Upbeat",
        bassNotes: [
          { stringNum: 4, fret: 3, note: "G", role: "Downbeat (1)" },
          { stringNum: 4, fret: 0, note: "E", role: "Downbeat (2)" },
          { stringNum: 3, fret: 3, note: "C", role: "Upbeat (&)" },
          { stringNum: 3, fret: 5, note: "D", role: "Downbeat (4)" },
        ],
        recommendedSongSlug: "sentuh-hatiku",
        recommendedSongTitle: "Sentuh Hatiku",
      },
      {
        meetingNumber: 5,
        title: "Slash Chords Bassline (Walk-Down C - G/B - Am - C/G) & Pengiringan Utuh",
        subtitle: "Tanggung jawab utama bassist pada chord jembatan dan simulasi mengiringi lagu lengkap",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Memahami peran mutlak pemain bass: saat chord sheet tertulis C/E atau G/B, bassist WAJIB memetik nada setelah garis miring (nada E atau B), bukan nada depannya! Melatih garis bassline menurun (walk-down) yang anggun pada progresi C -> G/B -> Am -> C/G -> F yang menjadi ciri khas musik gereja berkualitas tinggi.",
        keyPoints: [
          "Huruf setelah garis miring adalah nada terendah (Bass Note) yang menjadi tanggung jawab mutlak pemain bass.",
          "G/B = Bassist memetik nada B (Senar 3 Fret 2); C/E = Bassist memetik nada E (Senar 4 Fret 0 / Senar 3 Fret 7).",
          "Bassline walk-down menciptakan harmoni yang menyambung mulus dari register atas ke bawah.",
        ],
        practiceSteps: [
          { phase: "Latihan Alur Walk-Down", minutes: 25, instruction: "Petik nada C (Fret 3 A) -> B (Fret 2 A) -> A (A terbuka) -> G (Fret 3 E) -> F (Fret 1 E) masing-masing 2 ketukan." },
          { phase: "Sinkronisasi dengan Metronom", minutes: 25, instruction: "Jaga agar perpindahan nada walk-down jatuh persis di ketukan 1 dan 3 di tempo 70 BPM." },
          { phase: "Evaluasi Lagu Kudus Kudus Kuduslah", minutes: 20, instruction: "Iringi lagu 'Kudus, Kudus, Kuduslah' secara utuh dengan nada slash chord yang tepat dan berwibawa." },
        ],
        visualType: "bass-fretboard",
        visualCaption: "Peta Nada Bassline Turun: C (Fret 3 A) → B (Fret 2 A) → A (Open A) → G (Fret 3 E)",
        bassNotes: [
          { stringNum: 3, fret: 3, note: "C", role: "Chord C" },
          { stringNum: 3, fret: 2, note: "B", role: "Chord G/B" },
          { stringNum: 3, fret: 0, note: "A", role: "Chord Am" },
          { stringNum: 4, fret: 3, note: "G", role: "Chord C/G" },
        ],
        recommendedSongSlug: "holy-holy-holy",
        recommendedSongTitle: "Kudus, Kudus, Kuduslah",
      },
      // --- MASTERCLASS BASSIST GEREJA & WORSHIP TEAM READY (PERTEMUAN 6 - 10) ---
      {
        meetingNumber: 6,
        title: "Walking Bass & Chromatic Passing Notes Lagu Hymn / Gospel Gereja",
        subtitle: "Menghubungkan akord dengan nada jembatan kromatik (Walk-ups / Walk-downs) ala gospel",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Teknik khas pengiringan lagu Hymn gereja kontemporer: Mengisi celah antar-akord dengan nada melangkah (passing tones) dan nada kromatik 1 ketukan sebelum akord tujuan. Misalnya dari nada C (I) menuju F (IV) melangkah melewati C -> D -> D# -> E -> F, atau dari G (V) menuju Em (vi) melewati G -> F# -> E. Mengubah pengiringan lagu gereja kuno menjadi hidup, megah, dan berjiwa gospel modern.",
        keyPoints: [
          "Passing note dimainkan singkat (biasanya di ketukan ke-4) tepat sebelum ketukan 1 akord berikutnya jatuh.",
          "Chromatic Walk-Up (D -> D# -> E -> F) memberikan tegangan harmonis manis yang diselesaikan tepat di ketukan 1.",
          "Gunakan teknik ini dengan bijak: jangan over-playing di setiap bar; sisipkan hanya pada momen pergantian kalimat lagu.",
        ],
        practiceSteps: [
          { phase: "Latihan Melangkah Kromatik 1-2-b3-3-4", minutes: 25, instruction: "Mainkan progresi C menuju F dengan melewati nada D, D#, dan E di ketukan 3 & 4." },
          { phase: "Latihan Walk-Down Menuju Minor", minutes: 25, instruction: "Mainkan progresi G menuju Em dengan menyisipkan nada F# di ketukan 4." },
          { phase: "Aplikasi Lagu Di Badai Topan Dunia", minutes: 25, instruction: "Iringi lagu 'Di Badai Topan Dunia' dengan sentuhan walking bass gospel yang dinamis." },
        ],
        visualType: "bass-groove",
        visualCaption: "Chromatic Passing Notes: C (1) → D (2) → D# (&) → E (3) → F (Ketukan 1 Bar Berikutnya)",
        bassNotes: [
          { stringNum: 3, fret: 3, note: "C", role: "Root (Ketukan 1)" },
          { stringNum: 2, fret: 0, note: "D", role: "Scale Tone (2)" },
          { stringNum: 2, fret: 1, note: "D#", role: "Passing Tone (3)" },
          { stringNum: 2, fret: 2, note: "E", role: "Leading Tone (4)" },
        ],
        recommendedSongSlug: "di-badai-topan-dunia",
        recommendedSongTitle: "Di Badai Topan Dunia",
      },
      {
        meetingNumber: 7,
        title: "Locking In dengan Kick Drum & Syncopated Praise Pocket (120+ BPM)",
        subtitle: "Menyatu dengan ketukan drum kick, ghost notes perkusif, dan oktaf funk-drive berenergi",
        durationMinutes: 100,
        theoryMinutes: 20,
        practiceMinutes: 80,
        targetBpm: 124,
        timeSignature: "4/4",
        summary:
          "Hubungan sakral antara Bassist dan Drummer/Cajonist: Setiap kali pedal kick drum terinjak, senar bass harus berbunyi serempak membentuk satu gelombang frekuensi low-end yang solid dan menghentak. Melatih ketukan syncopated 16th note, teknik ghost notes (thump perkusif dengan menyentuh senar tanpa menekan fret), dan variasi oktaf bawah-atas untuk mendorong jemaat bersukacita saat lagu Praise cepat.",
        keyPoints: [
          "Kunci 'Lock In': dengarkan ketukan kick drum, bukan snare atau cymbal. Hentakan bass dan kick drum harus jatuh seperti satu instrumen.",
          "Ghost Notes (nada mati bertanda 'x') memberikan aksen ritmis berderak tanpa mengubah nada harmoni lagu.",
          "Pola oktaf (Root bawah di senar 4/3 dan Root tinggi di senar 2/1 berjarak 2 fret) memberikan energi panggung yang luar biasa.",
        ],
        practiceSteps: [
          { phase: "Simulasi Kick & Bass Sync", minutes: 25, instruction: "Petik nada G sinkron dengan pola kick drum 1 - [ ] - & - 3 - 4 di tempo 124 BPM." },
          { phase: "Latihan Ghost Notes & Oktaf Groove", minutes: 25, instruction: "Sisipkan 1 ghost note sebelum melompat ke nada oktaf tinggi pada akord C dan D." },
          { phase: "Lagu Praise Hari Ini Kurasa Bahagia", minutes: 30, instruction: "Iringi lagu 'Hari Ini Kurasa Bahagia' dengan stamina tinggi dan groove yang mengunci ketukan drum." },
        ],
        visualType: "bass-groove",
        visualCaption: "Praise Octave Groove: G Rendah (Senar 4 Fret 3) → G Tinggi (Senar 2 Fret 5) + Ghost Notes",
        bassNotes: [
          { stringNum: 4, fret: 3, note: "G", role: "Kick Sync 1" },
          { stringNum: 2, fret: 5, note: "G", role: "Octave Pop (&)" },
          { stringNum: 3, fret: 5, note: "D", role: "5th Drive (3)" },
          { stringNum: 4, fret: 3, note: "G", role: "Resolusi (4)" },
        ],
        recommendedSongSlug: "hari-ini-kurasa-bahagia",
        recommendedSongTitle: "Hari Ini Kurasa Bahagia",
      },
      {
        meetingNumber: 8,
        title: "Melodic Worship Fills, 10th Interval Chords & Sustained Sub-Bass",
        subtitle: "Memainkan harmoni 2 senar (10ths), slide melodi manis di akhir baris lirik, dan low-end kokoh",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 66,
        timeSignature: "4/4",
        summary:
          "Menguasai teknik harmoni bass 10th intervals (memetik root di Senar 3/4 dengan ibu jari dan nada ke-10 di Senar 1 dengan jari tengah/telunjuk) yang menghasilkan bunyi akord bass dua senar yang sangat syahdu saat bait lagu worship intim; teknik slide panjang halus dari fret tinggi ke nada dasar; serta cara menahan nada sub-bass terendah di register bawah tanpa membuat audio ruangan gereja berdengung keruh (muddy).",
        keyPoints: [
          "Interval 10th adalah oktaf ditambah nada ke-3 (misal Root C di senar 3 fret 3 dipetik bersama nada E di senar 1 fret 9).",
          "Teknik slide: petik nada dari fret 12 lalu luncurkan jari turun ke fret 3 secara perlahan di akhir bagian bridge.",
          "Pertahankan low-end yang bersih: hindari memainkan terlalu banyak not cepat saat menyentuh senar 4 rendah.",
        ],
        practiceSteps: [
          { phase: "Bentuk Chord 10th Intervals", minutes: 25, instruction: "Petik harmoni C-E dan G-B menggunakan ibu jari kanan dan jari telunjuk/tengah serempak." },
          { phase: "Latihan Melodic Slides & Fills", minutes: 25, instruction: "Mainkan slide turun yang anggun pada detik-detik sebelum masuk ke bagian Chorus." },
          { phase: "Aplikasi Lagu Sampai Akhir Hidupku", minutes: 25, instruction: "Mainkan lagu 'Sampai Akhir Hidupku' dengan sentuhan akord 10th pada bait pertama." },
        ],
        visualType: "bass-fretboard",
        visualCaption: "Bentuk Harmoni 10th Intervals: Root Senar 3 (C) + Nada ke-10 Senar 1 (E di Fret 9)",
        bassNotes: [
          { stringNum: 3, fret: 3, note: "C", role: "Root (Ibu Jari)" },
          { stringNum: 1, fret: 9, note: "E", role: "10th Harmoni (Jari Telunjuk)" },
          { stringNum: 4, fret: 3, note: "G", role: "Root G" },
          { stringNum: 1, fret: 4, note: "B", role: "10th Harmoni G" },
        ],
        recommendedSongSlug: "sampai-akhir-hidupku",
        recommendedSongTitle: "Sampai Akhir Hidupku",
      },
      {
        meetingNumber: 9,
        title: "Nashville Number System (NNS) & Transposisi Kilat di Panggung Ibadah",
        subtitle: "Membaca chart berbasis angka (1 - 4 - 5 - 6m - 5/7) dan transposisi instan tanpa panik",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Standar profesional musisi gereja internasional: Membaca bagan lagu bukan dengan nama chord C-G-Am melainkan pola angka (1 = Root/Do, 4 = Subdominant/Fa, 5 = Dominant/Sol, 6 = Minor/La, 5/7 = Slash Chord Sol/Si). Ketika Worship Leader tiba-tiba berkata 'Ganti nada dasar dari C ke D!', seorang bassist hanya perlu menggeser posisi tangan 2 fret ke atas dan memainkan pola bentuk geometri yang persis sama tanpa perlu menghafal not balok baru.",
        keyPoints: [
          "Bentuk geometri tangga nada di fretboard bass tidak pernah berubah ke mana pun nada dasarnya digeser.",
          "Nada 4 (IV) selalu berada satu senar lebih tipis (lebih tinggi) dari Nada 1 (I) pada fret yang sama.",
          "Nada 5 (V) selalu berada 2 fret di sebelah kanan Nada 4 (IV); Nada 6 (vi) selalu berada 3 fret di sebelah KIRI Nada 1 (I) pada senar yang sama.",
        ],
        practiceSteps: [
          { phase: "Hafal Pola Geometri 1 - 4 - 5 - 6", minutes: 25, instruction: "Mainkan bentuk kotak 1-4-5-6 di kunci C, lalu geser seluruh bentuk 2 fret ke kanan di kunci D." },
          { phase: "Latihan Transposisi Kilat di Metronom", minutes: 25, instruction: "Mainkan progresi angka 1 - 6m - 4 - 5 di kunci C, lalu tanpa berhenti geser ke kunci E di 70 BPM." },
          { phase: "Lagu Kebaikan Tuhan (Goodness of God)", minutes: 25, instruction: "Mainkan lagu 'Kebaikan Tuhan (Goodness of God)' menggunakan bagan chart angka Nashville." },
        ],
        visualType: "bass-fretboard",
        visualCaption: "Geometri Nashville Number System: 1 (Root) · 4 (1 senar lebih tipis, fret sama) · 5 (2 fret di kanan 4) · 6m (3 fret di kiri 1)",
        bassNotes: [
          { stringNum: 3, fret: 3, note: "1 (C)", role: "Root (1)" },
          { stringNum: 2, fret: 3, note: "4 (F)", role: "Subdominant (4)" },
          { stringNum: 2, fret: 5, note: "5 (G)", role: "Dominant (5)" },
          { stringNum: 3, fret: 0, note: "6m (A)", role: "Minor (6m)" },
        ],
        recommendedSongSlug: "kebaikan-tuhan-goodness-of-god",
        recommendedSongTitle: "Kebaikan Tuhan (Goodness of God)",
      },
      {
        meetingNumber: 10,
        title: "Bassist Pelayanan Ibadah: Mengawal Dinamika Rohani & Frekuensi Low-End",
        subtitle: "Seni Tacet (diam di Verse 1), ledakan klimaks di Reff, dan harmonisasi dengan tangan kiri pianis",
        durationMinutes: 110,
        theoryMinutes: 30,
        practiceMinutes: 80,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Kedewasaan bermusik tertinggi seorang pelayan altar: Menguasai seni 'Tacet' (berhenti bermain secara total di Verse 1 dan saat doa Firman agar vokal dan instrumen akustik terdengar intim), lalu masuk menghentak dengan wibawa di Chorus 2. Berkoordinasi dengan pemain keyboard agar tangan kiri keyboardis tidak bermain di register rendah yang sama (menghindari benturan frekuensi sub-bass 40-120 Hz).",
        keyPoints: [
          "Bassist hebat bukan dinilai dari seberapa banyak not yang dipetik, melainkan seberapa tepat nada rendah tersebut menopang hadirat ibadah.",
          "Tacet (diam): ketika vokal sedang membawakan bait yang intim, tahan diri dan dengarkan alur lagu.",
          "Masuk di Chorus 2: awali dengan satu nada root panjang yang bergetar mantap tepat di ketukan 1 bersama hentakan cymbal drum.",
        ],
        practiceSteps: [
          { phase: "Simulasi Tacet ke Entri Dinamis", minutes: 30, instruction: "Latih diam 8 bar saat Verse 1, lalu masuk dengan nada bass berwibawa tepat di ketukan 1 Reff." },
          { phase: "Pembersihan Frekuensi Rendah", minutes: 25, instruction: "Mainkan register Senar 4 & 3 dengan petikan mantap tanpa tumpang tindih dengan akord gitar." },
          { phase: "Simulasi Pelayanan Penuh Walau Ku Tak Dapat Melihat", minutes: 25, instruction: "Kawal lagu 'Walau Ku Tak Dapat Melihat' dengan sensitivitas dinamika ibadah live." },
        ],
        visualType: "bass-groove",
        visualCaption: "Dinamika Low-End Worship: Tacet di Verse 1 → Masuk Menghentak di Reff",
        bassNotes: [
          { stringNum: 4, fret: 3, note: "G", role: "Entri Reff (Ketukan 1)" },
          { stringNum: 3, fret: 2, note: "B", role: "Slash Bass G/B" },
          { stringNum: 3, fret: 3, note: "C", role: "Sustained Low-End" },
          { stringNum: 3, fret: 5, note: "D", role: "Pondasi Harmoni" },
        ],
        recommendedSongSlug: "walau-ku-tak-dapat-melihat",
        recommendedSongTitle: "Walau Ku Tak Dapat Melihat",
      },
    ],
  },

  // ============================================================================
  // 3. KEYBOARD / PIANO (10 PERTEMUAN: 5 FONDASI PADAT + 5 MASTERCLASS GEREJA)
  // ============================================================================
  {
    id: "piano",
    name: "Keyboard / Piano",
    shortName: "Keyboard / Piano",
    specs: "Keyboard 61 / 88 Tuts · Dual Sound Patch & Sustain Pedal",
    totalMeetings: 10,
    durationPerMeeting: "75 – 100 Menit / Pertemuan",
    level: "Pemula ke Pelayanan Gereja",
    overview:
      "Kurikulum piano komprehensif 10 pertemuan: 5 Pertemuan Fondasi Padat (Postur jari mangkok, tuts C-D-E-F-G-A-B, akord mayor/minor, hukum inversi, irama 3/4 & 4/4 arpeggio, pedal sustain bersih, dan slash chord piano) disusul 5 Pertemuan Masterclass Pianis Gereja (Modern worship open-spread voicings ala Sunday Sounds, syncopated praise comping 120+ BPM, sound layering grand piano + warm ambient pad, teknik modulasi jembatan naik nada dasar, serta pembuatan intro berkarakter dan nada panduan vokal bagi Worship Leader).",
    meetings: [
      {
        meetingNumber: 1,
        title: "Postur Jari Mangkok, Peta Tuts Hitam-Putih & Triada Utama C - F - G",
        subtitle: "Posisi tangan melengkung rileks, penomoran jari 1-5, dan pembentukan akord dasar serempak",
        durationMinutes: 80,
        theoryMinutes: 25,
        practiceMinutes: 55,
        targetBpm: 66,
        timeSignature: "4/4",
        summary:
          "Memahami postur duduk tegak di depan keyboard, posisi jari melengkung alami seperti menggenggam bola tenis/mangkok terbalik, navigasi tuts putih berdasarkan kelompok 2 & 3 tuts hitam (Middle C / C4), penomoran jari (1 Jempol hingga 5 Kelingking), serta pembentukan akord triada C (C-E-G), F (F-A-C), dan G (G-B-D) bersama nada root tangan kiri.",
        keyPoints: [
          "Penomoran jari kedua tangan: 1 = Jempol, 2 = Telunjuk, 3 = Tengah, 4 = Manis, 5 = Kelingking.",
          "Cari nada C: tuts putih yang berada tepat di sebelah kiri dua tuts hitam.",
          "Tekan ke-3 tuts chord tangan kanan secara serempak dengan pergelangan tangan yang lemas dan rileks.",
        ],
        practiceSteps: [
          { phase: "Eksplorasi Tuts & Postur Mangkok", minutes: 15, instruction: "Temukan semua nada C di keyboard, latih posisi jari 1-2-3-4-5 melengkung di atas tuts putih C-D-E-F-G." },
          { phase: "Bentuk Triada C, F, G", minutes: 20, instruction: "Bentuk akord C (1-3-5), F (1-3-5), dan G (1-3-5) dengan tangan kanan, tekan bersamaan tanpa suara timpang." },
          { phase: "Koordinasi Tangan Kiri-Kanan", minutes: 20, instruction: "Tangan kiri menekan nada root C di ketukan 1, tangan kanan menekan akord C tiap ketukan bersama metronom 66 BPM." },
        ],
        visualType: "piano-keys",
        visualCaption: "Posisi Tuts Keyboard: Middle C (C4) & Triada Mayor C (C-E-G), F (F-A-C), G (G-B-D)",
        chordsToPractice: ["C", "F", "G"],
        recommendedSongSlug: "amazing-grace",
        recommendedSongTitle: "Amazing Grace",
      },
      {
        meetingNumber: 2,
        title: "Akord Minor (Am, Dm, Em), Inversi Pertama & Kelancaran Dua Tangan",
        subtitle: "Membalik urutan nada (Inversi) agar tangan kanan tidak melompat jauh dan irama 4 ketukan",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Mengenal akord minor (Am, Dm, Em) dan hukum Inversi Akord (misal akord F dibentuk C-F-A bukannya F-A-C dari posisi C-E-G, sehingga tangan kanan hanya menggeser dua jari tanpa harus melompat jauh di atas tuts). Memadukan tangan kiri menahan bass 4 ketukan sementara tangan kanan memainkan akord lembut tiap ketukan.",
        keyPoints: [
          "Inversi membuat perpindahan harmoni terdengar halus, anggun, dan tidak melompat-lompat kasar.",
          "Dari C (C-E-G) ke F (C-F-A): nada C tetap dijempol, jari tengah geser ke F, jari kelingking ke A.",
          "Dari C (C-E-G) ke G (B-D-G): jempol turun ke B, telunjuk di D, kelingking di G.",
        ],
        practiceSteps: [
          { phase: "Latihan Inversi C - F - G", minutes: 25, instruction: "Pindahkan tangan kanan dari C (C-E-G) ke F (C-F-A) lalu ke G (B-D-G) dengan pergerakan jari seminimal mungkin." },
          { phase: "Loop 4 Akord C - Am - F - G", minutes: 20, instruction: "Mainkan progresi 4 akord lagu ibadah di tempo 70 BPM dengan tangan kiri menekan oktaf bass." },
          { phase: "Aplikasi Kuingin Selalu Dekat Pada-Mu", minutes: 20, instruction: "Mainkan lagu 'Kuingin Selalu Dekat Pada-Mu' dari awal sampai bait terakhir." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Inversi Akord Terdekat: C (C-E-G) → F Inversi 2 (C-F-A) → G Inversi 1 (B-D-G)",
        chordsToPractice: ["C", "G", "Am", "F"],
        recommendedSongSlug: "kuingin-selalu-dekat-padamu",
        recommendedSongTitle: "Kuingin Selalu Dekat Pada-Mu",
      },
      {
        meetingNumber: 3,
        title: "Irama Hymn 3/4 (Waltz) & Arpeggio Mengalir Tangan Kiri-Kanan",
        subtitle: "Pola petikan mengalir (Root - 5th - 8ve di tangan kiri) pada sukat 3 ketukan",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 76,
        timeSignature: "3/4",
        summary:
          "Menguasai sukat 3/4 khas lagu-lagu Hymn agung gereja. Tangan kiri memainkan arpeggio terbuka 1 - 5 - 8 (misal nada C - G - C tinggi) secara bergantian pada ketukan 1 - 2 - 3, sementara tangan kanan mengisi akord lembut atau melodi pemanis yang mengalir seperti aliran air sungai yang damai.",
        keyPoints: [
          "Sukat 3/4 dihitung: 1 (Bass Tangan Kiri), 2 (Chord Tangan Kanan), 3 (Chord Tangan Kanan).",
          "Arpeggio 1-5-8 tangan kiri memberikan fondasi luas dan megah tanpa membuat suara keyboard terdengar sempit.",
          "Jaga kestabilan dinamika: ketukan 1 berwibawa, ketukan 2 & 3 mengiringi lembut di latar.",
        ],
        practiceSteps: [
          { phase: "Latihan Arpeggio 1-5-8 Tangan Kiri", minutes: 20, instruction: "Mainkan nada 1 (Jempol) - 5 (Telunjuk) - 8 (Kelingking) pada akord G, C, dan D di sukat 3/4." },
          { phase: "Gabungan Tangan Kanan Lembut", minutes: 25, instruction: "Tangan kanan menekan chord inversi lembut di ketukan 2 dan 3 mengikuti arpeggio tangan kiri." },
          { phase: "Aplikasi How Great Thou Art", minutes: 20, instruction: "Iringi lagu 'How Great Thou Art' dengan arpeggio yang agung dan menyentuh hati." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Arpeggio 3/4 Tangan Kiri: Nada 1 (Root) di Ketukan 1, Nada 5 di Ketukan 2, Nada 8 di Ketukan 3",
        chordsToPractice: ["G", "Em", "C", "D"],
        recommendedSongSlug: "how-great-thou-art",
        recommendedSongTitle: "How Great Thou Art",
      },
      {
        meetingNumber: 4,
        title: "Ketukan Sinkopasi, Sustain Pedal Bersih & Metronom Konsisten",
        subtitle: "Teknik mengangkat dan menginjak sustain pedal tepat saat pergantian akord agar tidak berlumpur",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Menguasai kontrol Sustain Pedal (Damper Pedal) dengan aturan emas 'Up on chord change, down immediately after' (angkat pedal tepat saat jari menekan akord baru, lalu injak kembali seketika) untuk membuang dengungan nada lama sebelum nada baru berbunyi, sehingga suara piano terdengar jernih kristal dan tidak berlumpur (muddy).",
        keyPoints: [
          "Kaki kanan tidak boleh menempel menahan pedal terus-menerus tanpa diangkat saat akord berganti.",
          "Teknik pedal legato: jari menekan tuts baru -> kaki angkat pedal -> kaki langsung injak kembali.",
          "Kunci sinkopasi: tangan kanan memainkan ketukan '&' di antara ketukan metronom 72 BPM.",
        ],
        practiceSteps: [
          { phase: "Latihan Koordinasi Kaki & Tangan", minutes: 25, instruction: "Tekan chord C, ganti ke chord G sambil melatih mengangkat pedal tepat saat tuts G disentuh." },
          { phase: "Sinkronisasi Metronom 72 BPM", minutes: 25, instruction: "Mainkan pola ketukan 4/4 dengan pedal bersih selama 16 bar berturut-turut tanpa jeda suara berlumpur." },
          { phase: "Aplikasi Sentuh Hatiku", minutes: 20, instruction: "Iringi lagu 'Sentuh Hatiku' dengan sustain pedal yang mengalir jernih dan khidmat." },
        ],
        visualType: "piano-keys",
        visualCaption: "Siklus Pedal Bersih: Angkat Kaki Saat Tuts Ditekan → Injak Kembali Seketika",
        chordsToPractice: ["G", "D", "Em", "C"],
        recommendedSongSlug: "sentuh-hatiku",
        recommendedSongTitle: "Sentuh Hatiku",
      },
      {
        meetingNumber: 5,
        title: "Slash Chords (C/E, G/B, F/A) & Evaluasi Pengiringan Lagu Utuh",
        subtitle: "Tangan kiri memainkan nada bass jembatan sementara tangan kanan menahan akord warna",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Menerapkan slash chords pada piano: tangan kiri menekan nada bass pembagi (misal nada E saat chord C/E, nada B saat chord G/B, nada F# saat chord D/F#) sementara tangan kanan memainkan akord warna di register tengah. Menghasilkan alur progresi bassline yang megah dan berkelas, disempurnakan dengan evaluasi 1 lagu utuh.",
        keyPoints: [
          "Tangan kiri memainkan nada tunggal atau oktaf setelah tanda garis miring (Bass Note).",
          "Tangan kanan memainkan bentuk akord di depan tanda garis miring dalam posisi inversi terdekat.",
          "Slash chord menghilangkan lompatan canggung antar-bagian lagu dan menciptakan jembatan harmoni yang mulus.",
        ],
        practiceSteps: [
          { phase: "Latihan Alur Bass G/B - C - D/F#", minutes: 25, instruction: "Tangan kiri memainkan B -> C -> F# sementara tangan kanan menekan G -> C -> D secara harmonis." },
          { phase: "Evaluasi Progresi Hymn Megah", minutes: 25, instruction: "Mainkan rangkaian slash chord bersama metronom 70 BPM dengan pedal teratur." },
          { phase: "Simulasi Lagu Kudus Kudus Kuduslah", minutes: 20, instruction: "Mainkan lagu 'Kudus, Kudus, Kuduslah' dari awal sampai selesai dengan slash chord terpasang sempurna." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Slash Chord Piano: Tangan Kiri Menekan Bass Jembatan (B, E, F#), Kanan Memainkan Akord",
        chordsToPractice: ["G", "G/B", "C", "D/F#"],
        recommendedSongSlug: "holy-holy-holy",
        recommendedSongTitle: "Kudus, Kudus, Kuduslah",
      },
      // --- MASTERCLASS PIANIS GEREJA & WORSHIP TEAM READY (PERTEMUAN 6 - 10) ---
      {
        meetingNumber: 6,
        title: "Modern Worship Open-Spread Voicings (Sus2, Sus4, Add9 ala Sunday Sounds)",
        subtitle: "Meninggalkan triada root position kaku menuju spread voicings 1-5-9 yang megah dan lebar",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Mengadopsi standar emas Sunday Sounds & keyboardist worship internasional: Jangan lagi menekan triada root position C (C-E-G) yang rapat dan terdengar kekanak-kanakan di speaker gereja! Beralihlah ke Open-Spread Voicings: Tangan kiri menekan oktaf 1 dan 5 (C & G rendah), tangan kanan membuka harmoni 2nd, 3rd, 5th, dan 9th (D - E - G untuk Cadd9, atau D - G - A untuk Dsus4). Suara keyboard seketika terdengar megah, lebar, dan mengisi ruangan ibadah tanpa menutupi frekuensi vokal.",
        keyPoints: [
          "Open-Spread Voicing memisahkan nada rendah dan tinggi sejauh mungkin agar tidak terjadi 'frequency masking' yang keruh.",
          "Akord Sus2 dan Add9 menambahkan warna surgawi (shimmering harmonic color) khas lagu-lagu Elevation & Bethel Music.",
          "Tangan kanan cukup menahan satu bentuk cluster nada (misal D - G) sementara tangan kiri berpindah-pindah bass C, G, Em.",
        ],
        practiceSteps: [
          { phase: "Bentuk Spread Csus2, Cadd9, Dsus4", minutes: 25, instruction: "Latih tangan kanan membentuk D-E-G (Cadd9) dan D-G-A (Dsus4) dengan posisi jari rileks." },
          { phase: "Pedal Drone Harmony Latihan", minutes: 25, instruction: "Tangan kanan menahan nada D dan G tetap berdering, sementara tangan kiri memainkan bass C -> Em -> G -> D." },
          { phase: "Aplikasi Lagu Sampai Akhir Hidupku", minutes: 25, instruction: "Iringi lagu 'Sampai Akhir Hidupku' dengan sentuhan open-spread voicings yang luas dan anggun." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Modern Spread Voicing: Kiri Oktaf C-G Rendah, Kanan D4 - E4 - G4 (Cadd9 Spread)",
        chordsToPractice: ["Cadd9", "Dsus4", "Em7", "D/F#"],
        recommendedSongSlug: "sampai-akhir-hidupku",
        recommendedSongTitle: "Sampai Akhir Hidupku",
      },
      {
        meetingNumber: 7,
        title: "Praise Comping Rhythmic & Syncopated Gospel Grooves (120+ BPM)",
        subtitle: "Pola comping staccato tangan kanan di ketukan off-beat ('&'), syncopation 16th-note & fills",
        durationMinutes: 100,
        theoryMinutes: 20,
        practiceMinutes: 80,
        targetBpm: 126,
        timeSignature: "4/4",
        summary:
          "Teknik memainkan lagu Praise bertempo cepat (120-130 BPM): Tangan kiri memukul bass staccato pendek bersama ketukan kick drum, sementara tangan kanan memainkan syncopated chord comping pada ketukan 'dan' (off-beats). Menambahkan sentuhan bluesy/gospel grace notes (sliding cepat dari tuts hitam Eb ke tuts putih E natural) untuk mengobarkan sukacita jemaat saat memuji Tuhan.",
        keyPoints: [
          "Staccato comping: tekan tuts secara renyah dan langsung lepas, jangan menggunakan sustain pedal terus-menerus di lagu cepat agar tidak berisik.",
          "Comping di off-beat ('&') memberikan dorongan groove yang membuat seluruh band terdengar sangat berenergi.",
          "Grace Notes gospel: geser jari telunjuk dari tuts hitam setengah nada di bawahnya ke nada mayor ke-3 akord.",
        ],
        practiceSteps: [
          { phase: "Latihan Off-Beat Comping 100 BPM", minutes: 25, instruction: "Tangan kiri ketukan 1 & 3, tangan kanan menekan akord staccato tepat di ketukan 'dan' (1 & 2 & 3 & 4 &)." },
          { phase: "Naikkan ke 126 BPM + Gospel Grace Notes", minutes: 25, instruction: "Sisipkan sliding tuts hitam Eb ke E pada akord C mayor bersama klik metronom 126 BPM." },
          { phase: "Aplikasi Lagu Bersuka Dalam Tuhan", minutes: 30, instruction: "Mainkan lagu 'Bersuka Dalam Tuhan' dari intro sampai selesai dengan keceriaan ritmis gospel." },
        ],
        visualType: "piano-keys",
        visualCaption: "Praise Comping: Staccato Off-Beat Chords di Ketukan '&' dengan Gospel Grace Notes",
        chordsToPractice: ["G", "C", "D", "Em"],
        recommendedSongSlug: "bersuka-dalam-tuhan",
        recommendedSongTitle: "Bersuka Dalam Tuhan",
      },
      {
        meetingNumber: 8,
        title: "Sound Layering: Acoustic Piano + Ambient Warm Pad + String Swell",
        subtitle: "Setting dual patch, sustain pedal mastery saat altar call/doa pastoral, dan dynamic touch velocity",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 66,
        timeSignature: "4/4",
        summary:
          "Menguasai seni sound designer keyboard gereja: Menggabungkan suara Piano Akustik tajam (70% volume) dengan Ambient Warm Pad / String lembut (30% volume) yang menopang di latar belakang. Mengatur dynamic touch (velocity) tangan agar saat pendeta berdoa atau mengundang jemaat ke altar call, tuts ditekan sangat lembut sehingga hanya suara pad hangat yang membungkus ruangan dengan damai sejahtera.",
        keyPoints: [
          "Layering: Grand Piano memberi ketegasan ritme, Warm Pad mengisi kekosongan frekuensi ruangan gereja.",
          "Saat Altar Call / Doa: tekan tuts dengan velocity sangat ringan (pianissimo) agar getaran pad muncul lembut tanpa suara denting tuts yang mengagetkan.",
          "Pilihlah progresi chord 1 - 4 - 6m - 5 yang menenangkan dan biarkan jemaat fokus berdoa.",
        ],
        practiceSteps: [
          { phase: "Pengaturan Dua Layer Patch", minutes: 20, instruction: "Setel patch Piano di Upper 1 dan Analog Warm Pad di Upper 2, seimbangkan volumenya agar pad tidak menutupi piano." },
          { phase: "Latihan Velocity Pianissimo (Sangat Halus)", minutes: 25, instruction: "Latih menekan tuts tanpa memukul keras, rasakan suara pad mekar perlahan di tempo 66 BPM." },
          { phase: "Simulasi Pengiring Altar Call", minutes: 30, instruction: "Iringi lagu 'Walau Ku Tak Dapat Melihat' dengan nuansa soundscape pad yang khidmat." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Sound Layering: Piano Akustik di Depan + Ambient Warm Pad Menopang di Latar",
        chordsToPractice: ["C", "G/B", "Am", "F"],
        recommendedSongSlug: "walau-ku-tak-dapat-melihat",
        recommendedSongTitle: "Walau Ku Tak Dapat Melihat",
      },
      {
        meetingNumber: 9,
        title: "Teknik Modulasi (Key Change), Medley Transitions & Flow Spontan",
        subtitle: "Menaikkan nada dasar (Key Change) secara elegan dengan akord V/Vsus & transisi antar-lagu tanpa jeda",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Panduan modulasi profesional di panggung gereja: Cara menaikkan lagu dari kunci C ke D (memakai jembatan A7sus4 -> A7), atau dari G ke A (memakai E7sus4 -> E7) pada pengulangan Reff terakhir agar atmosfer ibadah semakin bergelora. Serta teknik memainkan 'Drone Pad' pada nada 1 dan 5 untuk menjembatani pergantian dua lagu dalam satu medley tanpa ada keheningan canggung (awkward silence).",
        keyPoints: [
          "Rumus Modulasi Naik 1 Nada: mainkan akord V (Dominant) dari nada dasar baru di bar terakhir sebelum masuk Reff baru.",
          "Contoh: Mau pindah ke kunci D? Mainkan akord A atau A7sus4 sebagai jembatan penuntun telinga jemaat.",
          "Medley Flow: Saat lagu pertama selesai, tahan nada bass chord berikutnya sambil memainkan melodi intro lagu kedua secara mengalir.",
        ],
        practiceSteps: [
          { phase: "Latihan Jembatan Modulasi Naik 1 Nada", minutes: 25, instruction: "Mainkan progresi Reff di kunci C, selipkan akord A7sus4 di ketukan 3 & 4 bar terakhir, lalu ledakkan Reff di kunci D." },
          { phase: "Latihan Sambung Medley 2 Lagu", minutes: 25, instruction: "Latih transisi dari lagu bait lambat langsung menyambung ke chorus lagu penyembahan berikutnya." },
          { phase: "Lagu Kebaikan Tuhan (Goodness of God)", minutes: 25, instruction: "Mainkan lagu 'Kebaikan Tuhan (Goodness of God)' lengkap dengan modulasi di Chorus penutup." },
        ],
        visualType: "piano-voicing",
        visualCaption: "Jembatan Modulasi: Mainkan Akord Dominant 7 (Vsus) Nada Dasar Baru Sebagai Pintu Masuk",
        chordsToPractice: ["G", "D", "Em", "C"],
        recommendedSongSlug: "kebaikan-tuhan-goodness-of-god",
        recommendedSongTitle: "Kebaikan Tuhan (Goodness of God)",
      },
      {
        meetingNumber: 10,
        title: "Masterclass Pianis Pengiring Gereja: Intro, Cues Vokal & Kepekaan Ibadah",
        subtitle: "Memberikan intro berkarakter, nada panduan vokal bagi WL, komunikasi panggung & tacet",
        durationMinutes: 110,
        theoryMinutes: 30,
        practiceMinutes: 80,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Menjadi pilar musikal utama ibadah: Cara membuat melodi intro 2-4 bar yang tegas sehingga Worship Leader dan jemaat langsung tahu lagu apa dan di nada berapa harus mulai bernyanyi; cara membunyikan single 'cue note' nada pertama vokal di oktaf atas secara terselubung di ketukan terakhir intro; serta etika bermain keyboard di belakang khotbah firman (tidak memainkan lagu terkenal yang mendistraksi pendengar, melainkan melodi chord progresi lambat yang mengalir teduh).",
        keyPoints: [
          "Intro yang baik adalah intro yang memberi aba-aba jelas bagi penyanyi, bukan pamer kecepatan jari yang membingungkan tim.",
          "Cue Note: bunyikan nada suku kata pertama lagu secara manis tepat di ketukan ke-4 sebelum bait pertama dimulai.",
          "Kepekaan roh: ketika Worship Leader mengulang lirik secara spontan, ikuti arah gerak harmoninya dengan akord terbuka.",
        ],
        practiceSteps: [
          { phase: "Membuat Intro 4-Bar yang Terarah", minutes: 30, instruction: "Rancang intro 4 bar dari progresi Chorus lagu Kaulah Segalanya, akhiri dengan nada cue vokal pertama." },
          { phase: "Latihan Mengiringi Narasi / Doa", minutes: 25, instruction: "Mainkan progresi lambat I - V/VII - vi - IV dengan sentuhan pad lembut menopang narasi pembicara." },
          { phase: "Simulasi Penuh Pelayanan Kaulah Segalanya", minutes: 25, instruction: "Mainkan lagu 'Kaulah Segalanya' dari intro, penopang bait, klimaks chorus, hingga outro doa." },
        ],
        visualType: "piano-keys",
        visualCaption: "Pianis Pelayanan: Memberikan Melodi Intro yang Jelas & Cue Note Vokal Pertama",
        chordsToPractice: ["G", "Cadd9", "Dsus4", "Em7"],
        recommendedSongSlug: "kaulah-segalanya",
        recommendedSongTitle: "Kaulah Segalanya",
      },
    ],
  },

  // ============================================================================
  // 4. CAJON / KAHON (10 PERTEMUAN: 5 FONDASI PADAT + 5 MASTERCLASS GEREJA)
  // ============================================================================
  {
    id: "cajon",
    name: "Cajon / Kahon",
    shortName: "Cajon / Kahon",
    specs: "Standar Kayu Tapa · Snare Wire / Guitar String System",
    totalMeetings: 10,
    durationPerMeeting: "75 – 100 Menit / Pertemuan",
    level: "Pemula ke Pelayanan Gereja",
    overview:
      "Kurikulum perkusi cajon 10 pertemuan: 5 Pertemuan Fondasi Padat (Postur ergonomis, pukulan Bass tengah & Slap sudut atas, pola dasar pop ballad 4/4, ghost notes, ketukan 3/4 waltz, dan transisi roll fill-in) disusul 5 Pertemuan Masterclass Perkusionis Gereja (Praise up-tempo 120+ BPM dengan koordinasi kaki foot tambourine/shaker, dinamika ekstrim dari bisikan whispering ke ledakan power, irama 6/8 slow worship megah & gospel shuffle, fill-ins musikal bernafas dengan aksen splash cymbal, serta peran cajon sebagai 'metronom hidup' dan teknik mic-ing sound system gereja).",
    meetings: [
      {
        meetingNumber: 1,
        title: "Postur Duduk Ergonomis, Anatomi Bass (Tengah) & Slap (Bibir Atas)",
        subtitle: "Posisi tulang belakang tegak, pantulan telapak tangan (Bass Duum) & jentikan ruas jari (Slap Tak)",
        durationMinutes: 80,
        theoryMinutes: 25,
        practiceMinutes: 55,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Memahami postur duduk yang benar di atas Cajon (duduk tegak, condongkan sedikit tubuh dari pinggul, jangan membungkuk bulat agar pinggang tidak pegal). Mempelajari dua karakter suara utama: Bass Tone (memukul area tengah papan tapa dengan telapak tangan rata dan langsung dipantulkan instan agar resonansi bass berdentum) dan Slap Tone (jentikan rileks ujung ruas jari di sudut bibir atas kayu tapa menghasilkan bunyi 'crack' renyah seperti snare drum).",
        keyPoints: [
          "Pukulan Bass: telapak tangan rata menyentuh tengah tapa, segera tarik tangan kembali (rebound) seperti memantul di bola karet.",
          "Pukulan Slap: pergelangan tangan rileks, biarkan ujung ruas jari menjentik bibir atas kayu menghasilkan suara garing snare wire.",
          "Jaga punggung tetap tegak dan santai, gunakan bahu dan lengan bawah yang lemas.",
        ],
        practiceSteps: [
          { phase: "Eksplorasi Suara Bass vs Slap", minutes: 20, instruction: "Pukul 10 kali Bass dengan tangan kanan, lalu 10 kali Slap dengan tangan kiri. Bedakan kontras suaranya." },
          { phase: "Latihan Ketukan Bergantian 68 BPM", minutes: 20, instruction: "Nyalakan metronom 68 BPM, mainkan Ketukan 1 (Bass), Ketukan 2 (Slap), Ketukan 3 (Bass), Ketukan 4 (Slap)." },
          { phase: "Aplikasi Ketukan Amazing Grace", minutes: 15, instruction: "Iringi lagu 'Amazing Grace' dengan ketukan bass dan slap yang konsisten." },
        ],
        visualType: "cajon-zones",
        visualCaption: "Anatomi Papan Tapa Cajon: Zona Slap (Sudut Atas) & Zona Bass (Tengah)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "-" },
          { label: "2", hit: "S" },
          { label: "&", hit: "-" },
          { label: "3", hit: "B" },
          { label: "&", hit: "-" },
          { label: "4", hit: "S" },
          { label: "&", hit: "-" },
        ],
        recommendedSongSlug: "amazing-grace",
        recommendedSongTitle: "Amazing Grace",
      },
      {
        meetingNumber: 2,
        title: "Pola Dasar Pop Ballad 4/4 & Ghost Notes (Ketukan Sentuhan Lembut)",
        subtitle: "Membedakan pukulan berbobot dan sentuhan halus ujung jari ('t') pengisi sela ketukan",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Menggabungkan koordinasi tangan kanan (memukul Bass di ketukan 1 dan 3) dan tangan kiri (memukul Slap di ketukan 2 dan 4), diselingi Ghost Note lembut ('t') dengan sentuhan ujung jari telunjuk di sela ketukan '&' untuk menghasilkan aliran groove drum kit yang hidup dan tidak monoton.",
        keyPoints: [
          "Ghost Notes ('t') dimainkan sangat lembut (seperti mengetuk pintu kecil), jangan sekeras pukulan Slap utama.",
          "Pola hitungan: 1 (Bass) - & (ghost) - 2 (Slap) - & (ghost) - 3 (Bass) - & (ghost) - 4 (Slap) - & (ghost).",
          "Kontras dinamika antara pukulan aksen dan ghost note adalah rahasia groove cajon yang berbobot.",
        ],
        practiceSteps: [
          { phase: "Latihan Ghost Note Sentuhan Halus", minutes: 25, instruction: "Sentuh lembut permukaan atas kayu dengan 2 jari tangan kiri pada ketukan '&' tanpa membuat suara snare berderak keras." },
          { phase: "Penggabungan Pola Pop Ballad", minutes: 20, instruction: "Mainkan pola Bass - ghost - Slap - ghost bersama metronom 70 BPM secara stabil." },
          { phase: "Aplikasi Kuingin Selalu Dekat Pada-Mu", minutes: 20, instruction: "Mainkan lagu 'Kuingin Selalu Dekat Pada-Mu' dari awal sampai selesai." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Pola Pop Ballad dengan Ghost Notes: 1(B) - &(t) - 2(S) - &(t) - 3(B) - &(t) - 4(S) - &(t)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "t" },
          { label: "2", hit: "S" },
          { label: "&", hit: "t" },
          { label: "3", hit: "B" },
          { label: "&", hit: "t" },
          { label: "4", hit: "S" },
          { label: "&", hit: "t" },
        ],
        recommendedSongSlug: "kuingin-selalu-dekat-padamu",
        recommendedSongTitle: "Kuingin Selalu Dekat Pada-Mu",
      },
      {
        meetingNumber: 3,
        title: "Irama Hymn 3/4 & Ballad Lambat (Duum - Tak - Tak)",
        subtitle: "Pola 3 ketukan lagu Hymn tradisional (Bass di ketukan 1, Slap lembut di 2 & 3)",
        durationMinutes: 85,
        theoryMinutes: 20,
        practiceMinutes: 65,
        targetBpm: 76,
        timeSignature: "3/4",
        summary:
          "Memainkan irama sukat 3/4 khas lagu-lagu Hymn agung gereja. Ketukan 1 dipukul Bass bulat, diikuti ketukan 2 dan 3 berupa Slap lembut atau ghost taps. Menjaga volume tidak menggelegar kasar agar kekhidmatan suasana doa tetap terjaga.",
        keyPoints: [
          "Sukat 3/4 memiliki ayunan mengalun: Ketukan 1 (Berat / Bass), Ketukan 2 & 3 (Ringan / Slap Halus).",
          "Jangan memukul Slap terlalu tajam di lagu Hymn agar suara piano dan vokal tetap jernih terdengar.",
          "Gunakan gesekan ujung jari (brush stroke) di papan tapa untuk variasi pengiring bait yang syahdu.",
        ],
        practiceSteps: [
          { phase: "Latihan Pola Waltz Duum-Tak-Tak", minutes: 25, instruction: "Pukul Bass di 1, Slap lembut di 2, Slap lembut di 3 di tempo 76 BPM selama 2 menit stabil." },
          { phase: "Variasi Brush Stroke Gesekan Jari", minutes: 20, instruction: "Gesek permukaan kayu tapa di ketukan 2 & 3 menggantikan pukulan slap keras." },
          { phase: "Aplikasi Lagu How Great Thou Art", minutes: 20, instruction: "Iringi lagu 'How Great Thou Art' dengan keagungan irama 3/4 yang stabil." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Pola Sukat 3/4 Hymn: Ketukan 1 (Bass) - Ketukan 2 (Slap) - Ketukan 3 (Slap)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "2", hit: "S" },
          { label: "3", hit: "S" },
        ],
        recommendedSongSlug: "how-great-thou-art",
        recommendedSongTitle: "How Great Thou Art",
      },
      {
        meetingNumber: 4,
        title: "Konsistensi Ketukan Metronom 72 BPM & Kontrol Dinamika",
        subtitle: "Menjaga kestabilan tempo selama 3 menit penuh tanpa mempercepat (rushing) atau melambat (dragging)",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Melatih stamina mental dan fisik seorang cajonist: mendengarkan klik metronom di telinga, bernafas santai, dan mempertahankan tempo yang konsisten saat berpindah dari bagian bait (verse) yang tenang ke bagian refrain (chorus) yang bersemangat tanpa mempercepat ketukan (rushing) karena terbawa emosi lagu.",
        keyPoints: [
          "Kesalahan umum pemula: saat dinamika lagu membesar, tempo sering tanpa sadar ikut bertambah cepat.",
          "Membesarkan volume dilakukan dengan menambah bobot ayunan tangan, BUKAN dengan mempercepat ketukan.",
          "Fokuskan telinga pada klik metronom 72 BPM sebagai jangkar waktu yang mutlak.",
        ],
        practiceSteps: [
          { phase: "Latihan Ketahanan Tempo 3 Menit", minutes: 30, instruction: "Nyalakan metronom 72 BPM, mainkan pola 4/4 tanpa berhenti selama 3 menit penuh tanpa bergeser dari klik." },
          { phase: "Transisi Dinamika Pelan ke Keras", minutes: 20, instruction: "Mainkan 4 bar pelan (Verse) lalu 4 bar keras (Chorus) sambil menjaga ketukan tetap tepat di 72 BPM." },
          { phase: "Aplikasi Lagu Sentuh Hatiku", minutes: 20, instruction: "Iringi lagu 'Sentuh Hatiku' dengan dinamika yang matang dan tempo yang kokoh." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Pola 4/4 Mantap: 1(B) - &(t) - 2(S) - &(B) - 3(B) - &(t) - 4(S) - &(t)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "t" },
          { label: "2", hit: "S" },
          { label: "&", hit: "B" },
          { label: "3", hit: "B" },
          { label: "&", hit: "t" },
          { label: "4", hit: "S" },
          { label: "&", hit: "t" },
        ],
        recommendedSongSlug: "sentuh-hatiku",
        recommendedSongTitle: "Sentuh Hatiku",
      },
      {
        meetingNumber: 5,
        title: "Fill-In Transisi Sederhana (Roll 4 Ketukan) & Pengiringan Utuh",
        subtitle: "Variasi pukulan roll jembatan di bar ke-4 penanda masuknya Chorus & evaluasi 1 lagu lengkap",
        durationMinutes: 90,
        theoryMinutes: 20,
        practiceMinutes: 70,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Mempelajari teknik fill-in dasar: rangkaian pukulan R-L-R-L bergantian dari bass naik ke slap di ketukan 3 & 4 sebelum bar Chorus dimulai sebagai aba-aba penanda bagi seluruh tim musik dan jemaat, serta simulasi mengiringi 1 lagu lengkap dari awal hingga akhir.",
        keyPoints: [
          "Fill-in berfungsi sebagai jembatan tanda aba-aba ('road sign') bahwa lagu akan berpindah bagian.",
          "Kunci fill-in yang baik: ketukan 1 bar baru setelah fill-in HARUS jatuh tepat waktu pada aksen Bass bulat.",
          "Jangan membuat fill-in terlalu rumit yang berisiko membuat tempo berantakan.",
        ],
        practiceSteps: [
          { phase: "Latihan Roll R-L-R-L 4 Ketukan", minutes: 25, instruction: "Mainkan pukulan bergantian R-L-R-L di zona slap pada ketukan 3 & 4, lalu kembali ke Bass di ketukan 1." },
          { phase: "Siklus 3 Bar Groove + 1 Bar Fill-In", minutes: 25, instruction: "Mainkan 3 bar ketukan normal, disusul 1 bar fill-in di bar ke-4 pada tempo 70 BPM." },
          { phase: "Evaluasi Lagu Kudus Kudus Kuduslah", minutes: 20, instruction: "Mainkan lagu 'Kudus, Kudus, Kuduslah' secara utuh dengan variasi fill-in transisi yang rapi." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Fill-In Bar ke-4: 1(B) - &(B) - 2(S) - &(t) - 3(S) - &(S) - 4(S) - &(S) Menuju Bar 1 Baru",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "B" },
          { label: "2", hit: "S" },
          { label: "&", hit: "t" },
          { label: "3", hit: "S" },
          { label: "&", hit: "S" },
          { label: "4", hit: "S" },
          { label: "&", hit: "S" },
        ],
        recommendedSongSlug: "holy-holy-holy",
        recommendedSongTitle: "Kudus, Kudus, Kuduslah",
      },
      // --- MASTERCLASS PERKUSIONIS GEREJA & WORSHIP TEAM READY (PERTEMUAN 6 - 10) ---
      {
        meetingNumber: 6,
        title: "Praise Groove Up-Tempo (120+ BPM) & Foot Tambourine / Shaker Independence",
        subtitle: "Pola 16-beat berenergi tinggi, teknik stroke RLRL efisien & koordinasi kaki memainkan foot tambourine",
        durationMinutes: 100,
        theoryMinutes: 20,
        practiceMinutes: 80,
        targetBpm: 126,
        timeSignature: "4/4",
        summary:
          "Menguasai lagu Praise bertempo cepat (120-130 BPM): Menggunakan teknik pergelangan tangan rileks (wrist strokes) bergantian R-L-R-L agar lengan tidak kram. Melatih kemandirian kaki (foot independence): menghentak kaki kiri yang dipasangi Foot Tambourine pada ketukan 2 dan 4 untuk menirukan suara gemerincing hi-hat/tambourine drum kit asli, memberikan dorongan energi sukacita yang dahsyat bagi jemaat yang sedang memuji Tuhan.",
        keyPoints: [
          "Gunakan pergelangan tangan yang lemas (seperti mencambuk ringan), bukan mengayun seluruh lengan dari bahu.",
          "Foot Tambourine di kaki kiri dihentak tepat di ketukan 2 dan 4 bersamaan dengan pukulan Slap tangan kanan.",
          "Jaga konsistensi hentakan kaki agar irama tidak goyah saat tangan memukul variasi aksen.",
        ],
        practiceSteps: [
          { phase: "Latihan Pergelangan Tangan 16th-Beat", minutes: 25, instruction: "Latih pukulan cepat R-L-R-L di permukaan atas tapa pada tempo 126 BPM selama 2 menit." },
          { phase: "Koordinasi Foot Tambourine Kaki Kiri", minutes: 25, instruction: "Hentakkan kaki kiri di ketukan 2 & 4 bersamaan dengan Slap tangan kanan pada tempo 126 BPM." },
          { phase: "Aplikasi Lagu Bersuka Dalam Tuhan", minutes: 30, instruction: "Iringi lagu 'Bersuka Dalam Tuhan' dari awal hingga bait terakhir dengan energi penuh dan stabil." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Praise Up-Tempo: Tangan Memainkan 16-Beat Drive, Kaki Kiri Menghentak Tambourine di Ketukan 2 & 4",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "e", hit: "t" },
          { label: "&", hit: "B" },
          { label: "a", hit: "t" },
          { label: "2", hit: "S" },
          { label: "e", hit: "t" },
          { label: "&", hit: "t" },
          { label: "a", hit: "t" },
        ],
        recommendedSongSlug: "bersuka-dalam-tuhan",
        recommendedSongTitle: "Bersuka Dalam Tuhan",
      },
      {
        meetingNumber: 7,
        title: "Dinamika Akustik Worship: Dari Whispering Halus ke Ledakan Penuh Power",
        subtitle: "Mengatur kontras volume ekstrim (pianissimo ke fortissimo) & fingertip roll crescendo penanda klimaks",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 68,
        timeSignature: "4/4",
        summary:
          "Dinamika adalah jiwa dari ibadah worship akustik: Pada Verse 1, bermain super bisik (hanya gesekan lembut telapak tangan atau sentuhan ujung jari di kayu samping cajon). Ketika lagu memasuki Chorus 2 dan Bridge, lakukan teknik Fingertip Crescendo Roll (ketukan jari cepat beruntun yang perlahan membesar volumenya dari ppp ke fff) lalu ledakkan pukulan Bass dan Slap penuh di ketukan 1 klimaks lagu!",
        keyPoints: [
          "Whispering (Pianissimo): gunakan gesekan kuku atau bantalan jempol di sudut samping kayu cajon.",
          "Crescendo Roll: rapatkan ke-4 jari tangan kanan-kiri, ketuk bergantian di bibir atas, naikkan volume secara bertahap selama 2 bar.",
          "Puncak Drop Beat: tahan nafas sesaat sebelum ketukan 1 lalu pukul Bass bertenaga bersamaan dengan entri vokal jemaat.",
        ],
        practiceSteps: [
          { phase: "Latihan Whispering & Side Taps", minutes: 25, instruction: "Mainkan ketukan sangat halus di sisi bodi samping cajon di tempo 68 BPM tanpa memicu dengung snare." },
          { phase: "Latihan Crescendo Roll 2 Bar", minutes: 25, instruction: "Mulai roll dari volume paling pelan (bisik) lalu membesar perlahan selama 8 ketukan hingga meledak di ketukan 1." },
          { phase: "Simulasi Lagu Sentuh Hatiku", minutes: 25, instruction: "Kawal lagu 'Sentuh Hatiku' dari Verse yang sangat intim menuju Bridge yang megah berkemenangan." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Dinamika Worship: Verse Whispering Halus → Crescendo Roll → Pukulan Bass Penuh di Refrain",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "-" },
          { label: "2", hit: "t" },
          { label: "&", hit: "t" },
          { label: "3", hit: "B" },
          { label: "&", hit: "B" },
          { label: "4", hit: "S" },
          { label: "&", hit: "-" },
        ],
        recommendedSongSlug: "sentuh-hatiku",
        recommendedSongTitle: "Sentuh Hatiku",
      },
      {
        meetingNumber: 8,
        title: "Irama 6/8 Slow Worship, Triplet & Gospel Shuffle Groove",
        subtitle: "Menguasai sukat 6/8 khas lagu lambat megah (1-2-3-4-5-6) & aksen slap di ketukan 4",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 66,
        timeSignature: "6/8",
        summary:
          "Sangat banyak lagu worship megah kontemporer yang diciptakan dalam sukat 6/8 (seperti Goodness of God, O Praise The Name). Menghitung 1 - 2 - 3 - 4 - 5 - 6: Aksen Bass di ketukan 1, ghost notes halus di ketukan 2 & 3, aksen Slap renyah di ketukan 4, dan ghost notes penutup di ketukan 5 & 6. Ditambah variasi heel-toe slap untuk nuansa gospel shuffle yang berbobot.",
        keyPoints: [
          "Sukat 6/8 memiliki 2 denyut utama per bar: Denyut 1 ada di angka '1' (Bass) dan Denyut 2 ada di angka '4' (Slap).",
          "Hitung di dalam hati: 'SATU-dua-tiga, EMPAT-lima-enam' secara mengayun seperti gelombang laut.",
          "Teknik Heel-Toe: gunakan tumit sepatu menekan bagian bawah tapa cajon untuk mengubah nada bass menjadi lebih tinggi.",
        ],
        practiceSteps: [
          { phase: "Menghitung & Memukul Pola 6/8", minutes: 25, instruction: "Setel metronom ke sukat 6/8 di 66 BPM, pukul Bass di ketukan 1 dan Slap di ketukan 4." },
          { phase: "Mengisi Ghost Notes Triplet (2, 3, 5, 6)", minutes: 25, instruction: "Sentuh ujung jari sangat lembut di sela ketukan untuk mengalirkan denyut triplet yang stabil." },
          { phase: "Lagu Kebaikan Tuhan (Goodness of God)", minutes: 25, instruction: "Mainkan lagu 'Kebaikan Tuhan (Goodness of God)' dengan irama 6/8 yang megah dan berkarakter." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Pola 6/8 Slow Worship: 1(B) - 2(t) - 3(t) - 4(S) - 5(t) - 6(t) (Aksen Utama di 1 & 4)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "2", hit: "t" },
          { label: "3", hit: "t" },
          { label: "4", hit: "S" },
          { label: "5", hit: "t" },
          { label: "6", hit: "t" },
        ],
        recommendedSongSlug: "kebaikan-tuhan-goodness-of-god",
        recommendedSongTitle: "Kebaikan Tuhan (Goodness of God)",
      },
      {
        meetingNumber: 9,
        title: "Fill-Ins Musikal, Aksentuasi Splash Cymbal & Transisi Antar-Bagan",
        subtitle: "Membuat fill-in yang bernafas (tidak egois/menutupi vokal) & teknik aksen perkusi tambahan",
        durationMinutes: 100,
        theoryMinutes: 25,
        practiceMinutes: 75,
        targetBpm: 72,
        timeSignature: "4/4",
        summary:
          "Teknik fill-in profesional: Hindari memukul cajon secara membabi buta saat penyanyi sedang melantunkan lirik! Berikan fill-in 1-2 ketukan hanya saat Worship Leader mengambil nafas di ujung kalimat lirik. Mengintegrasikan pukulan tangan ke mini splash cymbal 10-inch atau cabasa perkusi untuk memberi aksen warna berkilau pada transisi masuk Reff atau penutup lagu.",
        keyPoints: [
          "Prinsip 'Serving the Song': instrumen perkusi bertugas mengantar vokal dan jemaat menyembah, bukan mendistraksi ibadah.",
          "Fill-in yang bernafas: cukup 2 ketukan di akhir bar 4 atau bar 8.",
          "Aksen Splash Cymbal: tepuk bibir mini cymbal dengan ujung jari tepat di ketukan 1 bar baru bersamaan dengan pukulan Bass.",
        ],
        practiceSteps: [
          { phase: "Latihan Fill-In Pendek 2 Ketukan", minutes: 25, instruction: "Mainkan groove di ketukan 1 & 2, lalu lakukan variasi roll pendek di ketukan 3 & 4 kembali ke Bass di 1." },
          { phase: "Integrasi Aksen Tangan Kiri / Cymbal", minutes: 25, instruction: "Tepuk aksen splash/chimes di ketukan 1 transisi chorus di tempo 72 BPM." },
          { phase: "Aplikasi Lagu Sampai Akhir Hidupku", minutes: 25, instruction: "Iringi lagu 'Sampai Akhir Hidupku' dengan fill-in yang musikal dan khidmat." },
        ],
        visualType: "cajon-pattern",
        visualCaption: "Fill-In Musikal 2 Ketukan: 1(B) - &(t) - 2(S) - &(B) - 3(B) - &(S) - 4(S) - &(S)",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "t" },
          { label: "2", hit: "S" },
          { label: "&", hit: "B" },
          { label: "3", hit: "B" },
          { label: "&", hit: "S" },
          { label: "4", hit: "S" },
          { label: "&", hit: "S" },
        ],
        recommendedSongSlug: "sampai-akhir-hidupku",
        recommendedSongTitle: "Sampai Akhir Hidupku",
      },
      {
        meetingNumber: 10,
        title: "Menjadi 'Metronom Hidup' & Fondasi Irama Pelayanan Ibadah Gereja",
        subtitle: "Menjaga stabilitas tempo tim band, mengawal transisi lagu medley & teknik mic-ing sound system",
        durationMinutes: 110,
        theoryMinutes: 30,
        practiceMinutes: 80,
        targetBpm: 70,
        timeSignature: "4/4",
        summary:
          "Tanggung jawab sakral pemain perkusi gereja: Cajonist adalah poros waktu (clock) seluruh tim musik. Teknik menjaga tempo saat pemain gitar/keyboard panik mempercepat lagu; teknik memperlambat tempo (ritardando) secara mulus saat transisi dari lagu Praise cepat melambat turun ke lagu Worship tenang; serta teknik peletakan mikrofon (Mic Shure Beta 91A / Kick Mic di dalam lubang suara belakang untuk bass sub dan Mic Shure SM57 di depan atas untuk snare slap) agar cajon terdengar seperti full acoustic drum kit di sound system gereja.",
        keyPoints: [
          "Cajonist adalah metronom hidup: jika pemain lain terburu-buru, pertahankan ketukan tangan Anda tetap kokoh dan stabil.",
          "Transisi Medley Ritardando: kurangi frekuensi pukulan secara bertahap dalam 4 bar transisi menuju tempo lagu baru.",
          "Teknik Mic-ing: jangan masukkan mic terlalu dalam ke lubang belakang agar suara bass tidak meledak/boomy; arahkan sedikit miring ke dinding dalam.",
        ],
        practiceSteps: [
          { phase: "Simulasi Penjaga Tempo Saat Band Goyang", minutes: 30, instruction: "Pertahankan ketukan 70 BPM stabil meski backtrack vokal mencoba mempercepat tempo." },
          { phase: "Latihan Transisi Medley Ritardando", minutes: 25, instruction: "Latih peralihan dari tempo cepat 126 BPM melambat turun secara halus ke tempo 70 BPM dalam 4 bar." },
          { phase: "Simulasi Penuh Pelayanan Kaulah Segalanya", minutes: 25, instruction: "Kawal lagu 'Kaulah Segalanya' dari intro, dinamika reff, hingga outro doa dengan kepekaan rohani." },
        ],
        visualType: "cajon-zones",
        visualCaption: "Posisi Peletakan Mikrofon Cajon: Mic Bass di Lubang Belakang & Mic Snare di Papan Depan Atas",
        cajonPattern: [
          { label: "1", hit: "B" },
          { label: "&", hit: "t" },
          { label: "2", hit: "S" },
          { label: "&", hit: "B" },
          { label: "3", hit: "B" },
          { label: "&", hit: "t" },
          { label: "4", hit: "S" },
          { label: "&", hit: "t" },
        ],
        recommendedSongSlug: "kaulah-segalanya",
        recommendedSongTitle: "Kaulah Segalanya",
      },
    ],
  },
];

// ============================================================================
// PEDAGOGICAL METADATA HELPER (COMMON MISTAKES, 4-BAR DRILL, CRITERIA, GLOSSARY)
// ============================================================================
export interface MeetingPedagogy {
  commonMistakes: {
    problem: string;
    solution: string;
  }[];
  barDrill: {
    barNumber: number;
    targetLabel: string;
    counts: string[];
    cue: string;
  }[];
  graduationCriteria: string[];
  glossary: {
    term: string;
    meaning: string;
  }[];
}

export function getMeetingPedagogy(
  instrumentId: CourseInstrumentId,
  meeting: CourseMeeting
): MeetingPedagogy {
  const isWorshipMastery = meeting.meetingNumber >= 6;
  const isOddTime = meeting.timeSignature === "3/4";
  const isSixEight = meeting.timeSignature === "6/8";
  const baseCounts = isOddTime
    ? ["1", "2", "3"]
    : isSixEight
    ? ["1", "2", "3", "4", "5", "6"]
    : ["1", "2", "3", "4"];

  const chords = meeting.chordsToPractice || ["C", "G", "Am", "F"];
  const pickChord = (i: number) => chords[i % chords.length];
  const c1 = pickChord(0);
  const c2 = pickChord(1);
  const c3 = pickChord(2);
  const c4 = pickChord(3);

  // 1. GITAR 6 SENAR
  if (instrumentId === "guitar") {
    if (isWorshipMastery) {
      return {
        commonMistakes: [
          {
            problem: "Jari kelingking dan manis ikut terangkat saat berpindah akord di Big G Family (Cadd9, Em7, Dsus4).",
            solution:
              "Kunci permanen Jari 3 dan 4 di Fret 3 Senar 1 & 2. Rasakan kedua jari tersebut seperti dilem kuat di fretboard; hanya gerakkan jari 1 dan 2.",
          },
          {
            problem: "Suara Volume Swell terdengar ada bunyi petikan pick yang kasar di awal atau memekakkan telinga.",
            solution:
              "Petik senar saat knob volume atau volume pedal benar-benar di posisi 0 (senyap), baru putar/injak naik secara halus selama 1-2 detik.",
          },
        ],
        barDrill: [
          {
            barNumber: 1,
            targetLabel: `Voicing ${c1}`,
            counts: baseCounts,
            cue: `Kunci 2 jari bawah · Petik nada bass ${c1} di ketukan 1 dengan open resonance yang megah`,
          },
          {
            barNumber: 2,
            targetLabel: `Voicing ${c2}`,
            counts: baseCounts,
            cue: `Transisi halus menuju ${c2} tanpa mengangkat jari jangkar di Fret 3 senar 1 & 2`,
          },
          {
            barNumber: 3,
            targetLabel: `Voicing ${c3}`,
            counts: baseCounts,
            cue: `Jaga ayunan genjrengan tetap mengalir konstan bersama metronom ${meeting.targetBpm} BPM`,
          },
          {
            barNumber: 4,
            targetLabel: `Voicing ${c4} / Transisi`,
            counts: baseCounts,
            cue: `Siapkan aksen swell atau fill-in manis di ketukan terakhir menuju bar 1`,
          },
        ],
        graduationCriteria: [
          `Mampu memainkan bentuk akord modern worship (${chords.join(", ")}) secara otomatis tanpa mengangkat 2 jari anchor di senar bawah.`,
          `Menguasai teknik dinamika worship (Palm mute di bait, open genjrengan di refrain, dan swell pengantar doa) pada tempo ${meeting.targetBpm} BPM.`,
          `Siap mengiringi lagu "${meeting.recommendedSongTitle}" di tim musik gereja dengan kepekaan dinamika live.`,
        ],
        glossary: [
          {
            term: "Anchor Fingers (Jari Jangkar)",
            meaning: "Teknik menahan jari tertentu (misal Jari 3 & 4 di Fret 3 senar 1-2) tetap menempel saat akord berganti untuk efisiensi dan resonansi sustain yang kaya.",
          },
          {
            term: "Dotted-Eighth Delay",
            meaning: "Efek gema dengan waktu pantulan 3/16 ketukan yang disinkronkan dengan tempo lagu, menghasilkan arpeggio berderap ritmis khas lagu Hillsong & Bethel.",
          },
          {
            term: "Volume Swell",
            meaning: "Teknik memutar volume dari 0 ke 10 setelah senar dipetik untuk menghilangkan bunyi serangan pick dan menirukan pad orkestra strings.",
          },
        ],
      };
    }

    // Fondasi Gitar (Pertemuan 1 - 5)
    return {
      commonMistakes: [
        {
          problem: "Senar mati atau berdengung sengau (buzzing) saat akord ditekan.",
          solution:
            "Pastikan ujung jari menekan senar secara tegak lurus tepat di belakang kawat fret, dan kuku jari tangan kiri dipotong pendek.",
        },
        {
          problem: "Ayunan tangan kanan terhenti setiap kali tangan kiri berpindah akord.",
          solution:
            "Biarkan tangan kanan terus mengayun seperti pendulum jam dinding; lebih baik ada nada lepas sesaat daripada tempo lagu macet.",
        },
      ],
      barDrill: [
        {
          barNumber: 1,
          targetLabel: `Akord ${c1}`,
          counts: baseCounts,
          cue: `Tekan akord ${c1} tepat di ketukan 1 bersama klik metronom`,
        },
        {
          barNumber: 2,
          targetLabel: `Akord ${c2}`,
          counts: baseCounts,
          cue: `Gunakan jari poros untuk bergeser cepat menuju ${c2}`,
        },
        {
          barNumber: 3,
          targetLabel: `Akord ${c3}`,
          counts: baseCounts,
          cue: `Pastikan semua senar berdering jernih tanpa sengau pada ${c3}`,
        },
        {
          barNumber: 4,
          targetLabel: `Akord ${c4}`,
          counts: baseCounts,
          cue: `Bersiap kembali dari ${c4} menuju ${c1} tanpa jeda waktu`,
        },
      ],
      graduationCriteria: [
        `Dapat membentuk dan membunyikan akord ${chords.join(", ")} secara jernih tanpa ada senar yang sengau.`,
        `Dapat berpindah akord tepat waktu mengikuti metronom ${meeting.targetBpm} BPM selama 16 bar berturut-turut.`,
        `Dapat mengiringi lagu "${meeting.recommendedSongTitle}" dari awal hingga akhir dengan posisi duduk yang rileks.`,
      ],
      glossary: [
        {
          term: "Fret (Kawat Pembagi)",
          meaning: "Besi vertikal di leher gitar yang membagi nada per setengah laras (semitone).",
        },
        {
          term: "Pivot Finger (Jari Poros)",
          meaning: "Jari yang tetap menempel atau menjadi poros saat tangan kiri berpindah bentuk akord.",
        },
        {
          term: "Slash Chord (C/E, G/B, D/F#)",
          meaning: "Akord jembatan di mana huruf depan adalah bentuk harmoni dan huruf setelah garis miring adalah nada senar bass terendah.",
        },
      ],
    };
  }

  // 2. BASS 4 SENAR
  if (instrumentId === "bass") {
    const bNotes = meeting.bassNotes?.map((b) => b.note) || chords;
    const b1 = bNotes[0] || "C";
    const b2 = bNotes[1] || "G";
    const b3 = bNotes[2] || "A";
    const b4 = bNotes[3] || "F";

    if (isWorshipMastery) {
      return {
        commonMistakes: [
          {
            problem: "Frekuensi sub-bass bertabrakan dengan tangan kiri pemain piano (sound panggung menjadi keruh/boomy).",
            solution:
              "Koordinasi dengan pianis agar tangan kiri piano tidak bermain di oktaf bass yang sama. Fokuskan tone bass Anda di low-mid yang padat dan terarah.",
          },
          {
            problem: "Terlalu banyak memainkan not cepat saat mengiringi lagu worship lambat (over-playing).",
            solution:
              "Pegang prinsip kedewasaan bassist pelayanan: satu nada root panjang yang berwibawa di ketukan 1 jauh lebih memberkati jemaat daripada solo rumit yang mengganggu doa.",
          },
        ],
        barDrill: [
          {
            barNumber: 1,
            targetLabel: `Pocket Root ${b1}`,
            counts: baseCounts,
            cue: `Petik kokoh ${b1} sinkron persis dengan hentakan kick drum di ketukan 1`,
          },
          {
            barNumber: 2,
            targetLabel: `Pocket Root ${b2}`,
            counts: baseCounts,
            cue: `Gunakan resting stroke dan redam senar atas dengan floating thumb`,
          },
          {
            barNumber: 3,
            targetLabel: `Harmoni / 10th ${b3}`,
            counts: baseCounts,
            cue: `Jaga nada bergetar legato dan stabil bersama metronom ${meeting.targetBpm} BPM`,
          },
          {
            barNumber: 4,
            targetLabel: `Passing Tone ${b4}`,
            counts: baseCounts,
            cue: `Mainkan passing note melangkah di ketukan 4 menuju bar 1 berikutnya`,
          },
        ],
        graduationCriteria: [
          `Mampu bermain 'In the Pocket' (menyatu rapat dengan kick drum) pada tempo ${meeting.targetBpm} BPM tanpa dragging/rushing.`,
          `Memahami alur Nashville Number System dan dapat melakukan transposisi nada dasar instan di panggung.`,
          `Mampu mengawal dinamika lagu "${meeting.recommendedSongTitle}" dari tacet di bait hingga ledakan wibawa di refrain.`,
        ],
        glossary: [
          {
            term: "In the Pocket (Groove Mengunci)",
            meaning: "Kondisi di mana petikan senar bass jatuh serempak persis di atas ketukan kick drum sehingga terdengar seperti satu gelombang bunyi yang solid.",
          },
          {
            term: "Nashville Number System (NNS)",
            meaning: "Metode membaca bagan lagu menggunakan angka 1-7 berdasarkan skala diatonik, memudahkan transposisi kunci secara kilat.",
          },
          {
            term: "Tacet (Diam Total)",
            meaning: "Petunjuk musikal di mana seorang musisi berhenti bermain secara total untuk memberi ruang hening/intim bagi vokal atau instrumen lain.",
          },
        ],
      };
    }

    // Fondasi Bass (Pertemuan 1 - 5)
    return {
      commonMistakes: [
        {
          problem: "Senar tebal lain ikut berdengung liar saat memetik senar di bawahnya.",
          solution:
            "Terapkan Floating Thumb: tempelkan ibu jari kanan di senar 4 (E) saat memetik senar 3, 2, atau 1 untuk meredam dengungannya.",
        },
        {
          problem: "Hanya memetik dengan 1 jari telunjuk saja sehingga cepat pegal di lagu bertempo cepat.",
          solution:
            "Biasakan selalu bergantian Jari Telunjuk (I) dan Jari Tengah (M) seperti langkah kaki berjalan secara teratur.",
        },
      ],
      barDrill: [
        {
          barNumber: 1,
          targetLabel: `Nada ${b1}`,
          counts: baseCounts,
          cue: `Petik tegas nada ${b1} tepat di ketukan 1 bersama aksen metronom`,
        },
        {
          barNumber: 2,
          targetLabel: `Nada ${b2}`,
          counts: baseCounts,
          cue: `Redam senar sebelumnya saat jari berpindah ke nada ${b2}`,
        },
        {
          barNumber: 3,
          targetLabel: `Nada ${b3}`,
          counts: baseCounts,
          cue: `Jaga durasi nada ${b3} tetap bulat utuh dan tidak terpotong`,
        },
        {
          barNumber: 4,
          targetLabel: `Nada ${b4}`,
          counts: baseCounts,
          cue: `Mainkan nada pengantar di ketukan terakhir menuju Bar 1`,
        },
      ],
      graduationCriteria: [
        `Hafal letak fret untuk nada ${bNotes.join(", ")} tanpa perlu melihat fretboard terus-menerus.`,
        `Dapat memetik bergantian (Telunjuk - Tengah) mengikuti metronom ${meeting.targetBpm} BPM selama 3 menit stabil.`,
        `Dapat mengiringi lagu "${meeting.recommendedSongTitle}" tanpa dengungan senar yang bocor.`,
      ],
      glossary: [
        {
          term: "Root Note (Nada Dasar)",
          meaning: "Nada utama yang menjadi fondasi sebuah akord (misal nada G saat band memainkan akord G).",
        },
        {
          term: "Alternating Pluck (I - M)",
          meaning: "Teknik memetik senar bass secara bergantian antara jari telunjuk (Index) dan jari tengah (Middle).",
        },
        {
          term: "Rest Stroke (Petikan Bersandar)",
          meaning: "Teknik petikan di mana setelah memetik senar, jari mendarat bersandar di senar atasnya untuk mematikan dengungan.",
        },
      ],
    };
  }

  // 3. KEYBOARD / PIANO
  if (instrumentId === "piano") {
    if (isWorshipMastery) {
      return {
        commonMistakes: [
          {
            problem: "Suara piano dan warm pad terdengar berlumpur (muddy) dan menutupi doa pembicara.",
            solution:
              "Angkat dan injak kembali pedal sustain tepat saat tangan menekan akord baru. Kurangi volume layer pad hingga maksimal 30% dari volume grand piano.",
          },
          {
            problem: "Memainkan terlalu banyak melodi cepat saat Worship Leader sedang memimpin jemaat menyembah.",
            solution:
              "Keyboardis pengiring harus menahan diri: mainkan open-spread voicings panjang di latar, dan isi fills manis hanya saat penyanyi selesai satu baris lirik.",
          },
        ],
        barDrill: [
          {
            barNumber: 1,
            targetLabel: `Spread ${c1}`,
            counts: baseCounts,
            cue: `Tangan kiri oktaf 1-5 rendah · Tangan kanan spread voicing 1-5-9 ${c1}`,
          },
          {
            barNumber: 2,
            targetLabel: `Spread ${c2}`,
            counts: baseCounts,
            cue: `Angkat pedal saat tuts disentuh, injak kembali seketika pada ${c2}`,
          },
          {
            barNumber: 3,
            targetLabel: `Spread ${c3}`,
            counts: baseCounts,
            cue: `Pertahankan dinamika pianissimo lembut bersama metronom ${meeting.targetBpm} BPM`,
          },
          {
            barNumber: 4,
            targetLabel: `Jembatan / Modulasi ${c4}`,
            counts: baseCounts,
            cue: `Bunyikan cue note vokal manis di register atas sebelum bar 1 kembali dimulai`,
          },
        ],
        graduationCriteria: [
          `Mampu memainkan Open-Spread Voicings (Sus2, Sus4, Add9) dengan suara yang lebar dan jernih di sound system.`,
          `Menguasai teknik layering dual patch (Piano + Ambient Pad) dan kontrol sustain pedal bersih tanpa suara keruh.`,
          `Mampu mengiringi lagu "${meeting.recommendedSongTitle}" dengan melodi intro terarah dan kepekaan dinamika ibadah.`,
        ],
        glossary: [
          {
            term: "Open-Spread Voicing",
            meaning: "Penyusunan nada akord yang dilebarkan lintas oktaf (misal nada 1 di bass bawah, nada 5, 2, dan 3 di register tengah-tinggi) agar tidak menumpuk sempit.",
          },
          {
            term: "Cue Note",
            meaning: "Satu nada panduan yang dibunyikan lembut oleh pianis sebelum lagu dimulai agar penyanyi langsung tahu nada pertama yang harus dinyanyikan.",
          },
          {
            term: "Modulasi (Key Change)",
            meaning: "Teknik menaikkan nada dasar lagu (biasanya naik 1/2 atau 1 nada) di bagian Reff penutup untuk melipatgandakan energi sukacita ibadah.",
          },
        ],
      };
    }

    // Fondasi Piano (Pertemuan 1 - 5)
    return {
      commonMistakes: [
        {
          problem: "Tangan kiri ikut menekan 3 nada rapat seperti tangan kanan sehingga suara terdengar berat dan keruh.",
          solution:
            "Tangan kiri bertugas memainkan nada bass tunggal atau oktaf terendah; biarkan tangan kanan saja yang memainkan akord 3 nada.",
        },
        {
          problem: "Kaki menahan sustain pedal terus-menerus tanpa diangkat saat akord berganti.",
          solution:
            "Angkat sedikit lalu injak kembali pedal tepat setiap kali jari menekan akord baru agar getaran nada lama terhapus.",
        },
      ],
      barDrill: [
        {
          barNumber: 1,
          targetLabel: `Akord ${c1}`,
          counts: baseCounts,
          cue: `Tangan kiri tahan Bass ${c1} di ketukan 1 · Kanan tekan akord ${c1} tiap ketukan`,
        },
        {
          barNumber: 2,
          targetLabel: `Inversi ${c2}`,
          counts: baseCounts,
          cue: `Gunakan inversi terdekat menuju ${c2} agar jari tidak melompat jauh`,
        },
        {
          barNumber: 3,
          targetLabel: `Akord ${c3}`,
          counts: baseCounts,
          cue: `Pastikan ke-3 jari tangan kanan jatuh serempak pada tuts ${c3}`,
        },
        {
          barNumber: 4,
          targetLabel: `Akord ${c4}`,
          counts: baseCounts,
          cue: `Bersiap kembali dari ${c4} menuju ${c1} bersama klik metronom`,
        },
      ],
      graduationCriteria: [
        `Dapat menekan akord ${chords.join(", ")} secara serempak dengan posisi jari melengkung rileks seperti menggenggam bola.`,
        `Tangan kiri (Bass) dan tangan kanan (Harmoni) dapat bermain bersama pada tempo ${meeting.targetBpm} BPM.`,
        `Dapat mengiringi lagu "${meeting.recommendedSongTitle}" dengan perpindahan inversi akord yang halus.`,
      ],
      glossary: [
        {
          term: "Middle C (C4)",
          meaning: "Nada C yang terletak di tengah keyboard piano, menjadi titik patokan pembagian tangan kiri dan tangan kanan.",
        },
        {
          term: "Inversi Akord",
          meaning: "Membalik urutan nada penyusun akord (misal F-A-C menjadi C-F-A) agar jari dapat berpindah dengan jarak pergeseran seminimal mungkin.",
        },
        {
          term: "Sustain Pedal",
          meaning: "Pedal di kaki kanan yang berfungsi memperpanjang getaran suara tuts meski tuts tersebut sudah dilepas oleh jari.",
        },
      ],
    };
  }

  // 4. CAJON / KAHON
  if (isWorshipMastery) {
    return {
      commonMistakes: [
        {
          problem: "Pukulan slap terdengar menggelegar kasar di saat lagu worship sedang dalam suasana hening dan teduh.",
          solution:
            "Kuasai kontrol dinamika: saat bait lagu worship, gunakan hanya sentuhan ujung jari (whispering taps) atau gesekan kuku lembut di sisi kayu samping cajon.",
        },
        {
          problem: "Hentakan Foot Tambourine di kaki kiri meleset atau membuat tempo lagu goyang di lagu cepat 120+ BPM.",
          solution:
            "Latih kaki kiri secara terpisah bersama metronom: hentak tumit tepat di ketukan 2 dan 4 secara konsisten sebelum menggabungkannya dengan pukulan tangan.",
        },
      ],
      barDrill: [
        {
          barNumber: 1,
          targetLabel: "Groove Bar 1",
          counts: baseCounts,
          cue: `Kunci pukulan Bass bulat tepat di ketukan 1 bersama metronom ${meeting.targetBpm} BPM`,
        },
        {
          barNumber: 2,
          targetLabel: "Groove Bar 2",
          counts: baseCounts,
          cue: "Hentak Foot Tambourine tepat bersamaan dengan pukulan Slap di ketukan 2 dan 4",
        },
        {
          barNumber: 3,
          targetLabel: "Groove Bar 3",
          counts: baseCounts,
          cue: "Pertahankan Ghost Notes sentuhan halus di sela ketukan agar irama mengalir hidup",
        },
        {
          barNumber: 4,
          targetLabel: "Transisi / Fill-In",
          counts: baseCounts,
          cue: "Beri aksen crescendo roll di ketukan 3 & 4 penanda masuknya bagian refrain",
        },
      ],
      graduationCriteria: [
        `Mampu menjaga tempo stabil selama 3 menit penuh bersama metronom ${meeting.targetBpm} BPM tanpa dragging atau rushing.`,
        `Menguasai koordinasi kemandirian kaki memainkan Foot Tambourine di ketukan 2 & 4 pada lagu Praise 120+ BPM.`,
        `Mampu mengawal transisi lagu "${meeting.recommendedSongTitle}" dari bisikan lembut hingga ledakan bertenaga di puncak ibadah.`,
      ],
      glossary: [
        {
          term: "Foot Tambourine",
          meaning: "Instrumen perkusi kecil yang dipasang di sepatu, dibunyikan dengan menghentakkan kaki untuk menghasilkan suara gemerincing hi-hat/tambourine.",
        },
        {
          term: "Crescendo Roll",
          meaning: "Rangkaian pukulan cepat jari yang volumenya dinaikkan secara bertahap dari sangat lembut hingga meledak keras untuk menandai klimaks lagu.",
        },
        {
          term: "Ritardando",
          meaning: "Teknik memperlambat tempo secara halus dan teratur di akhir lagu atau pada saat transisi medley menuju lagu worship lambat.",
        },
      ],
    };
  }

  // Fondasi Cajon (Pertemuan 1 - 5)
  return {
    commonMistakes: [
      {
        problem: "Bunyi Bass (Tengah) dan Slap (Atas) terdengar hampir sama / kurang kontras.",
        solution:
          "Untuk Bass, gunakan seluruh telapak tangan rata di bagian tengah dan langsung pantulkan. Untuk Slap, jentikkan hanya ujung ruas jari di bibir sudut paling atas papan kayu.",
      },
      {
        problem: "Pinggang cepat pegal dan tempo makin lama makin bertambah ngebut (rushing).",
        solution:
          "Tegakkan punggung (cukup condongkan sedikit dari pinggul, jangan membungkuk bulat) dan selalu dengarkan ketukan metronom sebelum memukul.",
      },
    ],
    barDrill: [
      {
        barNumber: 1,
        targetLabel: "Groove Bar 1",
        counts: baseCounts,
        cue: "Kunci pukulan Bass (Duum) tepat di ketukan 1 dan Slap (Tak) di ketukan genap",
      },
      {
        barNumber: 2,
        targetLabel: "Groove Bar 2",
        counts: baseCounts,
        cue: "Jaga Ghost Notes ('t') tetap sangat lembut di sela ketukan",
      },
      {
        barNumber: 3,
        targetLabel: "Groove Bar 3",
        counts: baseCounts,
        cue: "Pertahankan kestabilan tempo bersama klik metronom",
      },
      {
        barNumber: 4,
        targetLabel: "Transisi / Fill",
        counts: baseCounts,
        cue: "Beri aksen pengantar di akhir bar sebelum kembali ke ketukan 1",
      },
    ],
    graduationCriteria: [
      "Perbedaan suara antara pukulan Bass (Duum), Slap (Tak), dan Ghost Note (tik) terdengar jelas dan kontras.",
      `Dapat menjaga pola ketukan pertemuan ini selama 2 menit penuh bersama metronom ${meeting.targetBpm} BPM tanpa lari dari tempo.`,
      `Dapat mengiringi lagu "${meeting.recommendedSongTitle}" dari awal hingga akhir dengan postur duduk yang nyaman.`,
    ],
    glossary: [
      {
        term: "Tapa (Papan Depan)",
        meaning: "Permukaan kayu tipis di bagian depan Cajon tempat tangan memukul menghasilkan nada bass dan slap.",
      },
      {
        term: "Ghost Note ('t')",
        meaning: "Sentuhan ujung jari yang sangat lembut di sela ketukan utama untuk mengisi ruang irama agar tidak sepi.",
      },
      {
        term: "Fill-In",
        meaning: "Variasi pukulan jembatan di akhir kalimat lagu sebagai aba-aba tanda masuknya bagian Chorus bagi seluruh tim musik.",
      },
    ],
  };
}
