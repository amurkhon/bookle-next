"use client";

import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_CHATBOT_ANSWEAR } from "../../apollo/user/mutation";
import { GET_INQUIRY_HISTORY } from "../../apollo/user/query";
import { T } from "../types/common";
import { InquiryHistoryDto } from "../types/openai/open-ai-answear";
import { userVar } from "../../apollo/store";
import { NEXT_PUBLIC_REACT_APP_API_URL } from "../config";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const initialSystem: Message = {
  id: "sys-1",
  role: "system",
  content: "You are Bookle Assistant. Help the user concisely and politely.",
};

export default function AiChat() {
  const user = useReactiveVar(userVar);
  const [messages, setMessages] = useState<Message[]>([initialSystem]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const historyLoadedRef = useRef(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const imagePath = user && user?.memberImage ?
    `${NEXT_PUBLIC_REACT_APP_API_URL}/${user.memberImage}` : 
    '/img/profile/defaultUser.svg';

  const [ aiChatBotRequest ] = useMutation(GET_CHATBOT_ANSWEAR);

  const {
    loading: getInquiryHistoryLoading,
    data: getInquiryHistoryData,
    error: getInquiryHistoryError,
  } = useQuery(GET_INQUIRY_HISTORY, {
    skip: !user || !user._id, // Skip query if user doesn't exist
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      // Only load history once on initial mount
      if (historyLoadedRef.current) return;
      
      const history: InquiryHistoryDto[] = data?.getInquiryHistory || [];
      if (history && history.length > 0) {
        // Convert history to messages format
        const historyMessages: Message[] = history.flatMap((item) => [
          {
            id: `user-${item.createdAt}`,
            role: "user" as const,
            content: item.question,
          },
          {
            id: `assistant-${item.createdAt}`,
            role: "assistant" as const,
            content: item.answer,
          },
        ]);
        // Set messages with system message + history
        setMessages([initialSystem, ...historyMessages]);
      } else {
        // No history, just keep system message
        setMessages([initialSystem]);
      }
      historyLoadedRef.current = true;
    }
  });

  // Reset history loaded flag when user changes
  useEffect(() => {
    if (!user || !user._id) {
      // User logged out, reset history loaded flag and clear messages
      historyLoadedRef.current = false;
      setMessages([initialSystem]);
    } else {
      // User logged in, reset history loaded flag to allow loading history
      historyLoadedRef.current = false;
    }
  }, [user?._id]);

  /* auto-scroll */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  function addMessage(m: Message) {
    setMessages((prev) => [...prev, m]);
  }

  function handleQuick(prompt: string) {
    setInput(prompt);
    inputRef.current?.focus();
  }

  async function sendMessage() {
    setError(null);
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    const tempId = `a-${Date.now()}`;
    addMessage({ id: tempId, role: "assistant", content: "" });
    setIsTyping(true);

    try {
      // const response = await fetch("/open-ai/generate", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ prompt: trimmed }),
      // });

      const response: any = await aiChatBotRequest(
        {
          variables: {
            input: {
              prompt: input
            }
          }
        }
      );

      if (!response) throw new Error("Server error");


      // const answear = await response.json();

      // let aiText = "";

      // if (typeof answear === "string") aiText = answear;
      // else if (answear.content) aiText = answear.content;
      // else if (answear.message?.content) aiText = answear.message.content;
      // else if (answear.choices?.[0]?.message?.content)
      //   aiText = answear.choices[0].message.content;
      // else aiText = JSON.stringify(answear);

      await revealAssistant(tempId, response?.data?.generateResponse?.content);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }

  function revealAssistant(id: string, text: string) {
    return new Promise<void>((resolve) => {
      let i = 0;
      const speed = 18;

      const interval = setInterval(() => {
        i++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, content: text.slice(0, i) } : m
          )
        );
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  }

  function clearChat() {
    setMessages([initialSystem]);
    setError(null);
  }

  return (
    <div className="ai-chat-root">
      <div className="chat-card">
        <header className="chat-header">
          <div className="title">Bookle Assistant</div>
          <button className="btn ghost" onClick={clearChat}>
            Clear
          </button>
        </header>

        <div className="chat-body" ref={listRef}>
          {messages
            .filter((m) => m.role !== "system")
            .map((m) => (
              <div
                key={m.id}
                className={`chat-row ${m.role === "user" ? "user" : "assistant"}`}
              >
                <div className="avatar">
                  {m.role === "user" ? <img style={{width:"35px", height: "35px", borderRadius: '100%'}} src={imagePath} alt="" /> : "🤖"}
                </div>
                <div className="bubble">
                  {m.content ||
                    (m.role === "assistant" && isTyping ? (
                      <span className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    ) : null)}
                </div>
              </div>
            ))}
        </div>

        <footer className="chat-footer">
          <div className="quick-prompts">
            <button onClick={() => handleQuick("Summarize this book.")}>
              Summarize
            </button>
            <button onClick={() => handleQuick("Give a 2-week study plan.")}>
              Study Plan
            </button>
            <button onClick={() => handleQuick("Recommend 5 books.")}>
              Recommend Books
            </button>
          </div>

          {error && <div className="error-row">{error}</div>}

          <div className="input-row">
            <textarea
              ref={inputRef}
              value={input}
              placeholder="Ask the assistant…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            ></textarea>
            <button
              className="btn primary"
              onClick={() => !loading && sendMessage()}
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
