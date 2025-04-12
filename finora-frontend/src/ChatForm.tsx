import React, { useState } from "react";
import { chatWithBot } from "./services/api";  // Import the chatWithBot function

interface ChatFormProps {
  financialSummary: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ financialSummary }) => {
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await chatWithBot(question, financialSummary);
    setResponse(result);  // Set chatbot's response
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask your financial question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
      {response && <p>{response}</p>} {/* Display chatbot response */}
    </div>
  );
};

export default ChatForm;
