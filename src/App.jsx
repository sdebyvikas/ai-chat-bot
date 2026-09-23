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
    <div style={{ padding: 20 }}>
      <h1>Chat App</h1>

      <div
        style={{
          height: "400px",
          border: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}:</strong>  
<MarkdownRenderer
  content={msg.text}
/>
          </div>
        ))}

        {loading && <p>Thinking...</p>}
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Anything..."
          style={{ width: "80%", padding: 10 }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
