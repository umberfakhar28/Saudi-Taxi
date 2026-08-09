<?xml version="1.0" encoding="UTF-8"?>
<!--
  Presentation layer only — transforms sitemap.xml into a readable HTML
  page when a human opens it directly in a browser (Chrome/Firefox/Edge
  otherwise render raw XML through their own generic collapsible tree
  viewer, which re-indents everything itself regardless of the source
  file's whitespace — that's why formatting the XML source has no visible
  effect in a browser). Search engines fetch and parse the underlying
  <urlset> XML exactly the same either way; they don't apply this
  stylesheet. XSLT 1.0 only — that's what browsers support natively.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap — Gulf Trip Service</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <style>
          :root {
            --navy: #050C33;
            --accent: #0C207A;
            --accent-hover: #16309B;
            --brass: #C8952F;
            --text-primary: #101425;
            --text-muted: #5C6579;
            --surface: #FFFFFF;
            --border: rgba(16,18,26,0.08);
            --bg-subtle: #F6F7FA;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: var(--text-primary);
            background: var(--bg-subtle);
          }
          header {
            background: linear-gradient(135deg, var(--navy), var(--accent));
            color: #fff;
            padding: 2rem 2rem 1.5rem;
          }
          header h1 {
            margin: 0 0 .35rem;
            font-size: 1.5rem;
          }
          header p {
            margin: 0;
            color: rgba(255,255,255,0.75);
            font-size: .9rem;
          }
          header .count {
            display: inline-block;
            margin-top: .75rem;
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 999px;
            padding: .3rem .9rem;
            font-size: .8rem;
            font-weight: 600;
          }
          .brass-rule {
            height: 3px;
            background: linear-gradient(90deg, var(--brass), transparent);
          }
          main {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--surface);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(16,18,26,0.06);
          }
          thead th {
            text-align: left;
            font-size: .72rem;
            text-transform: uppercase;
            letter-spacing: .05em;
            color: var(--text-muted);
            background: var(--bg-subtle);
            padding: .75rem 1rem;
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
          }
          tbody td {
            padding: .65rem 1rem;
            border-bottom: 1px solid var(--border);
            font-size: .86rem;
            vertical-align: top;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover { background: var(--bg-subtle); }
          td.loc a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
            word-break: break-word;
          }
          td.loc a:hover { color: var(--accent-hover); text-decoration: underline; }
          td.loc .alt {
            display: block;
            margin-top: .2rem;
            font-size: .72rem;
            color: var(--text-muted);
          }
          td.loc .alt a { color: var(--text-muted); font-weight: 400; }
          td.priority {
            font-variant-numeric: tabular-nums;
            font-weight: 600;
          }
          td.freq { text-transform: capitalize; color: var(--text-muted); }
          td.lastmod { color: var(--text-muted); white-space: nowrap; }
          footer {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1rem 1.5rem 2.5rem;
            color: var(--text-muted);
            font-size: .78rem;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>XML Sitemap</h1>
          <p>gulftripservice.com — machine-readable index for search engines; this styled view is for humans checking it.</p>
          <span class="count">
            <xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> URLs
          </span>
        </header>
        <div class="brass-rule"></div>
        <main>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Freq.</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending" data-type="number" />
                <tr>
                  <td class="loc">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                    <xsl:for-each select="xhtml:link">
                      <span class="alt">
                        <xsl:value-of select="@hreflang" /><xsl:text>: </xsl:text>
                        <a href="{@href}"><xsl:value-of select="@href" /></a>
                      </span>
                    </xsl:for-each>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)" />
                  </td>
                  <td class="freq">
                    <xsl:value-of select="sitemap:changefreq" />
                  </td>
                  <td class="priority">
                    <xsl:value-of select="sitemap:priority" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
        <footer>
          Generated automatically at build time from the site's route data — see src/lib/sitemapData.ts.
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
