import { personalInfo } from "@/data/portfolio";

/**
 * Sends a notification email to the site owner through Resend's REST API.
 *
 * Plain fetch instead of an SDK keeps the dependency list unchanged. Callers
 * must `await` this: on serverless hosts the function is frozen as soon as the
 * response is returned, so a fire-and-forget send is silently dropped.
 *
 * Returns { ok: true } on success, or { ok: false, reason } — it never throws,
 * so a mail outage cannot turn an already-stored submission into an error page.
 */
export const sendOwnerEmail = async ({ subject, text, replyTo }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[notify] RESEND_API_KEY is not set — email was not sent.");
    return { ok: false, reason: "not-configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL || personalInfo.email;
  // onboarding@resend.dev works without a verified domain, but Resend only
  // delivers it to the address the Resend account was created with.
  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[notify] Resend rejected the email (${response.status}): ${detail}`);
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[notify] Resend request failed:", error.message);
    return { ok: false, reason: "network" };
  }
};
