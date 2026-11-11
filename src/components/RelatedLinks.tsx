import Link from "next/link";

export default function RelatedLinks({
    title,
    links,
    eyebrow = "Explore More",
}: {
    title: string;
    links: { href: string; label: string }[];
    /** Defaults to English; Arabic pages pass their own. */
    eyebrow?: string;
}) {
    return (
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
                <div className="section-header centered">
                    <span className="section-eyebrow">{eyebrow}</span>
                    <h2 className="section-title">{title}</h2>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center" }}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="btn btn-outline-gold"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
