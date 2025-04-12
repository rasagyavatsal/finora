import axios from 'axios';

// Function to upload file
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.summary;  // Returns summary (income/expenses)
  } catch (error) {
    console.error("Error uploading file:", error);
    return "Error uploading file.";
  }
};

// Function to send user query to Gemini AI chatbot
export const chatWithBot = async (question: string, financialSummary: string): Promise<string> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/chat", {
      question: question,
      financial_summary: financialSummary,
    });
    return response.data.response;  // Returns chatbot response
  } catch (error) {
    console.error("Error with chatbot:", error);
    return "Error with chatbot.";
  }
};
