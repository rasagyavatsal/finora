// src/pages/Home.tsx
import './styles/Home.css';
import React, { useState, useRef, useEffect } from 'react';
import { chatWithBot, uploadFile } from '../services/api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Home = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    const uploadedSummary = await uploadFile(file);
    const bulletPoints = uploadedSummary
      .split('\n')
      .map((point) => `• ${point}`)
      .join('\n');

    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: `File uploaded successfully. Here's the summary:\n${bulletPoints}` },
    ]);
  };

  const handleChat = async () => {
    if (question.trim() === '') return;

    setMessages((prev) => [...prev, { sender: 'user', text: question }]);

    const botResponse = await chatWithBot(question, '');
    setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);

    setQuestion('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Finora</h1>
        </div>
      </header>

      {/* Chat Section */}
      <main className="flex-grow container mx-auto flex flex-col max-w-3xl bg-white shadow-md rounded-lg mt-6">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-100 rounded-lg"
          style={{ maxHeight: '70vh' }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                style={{ maxWidth: '75%' }}
              >
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="border-t border-gray-300 p-4 flex items-center space-x-4">
          {/* File Upload */}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-gray-500 hover:text-blue-600"
            title="Upload File"
          >
            📎
          </label>

          {/* Chat Input */}
          <input
            type="text"
            placeholder="Type your message..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={handleChat}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
