import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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

export async function proxy(request: NextRequest) {
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

  // Refresh session — wrapped in try/catch so a paused/unreachable
  // Supabase project never crashes public pages.
  let user: { id?: string; email?: string } | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase unavailable (e.g. project paused).
    // Allow public routes through; send admin routes to login.
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextUrl.pathname !== "/admin/login"
    ) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Compare case-insensitively: Supabase stores account emails lowercased,
    // so an ADMIN_EMAIL entered with capitals would never match.
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const userEmail = user?.email?.trim().toLowerCase();

    // The ADMIN_EMAIL account is the owner: always a full admin, never
    // dependent on a database row. That is what makes it impossible to lock
    // the business out of its own portal, and it is why the portal keeps
    // working unchanged if supabase/sql/002 has not been run yet.
    const isOwner = !!adminEmail && !!userEmail && userEmail === adminEmail;

    // Anyone else needs an active row in admin_users. The query runs as the
    // visitor's own session, and the table's RLS policy only returns rows to
    // sessions that already hold a role — so a non-member simply sees
    // nothing, which is exactly the answer we want.
    let isPortalUser = isOwner;
    if (user?.id && !isOwner) {
      try {
        const { data: membership } = await supabase
          .from("admin_users")
          .select("is_active")
          .eq("id", user.id as string)
          .maybeSingle();
        isPortalUser = !!membership && membership.is_active !== false;
      } catch {
        // Table absent (migration pending) or unreachable — fall back to the
        // previous single-admin rule rather than letting anyone through.
        isPortalUser = false;
      }
    }

    // Exclude the login page itself to avoid redirect loops
    if (request.nextUrl.pathname === "/admin/login") {
      if (isPortalUser) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return response;
    }

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (!isPortalUser) {
      if (!adminEmail) {
        // Server misconfiguration rather than an unauthorised visitor: with
        // ADMIN_EMAIL unset the owner cannot be identified, so a legitimate
        // admin signs in successfully and is then bounced with no
        // explanation. Fail loudly instead of silently dropping them on the
        // homepage.
        console.error(
          "[ADMIN_AUTH] ADMIN_EMAIL is not set in this environment — the owner account cannot be identified. " +
            "Set ADMIN_EMAIL to the admin's Supabase account email and redeploy."
        );
        return NextResponse.redirect(
          new URL("/admin/login?error=config", request.url)
        );
      }

      // Signed in, but not a portal user. Return them to the login screen
      // with a reason: bouncing to the homepage is indistinguishable from a
      // failed sign-in and leaves nothing to diagnose.
      return NextResponse.redirect(
        new URL("/admin/login?error=unauthorized", request.url)
      );
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
      return mdResponse;
    } catch {
      // Fall through to normal response if markdown conversion fails
    }
  }

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

