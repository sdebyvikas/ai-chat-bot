import { useState, useCallback } from "react";
import { sendMessage as sendGroqMessage } from "../services/groq";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (textOverride) => {
      const text = (textOverride !== undefined ? textOverride : input).trim();
      if (!text || isLoading) return;

      const userMsgId = Date.now().toString();
      const userMessage = {
        id: userMsgId,
        role: "user",
        content: text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        const payload = updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const aiResponse = await sendGroqMessage(payload);

        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        console.error("Chat Error:", err);
        const errorMessage =
          err.message || "Failed to generate response. Please check your API key and connection.";
        setError(errorMessage);

        const errorAssistantMsg = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ **Error**: ${errorMessage}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, errorAssistantMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const regenerateResponse = useCallback(async () => {
    if (messages.length === 0 || isLoading) return;

    // Find the last user message
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) return;

    // Retain history up to the last user message
    const truncatedMessages = messages.slice(0, lastUserIndex + 1);
    setMessages(truncatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const payload = truncatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const aiResponse = await sendGroqMessage(payload);

      const assistantMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...truncatedMessages, assistantMessage]);
    } catch (err) {
      console.error("Regenerate Error:", err);
      const errorMessage =
        err.message || "Failed to regenerate response. Please try again.";
      setError(errorMessage);

      setMessages([
        ...truncatedMessages,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `⚠️ **Error**: ${errorMessage}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setInput("");
  }, []);

  const setQuickPrompt = useCallback(
    (prompt) => {
      setInput(prompt);
      sendMessage(prompt);
    },
    [sendMessage]
  );

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    clearChat,
    regenerateResponse,
    setQuickPrompt,
  };
};
