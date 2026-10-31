import { Song } from "@/types/music";

export const WORSHIP_SONGS: Song[] = [
  // 01. 10,000 Reasons (Bless the Lord)
  {
    id: "worship-01",
    slug: "10000-reasons-bless-the-lord",
    title: "10,000 Reasons (Bless the Lord)",
    artist: "Matt Redman & Jonas Myrin",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 72,
    timeSignature: "4/4",
    durationSec: 255,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-zinc-900",
    description:
      "Lagu penyembahan modern dengan tempo lambat mengalun. Mode Pemula memakai 4 chord dasar G-D-Em-C, sedangkan Mode Mahir menambahkan jembatan bass D/F#, G/B, dan Cmaj7.",
    strummingPattern: "D - D U - U D U (Slow Worship 4/4)",
    arrangements: [
      {
        id: "worship-01-pemula",
        songId: "worship-01",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary:
          "Progresi berulang C - G - D - Em sepanjang refrein dan bait. Sangat ramah untuk pemula.",
        sections: [
          {
            id: "chorus-1",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Bless the Lord, O my " },
                { chord: "G", lyrics: "soul, " },
                { chord: "D", lyrics: "O my " },
                { chord: "Em", lyrics: "soul," },
              ],
              [
                { chord: "C", lyrics: "Worship His ho-" },
                { chord: "G", lyrics: "ly " },
                { chord: "D", lyrics: "name." },
              ],
              [
                { chord: "C", lyrics: "Sing like ne-" },
                { chord: "Em", lyrics: "ver be-" },
                { chord: "C", lyrics: "fore, " },
                { chord: "D", lyrics: "O my " },
                { chord: "Em", lyrics: "soul;" },
              ],
              [
                { chord: "C", lyrics: "I'll worship Your ho-" },
                { chord: "D", lyrics: "ly " },
                { chord: "G", lyrics: "name." },
              ],
            ],
          },
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "The sun comes " },
                { chord: "G", lyrics: "up, it's a new " },
                { chord: "D", lyrics: "day " },
                { chord: "Em", lyrics: "dawning;" },
              ],
              [
                { chord: "C", lyrics: "It's time to " },
                { chord: "G", lyrics: "sing Your song " },
                { chord: "D", lyrics: "a-gain." },
              ],
              [
                { chord: "C", lyrics: "Whatever may " },
                { chord: "G", lyrics: "pass, and whatever " },
                { chord: "D", lyrics: "lies be-" },
                { chord: "Em", lyrics: "fore me," },
              ],
              [
                { chord: "C", lyrics: "Let me be sing-" },
                { chord: "G", lyrics: "ing when the " },
                { chord: "D", lyrics: "eve-ning " },
                { chord: "G", lyrics: "comes." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-01-mahir",
        songId: "worship-01",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan jembatan slash chord D/F#, G/B, Em7/D, serta suspensi Dsus4 -> D di akhir frasa.",
        sections: [
          {
            id: "chorus-1",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "Bless the Lord, O my " },
                { chord: "G", lyrics: "soul, " },
                { chord: "D/F#", lyrics: "O my ", isBridge: true },
                { chord: "Em7", lyrics: "soul," },
              ],
              [
                { chord: "Cmaj7", lyrics: "Worship His ho-" },
                { chord: "G/B", lyrics: "ly ", isBridge: true },
                { chord: "Dsus4", lyrics: "name. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Sing like ne-" },
                { chord: "Em7", lyrics: "ver be-" },
                { chord: "C", lyrics: "fore, " },
                { chord: "D/F#", lyrics: "O my ", isBridge: true },
                { chord: "Em7", lyrics: "soul;" },
              ],
              [
                { chord: "Cmaj7", lyrics: "I'll worship Your ho-" },
                { chord: "D7sus4", lyrics: "ly ", isBridge: true },
                { chord: "G", lyrics: "name." },
              ],
            ],
          },
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "The sun comes " },
                { chord: "G", lyrics: "up, it's a new " },
                { chord: "D/F#", lyrics: "day ", isBridge: true },
                { chord: "Em7", lyrics: "dawning;" },
              ],
              [
                { chord: "Cmaj7", lyrics: "It's time to " },
                { chord: "G/B", lyrics: "sing Your song ", isBridge: true },
                { chord: "Dsus4", lyrics: "a-gain. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Cmaj7", lyrics: "Whatever may " },
                { chord: "G", lyrics: "pass, and whatever " },
                { chord: "D/F#", lyrics: "lies be-", isBridge: true },
                { chord: "Em7", lyrics: "fore me," },
              ],
              [
                { chord: "Cmaj7", lyrics: "Let me be sing-" },
                { chord: "G/B", lyrics: "ing when the ", isBridge: true },
                { chord: "Dsus4", lyrics: "eve-ning ", isBridge: true },
                { chord: "G", lyrics: "comes." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 02. Way Maker
  {
    id: "worship-02",
    slug: "way-maker",
    title: "Way Maker",
    artist: "Sinach",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 290,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-zinc-900",
    description:
      "Lagu penyembahan atmosferik dengan siklus 4 bar tetap (IV - I - V - vi). Mode Mahir memperkaya transisi antar bar dengan jembatan G/B dan D/F#.",
    strummingPattern: "D - - - D - D U (Atmospheric Pad 4/4)",
    arrangements: [
      {
        id: "worship-02-pemula",
        songId: "worship-02",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan siklus 4 akor C - G - D - Em sepanjang lagu.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "You are here, moving " },
                { chord: "G", lyrics: "in our midst;" },
              ],
              [
                { chord: "D", lyrics: "I worship You, " },
                { chord: "Em", lyrics: "I worship You." },
              ],
              [
                { chord: "C", lyrics: "You are here, working " },
                { chord: "G", lyrics: "in this place;" },
              ],
              [
                { chord: "D", lyrics: "I worship You, " },
                { chord: "Em", lyrics: "I worship You." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Way maker, miracle worker, " },
                { chord: "G", lyrics: "promise keeper," },
              ],
              [
                { chord: "D", lyrics: "Light in the darkness, my " },
                { chord: "Em", lyrics: "God, that is who You are." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-02-mahir",
        songId: "worship-02",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary:
          "Menambahkan passing chord G/B menuju Cmaj7, D/F# menuju Em7, dan Em7/D kembali ke Cmaj7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "You are here, moving " },
                { chord: "G", lyrics: "in our " },
                { chord: "G/B", lyrics: "midst;", isBridge: true },
              ],
              [
                { chord: "D", lyrics: "I worship You, " },
                { chord: "D/F#", lyrics: "I wor-", isBridge: true },
                { chord: "Em7", lyrics: "ship You." },
              ],
              [
                { chord: "Cmaj7", lyrics: "You are here, working " },
                { chord: "G", lyrics: "in this " },
                { chord: "G/B", lyrics: "place;", isBridge: true },
              ],
              [
                { chord: "Dsus4", lyrics: "I worship You, ", isBridge: true },
                { chord: "D/F#", lyrics: "I wor-", isBridge: true },
                { chord: "Em7", lyrics: "ship You." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "Way maker, miracle worker, " },
                { chord: "G", lyrics: "promise " },
                { chord: "G/B", lyrics: "keeper,", isBridge: true },
              ],
              [
                { chord: "Dsus4", lyrics: "Light in the darkness, ", isBridge: true },
                { chord: "D/F#", lyrics: "my God, ", isBridge: true },
                { chord: "Em7", lyrics: "that is who You are." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 03. Goodness of God
  {
    id: "worship-03",
    slug: "goodness-of-god",
    title: "Goodness of God",
    artist: "Bethel Music & Jenn Johnson",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 64,
    timeSignature: "4/4",
    durationSec: 280,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-zinc-900",
    description:
      "Balada penyembahan penuh rasa syukur dengan tempo tenang (64 BPM). Mode Mahir menyertakan jembatan bass G/B dan D/F# yang menjadi ciri khas aransemen aslinya.",
    strummingPattern: "D - D U D U (Slow Ballad 16th Feel)",
    arrangements: [
      {
        id: "worship-03-pemula",
        songId: "worship-03",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar G, C, D, dan Em.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I love You, Lord, " },
                { chord: "C", lyrics: "oh Your mercy never " },
                { chord: "G", lyrics: "fails me," },
              ],
              [
                { chord: "D", lyrics: "All my " },
                { chord: "Em", lyrics: "days, I've been " },
                { chord: "C", lyrics: "held in Your " },
                { chord: "D", lyrics: "hands." },
              ],
              [
                { chord: "Em", lyrics: "From the moment that I " },
                { chord: "C", lyrics: "wake up until I " },
                { chord: "G", lyrics: "lay my head," },
              ],
              [
                { chord: "C", lyrics: "I will sing of the " },
                { chord: "D", lyrics: "goodness of " },
                { chord: "G", lyrics: "God." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "All my life You have been " },
                { chord: "G", lyrics: "faithful," },
              ],
              [
                { chord: "C", lyrics: "All my life You have been " },
                { chord: "G", lyrics: "so, so " },
                { chord: "D", lyrics: "good." },
              ],
              [
                { chord: "C", lyrics: "With every breath that I am " },
                { chord: "G", lyrics: "able, " },
                { chord: "Em", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "I will sing of the " },
                { chord: "D", lyrics: "goodness of " },
                { chord: "G", lyrics: "God." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-03-mahir",
        songId: "worship-03",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Dilengkapi passing chord G/B, D/F#, dan walkdown G - D/F# - Em7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I love You, Lord, " },
                { chord: "Cmaj7", lyrics: "oh Your mercy never " },
                { chord: "G", lyrics: "fails me," },
              ],
              [
                { chord: "D/F#", lyrics: "All my ", isBridge: true },
                { chord: "Em7", lyrics: "days, I've been " },
                { chord: "Cmaj7", lyrics: "held in Your " },
                { chord: "Dsus4", lyrics: "hands. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Em7", lyrics: "From the moment that I " },
                { chord: "C", lyrics: "wake up until I " },
                { chord: "G", lyrics: "lay my " },
                { chord: "D/F#", lyrics: "head, ", isBridge: true },
                { chord: "Em7", lyrics: "" },
              ],
              [
                { chord: "Cmaj7", lyrics: "I will sing of the " },
                { chord: "D7sus4", lyrics: "goodness of ", isBridge: true },
                { chord: "G", lyrics: "God." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "All my life You have been " },
                { chord: "G", lyrics: "faithful, " },
                { chord: "G/B", lyrics: "", isBridge: true },
              ],
              [
                { chord: "Cmaj7", lyrics: "All my life You have been " },
                { chord: "G", lyrics: "so, so " },
                { chord: "Dsus4", lyrics: "good. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Cmaj7", lyrics: "With every breath that I am " },
                { chord: "G", lyrics: "able, " },
                { chord: "D/F#", lyrics: "oh ", isBridge: true },
                { chord: "Em7", lyrics: "" },
              ],
              [
                { chord: "Cmaj7", lyrics: "I will sing of the " },
                { chord: "D7sus4", lyrics: "goodness of ", isBridge: true },
                { chord: "G", lyrics: "God." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 04. How Great Is Our God
  {
    id: "worship-04",
    slug: "how-great-is-our-god",
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    genre: "Worship (Lambat)",
    key: "C",
    bpm: 74,
    timeSignature: "4/4",
    durationSec: 265,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu penyembahan ikonik dalam nada dasar C Mayor. Mode Mahir menambahkan jembatan C/E menuju Fmaj7 dan G/B menuju Am7.",
    strummingPattern: "D - D U - U D U (Steady Worship 4/4)",
    arrangements: [
      {
        id: "worship-04-pemula",
        songId: "worship-04",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Hanya menggunakan 4 akor dasar: C, Am, F, dan G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "The splendor of a King, " },
                { chord: "Am", lyrics: "clothed in majesty," },
              ],
              [
                { chord: "F", lyrics: "Let all the earth rejoice, " },
                { chord: "G", lyrics: "all the earth rejoice." },
              ],
              [
                { chord: "C", lyrics: "He wraps Himself in light, " },
                { chord: "Am", lyrics: "and darkness tries to hide," },
              ],
              [
                { chord: "F", lyrics: "And trembles at His voice, " },
                { chord: "G", lyrics: "trembles at His voice." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "How great is our God! Sing with me:" },
              ],
              [
                { chord: "Am", lyrics: "How great is our God! All will see" },
              ],
              [
                { chord: "F", lyrics: "How great, " },
                { chord: "G", lyrics: "how great is our " },
                { chord: "C", lyrics: "God!" },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-04-mahir",
        songId: "worship-04",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menyisipkan jembatan bass G/B, Am/G, dan C/E.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "The splendor of a King, " },
                { chord: "G/B", lyrics: "clothed ", isBridge: true },
                { chord: "Am7", lyrics: "in majesty," },
              ],
              [
                { chord: "Am/G", lyrics: "Let ", isBridge: true },
                { chord: "Fmaj7", lyrics: "all the earth rejoice, " },
                { chord: "Gsus4", lyrics: "all the earth re-", isBridge: true },
                { chord: "G", lyrics: "joice." },
              ],
              [
                { chord: "Cmaj7", lyrics: "He wraps Himself in light, " },
                { chord: "G/B", lyrics: "and ", isBridge: true },
                { chord: "Am7", lyrics: "darkness tries to hide," },
              ],
              [
                { chord: "Am/G", lyrics: "And ", isBridge: true },
                { chord: "Fmaj7", lyrics: "trembles at His voice, " },
                { chord: "G7sus4", lyrics: "trembles at His ", isBridge: true },
                { chord: "G", lyrics: "voice." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "How great is our God! " },
                { chord: "G/B", lyrics: "Sing with me:", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "How great is our God! " },
                { chord: "Am/G", lyrics: "All will see", isBridge: true },
              ],
              [
                { chord: "Fmaj7", lyrics: "How great, " },
                { chord: "Gsus4", lyrics: "how great ", isBridge: true },
                { chord: "G", lyrics: "is our " },
                { chord: "C", lyrics: "God!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 05. Oceans (Where Feet May Fail)
  {
    id: "worship-05",
    slug: "oceans-where-feet-may-fail",
    title: "Oceans (Where Feet May Fail)",
    artist: "Hillsong UNITED",
    genre: "Worship (Lambat)",
    key: "D",
    bpm: 66,
    timeSignature: "4/4",
    durationSec: 320,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-neutral-900 to-zinc-950",
    description:
      "Lagu penyembahan mendalam yang dibuka dengan akor minor (Bm) dan jembatan A/C# menuju D. Sangat cocok untuk melatih dinamika lembut hingga klimaks.",
    strummingPattern: "D - D U - U D U (Ambient Swell 4/4)",
    arrangements: [
      {
        id: "worship-05-pemula",
        songId: "worship-05",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: Bm, A, D, dan G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Bm", lyrics: "You call me out up-" },
                { chord: "A", lyrics: "on the " },
                { chord: "D", lyrics: "waters," },
              ],
              [
                { chord: "A", lyrics: "The great un-" },
                { chord: "G", lyrics: "known where feet may fail." },
              ],
              [
                { chord: "Bm", lyrics: "And there I find You " },
                { chord: "A", lyrics: "in the " },
                { chord: "D", lyrics: "mystery," },
              ],
              [
                { chord: "A", lyrics: "In oceans " },
                { chord: "G", lyrics: "deep my faith will stand." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "And I will " },
                { chord: "D", lyrics: "call upon Your " },
                { chord: "A", lyrics: "name," },
              ],
              [
                { chord: "G", lyrics: "And keep my " },
                { chord: "D", lyrics: "eyes above the " },
                { chord: "A", lyrics: "waves." },
              ],
              [
                { chord: "G", lyrics: "When oceans " },
                { chord: "D", lyrics: "rise, my soul will " },
                { chord: "A", lyrics: "rest in Your em-" },
                { chord: "Bm", lyrics: "brace," },
              ],
              [
                { chord: "G", lyrics: "For I am " },
                { chord: "A", lyrics: "Yours and You are " },
                { chord: "Bm", lyrics: "mine." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-05-mahir",
        songId: "worship-05",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menggunakan slash chord ikonik A/C# dan D/F# sesuai rekaman aslinya.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Bm7", lyrics: "You call me out up-" },
                { chord: "A/C#", lyrics: "on the ", isBridge: true },
                { chord: "D", lyrics: "waters," },
              ],
              [
                { chord: "Asus4", lyrics: "The great un-", isBridge: true },
                { chord: "A", lyrics: "known where " },
                { chord: "Gmaj7", lyrics: "feet may fail." },
              ],
              [
                { chord: "Bm7", lyrics: "And there I find You " },
                { chord: "A/C#", lyrics: "in the ", isBridge: true },
                { chord: "D", lyrics: "mystery," },
              ],
              [
                { chord: "Asus4", lyrics: "In oceans ", isBridge: true },
                { chord: "A", lyrics: "deep my " },
                { chord: "Gmaj7", lyrics: "faith will stand." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Gmaj7", lyrics: "And I will " },
                { chord: "D", lyrics: "call upon Your " },
                { chord: "Asus4", lyrics: "name, ", isBridge: true },
                { chord: "A", lyrics: "" },
              ],
              [
                { chord: "Gmaj7", lyrics: "And keep my " },
                { chord: "D/F#", lyrics: "eyes above the ", isBridge: true },
                { chord: "A", lyrics: "waves." },
              ],
              [
                { chord: "Gmaj7", lyrics: "When oceans " },
                { chord: "D", lyrics: "rise, my soul will " },
                { chord: "A/C#", lyrics: "rest in Your em-", isBridge: true },
                { chord: "Bm7", lyrics: "brace," },
              ],
              [
                { chord: "Gmaj7", lyrics: "For I am " },
                { chord: "Asus4", lyrics: "Yours and You are ", isBridge: true },
                { chord: "Bm7", lyrics: "mine." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 06. What A Beautiful Name
  {
    id: "worship-06",
    slug: "what-a-beautiful-name",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    genre: "Worship (Lambat)",
    key: "D",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 270,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-stone-950",
    description:
      "Lagu penyembahan megah dalam D Mayor. Mode Mahir menampilkan jembatan bass F#m/A dan D/F# yang membangun alur melodi piano/gitar yang halus.",
    strummingPattern: "D - D U - U D U (Slow Anthem 4/4)",
    arrangements: [
      {
        id: "worship-06-pemula",
        songId: "worship-06",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar D, G, Bm, dan A.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "You were the Word at the beginning," },
              ],
              [
                { chord: "G", lyrics: "One with " },
                { chord: "Bm", lyrics: "God the Lord Most " },
                { chord: "A", lyrics: "High." },
              ],
              [
                { chord: "Bm", lyrics: "Your hidden " },
                { chord: "D", lyrics: "glory in creation," },
              ],
              [
                { chord: "G", lyrics: "Now re-" },
                { chord: "Bm", lyrics: "vealed in You our " },
                { chord: "A", lyrics: "Christ." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "What a beautiful Name it is, " },
                { chord: "A", lyrics: "what a beautiful Name it is," },
              ],
              [
                { chord: "Bm", lyrics: "The Name of " },
                { chord: "A", lyrics: "Jesus Christ my " },
                { chord: "G", lyrics: "King." },
              ],
              [
                { chord: "D", lyrics: "What a beautiful Name it is, " },
                { chord: "A", lyrics: "nothing compares to this," },
              ],
              [
                { chord: "Bm", lyrics: "What a beautiful " },
                { chord: "A", lyrics: "Name it " },
                { chord: "G", lyrics: "is, the Name of Jesus." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-06-mahir",
        songId: "worship-06",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan A/C# pada bait ke-3 bar dan D/F# pada chorus.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "You were the Word at the beginning," },
              ],
              [
                { chord: "Gmaj7", lyrics: "One with " },
                { chord: "Bm7", lyrics: "God the Lord Most " },
                { chord: "Asus4", lyrics: "High. ", isBridge: true },
                { chord: "A", lyrics: "" },
              ],
              [
                { chord: "Bm7", lyrics: "Your hidden " },
                { chord: "A/C#", lyrics: "glory ", isBridge: true },
                { chord: "D", lyrics: "in creation," },
              ],
              [
                { chord: "Gmaj7", lyrics: "Now re-" },
                { chord: "Bm7", lyrics: "vealed in You our " },
                { chord: "Asus4", lyrics: "Christ. ", isBridge: true },
                { chord: "A", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "What a beautiful Name it is, " },
                { chord: "Asus4", lyrics: "what a beautiful ", isBridge: true },
                { chord: "A", lyrics: "Name it is," },
              ],
              [
                { chord: "Bm7", lyrics: "The Name of " },
                { chord: "A/C#", lyrics: "Jesus ", isBridge: true },
                { chord: "D", lyrics: "Christ my " },
                { chord: "Gmaj7", lyrics: "King." },
              ],
              [
                { chord: "D/F#", lyrics: "What a beautiful ", isBridge: true },
                { chord: "D", lyrics: "Name it is, " },
                { chord: "A", lyrics: "nothing compares to this," },
              ],
              [
                { chord: "Bm7", lyrics: "What a beautiful " },
                { chord: "A", lyrics: "Name it " },
                { chord: "Gmaj7", lyrics: "is, the Name of Jesus." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 07. Shout to the Lord
  {
    id: "worship-07",
    slug: "shout-to-the-lord",
    title: "Shout to the Lord",
    artist: "Darlene Zschech",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 260,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-stone-900",
    description:
      "Lagu penyembahan klasik modern yang sangat populer di gereja. Mode Mahir menampilkan pergerakan bass turun G - D/F# - Em - Em/D - C.",
    strummingPattern: "D - D U - U D U (Ballad Worship 4/4)",
    arrangements: [
      {
        id: "worship-07-pemula",
        songId: "worship-07",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar G, C, Em, dan D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "My Jesus, my " },
                { chord: "C", lyrics: "Savior," },
              ],
              [
                { chord: "Em", lyrics: "Lord, there is " },
                { chord: "D", lyrics: "none like " },
                { chord: "C", lyrics: "You;" },
              ],
              [
                { chord: "G", lyrics: "All of my days I " },
                { chord: "C", lyrics: "want to " },
                { chord: "G", lyrics: "praise" },
              ],
              [
                { chord: "Em", lyrics: "The wonders of Your " },
                { chord: "C", lyrics: "mighty " },
                { chord: "D", lyrics: "love." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Shout to the " },
                { chord: "Em", lyrics: "Lord, all the " },
                { chord: "C", lyrics: "earth, let us " },
                { chord: "D", lyrics: "sing" },
              ],
              [
                { chord: "G", lyrics: "Power and " },
                { chord: "Em", lyrics: "majesty, " },
                { chord: "C", lyrics: "praise to the " },
                { chord: "D", lyrics: "King;" },
              ],
              [
                { chord: "Em", lyrics: "Mountains bow down and the " },
                { chord: "C", lyrics: "seas will roar" },
              ],
              [
                { chord: "D", lyrics: "At the sound of Your " },
                { chord: "G", lyrics: "name." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-07-mahir",
        songId: "worship-07",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Dilengkapi walkdown bass G/B, D/F#, dan Fmaj7/G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "My Jesus, my " },
                { chord: "Cmaj7", lyrics: "Savior," },
              ],
              [
                { chord: "Em7", lyrics: "Lord, there is " },
                { chord: "D/F#", lyrics: "none like ", isBridge: true },
                { chord: "C", lyrics: "You;" },
              ],
              [
                { chord: "G/B", lyrics: "All of my days ", isBridge: true },
                { chord: "C", lyrics: "I want to " },
                { chord: "G/D", lyrics: "praise", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "The wonders of Your " },
                { chord: "F", lyrics: "mighty ", isBridge: true },
                { chord: "Dsus4", lyrics: "love. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Shout to the " },
                { chord: "Em7", lyrics: "Lord, all the " },
                { chord: "Cmaj7", lyrics: "earth, let us " },
                { chord: "Dsus4", lyrics: "sing ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Power and " },
                { chord: "Em7", lyrics: "majesty, " },
                { chord: "Cmaj7", lyrics: "praise to the " },
                { chord: "Dsus4", lyrics: "King;", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Mountains bow down and the " },
                { chord: "Cmaj7", lyrics: "seas will roar" },
              ],
              [
                { chord: "D", lyrics: "At the " },
                { chord: "C/E", lyrics: "sound of ", isBridge: true },
                { chord: "D/F#", lyrics: "Your ", isBridge: true },
                { chord: "G", lyrics: "name." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 08. The Heart of Worship
  {
    id: "worship-08",
    slug: "the-heart-of-worship",
    title: "The Heart of Worship",
    artist: "Matt Redman",
    genre: "Worship (Lambat)",
    key: "D",
    bpm: 66,
    timeSignature: "4/4",
    durationSec: 250,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-zinc-950",
    description:
      "Lagu penyembahan akustik intim tentang kembali ke hati penyembahan yang tulus. Mode Mahir menambahkan jembatan D/F# dan A/C#.",
    strummingPattern: "D - D U - U D U (Intimate Acoustic 4/4)",
    arrangements: [
      {
        id: "worship-08-pemula",
        songId: "worship-08",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: D, A, Em, dan G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "When the music " },
                { chord: "A", lyrics: "fades, all is " },
                { chord: "Em", lyrics: "stripped away, and I " },
                { chord: "A", lyrics: "simply come;" },
              ],
              [
                { chord: "D", lyrics: "Longing just to " },
                { chord: "A", lyrics: "bring something " },
                { chord: "Em", lyrics: "that's of worth that will " },
                { chord: "A", lyrics: "bless Your heart." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I'm coming back to the " },
                { chord: "A", lyrics: "heart of worship," },
              ],
              [
                { chord: "Em", lyrics: "And it's all a-" },
                { chord: "G", lyrics: "bout You, " },
                { chord: "A", lyrics: "all about You, Jesus." },
              ],
              [
                { chord: "D", lyrics: "I'm sorry, Lord, for the " },
                { chord: "A", lyrics: "thing I've made it," },
              ],
              [
                { chord: "Em", lyrics: "When it's all a-" },
                { chord: "G", lyrics: "bout You, " },
                { chord: "A", lyrics: "all about You, " },
                { chord: "D", lyrics: "Jesus." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-08-mahir",
        songId: "worship-08",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan D/F#, A/C#, dan suspensi Asus4.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "When the music " },
                { chord: "A/C#", lyrics: "fades, all is ", isBridge: true },
                { chord: "Em7", lyrics: "stripped away, and I " },
                { chord: "Asus4", lyrics: "simply ", isBridge: true },
                { chord: "A", lyrics: "come;" },
              ],
              [
                { chord: "D", lyrics: "Longing just to " },
                { chord: "A/C#", lyrics: "bring something ", isBridge: true },
                { chord: "Em7", lyrics: "that's of worth that will " },
                { chord: "Asus4", lyrics: "bless Your ", isBridge: true },
                { chord: "A", lyrics: "heart." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I'm coming back to the " },
                { chord: "A/C#", lyrics: "heart of worship,", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "And it's all a-" },
                { chord: "Gmaj7", lyrics: "bout You, " },
                { chord: "Asus4", lyrics: "all about You, ", isBridge: true },
                { chord: "A", lyrics: "Jesus." },
              ],
              [
                { chord: "D", lyrics: "I'm sorry, Lord, for the " },
                { chord: "A/C#", lyrics: "thing I've made it,", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "When it's all a-" },
                { chord: "Gmaj7", lyrics: "bout You, " },
                { chord: "A7sus4", lyrics: "all about You, ", isBridge: true },
                { chord: "D", lyrics: "Jesus." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 09. Here I Am to Worship
  {
    id: "worship-09",
    slug: "here-i-am-to-worship",
    title: "Here I Am to Worship",
    artist: "Tim Hughes",
    genre: "Worship (Lambat)",
    key: "D",
    bpm: 70,
    timeSignature: "4/4",
    durationSec: 255,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-stone-900",
    description:
      "Lagu penyembahan lembut dengan alur harmonis D - A - Em - G di bait dan D - D/F# - G di refrein pada Mode Mahir.",
    strummingPattern: "D - D U - U D U (Warm Worship 4/4)",
    arrangements: [
      {
        id: "worship-09-pemula",
        songId: "worship-09",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar D, A, Em, G, dan Bm.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Light of the " },
                { chord: "A", lyrics: "world, You stepped " },
                { chord: "Em", lyrics: "down into " },
                { chord: "G", lyrics: "darkness," },
              ],
              [
                { chord: "D", lyrics: "Opened my " },
                { chord: "A", lyrics: "eyes, let me " },
                { chord: "G", lyrics: "see." },
              ],
              [
                { chord: "D", lyrics: "Beauty that " },
                { chord: "A", lyrics: "made this " },
                { chord: "Em", lyrics: "heart adore " },
                { chord: "G", lyrics: "You," },
              ],
              [
                { chord: "D", lyrics: "Hope of a " },
                { chord: "A", lyrics: "life spent with " },
                { chord: "G", lyrics: "You." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Here I am to " },
                { chord: "A", lyrics: "worship, " },
                { chord: "Bm", lyrics: "here I am to " },
                { chord: "G", lyrics: "bow down," },
              ],
              [
                { chord: "D", lyrics: "Here I am to " },
                { chord: "A", lyrics: "say that You're my " },
                { chord: "G", lyrics: "God;" },
              ],
              [
                { chord: "D", lyrics: "You're altogether " },
                { chord: "A", lyrics: "lovely, " },
                { chord: "Bm", lyrics: "altogether " },
                { chord: "G", lyrics: "worthy," },
              ],
              [
                { chord: "D", lyrics: "Altogether " },
                { chord: "A", lyrics: "wonderful to " },
                { chord: "G", lyrics: "me." },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-09-mahir",
        songId: "worship-09",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan D/F# dan A/C# pada pergerakan refrein.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Light of the " },
                { chord: "Asus4", lyrics: "world, You stepped ", isBridge: true },
                { chord: "Em7", lyrics: "down into " },
                { chord: "Gmaj7", lyrics: "darkness," },
              ],
              [
                { chord: "D", lyrics: "Opened my " },
                { chord: "Asus4", lyrics: "eyes, let me ", isBridge: true },
                { chord: "Gmaj7", lyrics: "see." },
              ],
              [
                { chord: "D", lyrics: "Beauty that " },
                { chord: "Asus4", lyrics: "made this ", isBridge: true },
                { chord: "Em7", lyrics: "heart adore " },
                { chord: "Gmaj7", lyrics: "You," },
              ],
              [
                { chord: "D", lyrics: "Hope of a " },
                { chord: "A", lyrics: "life spent with " },
                { chord: "Gmaj7", lyrics: "You." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Here I am to " },
                { chord: "A/C#", lyrics: "worship, ", isBridge: true },
                { chord: "Bm7", lyrics: "here I am to " },
                { chord: "D/F#", lyrics: "bow ", isBridge: true },
                { chord: "G", lyrics: "down," },
              ],
              [
                { chord: "D/F#", lyrics: "Here I am to ", isBridge: true },
                { chord: "A", lyrics: "say that You're my " },
                { chord: "Gmaj7", lyrics: "God;" },
              ],
              [
                { chord: "D", lyrics: "You're altogether " },
                { chord: "A/C#", lyrics: "lovely, ", isBridge: true },
                { chord: "Bm7", lyrics: "altogether " },
                { chord: "D/F#", lyrics: "wor-", isBridge: true },
                { chord: "G", lyrics: "thy," },
              ],
              [
                { chord: "D/F#", lyrics: "Altogether ", isBridge: true },
                { chord: "A7sus4", lyrics: "wonderful to ", isBridge: true },
                { chord: "Gmaj7", lyrics: "me." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 10. Worthy Is the Lamb
  {
    id: "worship-10",
    slug: "worthy-is-the-lamb",
    title: "Worthy Is the Lamb",
    artist: "Darlene Zschech / Hillsong Worship",
    genre: "Worship (Lambat)",
    key: "G",
    bpm: 68,
    timeSignature: "4/4",
    durationSec: 285,
    difficulty: "Pemula",
    instruments: ["piano", "guitar", "bass"],
    source: "Contemporary Worship Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-zinc-950",
    description:
      "Lagu penyembahan agung yang sangat populer untuk perjamuan kudus dan ibadah raya. Mode Mahir menampilkan jembatan G/B, D/F#, dan C/E.",
    strummingPattern: "D - D U - U D U (Grand Ballad 4/4)",
    arrangements: [
      {
        id: "worship-10-pemula",
        songId: "worship-10",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar G, C, D, Em, dan Am.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Thank You for the " },
                { chord: "G", lyrics: "cross, Lord," },
              ],
              [
                { chord: "C", lyrics: "Thank You for the " },
                { chord: "D", lyrics: "price You " },
                { chord: "G", lyrics: "paid;" },
              ],
              [
                { chord: "D", lyrics: "Bearing all my " },
                { chord: "Em", lyrics: "sin and shame, in " },
                { chord: "D", lyrics: "love You " },
                { chord: "C", lyrics: "came" },
              ],
              [
                { chord: "Am", lyrics: "And gave a-" },
                { chord: "G", lyrics: "mazing " },
                { chord: "D", lyrics: "grace." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Worthy is the " },
                { chord: "D", lyrics: "Lamb" },
              ],
              [
                { chord: "Am", lyrics: "Seated on the " },
                { chord: "G", lyrics: "throne;" },
              ],
              [
                { chord: "D", lyrics: "Crown You now with " },
                { chord: "C", lyrics: "many crowns," },
              ],
              [
                { chord: "Am", lyrics: "You reign vic-" },
                { chord: "D", lyrics: "tori-" },
                { chord: "G", lyrics: "ous!" },
              ],
            ],
          },
        ],
      },
      {
        id: "worship-10-mahir",
        songId: "worship-10",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Dilengkapi passing chord G/B, D/F#, C/E, dan Am7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "Thank You for the " },
                { chord: "G/B", lyrics: "cross, ", isBridge: true },
                { chord: "G", lyrics: "Lord," },
              ],
              [
                { chord: "Cmaj7", lyrics: "Thank You for the " },
                { chord: "D", lyrics: "price You " },
                { chord: "G", lyrics: "paid;" },
              ],
              [
                { chord: "D/F#", lyrics: "Bearing all my ", isBridge: true },
                { chord: "Em7", lyrics: "sin and shame, in " },
                { chord: "D", lyrics: "love You " },
                { chord: "C", lyrics: "came" },
              ],
              [
                { chord: "Am7", lyrics: "And gave a-" },
                { chord: "G/B", lyrics: "mazing ", isBridge: true },
                { chord: "Dsus4", lyrics: "grace. ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Worthy is the " },
                { chord: "D/F#", lyrics: "Lamb", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Seated on the " },
                { chord: "G/B", lyrics: "throne; ", isBridge: true },
                { chord: "C", lyrics: "" },
              ],
              [
                { chord: "D", lyrics: "Crown You now with " },
                { chord: "G/B", lyrics: "many ", isBridge: true },
                { chord: "C", lyrics: "crowns," },
              ],
              [
                { chord: "Am7", lyrics: "You reign vic-" },
                { chord: "D7sus4", lyrics: "tori-", isBridge: true },
                { chord: "G", lyrics: "ous!" },
              ],
            ],
          },
        ],
      },
    ],
  },
];

export const PRAISE_SONGS: Song[] = [
  // 01. This Is Amazing Grace
  {
    id: "praise-01",
    slug: "this-is-amazing-grace",
    title: "This Is Amazing Grace",
    artist: "Phil Wickham",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 122,
    timeSignature: "4/4",
    durationSec: 250,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-zinc-900",
    description:
      "Lagu pujian bertempo cepat (122 BPM) yang penuh semangat. Mode Pemula menggunakan akor dasar G-C-Em-D, sedangkan Mode Mahir menambahkan jembatan G/B dan D/F#.",
    strummingPattern: "D - D U - U D U (Upbeat Driving 4/4)",
    arrangements: [
      {
        id: "praise-01-pemula",
        songId: "praise-01",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: G, C, Em, dan D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Who breaks the power of sin and darkness?" },
              ],
              [
                { chord: "C", lyrics: "Whose love is mighty and so much stronger?" },
              ],
              [
                { chord: "Em", lyrics: "The King of " },
                { chord: "D", lyrics: "Glory, the King a-" },
                { chord: "C", lyrics: "bove all kings!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "This is amazing grace, " },
                { chord: "C", lyrics: "this is unfailing love," },
              ],
              [
                { chord: "Em", lyrics: "That You would take my place, " },
                { chord: "D", lyrics: "that You would bear my cross." },
              ],
              [
                { chord: "G", lyrics: "You laid down Your life " },
                { chord: "C", lyrics: "that I would be set free," },
              ],
              [
                { chord: "Em", lyrics: "Oh, Jesus, I sing for " },
                { chord: "D", lyrics: "all that You've done for " },
                { chord: "G", lyrics: "me!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-01-mahir",
        songId: "praise-01",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan ritmis G/B menuju C dan D/F# menuju Em7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Who breaks the power of sin and " },
                { chord: "G/B", lyrics: "darkness?", isBridge: true },
              ],
              [
                { chord: "Cmaj7", lyrics: "Whose love is mighty and so much stronger?" },
              ],
              [
                { chord: "Em7", lyrics: "The King of " },
                { chord: "D/F#", lyrics: "Glory, the King a-", isBridge: true },
                { chord: "C", lyrics: "bove all kings!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "This is amazing " },
                { chord: "G/B", lyrics: "grace, ", isBridge: true },
                { chord: "C", lyrics: "this is unfailing love," },
              ],
              [
                { chord: "Em7", lyrics: "That You would take my place, " },
                { chord: "Dsus4", lyrics: "that You would ", isBridge: true },
                { chord: "D", lyrics: "bear my cross." },
              ],
              [
                { chord: "G", lyrics: "You laid down Your " },
                { chord: "G/B", lyrics: "life ", isBridge: true },
                { chord: "C", lyrics: "that I would be set free," },
              ],
              [
                { chord: "Em7", lyrics: "Oh, Jesus, I sing for " },
                { chord: "D", lyrics: "all that You've done for " },
                { chord: "G", lyrics: "me!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 02. Trading My Sorrows (Yes Lord)
  {
    id: "praise-02",
    slug: "trading-my-sorrows",
    title: "Trading My Sorrows (Yes Lord)",
    artist: "Darrell Evans",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 128,
    timeSignature: "4/4",
    durationSec: 235,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-zinc-900",
    description:
      "Lagu pujian sukacita dengan groove sinkopasi yang enerjik (128 BPM). Sangat populer sebagai lagu pembuka ibadah.",
    strummingPattern: "D - D U U D U (Syncopated Groove 4/4)",
    arrangements: [
      {
        id: "praise-02-pemula",
        songId: "praise-02",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Siklus tetap 4 akor: G - C - Em - D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I'm trading my " },
                { chord: "C", lyrics: "sorrows, " },
                { chord: "Em", lyrics: "I'm trading my " },
                { chord: "D", lyrics: "shame," },
              ],
              [
                { chord: "G", lyrics: "I'm laying them " },
                { chord: "C", lyrics: "down for the " },
                { chord: "Em", lyrics: "joy of the " },
                { chord: "D", lyrics: "Lord!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Yes Lord, " },
                { chord: "C", lyrics: "yes Lord, " },
                { chord: "Em", lyrics: "yes, yes " },
                { chord: "D", lyrics: "Lord!" },
              ],
              [
                { chord: "G", lyrics: "Yes Lord, " },
                { chord: "C", lyrics: "yes Lord, " },
                { chord: "Em", lyrics: "yes, yes " },
                { chord: "D", lyrics: "Lord! A-" },
                { chord: "G", lyrics: "men!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-02-mahir",
        songId: "praise-02",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan G/B, D/F#, dan Cmaj7 dengan aksen funk/praise.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I'm trading my " },
                { chord: "G/B", lyrics: "", isBridge: true },
                { chord: "C", lyrics: "sorrows, " },
                { chord: "Em7", lyrics: "I'm trading my " },
                { chord: "Dsus4", lyrics: "shame,", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "I'm laying them " },
                { chord: "G/B", lyrics: "", isBridge: true },
                { chord: "C", lyrics: "down for the " },
                { chord: "Em7", lyrics: "joy of the " },
                { chord: "D", lyrics: "Lord!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Yes Lord, " },
                { chord: "C", lyrics: "yes Lord, " },
                { chord: "Em7", lyrics: "yes, " },
                { chord: "D/F#", lyrics: "yes ", isBridge: true },
                { chord: "D", lyrics: "Lord!" },
              ],
              [
                { chord: "G", lyrics: "Yes Lord, " },
                { chord: "C", lyrics: "yes Lord, " },
                { chord: "Em7", lyrics: "yes, yes " },
                { chord: "D7sus4", lyrics: "Lord! A-", isBridge: true },
                { chord: "G", lyrics: "men!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 03. Friend of God
  {
    id: "praise-03",
    slug: "friend-of-god",
    title: "Friend of God",
    artist: "Israel Houghton & Michael Gungor",
    genre: "Praise (Cepat)",
    key: "D",
    bpm: 126,
    timeSignature: "4/4",
    durationSec: 260,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-zinc-900",
    description:
      "Lagu pujian gospel modern dengan bassline ceria dan tempo 126 BPM. Mode Mahir menampilkan akor Bm7, Em7, dan jembatan D/F#.",
    strummingPattern: "D - D U - U D U (Gospel Pop Groove 4/4)",
    arrangements: [
      {
        id: "praise-03-pemula",
        songId: "praise-03",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar D, Bm, G, dan A.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Who am I that You are mindful of me," },
              ],
              [
                { chord: "Bm", lyrics: "That You hear me " },
                { chord: "G", lyrics: "when I " },
                { chord: "D", lyrics: "call?" },
              ],
              [
                { chord: "D", lyrics: "Is it true that You are thinking of me?" },
              ],
              [
                { chord: "Bm", lyrics: "How You love me, " },
                { chord: "G", lyrics: "it's amazing!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I am a friend of God, " },
                { chord: "Bm", lyrics: "I am a friend of God," },
              ],
              [
                { chord: "G", lyrics: "I am a friend of " },
                { chord: "A", lyrics: "God, He calls me " },
                { chord: "D", lyrics: "friend!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-03-mahir",
        songId: "praise-03",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan A/C#, D/F#, serta ekstensi Gmaj7 dan Em7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Dmaj7", lyrics: "Who am I that You are " },
                { chord: "A/C#", lyrics: "mindful of me,", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "That You hear me " },
                { chord: "Em7", lyrics: "when I " },
                { chord: "D/F#", lyrics: "call? ", isBridge: true },
                { chord: "D", lyrics: "" },
              ],
              [
                { chord: "Dmaj7", lyrics: "Is it true that You are " },
                { chord: "A/C#", lyrics: "thinking of me?", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "How You love me, " },
                { chord: "Gmaj7", lyrics: "it's a-" },
                { chord: "Asus4", lyrics: "mazing!", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I am a friend of " },
                { chord: "A/C#", lyrics: "God, ", isBridge: true },
                { chord: "Bm7", lyrics: "I am a friend of God," },
              ],
              [
                { chord: "Em7", lyrics: "I am a friend of " },
                { chord: "A7sus4", lyrics: "God, He calls me ", isBridge: true },
                { chord: "D", lyrics: "friend!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 04. Everyday
  {
    id: "praise-04",
    slug: "everyday-hillsong",
    title: "Everyday",
    artist: "Joel Houston / Hillsong UNITED",
    genre: "Praise (Cepat)",
    key: "D",
    bpm: 130,
    timeSignature: "4/4",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu pujian enerjik bertempo cepat (130 BPM) dengan progresi D - G - Bm - A yang menghentak di bagian refrein.",
    strummingPattern: "D D U D U D U (Fast Pop-Rock Praise 4/4)",
    arrangements: [
      {
        id: "praise-04-pemula",
        songId: "praise-04",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: D, G, Bm, dan A.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "What to " },
                { chord: "G", lyrics: "say, Lord, it's " },
                { chord: "Bm", lyrics: "You who gave me " },
                { chord: "A", lyrics: "life, and I" },
              ],
              [
                { chord: "D", lyrics: "Can't ex-" },
                { chord: "G", lyrics: "plain just how " },
                { chord: "Bm", lyrics: "much You mean to " },
                { chord: "A", lyrics: "me now" },
              ],
              [
                { chord: "D", lyrics: "That You " },
                { chord: "G", lyrics: "have saved me, " },
                { chord: "Bm", lyrics: "Lord, I give all " },
                { chord: "A", lyrics: "that I am to You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Everyday, I " },
                { chord: "G", lyrics: "learn to " },
                { chord: "Bm", lyrics: "stand up-" },
                { chord: "A", lyrics: "on Your Word," },
              ],
              [
                { chord: "D", lyrics: "And I " },
                { chord: "G", lyrics: "pray that I, I " },
                { chord: "Bm", lyrics: "might come to " },
                { chord: "A", lyrics: "know You more;" },
              ],
              [
                { chord: "D", lyrics: "Everyday, it's " },
                { chord: "G", lyrics: "You I " },
                { chord: "Bm", lyrics: "live " },
                { chord: "A", lyrics: "for!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-04-mahir",
        songId: "praise-04",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan D/F# dan A/C# untuk transisi bass cepat.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "What to " },
                { chord: "D/F#", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "say, Lord, it's " },
                { chord: "Bm7", lyrics: "You who gave me " },
                { chord: "Asus4", lyrics: "life, and I", isBridge: true },
              ],
              [
                { chord: "D", lyrics: "Can't ex-" },
                { chord: "D/F#", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "plain just how " },
                { chord: "Bm7", lyrics: "much You mean to " },
                { chord: "A", lyrics: "me now" },
              ],
              [
                { chord: "D", lyrics: "That You " },
                { chord: "D/F#", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "have saved me, " },
                { chord: "Bm7", lyrics: "Lord, I give all " },
                { chord: "A", lyrics: "that I am to You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Everyday, " },
                { chord: "D/F#", lyrics: "I ", isBridge: true },
                { chord: "G", lyrics: "learn to " },
                { chord: "Bm7", lyrics: "stand up-" },
                { chord: "A", lyrics: "on Your Word," },
              ],
              [
                { chord: "D", lyrics: "And I " },
                { chord: "D/F#", lyrics: "", isBridge: true },
                { chord: "G", lyrics: "pray that I, I " },
                { chord: "Bm7", lyrics: "might come to " },
                { chord: "Asus4", lyrics: "know You ", isBridge: true },
                { chord: "A", lyrics: "more;" },
              ],
              [
                { chord: "D", lyrics: "Everyday, " },
                { chord: "A/C#", lyrics: "it's ", isBridge: true },
                { chord: "G", lyrics: "You I " },
                { chord: "Bm7", lyrics: "live " },
                { chord: "A", lyrics: "for!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 05. One Way
  {
    id: "praise-05",
    slug: "one-way-jesus",
    title: "One Way",
    artist: "Jonathon Douglass & Joel Houston",
    genre: "Praise (Cepat)",
    key: "A",
    bpm: 128,
    timeSignature: "4/4",
    durationSec: 240,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-neutral-900 to-zinc-950",
    description:
      "Lagu pujian populer dengan tempo 128 BPM yang penuh energi. Mode Pemula menggunakan 4 chord dasar A, F#m, E, dan D.",
    strummingPattern: "D D D D D U D U (8th Note Rock Praise 4/4)",
    arrangements: [
      {
        id: "praise-05-pemula",
        songId: "praise-05",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar A, F#m, E, dan D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "A", lyrics: "I lay my life down at Your feet," },
              ],
              [
                { chord: "F#m", lyrics: "'Cause You're the only one I need," },
              ],
              [
                { chord: "E", lyrics: "I turn to You and You are " },
                { chord: "D", lyrics: "always there." },
              ],
              [
                { chord: "A", lyrics: "In troubled times it's You I seek," },
              ],
              [
                { chord: "F#m", lyrics: "I put You first, that's all I need," },
              ],
              [
                { chord: "E", lyrics: "I humble all I am, " },
                { chord: "D", lyrics: "all to You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "A", lyrics: "One way, " },
                { chord: "E", lyrics: "Jesus," },
              ],
              [
                { chord: "F#m", lyrics: "You're the only " },
                { chord: "D", lyrics: "one that I could live for!" },
              ],
              [
                { chord: "A", lyrics: "One way, " },
                { chord: "E", lyrics: "Jesus," },
              ],
              [
                { chord: "F#m", lyrics: "You're the only " },
                { chord: "D", lyrics: "one that I could live for!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-05-mahir",
        songId: "praise-05",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan E/G# menuju F#m7 dan A/C# menuju D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "A", lyrics: "I lay my life down at Your " },
                { chord: "E/G#", lyrics: "feet,", isBridge: true },
              ],
              [
                { chord: "F#m7", lyrics: "'Cause You're the only one I need," },
              ],
              [
                { chord: "E", lyrics: "I turn to You and You are " },
                { chord: "Dmaj7", lyrics: "always there." },
              ],
              [
                { chord: "A", lyrics: "In troubled times it's You I " },
                { chord: "E/G#", lyrics: "seek,", isBridge: true },
              ],
              [
                { chord: "F#m7", lyrics: "I put You first, that's all I need," },
              ],
              [
                { chord: "Esus4", lyrics: "I humble all I am, ", isBridge: true },
                { chord: "D", lyrics: "all to You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "A", lyrics: "One way, " },
                { chord: "E/G#", lyrics: "Jesus,", isBridge: true },
              ],
              [
                { chord: "F#m7", lyrics: "You're the only " },
                { chord: "A/C#", lyrics: "one that I could ", isBridge: true },
                { chord: "D", lyrics: "live for!" },
              ],
              [
                { chord: "A", lyrics: "One way, " },
                { chord: "E/G#", lyrics: "Jesus,", isBridge: true },
              ],
              [
                { chord: "F#m7", lyrics: "You're the only " },
                { chord: "D", lyrics: "one that I could live for!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 06. My Lighthouse
  {
    id: "praise-06",
    slug: "my-lighthouse",
    title: "My Lighthouse",
    artist: "Rend Collective",
    genre: "Praise (Cepat)",
    key: "C",
    bpm: 124,
    timeSignature: "4/4",
    durationSec: 225,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-900 to-stone-950",
    description:
      "Lagu pujian folk-pop yang sangat riang dalam C Mayor (124 BPM). Sangat cocok dimainkan dengan gitar akustik maupun full band.",
    strummingPattern: "D - D U D U D U (Folk-Praise Upbeat 4/4)",
    arrangements: [
      {
        id: "praise-06-pemula",
        songId: "praise-06",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: C, F, Am, dan G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "In my wrestling and " },
                { chord: "F", lyrics: "in my " },
                { chord: "C", lyrics: "doubts," },
              ],
              [
                { chord: "F", lyrics: "In my failures You " },
                { chord: "C", lyrics: "won't walk " },
                { chord: "G", lyrics: "out." },
              ],
              [
                { chord: "C", lyrics: "Your great love will " },
                { chord: "F", lyrics: "lead me " },
                { chord: "C", lyrics: "through," },
              ],
              [
                { chord: "Am", lyrics: "You are the " },
                { chord: "G", lyrics: "peace in my " },
                { chord: "F", lyrics: "troubled " },
                { chord: "C", lyrics: "sea." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "F", lyrics: "My Light-" },
                { chord: "C", lyrics: "house, my " },
                { chord: "Am", lyrics: "Light-" },
                { chord: "G", lyrics: "house," },
              ],
              [
                { chord: "F", lyrics: "Shining " },
                { chord: "C", lyrics: "in the " },
                { chord: "Am", lyrics: "dark-" },
                { chord: "G", lyrics: "ness," },
              ],
              [
                { chord: "F", lyrics: "I will " },
                { chord: "C", lyrics: "follow " },
                { chord: "Am", lyrics: "You, " },
                { chord: "G", lyrics: "oh," },
              ],
              [
                { chord: "F", lyrics: "You will " },
                { chord: "G", lyrics: "carry me " },
                { chord: "C", lyrics: "safe to shore!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-06-mahir",
        songId: "praise-06",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan C/E menuju F dan G/B menuju Am7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "In my wrestling " },
                { chord: "C/E", lyrics: "and ", isBridge: true },
                { chord: "F", lyrics: "in my " },
                { chord: "C", lyrics: "doubts," },
              ],
              [
                { chord: "F", lyrics: "In my failures " },
                { chord: "C/E", lyrics: "You ", isBridge: true },
                { chord: "C", lyrics: "won't walk " },
                { chord: "Gsus4", lyrics: "out. ", isBridge: true },
                { chord: "G", lyrics: "" },
              ],
              [
                { chord: "C", lyrics: "Your great love " },
                { chord: "C/E", lyrics: "will ", isBridge: true },
                { chord: "F", lyrics: "lead me " },
                { chord: "G/B", lyrics: "through,", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "You are the " },
                { chord: "G", lyrics: "peace in my " },
                { chord: "F", lyrics: "troubled " },
                { chord: "C", lyrics: "sea." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "F", lyrics: "My Light-" },
                { chord: "C", lyrics: "house, " },
                { chord: "G/B", lyrics: "my ", isBridge: true },
                { chord: "Am7", lyrics: "Light-" },
                { chord: "G", lyrics: "house," },
              ],
              [
                { chord: "F", lyrics: "Shining " },
                { chord: "C", lyrics: "in the " },
                { chord: "Am7", lyrics: "dark-" },
                { chord: "G", lyrics: "ness," },
              ],
              [
                { chord: "F", lyrics: "I will " },
                { chord: "C/E", lyrics: "follow ", isBridge: true },
                { chord: "Am7", lyrics: "You, " },
                { chord: "G", lyrics: "oh," },
              ],
              [
                { chord: "F", lyrics: "You will " },
                { chord: "G7sus4", lyrics: "carry me ", isBridge: true },
                { chord: "C", lyrics: "safe to shore!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 07. Lord I Lift Your Name on High
  {
    id: "praise-07",
    slug: "lord-i-lift-your-name-on-high",
    title: "Lord, I Lift Your Name on High",
    artist: "Rick Founds",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 120,
    timeSignature: "4/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-stone-900",
    description:
      "Lagu pujian klasik bertempo ceria (120 BPM) yang sangat terkenal. Mode Pemula menggunakan G-C-D-Em, sedangkan Mode Mahir menggunakan jembatan C/D dan B7 menuju Em.",
    strummingPattern: "D - D U - U D U (Classic Upbeat Praise 4/4)",
    arrangements: [
      {
        id: "praise-07-pemula",
        songId: "praise-07",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan akor dasar G, C, D, Em, dan Am.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Lord, I lift Your " },
                { chord: "C", lyrics: "name on " },
                { chord: "D", lyrics: "high," },
                { chord: "C", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "Lord, I love to " },
                { chord: "C", lyrics: "sing Your " },
                { chord: "D", lyrics: "praises;" },
                { chord: "C", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "I'm so glad You're " },
                { chord: "C", lyrics: "in my " },
                { chord: "D", lyrics: "life," },
                { chord: "C", lyrics: "" },
              ],
              [
                { chord: "G", lyrics: "I'm so glad You " },
                { chord: "C", lyrics: "came to " },
                { chord: "D", lyrics: "save us!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "You came from " },
                { chord: "C", lyrics: "heaven to " },
                { chord: "D", lyrics: "earth to " },
                { chord: "C", lyrics: "show the " },
                { chord: "G", lyrics: "way," },
              ],
              [
                { chord: "G", lyrics: "From the " },
                { chord: "C", lyrics: "earth to the " },
                { chord: "D", lyrics: "cross, my " },
                { chord: "C", lyrics: "debt to " },
                { chord: "G", lyrics: "pay;" },
              ],
              [
                { chord: "C", lyrics: "From the cross to the " },
                { chord: "D", lyrics: "grave, from the " },
                { chord: "Em", lyrics: "grave to the " },
                { chord: "Am", lyrics: "sky," },
              ],
              [
                { chord: "D", lyrics: "Lord, I lift Your name on " },
                { chord: "G", lyrics: "high!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-07-mahir",
        songId: "praise-07",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan G/B, D/F#, dan B7 sebagai dominant pengantar ke Em7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Lord, I lift Your " },
                { chord: "Cmaj7", lyrics: "name on " },
                { chord: "Dsus4", lyrics: "high, ", isBridge: true },
                { chord: "C/G", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Lord, I love to " },
                { chord: "Cmaj7", lyrics: "sing Your " },
                { chord: "Dsus4", lyrics: "praises; ", isBridge: true },
                { chord: "C/G", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "I'm so glad You're " },
                { chord: "Cmaj7", lyrics: "in my " },
                { chord: "Dsus4", lyrics: "life, ", isBridge: true },
                { chord: "C/E", lyrics: "", isBridge: true },
              ],
              [
                { chord: "G/B", lyrics: "I'm so glad You ", isBridge: true },
                { chord: "C", lyrics: "came to " },
                { chord: "D7sus4", lyrics: "save us!", isBridge: true },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "You came from " },
                { chord: "C", lyrics: "heaven to " },
                { chord: "D", lyrics: "earth to " },
                { chord: "C/E", lyrics: "show the ", isBridge: true },
                { chord: "G", lyrics: "way," },
              ],
              [
                { chord: "G/B", lyrics: "From the ", isBridge: true },
                { chord: "C", lyrics: "earth to the " },
                { chord: "D", lyrics: "cross, my " },
                { chord: "C/E", lyrics: "debt to ", isBridge: true },
                { chord: "G", lyrics: "pay;" },
              ],
              [
                { chord: "Am7", lyrics: "From the cross to the " },
                { chord: "B7", lyrics: "grave, from the ", isBridge: true },
                { chord: "Em7", lyrics: "grave to the " },
                { chord: "Am7", lyrics: "sky," },
              ],
              [
                { chord: "D7sus4", lyrics: "Lord, I lift Your name on ", isBridge: true },
                { chord: "G", lyrics: "high!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 08. Alive
  {
    id: "praise-08",
    slug: "alive-hillsong",
    title: "Alive",
    artist: "Hillsong Young & Free",
    genre: "Praise (Cepat)",
    key: "C",
    bpm: 132,
    timeSignature: "4/4",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-stone-900 to-zinc-950",
    description:
      "Lagu pujian kontemporer bertempo cepat (132 BPM) yang semarak untuk ibadah pemuda maupun ibadah raya.",
    strummingPattern: "D - D U D U D U (Modern Dance-Praise 4/4)",
    arrangements: [
      {
        id: "praise-08-pemula",
        songId: "praise-08",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: Am, F, C, dan G.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Am", lyrics: "I was lost with a " },
                { chord: "F", lyrics: "broken heart," },
              ],
              [
                { chord: "C", lyrics: "You picked me up, now I'm " },
                { chord: "G", lyrics: "set apart;" },
              ],
              [
                { chord: "Am", lyrics: "From the ash I am " },
                { chord: "F", lyrics: "born again," },
              ],
              [
                { chord: "C", lyrics: "Forever safe in the " },
                { chord: "G", lyrics: "Savior's hands!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "F", lyrics: "'Cause You are, You are, " },
                { chord: "G", lyrics: "You are my " },
                { chord: "Am", lyrics: "freedom," },
              ],
              [
                { chord: "F", lyrics: "We lift You " },
                { chord: "G", lyrics: "higher, " },
                { chord: "C", lyrics: "lift You higher!" },
              ],
              [
                { chord: "F", lyrics: "Your love, Your love, " },
                { chord: "G", lyrics: "Your love " },
                { chord: "Am", lyrics: "never ends," },
              ],
              [
                { chord: "F", lyrics: "Oh, You are a-" },
                { chord: "G", lyrics: "live in " },
                { chord: "C", lyrics: "us!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-08-mahir",
        songId: "praise-08",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan C/E dan G/B serta Fmaj7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Am7", lyrics: "I was lost with a " },
                { chord: "Fmaj7", lyrics: "broken heart," },
              ],
              [
                { chord: "C", lyrics: "You picked me up, now I'm " },
                { chord: "G/B", lyrics: "set a-", isBridge: true },
                { chord: "G", lyrics: "part;" },
              ],
              [
                { chord: "Am7", lyrics: "From the ash I am " },
                { chord: "Fmaj7", lyrics: "born again," },
              ],
              [
                { chord: "C/E", lyrics: "Forever safe ", isBridge: true },
                { chord: "C", lyrics: "in the " },
                { chord: "Gsus4", lyrics: "Savior's ", isBridge: true },
                { chord: "G", lyrics: "hands!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Fmaj7", lyrics: "'Cause You are, You are, " },
                { chord: "G", lyrics: "You are my " },
                { chord: "Am7", lyrics: "freedom," },
              ],
              [
                { chord: "Fmaj7", lyrics: "We lift You " },
                { chord: "G", lyrics: "higher, " },
                { chord: "C/E", lyrics: "lift You ", isBridge: true },
                { chord: "C", lyrics: "higher!" },
              ],
              [
                { chord: "Fmaj7", lyrics: "Your love, Your love, " },
                { chord: "G/B", lyrics: "Your love ", isBridge: true },
                { chord: "Am7", lyrics: "never ends," },
              ],
              [
                { chord: "Fmaj7", lyrics: "Oh, You are a-" },
                { chord: "Gsus4", lyrics: "live in ", isBridge: true },
                { chord: "C", lyrics: "us!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 09. Blessed Be Your Name
  {
    id: "praise-09",
    slug: "blessed-be-your-name",
    title: "Blessed Be Your Name",
    artist: "Matt & Beth Redman",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 120,
    timeSignature: "4/4",
    durationSec: 255,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-amber-950 to-stone-900",
    description:
      "Lagu pujian deklaratif dengan ketukan 4/4 yang mantap (120 BPM). Mode Mahir menyertakan jembatan D/F# dan G/B.",
    strummingPattern: "D - D U D U D U (Steady Rock-Praise 4/4)",
    arrangements: [
      {
        id: "praise-09-pemula",
        songId: "praise-09",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: G, D, Em, dan C.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Blessed be Your " },
                { chord: "D", lyrics: "name in the " },
                { chord: "Em", lyrics: "land that is " },
                { chord: "C", lyrics: "plentiful," },
              ],
              [
                { chord: "G", lyrics: "Where Your streams of a-" },
                { chord: "D", lyrics: "bundance flow, " },
                { chord: "C", lyrics: "blessed be Your name." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Every blessing You " },
                { chord: "D", lyrics: "pour out I'll " },
                { chord: "Em", lyrics: "turn back to " },
                { chord: "C", lyrics: "praise;" },
              ],
              [
                { chord: "G", lyrics: "When the darkness " },
                { chord: "D", lyrics: "closes in, Lord, " },
                { chord: "Em", lyrics: "still I will " },
                { chord: "C", lyrics: "say:" },
              ],
              [
                { chord: "G", lyrics: "Blessed be the " },
                { chord: "D", lyrics: "name of the " },
                { chord: "Em", lyrics: "Lord, " },
                { chord: "C", lyrics: "blessed be Your glorious " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-09-mahir",
        songId: "praise-09",
        instrument: "guitar",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menambahkan jembatan D/F#, G/B, dan Em7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Blessed be Your " },
                { chord: "D/F#", lyrics: "name in the ", isBridge: true },
                { chord: "Em7", lyrics: "land that is " },
                { chord: "C", lyrics: "plentiful," },
              ],
              [
                { chord: "G", lyrics: "Where Your streams of a-" },
                { chord: "D/F#", lyrics: "bundance flow, ", isBridge: true },
                { chord: "Cmaj7", lyrics: "blessed be Your name." },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Every blessing You " },
                { chord: "D/F#", lyrics: "pour out I'll ", isBridge: true },
                { chord: "Em7", lyrics: "turn back to " },
                { chord: "C", lyrics: "praise;" },
              ],
              [
                { chord: "G", lyrics: "When the darkness " },
                { chord: "D/F#", lyrics: "closes in, Lord, ", isBridge: true },
                { chord: "Em7", lyrics: "still I will " },
                { chord: "C", lyrics: "say:" },
              ],
              [
                { chord: "G", lyrics: "Blessed be the " },
                { chord: "D/F#", lyrics: "name of the ", isBridge: true },
                { chord: "Em7", lyrics: "Lord, " },
                { chord: "Cmaj7", lyrics: "blessed be Your glorious " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 10. Our God (Water You Turned Into Wine)
  {
    id: "praise-10",
    slug: "our-god-is-greater",
    title: "Our God (Water You Turned Into Wine)",
    artist: "Chris Tomlin, Matt Redman & Jonas Myrin",
    genre: "Praise (Cepat)",
    key: "G",
    bpm: 118,
    timeSignature: "4/4",
    durationSec: 265,
    difficulty: "Pemula",
    instruments: ["guitar", "piano", "bass"],
    source: "Contemporary Praise Repertoire",
    rightsStatus: "Licensed",
    coverGradient: "from-zinc-900 to-zinc-950",
    description:
      "Lagu pujian deklaratif penuh kuasa dengan hentakan drum dan bass yang tegas (118 BPM). Mode Mahir menyertakan jembatan D/F# dan G/B.",
    strummingPattern: "D - D U - U D U (Anthemic Praise 4/4)",
    arrangements: [
      {
        id: "praise-10-pemula",
        songId: "praise-10",
        instrument: "guitar",
        arrangementName: "Pemula · Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standard (E A D G B E)",
        notesSummary: "Menggunakan 4 akor dasar: Em, C, G, dan D.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Em", lyrics: "Water You " },
                { chord: "C", lyrics: "turned into " },
                { chord: "G", lyrics: "wine," },
              ],
              [
                { chord: "Em", lyrics: "Opened the " },
                { chord: "C", lyrics: "eyes of the " },
                { chord: "G", lyrics: "blind;" },
              ],
              [
                { chord: "Am", lyrics: "There's no one like You, " },
                { chord: "D", lyrics: "none like You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Em", lyrics: "Our God is greater, " },
                { chord: "C", lyrics: "our God is stronger," },
              ],
              [
                { chord: "G", lyrics: "God, You are higher than " },
                { chord: "D", lyrics: "any other!" },
              ],
              [
                { chord: "Em", lyrics: "Our God is Healer, " },
                { chord: "C", lyrics: "awesome in power," },
              ],
              [
                { chord: "G", lyrics: "Our God, " },
                { chord: "D", lyrics: "our God!" },
              ],
            ],
          },
        ],
      },
      {
        id: "praise-10-mahir",
        songId: "praise-10",
        instrument: "piano",
        arrangementName: "Mahir · Jembatan & Detail Chord",
        difficulty: "Mahir",
        tuning: "Standard Concert Pitch (A=440Hz)",
        notesSummary: "Menambahkan jembatan D/F# menuju Em7 serta G/B menuju Cmaj7.",
        sections: [
          {
            id: "v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "Em7", lyrics: "Water You " },
                { chord: "Cmaj7", lyrics: "turned into " },
                { chord: "G", lyrics: "wine, " },
                { chord: "D/F#", lyrics: "", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Opened the " },
                { chord: "Cmaj7", lyrics: "eyes of the " },
                { chord: "G", lyrics: "blind;" },
              ],
              [
                { chord: "Am7", lyrics: "There's no one like You, " },
                { chord: "Dsus4", lyrics: "none like ", isBridge: true },
                { chord: "D", lyrics: "You!" },
              ],
            ],
          },
          {
            id: "chorus",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "Em7", lyrics: "Our God is greater, " },
                { chord: "Cmaj7", lyrics: "our God is stronger," },
              ],
              [
                { chord: "G", lyrics: "God, You are higher than " },
                { chord: "D/F#", lyrics: "any other!", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Our God is Healer, " },
                { chord: "Cmaj7", lyrics: "awesome in power," },
              ],
              [
                { chord: "G/B", lyrics: "Our God, ", isBridge: true },
                { chord: "Dsus4", lyrics: "our ", isBridge: true },
                { chord: "D", lyrics: "God!" },
              ],
            ],
          },
        ],
      },
    ],
  },
];
