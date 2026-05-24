import type { Lead } from "./types";

export async function saveLead(lead: Omit<Lead, "createdAt">): Promise<void> {
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch {
    // Silent — WhatsApp CTA is always the fallback
    if (process.env.NODE_ENV === "development") {
      console.warn("[saveLead] network error — lead not saved:", lead);
    }
  }
}
