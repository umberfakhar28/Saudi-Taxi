import { NextResponse } from "next/server";

const BASE_URL = "https://gulftripservice.com";

export async function GET() {
  const index = {
    $schema: "https://agentskills.io/schemas/index/v0.2.0",
    skills: [
      {
        name: "link-headers",
        type: "link-headers",
        description: "RFC 8288 Link response headers for agent discovery",
        url: `${BASE_URL}/.well-known/agent-skills/link-headers/SKILL.md`,
        digest: {
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
      {
        name: "api-catalog",
        type: "api-catalog",
        description: "RFC 9727 API catalog for automated API discovery",
        url: `${BASE_URL}/.well-known/api-catalog`,
        digest: {
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
      {
        name: "oauth-discovery",
        type: "oauth-discovery",
        description: "OAuth/OIDC discovery metadata for agent authentication",
        url: `${BASE_URL}/.well-known/openid-configuration`,
        digest: {
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
      {
        name: "mcp-server-card",
        type: "mcp-server-card",
        description: "MCP Server Card for agent tool discovery",
        url: `${BASE_URL}/.well-known/mcp/server-card.json`,
        digest: {
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
      {
        name: "markdown-negotiation",
        type: "markdown-negotiation",
        description: "Content negotiation support for text/markdown responses",
        url: `${BASE_URL}/`,
        digest: {
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
    ],
  };

  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
