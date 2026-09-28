import React, { useRef, useEffect } from "react";

const ChatInput = ({ input, setInput, onSend, isLoading }) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSend();
      }
    }
  };

  const handleClear = () => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 sm:pb-5">
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-150 focus-within:border-indigo-500 focus-within:ring-3 focus-within:ring-indigo-500/10">
        <div className="flex items-end gap-2 p-2.5 sm:p-3">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-[15px] resize-none outline-none max-h-48 min-h-[28px] py-1 px-1 scrollbar-thin leading-relaxed disabled:opacity-50"
          />

          {/* Clear text button */}
          {input.trim().length > 0 && !isLoading && (
            <button
              onClick={handleClear}
              type="button"
              title="Clear input"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors self-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Send Button */}
          <button
            onClick={() => onSend()}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 text-white disabled:text-slate-400 flex items-center justify-center transition-all duration-150 shadow-2xs active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-3 pb-2 text-[11px] text-slate-400 border-t border-slate-100 pt-1.5">
          <span className="hidden sm:inline">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px]">Shift + Enter</kbd> for newline
          </span>
          <span className="truncate ml-auto text-slate-400 text-[11px]">
            AI can make mistakes. Verify important info.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
