import React from "react";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

const ChatMessage = ({ message, isLast, onRegenerate, isLoading }) => {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  }

  return (
    <AssistantMessage
      message={message}
      isLast={isLast}
      onRegenerate={onRegenerate}
      isLoading={isLoading}
    />
  );
};

export default ChatMessage;
