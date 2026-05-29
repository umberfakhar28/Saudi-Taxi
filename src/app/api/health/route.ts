import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "Gulf Trip Service",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
}
