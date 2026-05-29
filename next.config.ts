import type { NextConfig } from "next";

/**
 * RFC 8288 Link headers — advertise agent-discovery endpoints.
 * Applied to every page response so crawlers & AI agents can
 * auto-discover the API catalog, OAuth config, MCP server card, etc.
 */
const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/openid-configuration>; rel="openid-configuration"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</auth.md>; rel="auth-instructions"',
  '</docs>; rel="service-doc"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: AGENT_LINK_HEADER,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
