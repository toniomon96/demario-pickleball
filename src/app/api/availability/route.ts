import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  const [bookingsResult, blockedResult] = await Promise.all([
    supabase
      .from("bookings")
      .select("lesson_time")
      .eq("lesson_date", date)
      .neq("status", "cancelled"),
    supabase
      .from("blocked_slots")
      .select("time")
      .eq("date", date),
  ]);

  const booked = new Set<string>();
  bookingsResult.data?.forEach((b) => booked.add(b.lesson_time));
  blockedResult.data?.forEach((b) => booked.add(b.time));

  return NextResponse.json({ booked: Array.from(booked) });
}
