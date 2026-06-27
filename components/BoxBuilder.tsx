"use client";

import { useReducer, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBasket, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  computeUnitPrice,
  computeTotal,
  totalItemCount,
  buildBoxSummaryText,
  formatPrice,
  MAX_ITEMS_PER_BOX,
  type BoxItem,
  type BoxProduct,
  type BoxType,
} from "@/lib/pricing";
import { CONFIG } from "@/lib/config";
import { saveLead } from "@/lib/saveLead";

// ===== Static placeholder data — replaced by Sanity in Phase C =====
const BOX_TYPES: BoxType[] = [
  { id: "eco",     name: "קופסת אקולוגית",  basePrice: 35,  image: "" },
  { id: "wood",    name: "קופסת עץ טבעי",   basePrice: 65,  image: "" },
  { id: "premium", name: "קופסת עץ יוקרה",  basePrice: 120, image: "" },
];

const BOX_TYPE_PLACEHOLDERS: Record<string, { gradient: string; icon: string }> = {
  eco:     { gradient: "from-stone-100 via-amber-50 to-stone-200",   icon: "🌾" },
  wood:    { gradient: "from-amber-100 via-orange-100 to-amber-200", icon: "🪵" },
  premium: { gradient: "from-stone-700 via-stone-800 to-stone-900",  icon: "✦" },
};

const BOX_PRODUCTS: BoxProduct[] = [
  { id: "olive_oil",  name: "שמן זית כתית מעולה",    unitPrice: 45, image: "" },
  { id: "honey",      name: "דבש פרחי שדה",            unitPrice: 38, image: "" },
  { id: "halva",      name: "חלבה ממרח",               unitPrice: 22, image: "" },
  { id: "date_syrup", name: "סילאן תמרים",             unitPrice: 28, image: "" },
  { id: "herbs",      name: "עשבי תיבול מיובשים",      unitPrice: 18, image: "" },
  { id: "jam",        name: "ריבה תוצרת בית",          unitPrice: 25, image: "" },
];

const BOX_PRODUCT_ICONS: Record<string, string> = {
  olive_oil:  "🫒",
  honey:      "🍯",
  halva:      "🌰",
  date_syrup: "🌴",
  herbs:      "🌿",
  jam:        "🫙",
};

function isValidSrc(src: string): boolean {
  return !!src && !src.includes("placehold.co");
}

// ===== State =====
interface BuilderState {
  selectedBox: BoxType | null;
  items: BoxItem[];
  orderQty: number;
  step: "choose_box" | "add_products" | "set_qty" | "summary";
}

type BuilderAction =
  | { type: "SELECT_BOX"; payload: BoxType }
  | { type: "SET_ITEM_QTY"; payload: { productId: string; delta: number } }
  | { type: "SET_ORDER_QTY"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };

const initialBuilderState: BuilderState = {
  selectedBox: null,
  items: BOX_PRODUCTS.map((p) => ({ product: p, qty: 0 })),
  orderQty: 1,
  step: "choose_box",
};

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "SELECT_BOX":
      return { ...state, selectedBox: action.payload };
    case "SET_ITEM_QTY": {
      const current = totalItemCount(state.items);
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.product.id !== action.payload.productId) return item;
          const newQty = Math.max(0, item.qty + action.payload.delta);
          const wouldAdd = newQty - item.qty;
          if (wouldAdd > 0 && current + wouldAdd > MAX_ITEMS_PER_BOX) return item;
          return { ...item, qty: newQty };
        }),
      };
    }
    case "SET_ORDER_QTY":
      return { ...state, orderQty: Math.max(1, action.payload) };
    case "NEXT_STEP": {
      const steps: BuilderState["step"][] = ["choose_box", "add_products", "set_qty", "summary"];
      const idx = steps.indexOf(state.step);
      return { ...state, step: steps[Math.min(idx + 1, steps.length - 1)] };
    }
    case "PREV_STEP": {
      const steps: BuilderState["step"][] = ["choose_box", "add_products", "set_qty", "summary"];
      const idx = steps.indexOf(state.step);
      return { ...state, step: steps[Math.max(idx - 1, 0)] };
    }
    case "RESET":
      return initialBuilderState;
    default:
      return state;
  }
}

// ===== Component =====
export function BoxBuilder() {
  const [state, dispatch] = useReducer(builderReducer, initialBuilderState);

  const filledItems = state.items.filter((i) => i.qty > 0);
  const unitPrice = state.selectedBox
    ? computeUnitPrice(state.selectedBox.basePrice, filledItems)
    : 0;
  const total = computeTotal(unitPrice, state.orderQty);
  const itemCount = totalItemCount(state.items);

  const openChatWithBox = useCallback(() => {
    if (!state.selectedBox) return;
    const summaryText = buildBoxSummaryText(
      state.selectedBox,
      filledItems,
      unitPrice,
      state.orderQty
    );
    const waText = `שלום ריקי! 👋 אשמח לקבל הצעת מחיר על מארז מותאם:\n\n${summaryText}`;
    const href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    // Save lead (no personal data yet — will be partial)
    saveLead({
      name: "—", company: "—", region: "—", address: "—", email: "—", phone: "—",
      pkg: `מארז מותאם: ${state.selectedBox.name}`,
      quantity: String(state.orderQty),
      consent: false,
      source: "ricky-chatbot",
      status: "partial",
      boxType: state.selectedBox.name,
      boxItems: filledItems.map((i) => `${i.product.name}×${i.qty}`).join(", "),
      unitPrice: formatPrice(unitPrice),
      orderQty: String(state.orderQty),
      totalPrice: formatPrice(total),
    });

    window.open(href, "_blank", "noopener,noreferrer");
  }, [state, filledItems, unitPrice, total]);

  const steps = [
    { id: "choose_box",   label: "סוג קופסה" },
    { id: "add_products", label: "בחירת מוצרים" },
    { id: "set_qty",      label: "כמות" },
    { id: "summary",      label: "סיכום" },
  ];
  const currentStepIdx = steps.findIndex((s) => s.id === state.step);

  return (
    <section id="box-builder" aria-labelledby="box-builder-heading" className="py-28 bg-offwhite relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-clay font-semibold text-sm uppercase tracking-widest mb-3 block">בנה בעצמך</span>
          <h2 id="box-builder-heading" className="text-4xl lg:text-5xl font-black text-forest leading-tight">
            מרכיב מארז
          </h2>
          <p className="text-forest/60 mt-4 text-lg max-w-md mx-auto">
            בחר קופסה, הרכב את התכולה, וקבל מחיר מיידי
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10" role="list" aria-label="שלבים">
          {steps.map((s, i) => (
            <div key={s.id} role="listitem" className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= currentStepIdx ? "bg-forest text-white" : "bg-forest/10 text-forest/40"}`}
                aria-current={s.id === state.step ? "step" : undefined}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i === currentStepIdx ? "text-forest font-semibold" : "text-forest/40"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-6 h-px mx-1 ${i < currentStepIdx ? "bg-forest" : "bg-forest/15"}`} aria-hidden="true" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            {state.step === "choose_box" && (
              <div>
                <p className="text-center text-forest/70 mb-6">בחר/י את סוג הקופסה:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {BOX_TYPES.map((bt) => (
                    <button
                      key={bt.id}
                      onClick={() => dispatch({ type: "SELECT_BOX", payload: bt })}
                      className={`rounded-2xl overflow-hidden border-2 text-right transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-wheat ${state.selectedBox?.id === bt.id ? "border-forest shadow-glow-wheat" : "border-transparent shadow-green-sm hover:shadow-green-lg"}`}
                      aria-pressed={state.selectedBox?.id === bt.id}
                    >
                      <div className="relative h-32 w-full overflow-hidden">
                        {isValidSrc(bt.image) ? (
                          <Image src={bt.image} alt={bt.name} fill className="object-cover" sizes="220px" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${BOX_TYPE_PLACEHOLDERS[bt.id]?.gradient ?? "from-forest/10 to-wheat/20"} flex items-center justify-center`}>
                            <span className="text-4xl" aria-hidden="true">{BOX_TYPE_PLACEHOLDERS[bt.id]?.icon ?? "📦"}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-white">
                        <p className="font-bold text-forest">{bt.name}</p>
                        <p className="text-clay font-black mt-1">{formatPrice(bt.basePrice)}</p>
                        <p className="text-xs text-forest/50 mt-0.5">מחיר בסיס לקופסה</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.step === "add_products" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-forest/70">בחר/י מוצרים לתוך הקופסה:</p>
                  <div className="text-sm text-forest/50">
                    {itemCount}/{MAX_ITEMS_PER_BOX} פריטים
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {state.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-green-sm">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        {isValidSrc(product.image) ? (
                          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-forest/10 to-wheat/20 flex items-center justify-center">
                            <span className="text-xl" aria-hidden="true">{BOX_PRODUCT_ICONS[product.id] ?? "🌿"}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-forest leading-tight">{product.name}</p>
                        <p className="text-xs text-clay font-bold">{formatPrice(product.unitPrice)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: "SET_ITEM_QTY", payload: { productId: product.id, delta: -1 } })}
                          aria-label={`הוצא ${product.name}`}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-full border-2 border-forest/20 flex items-center justify-center disabled:opacity-30 hover:border-forest transition-colors"
                        >
                          <Minus className="w-3 h-3 text-forest" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-forest" aria-live="polite">{qty}</span>
                        <button
                          onClick={() => dispatch({ type: "SET_ITEM_QTY", payload: { productId: product.id, delta: 1 } })}
                          aria-label={`הוסף ${product.name}`}
                          disabled={itemCount >= MAX_ITEMS_PER_BOX}
                          className="w-7 h-7 rounded-full border-2 border-forest/20 flex items-center justify-center disabled:opacity-30 hover:border-forest transition-colors"
                        >
                          <Plus className="w-3 h-3 text-forest" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Live unit price */}
                {state.selectedBox && (
                  <div className="mt-6 bg-forest/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-sm text-forest/70">מחיר ליחידה כרגע:</span>
                    <span className="text-2xl font-black text-forest">{formatPrice(unitPrice)}</span>
                  </div>
                )}
              </div>
            )}

            {state.step === "set_qty" && (
              <div className="max-w-sm mx-auto text-center">
                <p className="text-forest/70 mb-8">כמה מארזים זהים אתם צריכים?</p>
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={() => dispatch({ type: "SET_ORDER_QTY", payload: state.orderQty - 1 })}
                    aria-label="הפחת כמות"
                    disabled={state.orderQty <= 1}
                    className="w-14 h-14 rounded-2xl border-2 border-forest/20 flex items-center justify-center disabled:opacity-30 hover:border-forest transition-colors"
                  >
                    <Minus className="w-5 h-5 text-forest" />
                  </button>
                  <span className="text-5xl font-black text-forest w-20 text-center" aria-live="polite">
                    {state.orderQty}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "SET_ORDER_QTY", payload: state.orderQty + 1 })}
                    aria-label="הוסף כמות"
                    className="w-14 h-14 rounded-2xl border-2 border-forest/20 flex items-center justify-center hover:border-forest transition-colors"
                  >
                    <Plus className="w-5 h-5 text-forest" />
                  </button>
                </div>
                {state.selectedBox && (
                  <div className="bg-forest rounded-2xl p-6 text-white">
                    <p className="text-white/70 text-sm mb-1">סה&quot;כ משוער</p>
                    <p className="text-4xl font-black text-wheat">{formatPrice(total)}</p>
                    <p className="text-white/50 text-xs mt-2">המחיר אינו כולל משלוח וכפוף לאישור סופי</p>
                  </div>
                )}
              </div>
            )}

            {state.step === "summary" && state.selectedBox && (
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-green-md p-6 border border-forest/5">
                  <h3 className="font-black text-forest text-lg mb-4">סיכום המארז שלך</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-forest/60">קופסה:</span>
                      <span className="font-semibold text-forest">{state.selectedBox.name}</span>
                    </div>
                    {filledItems.map((i) => (
                      <div key={i.product.id} className="flex justify-between">
                        <span className="text-forest/60">{i.product.name} ×{i.qty}</span>
                        <span className="font-semibold text-forest">{formatPrice(i.product.unitPrice * i.qty)}</span>
                      </div>
                    ))}
                    {filledItems.length === 0 && <p className="text-forest/40 text-center py-2">לא נבחרו מוצרים</p>}
                    <div className="border-t border-forest/10 pt-3 mt-3 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-forest/60">מחיר ליחידה:</span>
                        <span className="font-bold text-forest">{formatPrice(unitPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-forest/60">כמות:</span>
                        <span className="font-bold text-forest">{state.orderQty}</span>
                      </div>
                      <div className="flex justify-between text-base">
                        <span className="font-bold text-forest">סה&quot;כ:</span>
                        <span className="font-black text-clay text-xl">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-forest/40 mt-4 text-center">
                    * המחיר אינו כולל משלוח וכפוף לאישור סופי
                  </p>
                  <button
                    onClick={openChatWithBox}
                    disabled={filledItems.length === 0}
                    className="btn-sheen mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20ba5a] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.45)]"
                  >
                    <ShoppingBasket className="w-5 h-5" />
                    שלח/י בקשה להזמנה לריקי
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => dispatch({ type: "PREV_STEP" })}
            disabled={state.step === "choose_box"}
            className="px-5 py-2.5 rounded-xl border-2 border-forest/20 text-forest font-semibold text-sm disabled:opacity-30 hover:border-forest transition-colors"
          >
            ← הקודם
          </button>
          {state.step !== "summary" && (
            <button
              onClick={() => dispatch({ type: "NEXT_STEP" })}
              disabled={state.step === "choose_box" && !state.selectedBox}
              className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-sm disabled:opacity-40 hover:bg-forest-mid active:scale-95 transition-all flex items-center gap-2"
            >
              הבא <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          )}
          {state.step === "summary" && (
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="text-sm text-forest/50 hover:text-forest underline underline-offset-2"
            >
              התחל מחדש
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
