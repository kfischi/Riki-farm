"use client";

import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatPanel } from "./chat/ChatPanel";
import { ChatLauncher } from "./chat/ChatLauncher";
import type { BotAction, BotState, MessageType, Step, Order } from "@/lib/types";
import { getBotResponse, getWelcomeMessages } from "@/lib/botEngine";

const initialState: BotState = {
  step: "idle",
  messages: [],
  isTyping: false,
  order: {},
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
  const [state, dispatch] = useReducer(botReducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingMessages = useRef<MessageType[]>([]);
  const isProcessing = useRef(false);

  // Initialize welcome messages
  useEffect(() => {
    const welcome = getWelcomeMessages();
    dispatch({ type: "ADD_MESSAGES", payload: welcome });
  }, []);

  // Auto-open once after 2500ms
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("rickybot_opened");
    if (alreadyOpened) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasOpened(true);
      setUnread(false);
      sessionStorage.setItem("rickybot_opened", "1");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setUnread(false);
    if (!hasOpened) {
      setHasOpened(true);
      sessionStorage.setItem("rickybot_opened", "1");
    }
  }, [hasOpened]);

  const close = useCallback(() => setIsOpen(false), []);

  // Listen for open events from hero/catalog sections
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

      // Echo user message
      const userMsg: MessageType = {
        id: `user-${Date.now()}-${Math.random()}`,
        sender: "user",
        type: "text",
        text: input,
      };
      dispatch({ type: "ADD_MESSAGES", payload: [userMsg] });

      // Get bot response
      const result = getBotResponse(state, input);
      dispatch({ type: "SET_STEP", payload: result.nextStep as Step });
      if (Object.keys(result.orderPatch).length > 0) {
        dispatch({ type: "PATCH_ORDER", payload: result.orderPatch as Partial<Order> });
      }

      // Queue bot messages for typing simulation
      pendingMessages.current.push(...result.messages);
      processNextMessage();
    },
    [state, processNextMessage]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    const welcome = getWelcomeMessages();
    dispatch({ type: "ADD_MESSAGES", payload: welcome });
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
          />
        )}
      </AnimatePresence>
    </>
  );
}
