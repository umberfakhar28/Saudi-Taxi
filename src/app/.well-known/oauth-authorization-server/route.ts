import { NextResponse } from "next/server";

const ISSUER = "https://gulftripservice.com";

export async function GET() {
  const metadata = {
    issuer: ISSUER,
    authorization_endpoint: `${ISSUER}/api/auth/authorize`,
    token_endpoint: `${ISSUER}/api/auth/token`,
    jwks_uri: `${ISSUER}/.well-known/jwks.json`,
    registration_endpoint: `${ISSUER}/api/auth/register`,
    scopes_supported: ["openid", "profile", "email", "booking:read", "booking:write", "quote:read"],
    response_types_supported: ["code", "token"],
    grant_types_supported: ["authorization_code", "client_credentials", "refresh_token"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
    service_documentation: `${ISSUER}/docs/api`,
    // auth.md agent_auth block
    agent_auth: {
      register_uri: `${ISSUER}/api/auth/register`,
      supported_identity_types: ["api_key", "oauth2"],
      credential_types: ["Bearer"],
      claim_uri: `${ISSUER}/api/auth/claims`,
      revocation_uri: `${ISSUER}/api/auth/revoke`,
      auth_md_uri: `${ISSUER}/auth.md`,
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
