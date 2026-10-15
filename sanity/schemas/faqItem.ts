// Sanity Studio schema — שאלה ותשובה (one FAQ entry)
import { type Rule } from "./constants";

/** Room the accordion has before a question wraps past two lines. */
const QUESTION_LIMIT = 120;
const ANSWER_LIMIT = 600;

/**
 * One question and its answer in the FAQ accordion.
 *
 * Kept as its own document rather than a list inside siteSettings: an editor
 * adding a seasonal question should not have to open a settings screen and
 * scroll past the contact details to do it.
 */
export const faqItemSchema = {
  name: "faqItem",
  title: "שאלה ותשובה",
  type: "document",
  fields: [
    {
      name: "question",
      title: "השאלה",
      type: "string",
      validation: (R: Rule) => [
        R.required().error("צריך לכתוב שאלה"),
        R.max(QUESTION_LIMIT).warning(`מומלץ עד ${QUESTION_LIMIT} תווים — שאלה ארוכה נשברת לשתי שורות`),
      ],
    },
    {
      name: "answer",
      title: "התשובה",
      type: "text",
      rows: 4,
      validation: (R: Rule) => [
        R.required().error("צריך לכתוב תשובה"),
        R.max(ANSWER_LIMIT).warning(`מומלץ עד ${ANSWER_LIMIT} תווים`),
      ],
    },
    {
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      description: "מספר נמוך מופיע קודם. השאלה הראשונה נפתחת אוטומטית באתר.",
    },
    {
      name: "available",
      title: "מוצג",
      type: "boolean",
      description: "כבו כדי להסתיר את השאלה מהאתר בלי למחוק אותה",
      initialValue: true,
    },
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", order: "order", available: "available" },
    prepare({ title, order, available }: { title?: string; order?: number; available?: boolean }) {
      return {
        title: available === false ? `${title} (מוסתר)` : title,
        subtitle: order != null ? `סדר: ${order}` : undefined,
      };
    },
  },
};
