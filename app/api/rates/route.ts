import { NextResponse } from "next/server";
import { fetchLiveForexRates } from "@/lib/forex";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await fetchLiveForexRates();
  return NextResponse.json(data);
}
