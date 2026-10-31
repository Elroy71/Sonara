import { NextResponse } from "next/server";
import { COURSES_DATA, CourseInstrumentId } from "@/data/coursesData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instrument = searchParams.get("instrument") as CourseInstrumentId | null;
  const meeting = searchParams.get("meeting");

  if (instrument) {
    const course = COURSES_DATA.find((c) => c.id === instrument);
    if (!course) {
      return NextResponse.json(
        { error: `Kursus untuk instrumen '${instrument}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    if (meeting) {
      const mNum = Number(meeting);
      const foundMeeting = course.meetings.find((m) => m.meetingNumber === mNum);
      if (!foundMeeting) {
        return NextResponse.json(
          { error: `Pertemuan ${meeting} tidak ditemukan.` },
          { status: 404 }
        );
      }
      return NextResponse.json({
        instrument: course.id,
        instrumentName: course.name,
        meeting: foundMeeting,
        metronomeConfig: {
          bpm: foundMeeting.targetBpm,
          timeSignature: foundMeeting.timeSignature,
          recommendedMinutes: foundMeeting.practiceMinutes,
        },
      });
    }

    return NextResponse.json({
      course,
    });
  }

  return NextResponse.json({
    totalInstruments: COURSES_DATA.length,
    courses: COURSES_DATA,
  });
}
