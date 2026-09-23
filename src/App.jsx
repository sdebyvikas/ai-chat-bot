import { useState } from "react";
import { sendMessage } from "./services/groq";
import MarkdownRenderer from "./components/common/MarkdownRenderer";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    // Current chat + new user message
    const updatedChat = [...chat, userMessage];

    // UI me user message show karo
    setChat(updatedChat);

    setLoading(true);

    console.log(userMessage, "userMessage");
    console.log(message, "message");
    console.log(updatedChat, "updatedChat");

    try {
      // Groq/OpenAI format
      const messages = updatedChat.map((item) => ({
        role: item.role,
        content: item.text,
      }));

      console.log(messages, "messages");

      const aiResponse = await sendMessage(messages);

      console.log(aiResponse, "aiResponse");

      setChat([
        ...updatedChat,
        {
          role: "assistant",
          text: aiResponse,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);

      setChat([
        ...updatedChat,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
   <div className="h-screen bg-gray-100 flex flex-col">
      <h1>Chat App</h1>

     <div className="flex-1 overflow-y-auto p-6">
{chat.map((msg, index) => (
  <div
    key={index}
    className={`flex mb-4 ${
      msg.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={`max-w-3xl px-4 py-3 rounded-2xl shadow-sm ${
        msg.role === "user"
          ? "bg-blue-500 text-white"
          : "bg-white border"
      }`}
    >
      <MarkdownRenderer
        content={msg.text}
      />
    </div>
  </div>
))}

        {loading && <p>Thinking...</p>}
      </div>

    <div className="border-t bg-white p-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Anything..."
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />
       <button
  disabled={loading}
  onClick={handleSend}
  className="mt-3 bg-black text-white px-5 py-2 rounded-xl disabled:opacity-50"
>
  {loading ? "Thinking..." : "Send"}
</button>
      </div>
    </div>
  );
}

export default App;
