import React, { useState } from "react";
import MarkdownRenderer from "../Markdown/MarkdownRenderer";

const AssistantMessage = ({ message, isLast, onRegenerate, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy assistant message:", err);
    }
  };

  return (
    <div className="flex items-start gap-3 group animate-fadeIn">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5">
        <svg
          className="w-3.5 h-3.5 text-indigo-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>

      {/* Message Content & Wrapper */}
      <div className="flex-1 min-w-0 max-w-[92%] sm:max-w-[85%] md:max-w-[82%]">
        {/* Header line for Assistant */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold tracking-wide text-slate-700">
            Groq AI
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 font-mono">
            llama-3.3
          </span>
          {message.timestamp && (
            <span className="text-[11px] text-slate-400">{message.timestamp}</span>
          )}
        </div>

        {/* Bubble container */}
        <div
          className={`rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs border ${
            message.isError
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-white border-slate-200/90 text-slate-800"
          }`}
        >
          <MarkdownRenderer content={message.content} />
        </div>

        {/* Message Actions */}
        <div className="flex items-center gap-2 mt-1.5 pl-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-600 font-medium">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>

          {isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-slate-200/60 transition-colors disabled:opacity-40"
            >
              <svg className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
