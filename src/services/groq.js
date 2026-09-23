import axios from "axios";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const sendMessage = async (messages) => {
  const response = await axios.post(
    API_URL,
    {
      model: "openai/gpt-oss-120b",
      messages,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};