"use client";

import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatPanel } from "./chat/ChatPanel";
import { ChatLauncher } from "./chat/ChatLauncher";
import type { BotAction, BotState, MessageType, Step } from "@/lib/types";
import { getBotResponse, getWelcomeMessages } from "@/lib/botEngine";
import { saveLead } from "@/lib/saveLead";

const initialState: BotState = {
  step: "idle",
  messages: [],
  isTyping: false,
  order: {},
  savedPartial: false,
};

function botReducer(state: BotState, action: BotAction): BotState {
  switch (action.type) {
    case "ADD_MESSAGES":
      return { ...state, messages: [...state.messages, ...action.payload] };
    case "SET_TYPING":
      return { ...state, isTyping: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "PATCH_ORDER":
      return { ...state, order: { ...state.order, ...action.payload } };
    case "SET_SAVED_PARTIAL":
      return { ...state, savedPartial: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function RickyBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [unread, setUnread] = useState(true);
  const [autoOpened, setAutoOpened] = useState(false);
  const [state, dispatch] = useReducer(botReducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingMessages = useRef<MessageType[]>([]);
  const isProcessing = useRef(false);
  // Track latest state for use in callbacks without stale closure
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    dispatch({ type: "ADD_MESSAGES", payload: getWelcomeMessages() });
  }, []);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("rickybot_opened");
    if (alreadyOpened) return;
    const timer = setTimeout(() => {
      setAutoOpened(true);
      setIsOpen(true);
      setHasOpened(true);
      setUnread(false);
      sessionStorage.setItem("rickybot_opened", "1");
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const open = useCallback(() => {
    setAutoOpened(false); // user-triggered: allow focus
    setIsOpen(true);
    setUnread(false);
    if (!hasOpened) {
      setHasOpened(true);
      sessionStorage.setItem("rickybot_opened", "1");
    }
  }, [hasOpened]);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = () => open();
    window.addEventListener("rickybot:open", handler);
    return () => window.removeEventListener("rickybot:open", handler);
  }, [open]);

  const processNextMessage = useCallback(async () => {
    if (isProcessing.current || pendingMessages.current.length === 0) return;
    isProcessing.current = true;
    while (pendingMessages.current.length > 0) {
      const msg = pendingMessages.current.shift()!;
      const delay = 600 + Math.random() * 500;
      dispatch({ type: "SET_TYPING", payload: true });
      await new Promise((r) => setTimeout(r, delay));
      dispatch({ type: "SET_TYPING", payload: false });
      dispatch({ type: "ADD_MESSAGES", payload: [msg] });
      await new Promise((r) => setTimeout(r, 80));
    }
    isProcessing.current = false;
  }, []);

  const handleUserInput = useCallback(
    (input: string) => {
      if (!input.trim()) return;
      const currentState = stateRef.current;

      const userMsg: MessageType = {
        id: `user-${Date.now()}-${Math.random()}`,
        sender: "user",
        type: "text",
        text: input,
      };
      dispatch({ type: "ADD_MESSAGES", payload: [userMsg] });

      const result = getBotResponse(currentState, input);
      dispatch({ type: "SET_STEP", payload: result.nextStep as Step });
      if (Object.keys(result.orderPatch).length > 0) {
        dispatch({ type: "PATCH_ORDER", payload: result.orderPatch });
      }

      const nextOrder = { ...currentState.order, ...result.orderPatch };

      // Save complete lead when order flow finishes
      if (result.nextStep === "order_confirm" && nextOrder.phone) {
        saveLead({
          name: nextOrder.name ?? "—",
          company: nextOrder.company ?? "—",
          region: nextOrder.region ?? "—",
          address: nextOrder.address ?? "—",
          email: nextOrder.email ?? "—",
          phone: nextOrder.phone ?? "—",
          pkg: nextOrder.pkg ?? "—",
          quantity: String(nextOrder.quantity ?? "—"),
          consent: true,
          source: "ricky-chatbot",
          status: "complete",
        });
      }

      pendingMessages.current.push(...result.messages);
      processNextMessage();
    },
    [processNextMessage]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    dispatch({ type: "ADD_MESSAGES", payload: getWelcomeMessages() });
  }, []);

  return (
    <>
      <ChatLauncher isOpen={isOpen} unread={unread} onOpen={open} />
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={state.messages}
            isTyping={state.isTyping}
            onClose={close}
            onSend={handleUserInput}
            onReset={handleReset}
            inputRef={inputRef}
            autoOpened={autoOpened}
          />
        )}
      </AnimatePresence>
    </>
  );
}
