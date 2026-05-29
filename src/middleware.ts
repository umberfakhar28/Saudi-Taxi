import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────
   RFC 8288 Link header — advertise all agent-discovery well-known endpoints
   ───────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────
   Lightweight HTML → Markdown converter for content negotiation.
   Strips tags, converts headings/links/lists to Markdown syntax.
   ───────────────────────────────────────────────────────────────────────── */
function htmlToMarkdown(html: string): string {
  return html
    // Remove <head> block entirely
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    // Remove script/style blocks
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Convert headings
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n")
    // Convert links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    // Convert bold/italic
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    // Convert list items
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    // Convert paragraphs and line breaks
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
    // Strip remaining tags
    .replace(/<[^>]+>/g, "")
    // Decode common HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    // Collapse excessive blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh the session if it's expired
  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Exclude the login page itself to avoid redirect loops
    if (request.nextUrl.pathname === "/admin/login") {
      if (user && user.email === process.env.ADMIN_EMAIL) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return response;
    }

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Check for specific admin email from .env.local
    if (user.email !== process.env.ADMIN_EMAIL) {
      // Not an admin, redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  /* ───────────────────────────────────────────────────────────────────────
     Markdown for Agents (content negotiation)
     When a request includes Accept: text/markdown, fetch the HTML version
     of the same page and convert it to Markdown before returning.
     ─────────────────────────────────────────────────────────────────────── */
  const acceptHeader = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    acceptHeader.includes("text/markdown") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/.well-known");

  if (wantsMarkdown) {
    try {
      // Fetch HTML of the same URL without the markdown Accept header
      const htmlRes = await fetch(request.url, {
        headers: { accept: "text/html" },
      });
      const html = await htmlRes.text();
      const markdown = htmlToMarkdown(html);
      const mdResponse = new NextResponse(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "X-Markdown-Tokens": String(markdown.split(/\s+/).length),
          "Vary": "Accept",
        },
      });
      // Still add Link headers
      mdResponse.headers.set("Link", AGENT_LINK_HEADER);
      return mdResponse;
    } catch {
      // Fall through to normal response if markdown conversion fails
    }
  }

  /* ───────────────────────────────────────────────────────────────────────
     RFC 8288 — Add Link headers to every response
     ─────────────────────────────────────────────────────────────────────── */
  response.headers.set("Link", AGENT_LINK_HEADER);

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml / robots.txt (SEO crawlers must always access these)
     * - public image files
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

