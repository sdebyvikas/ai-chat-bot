import React from "react";
import { STARTER_PROMPTS, APP_CONFIG } from "../../utils/constants";

const EmptyState = ({ onSelectPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-3xl mx-auto px-4 py-8 text-center animate-fadeIn">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 shadow-xs">
        <svg
          className="w-7 h-7 text-indigo-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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

      {/* Greeting Title */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
        How can I help you today?
      </h2>
      <p className="text-slate-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        Ask questions, generate clean code, brainstorm ideas, or summarize notes with {APP_CONFIG.name}.
      </p>

      {/* Starter Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
        {STARTER_PROMPTS.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group flex flex-col items-start p-4 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-indigo-300 text-left transition-all duration-150 hover:shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span className="text-base">{item.icon}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                {item.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900 mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Fast Groq Speed
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Syntax Highlighted
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Markdown
        </span>
      </div>
    </div>
  );
};

export default EmptyState;
