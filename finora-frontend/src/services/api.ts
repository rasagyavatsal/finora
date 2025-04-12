import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to upload file
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
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
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      question: question,
      financial_summary: financialSummary,
    });
    return response.data.response;  // Returns chatbot response
  } catch (error) {
    console.error("Error with chatbot:", error);
    return "Error with chatbot.";
  }
};
