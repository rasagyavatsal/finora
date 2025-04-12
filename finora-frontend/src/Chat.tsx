import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  type: "user" | "bot";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    const userMessage: Message = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Mock API call - Replace with actual logic
    try {
      const response = await axios.post('http://localhost:8000/chat', {
        question: input,
        financial_summary: 'Summary of financial data here', // Replace with actual summary
      });

      const botMessage: Message = {
        type: 'bot',
        text: response.data.response || 'Sorry, I didn\'t get that.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  };

  return (
    <div className="chat-container p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Chat with Gemini AI</h1>

      {/* Chat window */}
      <div className="chat-box p-4 mb-4 bg-gray-100 rounded border">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'} mb-2`}
          >
            <strong>{message.type === 'user' ? 'You' : 'Bot'}:</strong>
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="input-area flex items-center space-x-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
