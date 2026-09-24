/**
 * Trustpilot review invitations.
 *
 * Two paths, both triggered when a booking is marked completed:
 *
 *  1. The completion email carries a "Leave a review" button pointing at
 *     REVIEW_URL, and the admin's WhatsApp composer offers the same link.
 *  2. That email is blind-copied to the business's unique Trustpilot invite
 *     address, so Trustpilot sends its own invitation to the customer
 *     (Trustpilot's Automatic Feedback Service reads the To: recipient).
 *
 * The invite address lives in TRUSTPILOT_BCC_EMAIL rather than in the code:
 * anyone holding it can make Trustpilot send invitations on this business's
 * behalf, and this repository is on GitHub. With the variable unset, emails
 * still send — only the blind copy is skipped.
 */

/** The public page customers land on to leave a review. */
export const TRUSTPILOT_REVIEW_URL = 'https://www.trustpilot.com/review/gulftripservice.com';

/**
 * Where the homepage's Trustpilot badge points (SocialProof.tsx). It was a
 * "#" placeholder until the profile existed; it is the same public profile
 * page customers review on, so there is one URL rather than two to keep in
 * step. The badge still makes no rating or review-count claim.
 */
export const TRUSTPILOT_URL = TRUSTPILOT_REVIEW_URL;

/**
 * The BCC address, or null when it is unset or not a Trustpilot invite
 * address — a typo here would blind-copy every completion email to a
 * stranger, so the domain is checked rather than trusted.
 */
export function trustpilotBcc(): string | null {
    const value = process.env.TRUSTPILOT_BCC_EMAIL?.trim();
    if (!value) return null;
    if (!/^[^\s@]+@invite\.trustpilot\.com$/i.test(value)) {
        console.warn('[TRUSTPILOT] TRUSTPILOT_BCC_EMAIL is not an @invite.trustpilot.com address — skipping the blind copy.');
        return null;
    }
    return value;
}

/** "gulf…88b2@invite.trustpilot.com" — enough to recognise, not enough to reuse. */
export function maskedTrustpilotBcc(): string | null {
    const value = trustpilotBcc();
    if (!value) return null;
    const [local, domain] = value.split('@');
    const head = local.slice(0, 4);
    const tail = local.slice(-4);
    return `${head}…${tail}@${domain}`;
}
