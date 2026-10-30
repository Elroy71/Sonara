import { NextRequest, NextResponse } from "next/server";
import { DUMMY_SONGS } from "@/data/dummySongs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const instrument = searchParams.get("instrument") || "all";
  const difficulty = searchParams.get("difficulty") || "all";

  const filtered = DUMMY_SONGS.filter((song) => {
    const matchesQuery =
      !query ||
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query);

    const matchesInstrument =
      instrument === "all" || song.instruments.includes(instrument as any);

    const matchesDifficulty =
      difficulty === "all" || song.difficulty === difficulty;

    return matchesQuery && matchesInstrument && matchesDifficulty;
  });

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
  });
}
