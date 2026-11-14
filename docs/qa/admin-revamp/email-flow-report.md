# Why customer replies never reach the owner (item 20)

*Diagnosis only. No DNS, MX, Resend or code setting was changed. Checked 14 Nov 2026.*

## Answer in short

Replies **are not bouncing and are not lost**. They are being **received and stored by Resend**, and nothing passes them on.

- The domain's mail (MX) record points at Resend's inbound mail servers, so every reply to `info@` (and to `booking@`) is accepted.
- No forwarding rule or webhook exists, so each reply stays in Resend's **Receiving** inbox, which nobody opens.
- That inbox currently holds **at least 20 received emails, the oldest from 27 Oct 2026**. The API returned 20 and said more exist. They were addressed to `info@` and `booking@`.

**Do this first, whatever you decide:** open the Resend dashboard → **Emails → Receiving**. Read and answer those customers; some of them are probably waiting on a reply.

---

## 1. Current flow

| | Value | Where it's set |
|---|---|---|
| Provider | Resend (API), region ap-northeast-1 (Tokyo) | `RESEND_API_KEY` |
| From | `Gulf Trip Service <info@gulftripservice.com>` | `RESEND_FROM_EMAIL` env var |
| Reply-To | `info@gulftripservice.com` (every email) | `src/lib/emailSender.ts` → `REPLY_TO_ADDRESS` = `EMAIL` in `src/lib/contact.ts` |
| Bounce / return path | `send.gulftripservice.com` (Resend's custom MAIL FROM) | DNS |
| Admin copies go to | `ADMIN_EMAIL` env var (the owner's Gmail) | env |

So when a customer presses Reply, the reply goes to `info@gulftripservice.com`. Whatever receives mail for that address therefore decides what happens to it.

## 2. DNS (public lookups via 8.8.8.8; DNS is hosted on Cloudflare)

| Record | Value | Meaning |
|---|---|---|
| `gulftripservice.com` **MX** | `10 inbound-smtp.ap-northeast-1.amazonaws.com` | Incoming mail for the whole domain goes to **Resend Receiving** (Amazon SES inbound, Resend's region) |
| `gulftripservice.com` TXT (SPF) | none; only a `google-site-verification` record | No SPF at the root. This is fine for now: nothing sends from the root envelope |
| `send.gulftripservice.com` MX | `10 feedback-smtp.ap-northeast-1.amazonses.com` | Resend's bounce handling |
| `send.gulftripservice.com` TXT | `v=spf1 include:amazonses.com ~all` | SPF for Resend's sending, correct |
| `resend._domainkey` TXT | `p=MIGfMA0…` (RSA key) | DKIM for Resend, correct |
| `_dmarc` TXT | **none** | **No DMARC policy.** Gmail and Yahoo expect one from bulk senders, and it protects the domain from spoofing |

## 3. Is Resend inbound / forwarding configured?

- **Inbound: yes.** The MX record above routes the domain's mail to Resend, and Resend accepts it. A read-only API query (`GET /emails/receiving`) returned 20 received emails with `has_more: true`, dated 27 Oct – 14 Nov 2026, addressed to `info@` and `booking@`. Only counts and dates were read, not senders or contents.
- **Forwarding: no.** Resend does not forward received mail on its own. It stores it and can call a **webhook** (`email.received`) for your code to handle. The site has no such webhook route, and no forwarding rule exists.

## 4. Test send and reply

I didn't run this. It needs a real inbox to reply from and access to the Resend dashboard to watch the reply arrive, and the safety rules forbid emailing real customers. The DNS and API evidence above already explains the behaviour fully. To confirm it yourself in two minutes:

1. From the admin panel, email any quote to your own personal address.
2. Reply to it from that inbox.
3. **Expected now:** nothing arrives anywhere you read mail, and the reply appears in **Resend → Emails → Receiving** within a minute. The full headers are shown there.

## 5. Root cause

`info@gulftripservice.com` has no mailbox. Mail for the domain is received by Resend's inbound service (the MX record), which has no forwarding or webhook configured, so replies pile up unread in Resend. Reply-To is set correctly; the address it points to just isn't read anywhere.

---

## Options

### Option A: Reply-To = your personal Gmail (quick fix)
- **Change:** one line, setting `REPLY_TO_ADDRESS` in `src/lib/emailSender.ts` to your Gmail, or making it an env var.
- **Pros:** live in minutes with no DNS change, and replies land straight in Gmail.
- **Cons:**
  - Your personal address is shown to every customer.
  - Customers who write to `info@` directly (rather than replying) are still lost.
  - The 20+ stuck emails still need rescuing by hand.
  - Your answers go out from your personal Gmail, not from `info@`.

### Option B: keep Resend inbound and forward through a webhook
- **Setup:**
  1. Resend dashboard → Webhooks → add `https://gulftripservice.com/api/emails/inbound` for the `email.received` event.
  2. A small new route verifies the webhook signature, fetches the received email, and re-sends it to your Gmail. It sets Reply-To to the customer and puts the original sender in the subject.
- **DNS:** none; the MX record stays as it is.
- **Pros:**
  - Nothing new to pay for.
  - Both `info@` and `booking@` are covered, along with anything else @gulftripservice.com.
  - The code lives in this project.
- **Cons / limits:**
  - It's a forward, not a mailbox. When you reply from Gmail, the customer sees your personal address unless you set up Gmail's "Send mail as info@" through Resend SMTP, which is extra setup.
  - It counts against your Resend plan's sending and receiving quotas; check your plan.
  - Large attachments make the forward bigger.
  - If the webhook fails, mail waits in Resend; it isn't lost.

### Option C: Google Workspace mailbox, keeping Resend for sending
- **What you get:** `info@gulftripservice.com` becomes a real Gmail inbox. `booking@` is a free alias on the same user. You read and reply from Gmail as `info@`. The website keeps sending through Resend, unchanged.
- **Cost:** Google Workspace Business Starter is about **US$7 per user per month** on an annual plan, or about $8.40 month-to-month (2025 list prices; check the current price for your country at sign-up). One user is enough; aliases are free.
- **Steps:**
  1. Sign up for Workspace with gulftripservice.com and verify the domain. The existing `google-site-verification` record may already cover this.
  2. In Workspace, create user `info@` and add alias `booking@`.
  3. Before switching: rescue the stuck emails from Resend → Receiving, since mail arriving after the switch won't go there.
  4. In Cloudflare DNS, change the records as in the table below.
  5. In the Workspace Admin console → Apps → Gmail → **Authenticate email**, generate the DKIM key, add it to DNS, then press **Start authentication**.
  6. Send a test email to `info@` from an outside address, and reply to an email from the site, to confirm both arrive in Workspace.
- **Risks:**
  - **Downtime:** a few minutes. Cloudflare TTLs are short, and senders retry for days, so nothing should bounce during the switch.
  - **Existing mail:** emails still in Resend's Receiving inbox don't move automatically. Answer or export them first.
  - **Sending from the site:** unaffected. Resend's SPF lives on `send.` and its DKIM on `resend._domainkey`, and neither changes.
  - **Resend Receiving stops** once the MX record moves. Nothing in the code depends on it.
- **How replies land:** customer replies to `info@` go into the Workspace Gmail inbox. You read them in Gmail on the web or the phone app, and can add the account alongside your personal one, and answer as `info@`.

---

## Recommendation: Option C (Google Workspace)

| | A: Reply-To Gmail | B: Resend webhook | **C: Workspace** |
|---|---|---|---|
| Replies reach you | yes | yes | **yes** |
| Direct mail to info@ / booking@ | lost | forwarded | **real inbox** |
| You answer as info@ | no | not without extra setup | **yes** |
| Personal address kept private | no | partly | **yes** |
| Monthly cost | 0 | 0 (within Resend plan) | ~US$7 |
| DNS change | none | none | MX + SPF + DKIM + DMARC |
| Code change | 1 line | new route | none |

C is the only option that gives the business a mailbox it can answer as itself, for about the price of one trip's tip each month. If you'd rather not pay, B is the right free choice; say so and I'll build the webhook route. A is only a stop-gap.

**Whatever you choose, add a DMARC record.** It's free and doesn't depend on the mailbox decision.

### Exact DNS changes for Option C (Cloudflare → gulftripservice.com → DNS)

| Action | Type | Name | Content | Priority / notes |
|---|---|---|---|---|
| **Delete** | MX | `@` | `inbound-smtp.ap-northeast-1.amazonaws.com` | ends Resend Receiving |
| **Add** | MX | `@` | `smtp.google.com` | priority **1** (Google's current single-MX setup) |
| **Add** | TXT | `@` | `v=spf1 include:_spf.google.com ~all` | SPF for Gmail sending as info@ |
| **Add** | TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=…` | value generated in Workspace Admin → Gmail → Authenticate email |
| **Add** | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@gulftripservice.com; adkim=r; aspf=r` | after 2–4 clean weeks, change `p=none` to `p=quarantine` |
| Keep | TXT | `resend._domainkey` | (unchanged) | Resend DKIM, so site emails keep passing |
| Keep | MX + TXT | `send` | (unchanged) | Resend bounce handling + SPF |
| Keep | TXT | `@` | `google-site-verification=…` | unchanged |

**Why no combined SPF is needed:** Resend sends with its own envelope domain, `send.gulftripservice.com`, which has its own SPF record. The root SPF therefore only needs to cover Google. DMARC passes for the site's emails through Resend's DKIM, which signs as `gulftripservice.com`.
