import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSummary(res.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
      setSummary("Failed to upload the file. Please try again.");
    }
  };

  // Handle asking questions
  const handleAsk = async () => {
    if (!question || !summary) {
      setResponse("Please provide a question and upload a bank statement first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        question,
        financial_summary: summary,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error asking question:", error);
      setResponse("Failed to get advice. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💰 AI Financial Assistant</h1>

      {/* File upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Upload Statement
      </button>

      {/* Display summary */}
      {summary && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Summary:</strong> {summary}
        </div>
      )}

      {/* Ask question section */}
      <textarea
        className="w-full mt-4 p-2 border border-gray-300 rounded"
        rows={4}
        placeholder="Ask a financial question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="bg-green-500 text-white p-2 rounded mt-2 w-full"
      >
        Ask Gemini
      </button>

      {/* Display AI response */}
      {response && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <strong>Advice:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;
