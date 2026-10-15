import { CONFIG } from "./config";

/**
 * The contact details as the Studio stores them. Every field is optional, and
 * a field the editor cleared arrives as an empty string rather than absent.
 */
export interface SiteContact {
  phone?: string;
  whatsapp?: string;
  email?: string;
}

/**
 * One place where "Studio value, else the number the site shipped with" is
 * decided.
 *
 * It exists because the rule used to be written out wherever it was needed,
 * and most places skipped it: the WhatsApp number was editable in the Studio
 * and reached only the footer and the hero, while the floating button, the
 * mobile order bar, the nav, the chatbot's hand-off link and the structured
 * data all kept the number compiled into lib/config.ts.
 *
 * That is worse than a field that plainly does nothing. The editor changes the
 * number, sees the footer update, and concludes it worked — while the two
 * buttons that actually carry mobile orders keep sending customers to the old
 * number. One shared resolver is what stops that returning: a new caller gets
 * the rule by importing it, instead of remembering to repeat it.
 */
export function resolveContact(contact?: SiteContact): Required<SiteContact> {
  return {
    phone: contact?.phone?.trim() || CONFIG.legal.contactPhone,
    email: contact?.email?.trim() || CONFIG.legal.contactEmail,
    whatsapp: resolveWhatsapp(contact?.whatsapp),
  };
}

/** The same rule for the callers that need nothing but the number. */
export function resolveWhatsapp(whatsapp?: string): string {
  return whatsapp?.trim() || CONFIG.whatsappNumber;
}
