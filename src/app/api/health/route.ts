import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  let dbStatus: "ok" | "error" = "ok";

  try {
    const supabase = createAdminClient();
    // Cheapest possible real query — confirms the DB is reachable and
    // credentials are valid without touching a real business table.
    const { error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).limit(1);
    if (error) dbStatus = "error";
  } catch {
    dbStatus = "error";
  }

  const overallStatus = dbStatus === "ok" ? "ok" : "degraded";

  return NextResponse.json(
    {
      status: overallStatus,
      service: "Gulf Trip Service",
      database: dbStatus,
      timestamp: new Date().toISOString(),
    },
    {
      status: overallStatus === "ok" ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
}
