import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  // If no webhook configured, return ok silently — WhatsApp fallback still works
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false, reason: "upstream_error" }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Don't crash the UX — WhatsApp fallback covers it
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 200 });
  }
}
