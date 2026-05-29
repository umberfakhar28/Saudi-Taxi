import { NextResponse } from "next/server";

const BASE_URL = "https://gulftripservice.com";

const AUTH_MD = `# Auth.md — Gulf Trip Service Agent Registration

## Overview

Gulf Trip Service provides taxi and transport services across Saudi Arabia (Makkah, Jeddah, Madinah).
AI agents can register to access booking, quoting, and trip management APIs.

## Agent Registration

To register as an agent, POST to the registration endpoint:

\`\`\`
POST ${BASE_URL}/api/auth/register
Content-Type: application/json

{
  "client_name": "Your Agent Name",
  "client_uri": "https://your-agent.example.com",
  "redirect_uris": ["https://your-agent.example.com/callback"],
  "grant_types": ["client_credentials"],
  "scope": "booking:read booking:write quote:read"
}
\`\`\`

## Supported Identity Types

- **api_key**: Static API key for server-to-server communication
- **oauth2**: OAuth 2.0 with client credentials or authorization code flow

## Credential Types

- **Bearer**: JWT bearer tokens (RFC 6750)

## OAuth Discovery

- Authorization Server: [/.well-known/oauth-authorization-server](${BASE_URL}/.well-known/oauth-authorization-server)
- OIDC Configuration: [/.well-known/openid-configuration](${BASE_URL}/.well-known/openid-configuration)
- Protected Resource: [/.well-known/oauth-protected-resource](${BASE_URL}/.well-known/oauth-protected-resource)

## Available Scopes

| Scope | Description |
|-------|-------------|
| \`quote:read\` | Request taxi fare quotes |
| \`booking:read\` | Read booking information |
| \`booking:write\` | Create and modify bookings |

## Claim URI

${BASE_URL}/api/auth/claims

## Revocation URI

${BASE_URL}/api/auth/revoke

## MCP Server

Agents may also connect via the Model Context Protocol:
- Server Card: [/.well-known/mcp/server-card.json](${BASE_URL}/.well-known/mcp/server-card.json)
- Transport Endpoint: ${BASE_URL}/api/mcp

## Contact

For integration support, contact: [${BASE_URL}/contact-us](${BASE_URL}/contact-us)
`;

export async function GET() {
  return new NextResponse(AUTH_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
