import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

const ChatArea = ({
  messages,
  isLoading,
  onRegenerate,
  onSelectPrompt,
}) => {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Auto scroll to bottom when messages or loading state updates
  useEffect(() => {
    if (!showScrollBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, showScrollBottom]);

  // Handle scroll detection to show/hide scroll-to-bottom button
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 120;
    setShowScrollBottom(isScrolledUp);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollBottom(false);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <EmptyState onSelectPrompt={onSelectPrompt} />
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-5 scrollbar-thin"
      >
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id || index}
              message={msg}
              isLast={index === messages.length - 1}
              onRegenerate={onRegenerate}
              isLoading={isLoading}
            />
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <svg
                  className="w-3.5 h-3.5 text-indigo-600 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200/90 shadow-2xs">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></div>
                <span className="text-xs text-slate-500 font-medium ml-2">
                  Thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          className="absolute bottom-4 right-6 p-2 rounded-full bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 shadow-md border border-slate-200 transition-all duration-150 active:scale-95 animate-fadeIn z-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatArea;
