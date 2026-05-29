import { NextResponse } from "next/server";

const BASE_URL = "https://gulftripservice.com";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${BASE_URL}/api`,
        "service-desc": [
          {
            href: `${BASE_URL}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: `${BASE_URL}/docs`,
            type: "text/html",
          },
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: "application/json",
          },
        ],
      },
      {
        anchor: `${BASE_URL}/api/quote`,
        "service-doc": [
          {
            href: `${BASE_URL}/quote`,
            type: "text/html",
          },
        ],
      },
      {
        anchor: `${BASE_URL}/api/booking`,
        "service-doc": [
          {
            href: `${BASE_URL}/book-online`,
            type: "text/html",
          },
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
