import { NextRequest, NextResponse } from "next/server";
import { DUMMY_SONGS } from "@/data/dummySongs";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const song = DUMMY_SONGS.find((s) => s.id === id || s.slug === id);

  if (!song) {
    return NextResponse.json(
      { error: "Lagu tidak ditemukan dalam katalog." },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: song });
}
