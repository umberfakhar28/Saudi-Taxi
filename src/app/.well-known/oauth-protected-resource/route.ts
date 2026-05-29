import { NextResponse } from "next/server";

const BASE_URL = "https://gulftripservice.com";

export async function GET() {
  const metadata = {
    resource: BASE_URL,
    authorization_servers: [`${BASE_URL}/.well-known/oauth-authorization-server`],
    scopes_supported: ["booking:read", "booking:write", "quote:read"],
    bearer_methods_supported: ["header", "body"],
    resource_documentation: `${BASE_URL}/docs/api`,
    resource_signing_alg_values_supported: ["RS256"],
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
