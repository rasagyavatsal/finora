import React, { useState, useRef } from 'react';
import { FiSend } from 'react-icons/fi';

const Chat = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Mock Gemini API call - Replace with actual logic
    const botResponse = {
      type: 'bot',
      text: `You said: "${input}" — I'll analyze this along with your bank statement soon.`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
      scrollToBottom();
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Finora AI Chat</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:text-blue-200">Home</a>
            <a href="/chat" className="hover:text-blue-200 font-bold underline">Chat</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Upload your Bank Statement (CSV or PDF)</label>
          <input
            type="file"
            accept=".csv,application/pdf"
            onChange={handleFileUpload}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2"
          />
          {file && (
            <p className="text-sm mt-2 text-green-600">
              Uploaded: <strong>{file.name}</strong>
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 h-[500px] overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-3 rounded-lg max-w-xl ${
                msg.type === 'user'
                  ? 'ml-auto bg-blue-100 text-right'
                  : 'mr-auto bg-gray-100'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 border border-gray-300 rounded-md"
            placeholder="Ask Finora anything..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
          >
            <FiSend />
          </button>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Finora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
