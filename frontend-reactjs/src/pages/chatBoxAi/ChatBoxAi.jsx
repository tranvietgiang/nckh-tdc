import React, { useEffect, useState, useRef } from "react";
import useChatBoxAi from "../../hooks/ai/useChatBoxAi";
import { Link, useNavigate } from "react-router-dom";
export default function ChatBoxAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Thêm state cho hiệu ứng đang trả lời

  const STORAGE_KEY = "chat_guest_cache";
  const EXP_TIME = 10 * 60 * 1000;

  const defaultMessage = [
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo. Bạn cần giúp gì hôm nay?",
      sender: "bot",
    },
  ];

  const [messages, setMessages] = useState(defaultMessage);
  const [input, setInput] = useState("");

  const { sendMessage, loadingAi } = useChatBoxAi();

  const isFirstOpen = useRef(false);
  const messagesEndRef = useRef(null); // Thêm ref để tự động scroll

  /**
   * =========================
   * AUTO SCROLL TO BOTTOM
   * =========================
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /**
   * =========================
   * LOAD CACHE KHI MỞ CHAT
   * =========================
   */
  useEffect(() => {
    if (!isOpen) return;
    if (isFirstOpen.current) return;

    isFirstOpen.current = true;

    const cached = localStorage.getItem(STORAGE_KEY);

    if (!cached) return;

    try {
      const parsed = JSON.parse(cached);
      const now = Date.now();

      if (now - parsed.time < EXP_TIME && parsed.messages?.length) {
        setMessages(parsed.messages);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setMessages(defaultMessage);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
      setMessages(defaultMessage);
    }
  }, [isOpen]);

  /**
   * =========================
   * SAVE CACHE
   * =========================
   */
  const saveToLocal = (msgs) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        time: Date.now(),
        messages: msgs,
      }),
    );
  };

  /**
   * =========================
   * SEND MESSAGE
   * =========================
   */
  const handleSend = async () => {
    if (!input.trim() || loadingAi) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveToLocal(newMessages);

    const messageToSend = input;
    setInput("");

    // Bật hiệu ứng đang trả lời
    setIsTyping(true);

    try {
      const res = await sendMessage(messageToSend);

      const botReply = {
        id: Date.now() + 1,
        text: res?.reply ?? "AI không trả về dữ liệu",
        sender: "bot",
        products: res?.products || [],
      };

      const updated = [...newMessages, botReply];

      setMessages(updated);
      saveToLocal(updated);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        text: "Lỗi kết nối server",
        sender: "bot",
      };

      const updated = [...newMessages, errorMsg];

      setMessages(updated);
      saveToLocal(updated);
    } finally {
      // Tắt hiệu ứng đang trả lời
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  /**
   * =========================
   * AUTO EXPIRE CACHE
   * =========================
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (!cached) return;

      try {
        const parsed = JSON.parse(cached);

        if (Date.now() - parsed.time > EXP_TIME) {
          localStorage.removeItem(STORAGE_KEY);
          setMessages(defaultMessage);
          isFirstOpen.current = false;
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleViewDetail = (id) => {
    navigate("/visitor-detail", { state: { productId: id } });
  };
  return (
    <>
      {/* Nút chat nổi */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          aria-label="Mở chat"
        >
          <div className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-semibold">Trợ lý ảo</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id}>
                {/* MESSAGE */}
                <div
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 shadow-sm border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>

                {/* PRODUCTS (chỉ render 1 lần / msg) */}
                {msg.products?.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-400 mb-1">
                      Đồ án liên quan:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {msg.products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleViewDetail(p.id);
                            setIsOpen(false);
                          }}
                          className="text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-2 py-0.5 hover:bg-blue-100 transition"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Hiệu ứng đang trả lời */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                disabled={isTyping}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              Trợ lý ảo • Hỗ trợ 24/7
            </p>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
