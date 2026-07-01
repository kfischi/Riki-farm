export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price?: string;
  image: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface USP {
  icon: string;
  title: string;
  text: string;
}

export interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

export type MessageType =
  | { id: string; sender: "bot" | "user"; type: "text"; text: string }
  | { id: string; sender: "bot"; type: "video-link"; videos: Video[] }
  | { id: string; sender: "bot"; type: "catalog-cards"; packages: Package[] }
  | { id: string; sender: "bot"; type: "quick-replies"; text?: string; replies: QuickReply[] }
  | { id: string; sender: "bot"; type: "whatsapp-cta"; href: string; summaryText: string };

export type Step =
  | "idle"
  | "videos"
  | "info"
  | "catalog"
  | "order_name"
  | "order_company"
  | "order_region"
  | "order_address"
  | "order_email"
  | "order_phone"
  | "order_package"
  | "order_quantity"
  | "order_consent"
  | "order_confirm";

export interface Order {
  name?: string;
  company?: string;
  region?: string;
  address?: string;
  email?: string;
  phone?: string;
  pkg?: string;
  quantity?: number;
  consent?: boolean;
}

export interface BotState {
  step: Step;
  messages: MessageType[];
  isTyping: boolean;
  order: Order;
  savedPartial: boolean;
}

export type BotAction =
  | { type: "ADD_MESSAGES"; payload: MessageType[] }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "SET_STEP"; payload: Step }
  | { type: "PATCH_ORDER"; payload: Partial<Order> }
  | { type: "SET_SAVED_PARTIAL"; payload: boolean }
  | { type: "RESET" };

export interface Lead {
  name: string;
  company: string;
  region: string;
  address: string;
  email: string;
  phone: string;
  pkg: string;
  quantity: string;
  consent: boolean;
  source: "ricky-chatbot";
  status: "partial" | "complete";
  createdAt: string; // ISO, server-generated
  // Box builder fields (optional)
  boxType?: string;
  boxItems?: string;
  unitPrice?: string;
  orderQty?: string;
  totalPrice?: string;
}

export interface LeadPayload extends Omit<Lead, "createdAt"> {}
