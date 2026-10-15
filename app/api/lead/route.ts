import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  // A lead with no way to answer it is not a lead. Both callers that exist
  // (RickyBot at order_confirm, BoxBuilder at submit) always send a validated
  // phone, so this rejects only what never came from the site: an empty or
  // hand-crafted POST. Without it, once LEAD_WEBHOOK_URL is configured this
  // route forwards anything anyone posts straight to Ricky.
  const phoneDigits = String(body.phone ?? "").replace(/\D/g, "");
  const hasPhone = phoneDigits.length >= 9;
  const hasEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(body.email ?? "").trim());
  if (!hasPhone && !hasEmail) {
    return NextResponse.json({ ok: false, reason: "no_contact_details" }, { status: 400 });
  }

  // Nothing downstream should receive an unbounded string.
  const clamp = (v: unknown, max = 200) => String(v).slice(0, max);

  // Attach server-generated timestamp
  const lead: Lead = {
    name: body.name ? clamp(body.name) : "—",
    company: body.company ? clamp(body.company) : "—",
    region: body.region ? clamp(body.region) : "—",
    address: body.address ? clamp(body.address) : "—",
    email: body.email ? clamp(body.email) : "—",
    phone: body.phone ? clamp(body.phone, 40) : "—",
    pkg: body.pkg ? clamp(body.pkg) : "—",
    quantity: body.quantity ? clamp(body.quantity, 40) : "—",
    consent: body.consent ?? false,
    source: "ricky-chatbot",
    status: body.status ?? "partial",
    createdAt: new Date().toISOString(),
    ...(body.boxType && { boxType: body.boxType }),
    ...(body.boxItems && { boxItems: clamp(body.boxItems, 1000) }),
    ...(body.unitPrice && { unitPrice: body.unitPrice }),
    ...(body.orderQty && { orderQty: body.orderQty }),
    ...(body.totalPrice && { totalPrice: body.totalPrice }),
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[/api/lead]", JSON.stringify(lead, null, 2));
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: true, note: "no_webhook_configured" });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ ok: false, reason: "upstream_error" }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 200 });
  }
}
