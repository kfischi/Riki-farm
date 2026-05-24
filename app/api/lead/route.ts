import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  // Attach server-generated timestamp
  const lead: Lead = {
    name: body.name ?? "—",
    company: body.company ?? "—",
    region: body.region ?? "—",
    address: body.address ?? "—",
    email: body.email ?? "—",
    phone: body.phone ?? "—",
    pkg: body.pkg ?? "—",
    quantity: body.quantity ?? "—",
    consent: body.consent ?? false,
    source: "ricky-chatbot",
    status: body.status ?? "partial",
    createdAt: new Date().toISOString(),
    ...(body.boxType && { boxType: body.boxType }),
    ...(body.boxItems && { boxItems: body.boxItems }),
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
