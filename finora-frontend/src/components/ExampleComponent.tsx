import React, { useState } from 'react';
import { uploadFile, chatWithBot } from '../services/api';

const ExampleComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleFileUpload = async () => {
    if (file) {
      const summary = await uploadFile(file);
      console.log('Financial Summary:', summary);
    }
  };

  const handleChat = async () => {
    const summary = 'Sample financial summary'; // Replace with actual summary
    const botResponse = await chatWithBot(question, summary);
    setResponse(botResponse);
  };

  return (
    <div>
      <h1>Test API Integration</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleFileUpload}>Upload File</button>

      <input
        type="text"
        placeholder="Ask a question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleChat}>Ask Bot</button>

      <p>Bot Response: {response}</p>
    </div>
  );
};

export default ExampleComponent;