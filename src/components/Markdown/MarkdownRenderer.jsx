import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-wider font-semibold text-slate-300 text-[11px]">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2 py-0.8 rounded-md text-xs font-sans transition-all duration-150 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-emerald-400 font-medium text-[11px]">Copied</span>
            </>
          ) : (
            <>
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto text-[13px] leading-relaxed">
        <SyntaxHighlighter
          language={language || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "0.85rem 1rem",
            background: "transparent",
            fontSize: "13px",
          }}
          wrapLongLines={false}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content text-slate-800 leading-relaxed text-[14.5px] max-w-none space-y-2.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return <CodeBlock language={match[1]} value={codeString} />;
            }

            if (!inline && codeString.includes("\n")) {
              return <CodeBlock language="text" value={codeString} />;
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-[13px] border border-slate-200"
                {...props}
              >
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="leading-relaxed mb-2 last:mb-0">{children}</p>;
          },
          h1({ children }) {
            return (
              <h1 className="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-lg font-semibold text-slate-900 mt-3.5 mb-1.5 pb-0.5 border-b border-slate-100">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-base font-semibold text-slate-800 mt-3 mb-1">
                {children}
              </h3>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-outside pl-5 space-y-1 text-slate-700 my-1.5">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-outside pl-5 space-y-1 text-slate-700 my-1.5">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="pl-0.5">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-3 border-indigo-500 bg-indigo-50/50 pl-3.5 py-1.5 my-2.5 rounded-r-md text-slate-700 italic">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-3 rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-slate-50 text-slate-800 font-semibold">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="hover:bg-slate-50/70 transition-colors">{children}</tr>;
          },
          th({ children }) {
            return <th className="px-3 py-2 text-left font-medium text-slate-700">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3 py-2 text-slate-600">{children}</td>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors font-medium"
              >
                {children}
              </a>
            );
          },
          hr() {
            return <hr className="border-slate-200 my-3" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
