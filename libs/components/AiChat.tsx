"use client";

import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_CHATBOT_ANSWEAR } from "../../apollo/user/mutation";
import { GET_INQUIRY_HISTORY } from "../../apollo/user/query";
import { T } from "../types/common";
import { InquiryHistoryDto } from "../types/openai/open-ai-answear";
import { userVar } from "../../apollo/store";

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
  const [chatHistory, setChatHistory] = useState<InquiryHistoryDto[] | []>();

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);


  const [ aiChatBotRequest ] = useMutation(GET_CHATBOT_ANSWEAR);

  if(user) {
    const {
      loading: getInquiryHistoryLoading,
      data: getInquiryHistoryData,
      error: getInquiryHistoryError,
      refetch: getInquiryHistoryRefetch,		
    } = useQuery(GET_INQUIRY_HISTORY, {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data: T) => {
        setChatHistory(data?.getInquiryHistory);
      }
    });
  }

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
                  {m.role === "user" ? "" : "🤖"}
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
