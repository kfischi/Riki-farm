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

export interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

export type MessageType =
  | { id: string; sender: "bot" | "user"; type: "text"; text: string }
  | { id: string; sender: "bot"; type: "video-link"; videos: Video[] }
  | { id: string; sender: "bot"; type: "catalog-cards"; packages: Package[] }
  | {
      id: string;
      sender: "bot";
      type: "quick-replies";
      text?: string;
      replies: QuickReply[];
    }
  | {
      id: string;
      sender: "bot";
      type: "whatsapp-cta";
      href: string;
      summaryText: string;
    };

export type Step =
  | "idle"
  | "videos"
  | "info"
  | "catalog"
  | "order_name"
  | "order_company"
  | "order_package"
  | "order_quantity"
  | "order_phone"
  | "order_confirm";

export interface Order {
  name?: string;
  company?: string;
  pkg?: string;
  quantity?: number;
  phone?: string;
}

export interface BotState {
  step: Step;
  messages: MessageType[];
  isTyping: boolean;
  order: Order;
}

export type BotAction =
  | { type: "USER_INPUT"; payload: string }
  | { type: "ADD_MESSAGES"; payload: MessageType[] }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "SET_STEP"; payload: Step }
  | { type: "PATCH_ORDER"; payload: Partial<Order> }
  | { type: "RESET" };
