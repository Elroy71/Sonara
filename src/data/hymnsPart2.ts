import { Song } from "@/types/music";

export const HYMNS_PART_2: Song[] = [
  // 18. When We All Get to Heaven
  {
    id: "hymn-18",
    slug: "when-we-all-get-to-heaven",
    title: "When We All Get to Heaven",
    artist: "Eliza E. Hewitt & Emily D. Wilson (1898)",
    genre: "Hymn Klasik",
    key: "C",
    bpm: 108,
    timeSignature: "4/4",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn sukacita tentang kemuliaan surga dalam C Mayor. Mode Pemula menggunakan C-F-G-D, sedangkan Mode Mahir menambahkan jembatan C/E, G/B, Am7, D7/F#, dan C/G.",
    strummingPattern: "D - D U D U (4/4 Gembira)",
    arrangements: [
      {
        id: "arr-18-pemula",
        songId: "hymn-18",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar C, F, G, dan D.",
        sections: [
          {
            id: "h18-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Sing the wondrous love of " },
                { chord: "G", lyrics: "Jesus," },
              ],
              [
                { chord: "G", lyrics: "Sing His mercy and His " },
                { chord: "C", lyrics: "grace;" },
              ],
              [
                { chord: "C", lyrics: "In the mansions bright and " },
                { chord: "F", lyrics: "blessed" },
              ],
              [
                { chord: "D", lyrics: "He'll prepare for us a " },
                { chord: "G", lyrics: "place." },
              ],
            ],
          },
          {
            id: "h18-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "When we all get to " },
                { chord: "F", lyrics: "heaven," },
              ],
              [
                { chord: "D", lyrics: "What a day of rejoicing that will " },
                { chord: "G", lyrics: "be!" },
              ],
              [
                { chord: "C", lyrics: "When we all see " },
                { chord: "F", lyrics: "Jesus," },
              ],
              [
                { chord: "C", lyrics: "We'll sing and " },
                { chord: "G", lyrics: "shout the victo" },
                { chord: "C", lyrics: "ry!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-18-mahir",
        songId: "hymn-18",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan C -> C/E -> G7, jembatan C7/E -> Fmaj7 -> Dm7, D7/F# -> Gsus4 -> G7, dan C/G -> G7 -> C.",
        sections: [
          {
            id: "h18-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "Sing the wondrous " },
                { chord: "C/E", lyrics: "love of ", isBridge: true },
                { chord: "G7", lyrics: "Jesus," },
              ],
              [
                { chord: "Dm7", lyrics: "Sing His mercy ", isBridge: true },
                { chord: "G7", lyrics: "and His " },
                { chord: "C", lyrics: "grace; " },
                { chord: "G/B", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "In the mansions ", isBridge: true },
                { chord: "C7/E", lyrics: "bright and ", isBridge: true },
                { chord: "Fmaj7", lyrics: "blessed" },
              ],
              [
                { chord: "D/F#", lyrics: "He'll prepare for ", isBridge: true },
                { chord: "D7", lyrics: "us a " },
                { chord: "Gsus4", lyrics: "place. ", isBridge: true },
                { chord: "G7", lyrics: " " },
              ],
            ],
          },
          {
            id: "h18-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "When we all " },
                { chord: "C7/E", lyrics: "get to ", isBridge: true },
                { chord: "Fmaj7", lyrics: "heaven," },
              ],
              [
                { chord: "D/F#", lyrics: "What a day of re", isBridge: true },
                { chord: "D7", lyrics: "joicing that will " },
                { chord: "Gsus4", lyrics: "be! ", isBridge: true },
                { chord: "G7", lyrics: " " },
              ],
              [
                { chord: "C", lyrics: "When we all " },
                { chord: "C7", lyrics: "see ", isBridge: true },
                { chord: "Fmaj7", lyrics: "Jesus, " },
                { chord: "Dm7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C/G", lyrics: "We'll sing and ", isBridge: true },
                { chord: "G7", lyrics: "shout the victo" },
                { chord: "C", lyrics: "ry!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 19. Pass Me Not, O Gentle Savior
  {
    id: "hymn-19",
    slug: "pass-me-not-o-gentle-savior",
    title: "Pass Me Not, O Gentle Savior",
    artist: "Fanny J. Crosby & William H. Doane (1868)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 74,
    timeSignature: "4/4",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Doa permohonan yang lembut dalam G Mayor. Mode Pemula menggunakan G-C-D-Em, dan Mode Mahir menambahkan jembatan G7/B, Cmaj7, Am7, D/F#, B7, dan G/D.",
    strummingPattern: "D - D U - D - D U (4/4 Doa)",
    arrangements: [
      {
        id: "arr-19-pemula",
        songId: "hymn-19",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h19-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Pass me not, O " },
                { chord: "C", lyrics: "gentle " },
                { chord: "G", lyrics: "Savior," },
              ],
              [
                { chord: "G", lyrics: "Hear my " },
                { chord: "D", lyrics: "humble " },
                { chord: "G", lyrics: "cry;" },
              ],
              [
                { chord: "G", lyrics: "While on others " },
                { chord: "C", lyrics: "Thou art " },
                { chord: "G", lyrics: "calling," },
              ],
              [
                { chord: "Em", lyrics: "Do not " },
                { chord: "D", lyrics: "pass me " },
                { chord: "G", lyrics: "by." },
              ],
            ],
          },
          {
            id: "h19-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Savior, " },
                { chord: "C", lyrics: "Savior," },
              ],
              [
                { chord: "G", lyrics: "Hear my humble " },
                { chord: "D", lyrics: "cry," },
              ],
              [
                { chord: "G", lyrics: "While on others " },
                { chord: "C", lyrics: "Thou art " },
                { chord: "G", lyrics: "calling," },
              ],
              [
                { chord: "Em", lyrics: "Do not " },
                { chord: "D", lyrics: "pass me " },
                { chord: "G", lyrics: "by." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-19-mahir",
        songId: "hymn-19",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> Cmaj7 -> Am7 -> G/D, B7 -> Em7 -> Am7 -> D7, dan penutup C/G -> G.",
        sections: [
          {
            id: "h19-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Pass me not, " },
                { chord: "G7/B", lyrics: "O ", isBridge: true },
                { chord: "Cmaj7", lyrics: "gentle " },
                { chord: "G", lyrics: "Savior, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Hear my ", isBridge: true },
                { chord: "Am7", lyrics: "humble ", isBridge: true },
                { chord: "D7", lyrics: "cry; " },
                { chord: "G", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "While on others " },
                { chord: "G7", lyrics: "Thou art ", isBridge: true },
                { chord: "C", lyrics: "calling, " },
                { chord: "B7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Do not " },
                { chord: "Am7", lyrics: "pass ", isBridge: true },
                { chord: "D7", lyrics: "me " },
                { chord: "G", lyrics: "by." },
              ],
            ],
          },
          {
            id: "h19-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Savior, " },
                { chord: "G7/B", lyrics: " ", isBridge: true },
                { chord: "C", lyrics: "Savior, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Hear my ", isBridge: true },
                { chord: "Em7", lyrics: "humble ", isBridge: true },
                { chord: "A7", lyrics: "cry, ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "While on others " },
                { chord: "G7", lyrics: "Thou art ", isBridge: true },
                { chord: "Cmaj7", lyrics: "calling, " },
                { chord: "Am7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Do not ", isBridge: true },
                { chord: "D7", lyrics: "pass me " },
                { chord: "C/G", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "by." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 20. Wonderful Words of Life
  {
    id: "hymn-20",
    slug: "wonderful-words-of-life",
    title: "Wonderful Words of Life",
    artist: "Philip P. Bliss (1874)",
    genre: "Hymn Klasik (6/8)",
    key: "G",
    bpm: 96,
    timeSignature: "6/8",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn tentang keindahan Firman Tuhan dalam G Mayor (6/8). Mode Pemula menggunakan G-C-D, dan Mode Mahir menambahkan jembatan G/B, D/F#, Em7, A7, dan G/D.",
    strummingPattern: "D - D - D U (6/8 Cerah)",
    arrangements: [
      {
        id: "arr-20-pemula",
        songId: "hymn-20",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar: G, C, dan D.",
        sections: [
          {
            id: "h20-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Sing them over a" },
                { chord: "D", lyrics: "gain to " },
                { chord: "G", lyrics: "me," },
              ],
              [
                { chord: "D", lyrics: "Wonderful words of " },
                { chord: "G", lyrics: "life;" },
              ],
              [
                { chord: "G", lyrics: "Let me more of their " },
                { chord: "D", lyrics: "beauty " },
                { chord: "G", lyrics: "see," },
              ],
              [
                { chord: "D", lyrics: "Wonderful words of " },
                { chord: "G", lyrics: "life;" },
              ],
              [
                { chord: "C", lyrics: "Words of life and " },
                { chord: "G", lyrics: "beauty," },
              ],
              [
                { chord: "D", lyrics: "Teach me faith and " },
                { chord: "G", lyrics: "duty:" },
              ],
            ],
          },
          {
            id: "h20-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Beautiful words, " },
                { chord: "D", lyrics: "wonderful words," },
              ],
              [
                { chord: "D", lyrics: "Wonderful words of " },
                { chord: "G", lyrics: "life;" },
              ],
              [
                { chord: "G", lyrics: "Beautiful words, " },
                { chord: "C", lyrics: "wonderful words," },
              ],
              [
                { chord: "G", lyrics: "Wonderful " },
                { chord: "D", lyrics: "words of " },
                { chord: "G", lyrics: "life." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-20-mahir",
        songId: "hymn-20",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G/B -> D7, Em7 -> A7 -> D7, G7 -> C -> Am7, serta G/D -> D7 -> G.",
        sections: [
          {
            id: "h20-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Sing them over a" },
                { chord: "Am7", lyrics: "gain ", isBridge: true },
                { chord: "D7", lyrics: "to " },
                { chord: "G", lyrics: "me," },
              ],
              [
                { chord: "D/F#", lyrics: "Wonderful ", isBridge: true },
                { chord: "D7", lyrics: "words of " },
                { chord: "G", lyrics: "life; " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Let me more of their ", isBridge: true },
                { chord: "A7", lyrics: "beauty ", isBridge: true },
                { chord: "D7", lyrics: "see," },
              ],
              [
                { chord: "D7", lyrics: "Wonderful words of " },
                { chord: "G", lyrics: "life; " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "Words of life and " },
                { chord: "G/B", lyrics: "beau", isBridge: true },
                { chord: "G", lyrics: "ty," },
              ],
              [
                { chord: "A7", lyrics: "Teach me faith and ", isBridge: true },
                { chord: "Dsus4", lyrics: "du", isBridge: true },
                { chord: "D7", lyrics: "ty:" },
              ],
            ],
          },
          {
            id: "h20-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Beautiful words, " },
                { chord: "Am7", lyrics: "wonderful ", isBridge: true },
                { chord: "D7", lyrics: "words," },
              ],
              [
                { chord: "D/F#", lyrics: "Wonderful ", isBridge: true },
                { chord: "D7", lyrics: "words of " },
                { chord: "G", lyrics: "life; " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "Beautiful words, " },
                { chord: "Am7", lyrics: "wonderful ", isBridge: true },
                { chord: "G/B", lyrics: "words, ", isBridge: true },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Wonderful ", isBridge: true },
                { chord: "D7", lyrics: "words of " },
                { chord: "G", lyrics: "life." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 21. Trust and Obey
  {
    id: "hymn-21",
    slug: "trust-and-obey",
    title: "Trust and Obey",
    artist: "John H. Sammis & Daniel B. Towner (1887)",
    genre: "Hymn Klasik (3/4)",
    key: "F",
    bpm: 88,
    timeSignature: "3/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn ketaatan iman dalam nada dasar F Mayor (3/4). Mode Pemula menggunakan F-Bb-C-Dm, dan Mode Mahir menambahkan jembatan F/A, C/E, Gm7, G7, dan F/C.",
    strummingPattern: "Bass - Down - Down (3/4 Mantap)",
    arrangements: [
      {
        id: "arr-21-pemula",
        songId: "hymn-21",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar F, Bb, C, dan Dm.",
        sections: [
          {
            id: "h21-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "When we walk with the " },
                { chord: "C", lyrics: "Lord in the " },
                { chord: "F", lyrics: "light of His Word," },
              ],
              [
                { chord: "Bb", lyrics: "What a glory He " },
                { chord: "F", lyrics: "sheds on our " },
                { chord: "C", lyrics: "way!" },
              ],
              [
                { chord: "F", lyrics: "While we do His good " },
                { chord: "C", lyrics: "will, He a" },
                { chord: "Dm", lyrics: "bides with us still," },
              ],
              [
                { chord: "Bb", lyrics: "And with all who will " },
                { chord: "C", lyrics: "trust and o" },
                { chord: "F", lyrics: "bey." },
              ],
            ],
          },
          {
            id: "h21-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Trust and o" },
                { chord: "F", lyrics: "bey, for there's " },
                { chord: "Dm", lyrics: "no other " },
                { chord: "C", lyrics: "way" },
              ],
              [
                { chord: "F", lyrics: "To be happy in " },
                { chord: "Bb", lyrics: "Jesus, but to " },
                { chord: "C", lyrics: "trust and o" },
                { chord: "F", lyrics: "bey." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-21-mahir",
        songId: "hymn-21",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan F -> C/E -> Dm7 -> F/C, jembatan G7 -> C7, dan penutup Gm7 -> F/C -> C7 -> F.",
        sections: [
          {
            id: "h21-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "When we walk " },
                { chord: "F/A", lyrics: "with the ", isBridge: true },
                { chord: "C7", lyrics: "Lord in the " },
                { chord: "F", lyrics: "light of His Word, " },
                { chord: "F/A", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bb", lyrics: "What a glory " },
                { chord: "F/A", lyrics: "He ", isBridge: true },
                { chord: "G7", lyrics: "sheds on our ", isBridge: true },
                { chord: "C7", lyrics: "way!" },
              ],
              [
                { chord: "F", lyrics: "While we do " },
                { chord: "C/E", lyrics: "His good ", isBridge: true },
                { chord: "Dm7", lyrics: "will, He a" },
                { chord: "F/C", lyrics: "bides with us still, ", isBridge: true },
              ],
              [
                { chord: "Bb", lyrics: "And with all " },
                { chord: "Gm7", lyrics: "who will ", isBridge: true },
                { chord: "F/C", lyrics: "trust and ", isBridge: true },
                { chord: "C7", lyrics: "o" },
                { chord: "F", lyrics: "bey." },
              ],
            ],
          },
          {
            id: "h21-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C7", lyrics: "Trust and o" },
                { chord: "F", lyrics: "bey, " },
                { chord: "A7", lyrics: "for there's ", isBridge: true },
                { chord: "Dm7", lyrics: "no other " },
                { chord: "G7", lyrics: "way ", isBridge: true },
                { chord: "C7", lyrics: " " },
              ],
              [
                { chord: "F", lyrics: "To be happy " },
                { chord: "F/A", lyrics: "in ", isBridge: true },
                { chord: "Bb", lyrics: "Jesus, " },
                { chord: "Gm7", lyrics: "but to ", isBridge: true },
                { chord: "F/C", lyrics: "trust ", isBridge: true },
                { chord: "C7", lyrics: "and o" },
                { chord: "F", lyrics: "bey." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 22. What a Friend We Have in Jesus
  {
    id: "hymn-22",
    slug: "what-a-friend-we-have-in-jesus",
    title: "What a Friend We Have in Jesus",
    artist: "Joseph M. Scriven & Charles C. Converse (1855)",
    genre: "Hymn Klasik",
    key: "F",
    bpm: 82,
    timeSignature: "4/4",
    durationSec: 230,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn penghiburan doa paling akrab sepanjang masa dalam F Mayor. Mode Pemula menggunakan 3 chord dasar (F-Bb-C), dan Mode Mahir menambahkan jembatan F/A, Dm7, Gm7, G7, dan F/C.",
    strummingPattern: "D - D U - D - D U (4/4 Hangat)",
    arrangements: [
      {
        id: "arr-22-pemula",
        songId: "hymn-22",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord utama dasar: F, Bb, dan C.",
        sections: [
          {
            id: "h22-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "What a Friend we have in " },
                { chord: "Bb", lyrics: "Jesus," },
              ],
              [
                { chord: "F", lyrics: "All our sins and griefs to " },
                { chord: "C", lyrics: "bear!" },
              ],
              [
                { chord: "F", lyrics: "What a privilege to " },
                { chord: "Bb", lyrics: "carry" },
              ],
              [
                { chord: "F", lyrics: "Everything to " },
                { chord: "C", lyrics: "God in " },
                { chord: "F", lyrics: "prayer!" },
              ],
              [
                { chord: "C", lyrics: "O what peace we often " },
                { chord: "F", lyrics: "forfeit," },
              ],
              [
                { chord: "Bb", lyrics: "O what needless " },
                { chord: "F", lyrics: "pain we " },
                { chord: "C", lyrics: "bear," },
              ],
              [
                { chord: "F", lyrics: "All because we do not " },
                { chord: "Bb", lyrics: "carry" },
              ],
              [
                { chord: "F", lyrics: "Everything to " },
                { chord: "C", lyrics: "God in " },
                { chord: "F", lyrics: "prayer!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-22-mahir",
        songId: "hymn-22",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan F -> F/A -> Bb -> Gm7, Dm7 -> G7 -> C7, serta F/C -> C7 -> F.",
        sections: [
          {
            id: "h22-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "What a Friend " },
                { chord: "F/A", lyrics: "we have in ", isBridge: true },
                { chord: "Bb", lyrics: "Jesus, " },
                { chord: "Gm7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "F", lyrics: "All our sins " },
                { chord: "Dm7", lyrics: "and griefs ", isBridge: true },
                { chord: "G7", lyrics: "to ", isBridge: true },
                { chord: "C7", lyrics: "bear!" },
              ],
              [
                { chord: "F", lyrics: "What a privi" },
                { chord: "F7/A", lyrics: "lege to ", isBridge: true },
                { chord: "Bb", lyrics: "carry " },
                { chord: "Gm7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "F/C", lyrics: "Everything ", isBridge: true },
                { chord: "C7", lyrics: "to God in " },
                { chord: "F", lyrics: "prayer!" },
              ],
              [
                { chord: "C7", lyrics: "O what peace " },
                { chord: "C/E", lyrics: "we often ", isBridge: true },
                { chord: "F", lyrics: "forfeit, " },
                { chord: "Dm7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Gm7", lyrics: "O what need", isBridge: true },
                { chord: "G7", lyrics: "less pain we ", isBridge: true },
                { chord: "C7", lyrics: "bear," },
              ],
              [
                { chord: "F", lyrics: "All because " },
                { chord: "F7/A", lyrics: "we do not ", isBridge: true },
                { chord: "Bb", lyrics: "carry " },
                { chord: "Gm7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "F/C", lyrics: "Everything ", isBridge: true },
                { chord: "C7", lyrics: "to God in " },
                { chord: "Bb/F", lyrics: " ", isBridge: true },
                { chord: "F", lyrics: "prayer!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 23. Come Ye Sinners, Poor and Needy
  {
    id: "hymn-23",
    slug: "come-ye-sinners-poor-and-needy",
    title: "Come, Ye Sinners, Poor and Needy",
    artist: "Joseph Hart & William Walker (1759)",
    genre: "Hymn Klasik",
    key: "D",
    bpm: 80,
    timeSignature: "4/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn undangan anugerah dalam D Mayor. Mode Pemula menggunakan D-G-A-Bm, dan Mode Mahir menambahkan jembatan D/F#, A/C#, Em7, dan D/A.",
    strummingPattern: "D - D U - D - D U (4/4 Mengalir)",
    arrangements: [
      {
        id: "arr-23-pemula",
        songId: "hymn-23",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar D, G, A, dan Bm.",
        sections: [
          {
            id: "h23-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Come, ye sinners, " },
                { chord: "G", lyrics: "poor and " },
                { chord: "D", lyrics: "needy," },
              ],
              [
                { chord: "Bm", lyrics: "Weak and wounded, " },
                { chord: "G", lyrics: "sick and " },
                { chord: "A", lyrics: "sore;" },
              ],
              [
                { chord: "D", lyrics: "Jesus ready " },
                { chord: "G", lyrics: "stands to " },
                { chord: "D", lyrics: "save you," },
              ],
              [
                { chord: "G", lyrics: "Full of pity, " },
                { chord: "A", lyrics: "love, and " },
                { chord: "D", lyrics: "power." },
              ],
            ],
          },
          {
            id: "h23-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I will arise and " },
                { chord: "G", lyrics: "go to " },
                { chord: "D", lyrics: "Jesus," },
              ],
              [
                { chord: "Bm", lyrics: "He will embrace me " },
                { chord: "A", lyrics: "in His arms;" },
              ],
              [
                { chord: "D", lyrics: "In the arms of my " },
                { chord: "G", lyrics: "dear " },
                { chord: "D", lyrics: "Savior," },
              ],
              [
                { chord: "G", lyrics: "O there are " },
                { chord: "A", lyrics: "ten thousand " },
                { chord: "D", lyrics: "charms." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-23-mahir",
        songId: "hymn-23",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan D -> D/F# -> Gmaj7, A/C# -> Bm7 -> Em7 -> Asus4 -> A7, dan D/A -> A7 -> D.",
        sections: [
          {
            id: "h23-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Come, ye " },
                { chord: "D/F#", lyrics: "sinners, ", isBridge: true },
                { chord: "Gmaj7", lyrics: "poor and " },
                { chord: "D", lyrics: "needy, " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "Weak and wounded, " },
                { chord: "Em7", lyrics: "sick and ", isBridge: true },
                { chord: "Asus4", lyrics: "sore; ", isBridge: true },
                { chord: "A7", lyrics: " " },
              ],
              [
                { chord: "D", lyrics: "Jesus " },
                { chord: "D7/F#", lyrics: "ready ", isBridge: true },
                { chord: "Gmaj7", lyrics: "stands to " },
                { chord: "Bm7", lyrics: "save you, ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Full of pity, ", isBridge: true },
                { chord: "D/A", lyrics: "love, ", isBridge: true },
                { chord: "A7", lyrics: "and " },
                { chord: "D", lyrics: "power." },
              ],
            ],
          },
          {
            id: "h23-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "I will a" },
                { chord: "D/F#", lyrics: "rise and ", isBridge: true },
                { chord: "G", lyrics: "go to " },
                { chord: "D", lyrics: "Jesus, " },
                { chord: "A/C#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Bm7", lyrics: "He will embrace me " },
                { chord: "E7", lyrics: "in His ", isBridge: true },
                { chord: "Asus4", lyrics: "arms; ", isBridge: true },
                { chord: "A7", lyrics: " " },
              ],
              [
                { chord: "D", lyrics: "In the arms " },
                { chord: "D7", lyrics: "of my ", isBridge: true },
                { chord: "Gmaj7", lyrics: "dear " },
                { chord: "Bm7", lyrics: "Savior, ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "O there are ", isBridge: true },
                { chord: "D/A", lyrics: "ten ", isBridge: true },
                { chord: "A7", lyrics: "thousand " },
                { chord: "D", lyrics: "charms." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 24. Love Lifted Me
  {
    id: "hymn-24",
    slug: "love-lifted-me",
    title: "Love Lifted Me",
    artist: "James Rowe & Howard E. Smith (1912)",
    genre: "Hymn Klasik (6/8)",
    key: "G",
    bpm: 104,
    timeSignature: "6/8",
    durationSec: 190,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn kesaksian penuh sukacita dalam G Mayor (6/8). Mode Pemula menggunakan G-C-D, dan Mode Mahir menambahkan jembatan G/B, Am7, A7, D/F#, dan G/D.",
    strummingPattern: "D - D - D U (6/8 Gembira)",
    arrangements: [
      {
        id: "arr-24-pemula",
        songId: "hymn-24",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar G, C, dan D.",
        sections: [
          {
            id: "h24-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I was sinking deep in " },
                { chord: "C", lyrics: "sin, far from " },
                { chord: "G", lyrics: "the peaceful shore," },
              ],
              [
                { chord: "G", lyrics: "Very deeply stained with" },
                { chord: "D", lyrics: "in, sinking to rise no more;" },
              ],
              [
                { chord: "G", lyrics: "But the Master of the " },
                { chord: "C", lyrics: "sea heard my " },
                { chord: "G", lyrics: "despairing cry," },
              ],
              [
                { chord: "G", lyrics: "From the waters " },
                { chord: "D", lyrics: "lifted me, now " },
                { chord: "G", lyrics: "safe am I." },
              ],
            ],
          },
          {
            id: "h24-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Love lifted " },
                { chord: "C", lyrics: "me! " },
                { chord: "G", lyrics: "Love lifted " },
                { chord: "D", lyrics: "me!" },
              ],
              [
                { chord: "D", lyrics: "When nothing " },
                { chord: "G", lyrics: "else could help," },
              ],
              [
                { chord: "G", lyrics: "Love " },
                { chord: "D", lyrics: "lifted " },
                { chord: "G", lyrics: "me." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-24-mahir",
        songId: "hymn-24",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> Dsus4 -> D7, dan G/D -> D7 -> G.",
        sections: [
          {
            id: "h24-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "I was sinking " },
                { chord: "G7/B", lyrics: "deep in ", isBridge: true },
                { chord: "C", lyrics: "sin, far from " },
                { chord: "G", lyrics: "the peaceful shore, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Very deeply ", isBridge: true },
                { chord: "A7", lyrics: "stained with", isBridge: true },
                { chord: "Dsus4", lyrics: "in, sinking to ", isBridge: true },
                { chord: "D7", lyrics: "rise no more;" },
              ],
              [
                { chord: "G", lyrics: "But the Master " },
                { chord: "G7", lyrics: "of the ", isBridge: true },
                { chord: "C", lyrics: "sea heard my " },
                { chord: "Am7", lyrics: "despairing ", isBridge: true },
                { chord: "G", lyrics: "cry," },
              ],
              [
                { chord: "Em7", lyrics: "From the waters ", isBridge: true },
                { chord: "G/D", lyrics: "lifted me, ", isBridge: true },
                { chord: "D7", lyrics: "now safe am " },
                { chord: "G", lyrics: "I." },
              ],
            ],
          },
          {
            id: "h24-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Love lifted " },
                { chord: "C", lyrics: "me! " },
                { chord: "A7", lyrics: "Love lifted ", isBridge: true },
                { chord: "D7", lyrics: "me!" },
              ],
              [
                { chord: "Am7", lyrics: "When nothing ", isBridge: true },
                { chord: "D7", lyrics: "else could " },
                { chord: "G", lyrics: "help, " },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Love ", isBridge: true },
                { chord: "D7", lyrics: "lifted " },
                { chord: "G", lyrics: "me." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 25. Rock of Ages
  {
    id: "hymn-25",
    slug: "rock-of-ages",
    title: "Rock of Ages",
    artist: "Augustus M. Toplady & Thomas Hastings (1776)",
    genre: "Hymn Klasik (3/4)",
    key: "G",
    bpm: 80,
    timeSignature: "3/4",
    durationSec: 200,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn Batu Karang Zaman dalam G Mayor (3/4). Mode Pemula memakai G-C-D, dan Mode Mahir menambahkan jembatan G/B, D/F#, Em7, Am7, dan G/D.",
    strummingPattern: "Bass - Down - Down (3/4 Mantap)",
    arrangements: [
      {
        id: "arr-25-pemula",
        songId: "hymn-25",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar G, C, dan D.",
        sections: [
          {
            id: "h25-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Rock of Ages, " },
                { chord: "C", lyrics: "cleft for " },
                { chord: "G", lyrics: "me," },
              ],
              [
                { chord: "G", lyrics: "Let me hide my" },
                { chord: "D", lyrics: "self in " },
                { chord: "G", lyrics: "Thee;" },
              ],
              [
                { chord: "D", lyrics: "Let the water " },
                { chord: "G", lyrics: "and the " },
                { chord: "D", lyrics: "blood," },
              ],
              [
                { chord: "D", lyrics: "From Thy wounded " },
                { chord: "G", lyrics: "side which " },
                { chord: "D", lyrics: "flowed," },
              ],
              [
                { chord: "G", lyrics: "Be of sin the " },
                { chord: "C", lyrics: "double " },
                { chord: "G", lyrics: "cure," },
              ],
              [
                { chord: "G", lyrics: "Save from wrath and " },
                { chord: "D", lyrics: "make me " },
                { chord: "G", lyrics: "pure." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-25-mahir",
        songId: "hymn-25",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G/D -> D7 -> G, serta D/F# -> Em7 -> A7 -> D7.",
        sections: [
          {
            id: "h25-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Rock of " },
                { chord: "G7/B", lyrics: "Ages, ", isBridge: true },
                { chord: "C", lyrics: "cleft for " },
                { chord: "G", lyrics: "me, " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Let me hide ", isBridge: true },
                { chord: "G/D", lyrics: "my", isBridge: true },
                { chord: "D7", lyrics: "self in " },
                { chord: "G", lyrics: "Thee;" },
              ],
              [
                { chord: "D7", lyrics: "Let the water " },
                { chord: "G/B", lyrics: "and the ", isBridge: true },
                { chord: "D", lyrics: "blood," },
              ],
              [
                { chord: "Em7", lyrics: "From Thy wounded ", isBridge: true },
                { chord: "A7", lyrics: "side which ", isBridge: true },
                { chord: "Dsus4", lyrics: "flowed, ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "Be of " },
                { chord: "G7/B", lyrics: "sin the ", isBridge: true },
                { chord: "C", lyrics: "double " },
                { chord: "Am7", lyrics: "cure, ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "Save from wrath ", isBridge: true },
                { chord: "D7", lyrics: "and make me " },
                { chord: "G", lyrics: "pure." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 26. Onward, Christian Soldiers
  {
    id: "hymn-26",
    slug: "onward-christian-soldiers",
    title: "Onward, Christian Soldiers",
    artist: "Sabine Baring-Gould & Arthur S. Sullivan (1871)",
    genre: "Hymn Klasik (Mars 4/4)",
    key: "D",
    bpm: 112,
    timeSignature: "4/4",
    durationSec: 205,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn mars perjuangan iman dalam D Mayor. Mode Pemula menggunakan D-G-A-E, dan Mode Mahir menambahkan jembatan D/F#, A/C#, Bm7, E7/G#, dan D/A.",
    strummingPattern: "D - D - D U D U (4/4 Mars Tegas)",
    arrangements: [
      {
        id: "arr-26-pemula",
        songId: "hymn-26",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar D, G, A, dan E.",
        sections: [
          {
            id: "h26-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Onward, Christian " },
                { chord: "A", lyrics: "soldiers, " },
                { chord: "D", lyrics: "marching as to " },
                { chord: "A", lyrics: "war," },
              ],
              [
                { chord: "D", lyrics: "With the cross of " },
                { chord: "G", lyrics: "Jesus " },
                { chord: "E", lyrics: "going on be" },
                { chord: "A", lyrics: "fore." },
              ],
              [
                { chord: "A", lyrics: "Christ, the royal " },
                { chord: "D", lyrics: "Master, " },
                { chord: "G", lyrics: "leads against the " },
                { chord: "D", lyrics: "foe;" },
              ],
              [
                { chord: "G", lyrics: "Forward into " },
                { chord: "D", lyrics: "battle " },
                { chord: "A", lyrics: "see His banners " },
                { chord: "D", lyrics: "go!" },
              ],
            ],
          },
          {
            id: "h26-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Onward, Christian " },
                { chord: "A", lyrics: "soldiers, " },
                { chord: "D", lyrics: "marching as to " },
                { chord: "A", lyrics: "war," },
              ],
              [
                { chord: "G", lyrics: "With the cross of " },
                { chord: "D", lyrics: "Jesus " },
                { chord: "A", lyrics: "going on be" },
                { chord: "D", lyrics: "fore." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-26-mahir",
        songId: "hymn-26",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan D -> A/C# -> Bm7 -> D/A, E7/G# -> Asus4 -> A7, serta Gmaj7 -> D/A -> A7 -> D.",
        sections: [
          {
            id: "h26-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "D", lyrics: "Onward, Christian " },
                { chord: "A/C#", lyrics: "soldiers, ", isBridge: true },
                { chord: "Bm7", lyrics: "marching as to ", isBridge: true },
                { chord: "A7", lyrics: "war," },
              ],
              [
                { chord: "D", lyrics: "With the cross " },
                { chord: "D/F#", lyrics: "of ", isBridge: true },
                { chord: "G", lyrics: "Jesus " },
                { chord: "E7/G#", lyrics: "going on be", isBridge: true },
                { chord: "Asus4", lyrics: "fore. ", isBridge: true },
                { chord: "A", lyrics: " " },
              ],
              [
                { chord: "A7", lyrics: "Christ, the royal " },
                { chord: "D", lyrics: "Master, " },
                { chord: "G", lyrics: "leads a" },
                { chord: "A7", lyrics: "gainst the ", isBridge: true },
                { chord: "D", lyrics: "foe; " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Forward into " },
                { chord: "D/A", lyrics: "battle ", isBridge: true },
                { chord: "A7", lyrics: "see His banners " },
                { chord: "D", lyrics: "go!" },
              ],
            ],
          },
          {
            id: "h26-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Onward, Christian " },
                { chord: "A/C#", lyrics: "soldiers, ", isBridge: true },
                { chord: "D", lyrics: "marching as to " },
                { chord: "A7", lyrics: "war," },
              ],
              [
                { chord: "G", lyrics: "With the cross " },
                { chord: "D/F#", lyrics: "of ", isBridge: true },
                { chord: "Em7", lyrics: "Jesus ", isBridge: true },
                { chord: "A7", lyrics: "going on be" },
                { chord: "D", lyrics: "fore." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 27. Praise Him, Praise Him
  {
    id: "hymn-27",
    slug: "praise-him-praise-him",
    title: "Praise Him! Praise Him!",
    artist: "Fanny J. Crosby & Chester G. Allen (1869)",
    genre: "Hymn Klasik (6/8)",
    key: "G",
    bpm: 108,
    timeSignature: "6/8",
    durationSec: 200,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Lagu puji-pujian meriah dalam G Mayor (6/8). Mode Pemula menggunakan G-C-D-A, dan Mode Mahir menambahkan jembatan G/B, D/F#, Em7, Am7, A7, dan G/D.",
    strummingPattern: "D - D - D U (6/8 Meriah)",
    arrangements: [
      {
        id: "arr-27-pemula",
        songId: "hymn-27",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan A.",
        sections: [
          {
            id: "h27-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Praise Him! praise Him! " },
                { chord: "C", lyrics: "Jesus, our " },
                { chord: "G", lyrics: "blessed Redeemer!" },
              ],
              [
                { chord: "G", lyrics: "Sing, O Earth, His " },
                { chord: "A", lyrics: "wonderful " },
                { chord: "D", lyrics: "love proclaim!" },
              ],
              [
                { chord: "G", lyrics: "Hail Him! hail Him! " },
                { chord: "C", lyrics: "highest arch" },
                { chord: "G", lyrics: "angels in glory;" },
              ],
              [
                { chord: "G", lyrics: "Strength and honor " },
                { chord: "D", lyrics: "give to His " },
                { chord: "G", lyrics: "holy name!" },
              ],
            ],
          },
          {
            id: "h27-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Praise Him! praise Him! " },
                { chord: "C", lyrics: "tell of His " },
                { chord: "G", lyrics: "excellent greatness;" },
              ],
              [
                { chord: "G", lyrics: "Praise Him! praise Him! " },
                { chord: "D", lyrics: "ever in " },
                { chord: "G", lyrics: "joyful song!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-27-mahir",
        songId: "hymn-27",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> Dsus4 -> D7, dan G/D -> D7 -> G.",
        sections: [
          {
            id: "h27-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Praise Him! " },
                { chord: "G7/B", lyrics: "praise Him! ", isBridge: true },
                { chord: "C", lyrics: "Jesus, our " },
                { chord: "G", lyrics: "blessed Redeemer! " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Sing, O Earth, ", isBridge: true },
                { chord: "A7", lyrics: "His wonderful " },
                { chord: "Dsus4", lyrics: "love pro", isBridge: true },
                { chord: "D7", lyrics: "claim!" },
              ],
              [
                { chord: "G", lyrics: "Hail Him! " },
                { chord: "G7", lyrics: "hail Him! ", isBridge: true },
                { chord: "C", lyrics: "highest arch" },
                { chord: "Am7", lyrics: "angels in ", isBridge: true },
                { chord: "G", lyrics: "glory;" },
              ],
              [
                { chord: "Em7", lyrics: "Strength and honor ", isBridge: true },
                { chord: "G/D", lyrics: "give to His ", isBridge: true },
                { chord: "D7", lyrics: "holy " },
                { chord: "G", lyrics: "name!" },
              ],
            ],
          },
          {
            id: "h27-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Praise Him! " },
                { chord: "G7/B", lyrics: "praise Him! ", isBridge: true },
                { chord: "C", lyrics: "tell of His " },
                { chord: "Am7", lyrics: "excellent ", isBridge: true },
                { chord: "G", lyrics: "greatness;" },
              ],
              [
                { chord: "Em7", lyrics: "Praise Him! ", isBridge: true },
                { chord: "G/D", lyrics: "praise Him! ", isBridge: true },
                { chord: "D7", lyrics: "ever in joyful " },
                { chord: "G", lyrics: "song!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 28. The Lord Is My Shepherd I'll Not Want
  {
    id: "hymn-28",
    slug: "the-lord-is-my-shepherd-ill-not-want",
    title: "The Lord Is My Shepherd, I'll Not Want",
    artist: "Scottish Psalter & Jessie S. Irvine (Mazmur 23 - Crimond)",
    genre: "Hymn Klasik (3/4)",
    key: "F",
    bpm: 76,
    timeSignature: "3/4",
    durationSec: 210,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Parafrase Mazmur 23 (Crimond) dalam F Mayor (3/4). Mode Pemula menggunakan F-Bb-C-Dm, dan Mode Mahir menambahkan jembatan F/A, C/E, Gm7, G7, dan F/C.",
    strummingPattern: "Bass - Down - Down (3/4 Teduh)",
    arrangements: [
      {
        id: "arr-28-pemula",
        songId: "hymn-28",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar F, Bb, C, dan Dm.",
        sections: [
          {
            id: "h28-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "The Lord's my " },
                { chord: "Bb", lyrics: "Shepherd, " },
                { chord: "F", lyrics: "I'll not " },
                { chord: "C", lyrics: "want;" },
              ],
              [
                { chord: "F", lyrics: "He makes me " },
                { chord: "Dm", lyrics: "down to " },
                { chord: "C", lyrics: "lie" },
              ],
              [
                { chord: "F", lyrics: "In pastures " },
                { chord: "Bb", lyrics: "green; He " },
                { chord: "F", lyrics: "leadeth me" },
              ],
              [
                { chord: "Bb", lyrics: "The quiet " },
                { chord: "C", lyrics: "waters " },
                { chord: "F", lyrics: "by." },
              ],
            ],
          },
          {
            id: "h28-p-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "F", lyrics: "My soul He " },
                { chord: "Bb", lyrics: "doth re" },
                { chord: "F", lyrics: "store a" },
                { chord: "C", lyrics: "gain," },
              ],
              [
                { chord: "F", lyrics: "And me to " },
                { chord: "Dm", lyrics: "walk doth " },
                { chord: "C", lyrics: "make" },
              ],
              [
                { chord: "F", lyrics: "Within the " },
                { chord: "Bb", lyrics: "paths of " },
                { chord: "F", lyrics: "righteousness," },
              ],
              [
                { chord: "Bb", lyrics: "E'en for His " },
                { chord: "C", lyrics: "own name's " },
                { chord: "F", lyrics: "sake." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-28-mahir",
        songId: "hymn-28",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan F -> F/A -> Bb -> F/C, C/E -> Dm7 -> G7 -> C7, serta Gm7 -> F/C -> C7 -> F.",
        sections: [
          {
            id: "h28-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "F", lyrics: "The Lord's " },
                { chord: "F/A", lyrics: "my ", isBridge: true },
                { chord: "Bb", lyrics: "Shepherd, " },
                { chord: "F/C", lyrics: "I'll not ", isBridge: true },
                { chord: "C7", lyrics: "want;" },
              ],
              [
                { chord: "F", lyrics: "He makes " },
                { chord: "C/E", lyrics: "me ", isBridge: true },
                { chord: "Dm7", lyrics: "down to " },
                { chord: "G7", lyrics: " ", isBridge: true },
                { chord: "C7", lyrics: "lie" },
              ],
              [
                { chord: "F", lyrics: "In pastures " },
                { chord: "F7/A", lyrics: " ", isBridge: true },
                { chord: "Bb", lyrics: "green; He " },
                { chord: "Dm7", lyrics: "leadeth me ", isBridge: true },
              ],
              [
                { chord: "Gm7", lyrics: "The quiet ", isBridge: true },
                { chord: "F/C", lyrics: "wa", isBridge: true },
                { chord: "C7", lyrics: "ters " },
                { chord: "F", lyrics: "by." },
              ],
            ],
          },
          {
            id: "h28-m-v2",
            name: "Verse 2",
            lines: [
              [
                { chord: "F", lyrics: "My soul " },
                { chord: "F/A", lyrics: "He ", isBridge: true },
                { chord: "Bb", lyrics: "doth re" },
                { chord: "F/C", lyrics: "store a", isBridge: true },
                { chord: "C7", lyrics: "gain," },
              ],
              [
                { chord: "F", lyrics: "And me " },
                { chord: "C/E", lyrics: "to ", isBridge: true },
                { chord: "Dm7", lyrics: "walk doth " },
                { chord: "G7", lyrics: " ", isBridge: true },
                { chord: "C7", lyrics: "make" },
              ],
              [
                { chord: "F", lyrics: "Within " },
                { chord: "F7/A", lyrics: "the ", isBridge: true },
                { chord: "Bb", lyrics: "paths of " },
                { chord: "Dm7", lyrics: "righteousness, ", isBridge: true },
              ],
              [
                { chord: "Gm7", lyrics: "E'en for His ", isBridge: true },
                { chord: "F/C", lyrics: "own ", isBridge: true },
                { chord: "C7", lyrics: "name's " },
                { chord: "F", lyrics: "sake." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 29. To God Be the Glory
  {
    id: "hymn-29",
    slug: "to-god-be-the-glory",
    title: "To God Be the Glory",
    artist: "Fanny J. Crosby & William H. Doane (1875)",
    genre: "Hymn Klasik (3/4)",
    key: "G",
    bpm: 96,
    timeSignature: "3/4",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn kemuliaan Tuhan yang megah dalam G Mayor (3/4). Mode Pemula menggunakan G-C-D-A, dan Mode Mahir menambahkan jembatan G/B, D/F#, Em7, A7, Am7, dan G/D.",
    strummingPattern: "Bass - Down - Down (3/4 Megah)",
    arrangements: [
      {
        id: "arr-29-pemula",
        songId: "hymn-29",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan A.",
        sections: [
          {
            id: "h29-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "To God be the glory, great " },
                { chord: "D", lyrics: "things He hath " },
                { chord: "G", lyrics: "done;" },
              ],
              [
                { chord: "C", lyrics: "So loved He the world that He " },
                { chord: "A", lyrics: "gave us His " },
                { chord: "D", lyrics: "Son," },
              ],
              [
                { chord: "G", lyrics: "Who yielded His life an a" },
                { chord: "C", lyrics: "tonement for " },
                { chord: "G", lyrics: "sin," },
              ],
              [
                { chord: "C", lyrics: "And opened the life-gate that " },
                { chord: "D", lyrics: "all may go " },
                { chord: "G", lyrics: "in." },
              ],
            ],
          },
          {
            id: "h29-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Praise the Lord, praise the Lord," },
              ],
              [
                { chord: "D", lyrics: "Let the earth hear His voice!" },
              ],
              [
                { chord: "D", lyrics: "Praise the Lord, praise the Lord," },
              ],
              [
                { chord: "G", lyrics: "Let the people rejoice!" },
              ],
              [
                { chord: "G", lyrics: "O come to the Father, through " },
                { chord: "C", lyrics: "Jesus the " },
                { chord: "G", lyrics: "Son," },
              ],
              [
                { chord: "C", lyrics: "And give Him the glory, great " },
                { chord: "D", lyrics: "things He hath " },
                { chord: "G", lyrics: "done." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-29-mahir",
        songId: "hymn-29",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G/B -> D7/F# -> G, C -> Em7 -> A7 -> Dsus4 -> D7, dan Am7 -> G/D -> D7 -> G.",
        sections: [
          {
            id: "h29-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "To God be the " },
                { chord: "G/B", lyrics: "glory, great ", isBridge: true },
                { chord: "D7", lyrics: "things He hath " },
                { chord: "G", lyrics: "done; " },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "So loved He the " },
                { chord: "Em7", lyrics: "world that He ", isBridge: true },
                { chord: "A7", lyrics: "gave us His " },
                { chord: "Dsus4", lyrics: "Son, ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "Who yielded His " },
                { chord: "G7/B", lyrics: "life an a", isBridge: true },
                { chord: "C", lyrics: "tonement for " },
                { chord: "G", lyrics: "sin, " },
                { chord: "Em7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "And opened the ", isBridge: true },
                { chord: "G/D", lyrics: "life-gate that ", isBridge: true },
                { chord: "D7", lyrics: "all may go " },
                { chord: "G", lyrics: "in." },
              ],
            ],
          },
          {
            id: "h29-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "Praise the Lord, " },
                { chord: "G/B", lyrics: "praise the Lord, ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Let the earth ", isBridge: true },
                { chord: "D7", lyrics: "hear His voice!" },
              ],
              [
                { chord: "D7", lyrics: "Praise the Lord, " },
                { chord: "D/F#", lyrics: "praise the Lord, ", isBridge: true },
              ],
              [
                { chord: "G", lyrics: "Let the people " },
                { chord: "G7", lyrics: "rejoice! ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "O come to the " },
                { chord: "B7", lyrics: "Father, through ", isBridge: true },
                { chord: "Em7", lyrics: "Jesus the ", isBridge: true },
                { chord: "C", lyrics: "Son," },
              ],
              [
                { chord: "G/D", lyrics: "And give Him the ", isBridge: true },
                { chord: "D7", lyrics: "glory, great things He hath " },
                { chord: "G", lyrics: "done." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 30. When Morning Gilds the Skies
  {
    id: "hymn-30",
    slug: "when-morning-gilds-the-skies",
    title: "When Morning Gilds the Skies",
    artist: "Edward Caswall & Joseph Barnby (1868)",
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
      "Hymn pujian pagi dalam G Mayor. Mode Pemula menggunakan G-C-D-Em, dan Mode Mahir menambahkan jembatan G/B, D/F#, A7, Am7, dan G/D.",
    strummingPattern: "D - D U - D - D U (4/4 Cerah)",
    arrangements: [
      {
        id: "arr-30-pemula",
        songId: "hymn-30",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h30-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "When morning " },
                { chord: "D", lyrics: "gilds the " },
                { chord: "G", lyrics: "skies," },
              ],
              [
                { chord: "G", lyrics: "My heart a" },
                { chord: "D", lyrics: "waking " },
                { chord: "G", lyrics: "cries:" },
              ],
              [
                { chord: "C", lyrics: "May Jesus " },
                { chord: "G", lyrics: "Christ be " },
                { chord: "D", lyrics: "praised!" },
              ],
              [
                { chord: "G", lyrics: "Alike at " },
                { chord: "C", lyrics: "work and " },
                { chord: "G", lyrics: "prayer" },
              ],
              [
                { chord: "Em", lyrics: "To Jesus " },
                { chord: "C", lyrics: "I re" },
                { chord: "D", lyrics: "pair:" },
              ],
              [
                { chord: "G", lyrics: "May Jesus " },
                { chord: "D", lyrics: "Christ be " },
                { chord: "G", lyrics: "praised!" },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-30-mahir",
        songId: "hymn-30",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> D/F# -> Em7 -> G/D, C -> A7/C# -> Dsus4 -> D7, dan Am7 -> G/D -> D7 -> G.",
        sections: [
          {
            id: "h30-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "When morning " },
                { chord: "D/F#", lyrics: "gilds the ", isBridge: true },
                { chord: "Em7", lyrics: "skies, ", isBridge: true },
                { chord: "G/D", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "My heart a", isBridge: true },
                { chord: "D7", lyrics: "waking " },
                { chord: "G", lyrics: "cries:" },
              ],
              [
                { chord: "C", lyrics: "May Jesus " },
                { chord: "A7", lyrics: "Christ be ", isBridge: true },
                { chord: "Dsus4", lyrics: "praised! ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "Alike at " },
                { chord: "G7/B", lyrics: "work and ", isBridge: true },
                { chord: "C", lyrics: "prayer" },
              ],
              [
                { chord: "Em7", lyrics: "To Jesus " },
                { chord: "A7", lyrics: "I re", isBridge: true },
                { chord: "Dsus4", lyrics: "pair: ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G/D", lyrics: "May Jesus ", isBridge: true },
                { chord: "D7", lyrics: "Christ be " },
                { chord: "G", lyrics: "praised!" },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 31. There Is a Fountain
  {
    id: "hymn-31",
    slug: "there-is-a-fountain",
    title: "There Is a Fountain Filled with Blood",
    artist: "William Cowper & Lowell Mason (1772)",
    genre: "Hymn Klasik",
    key: "C",
    bpm: 78,
    timeSignature: "4/4",
    durationSec: 215,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn penebusan klasik dalam C Mayor. Mode Pemula menggunakan 3 chord dasar (C-F-G), dan Mode Mahir menambahkan jembatan C/E, G/B, Am7, Dm7, dan C/G.",
    strummingPattern: "D - D U - D - D U (4/4 Khidmat)",
    arrangements: [
      {
        id: "arr-31-pemula",
        songId: "hymn-31",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar C, F, dan G.",
        sections: [
          {
            id: "h31-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "There is a fountain " },
                { chord: "F", lyrics: "filled with " },
                { chord: "C", lyrics: "blood" },
              ],
              [
                { chord: "C", lyrics: "Drawn from Im" },
                { chord: "G", lyrics: "manuel's veins;" },
              ],
              [
                { chord: "C", lyrics: "And sinners plunged be" },
                { chord: "F", lyrics: "neath that " },
                { chord: "C", lyrics: "flood" },
              ],
              [
                { chord: "C", lyrics: "Lose all their " },
                { chord: "G", lyrics: "guilty " },
                { chord: "C", lyrics: "stains." },
              ],
            ],
          },
          {
            id: "h31-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Lose all their guilty " },
                { chord: "G", lyrics: "stains," },
              ],
              [
                { chord: "F", lyrics: "Lose all their " },
                { chord: "C", lyrics: "guilty stains;" },
              ],
              [
                { chord: "C", lyrics: "And sinners plunged be" },
                { chord: "F", lyrics: "neath that " },
                { chord: "C", lyrics: "flood" },
              ],
              [
                { chord: "C", lyrics: "Lose all their " },
                { chord: "G", lyrics: "guilty " },
                { chord: "C", lyrics: "stains." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-31-mahir",
        songId: "hymn-31",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan C -> C/E -> Fmaj7 -> C/G, Am7 -> D7 -> Gsus4 -> G7, serta Dm7 -> C/G -> G7 -> C.",
        sections: [
          {
            id: "h31-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "C", lyrics: "There is a " },
                { chord: "C/E", lyrics: "fountain ", isBridge: true },
                { chord: "Fmaj7", lyrics: "filled with " },
                { chord: "C", lyrics: "blood " },
                { chord: "G/B", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Am7", lyrics: "Drawn from Im", isBridge: true },
                { chord: "D7", lyrics: "manuel's ", isBridge: true },
                { chord: "Gsus4", lyrics: "veins; ", isBridge: true },
                { chord: "G7", lyrics: " " },
              ],
              [
                { chord: "C", lyrics: "And sinners " },
                { chord: "C7/E", lyrics: "plunged be", isBridge: true },
                { chord: "Fmaj7", lyrics: "neath that " },
                { chord: "Am7", lyrics: "flood ", isBridge: true },
              ],
              [
                { chord: "Dm7", lyrics: "Lose all their ", isBridge: true },
                { chord: "C/G", lyrics: "guilty ", isBridge: true },
                { chord: "G7", lyrics: " " },
                { chord: "C", lyrics: "stains." },
              ],
            ],
          },
          {
            id: "h31-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "C", lyrics: "Lose all their " },
                { chord: "Am7", lyrics: "guilty ", isBridge: true },
                { chord: "Dm7", lyrics: "stains, ", isBridge: true },
                { chord: "G7", lyrics: " " },
              ],
              [
                { chord: "Fmaj7", lyrics: "Lose all their " },
                { chord: "C/E", lyrics: "guilty ", isBridge: true },
                { chord: "C", lyrics: "stains;" },
              ],
              [
                { chord: "C", lyrics: "And sinners " },
                { chord: "C7/E", lyrics: "plunged be", isBridge: true },
                { chord: "Fmaj7", lyrics: "neath that " },
                { chord: "Am7", lyrics: "flood ", isBridge: true },
              ],
              [
                { chord: "Dm7", lyrics: "Lose all their ", isBridge: true },
                { chord: "C/G", lyrics: "guilty ", isBridge: true },
                { chord: "G7", lyrics: " " },
                { chord: "C", lyrics: "stains." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 32. Whiter Than Snow
  {
    id: "hymn-32",
    slug: "whiter-than-snow",
    title: "Whiter Than Snow",
    artist: "James Nicholson & William G. Fischer (1872)",
    genre: "Hymn Klasik (3/4)",
    key: "G",
    bpm: 82,
    timeSignature: "3/4",
    durationSec: 205,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Doa penyucian hati dalam G Mayor (3/4). Mode Pemula menggunakan G-C-D-Em, dan Mode Mahir menambahkan jembatan G7/B, Cmaj7, Am7, D/F#, dan G/D.",
    strummingPattern: "Bass - Down - Down (3/4 Doa)",
    arrangements: [
      {
        id: "arr-32-pemula",
        songId: "hymn-32",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan chord dasar G, C, D, dan Em.",
        sections: [
          {
            id: "h32-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Lord Jesus, I long to be " },
                { chord: "C", lyrics: "perfectly " },
                { chord: "G", lyrics: "whole;" },
              ],
              [
                { chord: "G", lyrics: "I want Thee forever to " },
                { chord: "D", lyrics: "live in my soul;" },
              ],
              [
                { chord: "G", lyrics: "Break down every idol, cast " },
                { chord: "C", lyrics: "out every " },
                { chord: "G", lyrics: "foe;" },
              ],
              [
                { chord: "Em", lyrics: "Now wash me, and " },
                { chord: "D", lyrics: "I shall be " },
                { chord: "G", lyrics: "whiter than snow." },
              ],
            ],
          },
          {
            id: "h32-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D", lyrics: "Whiter than " },
                { chord: "G", lyrics: "snow, yes, " },
                { chord: "D", lyrics: "whiter than " },
                { chord: "G", lyrics: "snow;" },
              ],
              [
                { chord: "C", lyrics: "Now wash me, and " },
                { chord: "G", lyrics: "I shall be " },
                { chord: "D", lyrics: "whiter than " },
                { chord: "G", lyrics: "snow." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-32-mahir",
        songId: "hymn-32",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, Em7 -> A7 -> Dsus4 -> D7, dan G/D -> D7 -> G.",
        sections: [
          {
            id: "h32-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Lord Jesus, I " },
                { chord: "G7/B", lyrics: "long to be ", isBridge: true },
                { chord: "C", lyrics: "perfectly " },
                { chord: "G", lyrics: "whole; " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "I want Thee for", isBridge: true },
                { chord: "A7", lyrics: "ever to live ", isBridge: true },
                { chord: "Dsus4", lyrics: "in my ", isBridge: true },
                { chord: "D7", lyrics: "soul;" },
              ],
              [
                { chord: "G", lyrics: "Break down every " },
                { chord: "G7", lyrics: "idol, cast ", isBridge: true },
                { chord: "C", lyrics: "out every " },
                { chord: "B7", lyrics: "foe; ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "Now wash me, and " },
                { chord: "G/D", lyrics: "I shall be ", isBridge: true },
                { chord: "D7", lyrics: "whiter than " },
                { chord: "G", lyrics: "snow." },
              ],
            ],
          },
          {
            id: "h32-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "D7", lyrics: "Whiter than " },
                { chord: "G", lyrics: "snow, yes, " },
                { chord: "D/F#", lyrics: "whiter than ", isBridge: true },
                { chord: "Em7", lyrics: "snow; ", isBridge: true },
                { chord: "G7", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "C", lyrics: "Now wash me, and " },
                { chord: "G/D", lyrics: "I shall be ", isBridge: true },
                { chord: "D7", lyrics: "whiter than " },
                { chord: "G", lyrics: "snow." },
              ],
            ],
          },
        ],
      },
    ],
  },

  // 33. There Is Power in the Blood
  {
    id: "hymn-33",
    slug: "there-is-power-in-the-blood",
    title: "There Is Power in the Blood",
    artist: "Lewis E. Jones (1899)",
    genre: "Hymn Klasik",
    key: "G",
    bpm: 110,
    timeSignature: "4/4",
    durationSec: 195,
    difficulty: "Pemula",
    instruments: ["guitar", "bass", "piano"],
    source: "Public Domain Hymnal",
    rightsStatus: "Public Domain",
    coverGradient: "from-zinc-800 to-zinc-950",
    description:
      "Hymn penuh semangat tentang kuasa penebusan dalam G Mayor. Mode Pemula menggunakan 3 chord dasar (G-C-D), dan Mode Mahir menambahkan jembatan G7/B, C, Am7, Em7, dan G/D.",
    strummingPattern: "D - D U D U (4/4 Semangat)",
    arrangements: [
      {
        id: "arr-33-pemula",
        songId: "hymn-33",
        instrument: "guitar",
        arrangementName: "Pemula — Chord Utama Dasar",
        difficulty: "Pemula",
        tuning: "Standar",
        notesSummary: "Menggunakan 3 chord dasar G, C, dan D.",
        sections: [
          {
            id: "h33-p-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Would you be free from the " },
                { chord: "C", lyrics: "burden of " },
                { chord: "G", lyrics: "sin?" },
              ],
              [
                { chord: "D", lyrics: "There's pow'r in the blood, " },
                { chord: "G", lyrics: "pow'r in the blood;" },
              ],
              [
                { chord: "G", lyrics: "Would you o'er evil a " },
                { chord: "C", lyrics: "victory " },
                { chord: "G", lyrics: "win?" },
              ],
              [
                { chord: "G", lyrics: "There's wonderful " },
                { chord: "D", lyrics: "power in the " },
                { chord: "G", lyrics: "blood." },
              ],
            ],
          },
          {
            id: "h33-p-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "There is pow'r, pow'r, " },
                { chord: "C", lyrics: "wonder-working " },
                { chord: "G", lyrics: "pow'r" },
              ],
              [
                { chord: "D", lyrics: "In the blood of the " },
                { chord: "G", lyrics: "Lamb;" },
              ],
              [
                { chord: "G", lyrics: "There is pow'r, pow'r, " },
                { chord: "C", lyrics: "wonder-working " },
                { chord: "G", lyrics: "pow'r" },
              ],
              [
                { chord: "G", lyrics: "In the precious " },
                { chord: "D", lyrics: "blood of the " },
                { chord: "G", lyrics: "Lamb." },
              ],
            ],
          },
        ],
      },
      {
        id: "arr-33-mahir",
        songId: "hymn-33",
        instrument: "piano",
        arrangementName: "Mahir — Voicing Detail & Jembatan Chord",
        difficulty: "Mahir",
        tuning: "Standar",
        notesSummary:
          "Jembatan G -> G7/B -> C -> Am7 -> G, D/F# -> Em7 -> A7 -> D7, dan G/D -> D7 -> G.",
        sections: [
          {
            id: "h33-m-v1",
            name: "Verse 1",
            lines: [
              [
                { chord: "G", lyrics: "Would you be free " },
                { chord: "G7/B", lyrics: "from the ", isBridge: true },
                { chord: "C", lyrics: "burden of " },
                { chord: "G", lyrics: "sin? " },
                { chord: "D/F#", lyrics: " ", isBridge: true },
              ],
              [
                { chord: "Em7", lyrics: "There's pow'r in the ", isBridge: true },
                { chord: "D7", lyrics: "blood, pow'r in the " },
                { chord: "G", lyrics: "blood;" },
              ],
              [
                { chord: "G", lyrics: "Would you o'er evil " },
                { chord: "G7", lyrics: "a ", isBridge: true },
                { chord: "C", lyrics: "victory " },
                { chord: "Am7", lyrics: "win? ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "There's wonderful ", isBridge: true },
                { chord: "D7", lyrics: "power in the " },
                { chord: "G", lyrics: "blood." },
              ],
            ],
          },
          {
            id: "h33-m-ch",
            name: "Refrain / Chorus",
            lines: [
              [
                { chord: "G", lyrics: "There is pow'r, " },
                { chord: "G7/B", lyrics: "pow'r, ", isBridge: true },
                { chord: "C", lyrics: "wonder-working " },
                { chord: "G", lyrics: "pow'r" },
              ],
              [
                { chord: "Em7", lyrics: "In the blood ", isBridge: true },
                { chord: "A7", lyrics: "of the ", isBridge: true },
                { chord: "Dsus4", lyrics: "Lamb; ", isBridge: true },
                { chord: "D7", lyrics: " " },
              ],
              [
                { chord: "G", lyrics: "There is pow'r, " },
                { chord: "G7", lyrics: "pow'r, ", isBridge: true },
                { chord: "C", lyrics: "wonder-working " },
                { chord: "Am7", lyrics: "pow'r ", isBridge: true },
              ],
              [
                { chord: "G/D", lyrics: "In the precious ", isBridge: true },
                { chord: "D7", lyrics: "blood of the " },
                { chord: "C/G", lyrics: " ", isBridge: true },
                { chord: "G", lyrics: "Lamb." },
              ],
            ],
          },
        ],
      },
    ],
  },
];
