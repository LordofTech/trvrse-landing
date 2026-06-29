import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isValidEmail } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rateCheck.retryAfter}s.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "NG";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = getSupabase();

    if (!supabase) {
      return NextResponse.json(
        {
          success: true,
          message: "Email received (Supabase not configured — add env vars for persistence).",
        },
        { status: 200 }
      );
    }

    const { error } = await supabase.from("waitlist").insert({
      email,
      country,
      created_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "You're on the list!" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
