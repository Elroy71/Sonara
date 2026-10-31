import { Song } from "@/types/music";

export const INDONESIAN_WORSHIP_SONGS: Song[] = [
  // 01. Sentuh Hatiku
  {
    id: "indo-worship-01",
    slug: "sentuh-hatiku",
    title: "Sentuh Hatiku",
    artist: "Sari Simorangkir / Maria Shandi",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 275,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-zinc-900",
    description:
      "Salah satu lagu penyembahan paling dicintai di Indonesia. Mengajarkan penyerahan diri dan pembentukan karakter hati orang percaya seperti emas murni di hadapan Bapa.",
    strummingPattern: "D - D U - U D U (Ballad Worship 4/4)",
    arrangements: [
      {
        id: "indo-worship-01-pemula",
        songId: "indo-worship-01",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Menggunakan 4 akord utama keluarga G (G - Em - C - D). Fokus pada ayunan tangan kanan yang lembut dan tenang.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Betapa ku men-can-" },
                { chord: "Em", lyrics: "tai, se-ga-la yang t'lah ter-" },
                { chord: "C", lyrics: "ja-di di hi-dup-" },
                { chord: "D", lyrics: "ku." },
              ],
              [
                { chord: "G", lyrics: "Tak per-nah sen-di-" },
                { chord: "Em", lyrics: "ri, ja-la-ni hi-dup " },
                { chord: "C", lyrics: "i-ni, s'la-lu me-nyer-" },
                { chord: "D", lyrics: "tai." },
              ],
            ],
          },
          {
            id: "v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "G", lyrics: "Be-ta-pa ku me-nya-da-" },
                { chord: "Em", lyrics: "ri, di da-lam hi-dup-ku " },
                { chord: "C", lyrics: "i-ni, Kau s'la-lu mem-be-" },
                { chord: "D", lyrics: "ri." },
              ],
              [
                { chord: "G", lyrics: "Ran-ca-ngan ter-ba-" },
                { chord: "Em", lyrics: "ik, o-leh kar'na ka-" },
                { chord: "C", lyrics: "sih, Ba-pa me-meluk-" },
                { chord: "D", lyrics: "ku." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ba-pa, sen-tuh ha-ti-" },
                { chord: "Em", lyrics: "ku, u-bah hi-dup-ku men-ja-di yang " },
                { chord: "C", lyrics: "ba-ru." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ba-gai e-mas yang mur-" },
                { chord: "Em", lyrics: "ni, Kau mem-ben-tuk be-ja-na ha-ti-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ba-pa, a-jar-ku me-nger-" },
                { chord: "Em", lyrics: "ti, se-bu-ah ka-sih yang se-la-lu mem-be-" },
                { chord: "C", lyrics: "ri." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ba-gai air meng-a-" },
                { chord: "Em", lyrics: "lir, yang ti-a-da per-nah ber-hen-" },
                { chord: "C", lyrics: "ti." },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-01-mahir",
        songId: "indo-worship-01",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord jembatan D/F#, G/B, Em7, Cadd9, Am7, dan Dsus4 -> D untuk harmoni yang megah dan mengalir anggun.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Betapa ku men-can-" },
                { chord: "D/F#", lyrics: "tai, ", isBridge: true },
                { chord: "Em7", lyrics: "se-ga-la yang t'lah ter-" },
                { chord: "Cadd9", lyrics: "ja-di di hi-dup-" },
                { chord: "Dsus4", lyrics: "ku. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Tak per-nah sen-di-" },
                { chord: "D/F#", lyrics: "ri, ", isBridge: true },
                { chord: "Em7", lyrics: "ja-la-ni hi-dup " },
                { chord: "Cadd9", lyrics: "i-ni, s'la-lu me-nyer-" },
                { chord: "Dsus4", lyrics: "tai.", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ba-pa, sen-tuh ha-ti-" },
                { chord: "D/F#", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "u-bah hi-dup-ku men-ja-di yang " },
                { chord: "Cadd9", lyrics: "ba-ru." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Ba-gai ", isBridge: true },
                { chord: "Cadd9", lyrics: "e-mas yang mur-" },
                { chord: "D/F#", lyrics: "ni, ", isBridge: true },
                { chord: "Em7", lyrics: "Kau mem-ben-tuk be-ja-na ha-ti-" },
                { chord: "Am7", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Ba-pa, a-jar-ku me-nger-" },
                { chord: "D/F#", lyrics: "ti, ", isBridge: true },
                { chord: "Em7", lyrics: "se-bu-ah ka-sih yang se-la-lu mem-be-" },
                { chord: "Cadd9", lyrics: "ri." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Ba-gai ", isBridge: true },
                { chord: "Cadd9", lyrics: "air meng-a-" },
                { chord: "D", lyrics: "lir, yang ti-a-da per-nah ber-hen-" },
                { chord: "G", lyrics: "ti." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 02. Sampai Akhir Hidupku
  {
    id: "indo-worship-02",
    slug: "sampai-akhir-hidupku",
    title: "Sampai Akhir Hidupku",
    artist: "JPCC Worship",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 320,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "JPCC Worship (True Worshippers)",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-amber-950",
    description:
      "Lagu komitmen iman dan kesetiaan melayani Tuhan seumur hidup. Menggunakan progresi terbuka yang sangat pas dipadukan dengan teknik ambient swell dan open-spread voicings.",
    strummingPattern: "D - D U - U D U (Worship Flow 4/4)",
    arrangements: [
      {
        id: "indo-worship-02-pemula",
        songId: "indo-worship-02",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - Em - C - D pada bait, dan C - G - D - Em pada refrain. Mudah dipelajari pemula.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Ba-pa, Eng-kau me-nge-nal-" },
                { chord: "Em", lyrics: "ku, le-bih da-ri si-a-pa " },
                { chord: "C", lyrics: "pun." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Kau ta-hu ce-ri-ta-" },
                { chord: "Em", lyrics: "ku, dan i-si ha-ti-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Tak pe-du-li ma-sa la-lu-" },
                { chord: "Em", lyrics: "ku, Eng-kau te-tap me-mi-lih-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "U-bah ja-lan-" },
                { chord: "Em", lyrics: "ku, mur-ni-kan ha-ti-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Sam-pai ak-hir hi-dup-" },
                { chord: "G", lyrics: "ku, Kau te-tap Al-lah-" },
                { chord: "D", lyrics: "ku." },
                { chord: "Em", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Tak a-da yang da-pat me-mi-sah-kan-" },
                { chord: "G", lyrics: "ku da-ri ka-sih-" },
                { chord: "D", lyrics: "Mu." },
              ],
              [
                { chord: "C", lyrics: "Sam-pai ak-hir hi-dup-" },
                { chord: "G", lyrics: "ku, Kau te-tap Ra-ja-" },
                { chord: "D", lyrics: "ku." },
                { chord: "Em", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Ku mau se-ti-a me-la-ya-ni-" },
                { chord: "D", lyrics: "Mu se-u-mur hi-dup-" },
                { chord: "G", lyrics: "ku." },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-02-mahir",
        songId: "indo-worship-02",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menggunakan akord modern worship open-spread: Cadd9, G/B, Em7, Dsus4, dan A7sus4.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Ba-pa, Eng-kau me-nge-nal-" },
                { chord: "D/F#", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "le-bih da-ri si-a-pa " },
                { chord: "Cadd9", lyrics: "pun." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Kau ta-hu ce-ri-ta-" },
                { chord: "D/F#", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "dan i-si ha-ti-" },
                { chord: "Cadd9", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "Cadd9", lyrics: "Sam-pai ak-hir hi-dup-" },
                { chord: "G/B", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "Kau te-tap Al-lah-" },
                { chord: "Dsus4", lyrics: "ku.", isBridge: true },
              ],
              [
                { chord: "Cadd9", lyrics: "Tak a-da yang da-pat me-mi-sah-kan-" },
                { chord: "G/B", lyrics: "ku da-ri ka-sih-", isBridge: true },
                { chord: "Dsus4", lyrics: "Mu.", isBridge: true },
              ],
              [
                { chord: "Cadd9", lyrics: "Sam-pai ak-hir hi-dup-" },
                { chord: "G/B", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "Kau te-tap Ra-ja-" },
                { chord: "Dsus4", lyrics: "ku.", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Ku mau se-ti-a me-la-ya-ni-" },
                { chord: "Dsus4", lyrics: "Mu se-u-mur hi-dup-", isBridge: true },
                { chord: "G", lyrics: "ku." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 03. Walau Ku Tak Dapat Melihat
  {
    id: "indo-worship-03",
    slug: "walau-ku-tak-dapat-melihat",
    title: "Walau Ku Tak Dapat Melihat",
    artist: "Grezia Epiphania",
    genre: "Worship (Lambat)",
    key: "C",
    bpm: 66,
    timeSignature: "4/4",
    durationSec: 285,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-amber-900",
    description:
      "Lagu kesaksian iman yang mendalam tentang mempercayai rancangan Tuhan yang melampaui penglihatan fisik dan logika manusia.",
    strummingPattern: "D - D U - U D U (Ballad 4/4)",
    arrangements: [
      {
        id: "indo-worship-03-pemula",
        songId: "indo-worship-03",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi C - F - G - Am. Sangat mudah dan cocok untuk pemula.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "C", lyrics: "Ku sa-dar, tak se-mua da-pat a-ku mi-li-" },
                { chord: "F", lyrics: "ki di da-lam hi-dup-" },
                { chord: "G", lyrics: "ku." },
              ],
              [
                { chord: "C", lyrics: "Ha-ti-ku per-ca-ya, ran-ca-ngan-Mu ba-gi-" },
                { chord: "F", lyrics: "ku a-da-lah yang ter-ba-" },
                { chord: "G", lyrics: "ik." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Wa-lau ku tak da-pat me-li-" },
                { chord: "G", lyrics: "hat, se-mua ren-ca-na-Mu Tu-" },
                { chord: "Am", lyrics: "han." },
                { chord: "F", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Na-mun ha-ti-ku te-tap me-man-dang pa-da-" },
                { chord: "G", lyrics: "Mu, Kau se-ga-la-nya ba-gi-" },
                { chord: "C", lyrics: "ku." },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-03-mahir",
        songId: "indo-worship-03",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord C/E, G/B, F/A, Dm7, dan Gsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "C", lyrics: "Ku sa-dar, tak se-mua da-pat a-ku mi-li-" },
                { chord: "C/E", lyrics: "ki ", isBridge: true },
                { chord: "F", lyrics: "di da-lam hi-dup-" },
                { chord: "Gsus4", lyrics: "ku.", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Ha-ti-ku per-ca-ya, ran-ca-ngan-Mu ba-gi-" },
                { chord: "C/E", lyrics: "ku ", isBridge: true },
                { chord: "F", lyrics: "a-da-lah yang ter-ba-" },
                { chord: "Gsus4", lyrics: "ik.", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Wa-lau ku tak da-pat me-li-" },
                { chord: "G/B", lyrics: "hat, ", isBridge: true },
                { chord: "Am7", lyrics: "se-mua ren-ca-na-Mu Tu-" },
                { chord: "Em7", lyrics: "han." },
              ],
              [
                { chord: "F", lyrics: "Na-mun ha-ti-ku te-tap me-man-dang pa-da-" },
                { chord: "Dm7", lyrics: "Mu, Kau se-ga-la-nya ba-gi-" },
                { chord: "Gsus4", lyrics: "ku.", isBridge: true },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 04. Kuingin Selalu Dekat Pada-Mu
  {
    id: "indo-worship-04",
    slug: "kuingin-selalu-dekat-padamu",
    title: "Kuingin Selalu Dekat Pada-Mu",
    artist: "Jonathan Prawira",
    genre: "Worship (Lambat)",
    key: "C",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 250,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-zinc-900",
    description:
      "Lagu kerinduan jiwa untuk senantiasa tinggal di dalam hadirat Tuhan dan menikmati persekutuan yang intim bersama-Nya.",
    strummingPattern: "D - D U - U D U (Worship 4/4)",
    arrangements: [
      {
        id: "indo-worship-04-pemula",
        songId: "indo-worship-04",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi C - Am - F - G. Ideal sebagai lagu pertama bagi pemula instrumen apa pun.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "C", lyrics: "Ku-i-ngin s'la-lu de-kat pa-da-" },
                { chord: "Am", lyrics: "Mu, me-nge-cap ma-nis-nya ka-sih-" },
                { chord: "F", lyrics: "Mu." },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Ting-gal di da-lam ba-it su-ci-" },
                { chord: "Am", lyrics: "Mu, me-nyem-bah-Mu se-u-mur hi-dup-" },
                { chord: "F", lyrics: "ku." },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Di ha-di-rat-Mu ku te-mu-kan da-" },
                { chord: "Am", lyrics: "mai, di ha-di-rat-Mu a-da su-ka-ci-" },
                { chord: "F", lyrics: "ta." },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Kau ke-me-nang-an-ku, Kau ke-ku-at-an-" },
                { chord: "Am", lyrics: "ku, ku-i-ngin s'la-lu ber-sa-ma-" },
                { chord: "G", lyrics: "Mu." },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-04-mahir",
        songId: "indo-worship-04",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord C/E, Am/G, Fmaj7, Dm7, dan Gsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "C", lyrics: "Ku-i-ngin s'la-lu de-kat pa-da-" },
                { chord: "C/E", lyrics: "Mu, ", isBridge: true },
                { chord: "Am7", lyrics: "me-nge-cap ma-nis-nya ka-sih-" },
                { chord: "Fmaj7", lyrics: "Mu." },
                { chord: "Gsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Di ha-di-rat-Mu ku te-mu-kan da-" },
                { chord: "G/B", lyrics: "mai, ", isBridge: true },
                { chord: "Am7", lyrics: "di ha-di-rat-Mu a-da su-ka-ci-" },
                { chord: "Am/G", lyrics: "ta.", isBridge: true },
              ],
              [
                { chord: "F", lyrics: "Kau ke-me-nang-an-ku, Kau ke-ku-at-an-" },
                { chord: "Dm7", lyrics: "ku, ku-i-ngin s'la-lu ber-sa-ma-" },
                { chord: "Gsus4", lyrics: "Mu.", isBridge: true },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 05. Kaulah Segalanya
  {
    id: "indo-worship-05",
    slug: "kaulah-segalanya",
    title: "Kaulah Segalanya",
    artist: "JPCC Worship / Franky Sihombing",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 290,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-amber-950",
    description:
      "Lagu penyembahan agung yang mengakui bahwa Tuhan Yesus adalah segalanya bagi hidup kita, sumber pemulihan dan sukacita sejati.",
    strummingPattern: "D - D U - U D U (Worship Flow 4/4)",
    arrangements: [
      {
        id: "indo-worship-05-pemula",
        songId: "indo-worship-05",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - Em - C - D. Mengalun hangat dan sangat mudah diikuti.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Kau Ba-pa yang meng-a-sih-i-" },
                { chord: "Em", lyrics: "ku, ku-a-sa-Mu me-mu-lih-kan-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ha-ti yang han-cur Kau pu-lih-" },
                { chord: "Em", lyrics: "kan, ku ka-gum a-kan ka-sih-" },
                { chord: "C", lyrics: "Mu." },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Eng-kau Ba-pa-ku yang se-ti-" },
                { chord: "Em", lyrics: "a, tak per-nah ting-gal-kan-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Kau-lah se-ga-la-nya ba-gi-" },
                { chord: "Em", lyrics: "ku, ku sem-bah Kau Ye-sus Tu-" },
                { chord: "C", lyrics: "han." },
                { chord: "D", lyrics: "" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-05-mahir",
        songId: "indo-worship-05",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord D/F#, G/B, Cadd9, Em7, dan Dsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Kau Ba-pa yang meng-a-sih-i-" },
                { chord: "D/F#", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "ku-a-sa-Mu me-mu-lih-kan-" },
                { chord: "Cadd9", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Eng-kau Ba-pa-ku yang se-ti-" },
                { chord: "D/F#", lyrics: "a, ", isBridge: true },
                { chord: "Em7", lyrics: "tak per-nah ting-gal-kan-" },
                { chord: "Cadd9", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Kau-lah ", isBridge: true },
                { chord: "Cadd9", lyrics: "se-ga-la-nya ba-gi-" },
                { chord: "Dsus4", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "ku sem-bah Kau Ye-sus Tu-" },
                { chord: "Am7", lyrics: "han." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 06. Besar Anugerah-Mu
  {
    id: "indo-worship-06",
    slug: "besar-anugerah-mu",
    title: "Besar Anugerah-Mu",
    artist: "JPCC Worship",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 310,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "JPCC Worship",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-stone-900",
    description:
      "Lagu penyembahan tentang anugerah keselamatan cuma-cuma yang dianugerahkan Bapa bagi setiap orang yang percaya.",
    strummingPattern: "D - D U - U D U (Ballad 4/4)",
    arrangements: [
      {
        id: "indo-worship-06-pemula",
        songId: "indo-worship-06",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - Em - C - D. Sangat ramah untuk pemula.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ku a-da se-ba-gai-ma-na ku a-" },
                { chord: "Em", lyrics: "da, ber-di-ri meng-ha-dap takh-ta-Mu Ba-" },
                { chord: "C", lyrics: "pa." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Se-mua kar'na a-nu-ge-rah-" },
                { chord: "Em", lyrics: "Mu yang t'lah s'la-mat-kan-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ku hi-dup o-leh a-nu-ge-rah-" },
                { chord: "Em", lyrics: "Mu, yang ter-ba-ik ku tr'i-ma da-ri-" },
                { chord: "C", lyrics: "Mu." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ran-ca-ngan-Mu in-dah ba-gi-" },
                { chord: "Em", lyrics: "ku, kar-ya-Mu sem-pur-na di hi-dup-" },
                { chord: "C", lyrics: "ku." },
                { chord: "D", lyrics: "" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-06-mahir",
        songId: "indo-worship-06",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord D/F#, G/B, Cadd9, Em7, dan Dsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ku a-da se-ba-gai-ma-na ku a-" },
                { chord: "D/F#", lyrics: "da, ", isBridge: true },
                { chord: "Em7", lyrics: "ber-di-ri meng-ha-dap takh-ta-Mu Ba-" },
                { chord: "Cadd9", lyrics: "pa." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ku hi-dup o-leh a-nu-ge-rah-" },
                { chord: "D/F#", lyrics: "Mu, ", isBridge: true },
                { chord: "Em7", lyrics: "yang ter-ba-ik ku tr'i-ma da-ri-" },
                { chord: "Cadd9", lyrics: "Mu." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Ran-ca-ngan-Mu ", isBridge: true },
                { chord: "Cadd9", lyrics: "in-dah ba-gi-" },
                { chord: "Dsus4", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "kar-ya-Mu sem-pur-na di hi-dup-" },
                { chord: "Am7", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 07. Bagi Tuhan Tak Ada Yang Mustahil
  {
    id: "indo-worship-07",
    slug: "bagi-tuhan-tak-ada-yang-mustahil",
    title: "Bagi Tuhan Tak Ada Yang Mustahil",
    artist: "Sari Simorangkir",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 72,
    timeSignature: "4/4",
    durationSec: 280,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-amber-900",
    description:
      "Lagu penyembahan penuh kuasa dan deklarasi iman bahwa tidak ada perkara yang mustahil bagi Tuhan.",
    strummingPattern: "D - D U - U D U (Worship 4/4)",
    arrangements: [
      {
        id: "indo-worship-07-pemula",
        songId: "indo-worship-07",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - Em - C - D. Mudah dimainkan oleh pemula.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ku ya-kin sa-at Kau ber-fir-" },
                { chord: "Em", lyrics: "man, ku me-nang sa-at Kau ber-tin-" },
                { chord: "C", lyrics: "dak." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Hi-dup-ku han-ya di-ten-tu-" },
                { chord: "Em", lyrics: "kan o-leh ku-a-sa-" },
                { chord: "C", lyrics: "Mu." },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ba-gi Tu-han tak a-da yang mus-ta-" },
                { chord: "Em", lyrics: "hil, ba-gi Tu-han tak a-da yang tak mung-" },
                { chord: "C", lyrics: "kin." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Muk-ji-zat-Nya di-se-di-a-kan ba-gi-" },
                { chord: "Em", lyrics: "ku, ku di-ang-kat dan di-pu-lih-kan-" },
                { chord: "C", lyrics: "Nya." },
                { chord: "D", lyrics: "" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-07-mahir",
        songId: "indo-worship-07",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord D/F#, G/B, Cadd9, Em7, dan Dsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ku ya-kin sa-at Kau ber-fir-" },
                { chord: "D/F#", lyrics: "man, ", isBridge: true },
                { chord: "Em7", lyrics: "ku me-nang sa-at Kau ber-tin-" },
                { chord: "Cadd9", lyrics: "dak." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ba-gi Tu-han tak a-da yang mus-ta-" },
                { chord: "D/F#", lyrics: "hil, ", isBridge: true },
                { chord: "Em7", lyrics: "ba-gi Tu-han tak a-da yang tak mung-" },
                { chord: "Cadd9", lyrics: "kin." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Muk-ji-zat-Nya ", isBridge: true },
                { chord: "Cadd9", lyrics: "di-se-di-a-kan ba-gi-" },
                { chord: "Dsus4", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "ku di-ang-kat dan di-pu-lih-kan-" },
                { chord: "Am7", lyrics: "Nya." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 08. Kebaikan Tuhan (Goodness of God versi Indonesia)
  {
    id: "indo-worship-08",
    slug: "kebaikan-tuhan-goodness-of-god",
    title: "Kebaikan Tuhan (Goodness of God)",
    artist: "Bethel Music / Terjemahan Rohani Indonesia",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 300,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-stone-900",
    description:
      "Versi bahasa Indonesia dari lagu worship monumental Goodness of God. Mengungkapkan rasa syukur atas kesetiaan dan kebaikan Tuhan yang senantiasa mengejar dan menyertai hidup kita.",
    strummingPattern: "D - D U - U D U (Worship Flow 4/4)",
    arrangements: [
      {
        id: "indo-worship-08-pemula",
        songId: "indo-worship-08",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - C - D - Em di tempo 70 BPM. Sangat ramah pemula.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Ku meng-a-sih-i-Mu, rah-mat-Mu tak per-nah ga-" },
                { chord: "C", lyrics: "gal." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "S'pan-jang hi-dup-ku, a-da da-lam ta-ngan-" },
                { chord: "Em", lyrics: "Mu." },
                { chord: "C", lyrics: "" },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Em", lyrics: "Da-ri pa-gi ter-bit hing-ga ma-lam ti-" },
                { chord: "C", lyrics: "ba, " },
                { chord: "G", lyrics: "ku mau me-nya-nyi-kan ke-ba-ik-an-" },
                { chord: "D", lyrics: "Mu." },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "C", lyrics: "S'la-lu Kau se-ti-" },
                { chord: "G", lyrics: "a, s'la-lu Kau ba-" },
                { chord: "D", lyrics: "ik." },
              ],
              [
                { chord: "C", lyrics: "Se-ti-ap na-fas yang ku he-mus-kan da-ri-" },
                { chord: "G", lyrics: "Mu, " },
                { chord: "D", lyrics: "ku mau me-nya-nyi-kan ke-ba-ik-an Tu-" },
                { chord: "G", lyrics: "han." },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-worship-08-mahir",
        songId: "indo-worship-08",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord G/B, D/F#, Cadd9, Em7, dan Dsus4.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Ku meng-a-sih-i-Mu, rah-mat-Mu tak per-nah ga-" },
                { chord: "Cadd9", lyrics: "gal." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "S'pan-jang ", isBridge: true },
                { chord: "Em7", lyrics: "hi-dup-ku, a-da da-lam ta-ngan-" },
                { chord: "Cadd9", lyrics: "Mu." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Da-ri pa-gi ter-bit hing-ga ma-lam ti-" },
                { chord: "Cadd9", lyrics: "ba, " },
                { chord: "G/B", lyrics: "ku mau me-nya-nyi-kan ", isBridge: true },
                { chord: "Dsus4", lyrics: "ke-ba-ik-an-", isBridge: true },
                { chord: "G", lyrics: "Mu." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "Cadd9", lyrics: "S'la-lu Kau se-ti-" },
                { chord: "G/B", lyrics: "a, ", isBridge: true },
                { chord: "Dsus4", lyrics: "s'la-lu Kau ba-", isBridge: true },
                { chord: "Em7", lyrics: "ik." },
              ],
              [
                { chord: "Cadd9", lyrics: "Se-ti-ap na-fas yang ku he-mus-kan da-ri-" },
                { chord: "G/B", lyrics: "Mu, ", isBridge: true },
                { chord: "Dsus4", lyrics: "ku mau me-nya-nyi-kan ke-ba-ik-an Tu-", isBridge: true },
                { chord: "G", lyrics: "han." },
              ],
            ],
          },
        ],
      },
    ],
  },
];

export const INDONESIAN_PRAISE_SONGS: Song[] = [
  // 08. Bersuka Dalam Tuhan
  {
    id: "indo-praise-01",
    slug: "bersuka-dalam-tuhan",
    title: "Bersuka Dalam Tuhan",
    artist: "Symphony Music / Franky Sihombing",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 126,
    timeSignature: "4/4",
    durationSec: 235,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-800 to-zinc-900",
    description:
      "Lagu pujian up-tempo penuh sukacita dan sorak-sorai kemenangan. Sangat ideal untuk melatih percussive strumming pada gitar, foot tambourine pada cajon, dan comping gospel pada piano.",
    strummingPattern: "D U D U D U D U (Praise Up-Tempo 16th Drive)",
    arrangements: [
      {
        id: "indo-praise-01-pemula",
        songId: "indo-praise-01",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - C - D - Em di tempo 126 BPM. Fokus menjaga kestabilan tempo.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ha-ri i-ni ha-ri yang te-lah di-ja-di-kan Tu-" },
                { chord: "C", lyrics: "han, ma-ri ki-ta ber-su-ka di da-lam-" },
                { chord: "D", lyrics: "Nya." },
              ],
              [
                { chord: "G", lyrics: "Ha-ri i-ni ha-ri yang te-lah di-ja-di-kan Tu-" },
                { chord: "C", lyrics: "han, ma-ri ki-ta ber-su-ka di da-lam-" },
                { chord: "D", lyrics: "Nya." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ber-su-ka da-lam Tu-han, ma-ri ber-su-" },
                { chord: "C", lyrics: "ka!" },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Ber-su-ka da-lam Tu-han, ma-ri ber-su-" },
                { chord: "C", lyrics: "ka!" },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Em", lyrics: "Ra-ya-kan ke-ba-ik-an-Nya, nya-ta-kan ke-me-nang-an-" },
                { chord: "C", lyrics: "Nya, ber-su-ka di da-lam Tu-" },
                { chord: "D", lyrics: "han!" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-praise-01-mahir",
        songId: "indo-praise-01",
        instrument: "cajon",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Percussion Pitch",
        notesSummary:
          "Menambahkan aksen snare chak pada ketukan 2 & 4, percussive mute, dan fill-in roll.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ha-ri i-ni ha-ri yang te-lah di-ja-di-kan Tu-" },
                { chord: "G/B", lyrics: "han, ", isBridge: true },
                { chord: "C", lyrics: "ma-ri ki-ta ber-su-ka di da-lam-" },
                { chord: "D", lyrics: "Nya." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ber-su-ka da-lam Tu-han, ma-ri ber-su-" },
                { chord: "C", lyrics: "ka!" },
                { chord: "D/F#", lyrics: "", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Ra-ya-kan ke-ba-ik-an-Nya, nya-ta-kan ke-me-nang-an-" },
                { chord: "Cadd9", lyrics: "Nya, ber-su-ka di da-lam Tu-" },
                { chord: "Dsus4", lyrics: "han!", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 09. Hari Ini Kurasa Bahagia
  {
    id: "indo-praise-02",
    slug: "hari-ini-kurasa-bahagia",
    title: "Hari Ini Kurasa Bahagia",
    artist: "Lagu Rohani Populer Indonesia",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 124,
    timeSignature: "4/4",
    durationSec: 220,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Lagu Rohani Populer Indonesia",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-stone-900",
    description:
      "Lagu persekutuan dan sukacita kebersamaan tubuh Kristus yang sangat akrab di telinga seluruh jemaat gereja di Indonesia.",
    strummingPattern: "D - D U D - D U (Praise Shorter 4/4)",
    arrangements: [
      {
        id: "indo-praise-02-pemula",
        songId: "indo-praise-02",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - C - D - Em di tempo ceria 124 BPM.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ha-ri i-ni ku-ra-sa ba-ha-gi-" },
                { chord: "C", lyrics: "a, ber-kum-pul ber-sa-ma sau-da-ra se-i-" },
                { chord: "D", lyrics: "man." },
              ],
              [
                { chord: "G", lyrics: "Tu-han Ye-sus t'lah sa-tu-kan ki-" },
                { chord: "C", lyrics: "ta, tan-pa me-man-dang di an-ta-ra ki-" },
                { chord: "D", lyrics: "ta." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ber-gan-deng-an ta-ngan da-lam ka-" },
                { chord: "C", lyrics: "sih, da-lam sa-tu ha-" },
                { chord: "D", lyrics: "ti." },
              ],
              [
                { chord: "G", lyrics: "Ber-ja-lan da-lam te-rang ka-sih Tu-" },
                { chord: "D", lyrics: "han." },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Kau sa-ha-bat-ku, kau sau-da-ra-" },
                { chord: "G", lyrics: "ku, ti-a-da yang da-pat me-mi-sah-kan ki-" },
                { chord: "D", lyrics: "ta." },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-praise-02-mahir",
        songId: "indo-praise-02",
        instrument: "bass",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan groove funk-praise oktaf, ghost notes, dan slash chord G/B & D/F#.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Ha-ri i-ni ku-ra-sa ba-ha-gi-" },
                { chord: "G/B", lyrics: "a, ", isBridge: true },
                { chord: "C", lyrics: "ber-kum-pul ber-sa-ma sau-da-ra se-i-" },
                { chord: "D", lyrics: "man." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Ber-gan-deng-an ta-ngan da-lam ka-" },
                { chord: "D/F#", lyrics: "sih, ", isBridge: true },
                { chord: "Em7", lyrics: "da-lam sa-tu ha-" },
                { chord: "D", lyrics: "ti." },
              ],
              [
                { chord: "Cadd9", lyrics: "Kau sa-ha-bat-ku, kau sau-da-ra-" },
                { chord: "G/B", lyrics: "ku, ", isBridge: true },
                { chord: "Am7", lyrics: "ti-a-da yang da-pat me-mi-sah-kan ki-" },
                { chord: "Dsus4", lyrics: "ta.", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 10. Allah Sumber Kuatku
  {
    id: "indo-praise-03",
    slug: "allah-sumber-kuatku",
    title: "Allah Sumber Kuatku",
    artist: "JPCC Worship",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 128,
    timeSignature: "4/4",
    durationSec: 245,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "JPCC Worship",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-zinc-900",
    description:
      "Lagu pujian bertempo tinggi yang penuh ketegasan iman bahwa Allah adalah benteng dan bagian hidup kita selama-lamanya.",
    strummingPattern: "D U D U D U D U (Up-Tempo Drive 4/4)",
    arrangements: [
      {
        id: "indo-praise-03-pemula",
        songId: "indo-praise-03",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - C - Em - D. Sangat berenergi dan mantap.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Han-ya Kau mi-lik-ku di sur-" },
                { chord: "C", lyrics: "ga, ti-a-da yang ku-i-ngi-ni di bu-mi han-ya " },
                { chord: "D", lyrics: "Kau." },
              ],
              [
                { chord: "G", lyrics: "Tak ku an-dal-kan ke-ku-at-an-" },
                { chord: "C", lyrics: "ku, na-mun Kau yang me-no-pang-" },
                { chord: "D", lyrics: "ku." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Al-lah sum-ber ku-at-" },
                { chord: "C", lyrics: "ku, Al-lah sum-ber ku-at-" },
                { chord: "D", lyrics: "ku." },
              ],
              [
                { chord: "Em", lyrics: "Al-lah sum-ber ku-at-ku dan ba-gi-an-" },
                { chord: "C", lyrics: "ku s'la-ma-la-ma-" },
                { chord: "D", lyrics: "nya!" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-praise-03-mahir",
        songId: "indo-praise-03",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord D/F#, G/B, Cadd9, dan syncopated gospel comping.",
        sections: [
          {
            id: "v1",
            name: "Verse",
            lines: [
              [
                { chord: "G", lyrics: "Han-ya Kau mi-lik-ku di sur-" },
                { chord: "D/F#", lyrics: "ga, ", isBridge: true },
                { chord: "Em7", lyrics: "ti-a-da yang ku-i-ngi-ni di bu-mi han-ya " },
                { chord: "Cadd9", lyrics: "Kau." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Al-lah sum-ber ku-at-" },
                { chord: "D/F#", lyrics: "ku, ", isBridge: true },
                { chord: "Em7", lyrics: "Al-lah sum-ber ku-at-" },
                { chord: "Cadd9", lyrics: "ku." },
                { chord: "Dsus4", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "Al-lah sum-ber ", isBridge: true },
                { chord: "Cadd9", lyrics: "ku-at-ku dan ba-gi-an-" },
                { chord: "Dsus4", lyrics: "ku s'la-ma-la-ma-", isBridge: true },
                { chord: "G", lyrics: "nya!" },
              ],
            ],
          },
        ],
      },
    ],
  },
];

export const INDONESIAN_HYMN_SONGS: Song[] = [
  // 11. Di Badai Topan Dunia (Kidung Jemaat 440)
  {
    id: "indo-hymn-01",
    slug: "di-badai-topan-dunia",
    title: "Di Badai Topan Dunia",
    artist: "Kidung Jemaat 440 / Ira D. Sankey",
    genre: "Hymn",
    key: "C",
    bpm: 72,
    timeSignature: "4/4",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Kidung Jemaat No. 440",
    rightsStatus: "Public Domain",
    coverGradient: "from-amber-950 to-zinc-900",
    description:
      "Lagu himne agung legendaris yang menegaskan bahwa Yesus adalah Gunung Batu tempat perlindungan yang teguh di tengah badai kehidupan.",
    strummingPattern: "D - D U - U D U (Hymn 4/4)",
    arrangements: [
      {
        id: "indo-hymn-01-pemula",
        songId: "indo-hymn-01",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi C - F - G. Sangat khidmat dan agung.",
        sections: [
          {
            id: "v1",
            name: "Bait 1",
            lines: [
              [
                { chord: "C", lyrics: "Di ba-dai to-pan du-ni-a Tu-han-lah per-lin-dung-an-" },
                { chord: "G", lyrics: "mu." },
              ],
              [
                { chord: "C", lyrics: "Ken-da-ti gon-cang se-mes-ta Tu-han-lah per-lin-dung-an-" },
                { chord: "G", lyrics: "mu." },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Ya, Ye-sus Gu-nung Ba-tu di du-ni-" },
                { chord: "F", lyrics: "a, di du-ni-" },
                { chord: "C", lyrics: "a, di du-ni-" },
                { chord: "G", lyrics: "a." },
              ],
              [
                { chord: "C", lyrics: "Ya, Ye-sus Gu-nung Ba-tu di du-ni-" },
                { chord: "F", lyrics: "a, tem-pat ber-lin-dung yang te-" },
                { chord: "G", lyrics: "guh." },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-hymn-01-mahir",
        songId: "indo-hymn-01",
        instrument: "bass",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan walking bass gospel, chromatic passing notes D# & F#, serta slash chord C/E & G/B.",
        sections: [
          {
            id: "v1",
            name: "Bait 1",
            lines: [
              [
                { chord: "C", lyrics: "Di ba-dai to-pan du-ni-a Tu-han-lah per-lin-dung-an-" },
                { chord: "G/B", lyrics: "mu.", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Ken-da-ti gon-cang se-mes-ta Tu-han-lah per-lin-dung-an-" },
                { chord: "G", lyrics: "mu." },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain",
            lines: [
              [
                { chord: "C", lyrics: "Ya, Ye-sus Gu-nung Ba-tu di du-ni-" },
                { chord: "C/E", lyrics: "a, ", isBridge: true },
                { chord: "F", lyrics: "di du-ni-" },
                { chord: "C/G", lyrics: "a, ", isBridge: true },
                { chord: "G", lyrics: "di du-ni-a." },
              ],
              [
                { chord: "C", lyrics: "Ya, Ye-sus Gu-nung Ba-tu di du-ni-" },
                { chord: "F", lyrics: "a, tem-pat ber-lin-dung yang te-" },
                { chord: "G", lyrics: "guh." },
                { chord: "C", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 12. Kudus, Kudus, Kuduslah (Holy, Holy, Holy - KJ 2)
  {
    id: "indo-hymn-02",
    slug: "holy-holy-holy",
    title: "Kudus, Kudus, Kuduslah (Holy, Holy, Holy)",
    artist: "Reginald Heber / Kidung Jemaat 2",
    genre: "Hymn",
    key: "D",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 250,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Kidung Jemaat No. 2",
    rightsStatus: "Public Domain",
    coverGradient: "from-stone-900 to-amber-950",
    description:
      "Himne agung pemujaan kepada Allah Bapa, Putra, dan Roh Kudus. Menjadi standar emas pembelajaran slash chords dan harmoni hymnal gereja.",
    strummingPattern: "D - D - D - D (Grand Hymn Stately 4/4)",
    arrangements: [
      {
        id: "indo-hymn-02-pemula",
        songId: "indo-hymn-02",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi D - G - A - Bm di tempo 70 BPM.",
        sections: [
          {
            id: "v1",
            name: "Bait 1",
            lines: [
              [
                { chord: "D", lyrics: "Su-ci, su-ci, su-ci! Tu-han Ma-ha Ku-a-" },
                { chord: "A", lyrics: "sa." },
              ],
              [
                { chord: "D", lyrics: "Di-kau ka-mi pu-ji di pa-gi yang te-" },
                { chord: "A", lyrics: "duh." },
              ],
              [
                { chord: "D", lyrics: "Su-ci, su-ci, su-ci! Mu-rah dan Per-ka-" },
                { chord: "G", lyrics: "sa." },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Bm", lyrics: "Al-lah Tri-tung-gal, a-gung na-ma-" },
                { chord: "A", lyrics: "Mu!" },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-hymn-02-mahir",
        songId: "indo-hymn-02",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan slash chord D/F#, A/C#, G/B, Em7, dan A7sus4.",
        sections: [
          {
            id: "v1",
            name: "Bait 1",
            lines: [
              [
                { chord: "D", lyrics: "Su-ci, su-ci, su-ci! Tu-han Ma-ha Ku-a-" },
                { chord: "A/C#", lyrics: "sa.", isBridge: true },
              ],
              [
                { chord: "Bm", lyrics: "Di-kau ka-mi pu-ji di pa-gi yang te-" },
                { chord: "A", lyrics: "duh." },
              ],
              [
                { chord: "D", lyrics: "Su-ci, su-ci, su-ci! " },
                { chord: "D/F#", lyrics: "Mu-rah dan Per-ka-", isBridge: true },
                { chord: "G", lyrics: "sa." },
              ],
              [
                { chord: "Em7", lyrics: "Al-lah Tri-tung-gal, " },
                { chord: "A7sus4", lyrics: "a-gung na-ma-", isBridge: true },
                { chord: "D", lyrics: "Mu!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 13. How Great Thou Art
  {
    id: "indo-hymn-03",
    slug: "how-great-thou-art",
    title: "How Great Thou Art",
    artist: "Carl Boberg / Stuart K. Hine",
    genre: "Hymn",
    key: "G",
    bpm: 76,
    timeSignature: "3/4",
    durationSec: 280,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass", "cajon"],
    source: "Hymn Repertoire",
    rightsStatus: "Public Domain",
    coverGradient: "from-stone-900 to-amber-900",
    description:
      "Salah satu lagu Hymn teragung sepanjang masa dalam sukat 3/4. Menjadi materi rujukan irama Waltz bagi seluruh instrumen musik gereja.",
    strummingPattern: "Bass - Down - Down (Waltz 3/4)",
    arrangements: [
      {
        id: "indo-hymn-03-pemula",
        songId: "indo-hymn-03",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi G - C - D pada sukat 3 ketukan (Waltz).",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "O Lord my God, when I in awe-some " },
                { chord: "C", lyrics: "won-der," },
              ],
              [
                { chord: "G", lyrics: "Con-si-der all the worlds Thy hands have " },
                { chord: "D", lyrics: "made." },
              ],
              [
                { chord: "G", lyrics: "I see the stars, I hear the rol-ling " },
                { chord: "C", lyrics: "thun-der," },
              ],
              [
                { chord: "G", lyrics: "Thy pow'r through-out the u-ni-verse dis-" },
                { chord: "D", lyrics: "played." },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Then sings my soul, my Sa-vior God, to " },
                { chord: "C", lyrics: "Thee," },
                { chord: "G", lyrics: "How great Thou " },
                { chord: "D", lyrics: "art!" },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Then sings my soul, my Sa-vior God, to " },
                { chord: "C", lyrics: "Thee," },
                { chord: "G", lyrics: "How great Thou " },
                { chord: "D", lyrics: "art, how great Thou " },
                { chord: "G", lyrics: "art!" },
              ],
            ],
          },
        ],
      },
      {
        id: "indo-hymn-03-mahir",
        songId: "indo-hymn-03",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan arpeggio 1-5-8 tangan kiri, slash chord G/B, D/F#, dan C/E.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "O Lord my God, when I in awe-some " },
                { chord: "C", lyrics: "won-der," },
              ],
              [
                { chord: "G/B", lyrics: "Con-si-der ", isBridge: true },
                { chord: "Em7", lyrics: "all the worlds Thy hands have " },
                { chord: "D", lyrics: "made." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Chorus / Refrain",
            lines: [
              [
                { chord: "G", lyrics: "Then sings my soul, my Sa-vior God, to " },
                { chord: "C", lyrics: "Thee," },
                { chord: "G/B", lyrics: "How great Thou ", isBridge: true },
                { chord: "D", lyrics: "art!" },
                { chord: "G", lyrics: "" },
              ],
            ],
          },
        ],
      },
    ],
  },
];
