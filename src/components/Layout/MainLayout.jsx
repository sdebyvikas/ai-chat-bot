import React from "react";
import Header from "./Header";
import ChatArea from "../Chat/ChatArea";
import ChatInput from "../Input/ChatInput";

const MainLayout = ({
  messages,
  input,
  setInput,
  isLoading,
  onSend,
  onClearChat,
  onRegenerate,
  onSelectPrompt,
}) => {
  return (
    <div className="relative h-screen w-full flex flex-col bg-[#f8fafc] text-slate-800 overflow-hidden font-sans select-text">
      {/* Header */}
      <Header
        onClearChat={onClearChat}
        messageCount={messages.length}
        isLoading={isLoading}
      />

      {/* Main Chat Feed Area */}
      <main className="relative flex-1 flex flex-col min-h-0 overflow-hidden">
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          onRegenerate={onRegenerate}
          onSelectPrompt={onSelectPrompt}
        />
      </main>

      {/* Input Dock */}
      <footer className="relative z-10 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent pt-2">
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={onSend}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
};

export default MainLayout;
