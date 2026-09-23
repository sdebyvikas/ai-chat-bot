import { useState } from "react";
import { sendMessage } from "./services/groq";

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

    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    const aiResponse = await sendMessage(message);

    setChat((prev) => [
      ...prev,
      userMessage,
      {
        role: "assistant",
        text: aiResponse,
      },
    ]);

    setMessage("");
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Groq Chat App</h1>

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
            <strong>{msg.role}:</strong> {msg.text}
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
