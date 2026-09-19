export interface BoxProduct {
  id: string;
  name: string;
  unitPrice: number; // ₪ per item in the box
  image: string;
}

export interface BoxType {
  id: string;
  name: string;
  basePrice: number; // ₪ base cost of the box itself
  image: string;
}

export interface BoxItem {
  product: BoxProduct;
  qty: number;
}

export const MAX_ITEMS_PER_BOX = 20; // sanity cap

export function computeUnitPrice(boxBase: number, items: BoxItem[]): number {
  const itemsTotal = items.reduce((sum, i) => sum + i.product.unitPrice * i.qty, 0);
  return boxBase + itemsTotal;
}

export function computeTotal(unitPrice: number, orderQty: number): number {
  return unitPrice * orderQty;
}

export function totalItemCount(items: BoxItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export interface BoxBuilderContact {
  name: string;
  phone: string;
  city: string;
  region: string;
}

// Formats a Box Builder order into a WhatsApp-ready Hebrew summary
export function buildBoxSummaryText(
  boxType: BoxType,
  items: BoxItem[],
  unitPrice: number,
  orderQty: number,
  contact?: BoxBuilderContact
): string {
  const total = computeTotal(unitPrice, orderQty);
  const itemLines = items
    .filter((i) => i.qty > 0)
    .map((i) => `  • ${i.product.name} ×${i.qty} (${formatPrice(i.product.unitPrice * i.qty)})`)
    .join("\n");

  const contactLines = contact
    ? [
        `שם: ${contact.name}`,
        `טלפון: ${contact.phone}`,
        `יישוב: ${contact.city}`,
        `אזור: ${contact.region}`,
        ``,
      ]
    : [];

  return [
    `📦 בקשת הרכבת מארז מותאם:`,
    ``,
    ...contactLines,
    `סוג קופסה: ${boxType.name} (${formatPrice(boxType.basePrice)})`,
    `תכולה:`,
    itemLines || "  (ריק)",
    ``,
    `מחיר ליחידה: ${formatPrice(unitPrice)}`,
    `כמות: ${orderQty}`,
    `סה"כ: ${formatPrice(total)}`,
    ``,
    `* המחיר אינו כולל משלוח וכפוף לאישור סופי`,
  ].join("\n");
}

export function formatPrice(n: number): string {
  return `₪${n.toLocaleString("he-IL")}`;
}
