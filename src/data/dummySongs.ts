import { Song } from "@/types/music";
import { HYMNS_PART_1 } from "./hymnsPart1";
import { HYMNS_PART_2 } from "./hymnsPart2";
import { WORSHIP_SONGS, PRAISE_SONGS } from "./worshipPraiseSongs";
import {
  INDONESIAN_WORSHIP_SONGS,
  INDONESIAN_PRAISE_SONGS,
  INDONESIAN_HYMN_SONGS,
} from "./indonesianWorshipPraiseSongs";

export const DUMMY_SONGS: Song[] = [
  ...HYMNS_PART_1,
  ...HYMNS_PART_2,
  ...WORSHIP_SONGS,
  ...PRAISE_SONGS,
  ...INDONESIAN_WORSHIP_SONGS,
  ...INDONESIAN_PRAISE_SONGS,
  ...INDONESIAN_HYMN_SONGS,
];
