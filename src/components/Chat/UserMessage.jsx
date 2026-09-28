import React, { useState } from "react";

const UserMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  return (
    <div className="flex items-start justify-end gap-2.5 group animate-fadeIn">
      {/* Action Buttons (Copy / Timestamp) visible on hover */}
      <div className="flex flex-col items-end justify-center self-end pb-1 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="flex items-center gap-1.5">
          {message.timestamp && (
            <span className="text-[11px] text-slate-400">{message.timestamp}</span>
          )}
          <button
            onClick={handleCopy}
            title="Copy message"
            className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Message Bubble */}
      <div className="relative max-w-[85%] sm:max-w-[75%] md:max-w-[68%] rounded-2xl rounded-tr-xs bg-indigo-600 text-white px-4 py-2.5 shadow-2xs text-[14.5px] leading-relaxed break-words">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* User Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold mt-0.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserMessage;
