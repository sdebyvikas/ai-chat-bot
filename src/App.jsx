import React from "react";
import MainLayout from "./components/Layout/MainLayout";
import { useChat } from "./hooks/useChat";

function App() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    clearChat,
    regenerateResponse,
    setQuickPrompt,
  } = useChat();

  return (
    <MainLayout
      messages={messages}
      input={input}
      setInput={setInput}
      isLoading={isLoading}
      onSend={sendMessage}
      onClearChat={clearChat}
      onRegenerate={regenerateResponse}
      onSelectPrompt={setQuickPrompt}
    />
  );
}

export default App;
