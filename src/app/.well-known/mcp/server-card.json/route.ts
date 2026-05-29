import { NextResponse } from "next/server";

const BASE_URL = "https://gulftripservice.com";

export async function GET() {
  const serverCard = {
    $schema: "https://modelcontextprotocol.io/schemas/server-card/v1",
    serverInfo: {
      name: "Gulf Trip Service MCP",
      version: "1.0.0",
      description: "MCP server exposing taxi booking and trip services in Saudi Arabia",
      homepage: BASE_URL,
      contact: `${BASE_URL}/contact-us`,
    },
    transport: {
      type: "http",
      endpoint: `${BASE_URL}/api/mcp`,
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
    },
    tools: [
      {
        name: "get_quote",
        description: "Get a taxi fare quote for a route in Saudi Arabia",
        inputSchema: {
          type: "object",
          properties: {
            from: { type: "string", description: "Pickup location" },
            to: { type: "string", description: "Drop-off location" },
            passengers: { type: "number", description: "Number of passengers" },
          },
          required: ["from", "to"],
        },
      },
      {
        name: "book_taxi",
        description: "Book a taxi service",
        inputSchema: {
          type: "object",
          properties: {
            from: { type: "string", description: "Pickup location" },
            to: { type: "string", description: "Drop-off location" },
            date: { type: "string", format: "date-time", description: "Pickup datetime (ISO 8601)" },
            passengers: { type: "number", description: "Number of passengers" },
            name: { type: "string", description: "Passenger name" },
            phone: { type: "string", description: "Contact phone number" },
          },
          required: ["from", "to", "date", "name", "phone"],
        },
      },
    ],
    authentication: {
      type: "none",
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
