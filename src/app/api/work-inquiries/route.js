import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/server";
import { validateInquiry } from "@/lib/workInquiry";
import { sendOwnerEmail } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "work_inquiries";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Re-validated here: the client checks are for feedback speed, not trust.
  const errors = validateInquiry(payload);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { error: "Some fields need attention.", fieldErrors: errors },
      { status: 422 }
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    // Missing configuration is an operator problem, not a visitor's, so it is
    // logged loudly here and reported to the visitor as a temporary failure
    // with a working fallback.
    console.error(
      `[${TABLE}] SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set — submission was not stored.`
    );
    return NextResponse.json(
      { error: "The form is not accepting submissions right now." },
      { status: 503 }
    );
  }

  const email = payload.email.trim().toLowerCase();
  const description = payload.description.trim();

  const { error } = await supabase.from(TABLE).insert({
    project_type: payload.projectType,
    budget_range: payload.budgetRange,
    timeline: payload.timeline,
    description,
    email,
  });

  if (error) {
    console.error(`[${TABLE}] insert failed:`, error.message);
    return NextResponse.json(
      { error: "Something went wrong saving your message." },
      { status: 500 }
    );
  }

  // The enquiry is already stored, so a failed notification is logged inside
  // sendOwnerEmail and does not fail the visitor's submission.
  await sendOwnerEmail({
    subject: `New work inquiry: ${payload.projectType}`,
    replyTo: email,
    text: [
      `Project type: ${payload.projectType}`,
      `Budget: ${payload.budgetRange}`,
      `Timeline: ${payload.timeline}`,
      `Email: ${email}`,
      "",
      description,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
