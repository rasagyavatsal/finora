import React, { useState } from "react";
import { uploadFile } from "./services/api";  // Import the uploadFile function

interface UploadFormProps {
  onSummaryUpdate: (summary: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSummaryUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const result = await uploadFile(file);
      setSummary(result);
      onSummaryUpdate(result);  // Update the summary in the parent
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {summary && <p>{summary}</p>}  {/* Display summary */}
    </div>
  );
};

export default UploadForm;
