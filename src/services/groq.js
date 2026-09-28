import axios from "axios";
import { APP_CONFIG } from "../utils/constants";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const sendMessage = async (messages, model = APP_CONFIG.modelName) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Groq API Key not found! Please define VITE_GROQ_API_KEY in your .env file.",
    );
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: model || "openai/gpt-oss-120b",
        messages,
        temperature: 0.7,
        max_tokens: 4096,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }

    throw new Error("No response received from Groq API.");
  } catch (error) {
    console.error("Groq API Error:", error);
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
};
