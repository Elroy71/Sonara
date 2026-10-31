import { Song } from "@/types/music";

export const HYMNS_PART_1: Song[] = [
  // 01. It Is Well with My Soul
  {
    id: "hymn-01",
    slug: "it-is-well-with-my-soul",
    title: "It Is Well with My Soul",
    artist: "Horatio G. Spafford & Philip P. Bliss (1873)",
    genre: "Hymn Klasik",
    key: "C",
    bpm: 76,
    timeSignature: "4/4",
    durationSec: 245,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Kidung tentang ketenangan iman di tengah badai kehidupan. Pemula menggunakan akor pokok C-F-G-Am-D, sedangkan Mahir menggunakan jembatan bass C/E, G/B, Am/G, D/F#, dan E7/G#.",
    strummingPattern: "D - D U - D - D U (4/4 Mengalir Tenang)",
    arrangements: [
      {
        id: "arr-01-pemula",
        songId: "hymn-01",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar (E A D G B E)",
        notesSummary: "Hanya menggunakan chord utama dasar (C, F, G, Am, D) pada ketukan pokok.",
        sections: [
          {
            id: "h01-p-intro",
            name: "Intro",
            lines: [
              [
                { chord: "C", lyrics: "(Iringan Pembuka)  ", beats: 2, melody: [64, 67] },
                { chord: "F", lyrics: "   ", beats: 2, melody: [69, 72] },
                { chord: "G", lyrics: "   ", beats: 2, melody: [71, 74] },
                { chord: "C", lyrics: "   ", beats: 2, melody: [72, 72] },
              ],
            ],
          },
          {
            id: "h01-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "When peace, like a river, at", beats: 4, melody: [67, 67, 65, 64] },
                { chord: "G", lyrics: "tendeth my ", beats: 2, melody: [62, 65] },
                { chord: "C", lyrics: "way,", beats: 2, melody: [64, 64] },
              ],
              [
                { chord: "Am", lyrics: "When sorrows like ", beats: 4, melody: [69, 72, 72, 71] },
                { chord: "D", lyrics: "sea billows ", beats: 2, melody: [69, 66] },
                { chord: "G", lyrics: "roll;", beats: 2, melody: [67, 67] },
              ],
              [
                { chord: "C", lyrics: "Whatever my ", beats: 2, melody: [67, 72] },
                { chord: "F", lyrics: "lot, Thou hast ", beats: 2, melody: [72, 69] },
                { chord: "D", lyrics: "taught me to ", beats: 2, melody: [69, 74] },
                { chord: "G", lyrics: "say,", beats: 2, melody: [71, 67] },
              ],
              [
                { chord: "C", lyrics: "It is well, ", beats: 2, melody: [67, 72] },
                { chord: "F", lyrics: "it is well ", beats: 2, melody: [72, 69] },
                { chord: "G", lyrics: "with my ", beats: 2, melody: [71, 71] },
                { chord: "C", lyrics: "soul.", beats: 2, melody: [72, 72] },
              ],
            ],
          },
          {
            id: "h01-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "It is well ", beats: 4, melody: [67, 67, 72, 72] },
                { chord: "G", lyrics: "(it is well) ", beats: 4, melody: [74, 77, 76, 74] },
              ],
              [
                { chord: "G", lyrics: "With my soul ", beats: 4, melody: [67, 67, 71, 71] },
                { chord: "C", lyrics: "(with my soul),", beats: 4, melody: [76, 74, 72, 67] },
              ],
              [
                { chord: "F", lyrics: "It is well, ", beats: 2, melody: [69, 72] },
                { chord: "G", lyrics: "it is well with my ", beats: 2, melody: [71, 71] },
                { chord: "C", lyrics: "soul.", beats: 4, melody: [72, 76, 79, 72] },
              ],
            ],
          },
          {
            id: "h01-p-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "C", lyrics: "Though Satan should buffet, though ", beats: 4, melody: [67, 67, 65, 64] },
                { chord: "G", lyrics: "trials should ", beats: 2, melody: [62, 65] },
                { chord: "C", lyrics: "come,", beats: 2, melody: [64, 64] },
              ],
              [
                { chord: "Am", lyrics: "Let this blest as", beats: 4, melody: [69, 72, 72, 71] },
                { chord: "D", lyrics: "surance con", beats: 2, melody: [69, 66] },
                { chord: "G", lyrics: "trol,", beats: 2, melody: [67, 67] },
              ],
              [
                { chord: "C", lyrics: "That Christ hath re", beats: 2, melody: [67, 72] },
                { chord: "F", lyrics: "garded my ", beats: 2, melody: [72, 69] },
                { chord: "D", lyrics: "helpless es", beats: 2, melody: [69, 74] },
                { chord: "G", lyrics: "tate,", beats: 2, melody: [71, 67] },
              ],
              [
                { chord: "C", lyrics: "And hath shed ", beats: 2, melody: [67, 72] },
                { chord: "F", lyrics: "His own blood ", beats: 2, melody: [72, 69] },
                { chord: "G", lyrics: "for my ", beats: 2, melody: [71, 71] },
                { chord: "C", lyrics: "soul.", beats: 2, melody: [72, 72] },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-01-mahir",
        songId: "hymn-01",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar (Walking Bass & Extended Voicing)",
        notesSummary:
          "Jembatan bass turun (C -> G/B -> Am7 -> Am/G), secondary dominant (D/F# -> Gsus4 -> G7 dan E7/G# -> Am7), serta cadential 6/4 (C/G -> G7 -> C).",
        sections: [
          {
            id: "h01-m-intro",
            name: "Intro",
            lines: [
              [
                { chord: "Cmaj7", lyrics: "(Harmoni Penuh) ", beats: 2, melody: [64, 67] },
                { chord: "C/E", lyrics: "  ", isBridge: true, beats: 2, melody: [67, 71] },
                { chord: "Fmaj7", lyrics: "  ", beats: 2, melody: [69, 72] },
                { chord: "G/B", lyrics: "  ", isBridge: true, beats: 2, melody: [71, 74] },
                { chord: "Cmaj7", lyrics: "  ", beats: 4, melody: [76, 72, 71, 67] },
                { chord: "Gsus4", lyrics: " ", isBridge: true, beats: 2, melody: [67, 72] },
                { chord: "G7", lyrics: " ", isBridge: true, beats: 2, melody: [71, 67] },
              ],
            ],
          },
          {
            id: "h01-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "When peace, like a ", beats: 2, melody: [67, 67] },
                { chord: "C/E", lyrics: "river, ", isBridge: true, beats: 2, melody: [65, 64] },
                { chord: "F", lyrics: "attendeth ", beats: 2, melody: [65, 65] },
                { chord: "G/B", lyrics: "my ", isBridge: true, beats: 2, melody: [62, 65] },
                { chord: "C", lyrics: "way, ", beats: 2, melody: [64, 64] },
                { chord: "G/B", lyrics: " ", isBridge: true, beats: 2, melody: [67, 71] },
              ],
              [
                { chord: "Am7", lyrics: "When sorrows ", beats: 2, melody: [69, 72] },
                { chord: "Am/G", lyrics: "like ", isBridge: true, beats: 2, melody: [72, 71] },
                { chord: "D/F#", lyrics: "sea billows ", isBridge: true, beats: 2, melody: [69, 66] },
                { chord: "Gsus4", lyrics: "roll— ", isBridge: true, beats: 1, melody: [67] },
                { chord: "G", lyrics: " ", beats: 1, melody: [67] },
              ],
              [
                { chord: "C", lyrics: "Whatever ", beats: 1, melody: [67] },
                { chord: "C/E", lyrics: "my ", isBridge: true, beats: 1, melody: [72] },
                { chord: "Fmaj7", lyrics: "lot, Thou ", beats: 2, melody: [72, 69] },
                { chord: "E7/G#", lyrics: "hast ", isBridge: true, beats: 2, melody: [68, 71] },
                { chord: "Am7", lyrics: "taught ", beats: 1, melody: [69] },
                { chord: "D7", lyrics: "me to ", beats: 1, melody: [74] },
                { chord: "Gsus4", lyrics: "say, ", isBridge: true, beats: 2, melody: [72, 71] },
                { chord: "G7", lyrics: " ", beats: 2, melody: [71, 67] },
              ],
              [
                { chord: "C/E", lyrics: "It is well, ", isBridge: true, beats: 2, melody: [67, 72] },
                { chord: "Fmaj7", lyrics: "it is well ", beats: 2, melody: [72, 69] },
                { chord: "C/G", lyrics: "with ", isBridge: true, beats: 2, melody: [67, 71] },
                { chord: "G7", lyrics: "my ", beats: 1, melody: [71] },
                { chord: "C", lyrics: "soul.", beats: 1, melody: [72] },
              ],
            ],
          },
          {
            id: "h01-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "It is ", beats: 2, melody: [67, 67] },
                { chord: "G/B", lyrics: "well ", isBridge: true, beats: 2, melody: [71, 72] },
                { chord: "Gsus4", lyrics: "(it is ", isBridge: true, beats: 2, melody: [74, 77] },
                { chord: "G7", lyrics: "well)", beats: 2, melody: [76, 74] },
              ],
              [
                { chord: "G7", lyrics: "With my ", beats: 2, melody: [67, 67] },
                { chord: "G/B", lyrics: "soul ", isBridge: true, beats: 2, melody: [71, 71] },
                { chord: "C/E", lyrics: "(with ", isBridge: true, beats: 2, melody: [76, 74] },
                { chord: "C", lyrics: "my soul),", beats: 2, melody: [72, 67] },
              ],
              [
                { chord: "Fmaj7", lyrics: "It is well, ", beats: 2, melody: [69, 72] },
                { chord: "Dm7", lyrics: "it is ", isBridge: true, beats: 2, melody: [72, 74] },
                { chord: "C/G", lyrics: "well ", isBridge: true, beats: 2, melody: [72, 71] },
                { chord: "G7", lyrics: "with my ", beats: 1, melody: [71] },
                { chord: "C", lyrics: "soul.", beats: 1, melody: [72] },
              ],
            ],
          },
          {
            id: "h01-m-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "C", lyrics: "Though Satan should ", beats: 2, melody: [67, 67] },
                { chord: "C/E", lyrics: "buffet, ", isBridge: true, beats: 2, melody: [65, 64] },
                { chord: "F", lyrics: "though trials ", beats: 2, melody: [65, 65] },
                { chord: "G/B", lyrics: "should ", isBridge: true, beats: 2, melody: [62, 65] },
                { chord: "C", lyrics: "come, ", beats: 2, melody: [64, 64] },
                { chord: "G/B", lyrics: " ", isBridge: true, beats: 2, melody: [67, 71] },
              ],
              [
                { chord: "Am7", lyrics: "Let this blest ", beats: 2, melody: [69, 72] },
                { chord: "Am/G", lyrics: "as", isBridge: true, beats: 2, melody: [72, 71] },
                { chord: "D/F#", lyrics: "surance con", isBridge: true, beats: 2, melody: [69, 66] },
                { chord: "Gsus4", lyrics: "trol— ", isBridge: true, beats: 1, melody: [67] },
                { chord: "G", lyrics: " ", beats: 1, melody: [67] },
              ],
              [
                { chord: "C", lyrics: "That Christ ", beats: 1, melody: [67] },
                { chord: "C/E", lyrics: "hath re", isBridge: true, beats: 1, melody: [72] },
                { chord: "Fmaj7", lyrics: "garded ", beats: 2, melody: [72, 69] },
                { chord: "E7/G#", lyrics: "my ", isBridge: true, beats: 2, melody: [68, 71] },
                { chord: "Am7", lyrics: "helpless ", beats: 1, melody: [69] },
                { chord: "D7", lyrics: "es", beats: 1, melody: [74] },
                { chord: "Gsus4", lyrics: "tate, ", isBridge: true, beats: 2, melody: [72, 71] },
                { chord: "G7", lyrics: " ", beats: 2, melody: [71, 67] },
              ],
              [
                { chord: "C/E", lyrics: "And hath shed ", isBridge: true, beats: 2, melody: [67, 72] },
                { chord: "Fmaj7", lyrics: "His own blood ", beats: 2, melody: [72, 69] },
                { chord: "C/G", lyrics: "for ", isBridge: true, beats: 2, melody: [67, 71] },
                { chord: "G7", lyrics: "my ", beats: 1, melody: [71] },
                { chord: "C", lyrics: "soul.", beats: 1, melody: [72] },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 02. I Love to Tell the Story
  {
    id: "hymn-02",
    slug: "i-love-to-tell-the-story",
    title: "I Love to Tell the Story",
    artist: "Katherine Hankey & William G. Fischer (1869)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 88,
    timeSignature: "4/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu kesaksian klasik dalam nada dasar G Mayor. Mode Pemula fokus pada G-C-D-Em, sedangkan Mode Mahir memperkaya perpindahan dengan G/B, D/F#, A7, Em7, dan G/D.",
    strummingPattern: "D - D U D U (4/4 Mantap)",
    arrangements: [
      {
        id: "arr-02-pemula",
        songId: "hymn-02",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan empat chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h02-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I love to tell the " },
                { chord: "C", lyrics: "story of " },
                { chord: "G", lyrics: "unseen things a" },
                { chord: "D", lyrics: "bove," },
              ],
              [
                { chord: "G", lyrics: "Of Jesus and His " },
                { chord: "C", lyrics: "glory, of " },
                { chord: "D", lyrics: "Jesus and His " },
                { chord: "G", lyrics: "love." },
              ],
              [
                { chord: "D", lyrics: "I love to tell the " },
                { chord: "G", lyrics: "story, be" },
                { chord: "Em", lyrics: "cause I know 'tis " },
                { chord: "D", lyrics: "true;" },
              ],
              [
                { chord: "G", lyrics: "It satisfies my " },
                { chord: "C", lyrics: "longings as " },
                { chord: "D", lyrics: "nothing else can " },
                { chord: "G", lyrics: "do." },
              ],
            ],
          },
          {
            id: "h02-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I love to tell the " },
                { chord: "G", lyrics: "story, 'twill " },
                { chord: "C", lyrics: "be my theme in " },
                { chord: "G", lyrics: "glory," },
              ],
              [
                { chord: "G", lyrics: "To tell the old, old " },
                { chord: "C", lyrics: "story of " },
                { chord: "D", lyrics: "Jesus and His " },
                { chord: "G", lyrics: "love." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-02-mahir",
        songId: "hymn-02",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan bass G/B menuju Cadd9, D/F# menuju Em7, jembatan dominan A7 menuju Dsus4-D7, serta penutup G/D -> D7 -> G.",
        sections: [
          {
            id: "h02-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I love to " },
                { chord: "G/B", lyrics: "tell the ", isBridge: true },
                { chord: "Cadd9", lyrics: "story of " },
                { chord: "G/D", lyrics: "unseen ", isBridge: true },
                { chord: "Em7", lyrics: "things a", isBridge: true },
                { chord: "A7", lyrics: "bove, ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "Of Jesus " },
                { chord: "G/B", lyrics: "and His ", isBridge: true },
                { chord: "C", lyrics: "glory, of " },
                { chord: "G/D", lyrics: "Jesus ", isBridge: true },
                { chord: "D7", lyrics: "and His " },
                { chord: "G", lyrics: "love." },
              ],
              [
                { chord: "D", lyrics: "I love to " },
                { chord: "D/F#", lyrics: "tell the ", isBridge: true },
                { chord: "G", lyrics: "story, be" },
                { chord: "B7", lyrics: "cause I ", isBridge: true },
                { chord: "Em7", lyrics: "know 'tis " },
                { chord: "A7", lyrics: "true; ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "It satis" },
                { chord: "G7", lyrics: "fies my ", isBridge: true },
                { chord: "C", lyrics: "longings " },
                { chord: "Am7", lyrics: "as ", isBridge: true },
                { chord: "G/D", lyrics: "nothing ", isBridge: true },
                { chord: "D7", lyrics: "else can " },
                { chord: "G", lyrics: "do." },
              ],
            ],
          },
          {
            id: "h02-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D7", lyrics: "I love to " },
                { chord: "D/F#", lyrics: "tell the ", isBridge: true },
                { chord: "G", lyrics: "story, " },
                { chord: "G7", lyrics: "'twill ", isBridge: true },
                { chord: "C", lyrics: "be my theme " },
                { chord: "Am7", lyrics: "in ", isBridge: true },
                { chord: "G", lyrics: "glory, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "To tell the ", isBridge: true },
                { chord: "G/B", lyrics: "old, old ", isBridge: true },
                { chord: "C", lyrics: "story " },
                { chord: "Am7", lyrics: "of ", isBridge: true },
                { chord: "G/D", lyrics: "Jesus ", isBridge: true },
                { chord: "D7", lyrics: "and His " },
                { chord: "G", lyrics: "love." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 03. Old Rugged Cross
  {
    id: "hymn-03",
    slug: "old-rugged-cross",
    title: "Old Rugged Cross",
    artist: "George Bennard (1913)",
    genre: "Hymn Klasik (Waltz 3/4)",
    key: "A",
    bpm: 92,
    timeSignature: "3/4",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn berbirama 3/4 yang sangat populer. Mode Pemula memakai A-D-E-F#m, sedangkan Mode Mahir menggunakan jembatan A/C#, A7, Dmaj7, Bm7, E/G#, dan D/A.",
    strummingPattern: "Bass - Down - Down (Waltz 3/4)",
    arrangements: [
      {
        id: "arr-03-pemula",
        songId: "hymn-03",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord utama A, D, E, dan F#m dalam ketukan 3/4.",
        sections: [
          {
            id: "h03-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "A", lyrics: "On a hill far a" },
                { chord: "D", lyrics: "way stood an " },
                { chord: "E", lyrics: "old rugged " },
                { chord: "A", lyrics: "cross," },
              ],
              [
                { chord: "A", lyrics: "The emblem of " },
                { chord: "D", lyrics: "suff'ring and " },
                { chord: "E", lyrics: "shame;" },
              ],
              [
                { chord: "A", lyrics: "And I love that old " },
                { chord: "D", lyrics: "cross where the " },
                { chord: "E", lyrics: "dearest and " },
                { chord: "A", lyrics: "best" },
              ],
              [
                { chord: "D", lyrics: "For a world of lost " },
                { chord: "E", lyrics: "sinners was " },
                { chord: "A", lyrics: "slain." },
              ],
            ],
          },
          {
            id: "h03-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "E", lyrics: "So I'll cherish the " },
                { chord: "A", lyrics: "old rugged cross," },
              ],
              [
                { chord: "D", lyrics: "Till my trophies at " },
                { chord: "A", lyrics: "last I lay down;" },
              ],
              [
                { chord: "A", lyrics: "I will cling to the " },
                { chord: "D", lyrics: "old rugged cross," },
              ],
              [
                { chord: "A", lyrics: "And exchange it some " },
                { chord: "E", lyrics: "day for a " },
                { chord: "A", lyrics: "crown." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-03-mahir",
        songId: "hymn-03",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Menambahkan jembatan A/C# -> Dmaj7, E/G# -> A, jembatan A7 menuju subdominan D, serta Bm7 -> E7 -> A.",
        sections: [
          {
            id: "h03-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "A", lyrics: "On a hill " },
                { chord: "A/C#", lyrics: "far a", isBridge: true },
                { chord: "Dmaj7", lyrics: "way stood an " },
                { chord: "E7", lyrics: "old rugged " },
                { chord: "A", lyrics: "cross, " },
                { chord: "E/G#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "F#m", lyrics: "The emblem " },
                { chord: "B7", lyrics: "of suff'ring ", isBridge: true },
                { chord: "Bm7", lyrics: "and ", isBridge: true },
                { chord: "E7", lyrics: "shame;" },
              ],
              [
                { chord: "A", lyrics: "And I love " },
                { chord: "A7", lyrics: "that old ", isBridge: true },
                { chord: "Dmaj7", lyrics: "cross where the " },
                { chord: "B7", lyrics: "dearest and ", isBridge: true },
                { chord: "E7", lyrics: "best" },
              ],
              [
                { chord: "D", lyrics: "For a world " },
                { chord: "Bm7", lyrics: "of lost ", isBridge: true },
                { chord: "A/C#", lyrics: "sinners ", isBridge: true },
                { chord: "E7", lyrics: "was " },
                { chord: "A", lyrics: "slain." },
              ],
            ],
          },
          {
            id: "h03-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "E7", lyrics: "So I'll cherish " },
                { chord: "E/G#", lyrics: "the ", isBridge: true },
                { chord: "A", lyrics: "old rugged " },
                { chord: "A7", lyrics: "cross, ", isBridge: true },
              ],
              [
                { chord: "Dmaj7", lyrics: "Till my trophies " },
                { chord: "Bm7", lyrics: "at last ", isBridge: true },
                { chord: "A/C#", lyrics: "I lay ", isBridge: true },
                { chord: "A", lyrics: "down;" },
              ],
              [
                { chord: "A", lyrics: "I will cling " },
                { chord: "A7", lyrics: "to the ", isBridge: true },
                { chord: "D", lyrics: "old rugged " },
                { chord: "Dm", lyrics: "cross, ", isBridge: true },
              ],
              [
                { chord: "A/C#", lyrics: "And exchange ", isBridge: true },
                { chord: "Bm7", lyrics: "it some ", isBridge: true },
                { chord: "E7", lyrics: "day for a " },
                { chord: "D/A", lyrics: " ", isBridge: true },
                { chord: "A", lyrics: "crown." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 04. Fairest Lord Jesus
  {
    id: "hymn-04",
    slug: "fairest-lord-jesus",
    title: "Fairest Lord Jesus",
    artist: "Münster Gesangbuch & Richard S. Willis (1850)",
    genre: "Hymn Klasik",
    key: "F",
    bpm: 80,
    timeSignature: "4/4",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Pujian klasik yang agung dalam nada dasar F Mayor. Mode Pemula memakai F-Bb-C-Dm, dan Mode Mahir menambahkan jembatan F/A, C/E, Gm7, Dm7, dan A7.",
    strummingPattern: "D - D U - D - D U (4/4 Khidmat)",
    arrangements: [
      {
        id: "arr-04-pemula",
        songId: "hymn-04",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar F, Bb, C, dan Dm.",
        sections: [
          {
            id: "h04-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "Fairest Lord " },
                { chord: "Dm", lyrics: "Jesus, " },
                { chord: "Bb", lyrics: "Ruler of all " },
                { chord: "C", lyrics: "nature," },
              ],
              [
                { chord: "F", lyrics: "O Thou of " },
                { chord: "Bb", lyrics: "God and " },
                { chord: "C", lyrics: "man the " },
                { chord: "F", lyrics: "Son!" },
              ],
              [
                { chord: "F", lyrics: "Thee will I " },
                { chord: "Bb", lyrics: "cherish, " },
                { chord: "F", lyrics: "Thee will I " },
                { chord: "C", lyrics: "honor," },
              ],
              [
                { chord: "F", lyrics: "Thou, my soul's " },
                { chord: "Bb", lyrics: "glory, " },
                { chord: "C", lyrics: "joy, and " },
                { chord: "F", lyrics: "crown." },
              ],
            ],
          },
          {
            id: "h04-p-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "F", lyrics: "Fair are the " },
                { chord: "Dm", lyrics: "meadows, " },
                { chord: "Bb", lyrics: "fairer still the " },
                { chord: "C", lyrics: "woodlands," },
              ],
              [
                { chord: "F", lyrics: "Robed in the " },
                { chord: "Bb", lyrics: "blooming " },
                { chord: "C", lyrics: "garb of " },
                { chord: "F", lyrics: "spring:" },
              ],
              [
                { chord: "F", lyrics: "Jesus is " },
                { chord: "Bb", lyrics: "fairer, " },
                { chord: "F", lyrics: "Jesus is " },
                { chord: "C", lyrics: "purer," },
              ],
              [
                { chord: "F", lyrics: "Who makes the " },
                { chord: "Bb", lyrics: "woeful " },
                { chord: "C", lyrics: "heart to " },
                { chord: "F", lyrics: "sing." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-04-mahir",
        songId: "hymn-04",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan bass F -> C/E -> Dm7 -> F/C, transisi A7 menuju Dm7, serta Gm7 -> F/C -> C7 -> F.",
        sections: [
          {
            id: "h04-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "Fairest " },
                { chord: "C/E", lyrics: "Lord ", isBridge: true },
                { chord: "Dm7", lyrics: "Jesus, " },
                { chord: "F/C", lyrics: " ", isBridge: true },
                { chord: "Bb", lyrics: "Ruler " },
                { chord: "Gm7", lyrics: "of all ", isBridge: true },
                { chord: "C7", lyrics: "nature," },
              ],
              [
                { chord: "F", lyrics: "O Thou " },
                { chord: "F/A", lyrics: "of ", isBridge: true },
                { chord: "Bb", lyrics: "God and " },
                { chord: "F/C", lyrics: "man ", isBridge: true },
                { chord: "C7", lyrics: "the " },
                { chord: "F", lyrics: "Son!" },
              ],
              [
                { chord: "F", lyrics: "Thee will " },
                { chord: "F/A", lyrics: "I ", isBridge: true },
                { chord: "Bb", lyrics: "cherish, " },
                { chord: "A7", lyrics: "Thee will ", isBridge: true },
                { chord: "Dm7", lyrics: "I ", isBridge: true },
                { chord: "G7", lyrics: "hon", isBridge: true },
                { chord: "C7", lyrics: "or," },
              ],
              [
                { chord: "F/A", lyrics: "Thou, my ", isBridge: true },
                { chord: "Bb", lyrics: "soul's glory, " },
                { chord: "Gm7", lyrics: "joy, ", isBridge: true },
                { chord: "C7", lyrics: "and " },
                { chord: "F", lyrics: "crown." },
              ],
            ],
          },
          {
            id: "h04-m-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "F", lyrics: "Fair are " },
                { chord: "C/E", lyrics: "the ", isBridge: true },
                { chord: "Dm7", lyrics: "meadows, " },
                { chord: "F/C", lyrics: " ", isBridge: true },
                { chord: "Bb", lyrics: "fairer still " },
                { chord: "Gm7", lyrics: "the ", isBridge: true },
                { chord: "C7", lyrics: "woodlands," },
              ],
              [
                { chord: "F", lyrics: "Robed in " },
                { chord: "F/A", lyrics: "the ", isBridge: true },
                { chord: "Bb", lyrics: "blooming " },
                { chord: "F/C", lyrics: "garb ", isBridge: true },
                { chord: "C7", lyrics: "of " },
                { chord: "F", lyrics: "spring:" },
              ],
              [
                { chord: "F", lyrics: "Jesus " },
                { chord: "F/A", lyrics: "is ", isBridge: true },
                { chord: "Bb", lyrics: "fairer, " },
                { chord: "A7", lyrics: "Jesus ", isBridge: true },
                { chord: "Dm7", lyrics: "is ", isBridge: true },
                { chord: "G7", lyrics: "pur", isBridge: true },
                { chord: "C7", lyrics: "er," },
              ],
              [
                { chord: "F/A", lyrics: "Who makes ", isBridge: true },
                { chord: "Bb", lyrics: "the woeful " },
                { chord: "Gm7", lyrics: "heart ", isBridge: true },
                { chord: "C7", lyrics: "to " },
                { chord: "F", lyrics: "sing." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 05. Come Thou Fount of Every Blessing
  {
    id: "hymn-05",
    slug: "come-thou-fount-of-every-blessing",
    title: "Come Thou Fount of Every Blessing",
    artist: "Robert Robinson & John Wyeth (1758)",
    genre: "Hymn Klasik",
    key: "D",
    bpm: 84,
    timeSignature: "3/4",
    durationSec: 220,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu syukur abadi dalam nada dasar D Mayor. Mode Pemula menggunakan D-G-A-Bm, sedangkan Mode Mahir menambahkan D/F#, Gmaj7, Asus4, A7, F#m7, dan D/A.",
    strummingPattern: "D - D U - D U (3/4 Mengalir)",
    arrangements: [
      {
        id: "arr-05-pemula",
        songId: "hymn-05",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord utama D, G, A, dan Bm.",
        sections: [
          {
            id: "h05-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Come, Thou Fount of " },
                { chord: "A", lyrics: "every " },
                { chord: "D", lyrics: "blessing," },
              ],
              [
                { chord: "G", lyrics: "Tune my heart to " },
                { chord: "A", lyrics: "sing Thy " },
                { chord: "D", lyrics: "grace;" },
              ],
              [
                { chord: "D", lyrics: "Streams of mercy, " },
                { chord: "A", lyrics: "never " },
                { chord: "D", lyrics: "ceasing," },
              ],
              [
                { chord: "G", lyrics: "Call for songs of " },
                { chord: "A", lyrics: "loudest " },
                { chord: "D", lyrics: "praise." },
              ],
              [
                { chord: "D", lyrics: "Teach me some me" },
                { chord: "G", lyrics: "lodious " },
                { chord: "Bm", lyrics: "sonnet," },
              ],
              [
                { chord: "G", lyrics: "Sung by flaming " },
                { chord: "A", lyrics: "tongues a" },
                { chord: "D", lyrics: "bove." },
              ],
              [
                { chord: "D", lyrics: "Praise the mount! I'm " },
                { chord: "A", lyrics: "fixed up" },
                { chord: "D", lyrics: "on it," },
              ],
              [
                { chord: "G", lyrics: "Mount of Thy re" },
                { chord: "A", lyrics: "deeming " },
                { chord: "D", lyrics: "love." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-05-mahir",
        songId: "hymn-05",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan bass D/F# menuju Gmaj7, A/C# menuju Bm7, Em7 -> Asus4 -> A7, serta kadens D/A -> A7 -> D.",
        sections: [
          {
            id: "h05-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Come, Thou " },
                { chord: "D/F#", lyrics: "Fount of ", isBridge: true },
                { chord: "G", lyrics: "every ", isBridge: true },
                { chord: "Asus4", lyrics: "bless", isBridge: true },
                { chord: "A7", lyrics: "ing, " },
                { chord: "D", lyrics: " " },
              ],
              [
                { chord: "Gmaj7", lyrics: "Tune my " },
                { chord: "Em7", lyrics: "heart to ", isBridge: true },
                { chord: "A7", lyrics: "sing Thy " },
                { chord: "D", lyrics: "grace; " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "Streams of ", isBridge: true },
                { chord: "D/F#", lyrics: "mercy, ", isBridge: true },
                { chord: "G", lyrics: "never ", isBridge: true },
                { chord: "A7", lyrics: "ceas" },
                { chord: "D", lyrics: "ing," },
              ],
              [
                { chord: "Gmaj7", lyrics: "Call for " },
                { chord: "D/A", lyrics: "songs of ", isBridge: true },
                { chord: "A7", lyrics: "loudest " },
                { chord: "D", lyrics: "praise." },
              ],
              [
                { chord: "D", lyrics: "Teach me " },
                { chord: "A/C#", lyrics: "some me", isBridge: true },
                { chord: "Bm7", lyrics: "lodious " },
                { chord: "F#m", lyrics: "sonnet, ", isBridge: true },
              ],
              [
                { chord: "Gmaj7", lyrics: "Sung by " },
                { chord: "Em7", lyrics: "flaming ", isBridge: true },
                { chord: "Asus4", lyrics: "tongues a", isBridge: true },
                { chord: "A7", lyrics: "bove." },
              ],
              [
                { chord: "D", lyrics: "Praise the " },
                { chord: "D/F#", lyrics: "mount! I'm ", isBridge: true },
                { chord: "Gmaj7", lyrics: "fixed up", isBridge: true },
                { chord: "A7", lyrics: "on " },
                { chord: "Bm7", lyrics: "it, ", isBridge: true },
              ],
              [
                { chord: "Gmaj7", lyrics: "Mount of " },
                { chord: "D/A", lyrics: "Thy re", isBridge: true },
                { chord: "A7", lyrics: "deeming " },
                { chord: "D", lyrics: "love." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 06. Blessed Assurance
  {
    id: "hymn-06",
    slug: "blessed-assurance",
    title: "Blessed Assurance",
    artist: "Fanny J. Crosby & Phoebe P. Knapp (1873)",
    genre: "Hymn Klasik (6/8)",
    key: "D",
    bpm: 102,
    timeSignature: "6/8",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu jaminan keselamatan berbirama 6/8. Mode Pemula menggunakan D-G-A-Em-E, sedangkan Mode Mahir menambahkan D/F#, Gmaj7, E7/G#, Asus4, A/C#, dan Bm7.",
    strummingPattern: "D - D - D U (Ayunan 6/8)",
    arrangements: [
      {
        id: "arr-06-pemula",
        songId: "hymn-06",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar D, G, A, dan E dalam ayunan 6/8.",
        sections: [
          {
            id: "h06-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Blessed assurance, " },
                { chord: "G", lyrics: "Jesus is " },
                { chord: "D", lyrics: "mine!" },
              ],
              [
                { chord: "D", lyrics: "O what a foretaste of " },
                { chord: "E", lyrics: "glory di" },
                { chord: "A", lyrics: "vine!" },
              ],
              [
                { chord: "D", lyrics: "Heir of salvation, " },
                { chord: "G", lyrics: "purchase of " },
                { chord: "D", lyrics: "God," },
              ],
              [
                { chord: "G", lyrics: "Born of His Spirit, " },
                { chord: "A", lyrics: "washed in His " },
                { chord: "D", lyrics: "blood." },
              ],
            ],
          },
          {
            id: "h06-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "This is my story, " },
                { chord: "G", lyrics: "this is my " },
                { chord: "D", lyrics: "song," },
              ],
              [
                { chord: "G", lyrics: "Praising my " },
                { chord: "D", lyrics: "Savior all the day " },
                { chord: "A", lyrics: "long;" },
              ],
              [
                { chord: "D", lyrics: "This is my story, " },
                { chord: "G", lyrics: "this is my " },
                { chord: "D", lyrics: "song," },
              ],
              [
                { chord: "G", lyrics: "Praising my Savior " },
                { chord: "A", lyrics: "all the day " },
                { chord: "D", lyrics: "long." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-06-mahir",
        songId: "hymn-06",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan D/F# -> Gmaj7 -> D/A, secondary dominant B7 -> E7/G# -> Asus4 -> A7, serta A/C# -> Bm7 -> Em7 -> A7 -> D.",
        sections: [
          {
            id: "h06-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Blessed as" },
                { chord: "D/F#", lyrics: "surance, ", isBridge: true },
                { chord: "Gmaj7", lyrics: "Jesus is " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
                { chord: "D", lyrics: "mine!" },
              ],
              [
                { chord: "Bm7", lyrics: "O what a ", isBridge: true },
                { chord: "E7/G#", lyrics: "foretaste of ", isBridge: true },
                { chord: "E7", lyrics: "glory di" },
                { chord: "Asus4", lyrics: "vine! ", isBridge: true },
                { chord: "A7", lyrics: " " },
              ],
              [
                { chord: "D", lyrics: "Heir of sal" },
                { chord: "D/F#", lyrics: "vation, ", isBridge: true },
                { chord: "Gmaj7", lyrics: "purchase of " },
                { chord: "D", lyrics: "God, " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "Born of His ", isBridge: true },
                { chord: "Em7", lyrics: "Spirit, " },
                { chord: "D/A", lyrics: "washed in ", isBridge: true },
                { chord: "A7", lyrics: "His " },
                { chord: "D", lyrics: "blood." },
              ],
            ],
          },
          {
            id: "h06-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "This is my " },
                { chord: "D/F#", lyrics: "story, ", isBridge: true },
                { chord: "G", lyrics: "this is my " },
                { chord: "D", lyrics: "song, " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "Praising my ", isBridge: true },
                { chord: "G", lyrics: "Savior " },
                { chord: "E7/G#", lyrics: "all the day ", isBridge: true },
                { chord: "Asus4", lyrics: "long; ", isBridge: true },
                { chord: "A7", lyrics: " " },
              ],
              [
                { chord: "D", lyrics: "This is my " },
                { chord: "D7/F#", lyrics: "story, ", isBridge: true },
                { chord: "Gmaj7", lyrics: "this is my " },
                { chord: "Em7", lyrics: "song, ", isBridge: true },
              ],
              [
                { chord: "D/A", lyrics: "Praising my ", isBridge: true },
                { chord: "Bm7", lyrics: "Savior ", isBridge: true },
                { chord: "Em7", lyrics: "all the ", isBridge: true },
                { chord: "A7", lyrics: "day " },
                { chord: "D", lyrics: "long." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 07. Amazing Grace
  {
    id: "hymn-07",
    slug: "amazing-grace",
    title: "Amazing Grace",
    artist: "John Newton (1779)",
    genre: "Hymn Klasik (3/4)",
    key: "G",
    bpm: 78,
    timeSignature: "3/4",
    durationSec: 240,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn kasih karunia paling terkenal sepanjang masa dalam nada dasar G Mayor (3/4). Mode Pemula menggunakan 3 chord dasar (G-C-D), sedangkan Mode Mahir menggunakan jembatan G7/B, Cmaj7, B7, Em7, Am7, dan G/D.",
    strummingPattern: "Bass - Down - Down U (Waltz 3/4)",
    arrangements: [
      {
        id: "arr-07-pemula",
        songId: "hymn-07",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Hanya menggunakan 3 chord dasar: G, C, dan D (serta Em).",
        sections: [
          {
            id: "h07-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Amazing grace! How " },
                { chord: "C", lyrics: "sweet the " },
                { chord: "G", lyrics: "sound" },
              ],
              [
                { chord: "G", lyrics: "That saved a wretch like " },
                { chord: "D", lyrics: "me!" },
              ],
              [
                { chord: "G", lyrics: "I once was lost, but " },
                { chord: "C", lyrics: "now am " },
                { chord: "G", lyrics: "found;" },
              ],
              [
                { chord: "Em", lyrics: "Was blind, but " },
                { chord: "D", lyrics: "now I " },
                { chord: "G", lyrics: "see." },
              ],
            ],
          },
          {
            id: "h07-p-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "G", lyrics: "'Twas grace that taught my " },
                { chord: "C", lyrics: "heart to " },
                { chord: "G", lyrics: "fear," },
              ],
              [
                { chord: "G", lyrics: "And grace my fears re" },
                { chord: "D", lyrics: "lieved;" },
              ],
              [
                { chord: "G", lyrics: "How precious did that " },
                { chord: "C", lyrics: "grace ap" },
                { chord: "G", lyrics: "pear" },
              ],
              [
                { chord: "Em", lyrics: "The hour I " },
                { chord: "D", lyrics: "first be" },
                { chord: "G", lyrics: "lieved!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-07-mahir",
        songId: "hymn-07",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> Cmaj7 -> C/G, jembatan B7 menuju Em7 -> Em/D -> A7/C# -> D7, dan resolusi G/D -> D7 -> C/G -> G.",
        sections: [
          {
            id: "h07-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Amazing " },
                { chord: "G7/B", lyrics: "grace! How ", isBridge: true },
                { chord: "Cmaj7", lyrics: "sweet the " },
                { chord: "G/B", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "sound" },
              ],
              [
                { chord: "Em7", lyrics: "That saved ", isBridge: true },
                { chord: "A7", lyrics: "a wretch like ", isBridge: true },
                { chord: "Dsus4", lyrics: "me! ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "I once " },
                { chord: "G7", lyrics: "was lost, ", isBridge: true },
                { chord: "C", lyrics: "but now " },
                { chord: "B7", lyrics: "am ", isBridge: true },
                { chord: "Em7", lyrics: "found; " },
              ],
              [
                { chord: "Am7", lyrics: "Was blind, ", isBridge: true },
                { chord: "G/D", lyrics: "but ", isBridge: true },
                { chord: "D7", lyrics: "now I " },
                { chord: "C/G", lyrics: "see. ", isBridge: true },
                { chord: "G", lyrics: " " },
              ],
            ],
          },
          {
            id: "h07-m-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "G", lyrics: "'Twas grace " },
                { chord: "G7/B", lyrics: "that taught my ", isBridge: true },
                { chord: "Cmaj7", lyrics: "heart to " },
                { chord: "G/B", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "fear," },
              ],
              [
                { chord: "Em7", lyrics: "And grace ", isBridge: true },
                { chord: "A7", lyrics: "my fears re", isBridge: true },
                { chord: "Dsus4", lyrics: "lieved; ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "How precious " },
                { chord: "G7", lyrics: "did that ", isBridge: true },
                { chord: "C", lyrics: "grace ap" },
                { chord: "B7", lyrics: "pear ", isBridge: true },
                { chord: "Em7", lyrics: " " },
              ],
              [
                { chord: "Am7", lyrics: "The hour ", isBridge: true },
                { chord: "G/D", lyrics: "I ", isBridge: true },
                { chord: "D7", lyrics: "first be" },
                { chord: "C/G", lyrics: "lieved! ", isBridge: true },
                { chord: "G", lyrics: " " },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 08. Just as I Am
  {
    id: "hymn-08",
    slug: "just-as-i-am",
    title: "Just as I Am",
    artist: "Charlotte Elliott & William B. Bradbury (1835)",
    genre: "Hymn Klasik (3/4)",
    key: "C",
    bpm: 74,
    timeSignature: "3/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Kidung penyerahan diri yang lembut dalam C Mayor (3/4). Mode Pemula memakai C-F-G-Dm, dan Mode Mahir menambahkan jembatan C/E, G/B, C7, Fmaj7, Dm7, dan C/G.",
    strummingPattern: "Bass - Down - Down (3/4 Lembut)",
    arrangements: [
      {
        id: "arr-08-pemula",
        songId: "hymn-08",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar C, F, G, dan Dm.",
        sections: [
          {
            id: "h08-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Just as I am, with" },
                { chord: "G", lyrics: "out one " },
                { chord: "C", lyrics: "plea," },
              ],
              [
                { chord: "G", lyrics: "But that Thy blood was " },
                { chord: "F", lyrics: "shed for " },
                { chord: "C", lyrics: "me," },
              ],
              [
                { chord: "C", lyrics: "And that Thou bidd'st me " },
                { chord: "F", lyrics: "come to Thee," },
              ],
              [
                { chord: "C", lyrics: "O Lamb of " },
                { chord: "G", lyrics: "God, I come, I " },
                { chord: "C", lyrics: "come!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-08-mahir",
        songId: "hymn-08",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan C -> C/E -> G/B -> C, jembatan C7/E -> Fmaj7 -> E7/G# -> Am7, serta Dm7 -> C/G -> G7 -> C.",
        sections: [
          {
            id: "h08-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Just as I " },
                { chord: "C/E", lyrics: "am, with", isBridge: true },
                { chord: "G7", lyrics: "out one " },
                { chord: "C", lyrics: "plea, " },
                { chord: "G/B", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "But that Thy ", isBridge: true },
                { chord: "G7", lyrics: "blood was " },
                { chord: "Fmaj7", lyrics: "shed for " },
                { chord: "C", lyrics: "me," },
              ],
              [
                { chord: "C", lyrics: "And that Thou " },
                { chord: "C7", lyrics: "bidd'st me ", isBridge: true },
                { chord: "Fmaj7", lyrics: "come to " },
                { chord: "Dm7", lyrics: "Thee, ", isBridge: true },
              ],
              [
                { chord: "C/G", lyrics: "O Lamb of ", isBridge: true },
                { chord: "G7", lyrics: "God, I come, " },
                { chord: "F/C", lyrics: "I ", isBridge: true },
                { chord: "C", lyrics: "come!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 09. Leaning on the Everlasting Arms
  {
    id: "hymn-09",
    slug: "leaning-on-the-everlasting-arms",
    title: "Leaning on the Everlasting Arms",
    artist: "Elisha A. Hoffman & Anthony J. Showalter (1887)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 104,
    timeSignature: "4/4",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn sukacita penuh semangat dalam G Mayor. Mode Pemula menggunakan 3 chord pokok (G-C-D), dan Mode Mahir menambahkan jembatan G/B, Cmaj7, Em7, A7, Dsus4, dan G/D.",
    strummingPattern: "D - D U D U (4/4 Gembira)",
    arrangements: [
      {
        id: "arr-09-pemula",
        songId: "hymn-09",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord utama dasar: G, C, dan D.",
        sections: [
          {
            id: "h09-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "What a fellowship, " },
                { chord: "C", lyrics: "what a joy di" },
                { chord: "G", lyrics: "vine," },
              ],
              [
                { chord: "G", lyrics: "Leaning on the ever" },
                { chord: "D", lyrics: "lasting arms;" },
              ],
              [
                { chord: "G", lyrics: "What a blessedness, " },
                { chord: "C", lyrics: "what a peace is " },
                { chord: "G", lyrics: "mine," },
              ],
              [
                { chord: "G", lyrics: "Leaning on the " },
                { chord: "D", lyrics: "everlasting " },
                { chord: "G", lyrics: "arms." },
              ],
            ],
          },
          {
            id: "h09-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Leaning, " },
                { chord: "C", lyrics: "leaning," },
              ],
              [
                { chord: "G", lyrics: "Safe and secure from " },
                { chord: "D", lyrics: "all alarms;" },
              ],
              [
                { chord: "G", lyrics: "Leaning, " },
                { chord: "C", lyrics: "leaning," },
              ],
              [
                { chord: "G", lyrics: "Leaning on the " },
                { chord: "D", lyrics: "everlasting " },
                { chord: "G", lyrics: "arms." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-09-mahir",
        songId: "hymn-09",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> C#dim/Am7 -> G/D, serta Em7 -> A7 -> Dsus4 -> D7.",
        sections: [
          {
            id: "h09-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "What a fellow" },
                { chord: "G/B", lyrics: "ship, ", isBridge: true },
                { chord: "C", lyrics: "what a joy " },
                { chord: "Am7", lyrics: "di", isBridge: true },
                { chord: "G", lyrics: "vine," },
              ],
              [
                { chord: "Em7", lyrics: "Leaning on ", isBridge: true },
                { chord: "A7", lyrics: "the ever", isBridge: true },
                { chord: "Dsus4", lyrics: "lasting ", isBridge: true },
                { chord: "D7", lyrics: "arms;" },
              ],
              [
                { chord: "G", lyrics: "What a blessed" },
                { chord: "G7", lyrics: "ness, ", isBridge: true },
                { chord: "C", lyrics: "what a peace " },
                { chord: "Am7", lyrics: "is ", isBridge: true },
                { chord: "G", lyrics: "mine, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Leaning on ", isBridge: true },
                { chord: "G/D", lyrics: "the ", isBridge: true },
                { chord: "D7", lyrics: "everlasting " },
                { chord: "G", lyrics: "arms." },
              ],
            ],
          },
          {
            id: "h09-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Leaning, " },
                { chord: "G7/B", lyrics: " ", isBridge: true },
                { chord: "C", lyrics: "leaning, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Safe and se" },
                { chord: "Em7", lyrics: "cure from ", isBridge: true },
                { chord: "A7", lyrics: "all a", isBridge: true },
                { chord: "D7", lyrics: "larms;" },
              ],
              [
                { chord: "G", lyrics: "Leaning, " },
                { chord: "G7", lyrics: " ", isBridge: true },
                { chord: "C", lyrics: "leaning, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Leaning on the ", isBridge: true },
                { chord: "D7", lyrics: "everlasting " },
                { chord: "C/G", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "arms." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 10. Sweet Hour of Prayer
  {
    id: "hymn-10",
    slug: "sweet-hour-of-prayer",
    title: "Sweet Hour of Prayer",
    artist: "William W. Walford & William B. Bradbury (1845)",
    genre: "Hymn Klasik (6/8)",
    key: "D",
    bpm: 76,
    timeSignature: "6/8",
    durationSec: 225,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu doa yang teduh dalam nada dasar D Mayor (6/8). Mode Pemula menggunakan D-G-A-Bm, dan Mode Mahir melengkapinya dengan D/F#, Gmaj7, A/C#, Em7, dan D/A.",
    strummingPattern: "D - D - D U (6/8 Teduh)",
    arrangements: [
      {
        id: "arr-10-pemula",
        songId: "hymn-10",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar D, G, A, dan Bm.",
        sections: [
          {
            id: "h10-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Sweet hour of prayer! " },
                { chord: "G", lyrics: "sweet hour of " },
                { chord: "D", lyrics: "prayer!" },
              ],
              [
                { chord: "D", lyrics: "That calls me from a " },
                { chord: "A", lyrics: "world of care," },
              ],
              [
                { chord: "D", lyrics: "And bids me at my " },
                { chord: "G", lyrics: "Father's " },
                { chord: "D", lyrics: "throne" },
              ],
              [
                { chord: "G", lyrics: "Make all my wants and " },
                { chord: "A", lyrics: "wishes " },
                { chord: "D", lyrics: "known." },
              ],
              [
                { chord: "D", lyrics: "In seasons " },
                { chord: "G", lyrics: "of dis" },
                { chord: "D", lyrics: "tress and grief," },
              ],
              [
                { chord: "Bm", lyrics: "My soul has " },
                { chord: "G", lyrics: "often " },
                { chord: "A", lyrics: "found relief," },
              ],
              [
                { chord: "D", lyrics: "And oft escaped the " },
                { chord: "G", lyrics: "tempter's " },
                { chord: "D", lyrics: "snare" },
              ],
              [
                { chord: "G", lyrics: "By thy return, sweet " },
                { chord: "A", lyrics: "hour of " },
                { chord: "D", lyrics: "prayer!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-10-mahir",
        songId: "hymn-10",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan D/F# -> Gmaj7, A/C# -> Bm7, Em7 -> Asus4 -> A7, serta D/A -> A7 -> D.",
        sections: [
          {
            id: "h10-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Sweet hour of " },
                { chord: "D/F#", lyrics: "prayer! ", isBridge: true },
                { chord: "Gmaj7", lyrics: "sweet hour of " },
                { chord: "D", lyrics: "prayer! " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "That calls me ", isBridge: true },
                { chord: "E7", lyrics: "from a world ", isBridge: true },
                { chord: "Asus4", lyrics: "of ", isBridge: true },
                { chord: "A7", lyrics: "care," },
              ],
              [
                { chord: "D", lyrics: "And bids me " },
                { chord: "D7/F#", lyrics: "at my ", isBridge: true },
                { chord: "Gmaj7", lyrics: "Father's " },
                { chord: "D", lyrics: "throne " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "Make all my ", isBridge: true },
                { chord: "Em7", lyrics: "wants and ", isBridge: true },
                { chord: "A7", lyrics: "wishes " },
                { chord: "D", lyrics: "known." },
              ],
              [
                { chord: "D", lyrics: "In seasons " },
                { chord: "G", lyrics: "of dis" },
                { chord: "D/F#", lyrics: "tress and ", isBridge: true },
                { chord: "Em7", lyrics: "grief, ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "My soul has " },
                { chord: "Em7", lyrics: "often ", isBridge: true },
                { chord: "Asus4", lyrics: "found re", isBridge: true },
                { chord: "A7", lyrics: "lief," },
              ],
              [
                { chord: "D", lyrics: "And oft es" },
                { chord: "D7", lyrics: "caped the ", isBridge: true },
                { chord: "Gmaj7", lyrics: "tempter's " },
                { chord: "Em7", lyrics: "snare ", isBridge: true },
              ],
              [
                { chord: "D/A", lyrics: "By thy re", isBridge: true },
                { chord: "A7", lyrics: "turn, sweet hour of " },
                { chord: "D", lyrics: "prayer!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 11. I Need Thee Every Hour
  {
    id: "hymn-11",
    slug: "i-need-thee-every-hour",
    title: "I Need Thee Every Hour",
    artist: "Annie S. Hawks & Robert Lowry (1872)",
    genre: "Hymn Klasik (3/4)",
    key: "G",
    bpm: 75,
    timeSignature: "3/4",
    durationSec: 205,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Doa kerinduan akan Tuhan dalam nada dasar G Mayor (3/4). Mode Pemula memakai G-C-D-Em, dan Mode Mahir menambahkan jembatan G/B, D/F#, A7, Am7, dan G/D.",
    strummingPattern: "Bass - Down - Down (3/4 Lembut)",
    arrangements: [
      {
        id: "arr-11-pemula",
        songId: "hymn-11",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h11-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I need Thee every " },
                { chord: "D", lyrics: "hour, most " },
                { chord: "G", lyrics: "gracious Lord;" },
              ],
              [
                { chord: "D", lyrics: "No tender voice like " },
                { chord: "G", lyrics: "Thine can peace af" },
                { chord: "D", lyrics: "ford." },
              ],
            ],
          },
          {
            id: "h11-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "I need Thee, O I " },
                { chord: "C", lyrics: "need Thee;" },
              ],
              [
                { chord: "D", lyrics: "Every hour I " },
                { chord: "G", lyrics: "need Thee!" },
              ],
              [
                { chord: "C", lyrics: "O bless me now, my " },
                { chord: "G", lyrics: "Savior," },
              ],
              [
                { chord: "G", lyrics: "I come to " },
                { chord: "D", lyrics: "Thee!" },
                { chord: "G", lyrics: " " },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-11-mahir",
        songId: "hymn-11",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G/B -> C -> Am7 -> D7, secondary dominant A7 -> Dsus4 -> D7, dan resolusi G/D -> D7 -> G.",
        sections: [
          {
            id: "h11-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I need Thee " },
                { chord: "Am7", lyrics: "every ", isBridge: true },
                { chord: "D7", lyrics: "hour, most " },
                { chord: "G/B", lyrics: "gracious ", isBridge: true },
                { chord: "G", lyrics: "Lord; " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "No tender ", isBridge: true },
                { chord: "A7", lyrics: "voice like Thine ", isBridge: true },
                { chord: "Dsus4", lyrics: "can peace af", isBridge: true },
                { chord: "D7", lyrics: "ford." },
              ],
            ],
          },
          {
            id: "h11-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "I need Thee, " },
                { chord: "G7/B", lyrics: "O I ", isBridge: true },
                { chord: "C", lyrics: "need Thee; " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "D7", lyrics: "Every hour " },
                { chord: "D/F#", lyrics: "I ", isBridge: true },
                { chord: "G", lyrics: "need Thee! " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Cmaj7", lyrics: "O bless me " },
                { chord: "B7", lyrics: "now, my ", isBridge: true },
                { chord: "Em7", lyrics: "Savior, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "I come ", isBridge: true },
                { chord: "D7", lyrics: "to " },
                { chord: "C/G", lyrics: "Thee! ", isBridge: true },
                { chord: "G", lyrics: " " },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 12. In the Sweet Bye and Bye
  {
    id: "hymn-12",
    slug: "in-the-sweet-bye-and-bye",
    title: "In the Sweet Bye and Bye",
    artist: "Sanford F. Bennett & Joseph P. Webster (1868)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 96,
    timeSignature: "4/4",
    durationSec: 190,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn pengharapan surgawi dalam G Mayor. Mode Pemula cukup menggunakan 3 chord (G-C-D), sedangkan Mode Mahir memperkaya iringan dengan G/B, G7, Am7, Em7, dan G/D.",
    strummingPattern: "D - D U D U (4/4 Cerah)",
    arrangements: [
      {
        id: "arr-12-pemula",
        songId: "hymn-12",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar G, C, dan D.",
        sections: [
          {
            id: "h12-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "There's a land that is " },
                { chord: "C", lyrics: "fairer than " },
                { chord: "G", lyrics: "day," },
              ],
              [
                { chord: "G", lyrics: "And by faith we can " },
                { chord: "D", lyrics: "see it afar;" },
              ],
              [
                { chord: "G", lyrics: "For the Father waits " },
                { chord: "C", lyrics: "over the " },
                { chord: "G", lyrics: "way" },
              ],
              [
                { chord: "G", lyrics: "To prepare us a " },
                { chord: "D", lyrics: "dwelling place " },
                { chord: "G", lyrics: "there." },
              ],
            ],
          },
          {
            id: "h12-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "In the sweet by and " },
                { chord: "D", lyrics: "by," },
              ],
              [
                { chord: "D", lyrics: "We shall meet on that " },
                { chord: "G", lyrics: "beautiful shore;" },
              ],
              [
                { chord: "G", lyrics: "In the sweet by and " },
                { chord: "C", lyrics: "by," },
              ],
              [
                { chord: "G", lyrics: "We shall meet on that " },
                { chord: "D", lyrics: "beautiful " },
                { chord: "G", lyrics: "shore." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-12-mahir",
        songId: "hymn-12",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G/B -> C -> Am7 -> G, Em7 -> A7 -> Dsus4 -> D7, dan penutup G/D -> D7 -> G.",
        sections: [
          {
            id: "h12-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "There's a land " },
                { chord: "G/B", lyrics: "that is ", isBridge: true },
                { chord: "C", lyrics: "fairer than " },
                { chord: "G", lyrics: "day, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "And by faith ", isBridge: true },
                { chord: "A7", lyrics: "we can see ", isBridge: true },
                { chord: "Dsus4", lyrics: "it a", isBridge: true },
                { chord: "D7", lyrics: "far;" },
              ],
              [
                { chord: "G", lyrics: "For the Father " },
                { chord: "G7", lyrics: "waits ", isBridge: true },
                { chord: "C", lyrics: "over the " },
                { chord: "G", lyrics: "way " },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "To prepare ", isBridge: true },
                { chord: "G/D", lyrics: "us a ", isBridge: true },
                { chord: "D7", lyrics: "dwelling place " },
                { chord: "G", lyrics: "there." },
              ],
            ],
          },
          {
            id: "h12-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "In the sweet " },
                { chord: "G/B", lyrics: "by and ", isBridge: true },
                { chord: "D7", lyrics: "by," },
              ],
              [
                { chord: "Am7", lyrics: "We shall meet ", isBridge: true },
                { chord: "D7", lyrics: "on that beautiful " },
                { chord: "G", lyrics: "shore; " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "In the sweet " },
                { chord: "Am7", lyrics: "by and ", isBridge: true },
                { chord: "G", lyrics: "by, " },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "We shall meet ", isBridge: true },
                { chord: "G/D", lyrics: "on that ", isBridge: true },
                { chord: "D7", lyrics: "beautiful " },
                { chord: "G", lyrics: "shore." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 13. In the Garden
  {
    id: "hymn-13",
    slug: "in-the-garden",
    title: "In the Garden",
    artist: "C. Austin Miles (1912)",
    genre: "Hymn Klasik (6/8)",
    key: "G",
    bpm: 84,
    timeSignature: "6/8",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn persekutuan pribadi di taman doa dalam G Mayor (6/8). Mode Pemula memakai G-C-D-A, dan Mode Mahir menambahkan jembatan G7/B, Cmaj7, A7, D/F#, Em7, dan B7.",
    strummingPattern: "D - D - D U (6/8 Mengayun Lembut)",
    arrangements: [
      {
        id: "arr-13-pemula",
        songId: "hymn-13",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan A.",
        sections: [
          {
            id: "h13-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I come to the garden a" },
                { chord: "C", lyrics: "lone," },
              ],
              [
                { chord: "G", lyrics: "While the dew is still on the " },
                { chord: "D", lyrics: "roses," },
              ],
              [
                { chord: "G", lyrics: "And the voice I hear, falling " },
                { chord: "C", lyrics: "on my ear," },
              ],
              [
                { chord: "A", lyrics: "The Son of God dis" },
                { chord: "D", lyrics: "closes." },
              ],
            ],
          },
          {
            id: "h13-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "And He walks with me, and He " },
                { chord: "D", lyrics: "talks with me," },
              ],
              [
                { chord: "D", lyrics: "And He tells me I am His " },
                { chord: "G", lyrics: "own;" },
              ],
              [
                { chord: "G", lyrics: "And the joy we share as we " },
                { chord: "C", lyrics: "tarry there," },
              ],
              [
                { chord: "G", lyrics: "None other has " },
                { chord: "D", lyrics: "ever " },
                { chord: "G", lyrics: "known." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-13-mahir",
        songId: "hymn-13",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> Cmaj7, B7 -> Em7 -> A7 -> Dsus4 -> D7, serta Am7 -> G/D -> D7 -> G.",
        sections: [
          {
            id: "h13-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I come to the " },
                { chord: "G7/B", lyrics: "garden a", isBridge: true },
                { chord: "Cmaj7", lyrics: "lone, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "While the dew " },
                { chord: "Em7", lyrics: "is still on ", isBridge: true },
                { chord: "Am7", lyrics: "the ", isBridge: true },
                { chord: "D7", lyrics: "roses," },
              ],
              [
                { chord: "G", lyrics: "And the voice " },
                { chord: "B7", lyrics: "I hear, ", isBridge: true },
                { chord: "Em7", lyrics: "falling ", isBridge: true },
                { chord: "C", lyrics: "on my ear," },
              ],
              [
                { chord: "A7", lyrics: "The Son of God " },
                { chord: "Dsus4", lyrics: "dis", isBridge: true },
                { chord: "D7", lyrics: "closes." },
              ],
            ],
          },
          {
            id: "h13-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "And He walks with me, " },
                { chord: "G/B", lyrics: "and He ", isBridge: true },
                { chord: "D7", lyrics: "talks with me," },
              ],
              [
                { chord: "Am7", lyrics: "And He tells me ", isBridge: true },
                { chord: "D7", lyrics: "I am His " },
                { chord: "G", lyrics: "own; " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "And the joy we share " },
                { chord: "B7", lyrics: "as we ", isBridge: true },
                { chord: "Em7", lyrics: "tarry there, ", isBridge: true },
                { chord: "C", lyrics: " " },
              ],
              [
                { chord: "G/D", lyrics: "None other ", isBridge: true },
                { chord: "D7", lyrics: "has ever " },
                { chord: "G", lyrics: "known." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 14. Count Your Blessings
  {
    id: "hymn-14",
    slug: "count-your-blessings",
    title: "Count Your Blessings",
    artist: "Johnson Oatman Jr. & Edwin O. Excell (1897)",
    genre: "Hymn Klasik",
    key: "D",
    bpm: 100,
    timeSignature: "4/4",
    durationSec: 200,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu pengingat berkat Tuhan dalam D Mayor. Mode Pemula menggunakan D-G-A, sedangkan Mode Mahir menyertakan jembatan D/F#, A/C#, Bm7, Em7, dan D/A.",
    strummingPattern: "D - D U D U (4/4 Semangat)",
    arrangements: [
      {
        id: "arr-14-pemula",
        songId: "hymn-14",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord utama: D, G, dan A.",
        sections: [
          {
            id: "h14-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "When upon life's billows you are " },
                { chord: "A", lyrics: "tempest tossed," },
              ],
              [
                { chord: "A", lyrics: "When you are discouraged, thinking " },
                { chord: "D", lyrics: "all is lost," },
              ],
              [
                { chord: "D", lyrics: "Count your many blessings, name them " },
                { chord: "G", lyrics: "one by one," },
              ],
              [
                { chord: "D", lyrics: "And it will surprise you what the " },
                { chord: "A", lyrics: "Lord hath " },
                { chord: "D", lyrics: "done." },
              ],
            ],
          },
          {
            id: "h14-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Count your blessings, " },
                { chord: "A", lyrics: "name them one by one," },
              ],
              [
                { chord: "A", lyrics: "Count your blessings, " },
                { chord: "D", lyrics: "see what God hath done;" },
              ],
              [
                { chord: "D", lyrics: "Count your blessings, " },
                { chord: "G", lyrics: "name them one by one," },
              ],
              [
                { chord: "D", lyrics: "Count your many blessings, see what " },
                { chord: "A", lyrics: "God hath " },
                { chord: "D", lyrics: "done." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-14-mahir",
        songId: "hymn-14",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan D -> D/F# -> Em7 -> A7, jembatan D7 -> Gmaj7 -> Em7, dan penutup D/A -> A7 -> D.",
        sections: [
          {
            id: "h14-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "When upon life's " },
                { chord: "D/F#", lyrics: "billows you are ", isBridge: true },
                { chord: "Em7", lyrics: "tempest ", isBridge: true },
                { chord: "A7", lyrics: "tossed," },
              ],
              [
                { chord: "Em7", lyrics: "When you are dis", isBridge: true },
                { chord: "A7", lyrics: "couraged, thinking " },
                { chord: "D", lyrics: "all is lost, " },
                { chord: "D7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Gmaj7", lyrics: "Count your many " },
                { chord: "A/C#", lyrics: "blessings, ", isBridge: true },
                { chord: "Bm7", lyrics: "name them one by ", isBridge: true },
                { chord: "Em7", lyrics: "one, ", isBridge: true },
              ],
              [
                { chord: "D/A", lyrics: "And it will sur", isBridge: true },
                { chord: "A7", lyrics: "prise you what the Lord hath " },
                { chord: "D", lyrics: "done." },
              ],
            ],
          },
          {
            id: "h14-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Count your blessings, " },
                { chord: "Em7", lyrics: "name them ", isBridge: true },
                { chord: "A7", lyrics: "one by one," },
              ],
              [
                { chord: "Em7", lyrics: "Count your ", isBridge: true },
                { chord: "A7", lyrics: "blessings, see what " },
                { chord: "D", lyrics: "God hath done; " },
                { chord: "D7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Count your blessings, " },
                { chord: "D/F#", lyrics: "name them ", isBridge: true },
                { chord: "Em7", lyrics: "one by one, ", isBridge: true },
              ],
              [
                { chord: "D/A", lyrics: "Count your many ", isBridge: true },
                { chord: "Bm7", lyrics: "blessings, ", isBridge: true },
                { chord: "Em7", lyrics: "see what ", isBridge: true },
                { chord: "A7", lyrics: "God hath " },
                { chord: "D", lyrics: "done." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 15. Softly and Tenderly
  {
    id: "hymn-15",
    slug: "softly-and-tenderly",
    title: "Softly and Tenderly",
    artist: "Will L. Thompson (1880)",
    genre: "Hymn Klasik (6/8)",
    key: "G",
    bpm: 72,
    timeSignature: "6/8",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn panggilan kasih yang lembut dalam G Mayor (6/8). Mode Pemula memakai G-C-D-A, dan Mode Mahir menambahkan jembatan G7/B, Cmaj7, B7, Em7, A7, dan G/D.",
    strummingPattern: "D - D - D U (6/8 Lembut)",
    arrangements: [
      {
        id: "arr-15-pemula",
        songId: "hymn-15",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan A.",
        sections: [
          {
            id: "h15-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Softly and tenderly " },
                { chord: "C", lyrics: "Jesus is " },
                { chord: "G", lyrics: "calling," },
              ],
              [
                { chord: "G", lyrics: "Calling for you and for " },
                { chord: "A", lyrics: "me;" },
                { chord: "D", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "See, on the portals He's " },
                { chord: "C", lyrics: "waiting and " },
                { chord: "G", lyrics: "watching," },
              ],
              [
                { chord: "G", lyrics: "Watching for " },
                { chord: "D", lyrics: "you and for " },
                { chord: "G", lyrics: "me." },
              ],
            ],
          },
          {
            id: "h15-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Come home, " },
                { chord: "D", lyrics: "come home," },
              ],
              [
                { chord: "A", lyrics: "Ye who are weary, come " },
                { chord: "D", lyrics: "home;" },
              ],
              [
                { chord: "G", lyrics: "Earnestly, tenderly, " },
                { chord: "C", lyrics: "Jesus is " },
                { chord: "G", lyrics: "calling," },
              ],
              [
                { chord: "G", lyrics: "Calling, O " },
                { chord: "D", lyrics: "sinner, come " },
                { chord: "G", lyrics: "home!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-15-mahir",
        songId: "hymn-15",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> Dsus4 -> D7, dan G/D -> D7 -> G.",
        sections: [
          {
            id: "h15-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Softly and " },
                { chord: "G7/B", lyrics: "tenderly ", isBridge: true },
                { chord: "C", lyrics: "Jesus is " },
                { chord: "G", lyrics: "calling, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Calling for ", isBridge: true },
                { chord: "A7", lyrics: "you and for " },
                { chord: "Dsus4", lyrics: "me; ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "See, on the " },
                { chord: "G7", lyrics: "portals He's ", isBridge: true },
                { chord: "C", lyrics: "waiting and " },
                { chord: "B7", lyrics: "watch", isBridge: true },
                { chord: "Em7", lyrics: "ing, ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Watching for ", isBridge: true },
                { chord: "G/D", lyrics: "you ", isBridge: true },
                { chord: "D7", lyrics: "and for " },
                { chord: "G", lyrics: "me." },
              ],
            ],
          },
          {
            id: "h15-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Come home, " },
                { chord: "G/B", lyrics: " ", isBridge: true },
                { chord: "D7", lyrics: "come home," },
              ],
              [
                { chord: "Em7", lyrics: "Ye who are ", isBridge: true },
                { chord: "A7", lyrics: "weary, come " },
                { chord: "Dsus4", lyrics: "home; ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "Earnestly, " },
                { chord: "G7/B", lyrics: "tenderly, ", isBridge: true },
                { chord: "C", lyrics: "Jesus is " },
                { chord: "Am7", lyrics: "call", isBridge: true },
                { chord: "G", lyrics: "ing," },
              ],
              [
                { chord: "G/D", lyrics: "Calling, O ", isBridge: true },
                { chord: "D7", lyrics: "sinner, come " },
                { chord: "C/G", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "home!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 16. Victory in Jesus
  {
    id: "hymn-16",
    slug: "victory-in-jesus",
    title: "Victory in Jesus",
    artist: "Eugene M. Bartlett (1939)",
    genre: "Southern Gospel Hymn",
    key: "G",
    bpm: 106,
    timeSignature: "4/4",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Hymnal Archive",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn kemenangan yang penuh semangat dalam G Mayor. Mode Pemula menggunakan G-C-D-Em, dan Mode Mahir menambahkan jembatan G7/B, Cadd9, A7, D/F#, dan G/D.",
    strummingPattern: "D - D U D U (4/4 Gospel)",
    arrangements: [
      {
        id: "arr-16-pemula",
        songId: "hymn-16",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h16-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I heard an old, old " },
                { chord: "C", lyrics: "story, how a " },
                { chord: "G", lyrics: "Savior came from glory," },
              ],
              [
                { chord: "G", lyrics: "How He gave His life on " },
                { chord: "Em", lyrics: "Calvary to " },
                { chord: "D", lyrics: "save a wretch like me;" },
              ],
              [
                { chord: "G", lyrics: "I heard about His " },
                { chord: "C", lyrics: "groaning, of His " },
                { chord: "G", lyrics: "precious blood's atoning," },
              ],
              [
                { chord: "G", lyrics: "Then I repented " },
                { chord: "D", lyrics: "of my sins and " },
                { chord: "G", lyrics: "won the victory." },
              ],
            ],
          },
          {
            id: "h16-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "O victory in " },
                { chord: "C", lyrics: "Jesus, my " },
                { chord: "G", lyrics: "Savior, forever!" },
              ],
              [
                { chord: "G", lyrics: "He sought me and " },
                { chord: "Em", lyrics: "bought me with " },
                { chord: "D", lyrics: "His redeeming blood;" },
              ],
              [
                { chord: "G", lyrics: "He loved me ere I " },
                { chord: "C", lyrics: "knew Him, and " },
                { chord: "G", lyrics: "all my love is due Him," },
              ],
              [
                { chord: "G", lyrics: "He plunged me to " },
                { chord: "D", lyrics: "victory, beneath the " },
                { chord: "G", lyrics: "cleansing flood." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-16-mahir",
        songId: "hymn-16",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> D7, dan kadens G/D -> D7 -> G.",
        sections: [
          {
            id: "h16-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I heard an old, " },
                { chord: "G7/B", lyrics: "old ", isBridge: true },
                { chord: "C", lyrics: "story, how a " },
                { chord: "Am7", lyrics: "Savior ", isBridge: true },
                { chord: "G", lyrics: "came from glory, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "How He gave His life " },
                { chord: "A7", lyrics: "on Calvary to ", isBridge: true },
                { chord: "Dsus4", lyrics: "save a wretch ", isBridge: true },
                { chord: "D7", lyrics: "like me;" },
              ],
              [
                { chord: "G", lyrics: "I heard about " },
                { chord: "G7", lyrics: "His ", isBridge: true },
                { chord: "C", lyrics: "groaning, of His " },
                { chord: "Am7", lyrics: "precious ", isBridge: true },
                { chord: "G", lyrics: "blood's atoning, " },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Then I repented ", isBridge: true },
                { chord: "G/D", lyrics: "of my sins ", isBridge: true },
                { chord: "D7", lyrics: "and won the " },
                { chord: "G", lyrics: "victory." },
              ],
            ],
          },
          {
            id: "h16-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "O victory " },
                { chord: "G7/B", lyrics: "in ", isBridge: true },
                { chord: "C", lyrics: "Jesus, my " },
                { chord: "Am7", lyrics: "Savior, ", isBridge: true },
                { chord: "G", lyrics: "forever! " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "He sought me and " },
                { chord: "A7", lyrics: "bought me with ", isBridge: true },
                { chord: "Dsus4", lyrics: "His redeeming ", isBridge: true },
                { chord: "D7", lyrics: "blood;" },
              ],
              [
                { chord: "G", lyrics: "He loved me ere " },
                { chord: "G7", lyrics: "I ", isBridge: true },
                { chord: "C", lyrics: "knew Him, and " },
                { chord: "B7", lyrics: "all my love ", isBridge: true },
                { chord: "Em7", lyrics: "is due Him, ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "He plunged me ", isBridge: true },
                { chord: "G/D", lyrics: "to ", isBridge: true },
                { chord: "D7", lyrics: "victory, beneath the cleansing " },
                { chord: "G", lyrics: "flood." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 17. Down at the Cross
  {
    id: "hymn-17",
    slug: "down-at-the-cross",
    title: "Down at the Cross (Glory to His Name)",
    artist: "Elisha A. Hoffman & John H. Stockton (1878)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 94,
    timeSignature: "4/4",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn pujian salib dalam G Mayor. Mode Pemula menggunakan G-C-D, dan Mode Mahir menambahkan jembatan G7/B, Cmaj7, Em7, A7, dan G/D.",
    strummingPattern: "D - D U - U D U (4/4 Mantap)",
    arrangements: [
      {
        id: "arr-17-pemula",
        songId: "hymn-17",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord utama G, C, dan D.",
        sections: [
          {
            id: "h17-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Down at the cross where my " },
                { chord: "C", lyrics: "Savior " },
                { chord: "G", lyrics: "died," },
              ],
              [
                { chord: "G", lyrics: "Down where for cleansing from " },
                { chord: "D", lyrics: "sin I cried," },
              ],
              [
                { chord: "G", lyrics: "There to my heart was the " },
                { chord: "C", lyrics: "blood ap" },
                { chord: "G", lyrics: "plied;" },
              ],
              [
                { chord: "G", lyrics: "Glory " },
                { chord: "D", lyrics: "to His " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
          {
            id: "h17-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Glory to His " },
                { chord: "G", lyrics: "name," },
              ],
              [
                { chord: "G", lyrics: "Glory to His " },
                { chord: "D", lyrics: "name:" },
              ],
              [
                { chord: "G", lyrics: "There to my heart was the " },
                { chord: "C", lyrics: "blood ap" },
                { chord: "G", lyrics: "plied;" },
              ],
              [
                { chord: "G", lyrics: "Glory " },
                { chord: "D", lyrics: "to His " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-17-mahir",
        songId: "hymn-17",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> D7, dan penutup G/D -> D7 -> G.",
        sections: [
          {
            id: "h17-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Down at the cross " },
                { chord: "G7/B", lyrics: "where my ", isBridge: true },
                { chord: "C", lyrics: "Savior " },
                { chord: "G", lyrics: "died, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Down where for ", isBridge: true },
                { chord: "A7", lyrics: "cleansing from sin ", isBridge: true },
                { chord: "D7", lyrics: "I cried," },
              ],
              [
                { chord: "G", lyrics: "There to my heart " },
                { chord: "G7", lyrics: "was the ", isBridge: true },
                { chord: "C", lyrics: "blood ap" },
                { chord: "Am7", lyrics: "plied; ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Glory ", isBridge: true },
                { chord: "D7", lyrics: "to His " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
          {
            id: "h17-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G7", lyrics: " ", isBridge: true },
                { chord: "C", lyrics: "Glory to His " },
                { chord: "G/B", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "name," },
              ],
              [
                { chord: "Em7", lyrics: "Glory ", isBridge: true },
                { chord: "A7", lyrics: "to His ", isBridge: true },
                { chord: "Dsus4", lyrics: "name: ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "There to my heart " },
                { chord: "G7/B", lyrics: "was the ", isBridge: true },
                { chord: "C", lyrics: "blood ap" },
                { chord: "Am7", lyrics: "plied; ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Glory ", isBridge: true },
                { chord: "D7", lyrics: "to His " },
                { chord: "C/G", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
        ],
      },
    ],
  },
];
