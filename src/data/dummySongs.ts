import { Song } from "@/types/music";

export const DUMMY_SONGS: Song[] = [
  {
    id: "song-1",
    slug: "langkah-pagi-cerah",
    title: "Langkah Pagi Cerah",
    artist: "Nusantara Acoustic",
    genre: "Folk Pop",
    key: "C",
    bpm: 96,
    timeSignature: "4/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Katalog Orisinal Platform (CC-BY)",
    rightsStatus: "Original Platform",
    coverGradient: "from-emerald-500 via-teal-600 to-cyan-700",
    description:
      "Lagu akustik berirama hangat dengan progresi chord dasar I-V-vi-IV (C - G - Am - F). Sangat cocok untuk latihan perpindahan chord terbuka dan strumming konstan.",
    strummingPattern: "D - D U - U D U",
    arrangements: [
      {
        id: "arr-1-guitar-basic",
        songId: "song-1",
        instrument: "guitar",
        arrangementName: "Strumming Dasar (Pemula)",
        difficulty: "Pemula",
        capo: 0,
        tuning: "Standar (E A D G B E)",
        sections: [
          {
            id: "s1-intro",
            name: "Intro",
            lines: [
              [
                { chord: "C", lyrics: "(Petikan lembut) " },
                { chord: "G", lyrics: "   " },
                { chord: "Am", lyrics: "   " },
                { chord: "F", lyrics: "   " },
              ],
            ],
          },
          {
            id: "s1-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Mentari menyapa " },
                { chord: "G", lyrics: "di balik jendela " },
              ],
              [
                { chord: "Am", lyrics: "Embun pagi jatuh " },
                { chord: "F", lyrics: "membasahi bumi " },
              ],
              [
                { chord: "C", lyrics: "Siapkan langkahmu " },
                { chord: "G", lyrics: "sambut hari baru " },
              ],
              [
                { chord: "Dm", lyrics: "Jangan ragu lagi " },
                { chord: "G", lyrics: "tuk mulai bernyanyi" },
              ],
            ],
          },
          {
            id: "s1-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Melangkah bersama " },
                { chord: "G", lyrics: "menembus awan " },
              ],
              [
                { chord: "Am", lyrics: "Setiap nada indah " },
                { chord: "Em", lyrics: "kita mainkan " },
              ],
              [
                { chord: "F", lyrics: "Walau jalan panjang " },
                { chord: "C", lyrics: "takkan berhenti " },
              ],
              [
                { chord: "Dm", lyrics: "Irama di hati " },
                { chord: "G", lyrics: "menuntun kembali " },
                { chord: "C", lyrics: "pulang." },
              ],
            ],
          },
          {
            id: "s1-bridge",
            name: "Bridge",
            lines: [
              [
                { chord: "Am", lyrics: "Dengarkan detak " },
                { chord: "Em", lyrics: "ketukan waktu " },
              ],
              [
                { chord: "F", lyrics: "Satu dua tiga " },
                { chord: "G7", lyrics: "empat berpadu..." },
              ],
            ],
          },
          {
            id: "s1-outro",
            name: "Outro",
            lines: [
              [
                { chord: "F", lyrics: "Langkah pagi cerah " },
                { chord: "G", lyrics: "selalu bersama " },
                { chord: "C", lyrics: "kita." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-1-guitar-adv",
        songId: "song-1",
        instrument: "guitar",
        arrangementName: "Voicing Slash Chord & 7th (Menengah)",
        difficulty: "Menengah",
        capo: 0,
        tuning: "Standar (E A D G B E)",
        sections: [
          {
            id: "s1-adv-verse",
            name: "Verse 1",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "Mentari menyapa " },
                { chord: "G/B", lyrics: "di balik jendela " },
              ],
              [
                { chord: "Am7", lyrics: "Embun pagi jatuh " },
                { chord: "Fmaj7", lyrics: "membasahi bumi " },
              ],
              [
                { chord: "C", lyrics: "Siapkan langkahmu " },
                { chord: "G/B", lyrics: "sambut hari baru " },
              ],
              [
                { chord: "Dm7", lyrics: "Jangan ragu lagi " },
                { chord: "G7", lyrics: "tuk mulai bernyanyi" },
              ],
            ],
          },
          {
            id: "s1-adv-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "Cadd9", lyrics: "Melangkah bersama " },
                { chord: "G/B", lyrics: "menembus awan " },
              ],
              [
                { chord: "Am7", lyrics: "Setiap nada indah " },
                { chord: "Em7", lyrics: "kita mainkan " },
              ],
              [
                { chord: "Fmaj7", lyrics: "Walau jalan panjang " },
                { chord: "C", lyrics: "takkan berhenti " },
              ],
              [
                { chord: "Dm7", lyrics: "Irama di hati " },
                { chord: "G7", lyrics: "menuntun kembali " },
                { chord: "Cmaj7", lyrics: "pulang." },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "song-2",
    slug: "senja-di-kota-tua",
    title: "Senja di Kota Tua",
    artist: "Bayu & The Groove",
    genre: "Indie Pop / Jazz",
    key: "G",
    bpm: 84,
    timeSignature: "4/4",
    durationSec: 235,
    difficulty: "Menengah",
    instruments: ["guitar", "bass", "piano"],
    source: "Lisensi Mitra Kreatif #LM-2026-08",
    rightsStatus: "Verified Partner",
    coverGradient: "from-amber-500 via-orange-600 to-rose-700",
    description:
      "Nuansa senja yang hangat dengan perpaduan chord Mayor 7, Minor 7, dan transisi D/F#. Sangat ideal untuk melatih kelancaran jari di gitar, walking bass ringan, maupun iringan piano.",
    strummingPattern: "D - D U D U (Swing lembut)",
    arrangements: [
      {
        id: "arr-2-standard",
        songId: "song-2",
        instrument: "guitar",
        arrangementName: "Aransemen Akustik Asli",
        difficulty: "Menengah",
        capo: 0,
        tuning: "Standar (E A D G B E)",
        sections: [
          {
            id: "s2-intro",
            name: "Intro",
            lines: [
              [
                { chord: "G", lyrics: "(Instrumental) " },
                { chord: "D/F#", lyrics: "   " },
                { chord: "Em7", lyrics: "   " },
                { chord: "Cadd9", lyrics: "   " },
              ],
            ],
          },
          {
            id: "s2-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Lampu jalan mulai " },
                { chord: "D/F#", lyrics: "menyala perlahan " },
              ],
              [
                { chord: "Em7", lyrics: "Bayangan memanjang " },
                { chord: "Bm7", lyrics: "di sudut trotoar " },
              ],
              [
                { chord: "C", lyrics: "Kopi hangat tersisa " },
                { chord: "G/B", lyrics: "di meja kayu " },
              ],
              [
                { chord: "Am7", lyrics: "Menemani cerita " },
                { chord: "D7", lyrics: "tentang masa lalu" },
              ],
            ],
          },
          {
            id: "s2-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Di bawah langit jingga " },
                { chord: "Bm7", lyrics: "kota tua berbicara " },
              ],
              [
                { chord: "Em7", lyrics: "Menyimpan sejuta " },
                { chord: "Dm7", lyrics: "kenangan berharga " },
                { chord: "G7", lyrics: " " },
              ],
              [
                { chord: "C", lyrics: "Biarlah angin malam " },
                { chord: "Cm", lyrics: "membawa rindu ini " },
              ],
              [
                { chord: "G", lyrics: "Sampai esok hari " },
                { chord: "D7", lyrics: "kita berjumpa " },
                { chord: "G", lyrics: "lagi." },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "song-3",
    slug: "detak-distorsi-malam",
    title: "Detak Distorsi Malam",
    artist: "Voltase Tinggi",
    genre: "Alternative Rock",
    key: "E",
    bpm: 128,
    timeSignature: "4/4",
    durationSec: 198,
    difficulty: "Menengah",
    instruments: ["guitar", "bass"],
    source: "Katalog Orisinal Platform (CC-BY)",
    rightsStatus: "Original Platform",
    coverGradient: "from-purple-600 via-indigo-700 to-slate-900",
    description:
      "Lagu rock energik untuk melatih ketepatan tempo cepat (128 BPM), riff bass yang tegas di senar E dan A, serta perpindahan chord barre F#m dan B.",
    strummingPattern: "D D D D D D D U (Downstroke Rock 8th Notes)",
    arrangements: [
      {
        id: "arr-3-rock",
        songId: "song-3",
        instrument: "guitar",
        arrangementName: "Rhythm Guitar & Bass Riff",
        difficulty: "Menengah",
        capo: 0,
        tuning: "Standar (E A D G B E)",
        sections: [
          {
            id: "s3-intro",
            name: "Intro",
            lines: [
              [
                { chord: "E", lyrics: "(Riff Gitar & Bass) " },
                { chord: "A", lyrics: "   " },
                { chord: "F#m", lyrics: "   " },
                { chord: "B", lyrics: "   " },
              ],
            ],
          },
          {
            id: "s3-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "E", lyrics: "Suara amplifier " },
                { chord: "G#m", lyrics: "memecah keheningan " },
              ],
              [
                { chord: "C#m", lyrics: "Ketukan drum memacu " },
                { chord: "A", lyrics: "semangat di dada " },
              ],
              [
                { chord: "E", lyrics: "Tak ada kata menyerah " },
                { chord: "B", lyrics: "di atas panggung ini " },
              ],
              [
                { chord: "F#m", lyrics: "Semua mata tertuju " },
                { chord: "B7", lyrics: "pada satu irama!" },
              ],
            ],
          },
          {
            id: "s3-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "A", lyrics: "Nyalakan apimu! " },
                { chord: "B", lyrics: "Jangan pernah padam " },
              ],
              [
                { chord: "G#m", lyrics: "Petik senar itu " },
                { chord: "C#m", lyrics: "sampai batas akhir " },
              ],
              [
                { chord: "F#m", lyrics: "Detak distorsi malam " },
                { chord: "B", lyrics: "menjadi saksi " },
                { chord: "E", lyrics: "kita!" },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "song-4",
    slug: "harmoni-hujan-bulan-juni",
    title: "Harmoni Hujan",
    artist: "Clara Widya",
    genre: "Pop Ballad",
    key: "D",
    bpm: 72,
    timeSignature: "4/4",
    durationSec: 250,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Lisensi Edukasi Musik #EDU-401",
    rightsStatus: "Licensed",
    coverGradient: "from-sky-500 via-blue-600 to-indigo-800",
    description:
      "Ballad pelan dalam nada dasar D Mayor (72 BPM). Sangat cocok bagi pemula piano maupun gitaris yang ingin melatih dinamika lembut dan variasi chord D - Dsus4.",
    strummingPattern: "Arpeggio / Pola 4 Ketukan",
    arrangements: [
      {
        id: "arr-4-ballad",
        songId: "song-4",
        instrument: "piano",
        arrangementName: "Ballad Piano & Gitar Akustik",
        difficulty: "Pemula",
        capo: 0,
        tuning: "Standar",
        sections: [
          {
            id: "s4-intro",
            name: "Intro",
            lines: [
              [
                { chord: "D", lyrics: "(Piano Lembut) " },
                { chord: "Dsus4", lyrics: "   " },
                { chord: "Bm", lyrics: "   " },
                { chord: "G", lyrics: "   " },
              ],
            ],
          },
          {
            id: "s4-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Rintik hujan turun " },
                { chord: "A", lyrics: "menyentuh dedaunan " },
              ],
              [
                { chord: "Bm", lyrics: "Menciptakan melodi " },
                { chord: "F#m", lyrics: "yang menenangkan jiwa " },
              ],
              [
                { chord: "G", lyrics: "Setiap tetesnya " },
                { chord: "D/F#", lyrics: "bagaikan nada " },
              ],
              [
                { chord: "Em", lyrics: "Yang merangkai kisah " },
                { chord: "A7", lyrics: "tanpa suara" },
              ],
            ],
          },
          {
            id: "s4-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Dengarkanlah harmoni " },
                { chord: "A", lyrics: "dari langit kelabu " },
              ],
              [
                { chord: "Bm", lyrics: "Membasuh semua lelah " },
                { chord: "G", lyrics: "yang ada di hatimu " },
              ],
              [
                { chord: "Em", lyrics: "Pelangi kan datang " },
                { chord: "A7", lyrics: "setelah badai berlalu " },
                { chord: "D", lyrics: "tenang." },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "song-5",
    slug: "funky-jakarta-midnight",
    title: "Midnight Groove Jakarta",
    artist: "Kolektif Funk Selatan",
    genre: "Funk / Neo-Soul",
    key: "Am",
    bpm: 108,
    timeSignature: "4/4",
    durationSec: 215,
    difficulty: "Mahir",
    instruments: ["bass", "guitar", "piano"],
    source: "Katalog Orisinal Platform (CC-BY)",
    rightsStatus: "Original Platform",
    coverGradient: "from-fuchsia-600 via-pink-600 to-rose-700",
    description:
      "Progresi minor funky (Am7 - Dm7 - Em7 - E7) untuk melatih sinkopasi 16th-note, slap/fingerstyle bass, serta voicing seventh chord pada gitar dan keyboard.",
    strummingPattern: "Sinkopasi Funk 16th-Note (Mute & Accent)",
    arrangements: [
      {
        id: "arr-5-funk",
        songId: "song-5",
        instrument: "bass",
        arrangementName: "Funk Pocket Groove (Mahir)",
        difficulty: "Mahir",
        capo: 0,
        tuning: "Standar 4-Senar / 6-Senar",
        sections: [
          {
            id: "s5-intro",
            name: "Intro",
            lines: [
              [
                { chord: "Am7", lyrics: "(Bassline Groove Utama) " },
                { chord: "Dm7", lyrics: "   " },
                { chord: "Em7", lyrics: "   " },
                { chord: "E7", lyrics: "   " },
              ],
            ],
          },
          {
            id: "s5-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Am7", lyrics: "Lampu neon berpijar " },
                { chord: "Dm7", lyrics: "di tengah malam kota " },
              ],
              [
                { chord: "G7", lyrics: "Langkah kaki mengikuti " },
                { chord: "Cmaj7", lyrics: "dentuman bass yang dalam " },
              ],
              [
                { chord: "Fmaj7", lyrics: "Jangan biarkan ritme " },
                { chord: "Bm7", lyrics: "terlepas begitu saja " },
              ],
              [
                { chord: "E7", lyrics: "Jaga tempo tetap " },
                { chord: "Am7", lyrics: "di dalam pocket!" },
              ],
            ],
          },
          {
            id: "s5-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "Dm7", lyrics: "Rasakan groove-nya " },
                { chord: "G7", lyrics: "mengalir di jari " },
              ],
              [
                { chord: "Cmaj7", lyrics: "Dari nada rendah " },
                { chord: "Fmaj7", lyrics: "hingga melodi tinggi " },
              ],
              [
                { chord: "Bm7", lyrics: "Midnight Groove Jakarta " },
                { chord: "E7", lyrics: "tak berhenti sampai " },
                { chord: "Am7", lyrics: "pagi!" },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "song-6",
    slug: "waltz-bintang-utara",
    title: "Waltz Bintang Utara",
    artist: "Sore Klasik",
    genre: "Acoustic Waltz",
    key: "F",
    bpm: 114,
    timeSignature: "3/4",
    durationSec: 185,
    difficulty: "Pemula",
    instruments: ["guitar", "piano"],
    source: "Domain Publik / Aransemen Internal",
    rightsStatus: "Public Domain",
    coverGradient: "from-violet-600 via-purple-600 to-blue-700",
    description:
      "Lagu berbirama 3/4 (Waltz: Satu-Dua-Tiga) dalam nada dasar F Mayor. Sangat bagus untuk melatih birama selain 4/4 menggunakan Metronome serta melatih chord F dan Bb.",
    strummingPattern: "Bass - Down - Down (Birama 3/4)",
    arrangements: [
      {
        id: "arr-6-waltz",
        songId: "song-6",
        instrument: "guitar",
        arrangementName: "Waltz 3/4 Standar",
        difficulty: "Pemula",
        capo: 0,
        tuning: "Standar",
        sections: [
          {
            id: "s6-verse1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "Bintang di langit " },
                { chord: "C", lyrics: "utara bersinar " },
              ],
              [
                { chord: "Dm", lyrics: "Menari lembut " },
                { chord: "Am", lyrics: "dalam tiga ketuk " },
              ],
              [
                { chord: "Bb", lyrics: "Satu dua tiga " },
                { chord: "F", lyrics: "berputar perlahan " },
              ],
              [
                { chord: "Gm", lyrics: "Menuju mimpi " },
                { chord: "C7", lyrics: "yang penuh harapan" },
              ],
            ],
          },
          {
            id: "s6-chorus",
            name: "Chorus",
            lines: [
              [
                { chord: "F", lyrics: "Oh bintang malam " },
                { chord: "A7", lyrics: "tunjukkan arahmu " },
              ],
              [
                { chord: "Dm", lyrics: "Di tengah samudra " },
                { chord: "Bb", lyrics: "yang luas membiru " },
              ],
              [
                { chord: "F", lyrics: "Nyanyian waltz ini " },
                { chord: "C7", lyrics: "mengantar tidurmu " },
                { chord: "F", lyrics: "lelap." },
              ],
            ],
          },
        ],
      },
    ],
  },
];
