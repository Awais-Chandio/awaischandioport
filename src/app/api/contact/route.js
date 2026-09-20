import { NextResponse } from "next/server";
import { sendOwnerEmail } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const subject = clean(payload.subject, 200);
  const message = clean(payload.message, 5000);

  if (!name || !subject || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 422 });
  }

  const result = await sendOwnerEmail({
    subject: `Portfolio contact: ${subject}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Your message could not be sent right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
