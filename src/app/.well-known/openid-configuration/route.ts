import { NextResponse } from "next/server";

const ISSUER = "https://gulftripservice.com";

export async function GET() {
  const config = {
    issuer: ISSUER,
    authorization_endpoint: `${ISSUER}/api/auth/authorize`,
    token_endpoint: `${ISSUER}/api/auth/token`,
    jwks_uri: `${ISSUER}/.well-known/jwks.json`,
    userinfo_endpoint: `${ISSUER}/api/auth/userinfo`,
    registration_endpoint: `${ISSUER}/api/auth/register`,
    scopes_supported: ["openid", "profile", "email", "booking:read", "booking:write", "quote:read"],
    response_types_supported: ["code", "token"],
    grant_types_supported: ["authorization_code", "client_credentials", "refresh_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "email", "name"],
    service_documentation: `${ISSUER}/docs/api`,
    op_policy_uri: `${ISSUER}/privacy-policy`,
  };

  return NextResponse.json(config, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
