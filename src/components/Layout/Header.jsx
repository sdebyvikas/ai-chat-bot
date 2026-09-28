import React, { useState } from "react";
import { APP_CONFIG } from "../../utils/constants";

const Header = ({ onClearChat, messageCount, isLoading }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClear = () => {
    onClearChat();
    setShowConfirm(false);
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <svg
              className="w-4.5 h-4.5 text-white"
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
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-slate-900 tracking-tight">
                {APP_CONFIG.name}
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                {APP_CONFIG.version}
              </span>
            </div>
          </div>
        </div>

        {/* Model Badge & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Model Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-mono text-[11px] text-slate-500">Model:</span>
            <span className="font-medium text-slate-700">
              {APP_CONFIG.modelName}
            </span>
          </div>

          {/* Clear Chat Button */}
          {messageCount > 0 && (
            <div className="relative">
              {showConfirm ? (
                <div className="flex items-center gap-1.5 bg-white border border-rose-300 shadow-sm rounded-xl p-1 animate-fadeIn">
                  <span className="text-xs text-rose-600 px-2 font-medium">Clear?</span>
                  <button
                    onClick={handleClear}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={isLoading}
                  title="Clear conversation"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-xs text-slate-600 hover:text-rose-600 transition-colors shadow-2xs disabled:opacity-50"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="hidden sm:inline font-medium">Clear</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
